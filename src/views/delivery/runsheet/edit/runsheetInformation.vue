<template>
    <div>
        <template v-if="loadStatus == false">
           <table-master 
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasAction="false"
            :hasPagination="false"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
            @updateValue="updateValue"
            />
        </template>
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
export default {
    name:"Inbound-Incoming",
    mixins: [master],
    props: {
        query: String,
        employeeId:String,
        deliveryNumber:String
    },
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Connote Number",
                    key: "koli_number",
                    width: "xs"
                },
                {
                    label: "ZipCode",
                    key: "connote_receiver_zip_code",
                    width: "xxs"
                },
                {
                    label: "Status Delivery",
                    key: "status_delivery",
                    type: "inputan",
                    typeInput: "select",
                    data: 
                        {
                      label:null,
                      value:null
                    },
                    selectedValue : "status_code"
                },

                {
                    label: "Remarks",
                    key: "remarks",
                    type: "inputan",
                    typeInput: "text",
                    data: ''
                },

                {
                  label: "COD",
                  key: "amount_cod",
                  width: "xxs"
                },
                {
                  label: "Description",
                  key: "description",
                  width: "xxs"
                },
                {
                  label: "Status",
                  key: "status_subtype",
                  width: "xxs"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            tempDate: [],
            startDate: "",
            endDate: "",
            dialogTariff: false,
            employee_id:"",
            delivery_runsheet_number:"",
            pagination: {
                limit:5,
                page_size: 1,
                page: 1
            },
            loadStatus: false
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val)
                }
            }
        },
        employeeId: function(val, old) {
              if(val !== undefined) {
                  this.employee_id = val
                  if(this.employee_id !== old) {
                      this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch)
                  }
              }
        },
        deliveryNumber: function(val, old) {
              if(val !== undefined) {
                  this.delivery_runsheet_number = val

                  if(this.delivery_runsheet_number !== old) {
                    this.delivery_runsheet_number = val
                  }
              }
        },
    },
    methods: {
        async getTableData(limit,page,q) {
            this.loading = true
            let query = "";
            let startDate = "";
            let endDate = "";
            if(q !== undefined) {
                query = q
            }
            await axios
                .get(this.URL.courier_delivery +
                `/${this.employee_id}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`,
                this.Helper.header())
                .then(res => {
                    this.dataTable = res.data.data
                    this.dataTable.map(item=>{
                      item['status_subtype'] = item.status_delivery ? item.status_delivery : ''
                      item['status_code'] = item.status ? item.status.status_code : ''
                    })
                    this.$emit('reload', res.data.data);
                    this.pagination.page = res.data.meta ? res.data.meta.current_page : 1
                    this.pagination.limit = res.data.meta ? parseInt(res.data.meta.per_page) : 20
                    this.pagination.page_size = res.data.meta ? res.data.meta.last_page : 1
                    if(res.data.data.length > 0) {
                        
                    }
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate list', err)
                })
        },


        updateValue(key, val, info){
          key = key.split('|');
            if(key[0] && key[0] == 'status_delivery'){
              this.dataTable.map((item, index)=>{
                if(key[1] === item.koli_number){
                  this.delivery_runsheet_number = this.dataTable[index].delivery_runsheet_number
                  this.form = {
                    koli_number : key[1],
                    status : val,
                    delivery_runsheet_number:this.delivery_runsheet_number
                  }
                }
              })
              this.updateInbound();
            }
        },
        async updateInbound() {
          await axios
              .put(this.URL.delivery + `/${this.delivery_runsheet_number}/detail?n=${this.listenNodeId}`,
                  JSON.stringify(this.form),
                  this.Helper.header())
              .then(res => {
                console.log(res,'res receiving');
                this.refresh()
                this.openNotification(null, 'Success', 'Update is success')
              }).catch(err => {
                console.log(err,'err receiving');
                this.loading = false
              })
        },
        async getStatus() {
            this.loadStatus = true
            await axios
                .get(this.URL.status +
                `?status_type=DELIVERY&n=${this.listenNodeId}&sort_by=created_at&sort_order=desc&limit=1000&page=1s=`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.status_description +'('+item.status_code+')'
                            obj["value"] = item.status_code

                            arr.push(obj)
                        })

                        this.datacolumn.map(item => {
                            if(item.key == 'status_delivery') {
                                item.data = arr
                            }
                        })
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    this.loadStatus = false
                }).catch(err => {
                    this.loadStatus = false
                    // this.openNotification('danger', 'Failed to populate status', err)
                })
        },

        closeDialogConfirm(){
            this.confirmDialog = false
        },

        actionLimit(val){
            this.pagination.limit = val
            this.pagination.page = 1
            this.refresh()
        },

        actionPagination(val) {
            this.pagination.page = val
            this.refresh()
        },

        refresh(){
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },
        getParamRoute(){
          if(this.$route.params.employee_id){
            this.employee_id = this.$route.params.employee_id
          }
        },



    },
    mounted() {
        this.getStatus()
        this.getParamRoute()
        this.refresh()
    }
}
</script>
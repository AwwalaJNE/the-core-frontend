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
            @handleEdit="actionDetail"
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
        deliveryRunsheetNumber:String
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
                  key: "Remarks",
                  width: "xxs"
                },

                {
                    label: "Status",
                    key: "status",
                    type: "inputan",
                    typeInput: "select",
                    data: [
                        {
                            label: null,
                            value: null
                        }
                    ]
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
                  key: "inbound_type_name",
                  width: "xxs"
                },
                {
                  label: "Description",
                  key: "inbound_type_name",
                  width: "xxs"
                },
                {
                  label: "Status",
                  key: "inbound_type_name",
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
        deliveryRunsheetNumber: function(val, old) {
            if(val !== undefined) {
                this.delivery_runsheet_number = val
                if(this.delivery_runsheet_number !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val)
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
                .get(this.URL.delivery +
                `/${this.delivery_runsheet_number}/detail?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`,
                this.Helper.header())
                .then(res => {
                    this.dataTable = res.data.data
                    this.dataTable.map(item=>{
                      item['inbound_type_name'] = 'false'
                    })
                  console.log(this.dataTable,'asdasdasds')
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        this.openNotification('warn', 'tariff data is empty!', ' Please create a new tariff data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate tariff list', err)
                })
        },

        updateValue(key, val){
            
        },

        async getStatus() {
            this.loadStatus = true
            await axios
                .get(this.URL.status +
                `/?n=${this.listenNodeId}&sort_by=created_at&sort_order=desc&limit=3&page=1s=`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.geolocation_province_name
                            obj["value"] = item.geolocation_province_id

                            arr.push(obj)
                        })

                        this.datacolumn.map(item => {
                            if(item.key == 'status') {
                                item.data == arr
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

        actionDetail(row){
          this.$router.push({ name: 'detailConnote', params: { id: row.transaction_id } });
        }

    },
    mounted() {
        this.getStatus()
        // this.refresh()
    }
}
</script>
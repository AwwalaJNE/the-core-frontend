<template>
    <div>
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
        />

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
    },
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "No.",
                    key: "no",
                    width: "xs"
                },
                {
                    label: "Connote / Koli",
                    key: "koli_number",
                    width: "xxs"
                },
                {
                  label: "Courier",
                  key: "courier_employee_name",
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
            pagination: {
                limit:1000,
                page_size: 1,
                page: 1
            }
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
                .get(this.URL.undelivery +
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`,
                this.Helper.header())
                .then(res => {
                    this.dataTable = res.data.data
                    let cour = [];
                    let dataCour = res.data.data
                    const map = new Map();
                    for (const item of dataCour) {
                        if(!map.has(item.courier_employee_id)){
                            map.set(item.courier_employee_id, true);    // set any value to Map
                            cour.push({
                                value: item.employee_courier.employee_id,
                                text: item.employee_courier.employee_name
                            });
                        }
                    }
                    console.log("courrrr",cour);
                    console.log("res.data.data",res.data.data);
                    this.$nextTick(() => {
                      this.$emit('cour-list', cour);
                      this.$emit('total-connote', res.data.data.length);
                    });
                    let no = 1;
                    this.dataTable.map(item=>{
                      item['no'] = no
                      item['courier_employee_name'] = item.employee_courier.employee_name
                      no++
                    })
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate Undelivery list', err)
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

    }
}
</script>
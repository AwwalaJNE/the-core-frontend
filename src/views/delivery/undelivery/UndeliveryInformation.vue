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
            :hasPagination="true"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
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
        employeeId: String,
    },
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Connote / Koli",
                    key: "koli_number",
                    width: "md"
                },
                {
                    label: "Delivery Runsheet Number",
                    key: "delivery_runsheet_number",
                    width: "md"
                },
                {
                    label: "DRI Number",
                    key: "dri",
                    width: "md"
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
                limit: 20,
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
        employeeId: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if (this.tempSearch == 0) {
                    this.tempSearch = ""
                }
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val)
                    this.tempSearch = val
                }
            }
        },
    },
    computed: {
        listenEmployeeId() {
            return this.employeeId;
        }
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
                .get(this.URL.courier_delivery + `/${this.listenEmployeeId}/undelivery?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`,
                this.Helper.header())
                .then(res => {
                    if (res.data.data.length > 0) {
                        let arr = res.data.data
                        arr.map((item, index) => {
                            item["no"] = index + 1;
                            item["koli_number"] = item.koli_number;
                            item["delivery_runsheet_number"] = item.delivery_runsheet_number
                            item["dri"] = item.dri
                        })
                        this.dataTable = arr;

                        this.$emit('total-connote', res.data.data.length);

                        this.pagination.page = res.data.meta.current_page;
                        this.pagination.limit = parseInt(res.data.meta.per_page);
                        this.pagination.page_size = res.data.meta.last_page;
                        // this.dataTable = res.data.data
                        // let cour = [];
                        // let dataCour = res.data.data
                        // const map = new Map();
                        // cour.push({
                        //             'value': 0,
                        //             'text': 'All'
                        //         });
                        // if (cour.length == 1 && cour.length > 0) {
                        //     for (const item of dataCour) {
                        //         if(!map.has(item.courier_employee_id)){
                        //             map.set(item.courier_employee_id, true);    // set any value to Map
                        //             cour.push({
                        //                 value: item.employee_courier.employee_id,
                        //                 text: item.employee_courier.employee_name
                        //             });
                        //         }
                        //     }
                        // }
                        // this.$nextTick(() => {
                        // this.$emit('cour-list', cour);
                        // this.$emit('total-connote', res.data.data.length);
                        // });
                        // let no = 1;
                        // this.dataTable.map(item=>{
                        // item['no'] = no
                        // item['courier_employee_name'] = item.employee_courier.employee_name
                        // no++
                        // })
                        // let gets = this.$store.getters.getInputs.all_runsheet;
                        // let showButton = this.dataTable.length === 0;
                        // let statusExists = gets?.some(item => item.status === null);
                        // if (showButton && statusExists === true) {
                        //     showButton = false;
                        // } else if (showButton && (statusExists === false || statusExists === undefined)) {
                        //     showButton = true;
                        // }
                        // this.$emit('showButtons',showButton);
                        // this.pagination.page = res.data.meta.current_page
                        // this.pagination.limit = parseInt(res.data.meta.per_page)
                        // this.pagination.page_size = res.data.meta.last_page
                    }
                }).catch(err => {
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate Undelivery list', err)
                })
            this.loading = false
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
    },
    mounted() {
    }
}
</script>
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
        :hasLinked="['employee_name']"
        :hasPagination="true"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        @actionUpdate="actionUpdate"
        :customAction="true"
        :customActionList="customActionList"
        />

        <dialog-confirm
            :active="activeDialogRemove"
            :loading="activeLoadingRemove"
            :closeDialog="closeDialogConfirmRemove"
            title="Resync Runsheet"
            message="Are you sure you want to Resync Runsheet ?"
            @confirm="confirmRemove"
            @cancel="closeDialogConfirmRemove"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogConfirm from "@/components/dialog/dialogConfirm"

export default {
    name:"delivery-runsheet",
    mixins: [master],
    props: {
        query: String,
        dateFilter: String,
        node:String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-confirm": DialogConfirm,
    },
    data() {
        return {
            form:{},
            activeDialogRemove:false,
            activeLoadingRemove:false,
            dataTable: [],
            customActionList: [
                {
                    label: 'Resync',
                    key: 'resync',
                    attribute: '',
                }
            ],
            datacolumn: [
                {
                    label: "Runsheet #",
                    key: "delivery_runsheet_number",
                    width: "md"
                },
                {
                    label: "Courier Code",
                    key: "employee_code",
                    width: "xs"
                },
                {
                    label: "Name",
                    key: "employee_name",
                    width: "auto"
                },
                {
                    label: "Total Koli",
                    key: "total_koli",
                    width: "xs"
                },
                {
                    label: "Open",
                    key: "total_open",
                    width: "xs"
                }
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            tempDate: [],
            date: "",
            dialogTariff: false,
            pagination: {
                limit:5,
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
                    this.pagination.page = 1
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.startDate, this.endDate)
                }
            }
        },
        dateFilter: function(val, old) {
          if(val !== undefined) {
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate)
          }
        },
        node: function(val, old) {
          if(val !== undefined) {
            this.node_filter = val
            if(this.node_filter !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.startDate, this.endDate, val)
            }
          }
        },
    },
    methods: {
        async getTableData(limit,page,q, from, to) {
            this.loading = true
            let query = "";
            let startDate = "";
            let endDate = "";
            if(q !== undefined) {
                query = q
            }
            if(from !== undefined && to !== undefined) {
              startDate = from
              endDate = to
            }
            await axios
                .get(this.URL.courier_delivery +
                `?n=${this.listenNodeId}&s=${query}&date_filter=${this.dateFilter}`,
                this.Helper.header())
                .then(res => {
                    this.dataTable = res.data.data.map((value)=>{
                        return value
                    })
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate Delivery Runsheet list', err)
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.startDate, this.endDate)
        },

        actionDetail(row){
            let params = {
                employee_id: row.employee_id,
                employee_code: row.employee_code,
                employee_name: row.employee_name,
            }
            let routeName = 'delivery-runsheet-new'
            if(row.delivery_runsheet_number){
                params.delivery_runsheet_number = row.delivery_runsheet_number;
                params.date_filter = this.dateFilter;
                routeName = 'delivery-runsheet-edit';
            }
            this.$router.push({ name: routeName, params: params });
        },

        actionUpdate(val, key) {
            switch(key) {
                case 'resync':

                    this.form = {
                        'delivery_runsheet_number' : val.delivery_runsheet_number,
                        'courier_employee_id' : val.employee_id,
                    }

                    this.activeDialogRemove = true;
                    break;
                default:

                // code block
            }
        },
        closeDialogConfirmRemove(){
            this.activeDialogRemove=false
            this.activeLoadingRemove=false
            this.handleClearForm();
        },
        confirmRemove(){
            this.resyncRunsheet();
        },
        async resyncRunsheet(){
            this.activeLoadingRemove=true
            await axios
                .post(
                    this.URL.resync_runsheet + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form),
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm();
                    this.refresh()
                    this.closeDialogConfirmRemove();
                    this.openNotification(null, 'Resync success', 'Resync Runsheet is success')

                }).catch(err => {
                    let message = err.response.data ? err.response.data.message : 'Update Failed'
                    this.loading = false
                    this.handleClearForm();
                    this.closeDialogConfirmRemove();
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Resync Runsheet is failed', message)

                })
        },
        handleClearForm(){
            this.form = {}
        },

    },
    mounted() {
        this.refresh()
    }
}
</script>

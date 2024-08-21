<template>
    <div>
        <table-master 
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasAction="true"
            :hasPagination="true"
            @actionUpdate="actionUpdate"
            @actionRemove="actionRemove"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
        />

        <dialog-create-edit-configuration-warning-runsheet
            title="Edit Configuration Warning Runsheet"
            btnBlue="Edit"
            :active="dialogConfigurationWarningRunsheet" 
            :closeDialog="closeDialog"
            :dataItem="dataItem"
            @refresh="refresh"
        />

        <dialog-confirm
            title="Remove Configuration Warning Runsheet"
            :message="`Are you sure you want to remove this configuration warning runsheet with id ${this.id}?`"
            :active="activeDialogConfirmRemove"
            :loading="loadingConfirmRemove"
            :closeDialog="closeDialogConfirmRemove"
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
import DialogCreateEditConfigurationWarningRunsheet from "@/views/settings/configurationWarningRunsheet/warningRunsheet/dialogCreateEditConfigurationWarningRunsheet"
import SearchInput from "@/components/search/searchInput"
import Inputan from "@/components/input/inputan"
import DateTime from "@/components/input/dateTime"
import moment from "moment"
export default {
    name:"configuration-warning-runsheet-list",
    mixins: [master],
    props: {
        query: String,
        searchBy: String,
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-configuration-warning-runsheet": DialogCreateEditConfigurationWarningRunsheet,
        "search-input": SearchInput,
        "date-time": DateTime,
        "inputan": Inputan,
        "dialog-confirm": DialogConfirm,
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Id",
                    key: "setting_id",
                    width: "auto"
                },
                {
                    label: "Percentage",
                    key: "percentage",
                    width: "auto"
                },
                {
                    label: "Minimum Connote",
                    key: "minimum_count",
                    width: "auto"
                },
                {
                    label: "Configure By",
                    key: "reference",
                    width: "auto"
                },
                {
                    label: "Applied For",
                    key: "node_name",
                    width: "auto"
                },
            ],
            loading: false,
            dataItem: {},
            searchValue: this.query ? this.query : "",
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            id: '',
            dialogConfigurationWarningRunsheet: false,
            activeDialogConfirmRemove: false,
            loadingConfirmRemove:false,
        }
    },
    computed: {
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.searchValue = val
                if(this.searchValue !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.startDate, this.endDate, this.searchBy)
                }
            }
        },
        searchBy: function(val, old) {
            if(val !== undefined) {
                this.searchBy = val
                if(this.searchBy !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, this.searchValue, this.startDate, this.endDate, val)
                }
            }
        },
    },
    methods: {
        async getTableData(limit,page,q,from,to, searchBy) {
            this.loading = true
            let query = "";
            let startDate = "";
            let endDate = "";
            
            if (q !== undefined) {
                this.searchValue = q
                query = q
            }
            if (from !== undefined && to !== undefined) {
                startDate = from
                endDate = to
            }
            await axios
                .get(this.URL.configuration_warning_runsheet + 
                `?n=${this.listenNodeId}&sort_order=desc&&limit=${limit}&page=${page}&start_date=${startDate}&end_date=${endDate}&s=${query}&search_by=${searchBy}`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        this.dataTable = res.data.data
                        this.dataTable.length > 0 && this.dataTable.map((item) => {
                            item["node_name"] = item.node.map((itm, index) => {
                                const { node_name } = itm || {};
                                let newline = "\n";

                                if (index == 0) {
                                    newline = "";
                                }

                                return newline + '- ' + node_name;
                            }).toString();
                        })

                        this.pagination.page = res.data.meta.current_page;
                        this.pagination.limit = parseInt(res.data.meta.per_page);
                        this.pagination.page_size = res.data.meta.last_page ;
                    } 
                }).catch(err => {
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate node list', err.response.data.message)
                })
            this.loading = false
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.setting_id === val.setting_id
                })
                this.dataItem = obj[0]
                this.$nextTick(() => {
                    this.dialogConfigurationWarningRunsheet = true
                });
            }
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
            let from = ''
            let to = ''

            if(this.dateRange != null && this.dateRange.length > 0) {
                from = moment(this.dateRange[0]).format("YYYY-MM-DD")
                to = moment(this.dateRange[1]).format("YYYY-MM-DD")
            }
            this.getTableData(this.pagination.limit,this.pagination.page,this.searchValue,from,to, this.searchBy)
        },
        closeDialog() {
            this.$store.dispatch("SET_CONFIGURATION_WARNING_RUNSHEET_SETTING_ID_visible", false)
            this.dialogConfigurationWarningRunsheet = false
            this.refresh()
        },
        actionRemove(val){
            this.id = val.setting_id;
            this.activeDialogConfirmRemove = true
        },
        confirmRemove() {
            this.loadingConfirmRemove=true
            this.removeData()
        },
        async removeData(){
            await axios
                .delete(
                    this.URL.configuration_warning_runsheet + `/${this.id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.closeDialogConfirmRemove()
                    this.loadingConfirmRemove = false
                    this.refresh()
                    this.openNotification(null, 'Success', 'Delete Warning Configuration is success')
                }).catch(err => {
                    this.loadingConfirmRemove = false
                    this.closeDialogConfirmRemove()
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Delete Warning Configuration is failed', err.response.data.message)
                })
        },
        closeDialogConfirmRemove(){
            this.activeDialogConfirmRemove = false
            this.loadingConfirmRemove=false
        },
    },
    mounted() {
        this.refresh()
    },
}
</script>
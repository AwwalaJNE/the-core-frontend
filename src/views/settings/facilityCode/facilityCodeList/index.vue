<template>
    <div>
        <table-master 
            hideColumnKey="facility-code-list" 
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

        <dialog-create-edit-facility-code
            title="Create Facility Code"
            btnBlue="Edit"
            :active="dialogCreateEditFacilityCode" 
            :closeDialog="closeDialog"
            :dataItem="dataItem"
            @refresh="refresh"
        />

        <dialog-confirm
            title="Remove Facility Code"
            :message="`Are you sure you want to remove this facility code with id ${this.id}?`"
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
import DialogCreateEditFacilityCode from "@/views/settings/facilityCode/facilityCodeList/dialogCreateEditFacilityCode"
import SearchInput from "@/components/search/searchInput"
import Inputan from "@/components/input/inputan"
import DateTime from "@/components/input/dateTime"
import moment from "moment"
export default {
    name:"facility-code-list",
    mixins: [master],
    props: {
        query: String,
        searchBy: String,
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-facility-code": DialogCreateEditFacilityCode,
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
                    key: "facility_code_id",
                    width: "auto"
                },
                {
                    label: "User",
                    key: "user_name",
                    width: "sm"
                },
                {
                    label: "Facility Code",
                    key: "code",
                    width: "xxs"
                },
                {
                    label: "Facility Name",
                    key: "name",
                    width: "xxxs"
                },
                {
                    label: "Address",
                    key: "address",
                    width: "sm"
                },
                {
                    label: "Facility Type",
                    key: "facility_type",
                    width: "xxxs"
                },
                {
                    label: "Destination",
                    key: "destination",
                    width: "xs"
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
            dialogCreateEditFacilityCode: false,
            activeDialogConfirmRemove: false,
            loadingConfirmRemove:false,
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.searchValue = val
                if(this.searchValue !== old) {
                    this.pagination.page = 1
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
                .get(this.URL.facility_code + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&start_date=${startDate}&end_date=${endDate}&s=${query}&search_by=${searchBy}`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        this.dataTable = res.data.data
                        this.dataTable.length > 0 && this.dataTable.map((item) => {
                            item["user_name"] = item.users.map((itm, index) => {
                                const { user_name } = itm || {};
                                let newline = "\n";

                                if (index == 0) {
                                    newline = "";
                                }

                                return newline + '- ' + user_name;
                            }).toString();
                        })

                        this.pagination.page = res.data.meta.current_page;
                        this.pagination.limit = parseInt(res.data.meta.per_page);
                        this.pagination.page_size = res.data.meta.last_page ;
                    } 
                }).catch(err => {
                    this.openNotification('danger', err?.response?.data?.code ?? '', 'Failed to populate facility code list', err?.response?.data?.message ?? err)
                })
            this.loading = false
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.facility_code_id === val.facility_code_id
                })
                this.dataItem = obj[0]
                this.$nextTick(() => {
                    this.dialogCreateEditFacilityCode = true
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
            this.dialogCreateEditFacilityCode = false
            this.refresh()
        },
        actionRemove(val){
            this.id = val.facility_code_id;
            this.activeDialogConfirmRemove = true
        },
        confirmRemove() {
            this.loadingConfirmRemove=true
            this.removeData()
        },
        async removeData(){
            await axios
                .delete(
                    this.URL.facility_code + `/${this.id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.closeDialogConfirmRemove()
                    this.loadingConfirmRemove = false
                    this.refresh()
                    this.openNotification("success", null, 'Success', 'Delete Facility Code is success')
                }).catch(err => {
                    this.loadingConfirmRemove = false
                    this.closeDialogConfirmRemove()
                    this.loading = false
                    this.openNotification('danger', err?.response?.data?.code ?? '', 'Delete Facility Code is failed', err?.response?.data?.message ?? '')
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
<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="12">
                <vs-row>
                    <vs-col w="8">
                        <date-time :name="''" :rules="''" :valueData="dateRange"
                            typeInput="daterange" @updateValue="updateValue" />
                    </vs-col>
                </vs-row>
            </vs-col>
        </vs-row>
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

        <dialog-create-edit-sla
            :active="dialogSla" 
            :closeDialog="closedialogSla"
            @refresh="refresh"
            btnBlue="Edit"
            title="Edit SLA Bag"
            :dataItem="dataItem"
        />

        <dialog-confirm
            title="Remove SLA Bag"
            :message="`Are you sure you want to remove this SLA Bag?`"
            :active="activeDialogConfirmRemove"
            :loading="loadingConfirmRemove"
            :closeDialog="closeDialogConfirmRemove"
            @confirm="confirmRemove"
            @cancel="closeDialogConfirmRemove"
        />
    </div>
</template>
<script>
import axios from 'axios';
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogConfirm from "@/components/dialog/dialogConfirm"
import DialogCreateEditSla from "@/views/settings/sla/slaBag/dialogCreateEditSla"
import SearchInput from "@/components/search/searchInput"
import Inputan from "@/components/input/inputan"
import DateTime from "@/components/input/dateTime"
import moment from "moment"
import SelectSearchBy from "@/components/search/selectSearchBy"
export default {
    name:"sla-list",
    mixins: [master],
    props: {
        query: String,
        searchBy: String,
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-sla": DialogCreateEditSla,
        "search-input": SearchInput,
        "date-time": DateTime,
        "inputan": Inputan,
        "dialog-confirm": DialogConfirm,
        "select-search-by": SelectSearchBy,
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "sla_bag_id",
                    width: "xs"
                },
                {
                    label: "Group Name",
                    key: "group_name",
                    width: "sm"
                },
                {
                    label: "Start Date",
                    key: "start_date",
                    width: "sm"
                },
                {
                    label: "End Date",
                    key: "end_date",
                    width: "sm"
                },
                {
                    label: "Reference Value",
                    key: "reference_value",
                    width: "sm"
                },
                {
                    label: "Reference Entity",
                    key: "reference_entity",
                    width: "sm"
                },
                {
                    label: "SLA",
                    key: "sla",
                    width: "sm"
                },
                {
                    label: "SLA Type",
                    key: "sla_type",
                    width: "sm"
                },
                {
                    label: "Bag Type",
                    key: "bag_type",
                    width: "sm"
                },
                {
                    label: "Bag Item Qty",
                    key: "bag_item_qty",
                    width: "sm"
                },
                {
                    label: "Created At",
                    key: "created_at",
                    width: "sm"
                },
                {
                    label: "Active",
                    key: "is_active",
                    width: "xs",
                    type: "boolean|disabled"
                }
            ],
            loading: false,
            dataItem: {},
            searchValue: this.query ? this.query : "",
            dialogSla: false,
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            dateRange: [],
            id: '',
            activeDialogConfirmRemove: false,
            loadingConfirmRemove: false,
            startDate: '',
            endDate: '',
        }
    },
    computed: {
        listenIsMultiple() {
            return this.isMultiple ? this.isMultiple : false
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.searchValue = val
                if(this.searchValue !== old) {
                    this.pagination.page = 1
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.startDate, this.endDate, this.searchBy, this.filterDateBy)
                }
            }
        },
        searchBy: function(val, old) {
            if(val !== undefined) {
                this.searchBy = val
                if(this.searchBy !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, this.searchValue, this.startDate, this.endDate, val, this.filterDateBy)
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
            if(q !== undefined) {
                this.searchValue = q
                query = q
            }
            if(from !== undefined && to !== undefined) {
              startDate = from
              endDate = to
            }
            await axios
                .get(this.URL.sla_bag + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&start_date=${startDate}&end_date=${endDate}&s=${query}&search_by=${searchBy}`, 
                this.Helper.header())
                .then(res => {
                        this.dataTable = res.data.data
                        if(this.dataTable.length > 0) {
                            // loop dataTable to set active
                            this.dataTable.forEach(item => {
                                if (item.is_active === '1') {
                                    item.is_active = true
                                } else {
                                    item.is_active = false
                                }
                            })
                        }
                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate node list', err.response.data.message)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.sla_bag_id === val.sla_bag_id
                })
                this.dataItem = obj[0]
                this.$nextTick(() => {
                    this.dialogSla = true
                });
            }
        },
        actionRemove(data) {
            this.id = data.sla_bag_id
            this.activeDialogConfirmRemove = true
        },
        actionPagination(data) {
            this.pagination.page = data.page
            this.pagination.limit = data.limit
            this.getTableData(this.pagination.limit, this.pagination.page, this.searchValue, this.startDate, this.endDate, this.searchBy, this.filterDateBy)
        },
        actionLimit(data) {
            this.pagination.limit = data.limit
            this.getTableData(this.pagination.limit, this.pagination.page, this.searchValue, this.startDate, this.endDate, this.searchBy, this.filterDateBy)
        },
        updateValue(key, val) {
            this.dateRange = val
            this.refresh()
        },
        refresh() {
            let startDate = ''
            let endDate = ''

            if(this.dateRange != null && this.dateRange.length > 0) {
                startDate = moment(this.dateRange[0]).format("YYYY-MM-DD")
                endDate = moment(this.dateRange[1]).format("YYYY-MM-DD")
            }

            this.startDate = startDate
            this.endDate = endDate
            this.getTableData(this.pagination.limit, this.pagination.page, this.searchValue, this.startDate, this.endDate, this.searchBy)
        },
        async removeData(){
            await axios
                .delete(
                    this.URL.sla_bag + `/${this.id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.closeDialogConfirmRemove()
                    this.loadingConfirmRemove = false
                    this.refresh()
                    this.openNotification(null, 'Success', 'Delete sla is success')
                }).catch(err => {
                    this.loadingConfirmRemove = false
                    this.closeDialogConfirmRemove()
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Delete sla is failed', err)
                })
        },
        closeDialogConfirmRemove(){
            this.activeDialogConfirmRemove = false
            this.loadingConfirmRemove=false
        },
        confirmRemove() {
            this.loadingConfirmRemove=true
            this.removeData()
        },
        closedialogSla() {
            this.$store.dispatch("SET_SLA_BAG_SLA_ID_visible", false)
            this.dialogSla = false
        },
    },
    mounted() {
        this.refresh()
    }
}
</script>
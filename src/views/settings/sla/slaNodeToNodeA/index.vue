<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="12">
                <vs-row>
                    <vs-col xs="6" sm="4" lg="2">
                        <template v-if="filterStatus.length > 1">
                            <vs-select
                                class="m-select"
                                filter
                                v-model="filterStatusBy"
                                :border="true"
                                :multiple="false"
                                @change="updateFilterStatus"
                            >
                            <template v-if="filterStatus.length > 1">
                                <vs-option
                                    v-for="(item,key) in filterStatus"
                                    :key="key"
                                    :label="item.label"
                                    :value="item.value">
                                {{item.label}}
                                </vs-option>
                            </template>

                            </vs-select>
                        </template>
                    </vs-col>
                    <vs-col w="5">
                        <date-time 
                            :name="''" 
                            :rules="''" 
                            :valueData="dateRange"
                            typeInput="daterange" 
                            @updateValue="updateValue" 
                        />
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
            title="Edit SLA Koli"
            :dataItem="dataItem"
        />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogCreateEditSla from "@/views/settings/sla/slaInterActivity/dialogCreateEditSla"
import SearchInput from "@/components/search/searchInput"
import Inputan from "@/components/input/inputan"
import DateTime from "@/components/input/dateTime"
import moment from "moment"
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
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "sla_id",
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
                    label: "Type",
                    key: "type",
                    width: "auto"
                },
                {
                    label: "Node Origin",
                    key: "node_origin",
                    width: "sm"
                },
                {
                    label: "Node Destination",
                    key: "node_destination",
                    width: "sm"
                },
                {
                    label: "SLA",
                    key: "sla",
                    width: "lg"
                },
                {
                    label: "Active",
                    key: "is_active",
                    width: "xs",
                    type: "boolean|disabled",
                },
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
            filterStatusBy: "-",
            filterStatus: [
                {
                    label: 'All Status',
                    value: '-'
                },
                {
                    label: 'Active',
                    value: 'true'
                },
                {
                    label: 'Inactive',
                    value: 'false'
                }
            ]
        }
    },
    computed: {
        listenIsMultiple(){
            return this.isMultiple ? this.isMultiple : false
        }  
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.searchValue = val
                if(this.searchValue !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.startDate, this.endDate, this.searchBy, this.filterStatusBy)
                }
            }
        },
        searchBy: function(val, old) {
            if(val !== undefined) {
                this.searchBy = val
                if(this.searchBy !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, this.searchValue, this.startDate, this.endDate, val, this.filterStatusBy)
                }
            }
        },
    },
    methods: {
        async getTableData(limit,page,q,from,to, searchBy, filterStatusBy) {
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
                .get(this.URL.sla_node_to_node_a + 
                `?n=${this.listenNodeId}&sort_order=desc&&limit=${limit}&page=${page}&start_date=${startDate}&end_date=${endDate}&s=${query}&search_by=${searchBy}&is_active=${filterStatusBy}`, 
                this.Helper.header())
                .then(res => {
                        this.dataTable = res.data.data

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate node list', err.response.data.message)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.sla_id === val.sla_id
                })
                this.dataItem = obj[0]
                this.$nextTick(() => {
                    this.dialogSla = true
                });
            }
        },
        async actionRemove(val){
            await axios
                .delete(
                    this.URL.sla_node_to_node_a + `/${val.sla_id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.refresh()
                    this.openNotification(null, 'Success', 'Delete sla is success')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Delete sla is failed', err)
                })
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.searchValue,from,to, this.searchBy, this.filterStatusBy)
        },
        closedialogSla() {
            this.$store.dispatch("SET_SLA_NODE_TO_NODE_A_SLA_ID_visible", false)
            this.dialogSla = false
        },
        updateValue(key, val) {
            this.dateRange = val
            this.refresh()
        },
        updateFilterStatus(key) {
            this.filterStatusBy = key;
            this.refresh()
        },
        updateFiterActivity(key, val){
            this.refresh()
        },        
    },
    mounted() {
        this.refresh()
    },
}
</script>
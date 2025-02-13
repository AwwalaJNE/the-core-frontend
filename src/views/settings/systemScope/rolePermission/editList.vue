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
            :isSearchAble="true"
            :isMultipleSelect="true"
            :selectedData="user_role_permission"
            @updateSelected="updateSelected"
            @updateValue="updateValue"
        />
    </div>
</template>
<script>

import axios from "axios";
import master from "@/mixins/master";
import moment from "moment";

import DateTime from "@/components/input/dateTime"
import DialogConfirm from "@/components/dialog/dialogConfirm";
import Inputan from "@/components/input/inputan";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";
import TableMaster from "@/components/table/tableMaster";

export default {
    name:"role-permission-data-table",
    mixins: [master],
    props: {
        app_role_id: String
    },
    components: {
        "table-master" : TableMaster,
        "search-input": SearchInput,
        "date-time": DateTime,
        "inputan": Inputan,
        "dialog-confirm": DialogConfirm,
        "select-search-by": SelectSearchBy
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Menu",
                    key: "feature_name",
                    type: "text",
                    width: "sm"
                },
                {
                    label: "Access Data",
                    key: "access_data",
                    type: "inputan",
                    typeInput: "select",
                    data: [
                        {
                            "label": "USER",
                            "value": "USER"
                        },
                        {
                            "label": "NODE",
                            "value": "NODE"
                        },
                        {
                            "label": "SAME-TLC",
                            "value": "SAME-TLC"
                        },
                        {
                            "label": "ALL",
                            "value": "ALL"
                        }
                    ],
                    width: "auto"
                }
            ],
            loading: false,
            dataItem: {},
            dateRange: [],
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            selected_id: '',
            tempSearch: '',

            user_role_permission: [],
        }
    },
    watch: {
        app_role_id: function (val) {
            if (val !== undefined) {
                this.refresh()
            }
        },
    },
    methods: {
        refresh(){
            let from = ''
            let to = ''

            if(this.dateRange != null && this.dateRange.length > 0) {
                from = moment(this.dateRange[0]).format("YYYY-MM-DD")
                to = moment(this.dateRange[1]).format("YYYY-MM-DD")
            }

            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, from, to)
        },
        updateSelected(arr){
            this.filterNow()
            this.user_role_permission = arr
            this.user_role_permission.map(item => {
                if(item["access_data"] == "") {
                    item["access_data"] = "USER"
                }
            })
            this.filterArray = this.user_role_permission.filter(item => item.selected === false);
            if (this.filterArray.length == 0) {
                this.filterArray = this.getMissingPermissions()
            }

            if(this.waitToRoleRenderer == false) {
                this.updateRole()
            }
        },
        updateValue(key, val) {
            this.dateRange = val;
            this.refresh();
        },
        searchValue (val) {
            this.tempSearch = val
            this.refresh();
        },
        async getTableData(limit, page, q, from, to) {
            this.loading = true

            let query = q || '';            
            let startDate = from || "";
            let endDate = to || "";
            
            try {
                const res = await axios.get(`${this.URL.application_role}/${this.app_role_id}/permission?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = res.data.data;
                    arr.map(item => {
                        item["created_at"] = this.formatTimestamp(item.created_at)
                    })
                    this.dataTable = arr;
                    this.pagination = {
                        page: res.data.meta.current_page,
                        limit: parseInt(res.data.meta.per_page, 10),
                        page_size: res.data.meta.last_page,
                    };
                } else {
                    this.dataTable = [];
                }  
                
            } catch (err) {
                // TODO: REMOVE BELOW LATER
                if (this.app_role_id) {
                    this.dataTable = [
                        {
                            "feature_permission_id": "a48111b9-f747-4a96-b930-c0ba61264acb",
                            "feature_name": "READ LIVE SURAT JALAN",
                            "feature_code": "read-live-surat-jalan",
                            "feature_scope_id": "a48111b9-f747-4a96-b930-c0ba61264acb",
                            "filter": [
                                {
                                    "reference_entity": "BRANCH",
                                    "reference_value": [
                                        "CGK000"
                                    ]
                                }
                            ]
                        },
                        {
                            "feature_permission_id": "a48111b9-f747-4a96-b930-c0ba61264acb",
                            "feature_name": "READ LIVE SURAT JALAN",
                            "feature_code": "read-live-surat-jalan",
                            "feature_scope_id": null,
                            "filter": null
                        }
                    ]
                }
                
                // TODO: UNCOMMENT BELOW LATER
                // this.redirectError(err)
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        actionUpdate(val){
            this.dataItem = val;
            this.dialogEditActive = true;
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
    },
    mounted() {
        this.refresh()
    },
}
</script>
<!--
    - @desc component yang handle crud frontend users
    - @param -
    - @emit -
    - @props -
-->

<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="6">
                <vs-row>
                    <vs-col w="4">
                        <select-search-by 
                            :border="true"
                            :isMultiple="false"  
                            :selectedValue="filterDateBy" 
                            :valueData="dateParams" 
                            @updateSearchBy="updateFilterDateBy"
                        />
                    </vs-col>
                    <vs-col w="8">
                        <date-time 
                            typeInput="daterange" 
                            :name="''" 
                            :rules="''" 
                            :valueData="dateRange"
                            @updateValue="updateValue" 
                        />
                    </vs-col>
                </vs-row>
            </vs-col>
            <vs-col xs="12" sm="12" lg="6">
                <vs-row justify="end">
                    <vs-col xs="6" sm="8" lg="4">
                        <select-search-by 
                            :border="true"
                            :isMultiple="false"  
                            :selectedValue="searchBy" 
                            :valueData="searchParams" 
                            @updateSearchBy="updateSearchBy"
                        />
                    </vs-col>
                    <vs-col xs="6" sm="4" lg="4">
                        <search-input 
                            ref="searchInput" 
                            :placeholder="searchPlaceholder" 
                            @searchValue="searchValue" 
                        />
                    </vs-col>
                </vs-row>
            </vs-col>
        </vs-row>
        <table-master 
            hideColumnKey="setting-user"
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasAction="true"
            :hasPagination="true"
            :expandable="true"
            @actionUpdate="actionUpdate"
            @actionRemove="actionRemove"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
        />

        <dialog-create-edit-user
            btnBlue="Edit"
            ref="dialog_edit"
            title="Edit User"
            :active="dialogUser" 
            :closeDialog="() => closeDialog('dialog_edit')"
            :dataItem="dataItem"
        />

        <dialog-confirm
            ref="dialog_remove"
            title="Remove User"
            :message="`Are you sure you want to remove this user?`"
            :active="dialogRemove"
            :loading="loadingRemove"
            :closeDialog="() => closeDialog('dialog_remove')"
            @confirm="confirmRemove"
            @cancel="() => closeDialog('dialog_remove')"
        />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogConfirm from "@/components/dialog/dialogConfirm"
import DialogCreateEditUser from "@/views/settings/users/user/dialogCreateEditUser"
import SelectSearchBy from "@/components/search/selectSearchBy"
import SearchInput from "@/components/search/searchInput"
import DateTime from "@/components/input/dateTime"
import moment from "moment"
export default {
    name:"list-user",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-user": DialogCreateEditUser,
        "select-search-by": SelectSearchBy,
        "search-input": SearchInput,
        "date-time": DateTime,
        "dialog-confirm": DialogConfirm,
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Name",
                    key: "user_name",
                    width: "sm"
                },
                {
                    label: "Username",
                    key: "user_login",
                    width: "sm"
                },
                {
                    label: "User NIK",
                    key: "user_nik",
                    width: "sm"
                },
                {
                    label: "Email",
                    key: "user_email",
                    width: "xs"
                },
                {
                    label: "Primary Role",
                    key: "primary_user_application_name",
                    width: "sm"
                },
                {
                    label: "Primary App",
                    key: "primary_user_application_role",
                    width: "sm"
                },
                {
                    label: "Node",
                    key: "user_nodes_list",
                    width: "auto"
                },
                {
                    label: "Created Date",
                    key: "created_at",
                    width: "md"
                },
                {
                    label: "Created By",
                    key: "user_creator",
                    width: "auto"
                },
                {
                    label: "Updated Date",
                    key: "updated_at",
                    width: "auto"
                },
                {
                    label: "Updated By",
                    key: "user_editor",
                    width: "auto"
                }
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            dialogUser: false,
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            dateRange: [],
            searchBy: "user_login",
            filterDateBy: "create",
            searchPlaceholder: "Search User Login",
            searchParams: [
                {
                    label: "Name",
                    value: "user_name",
                },
                {
                    label: "Username",
                    value: "user_login",
                },
                {
                    label: "Email",
                    value: "user_email",
                },
                {
                    label: "Node",
                    value: "userNodes"
                },
            ],
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'create'
                }
            ],
            id: '',
            dialogRemove: false,
            loadingRemove:false,
        }
    },
    methods: {
        async getTableData(limit, page, q, from, to, searchBy) {
            this.loading = true

            let query = q || '';            
            let startDate = from || "";
            let endDate = to || "";

            try {
                const res = await axios.get(`${this.URL.user}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${searchBy}&filter_date_by=${this.filterDateBy}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = res.data.data
                    arr.map(item => {
                        let additional_node = []
                        let additional_role = []
                        let children = {}

                        if (item?.app_role?.length) {
                            item["primary_user_application_name"] = item?.app_role?.[0]?.app || "";
                            item["primary_user_application_role"] = item?.app_role?.[0]?.role?.[0]?.app_role_name || "";
                        }

                        item['created_at'] =  this.formatTimezone(item['created_at'])
                        item['updated_at'] =  this.formatTimezone(item['updated_at'])
                        item["user_nodes_list"] = item.user_nodes.map((nodes,index) => {
                            let newline = "\n";
                            if(index == 0){
                                newline = "";
                            }
                            return newline+'- '+nodes.node_name;
                        }).toString();
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
                this.redirectError(err)
                this.checkAuth(err.response)
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        actionUpdate(val){
            this.dataItem = val;
            this.dialogUser = true;
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
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, from, to, this.searchBy)
        },
        closeDialog(ref){
            switch (ref) {
                case 'dialog_edit':
                    this.dialogUser = false;
                    this.refresh();
                    break;
                case 'dialog_remove':
                    this.dialogRemove = false;
                    this.refresh();
                    break;
                default:
                    break;
            }
        },
        updateValue(key, val) {
            this.dateRange = val
            this.refresh()
        },
        searchValue (val) {
            this.tempSearch = val
            this.refresh()
        },
        updateSearchBy(key, val) {
            val = val.replaceAll(" ", "_");
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val;
        },
        actionRemove(val){
            this.id = val.user_id;
            this.dialogRemove = true
        },
        confirmRemove() {
            this.removeData()
        },
        async removeData() {
            this.loadingRemove = true;
            try {
                const res = await axios.delete(`${this.URL.user}/${this.id}?n=${this.listenNodeId}`, this.Helper.header());
                this.openNotification('success', null, "Success", res?.data?.message || "Remove User is success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
                this.checkAuth(err.response)
            } finally {
                this.loadingRemove = false;
                this.closeDialog('dialog_remove');
            }
        }
    },
    
    mounted() {
        this.refresh()
        window.addEventListener('timezone-changed', this.refresh);
    },

    beforeDestroy() {
        window.removeEventListener('timezone-changed', this.refresh);
    },
}
</script>
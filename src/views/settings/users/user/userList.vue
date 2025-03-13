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
                        <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateFilterDateBy"
                            :valueData="dateParams" :selectedValue="filterDateBy" />
                    </vs-col>
                    <vs-col w="8">
                        <date-time :name="''" :rules="''" :valueData="dateRange"
                            typeInput="daterange" @updateValue="updateValue" />
                    </vs-col>
                </vs-row>
            </vs-col>
            <vs-col xs="12" sm="12" lg="6">
                <vs-row justify="end">
                    <vs-col xs="6" sm="8" lg="4">
                        <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy"
                            :valueData="searchParams" :selectedValue="searchBy" />
                    </vs-col>
                    <vs-col xs="6" sm="4" lg="4">
                        <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholder" />
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

        <!--Create User Dialog end-->
            <dialog-create-edit-user
            :active="dialogUser" 
            :closeDialogUser="closeDialogUser"
            @refresh="refresh"
            btnBlue="Edit"
            title="Edit User"
            :dataItem="dataItem"
            />

        <dialog-confirm
            title="Remove User"
            :message="`Are you sure you want to remove this user with id ${this.id}?`"
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
            activeDialogConfirmRemove: false,
            loadingConfirmRemove:false,
        }
    },
    methods: {
        async getTableData(limit,page,q,from,to) {
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
                .get(
                    this.URL.user + 
                    `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`, 
                    this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    arr.map(item => {
                        let additional_node = []
                        let additional_role = []
                        let children = {}

                        if (item?.app_role?.length) {
                            item["primary_user_application_name"] = item?.app_role?.[0]?.app || "";
                            item["primary_user_application_role"] = item?.app_role?.[0]?.role?.[0]?.app_role_name || "";
                        }

                        item["user_nodes_list"] = item.user_nodes.map((nodes,index) => {
                            let newline = "\n";
                            if(index == 0){
                                newline = "";
                            }
                            return newline+'- '+nodes.node_name;
                        }).toString();
                    })
                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.checkAuth(err.response)
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate users list', err.response.data.message)
                })
        },
        actionUpdate(val){
            this.dataItem = val
            this.openDialogUser()
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch,from,to)
        },
        closeDialogUser(){
            this.dialogUser = false
            this.dataItem = {};
            this.refresh();
        },
        openDialogUser(){
            this.dialogUser = true
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
            this.activeDialogConfirmRemove = true
        },
        confirmRemove() {
            this.loadingConfirmRemove=true
            this.removeData()
        },
        async removeData(){
            await axios
                .delete(
                    this.URL.user + `/${this.id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.closeDialogConfirmRemove()
                    this.loadingConfirmRemove = false
                    this.refresh()
                    this.openNotification(null, 'Romove success', 'Romove User is success')
                }).catch(err => {
                    this.loadingConfirmRemove = false
                    this.closeDialogConfirmRemove()
                    this.loading = false
                    this.checkAuth(err.response)
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Romove User is failed', err.response.data.message)
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
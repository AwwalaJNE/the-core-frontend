<!--
    - @desc component yang handle crud frontend users
    - @param -
    - @emit -
    - @props -
-->

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
        :expandable="true"
        @actionUpdate="actionUpdate"
        @actionRemove="actionRemove"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        />

        <!--Create User Dialog end-->
            <dialog-create-edit-user
            :active="dialogUser" 
            :openDialogUser="openDialogUser"
            :closeDialogUser="closeDialogUser"
            :finishGetUser="finishGetUser"
            @refresh="refresh"
            btnBlue="Edit"
            title="Edit User"
            :dataItem="dataItem"
            />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogCreateEditUser from "@/views/settings/users/user/dialogCreateEditUser"
export default {
    name:"list-user",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-user": DialogCreateEditUser
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val)
                }
            }
        }
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
                    label: "Email",
                    key: "user_email",
                    width: "xs"
                },
                {
                    label: "Primary Roles",
                    key: "user_role_name",
                    width: "sm"
                },
                {
                    label: "Node",
                    key: "user_nodes",
                    width: "auto"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            dialogUser: false,
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            }
        }
    },
    methods: {
        async getTableData(limit,page,q) {
            this.loading = true
            let query = "";
            if(q !== undefined) {
                query = q
            }
            await axios
                .get(
                    this.URL.user + 
                    `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}`, 
                    this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    arr.map(item => {
                        let additional_node = []
                        let additional_role = []
                        let children = {}

                        item.user_additionals.map(value => {
                            if (!additional_node.includes(value.node_name)) {
                                additional_node.push(value.node_name)
                            }

                            let idx = additional_node.indexOf(value.node_name)
                            if (additional_role[idx]) {
                                additional_role[idx].push(...value.roles)
                            }
                            else if (!additional_role[idx]) {
                                additional_role[idx] = value.roles
                            }
                        })

                        if (additional_node.length > 0 && additional_role.length > 0) {
                            additional_role.forEach(function(elements, idx) {
                                if (elements.length > 0) {
                                    this[idx] = elements.join(", ");
                                }
                                else {
                                    this[idx] = "-";
                                }
                            }, additional_role);
                            children['Additional Node'] = additional_node
                            children['Additional Role'] = additional_role

                            item['children'] = children
                        }

                        item["user_nodes"] = item.user_nodes.map((nodes,index) => {
                            let newline = "\n";
                            if(index == 0){
                                newline = "";
                            }
                            return newline+'- '+nodes.node_name;
                        }).toString();
                        if (item.user_additional_role_name && Array.isArray(item.user_additional_role_name)) {
                            item.user_additional_role_name = item.user_additional_role_name.join(", ");
                        }
                    })
                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    // if(res.data.data.length == 0) {
                    //     this.openNotification('warn', 'Failed to populate User data', )
                    // }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.checkAuth(err.response)
                    this.openNotification('danger', 'Failed to populate users list', err.response.data.message)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.user_id === val.user_id
                })
                this.dataItem = obj[0]
                this.loading = true
                // console.log(this.dataItem, 'nihh val', val)
            }
        },
        async actionRemove(val){
            await axios
                .delete(
                    this.URL.user + `/${val.user_id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.refresh()
                    this.openNotification(null, 'Romove success', 'Romove User is success')
                }).catch(err => {
                    this.loading = false
                    this.checkAuth(err.response)
                    this.openNotification('danger', 'Romove User is failed', err)
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
        refresh(val){
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },
        closeDialogUser(){
            this.dialogUser = false
            this.dataItem = undefined
            this.$store.dispatch("SET_USER_DYNAMICINPUTCOMPONENT_USER_ADDITIONAL_ROLE", {})
        },
        openDialogUser(){
            this.dialogUser = true
        },
        finishGetUser(){
            this.loading = false
        }
    },
    mounted() {
        this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
    },
}
</script>
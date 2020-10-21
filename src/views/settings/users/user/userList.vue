<!--
    - @desc component yang handle crud frontend users
    - @param -
    - @emit -
    - @props -
-->

<template>
    <div>
        <table-master 
        :dataTable="datadata" 
        :dataColumn="datacolumn" 
        :tableLoading="loading"
        :pageSize="pagination.page_size"
        :page="pagination.page"
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
    name:"list-user",
    mixins: [master],
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            datadata: [],
            datacolumn: [
                {
                    label: "Username",
                    key: "user_name",
                    width: "xs"
                },
                {
                    label: "Email",
                    key: "user_email",
                    width: "md"
                },
                {
                    label: "Node",
                    key: "user_node",
                    width: "sm"
                },
                {
                    label: "Roles",
                    key: "user_role",
                    width: "sm"
                },
            ],
            loading: false,
            tempSearch: "",
            pagination: {
                limit:5,
                page_size: 1,
                page: 1
            }
        }
    },
    methods: {
        async getTableData(limit,page,q) {
            console.log(this.Helper.header())
            this.loading = true
            let query = "";
            if(q !== undefined) {
                this.tempSearch = q
                query = q
            }
            await axios
                .get(
                    this.URL.user + 
                    `?n=1&sort_order=desc&limit=${limit}&page=${page}&s=${query}`, 
                    this.Helper.header())
                .then(res => {
                    this.datadata = res.data.data
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to collect users list', err)
                })
        },
        actionLimit(val){
            this.pagination.limit = val
            this.getTableData(this.pagination.limit,this.pagination.page)
        },
        actionPagination(val) {
            this.pagination.page = val
            this.getTableData(this.pagination.limit,this.pagination.page)
        }
    },
    mounted() {
        this.getTableData(this.pagination.limit,this.pagination.page)
    },
}
</script>
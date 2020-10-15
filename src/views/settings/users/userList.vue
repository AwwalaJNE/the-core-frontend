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
        />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
export default {
    name:"listUser",
    mixins: [master],
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            datadata: [
                {
                    "user_id": 1,
                    "user_name": "ANGGA GITA",
                    "user_email": "A_GITA@JNE.CO.ID",
                    "user_login": "A_GITA",
                    "email_verified_at": null,
                    "user_role_id": 1,
                    "last_password_updated_at": "2020-10-15 08:35:49",
                    "locked_at": null,
                    "is_active": 0,
                    "created_at": "2020-10-15 08:35:49",
                    "updated_at": "2020-10-15 08:35:49"
                }
            ],
            datacolumn: [
                {
                    label: "Username",
                    key: "user_name"
                },
                {
                    label: "Email",
                    key: "user_email"
                },
                {
                    label: "Node",
                    key: "user_node"
                },
                {
                    label: "Roles",
                    key: "user_role"
                },
                {
                    label: "Roles",
                    key: "user_role"
                }
            ],
            loading: false,
            tempSearch: ""
        }
    },
    methods: {
        async getTableData(q) {
            console.log(this.Helper.header())
            this.loading = true
            let queryS = "";
            if(q !== undefined) {
                this.tempSearch = q
                queryS = q
            }
            await axios
                .get(this.URL.userList + `?n=1&sort_by=created_at=&sort_order=desc&limit=3&page=1`, this.Helper.header())
                .then(res => {
                    console.log('res', res)
                })
        }
    },
    mounted() {
        // this.getTableData()
    },
}
</script>
<!--
    - @desc component yang handle crud frontend user role
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
    name:"Role List",
    mixins: [master],
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            datadata: [
                
            ],
            datacolumn: [
                {
                    label: "ID",
                    key: "role_id"
                },
                {
                    label: "Roles",
                    key: "role"
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
                .get(this.URL.user + `?n=1&sort_by=created_at&sort_order=desc&limit=3&page=1`, this.Helper.header())
                .then(res => {
                    console.log('res', res)
                })
        }
    },
    mounted() {
    },
}
</script>
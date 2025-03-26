<template>
    <div>
        <table-master 
            hideColumnKey="receiving-airport-master" 
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="listenLoading"
            :removeDanger="true"
            :hasAction="false"
            :hasPagination="true"
            :pageSize="pageSize"
            :page="page"
            :limit="limit"
            :actionWidth="'xxxxs'"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
            @actionRemove="actionRemove"
        />
    </div>
</template>
<script>
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
export default {
    name:"inbound-airport-scan-table",
    mixins: [master],
    props: {
        dataTable: Array,
        loading: Boolean,
        pageSize: Number,
        page: Number,
        limit: Number,
        actionLimit: Function,
        actionPagination: Function,
    },
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            datacolumn: [
                {
                    label: "Item Number",
                    key: "item_number",
                    width: "xxxxs"
                },
                {
                    label: "Item type",
                    key: "item_type",
                    width: "xxxxs"
                },
            ],
        }
    },
    computed: {
        listenLoading(){
            return this.loading
        }
    },
    methods: {
        actionRemove(val) {
            this.$emit("actionRemove", val);
        }
    }
}
</script>
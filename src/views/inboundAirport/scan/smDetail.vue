<template>
    <div>
        <table-master 
            hideColumnKey="receiving-airport-detail" 
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="listenLoading"
            :removeDanger="false"
            :hasAction="false"
            :hasPagination="false"
            :pageSize="pageSize"
            :page="page"
            :limit="limit"
        />
    </div>
</template>
<script>
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
export default {
    name:"inbound-airport-scan-sm-table",
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
                {
                  label: "Status receiving",
                  key: "is_received",
                  type: 'status',
                  width: "xxs"
                },
            ],
        }
    },
    computed: {
        listenLoading(){
            return this.loading
        }
    }
}
</script>
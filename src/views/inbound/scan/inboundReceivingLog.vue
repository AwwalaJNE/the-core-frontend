<template>
    <div>
        <table-master 
            :dataTable="dataTableProp" 
            :dataColumn="datacolumn" 
            :tableLoading="listenLoading"
            :hasAction="false"
            :hasPagination="true"
            :pageSize="pageSize"
            :page="page"
            :limit="limit"
            :editOnly="true"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
            @actionEdit="actionDetail"
        />
    </div>
</template>

<script>
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
export default {
    name:"Inbound-Receiving-Log",
    mixins: [master],
    props: {
        dataTableProp: Array,
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
            dataTable: [],
            datacolumn: [
                {
                    label: "Inbound Number",
                    key: "inbound_number",
                    width: "lg"
                },
                {
                    label: "Item Number",
                    key: "item_number",
                    width: "lg"
                },
                {
                    label: "Status",
                    key: "status",
                    width: "lg"
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
        actionDetail(row){
            let userRole = this.listenUserRole["user_role_code"] ? this.listenUserRole["user_role_code"].toLowerCase() : ""
            

            if(this.dataTable.length > 0 && !userRole.includes("courier")) {
                val["pickup_node_id_destination"] = val["node_destination"] ? val["node_destination"]["node_name"] : ""     
                this.dataItem = val
                this.dataItem.pickup_date = (val.pickup_date) ? val.pickup_date.substring(0,10) : val.pickup_date

                this.$store.dispatch(`SET_PICKUP_LIST_PICKUP_NODE_ID_DESTINATION_ValueData`, val["node_destination"])

                this.$nextTick(() => {
                this.dialogPickupList = true
                });
            }
        },
    },
}
</script>
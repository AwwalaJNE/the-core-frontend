<template>
    <div>
        <template v-if="listenLoading == false">
            <table-master 
            hideColumnKey="receiving-master-info" 
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="listenLoading"
            
            :hasAction="false"
            :hasPagination="false"
            
            @handleEdit="actionDetail"
            />
        </template>
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
export default {
    name:"Inbound-Incoming",
    mixins: [master],
    props: {
        dataTableProp: [Array, Object],
        loading: Boolean,
    },
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            dataTable: this.dataTableProp,
            datacolumn: [
                {
                    label: "Manifest No.",
                    key: "inbound_number",
                    width: "xs"
                },
                {
                    label: "Received",
                    key: "total_received",
                    width: "xxs"
                },
                {
                  label: "Unreceived",
                  key: "total_unreceived",
                  width: "xxs"
                },

                {
                  label: "Status",
                  key: "status_received",
                  width: "xxs"
                },
            ],
            
        }
    },
    computed: {
        listenLoading(){
            return this.loading
        },
        listendataTableProp(){
            return this.dataTableProp
        },
    },
    watch: {
        dataTableProp: function(val) {
            if(val != undefined) {
                this.dataTable = val   
            }
        },
    },
    methods: {
        
        actionDetail(row){
          this.$router.push({ name: 'detailConnote', params: { id: row.transaction_id } });
          this.setRoutePageHistory(this.$route.meta, false);
        }

    },
    mounted() {
        // this.getTableData()
    }
}
</script>
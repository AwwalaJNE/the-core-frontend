<template>
    <div>
        <template v-if="listenLoading == false">
            <table-master 
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
    name:"Inbound-Detail",
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
            dataTable: [],
            datacolumn: [
                {
                    label: "No item.",
                    key: "item_number",
                    width: "xs"
                },
                {
                    label: "Item type",
                    key: "item_type",
                    width: "xxs"
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
        },
        listendataTableProp(){
            return this.dataTableProp
        },
    },
    watch: {
        dataTableProp: function(val) {
            if(val != undefined) {
                this.initialize(val[0])
            }
        },
    },
    methods: {
        initialize(obj) {
            if(obj.hasOwnProperty("detail_incoming")) {
                this.dataTable = obj["detail_incoming"]
            }
        },
        actionDetail(row){
          this.$router.push({ name: 'detailConnote', params: { id: row.transaction_id } });
        }

    },
    mounted() {
        this.initialize(this.listendataTableProp[0])
    }
}
</script>
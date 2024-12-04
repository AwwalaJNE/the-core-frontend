<template>
    <div>
        <template v-if="listenLoading == false">
            <table-master 
                :dataTable="dataTableProp" 
                :dataColumn="datacolumn" 
                :tableLoading="listenLoading"
                :hasAction="false"
                :hasPagination="false"
            />
        </template>
    </div>
</template>
<script>
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
    }
}
</script>
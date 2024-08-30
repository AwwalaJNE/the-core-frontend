<template>
    <div>
        <template v-if="listenLoading == false">
            <table-master 
            :dataTable="dataTableProp" 
            :dataColumn="datacolumn" 
            :tableLoading="listenLoading"
            :hasAction="false"
            :hasPagination="true"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
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
        dataTableProp: Array,
        loading: Boolean,
        pagination: Object,
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
                    label: "No item.",
                    key: "item_number",
                    width: "xs"
                },
                {
                    label: "IM Number",
                    key: "im_number",
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
        }
    },
}
</script>
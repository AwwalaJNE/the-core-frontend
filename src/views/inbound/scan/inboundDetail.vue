<template>
    <div>
        <table-master 
            hideColumnKey="receiving-detail-info" 
            :dataTable="dataTableProp" 
            :dataColumn="datacolumn" 
            :tableLoading="listenLoading"
            :hasAction="false"
            :hasPagination="true"
            :pageSize="pageSize"
            :page="page"
            :limit="limit"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
            :customAction="true"
            :customActionList="customActionList"
            @actionUpdate="entryReceivingLog"
            :isIconButton="true"
        />

        <dialog-create-receiving-log
            ref="dialogEditReceivingLog"
            :active="dialogEditReceivingLogActive"
            :inboundDetail="inboundDetail"
            @closeDialog="closeDialog"
            btnBlue="Edit"
            title="Edit Receiving Log"
            :receivingLogs="receivingLogs"
        />
    </div>
</template>
<script>
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogCreateReceivingLog from "../../inboundAirport/scan/dialogCreateReceivingLog.vue"
export default {
    name:"Inbound-Detail",
    mixins: [master],
    props: {
        dataTableProp: Array,
        loading: Boolean,
        pageSize: Number,
        page: Number,
        limit: Number,
        actionLimit: Function,
        actionPagination: Function,
        receivingLogs: Array,
        inboundNumber: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-receiving-log": DialogCreateReceivingLog
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
                    label: "OM Number",
                    key: "om_number",
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
            customActionList: [
                {
                    label: 'Entry Status',
                    key: 'entry_status',
                    attribute: ''
                }
            ],
            dialogEditReceivingLogActive: false,
            inboundDetail: null
        }
    },
    methods: {
        entryReceivingLog(val) {
            this.dialogEditReceivingLogActive = true;
            this.inboundDetail = val;
            this.inboundDetail.inbound_number = this.inboundNumber;
        },

        closeDialog() {
            this.dialogEditReceivingLogActive = false
            this.inboundDetail = null;
            this.$emit('refresh')
        },
    },
    computed: {
        listenLoading(){
            return this.loading
        }
    },
}
</script>
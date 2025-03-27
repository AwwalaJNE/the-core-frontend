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
import DialogCreateReceivingLog from "./dialogCreateReceivingLog.vue"

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
        smNumber: String,
        receivingLogs: Array
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-receiving-log": DialogCreateReceivingLog
    },

    data() {
        return {
            datacolumn: [
                {
                    label: "Item Number",
                    key: "item_number",
                    width: "lg"
                },
                {
                    label: "Item type",
                    key: "item_type",
                    width: "lg"
                },
                {
                  label: "Status receiving",
                  key: "is_received",
                  type: 'status',
                  width: "lg"
                },
            ],
            customActionList: [
                {
                    label: 'Entry Status',
                    key: 'entry_status',
                    attribute: ''
                }
            ],
            inboundDetail: null,
            loadingDetail: false,
            dialogEditReceivingLogActive: false,
        }
    },
    computed: {
        listenLoading(){
            return this.loading
        }
    },
    methods: {
        entryReceivingLog(val) {
            this.dialogEditReceivingLogActive = true;
            this.inboundDetail = val;
            this.inboundDetail.inbound_number = this.smNumber;
        },

        closeDialog() {
            this.dialogEditReceivingLogActive = false
            this.inboundDetail = null;
            this.$emit('refresh')
        },
    }
}
</script>
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
            @actionEdit="editReceivingLog"
        />

        <dialog-edit-receiving-log
            ref="dialogEditReceivingLog"
            :active="dialogEditReceivingLogActive"
            :receivingLogId="receivingLogId"
            @closeDialog="closeDialog"
        />
    </div>
</template>

<script>
import axios from "axios";
import master from "@/mixins/master"

import TableMaster from "@/components/table/tableMaster.vue"
import DialogEditReceivingLog from '@/views/inbound/scan/dialogEditReceivingLog'

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
        refresh: Function
    },
    components: {
        "table-master" : TableMaster,
        "dialog-edit-receiving-log": DialogEditReceivingLog
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
            loadingDetail: false,
            receivingLogId: "",
            dialogEditReceivingLogActive: false,
        }
    },
    computed: {
        listenLoading(){
            return this.loading
        }
    },
    methods: {
        async editReceivingLog(val){
            this.dialogEditReceivingLogActive = true;  
            this.receivingLogId = val.receiving_log_id
        },
        closeDialog() {
            this.dialogEditReceivingLogActive = false
            this.receivingLogId = "";
            this.$emit('refresh')
        },
    },
}
</script>
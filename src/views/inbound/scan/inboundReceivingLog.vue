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
            :closeDialog="closeDialog"
            :receivingLogId="receivingLogId"
            @updateValue="updateValue"
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
        },
        updateValue(key, val) {
            switch(key) {
                case "KOLI_CODE":
                    this.koliCode = this.$refs.koliCode.value;
                    break;
                case "REMOVE_KOLI_CODE":
                    this.removeKoliCode = this.$refs.removeKoliCode.value;
                    break;
                case "TRIGGER_DATE":
                    this.dateRange = val
                    this.refresh()
                    break;
                case "DIALOG_ENTRY_STATUS":
                    this.form = val
                    let formattedItems = {};
                        
                    this.listValidItem.forEach(item => {
                        let key = `item_number_${this.generateRandomString(5)}`;
                        formattedItems[key] = item;
                    });

                    this.form = {
                        ...this.form,
                        ...formattedItems
                    };

                    this.handleSubmit()
                    break;
                default:
            }
        },
        async handleSubmit() {
            const formData = new FormData();
            for (const key in this.form) {
                formData.append(key, this.form[key]);
            }

            this.loadingSubmit = true;

            if (this.form.irregularity_id) {
                await axios
                    .post(
                        this.URL.irregularities + `/update?n=${this.listenNodeId}`,
                        formData, 
                        this.Helper.header())
                    .then(res => {
                        this.loadingSubmit = false;
                        this.dialogEditReceivingLogActive = false
                        this.refresh()
                        this.openNotification(null, 'Success', 'Create new entry status is success')
                        this.handleClearForm();
                    }).catch(err => {
                        this.loadingSubmit = false;
                        this.openNotification('danger', err.response ? err.response.data.code : '', 'Create new entry status failed', err.response ? err.response.data.message : 'something went wrong')
                    })
            } else {
                await axios
                    .post(
                        this.URL.irregularities + `?n=${this.listenNodeId}`,
                        formData, 
                        this.Helper.header())
                    .then(res => {
                        this.loadingSubmit = false;
                        this.dialogEditReceivingLogActive = false
                        this.refresh()
                        this.openNotification(null, 'Success', 'Create new entry status is success')
                        this.handleClearForm();
                    }).catch(err => {
                        this.loadingSubmit = false;
                        this.openNotification('danger', err.response ? err.response.data.code : '', 'Create new entry status failed', err.response ? err.response.data.message : 'something went wrong')
                    })
            }   

            this.$nextTick(() => {
                const inputElement = this.$refs.koliCode.$el.querySelector('input');
                if (inputElement) {
                    inputElement.focus();
                }
            });
        },
    },
}
</script>
<template>
    <dialog-master 
        width="lg"
        :actived="listenActive" 
        :loading="listenLoading"
        :closeDialog="cancel"
    >
        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <vs-row v-if="!loading" justify="space-between">
                <vs-col v-if="isReferenceShipper || isRefereceAll" xs="12" sm="6" :lg="isRefereceAll ? 6 : 12">
                    <input-text-area 
                        id="shipper"
                        label="Shipper"
                        v-model="shipper_info"
                        :rows="6"
                        :cols="50"
                        :disabled="true"
                    />
                </vs-col>
                <vs-col v-if="isReferenceReceiver || isRefereceAll" xs="12" sm="6" :lg="isRefereceAll ? 6 : 12">
                    <input-text-area 
                        id="receiver"
                        label="Receiver"
                        v-model="receiver_info"
                        :rows="6"
                        :cols="50"
                        :disabled="true"
                    />
                </vs-col>
                <vs-col xs="12" sm="12" lg="12">
                    <template>
                        <p class="note-warning">
                            <b>Note</b> : {{ summary_info.percentage }}% Potensi masalah berasal dari {{ summary_info.reference ? (summary_info.reference).toLowerCase() : '' }} 
                        </p>
                    </template>
                </vs-col>
            </vs-row>
        </template>
    </dialog-master>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import DialogMaster from "@/components/dialog/dialogMaster"
import InputTextArea from "@/components/input/textArea"

export default {
    name:"dialog-warning-runsheet",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "input-text-area": InputTextArea,
    },
    props: {
        title: String,
        warning_id: String,
        active: Boolean,
        closeDialog: Function
    },
    data() {
        return {
            loading: false,
            dataItem: {},
            remark: '',
            shipper_info: '',
            receiver_info: '',
            summary_info: '',
            applied_setting_info: '',
            isRefereceAll: false,
            isReferenceShipper: false,
            isReferenceReceiver: false
        }
    },
    computed: {
        listenActive(){
            if(this.active){
                this.getDataWarningRunsheet(this.listenWarningId)
            }
            return this.active
        },
        listenTitle(){
            return this.title
        },
        listenWarningId(){
            return this.warning_id
        },
        listenLoading(){
            return this.loading
        },
    },
    watch: {
    },
    methods: {
        async getDataWarningRunsheet(id){
            this.loading = true
            
            await axios
                .get(this.URL.warning_runsheet + `/${id}?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, this.Helper.header())
                .then(res => {
                    this.dataItem = res.data.data;
                    
                    this.applied_setting_info = this.dataItem.applied_setting

                    this.isRefereceAll = this.applied_setting_info.reference == 'ALL' ? true : false;
                    this.isReferenceShipper = this.applied_setting_info.reference == 'SHIPPER' ? true : false;
                    this.isReferenceReceiver = this.applied_setting_info.reference == 'RECEIVER' ? true : false;
                    
                    this.shipper_info = this.dataItem.shipper.name + '\n\n' +
                        this.dataItem.shipper.phone_number + '\n\n' +
                        this.dataItem.shipper.failed_count + ' dari ' +
                        this.dataItem.shipper.total_count + 
                        ' Paket yang dikirim penjual undelivered';
                    
                    let message_penerima = this.dataItem.receiver.total_count > 0 
                        ? this.dataItem.receiver.failed_count + ' dari ' + this.dataItem.receiver.total_count + ' Paket yang ditujukan kepada penerima undelivered' 
                        : 'Belum pernah menerima paket'
                    this.receiver_info = this.dataItem.receiver.name + '\n\n' +
                        this.dataItem.receiver.phone_number + '\n\n' +
                        message_penerima;

                    this.summary_info = this.dataItem.summary
                }).catch(err => {
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate service list', err)
                })

            this.loading = false
        },
        handleClearForm(){
            this.dataItem = {}
        },  
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        },
    },
    created() {
    },
    mounted() {
    },
}
</script>
<style scoped>
.note-warning {
    font-size: 11px;
    text-align: start;
}
</style>
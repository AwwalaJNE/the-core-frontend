<template>
    <dialog-master 
        :actived="listenActive" 
        :loading="listenLoading"
        :closeDialog="cancel"
        width="md"
    >

        <template v-slot:header>
            Add Remark
        </template>

        <template v-slot:content>
            <vs-row justify="space-between">
                <vs-col xs="12" sm="12" lg="12">
                    <template v-if="loadingStatus == false && status_arr.length > 0">
                        <selector 
                            :ref="''"
                            name="Status" 
                            :rules="''" 
                            formKey="status"
                            :valueData="status_arr"
                            :selectedValue="''"
                            :isMultiple="false"
                            @updateValue="updateValue" 
                        />
                    </template>
                </vs-col>
                <vs-col xs="12" sm="12" lg="12">
                    <template v-if="loadingGudang == false && gudang_arr.length > 0 && status.includes('TS-04')">
                        <selector 
                            :ref="''"
                            name="Gudang" 
                            :rules="''" 
                            formKey="gudang"
                            :valueData="gudang_arr"
                            :selectedValue="''"
                            :isMultiple="false"
                            @updateValue="updateValue" 
                        />
                    </template>
                </vs-col>
                <vs-col xs="12" sm="12" lg="12">
                    <input-text-area 
                        id="remark"
                        label="Remark"
                        v-model="remark"
                        :rows="5"
                        :cols="50"
                    />
                </vs-col>
                <vs-col xs="12" sm="12" lg="12">
                    <template v-if="gudang_arr.length === 0">
                        <p class="no-warehouse"><b>Notes</b> : Status Hold WH tidak tersedia karena tidak terdapat gudang pada lokasi Anda</p>
                    </template>
                </vs-col>
            </vs-row>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="3">
                    <vs-button
                        transparent
                        block
                        danger
                        flat
                        :active="true"
                        @click="cancel"
                    >
                        Cancel
                    </vs-button>
                </vs-col>
                <vs-col w="3">
                    <vs-button
                        transparent
                        block
                        flat
                        :active="true"
                        type="submit"
                        @click="handleSubmit"
                    >
                       Submit
                    </vs-button>
                </vs-col>
            </vs-row>  
        </template>

    </dialog-master>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"

import DialogMaster from "@/components/dialog/dialogMaster"
import InputGeneral from "@/components/input/general"
import InputTextArea from "@/components/input/textArea"
import Selector from "@/components/input/select"

export default {
    name:"dialog-remark",
    mixins:[master],
    components: {
        "dialog-master": DialogMaster,
        "input-general": InputGeneral,
        "input-text-area": InputTextArea,
        "selector": Selector
    },
    props: {
       closeDialog: Function, 
       active: Boolean,
       title: String,
       callRefreshRemarkFunction: Function,
       itemNumber: String
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenLoading(){
            return this.loadingStatus || this.loadingGudang || this.loadingRemark
        },
    },
    watch: {
        active: function (val) {
            if (val == true) {
                this.getDataStatus()
                this.getDataGudang()
            }
        }
    },
    data() {
        return {
            koli_number: this.$route.params.id,
            status_arr: [],
            gudang_arr: [],
            status: '',
            gudang: 0,
            remark: '',
            loadingStatus: false,
            loadingGudang: false,
            loadingRemark: false
        }
    },
    methods: {
        updateValue(key, val, info){
            switch(key) {
                case "status":
                    let obj_status = this.status_arr.filter(item => item.value == val)[0]

                    if(Object.keys(obj_status).length > 0) {
                        if(obj_status.hasOwnProperty('item')) {
                            this.status = obj_status.item.lov_value_code || ''
                        }
                    }
                    break;
                case "gudang":
                    let obj_gudang = this.gudang_arr.filter(item => item.value == val)[0]

                    if(Object.keys(obj_gudang).length > 0) {
                        if(obj_gudang.hasOwnProperty('item')) {
                            this.gudang = obj_gudang.item.node_id || ''
                        }
                    }
                    break;
                case "remark":
                    this.remark = val
                    break;
            }
        },
        async getDataStatus(){
            this.loadingStatus = true
            await axios
                .get(this.URL.tracing_status + `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1&item_number=${this.itemNumber}`, this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            if (item.lov_value) {
                                let obj = {}
                                obj["label"] = item.lov_value
                                obj["value"] = item.lov_value_code
                                obj["item"] = item

                                arr.push(obj)
                            }
                        })

                        if(arr.length == 0) {
                            arr = [{'label': null, 'value': null}]
                        }

                        this.status_arr = arr
                        
                    }
                    this.loadingStatus = false
                }).catch(err => {
                    this.loadingStatus = false
                    this.openNotification('danger', err?.response?.data?.code ?? "", 'Failed to get status', err?.response?.data?.message ?? 'Something went wrong');
                })
        },
        async getDataGudang(){
            this.loadingGudang = true
            await axios
                .get(this.URL.tracing_warehouse + `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`, this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.node_name
                            obj["value"] = item.node_id
                            obj["item"] = item

                            arr.push(obj)
                        })

                        if(arr.length == 0) {
                            arr = [{'label': null, 'value': null}]
                        }

                        this.gudang_arr = arr
                        
                    }
                    this.loadingGudang = false
                }).catch(err => {
                    this.loadingGudang = false
                    this.openNotification('danger', err?.response?.data?.code ?? "", 'Failed to get data warehouse', err?.response?.data?.message ?? 'Something went wrong');
                })
        },
        async handleSubmit(){
            this.loadingRemark = true;

            await axios
                .post(
                    this.URL.tracing + `/${this.koli_number}/remark?n=${this.listenNodeId}`,
                    JSON.stringify({
                        "status_code": this.status,
                        "warehouse_node_id": this.gudang,
                        "remark": this.remark
                    }), 
                    this.Helper.header())
                .then(res => {
                    this.loadingRemark = false
                    this.cancel()
                    this.openNotification("success", null, "Success", res?.data?.message ?? 'Create new tracing remark is success');
                }).catch(err => {
                    this.loadingRemark = false
                    this.openNotification('danger', err?.response?.data?.code ?? "", 'Create new tracing remark failed', err?.response?.data?.message ?? 'Something went wrong');
                })

            this.callRefreshRemarkFunction();
        },
        handleClearForm(){
            this.status = ''
            this.gudang = ''
            this.remark= ''
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        }
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    }
}
</script>
<style scoped>
.no-warehouse {
    font-size: 11px;
    text-align: start;
}
</style>
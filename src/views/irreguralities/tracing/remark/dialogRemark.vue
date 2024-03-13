<template>
    <dialog-master 
        :actived="listenActive" 
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
                    <!-- TODO: change the includes -->
                    <template v-if="loadingGudang == false && gudang_arr.length > 0 && status.includes('HOLD WH')">
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
    },
    computed: {
        listenActive(){
            return this.active
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
            form: {},
            status_arr: [],
            gudang_arr: [],
            status: '',
            gudang: '',
            remark: '',
            loadingStatus: true,
            loadingGudang: true
        }
    },
    methods: {
        updateValue(key, val, info){
            switch(key) {
                case "status":
                    let obj_status = this.status_arr.filter(item => item.value == val)[0]

                    if(Object.keys(obj_status).length > 0) {
                        if(obj_status.hasOwnProperty('item')) {
                            this.status = obj_status.item.lov_value || ''
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
                    this.remark= val
                    break;
                default:
                    console.log('meong')
                    // code block
            }
        },
        async getDataStatus(){
            this.loadingStatus = true
            await axios
                .get(this.URL.tracing_status + `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`, this.Helper.header())
                .then(res => {
                    console.log("AW statu", res)
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.lov_value
                            obj["value"] = item.lov_id
                            obj["item"] = item

                            arr.push(obj)
                        })

                        if(arr.length == 0) {
                            arr = [{'label': null, 'value': null}]
                        }

                        this.status_arr = arr
                        
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    this.loadingStatus = false
                }).catch(err => {
                    this.loadingStatus = false
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getDataGudang(){
            this.loadingGudang = true
            await axios
                .get(this.URL.tracing_warehouse + `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`, this.Helper.header())
                .then(res => {
                    console.log("AW", res)
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
                        
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    this.loadingGudang = false
                }).catch(err => {
                    this.loadingGudang = false
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        handleSubmit(){
            let form = {}
            form['status'] = this.status
            form['gudang'] = this.gudang
            form['remark'] = this.remark
            console.log("Aww", form)
            this.$emit("updateValue", 'DIALOG_CANCEL',form)
        },
        handleClearForm(){
            this.form = {}
            this.status = ''
            this.gudang = ''
            this.remark= ''
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        }
    },
}
</script>
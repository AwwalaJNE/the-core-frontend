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
                    <template v-if="loading == false && status_arr.length > 0">
                        <selector 
                            :ref="''"
                            name="Status" 
                            :rules="''" 
                            formKey="status"
                            :valueData="status_arr"
                            :selectedValue="''"
                            :isMultiple="false"
                            @updateValue="updateValue" />
                    </template>
                </vs-col>
                <vs-col xs="12" sm="12" lg="12">
                    <template v-if="loading == false && status_arr.length > 0">
                        <selector 
                            :ref="''"
                            name="Gudang" 
                            :rules="''" 
                            formKey="status"
                            :valueData="status_arr"
                            :selectedValue="''"
                            :isMultiple="false"
                            @updateValue="updateValue" />
                    </template>
                </vs-col>
                <!-- <vs-col xs="12" sm="12" lg="12">
                    <input-general
                        name="Remark"
                        :rules="''"
                        formKey="remark"
                        :valueData="''"
                        typeInput="text"
                        @updateValue="updateValue" 
                    />
                </vs-col> -->
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
            }
        }
    },
    data() {
        return {
            form: {},
            status_arr: [],
            irregularity_type: '',
            irregularity_status: '',
            remark: '',
            loading: true
        }
    },
    methods: {
        updateValue(key, val, info){
            switch(key) {
                case "status":
                    
                    let obj = this.status_arr.filter(item => item.value == val)[0]
                    console.log('status', val, obj)
                    if(Object.keys(obj).length > 0) {
                        if(obj.hasOwnProperty('item')) {
                            this.irregularity_type = obj.item.status_subtype || ''
                            this.irregularity_status = obj.item.status || ''
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
            this.loading = true
            await axios
                .get(this.URL.status + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            if(item.hasOwnProperty('status_subtype')) {
                                if(item['status_subtype'].toLowerCase().includes('cancel')) {
                                    let obj = {}
                                    obj["label"] = item.status_description
                                    obj["value"] = item.status_id
                                    obj["item"] = item

                                    arr.push(obj)
                                }
                            }
                        })

                        if(arr.length == 0) {
                            arr = [{'label': null, 'value': null}]
                        }

                        this.status_arr = arr
                        
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        handleSubmit(){
            let form = {}
            form['irregularity_type'] = this.irregularity_type
            form['irregularity_status'] = this.irregularity_status
            form['remark'] = this.remark
            this.$emit("updateValue", 'DIALOG_CANCEL',form)
        },
        handleClearForm(){
            this.form = {}
            this.irregularity_type = ''
            this.irregularity_status = ''
            this.remark= ''
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        }
    },
}
</script>
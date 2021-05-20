<template>
    <dialog-master 
    :actived="listenActive" 
    :closeDialog="cancel"
    width="md">

        <template v-slot:header>
            Problem Connote
        </template>

        <template v-slot:content>
            <vs-row justify="space-between">
                <vs-col xs="12" sm="12" lg="12">
                    <template v-if="loading == false && status_code_arr.length > 0">
                        <pre>{{dataItem}}</pre>
                        <selector 
                            :ref="''"
                            name="Status Code" 
                            :rules="''" 
                            formKey="status_code"
                            :valueData="status_code_arr"
                            :selectedValue="irregularity_status_code"
                            :isMultiple="false"
                            @updateValue="updateValue" />
                    </template>
                </vs-col>
                <template v-if="inputType.key !== null">
                    <vs-col xs="12" sm="12" lg="12">
                        <input-general
                        :name="inputType.label"
                        :rules="''"
                        formKey="inputType"
                        :valueData="inputType.value"
                        typeInput="text"
                        @updateValue="updateValue" />
                    </vs-col>
                </template>
                <vs-col xs="12" sm="12" lg="12">
                    <input-general
                    name="Remark"
                    :rules="''"
                    formKey="remark"
                    :valueData="remark"
                    typeInput="text"
                    @updateValue="updateValue" />
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
import InputGeneral from "@/components/input/general"
import Selector from "@/components/input/select"
import DialogMaster from "@/components/dialog/dialogMaster"
export default {
    name:"irreguralities-cancel-dialog",
    mixins:[master],
    components: {
        "input-general": InputGeneral,
        "selector": Selector,
        "dialog-master": DialogMaster,
    },
    props: {
       closeDialog: Function, 
       active: Boolean,
       title: String,
       dataItem: Object
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenDataItem() {
            return this.dataItem || {}
        }
    },
    watch: {
        active: function (val) {
            if (val == true) {
                this.getDataStatus()
                this.initDataItem()
            }
        }
    },
    data() {
        return {
            form: {},
            status_code_arr: [],
            irregularity_id: '',
            irregularity_type: '',
            irregularity_status_code: '',
            
            remark: '',
            loading: true,
            inputType: {
                type: 'text',
                label: '',
                key: null,
                value: ''
            }
        }
    },
    methods: {
        initDataItem() {
            if(Object.keys(this.listenDataItem).length > 0) {
                this.irregularity_id = this.listenDataItem.irregularity_id || ''
                this.irregularity_type = this.listenDataItem.irregularity_type || ''
                this.irregularity_status_code = this.listenDataItem.irregularity_status_code || ''
                this.remark = this.listenDataItem.remark || ''

                if(this.listenDataItem.irregularity_status_description.toLowerCase().includes('criscross')) {
                    this.inputType['label'] = 'Nomer Connote'
                    this.inputType['key'] = 'nomor_connote'
                    this.inputType['value'] = this.listenDataItem.koli_number || ''
                } else if(this.listenDataItem.irregularity_status_description.toLowerCase().includes('misroute')){
                    this.inputType['label'] = 'Zip Code'
                    this.inputType['key'] = 'kode_pos'
                    this.inputType['value'] = this.listenDataItem.zip_code || ''
                }
            }
        },
        updateValue(key, val, info){
            switch(key) {
                case "status_code":
                    let obj = this.status_code_arr.filter(item => item.value == val)[0]
                    console.log('status_code', val, obj)
                    if(Object.keys(obj).length > 0) {
                        if(obj.hasOwnProperty('item')) {
                            this.irregularity_type = obj.item.status_subtype || ''
                            this.irregularity_status_code = obj.item.status_code || ''
                        }

                        if(obj['label'].toLowerCase().includes('criscross')) {
                            this.inputType['label'] = 'Nomer Connote'
                            this.inputType['key'] = 'nomor_connote'
                        } else if(obj['label'].toLowerCase().includes('misroute')){
                            this.inputType['label'] = 'Zip Code'
                            this.inputType['key'] = 'kode_pos'
                        }
                    }
                    break;
                case "remark":
                    this.remark= val
                    break;
                case "inputType":
                    this.inputType['value'] = val
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
                                if(item['status_subtype'].toLowerCase().includes('problem')) {
                                    let obj = {}
                                    obj["label"] = item.status_description
                                    obj["value"] = item.status_code
                                    obj["item"] = item

                                    arr.push(obj)
                                }
                            }
                        })

                        if(arr.length == 0) {
                            arr = [{'label': null, 'value': null}]
                        }

                        this.status_code_arr = arr
                        
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
            form['irregularity_status_code'] = this.irregularity_status_code
            form['remark'] = this.remark
            form[this.inputType['key']] = this.inputType['value']
            this.$emit("updateValue", 'DIALOG_CANCEL',form)
        },
        handleClearForm(){
            this.form = {}
            this.irregularity_type = ''
            this.irregularity_status_code = ''
            this.remark= ''
            
            this.inputType['key'] = null
            this.inputType['value'] = ''
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        }
    },
}
</script>
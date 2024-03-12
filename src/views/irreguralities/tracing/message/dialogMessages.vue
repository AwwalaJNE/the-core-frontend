<template>
    <dialog-master 
        :actived="listenActive" 
        :closeDialog="cancel"
        width="md"
    >

        <template v-slot:header>
            Message Masking
        </template>

        <template v-slot:content>
            <vs-row justify="space-between">
                <vs-col xs="12" sm="12" lg="12">
                    <input-general
                        name="Koli"
                        :rules="''"
                        formKey="koli"
                        :valueData="''"
                        typeInput="text"
                        @updateValue="updateValue" 
                    />
                </vs-col>
                <vs-col xs="12" sm="12" lg="12">
                    <input-general
                        name="Date Created"
                        :rules="''"
                        formKey="date_created"
                        :valueData="''"
                        typeInput="text"
                        @updateValue="updateValue" 
                    />
                </vs-col>
                <vs-col xs="12" sm="12" lg="12">
                    <input-general
                        name="User"
                        :rules="''"
                        formKey="user"
                        :valueData="''"
                        typeInput="text"
                        @updateValue="updateValue" 
                    />
                </vs-col>
                <vs-col xs="12" sm="12" lg="12">
                    <input-general
                        name="Receiver Phone"
                        :rules="''"
                        formKey="receiver_phone"
                        :valueData="''"
                        typeInput="text"
                        @updateValue="updateValue" 
                    />
                </vs-col>
                <!-- <vs-col xs="12" sm="12" lg="12">
                    <input-general
                        name="Message"
                        :rules="''"
                        formKey="message"
                        :valueData="''"
                        typeInput="text"
                        @updateValue="updateValue" 
                    />
                    
                </vs-col> -->
                <vs-col xs="12" sm="12" lg="12">
                    <input-text-area 
                        id="message"
                        label="Message"
                        v-model="message"
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
import InputGeneral from "@/components/input/general"
import InputTextArea from "@/components/input/textArea"
import Selector from "@/components/input/select"
import DialogMaster from "@/components/dialog/dialogMaster"
export default {
    name:"irreguralities-cancel-dialog",
    mixins:[master],
    components: {
        "input-general": InputGeneral,
        "selector": Selector,
        "dialog-master": DialogMaster,
        "input-text-area": InputTextArea,
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
                this.getDataKoli()
            }
        }
    },
    data() {
        return {
            description: '',

            form: {},
            koli_arr: [],
            irregularity_type: '',
            irregularity_koli: '',
            remark: '',
            loading: true
        }
    },
    methods: {
        updateValue(key, val, info){
            switch(key) {
                case "koli":
                    
                    let obj = this.koli_arr.filter(item => item.value == val)[0]
                    console.log('koli', val, obj)
                    if(Object.keys(obj).length > 0) {
                        if(obj.hasOwnProperty('item')) {
                            this.irregularity_type = obj.item.koli_subtype || ''
                            this.irregularity_koli = obj.item.koli || ''
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
        async getDataKoli(){
            this.loading = true
            await axios
                .get(this.URL.koli + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            if(item.hasOwnProperty('koli_subtype')) {
                                if(item['koli_subtype'].toLowerCase().includes('cancel')) {
                                    let obj = {}
                                    obj["label"] = item.koli_description
                                    obj["value"] = item.koli_id
                                    obj["item"] = item

                                    arr.push(obj)
                                }
                            }
                        })

                        if(arr.length == 0) {
                            arr = [{'label': null, 'value': null}]
                        }

                        this.koli_arr = arr
                        
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
            form['irregularity_koli'] = this.irregularity_koli
            form['remark'] = this.remark
            this.$emit("updateValue", 'DIALOG_CANCEL',form)
        },
        handleClearForm(){
            this.form = {}
            this.irregularity_type = ''
            this.irregularity_koli = ''
            this.remark= ''
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        }
    },
}
</script>
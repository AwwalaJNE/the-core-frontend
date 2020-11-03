<template>
    <dialog-master 
    :actived="listenActive" 
    :closeDialog="closeDialogUser">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form-master ref="formMaster" @onSubmit="onSubmit">
                    <template v-slot:inputValidator>
                        <template >
                                <vs-row v-for="(item, keys) in Object.keys(formUser)" :key="keys">
                                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
                                        <template v-if="formUser[item].typeInput.split('|')[0].toLowerCase() == 'text'">
                                            <input-general 
                                            :name="formUser[item].label" 
                                            :rules="formUser[item].rule" 
                                            :formKey="formUser[item].key"
                                            :valueData="formUser[item].value"
                                            @updateValue="updateValue" />
                                        </template>
                                        <template v-else-if="formUser[item].typeInput.toLowerCase() == 'select'">
                                            <selector 
                                            :ref="formUser[item].key"
                                            :name="formUser[item].label" 
                                            :rules="formUser[item].rule" 
                                            :formKey="formUser[item].key"
                                            :valueData="formUser[item].arrData"
                                            :selectedValue="formUser[item].value"
                                            :isMultiple="false"
                                            @updateValue="updateValue" />
                                        </template>
                                    </vs-col>
                                </vs-row>
                        </template>
                    </template>
                </form-master>
            </div>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="3">
                    <vs-button
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
                    block
                    flat
                    :active="true"
                    @click="handleSubmit"
                    >
                        {{btnBlue || 'Add'}}
                    </vs-button>
                </vs-col>
            </vs-row>
        </template>

    </dialog-master>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import FormMaster from "@/components/form/formMaster"
import InputGeneral from "@/components/input/general"
import DialogMaster from "@/components/dialog/dialogMaster"
import Selector from "@/components/input/select"
export default {
    name:"dialog-create-edit-user",
    mixins: [master],
    components: {
        'dialog-master': DialogMaster,
        "form-master": FormMaster,
        "input-general": InputGeneral,
        "selector": Selector,
    },
    props: {
       closeDialogUser: Function, 
       refresh: Function,
       active: Boolean,
       title: String,
       dataItem: Object,
       btnRed: String,
       btnBlue: String
    },
    data() {
        return {
            form: {},
            formUser: this.$store.getters.getInputs.user ? this.$store.getters.getInputs.user : {},
            user_id: '',
            dataRole: [],
            loadingDataRole: false
        }
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenTitle(){
            return this.title
        }
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                
                Object.keys(this.formUser).map(item => {
                    let action = item.toUpperCase()
                    if(val.hasOwnProperty(item)) {
                        this.$store.dispatch(`SET_USER_${action}`, val[item])
                        this.form[item] = val[item]
                    }
                })

                this.user_id = val.user_id
                console.log(this.dataItem, 'nihh watch')
                console.log(this.form, 'formaahh')
                
            }
        },
    },
    methods: {
        async getDataRole(){
            this.loadingDataRole = true
            await axios
                .get(this.URL.role + 
                `?n=1&sort_order=desc&limit=1000&page=1`, 
                this.Helper.header())
                .then(res => {
                    console.log(res)
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.user_role_name
                            obj["value"] = item.user_role_id

                            arr.push(obj)
                        })
                        this.dataRole = arr
                        this.$store.dispatch("SET_USER_USER_ROLE_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                    this.loadingDataRole = false
                }).catch(err => {
                    this.loadingDataRole = false
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        updateValue(type, val) {
            let action = type.toUpperCase()
            // let err = this.form[`${type}`] !== undefined ? this.form[type] = val : true
            let err = this.formUser[`${type}`] !== undefined ? this.$store.dispatch(`SET_USER_${action}`, val !== undefined && val !== '' ? val : '') : true
            if(err == true) {
                console.log(`error dispatch SET_USER_${action} | val ` + val)
            }
        },
        handleSubmit(){
            this.$refs.formMaster.formSubmit() // trigger function submit form dari luar component formMaster
        },
        onSubmit(refs){
            console.log('onsubmit', refs)
                refs.form.validate().then(success => {
                if (!success) {
                    console.log('err niih')
                return;
                }
                
                Object.keys(this.formUser).map(item => {
                    this.form[item] = this.formUser[item].value
                })
                if(this.user_id !== undefined && this.user_id !== '') {
                    console.log('update')
                    this.updateData()
                } else {
                    console.log('create new')
                    this.addData()
                }

                // Wait until the models are updated in the UI
                this.$nextTick(() => {
                    refs.form.reset();
                });
            });
        },
        async updateData() {
            await axios
                .put(
                    this.URL.user + `/${this.user_id}?n=1`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.handleClearForm()
                    this.closeDialogUser()
                    this.refresh()
                    this.openNotification(null, 'Success', 'Update user is success')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed', err.response.data.message)
                })
        },
        async addData() {
            await axios
                .post(
                    this.URL.user + `?n=1`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.handleClearForm()
                    this.closeDialogUser()
                    this.refresh()
                    this.openNotification(null, 'Success', 'Create user is success')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed add data', err.response.data.message)
                })
        },
        handleClearForm(){
            Object.keys(this.formUser).map(item => {
                let action = item.toUpperCase()
                this.$store.dispatch(`SET_USER_${action}`, '')
                this.$store.dispatch(`SET_USER_${action}_ValueData`, '')
                if(item.hasOwnProperty('arrData')) {
                    this.$store.dispatch(`SET_USER_${action}_ArrData`, '')
                }
            })
            this.form = {}
        },
        cancel() {
            this.handleClearForm()
            this.closeDialogUser()
        }
    },
    mounted() {
        this.getDataRole()
    },
}
</script>
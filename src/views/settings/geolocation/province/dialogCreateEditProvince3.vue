<template>
    <dialog-master 
    :actived="listenActive" 
    :closeDialog="closeDialog">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form-master ref="formMaster" @onSubmit="onSubmit">
                    <template v-slot:inputValidator>

                        <selector 
                        ref="CountrySelector"
                        name="Country" 
                        rules="required" 
                        formKey="geolocation_country_id"
                        :valueData="dataCountry"
                        :selectedValue="form.geolocation_country_id"
                        :isMultiple="false"
                        @updateValue="updateValue" />

                        <input-general 
                        name="Province Name" 
                        rules="required" 
                        formKey="geolocation_province_name"
                        :valueData="form.geolocation_province_name"
                        @updateValue="updateValue" />

                        <input-general 
                        name="Time Zone" 
                        rules="required" 
                        formKey="geolocation_province_time_zone"
                        :valueData="form.geolocation_province_time_zone"
                        @updateValue="updateValue" />

                        <Checkbox :isChecked="false" @changed="changed"/>
                    </template>
                </form-master>
            </div>
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
                        Add
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
import Selector from "@/components/input/select"
import Checkbox from "@/components/input/checkbox"
import DialogMaster from "@/components/dialog/dialogMaster"
export default {
    name:"dialog-create-edit-geolocation-province",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-master": FormMaster,
        "input-general": InputGeneral,
        "selector": Selector,
        "Checkbox": Checkbox
    },
    props: {
       closeDialog: Function, 
       refresh: Function,
       active: Boolean,
       title: String,
       dataItem: Object
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenTitle(){
            return this.title
        }
    },
    data() {
        return {
            form: {
                geolocation_province_name:'',
                geolocation_province_time_zone:'',
                geolocation_country_id:'',
                is_active:false
            },
            geolocation_province_id: '',
            dataCountry: [],
            loadingDataCountry: null
        }
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.form.geolocation_province_name = val.geolocation_province_name
                this.form.geolocation_province_time_zone = val.geolocation_province_time_zone
                this.form.geolocation_country_id = val.geolocation_country_id
                this.form.is_active = val.is_active

                this.geolocation_province_id = val.geolocation_province_id
                console.log(this.dataItem, 'nihh watch')
                console.log(this.form, 'form')
                
            }
        }
    },
    methods: {
        loadingHandler(){
            this.loadingDataCountry = this.$vs.loading({
                target: this.$refs.CountrySelector,
                color: '#333'
            })
        },
        closeLoading(){
            this.loadingDataCountry !== null ? this.loadingDataCountry.close() : null
        },
        async getDataCountry() {
            this.loadingHandler()
            await axios
                .get(this.URL.geolocation_country + 
                `?n=1&sort_order=desc&&limit=${1000}&page=${1}`, 
                this.Helper.header())
                .then(res => {
                    console.log(res)
                    if(res.data.data.length > 0) {
                        let dataTemp = res.data.data
                        let arr = []
                        dataTemp.map(item =>  {
                            let obj = {}
                            obj["label"] = item.geolocation_country_name
                            obj["value"] = item.geolocation_country_id
                            arr.push(obj)
                        })
                        this.dataCountry = arr
                    } else {
                        this.openNotification('warn', 'Country data is empty!', ' Please create a new country data')
                    }
                    
                    this.closeLoading()
                }).catch(err => {
                    this.closeLoading()
                    this.openNotification('danger', 'Failed to populate country list', err)
                })
        },
        changed(val){
            if(val !== undefined) {
                this.form.is_active = val
            }
        },
        updateValue(type, val) {
            console.log('updateValue', type, val)
            let err = this.form[`${type}`] !== undefined ? this.form[type] = val : true

            if(err == true) {
                console.log(`error this.form[${type}] | val ` + val + this.form[`${type}`])
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

                console.log('this.geolocation_province_id',this.geolocation_province_id)
                if(this.geolocation_province_id !== undefined && this.geolocation_province_id !== '') {
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
        async updateData(){
            await axios
                .put(
                    this.URL.geolocation_province + `/${this.geolocation_province_id}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.form.geolocation_province_name = ""
                    this.form.geolocation_province_time_zone = ""
                    this.form.geolocation_country_id = ""
                    this.form.is_active = false
                    this.geolocation_province_id = ""
                    this.closeDialog()
                    this.refresh()
                    this.openNotification(null, 'Success', 'Update role is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialog()
                    this.refresh()
                    this.openNotification('danger', 'Update role is failed', err)
                })
        },
        async addData() {
            console.log('form', this.form)
            await axios
                .post(
                    this.URL.geolocation_province,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.form.geolocation_province_name = ""
                    this.form.geolocation_province_time_zone = ""
                    this.form.geolocation_country_id = ""
                    this.form.is_active = false
                    this.geolocation_province_id = ""
                    this.closeDialog()
                    this.refresh()
                    this.openNotification(null, 'Success', 'Create new role is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialog()
                    this.refresh()
                    this.openNotification('danger', 'Create new role is failed', err)
                })
        },
        cancel() {
            
            this.form.geolocation_province_name = ""
            this.form.geolocation_province_time_zone = ""
            this.form.geolocation_country_id = ""
            this.form.is_active = false

            this.geolocation_province_id = ""
            
            this.closeDialog()
        }
    },
    mounted() {
        this.getDataCountry()
    },
}
</script>
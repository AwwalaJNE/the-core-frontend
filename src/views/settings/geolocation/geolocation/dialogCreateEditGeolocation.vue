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
                        
                        <input-general 
                        name="Country Name" 
                        rules="required" 
                        formKey="geolocation_country_name"
                        :valueData="form.geolocation_country_name"
                        @updateValue="updateValue" />

                        <input-general 
                        name="Country Code" 
                        rules="required" 
                        formKey="geolocation_country_code"
                        :valueData="form.geolocation_country_code"
                        @updateValue="updateValue" />

                        <input-general 
                        name="Currency Code" 
                        rules="required" 
                        formKey="tariff_currency_code"
                        :valueData="form.tariff_currency_code"
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
    name:"dialog-create-edit-geolocation",
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
                geolocation_country_name:'',
                geolocation_country_code:'',
                tariff_currency_code:'',
                is_active: false
            },
            geolocation_country_id: '',
            dataCountry: [],
            loadingDataCountry: null
        }
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.form.geolocation_country_name = val.geolocation_country_name
                this.form.geolocation_country_code = val.geolocation_country_code
                this.form.tariff_currency_code = val.tariff_currency_code
                this.form.is_active = val.is_active
                this.geolocation_country_id = val.geolocation_country_id


                
            }
        }
    },
    methods: {
        changed(val){
            if(val !== undefined) {
                this.form.is_active = val
            }
        },
        updateValue(type, val) {
            let err = this.form[`${type}`] !== undefined ? this.form[type] = val : true
            if(err == true) {

            }
        },
        handleSubmit(){
            this.$refs.formMaster.formSubmit() // trigger function submit form dari luar component formMaster
        },
        onSubmit(refs){

                refs.form.validate().then(success => {
                if (!success) {

                return;
                }


                if(this.geolocation_country_id !== undefined && this.geolocation_country_id !== '') {

                    this.updateData()
                } else {

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
                    this.URL.geolocation_country + `/${this.geolocation_country_id}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {

                    this.form.geolocation_country_name = ""
                    this.form.geolocation_country_code = ""
                    this.form.tariff_currency_code = ""
                    this.form.is_active = false
                    this.geolocation_country_id = ""
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

            await axios
                .post(
                    this.URL.geolocation_country,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {

                    this.form.geolocation_country_name = ""
                    this.form.geolocation_country_code = ""
                    this.form.tariff_currency_code = ""
                    this.form.is_active = false
                    this.geolocation_country_id = ""
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
            
            this.form.geolocation_country_name = ""
            this.form.geolocation_country_code = ""
            this.form.tariff_currency_code = ""
            this.form.is_active = false
            this.geolocation_country_id = ""
            
            this.closeDialog()
        }
    },
}
</script>
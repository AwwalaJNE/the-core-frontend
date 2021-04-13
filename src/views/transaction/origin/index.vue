<template>
    <div class="box" style="min-height: 500px;">
        <div>
            <vs-row justify="space-between">
                <vs-col xs="12" sm="2" lg="2">
                    <h3>Origin</h3>
                </vs-col>
                <vs-col xs="12" sm="6" lg="6">
                    <vs-row justify="flex-end">
                        <vs-col xs="12" sm="8" lg="8">
                            <template v-if="customer !== ''">
                                <span 
                                    :data-value="customer" 
                                    class="vs-select__chips__chip baloon"
                                    style="width: fit-content;"
                                    >
                                        {{`${customer}`}}
                                        <span class="vs-select__chips__chip__close" @click="removeCustomer()">
                                            <i class="vs-icon-close vs-icon-hover-less"></i>
                                        </span>
                                </span>
                            </template>
                        </vs-col>
                        <vs-col xs="12" sm="2" lg="2">
                            <vs-tooltip>
                                <vs-button
                                    shadow
                                    icon
                                    :active="false"
                                    @click="openGetCustomer"
                                    :tabindex="-1"
                                    style="margin:10px auto 0;"
                                >
                                    <i class='bx bx-user'></i>
                                </vs-button>
                                <template #tooltip>
                                    {{`Alt + f1 | Search customer origin`}}
                                </template>
                            </vs-tooltip>
                        </vs-col>
                    </vs-row>
                </vs-col>
            </vs-row>
        </div>
        <div class="con-form">
            <form-input-controller 
                        ref="formTransactionOriginController"
                        @formData="formData"
                        :dataItem="listenDataItem"
                        @searchTariffCode="searchTariffCode"
                        @onChangeCustom="onChangeCustom"
                        typeForm="origin"
                    />
            <!-- <template v-if="listenforcererender == true">
                <transition>
                    loading ...
                </transition>
            </template>
            <template v-else-if="listenforcererender == false">
                <transition>
                    <form-input-controller 
                        ref="formTransactionOriginController"
                        @formData="formData"
                        :dataItem="listenDataItem"
                        @searchTariffCode="searchTariffCode"
                        @onChangeCustom="onChangeCustom"
                        typeForm="origin"
                    />
                </transition>
            </template> -->
        </div>

        <customerByPhone
            :active="dialogGetCustomer" 
            :closeDialog="closeGetCustomer"
            title="origin"
            type="origin"
            @updateValue="updateValue"
        />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import customerByPhone from "@/views/transaction/customerByPhone"
import FormInputController from "@/views/transaction/formInputControllerTransaction"
export default {
    name: "origin",
    mixins: [master],
    components: {
        "form-input-controller": FormInputController, 
        "customerByPhone": customerByPhone
    },
    data() {
        return {
            dialogGetCustomer: false,
            dataItem: null,
            forcererender: false,
            customer:"",
            defaultOrigin:""
        }
    },
    computed: {
        listenDataItem(){
            return this.dataItem
        },
        listenforcererender() {
            return this.forcererender
        }
    },
    methods: {
        getDefaultState() {
            // console.log('get default', this.$store.state.transaction.calc_component)
            this.defaultOrigin = this.putusin(this.$store.state.transaction.origin)
        },
        putusin(obj) {
            // remove data binding
            // JSON.parse(JSON.stringify(obj))
            return JSON.stringify(obj)
        },
        removeCustomer(){
            this.customer = ""
            this.$store.dispatch("RESET_STATE", {'key': 'origin','state': this.defaultOrigin})
        },
        setFocus(){
            let inp = this.$refs.formTransactionOriginController.$refs.connote_shipper_name[0]
            console.log(inp)
            this.$nextTick(() => {
                inp.$refs.generalInput.$el.querySelector('input').focus()
            });
        },
        formData(form) {
            console.log(form)
            
        },
        searchTariffCode(prefix, val){
            if(val.length > 2) {
                this.getTableData(val)
            }
        },
        async getTableData(q) {
            await axios
                .get(this.URL.geolocation_search + 
                `?n=${this.listenNodeId}&s=${q}`, 
                this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    if(res.status == 200 && arr.length > 0) {
                        arr.map((item, key) => {
                            item['index'] = key
                        })
                        this.$store.dispatch("SET_CALC_COMPONENT_ARRDATA", arr)
                    }
                    // this.loading = false
                }).catch(err => {
                    this.checkAuth(err.response)
                    // this.loading = false
                    // this.openNotification('danger', 'Failed to populate country list', err)
                })
        },
        openGetCustomer() {
            this.dialogGetCustomer = !this.dialogGetCustomer
        },
        closeGetCustomer() {
            this.dialogGetCustomer = false
            this.setFocus()
        },
        onChangeCustom(key,val,info) {
            if(key != undefined) {
                if(key == 'origin_onchange_address') {
                    this.$store.dispatch('SET_CALC_COMPONENT_SWITCH', true)
                }
            }
        },
        updateValue(key,value, value1,value2) {
            
            if(Object.keys(value).length > 0 && key == 'origin') {
                this.forcererender = true
                this.$store.dispatch(`SET_ORIGIN_ORIGIN_NAME`, value.customer_name)
                this.$store.dispatch(`SET_ORIGIN_ORIGIN_PHONE`, value.customer_phone)
                this.$store.dispatch(`SET_ORIGIN_ORIGIN_ADDRESS`, value.geolocation_location_name)
                this.$store.dispatch(`SET_ORIGIN_ORIGIN_SUBDISTRICT_ID`, value.customer_subdistrict_id)
                this.$store.dispatch(`SET_ORIGIN_ORIGIN_ONCHANGE_ADDRESS`, value.geolocation_location_name)
                this.$store.dispatch(`SET_ORIGIN_ORIGIN_ZIP_CODE`, value.geolocation_subdistrict_zip_code)

                this.customer = value2

                let self = this
                setTimeout(function(){ self.forcererender = false }, 100);
                                
                
            }
        }
    },
    created() {
        this.getDefaultState()
    },
}
</script>
<style lang="scss">
    .baloon{
        position: absolute;
        right: 0;
        top: 15px;
    }
</style>
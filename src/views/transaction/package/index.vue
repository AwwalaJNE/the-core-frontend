<template >
    <div>
        <div class="box">
            <div>
                <vs-row justify="space-between">
                    <vs-col xs="12" sm="3" lg="3">
                        <h3 style="text-align:left;margin-top:8px;">Package Information</h3>
                    </vs-col>
                    <vs-col xs="12" sm="6" lg="6">
                        <vs-row justify="flex-end">
                            <vs-col xs="12" sm="4" lg="4">
                                <vs-tooltip>
                                    <vs-button
                                        shadow
                                        :active="false"
                                        @click="openBpikComponent()"
                                        :tabindex="-1"
                                        style="float:right"
                                    >
                                        <i class='bx bx-plus'></i> BPIK
                                    </vs-button>
                                    <template #tooltip>
                                        {{`Alt + f3 | Bpik`}}
                                    </template>
                                </vs-tooltip>
                                
                            </vs-col>
                            <vs-col xs="12" sm="4" lg="4">
                                <vs-tooltip>
                                    <vs-button
                                        shadow
                                        :active="false"
                                        @click="connoteNumberDialog('pra')"
                                        :tabindex="-1"
                                        style="float:right"
                                    >
                                        <i class='bx bx-plus'></i> Pra Connote
                                    </vs-button>
                                    <template #tooltip>
                                        {{`Alt + f6 | Pra Connote`}}
                                    </template>
                                </vs-tooltip>
                            </vs-col>
                            <vs-col xs="12" sm="4" lg="4">
                                <vs-tooltip>
                                    <vs-button
                                        shadow
                                        :active="false"
                                        @click="connoteNumberDialog('single')"
                                        :tabindex="-1"
                                        style="float:right"
                                    >
                                        <i class='bx bx-plus'></i> Single Connote
                                    </vs-button>
                                    <template #tooltip>
                                        {{`Alt + f7 | Single Connote`}}
                                    </template>
                                </vs-tooltip>
                            </vs-col>
                        </vs-row>
                    </vs-col>
                </vs-row>
            </div>
            <div class="con-form form-package">
                <template v-if="Object.keys(InputObject).length > 0">
                    <vs-row justify="center">
                        <vs-col xs="12" md="6" lg="6">
                            <input-general 
                                :name="InputObject['package_description'].label" 
                                :rules="InputObject['package_description'].rule" 
                                :formKey="InputObject['package_description'].key"
                                :valueData="InputObject['package_description'].value"
                                :typeInput="InputObject['package_description'].typeInput"
                                @updateValue="updateValue" />
                            
                            <p>{{InputObject['package_category'].label}}</p>
                            <selector 
                                :ref="InputObject['package_category'].key"
                                :name="''" 
                                :rules="InputObject['package_category'].rule" 
                                :formKey="'package_category'"
                                :valueData="InputObject['package_category'].arrData"
                                :selectedValue="InputObject['package_category'].value"
                                :isMultiple="false"
                                @updateValue="updateValue" />

                            <p>{{InputObject['package_service'].label}}</p>
                            <template v-if="InputObject['package_service'].arrData.length > 0 && InputObject['package_service'].arrData[0].value !== 'null'">
                                <radio 
                                :ref="InputObject['package_service'].key"
                                :name="''" 
                                :rules="InputObject['package_service'].rule" 
                                formKey="package_service"
                                :valueData="InputObject['package_service'].arrData"
                                :selectedValue="InputObject['package_service'].value"
                                @updateValue="updateValue" />
                            </template>
        
                            <input-general 
                                :name="InputObject['package_insured_goods_value'].label" 
                                :rules="InputObject['package_insured_goods_value'].rule" 
                                :formKey="InputObject['package_insured_goods_value'].key"
                                :valueData="InputObject['package_insured_goods_value'].value"
                                :typeInput="InputObject['package_insured_goods_value'].typeInput"
                                :currencyMasking="true"
                                @updateValue="updateValue" />
                            
                            <input-general 
                                :name="InputObject['package_diskon'].label" 
                                :rules="InputObject['package_diskon'].rule" 
                                :formKey="InputObject['package_diskon'].key"
                                :valueData="InputObject['package_diskon'].value"
                                :typeInput="InputObject['package_diskon'].typeInput"
                                :currencyMasking="true"
                                @updateValue="updateValue" />
                            
                            <input-general 
                                :name="InputObject['package_instruksi'].label" 
                                :rules="InputObject['package_instruksi'].rule" 
                                :formKey="InputObject['package_instruksi'].key"
                                :valueData="InputObject['package_instruksi'].value"
                                :typeInput="InputObject['package_instruksi'].typeInput"
                                @updateValue="updateValue" />
                        </vs-col>
                        <vs-col xs="12" md="6" lg="6">
                            <vs-row>
                                <vs-col xs="12" md="6" lg="6">
                                    <input-general 
                                        :name="InputObject['package_jumlah'].label" 
                                        :rules="InputObject['package_jumlah'].rule" 
                                        :formKey="InputObject['package_jumlah'].key"
                                        :valueData="InputObject['package_jumlah'].value"
                                        :typeInput="'number'"
                                        @updateValue="updateValue" />
                                </vs-col>
                                <vs-col xs="12" md="6" lg="6">
                                    <vs-button
                                        shadow
                                        :active="false"
                                        @click="openSettingMultipleKoli"
                                        style="margin-top:1.5em"
                                        :disabled="disableBtnMultipleKoli"
                                    >
                                        <i class='bx bx-layer-plus' style="margin-right:5px"></i> Atur Berat
                                    </vs-button>
                                </vs-col>
                            </vs-row> 

                            <vs-row>
                                <vs-col xs="6" md="3" lg="3">
                                    <input-general 
                                        :name="InputObject['package_dimensi_weight'].label" 
                                        :rules="InputObject['package_dimensi_weight'].rule" 
                                        :formKey="InputObject['package_dimensi_weight'].key"
                                        :valueData="InputObject['package_dimensi_weight'].value"
                                        :typeInput="koliinput"
                                        @updateValue="updateValue" />
                                </vs-col>
                                <vs-col xs="6" md="3" lg="3">
                                    <input-general 
                                        :name="InputObject['package_dimensi_length'].label" 
                                        :rules="InputObject['package_dimensi_length'].rule" 
                                        :formKey="InputObject['package_dimensi_length'].key"
                                        :valueData="InputObject['package_dimensi_length'].value"
                                        :typeInput="koliinput"
                                        @updateValue="updateValue" />
                                </vs-col>
                                <vs-col xs="6" md="3" lg="3">
                                    <input-general 
                                        :name="InputObject['package_dimensi_width'].label" 
                                        :rules="InputObject['package_dimensi_width'].rule" 
                                        :formKey="InputObject['package_dimensi_width'].key"
                                        :valueData="InputObject['package_dimensi_width'].value"
                                        :typeInput="koliinput"
                                        @updateValue="updateValue" />
                                </vs-col>
                                <vs-col xs="6" md="3" lg="3">
                                    <input-general 
                                        :name="InputObject['package_dimensi_height'].label" 
                                        :rules="InputObject['package_dimensi_height'].rule" 
                                        :formKey="InputObject['package_dimensi_height'].key"
                                        :valueData="InputObject['package_dimensi_height'].value"
                                        :typeInput="koliinput"
                                        @updateValue="updateValue" />
                                </vs-col>
                            </vs-row>  

                            <vs-row>
                                <vs-col xs="12" md="6" lg="6">
                                    <div class="chekboxgroup">
                                        <checkbox
                                            formKey="package_tidak_packing_kayu"
                                            :isChecked="InputObject['package_tidak_packing_kayu'].value"
                                            :typeInput="InputObject['package_tidak_packing_kayu'].typeInput"
                                            @updateValue="updateValue" /> 
                                        <router-link :to="{ name: 'printSPPAP'}" target="_blank">
                                            <p @click="printSPPAP" style="color:#1890ff;">{{InputObject['package_tidak_packing_kayu'].titleLabel}}</p>
                                        </router-link>
                                    </div>
                                </vs-col>
                                <vs-col xs="12" md="6" lg="6">
                                    <div class="chekboxgroup">
                                        <checkbox
                                            formKey="package_tidak_asuransi"
                                            :isChecked="InputObject['package_tidak_asuransi'].value"
                                            :typeInput="InputObject['package_tidak_asuransi'].typeInput"
                                            @updateValue="updateValue" /> 
                                        <router-link :to="{ name: 'printSPPAP'}" target="_blank">
                                            <p @click="printSPPAP" style="color:#1890ff;">{{InputObject['package_tidak_asuransi'].titleLabel}}</p>
                                        </router-link>
                                    </div>
                                </vs-col>
                            </vs-row>

                            <vs-row class="mt-1">
                                <vs-col xs="12" md="6" lg="6">
                                    <vs-button
                                        shadow
                                        :active="false"
                                        :disabled="!disableBtnMultipleKoli"
                                        @click="openSurchargeDialog"
                                    >
                                        <i class='bx bx-plus' style="margin-right:5px"></i> SURCHARGE
                                    </vs-button>
                                    <div>
                                        <template v-if="Object.keys(surchargeshow).length > 0">
                                            <span 
                                            v-for="(item, key) in Object.keys(surchargeshow)"
                                            :data-value="item" 
                                            class="vs-select__chips__chip"
                                            style="width: fit-content;"
                                            :key="key">
                                                {{`${surchargeshow[item].surcharge_name} ${surchargeshow[item]['jumlah'] || ''}`}}
                                                <template v-if="!surchargeshow[item].hasOwnProperty('jumlah') && !surchargeshow[item].surcharge_name.toLowerCase().includes('overweight')">
                                                    <span class="vs-select__chips__chip__close" @click="removeSurcharge(item, 0)">
                                                        <i class="vs-icon-close vs-icon-hover-less"></i>
                                                    </span>
                                                </template>
                                            </span>
                                        </template>
                                    </div>
                                </vs-col>
                                <vs-col xs="12" md="6" lg="6">
                                    <div class="chekboxgroup">
                                        <checkbox
                                            formKey="package_do_return"
                                            :isChecked="InputObject['package_do_return'].value"
                                            :typeInput="InputObject['package_do_return'].typeInput"
                                            @updateValue="updateValue" /> 
                                        <a href="javascript:void(0)">
                                            <p>{{InputObject['package_do_return'].titleLabel}}</p>
                                        </a>
                                    </div>
                                </vs-col>
                            </vs-row> 

                        </vs-col>
                    </vs-row>  
                </template>
            </div>
        </div>

        <template>
            <bpik
            :closeDialog="closeBpikComponent"
            :active="bpikComponent"
            :arrData="[]"
            />
        </template>

        <dialog-surcharge
            :active="surchargeSelector" 
            :closeDialog="closeDialogSurcharge"
            :index="0"
            @updateValue="updateValue"
            />
        <dialog-multipleKoli
            :active="dialogSettingMultipleKoli" 
            :closeDialog="closeSettingMultipleKoli"
            @prosesmultipleKoli="prosesmultipleKoli"
            :surchargeByID="surchargeByID"
            />
        
        <connote-number-dialog
            :active="connote_number_dialog" 
            :closeDialog="closeConnoteNumberDialog"
            :title="connote_number_type"
            :type="connote_number_type"
            @updateValue="updateValue"
        />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TransactionMixin from "@/mixins/transaction.js"
import FormMaster from "@/components/form/formMaster"
import InputGeneral from "@/components/input/general"
import Selector from "@/components/input/select"
import Switch from "@/components/input/switch"
import Radio from "@/components/input/radio"
import Checkbox from "@/components/input/checkbox"
import BPIK from "@/views/transaction/package/bpik"
import ConnoteNumberDialog from "@/views/transaction/connoteNumberDialog"

import dialogMultipleKoli from "@/views/transaction/package/dialogMultipleKoli"
import dialogSurcharge from "@/views/transaction/package/dialogSurcharge"
export default {
    name: "package-information",
    mixins: [master,TransactionMixin],
    components: {
        "form-master": FormMaster,
        "input-general": InputGeneral,
        "selector": Selector,
        "switchNih": Switch,
        "radio": Radio,
        "checkbox": Checkbox,
        "dialog-surcharge": dialogSurcharge,
        "dialog-multipleKoli": dialogMultipleKoli,
        "bpik": BPIK,
        "connote-number-dialog": ConnoteNumberDialog
    },
    data() {
        return {
            InputObject: {},
            surchargeSelector: false,
            dialogSettingMultipleKoli: false,
            bpikComponent: false,
            surchargeByID: {},
            surchargeshow: {},
            template_koli: this.$store.getters['getTransaction']['template_koli'],
            connote_koli_item: [],
            koliinput: 'text',
            disableBtnMultipleKoli: true,
            jumlahKoli: 1,
            current_index_koli: 0,
            package_tidak_packing_kayu: false,
            package_tidak_asuransi: false,

            connote_number_type: '',
            connote_number_dialog: false
        }
    },
    computed: {
        listenSurchargeList() {
            return this.$store.getters['getTransaction']['package']['package_surcharge']['arrData']
        },
        listen_package_category_arrData() {
            return this.$store.getters['getTransaction']['package']
        },
        listenPackageSurcharge () {
            return this.$store.getters.getTransaction.package.package_surcharge.value
        },
        listenPackageService () {
            return this.$store.getters.getTransaction.package.package_service.valueData || {}
        },
        listenConnoteKoliItem () {
            return this.$store.getters.getTransaction.connote_koli_item
        },
        listenJumlahPackage () {
            return this.$store.getters.getTransaction.package.package_jumlah.value
        },
        listenDestinationCode() {
            return this.$store.getters.getTransaction.destination.destination_zip_code.input[1].value
        },


        // new code
        listenConnoteIndexActive () {
            return this.$store.getters.getTransaction.connote_index_active
        },
    },
    watch: {
        listenPackageService: function (n,o) {
            if(n !== o) {
                this.prosesKoli0('','',0)
            }
        },
        listenJumlahPackage: function (n,o) {
            if(n !== o) {
                this.changeJumlah()
            }
        },
        listenConnoteIndexActive: function (n,o) {
            if(n !== o) {
                this.initialize()
            }
        },
        listenDestinationCode: function (n,o) {
            if(n !== o) {
                if(n !== '') {
                    this.getShippingService()
                }
            }
        },
    },
    methods: {
        initialize() {
            let obj = this.$store.getters['getTransaction']['package'] || {}
                if (Object.keys(obj).length > 0) {
                    let keys = Object.keys(obj)
                    this.InputObject = obj
                } else {
                    this.InputObject = {}
                }
            // this.connote_koli_item = this.listenConnoteKoliItem

            // new code
            this.connote_koli_item = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item
            this.wrapingSurcharge()
        },
        connoteNumberDialog(type) {
            this.connote_number_type = type || 'pra'
            this.connote_number_dialog = !this.connote_number_dialog
        },
        closeConnoteNumberDialog() {
            this.connote_number_dialog = false
        },
        wrapingSurcharge() {
            let arrSurcharge = this.listenSurchargeList
            let surchargeByID = {}
            arrSurcharge.map(item => {
                surchargeByID[item.surcharge_id] = item
            })
            this.surchargeByID = surchargeByID
            console.log('this.surchargeByID', this.surchargeByID)
            this.$store.dispatch(`SET_PACKAGE_PACKAGE_SURCHARGE_ValueData`, surchargeByID)
        },
        async getShippingService() {
            let connote_number = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_number || ''

            await axios
                .get(this.URL.tariff_shipping_service + 
                `?n=${this.listenNodeId}&destination=${this.listenDestinationCode}`, 
                this.Helper.header())
                .then(res => {
                    console.log('getShippingService', res.data.data)
                    let data = res.data.data
                    let arr = []
                    data.map(item => {
                        let obj = {}
                        obj['label'] = item.service_name
                        obj['value'] = item.tariff_service_code.toLowerCase()
                        obj['data'] = item
                        obj['tarif'] = item.tariff_amount_1

                        // tiering tarrif
                        let tariffAkumulatif = {}
                        let tariffStandar = {}
                        let keys = Object.keys(item)

                        // sudah dipastikan tiering sampe 50 biji
                        for(let i=1; i <= 50; i++) {
                            if(i == 1) {
                                tariffStandar['weight'] = item[`tariff_weight_1`] || 0
                                tariffStandar['value'] = item[`tariff_amount_1`] || 0
                            } else {
                                if(Number(item[`tariff_amount_${i}`]) != 0) {
                                    tariffAkumulatif[item[`tariff_weight_${i}`]] = item[`tariff_amount_${i}`] || 0
                                }
                            }
                        }
                        
                        obj['tariffAkumulatif'] = tariffAkumulatif
                        obj['tariffStandar'] = tariffStandar
                        
                        if(item.tariff_service_code.toLowerCase().includes('reg')) {
                            arr.unshift(obj)
                        } else {
                            arr.push(obj)
                        }
                        
                    })
                    console.log('getShippingService arr', arr)

                    // if create new transaction
                    // if(connote_number == ""){
                        
                    // }
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_SERVICE", arr.length > 0 ? arr[0].value : '')
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_SERVICE_ValueData", arr[0])
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_SERVICE_arrData", arr.length > 0 ? arr : [])

                    let node_code = this.listenNodeCode
                    let self = this
                    this.autoApply(node_code).then(() => {
                        self.surchargeView()
                    })
                    // this.loading = false
                }).catch(err => {
                    // this.loading = false
                    this.checkAuth(err.response)
                    // this.openNotification('danger', 'Failed to populate country list', err)
                })
        },
        changeJumlah() {
            if(this.listenJumlahPackage > 1) {
                this.disableBtnMultipleKoli = false
                this.koliinput = this.koliinput + `|disabled`
            } else {
                this.disableBtnMultipleKoli = true
                this.koliinput = 'text' 
            }

            if(this.jumlahKoli > 0) {
                let absValue = Math.abs(this.jumlahKoli - this.connote_koli_item.length)
                if(this.connote_koli_item.length > this.jumlahKoli) {
                    this.connote_koli_item.splice((this.connote_koli_item.length) - absValue,absValue)
                } else if(this.jumlahKoli > this.connote_koli_item.length) {
                    for(let i=0; i < absValue; i++) {
                        this.connote_koli_item.push(this.template_koli)
                    }
                }
            }
            this.$store.dispatch("SET_CONNOTE_DATA_KOLI", this.connote_koli_item)
            // this.calcDataKoli()
            let node_code = this.listenNodeCode
            let self = this
            this.autoApply(node_code).then(() => {
                self.surchargeView()
                self.calculation()
            })
        },
        updateValue(key, value, value2 = null, value3 = null) {
            switch(key) {
                case "package_service":
                    if(value2) {
                        this.$store.dispatch("SET_PACKAGE_PACKAGE_SERVICE_ValueData", value2)
                        this.$store.dispatch("SET_PACKAGE_PACKAGE_SERVICE", value)
                        
                        
                        let node_code = this.listenNodeCode
                        let self = this
                        this.autoApply(node_code).then(() => {
                            self.surchargeView()
                            self.calculation()
                        })

                        console.log('HASIL', this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive])
                        
                        
                    }
                    break;
                case "package_category":
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_CATEGORY", value)
                    break;
                case "insured_goods_value":
                    let numb = this.moneyParsing(value)
                    this.$store.dispatch("SET_CALCULATOR_ASURANSI", numb * 0.002)
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_INSURED_GOODS_VALUE", value)
                    
                    this.calculation()
                    break;
                case "amount_discount":
                    // let num = this.moneyParsing(value)
                    let val = value ? value : 0
                    this.$store.dispatch("SET_CALCULATOR_DISKON", value)
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_DISKON", value)
                    
                    this.calculation()
                    break;
                case "remarks":
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_INSTRUKSI", value)
                    break;
                case "koli_jumlah":
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_JUMLAH", value)
                    this.jumlahKoli = value
                    break;
                case "koli_description":
                    this.prosesKoli0("description", value, 0)
                    break;
                case "koli_weight":
                    this.prosesKoli0("actual_weight", value, 0)
                    break;
                case "koli_length":
                    this.prosesKoli0("length", value, 0)
                    break;
                case "koli_width":
                    this.prosesKoli0("width", value, 0)
                    break;
                case "koli_height":
                    this.prosesKoli0("height", value, 0)
                    break;
                case "package_tidak_asuransi":
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_TIDAK_ASURANSI", value)
                    this.package_tidak_asuransi = value
                    if(value == true) {
                        this.$store.dispatch("SET_CALCULATOR_ASURANSI", 0)
                        this.$store.dispatch("SET_CALCULATOR_ADM_ASURANSI", 0)
                    } else {
                        let insured_good_value = this.$store.getters.getTransaction.package.package_insured_goods_value.value
                        
                        let goods_value = this.moneyParsing(insured_good_value)
                        this.$store.dispatch("SET_CALCULATOR_ASURANSI", goods_value * 0.002)
                    }
                    this.calculation()
                    break;
                case "package_tidak_packing_kayu":
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_TIDAK_PACKING_KAYU", value)
                    this.package_tidak_packing_kayu = value
                    console.log('package_tidak_packing_kayu', value)
                    break;
                case "package_do_return":
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_DO_RETURN", value)
                    break;
                case "handle_surcharge":
                    this.connote_koli_item[value].surcharge_id = value2
                    
                    if(value3 !== null && this.connote_koli_item[value].hasOwnProperty('hasPackingKayu_id')) {
                        this.connote_koli_item[value].hasPackingKayu_id = value3
                    }

                    this.$store.dispatch("SET_CONNOTE_DATA_KOLI", this.connote_koli_item)
                    this.surchargeView()
                    this.calculation()
                    break;
                default:
                    // code block
            }
        },
        prosesKoli0(key, value) {
            let service = this.listenPackageService.data || {}

            if(this.connote_koli_item[0].hasOwnProperty(key)) {
                this.connote_koli_item[0][key] = value
            }
            let volume_weight = 0
            
            if(Object.keys(service).length > 0) {
                let service_volume_divider = Number(service['service_volume_divider'])
                volume_weight = (this.connote_koli_item[0]['length'] * this.connote_koli_item[0]['width'] * this.connote_koli_item[0]['height']) / service_volume_divider 
            }
            
            this.connote_koli_item[0]['volume_weight'] = volume_weight.toFixed(2)
            
            // new code
            this.$store.dispatch("SET_CONNOTE_DATA_KOLI", this.connote_koli_item)
            // this.calcDataKoli()
            let node_code = this.listenNodeCode
            let self = this
            this.autoApply(node_code).then(() => {
                self.surchargeView()
                self.calculation()
            })
            
        },

        surchargeView(){
            this.surchargeshow = {}
            let koli = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item
            
            let surchargeByID = this.surchargeByID
            console.log('surchargeByID /////', surchargeByID)

            let jumlah = 1
            let surcharge_view = {}
                if(koli.length > 1) {
                    koli.map(item => {
                        let obj = {}
                        if (item.surcharge_id.length > 0) {
                            item.surcharge_id.map(itm => {
                                if(surcharge_view.hasOwnProperty(itm)) {
                                    let data = surchargeByID[itm]
                                    jumlah += 1
                                    data['jumlah'] = jumlah
                                    surcharge_view[itm] = data
                                } else {
                                    let data = surchargeByID[itm]
                                    data['jumlah'] = 1
                                    surcharge_view[itm] = data
                                }
                            })
                        }
                        
                    })
                } else {
                    koli.map(item => {
                        let obj = {}
                        if (item.surcharge_id.length > 0) {
                            item.surcharge_id.map(itm => {
                                if(surchargeByID.hasOwnProperty(itm)) {
                                    let data = surchargeByID[itm]
                                    surcharge_view[itm] = data
                                    console.log('AFFFF', this.surchargeshow)
                                }
                            })
                        }
                        
                    })
                }

            //     console.log('surchargeView', this.connote_koli_item,surchargeByID,this.surchargeshow)
            
            this.surchargeshow = surcharge_view
            console.log('HIT surcharge view', this.surchargeshow)
            
            
            // this.surchargeshow = view
            
        },
        prosesmultipleKoli(val) {
            this.connote_koli_item = val
            console.log('UPDATE KOLI', this.connote_koli_item)

            this.$store.dispatch("SET_CONNOTE_DATA_KOLI", this.connote_koli_item)
            // this.calcDataKoli()
            let node_code = this.listenNodeCode
            let self = this
            this.autoApply(node_code).then(() => {
                self.surchargeView()
            })

            this.$nextTick(() => {
                this.calculation()
            });
            
            // this.$store.dispatch("SET_CONNOTE_KOLI_ITEM_index", {"index": index, "key":key, "value":value})
        },
        openBpikComponent(){
            this.bpikComponent = !this.bpikComponent
        },
        closeBpikComponent(){
            this.bpikComponent = false
        },
        openSurchargeDialog(){
            this.current_index_koli = 0
            this.surchargeSelector = true
        },
        closeDialogSurcharge() {
            this.surchargeSelector = false
        },
        openSettingMultipleKoli(){
            this.dialogSettingMultipleKoli = true
        },
        closeSettingMultipleKoli() {
            this.dialogSettingMultipleKoli = false
        },
        removeSurcharge(id, index) {
            let koli = this.connote_koli_item
            koli[index].surcharge_id = koli[index].surcharge_id.filter(item => item != id)
            this.$store.dispatch("SET_CONNOTE_DATA_KOLI", koli)
            this.surchargeView()
            this.calculation()
        },
        printSPPAP() {
            this.$ls.set('printSPPAP', {})
            let data = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive]
            let obj = {}
            obj['tidak_asuransi'] = this.package_tidak_asuransi//data.is_insured == false ? true : false
            obj['tidak_packing_kayu'] = this.package_tidak_packing_kayu//data.is_packing_kayu == false ? true : false // nnti di update
            this.$ls.set('printSPPAP', obj)
            console.log('printSPPAP', obj, data.is_insured, data.is_packing_kayu)
        },
    },
    mounted() {
        this.initialize()
    },
}
</script>
<style lang="scss">
    .form-package{
        text-align: left;
        p{
            margin: .5em;
            font-size: 14px;
            &.surcharge{
                margin: 0 .5em;
            }
        }
        .chekboxgroup{
            position: relative;
            display: flex;
            justify-content: flex-start;
            margin-top: .5em;
            p{
                margin: 0 .5em 0 0;
                font-size: 14px;
            }
        }
    }
</style>
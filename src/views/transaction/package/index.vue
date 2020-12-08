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
                                <vs-button
                                    shadow
                                    :active="false"
                                    @click="0"
                                    style="float:right"
                                >
                                    <i class='bx bx-plus'></i> BPIK
                                </vs-button>
                            </vs-col>
                            <vs-col xs="12" sm="4" lg="4">
                                <vs-button
                                    shadow
                                    :active="false"
                                    @click="0"
                                    style="float:right"
                                >
                                    <i class='bx bx-plus'></i> Pra Connote
                                </vs-button>
                            </vs-col>
                            <vs-col xs="12" sm="4" lg="4">
                                <vs-button
                                    shadow
                                    :active="false"
                                    @click="0"
                                    style="float:right"
                                >
                                    <i class='bx bx-plus'></i> Single Connote
                                </vs-button>
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
                            <template v-if="InputObject['package_service'].arrData.length > 0">
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
                                :name="InputObject['package_price'].label" 
                                :rules="InputObject['package_price'].rule" 
                                :formKey="InputObject['package_price'].key"
                                :valueData="InputObject['package_price'].value"
                                :typeInput="InputObject['package_price'].typeInput"
                                @updateValue="updateValue" />
                            
                            <input-general 
                                :name="InputObject['package_diskon'].label" 
                                :rules="InputObject['package_diskon'].rule" 
                                :formKey="InputObject['package_diskon'].key"
                                :valueData="InputObject['package_diskon'].value"
                                :typeInput="InputObject['package_diskon'].typeInput"
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
                                        :typeInput="InputObject['package_jumlah'].typeInput"
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
                                            :formKey="InputObject['package_tidak_packing_kayu'].key"
                                            :isChecked="InputObject['package_tidak_packing_kayu'].value"
                                            :typeInput="InputObject['package_tidak_packing_kayu'].typeInput"
                                            @updateValue="updateValue" /> 
                                        <a href="javascript:void(0)">
                                            <p>{{InputObject['package_tidak_packing_kayu'].titleLabel}}</p>
                                        </a>
                                    </div>
                                </vs-col>
                                <vs-col xs="12" md="6" lg="6">
                                    <div class="chekboxgroup">
                                        <checkbox
                                            :formKey="InputObject['package_tidak_asuransi'].key"
                                            :isChecked="InputObject['package_tidak_asuransi'].value"
                                            :typeInput="InputObject['package_tidak_asuransi'].typeInput"
                                            @updateValue="updateValue" /> 
                                        <a href="javascript:void(0)">
                                            <p>{{InputObject['package_tidak_asuransi'].titleLabel}}</p>
                                        </a>
                                    </div>
                                </vs-col>
                            </vs-row>

                            <vs-row class="mt-1">
                                <vs-col xs="12" md="6" lg="6">
                                    <vs-button
                                        shadow
                                        :active="false"
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
                                                <template v-if="!surchargeshow[item].hasOwnProperty('jumlah')">
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
                                            :formKey="InputObject['package_do_return'].key"
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
            :arrData="listenDataMultipleKoli"
            :surchargeByID="surchargeByID"
            />
    </div>
</template>
<script>
import TransactionMixin from "@/mixins/transaction.js"
import FormMaster from "@/components/form/formMaster"
import InputGeneral from "@/components/input/general"
import Selector from "@/components/input/select"
import Switch from "@/components/input/switch"
import Radio from "@/components/input/radio"
import Checkbox from "@/components/input/checkbox"

import dialogMultipleKoli from "@/views/transaction/package/dialogMultipleKoli"
import dialogSurcharge from "@/views/transaction/package/dialogSurcharge"
export default {
    name: "package-information",
    mixins: [TransactionMixin],
    components: {
        "form-master": FormMaster,
        "input-general": InputGeneral,
        "selector": Selector,
        "switchNih": Switch,
        "radio": Radio,
        "checkbox": Checkbox,
        "dialog-surcharge": dialogSurcharge,
        "dialog-multipleKoli": dialogMultipleKoli
    },
    data() {
        return {
            InputObject: {},
            surchargeSelector: false,
            dialogSettingMultipleKoli: false,
            surchargeByID: {},
            surchargeshow: {},
            koliData: this.$store.getters['getTransaction']['template_koli'],
            connote_koli_item: [],
            koliinput: 'text',
            disableBtnMultipleKoli: true,
            meongData: '',
            jumlahKoli: 1
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
        listenDataMultipleKoli() {
            return this.meongData
        }
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
        }
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

            // this.koliData = this.$store.getters['getTransaction']['template_koli']
            // if(Object.keys(this.koliData).length > 0) {
            //     this.connote_koli_item.push(this.koliData)
            // }
            this.connote_koli_item = this.listenConnoteKoliItem

            let arrSurcharge = this.listenSurchargeList
            let surchargeByID = {}
            arrSurcharge.map(item => {
                surchargeByID[item.surcharge_id] = item
            })
            this.surchargeByID = surchargeByID
            this.$store.dispatch(`SET_PACKAGE_PACKAGE_SURCHARGE_ValueData`, surchargeByID)
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
                    let templateKoli = {
                        koli_id: '',
                        height: 0,
                        length: 0,
                        width: 0,
                        volume_weight: 0,
                        actual_weight: 1,
                        surcharge_id: [],
                        description: ''
                    }
                    for(let i=0; i < absValue; i++) {
                        this.connote_koli_item.push(templateKoli)
                    }
                }
            }
            
            this.calcMultipleKoli()
        },
        updateValue(key, value, value2 = null) {
            console.log(key, value, value2)
            switch(key) {
                case "package_service":
                    if(value2 !== null) {
                        this.$store.dispatch("SET_PACKAGE_PACKAGE_SERVICE_ValueData", value2)

                        // reset surcharge saat ganti service
                        this.connote_koli_item.map(item => {
                            item['surcharge_id'] = []
                        })
                        this.$store.dispatch("SET_CONNOTE_KOLI_ITEM", this.connote_koli_item)
                        this.surchargeView()
                        this.calculation()
                    }
                    break;
                case "package_category":
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_CATEGORY", value)
                    break;
                case "koli_jumlah":
                    this.$store.dispatch("SET_PACKAGE_PACKAGE_JUMLAH", value)
                    this.jumlahKoli = value
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
                case "handle_surcharge":
                    console.log(key, value, value2 )
                    let surcharge = value2
                    let ids = []
                    if(surcharge.length > 0){
                        surcharge.map(item => ids.push(item.surcharge_id))
                    }
                    this.connote_koli_item[value].surcharge_id = ids

                    this.$store.dispatch("SET_CONNOTE_KOLI_ITEM", this.connote_koli_item)
                    this.surchargeView()
                    this.calculation()
                    break;
                default:
                    console.log('meong')
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
                let service_volume_divider = service['service_volume_divider'].toString()
                volume_weight = (this.connote_koli_item[0]['length'] * this.connote_koli_item[0]['width'] * this.connote_koli_item[0]['height']) / service_volume_divider 
                volume_weight = volume_weight / 1000
            }
            this.connote_koli_item[0]['volume_weight'] = volume_weight.toFixed(2)
            

            let roundUp = this.round03(volume_weight.toFixed(2))

            let chargeable_weight = Math.max(this.connote_koli_item[0]['actual_weight'], roundUp).toFixed(2)

            this.$store.dispatch("SET_CALCULATOR_ACTUAL_WEIGHT", this.connote_koli_item[0]['actual_weight'])
            this.$store.dispatch("SET_CALCULATOR_VOLUME_WEIGHT", this.connote_koli_item[0]['volume_weight'])
            this.$store.dispatch("SET_CALCULATOR_CHARGEABLE_WEIGHT", chargeable_weight)  
            this.$store.dispatch("SET_CONNOTE_KOLI_ITEM", this.connote_koli_item)
        },

        surchargeView(){
            let koli = this.listenConnoteKoliItem
            let surchargeByID = this.surchargeByID
            let view = {}
            let jumlah = 1
            if(koli.length > 1) {
                koli.map(item => {
                    let obj = {}
                    if (item.surcharge_id.length > 0) {
                        item.surcharge_id.map(itm => {
                            if(view.hasOwnProperty(itm)) {
                                let data = surchargeByID[itm]
                                jumlah += 1
                                data['jumlah'] = jumlah
                                view[itm] = data
                            } else {
                                let data = surchargeByID[itm]
                                data['jumlah'] = 1
                                view[itm] = data
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
                                view[itm] = surchargeByID[itm]
                            }
                        })
                    }
                    
                })
            }

            this.surchargeshow = view
            console.log('this.surchargeshow', this.surchargeshow)
        },
        prosesmultipleKoli(val) {
            this.connote_koli_item = val
            this.$store.dispatch("SET_CONNOTE_KOLI_ITEM", this.connote_koli_item)
            this.surchargeView()
            this.calculation()
            // this.$store.dispatch("SET_CONNOTE_KOLI_ITEM_index", {"index": index, "key":key, "value":value})
        },
        openSurchargeDialog(){
            this.surchargeSelector = true
        },
        closeDialogSurcharge() {
            this.surchargeSelector = false
        },
        openSettingMultipleKoli(){
            let arr = JSON.stringify(this.connote_koli_item)
            this.meongData = arr
            this.$store.dispatch("SET_TEMP_KOLI_ITEM", arr)
            this.dialogSettingMultipleKoli = true
        },
        closeSettingMultipleKoli() {
            this.meongData = ''
            this.$store.dispatch("SET_TEMP_KOLI_ITEM", '')
            this.dialogSettingMultipleKoli = false
        },
        removeSurcharge(id, index) {
            let koli = this.listenConnoteKoliItem
            koli[index].surcharge_id = koli[index].surcharge_id.filter(item => item != id)
            this.$store.dispatch("SET_CONNOTE_KOLI_ITEM", koli)
            this.surchargeView()
            this.calculation()
        }
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
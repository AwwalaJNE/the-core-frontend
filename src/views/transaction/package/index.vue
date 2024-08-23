<template>
  <div>
    <div class="box">
      <div>
        <vs-row justify="space-between">
          <vs-col
            xs="12"
            sm="3"
            lg="3"
          >
            <h3 style="text-align:left;margin-top:8px;">
              Package Information
            </h3>
          </vs-col>
          <vs-col
            xs="12"
            sm="6"
            lg="6"
          >
            <vs-row justify="flex-end">
              <vs-col
                xs="12"
                sm="4"
                lg="4"
              >
                <vs-tooltip>
                  <vs-button
                    shadow
                    :active="false"
                    :tabindex="-1"
                    style="float:right"
                    :disabled="listeninputDisabled"
                    @click="openBpikComponent()"
                  >
                    <i class="bx bx-plus" /> BPIK
                  </vs-button>
                  <template #tooltip>
                    {{ `Alt + f3 | Bpik` }}
                  </template>
                </vs-tooltip>
              </vs-col>
              <vs-col
                xs="12"
                sm="4"
                lg="4"
              >
                <vs-tooltip>
                  <vs-button
                    shadow
                    :active="false"
                    :tabindex="-1"
                    style="float:right"
                    :disabled="listeninputDisabled"
                    @click="connoteNumberDialog('pra')"
                  >
                    <i class="bx bx-plus" /> Pra Connote
                  </vs-button>
                  <template #tooltip>
                    {{ `Alt + f6 | Pra Connote` }}
                  </template>
                </vs-tooltip>
              </vs-col>
              <vs-col
                xs="12"
                sm="4"
                lg="4"
              >
                <vs-tooltip>
                  <vs-button
                    shadow
                    :active="false"
                    :tabindex="-1"
                    style="float:right"
                    :disabled="listeninputDisabled"
                    @click="connoteNumberDialog('single')"
                  >
                    <i class="bx bx-plus" /> Single Connote
                  </vs-button>
                  <template #tooltip>
                    {{ `Alt + f7 | Single Connote` }}
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
            <vs-col
              xs="12"
              md="6"
              lg="6"
            >
              <input-general
                :name="InputObject['package_description'].label"
                :rules="InputObject['package_description'].rule"
                :form-key="InputObject['package_description'].key"
                :value-data="InputObject['package_description'].value"
                :type-input="InputObject['package_description'].typeInput +`|${listeninputDisabled == true ? 'disabled':''}`"
                @updateValue="updateValue"
              />

              <p style="margin:0;">
                {{ InputObject['package_category'].label }}
              </p>
              <selector
                :ref="InputObject['package_category'].key"
                :name="''"
                :rules="InputObject['package_category'].rule"
                :form-key="'package_category'"
                :value-data="InputObject['package_category'].arrData"
                :selected-value="InputObject['package_category'].value"
                :disabled="listeninputDisabled"
                :is-multiple="false"
                @updateValue="updateValue"
                :customBind="'data-kt'"
              />

              <p style="margin:0;">
                {{ InputObject['package_service'].label }}
              </p>
              <template v-if="InputObject['package_service'].arrData.length > 0 && InputObject['package_service'].arrData[0].value !== 'null'">
                <radio
                  :ref="InputObject['package_service'].key"
                  :name="''"
                  :rules="InputObject['package_service'].rule"
                  form-key="package_service"
                  :value-data="InputObject['package_service'].arrData"
                  :selected-value="InputObject['package_service'].value"
                  :disabled="listeninputDisabled"
                  @updateValue="updateValue"
                />
              </template>
              <div class="mt-1" />
              <input-general
                :name="InputObject['package_cod'].label"
                :rules="InputObject['package_cod'].rule"
                :form-key="InputObject['package_cod'].key"
                :value-data="InputObject['package_cod'].value"
                :type-input="InputObject['package_cod'].typeInput +`|${listeninputDisabled == true ? 'disabled':''}`"
                @updateValue="updateValue"
              />
              <input-general
                :name="InputObject['package_insured_goods_value'].label"
                :rules="InputObject['package_insured_goods_value'].rule"
                :form-key="InputObject['package_insured_goods_value'].key"
                :value-data="InputObject['package_insured_goods_value'].value"
                :type-input="InputObject['package_insured_goods_value'].typeInput +`|${listeninputDisabled == true ? 'disabled':''}`"
                :currency-masking="true"
                @updateValue="updateValue"
              />

              <input-general
                :name="InputObject['package_diskon'].label"
                :rules="InputObject['package_diskon'].rule"
                :form-key="InputObject['package_diskon'].key"
                :value-data="InputObject['package_diskon'].value"
                :type-input="InputObject['package_diskon'].typeInput +`|${listeninputDisabled == true ? 'disabled':''}`"
                :currency-masking="true"
                @updateValue="updateValue"
              />

              <input-general
                :name="InputObject['package_instruksi'].label"
                :rules="InputObject['package_instruksi'].rule"
                :form-key="InputObject['package_instruksi'].key"
                :value-data="InputObject['package_instruksi'].value"
                :type-input="InputObject['package_instruksi'].typeInput +`|${listeninputDisabled == true ? 'disabled':''}`"
                @updateValue="updateValue"
              />
            </vs-col>
            <vs-col
              xs="12"
              md="6"
              lg="6"
            >
              <vs-row>
                <vs-col
                  xs="12"
                  md="3"
                  lg="3"
                >
                  <input-general
                    :name="InputObject['package_jumlah'].label"
                    :rules="InputObject['package_jumlah'].rule"
                    :form-key="InputObject['package_jumlah'].key"
                    :value-data="InputObject['package_jumlah'].value"
                    :type-input="'number' +`${listeninputDisabled == true ? '|disabled':''}`"
                    :min-value="1"
                    @updateValue="updateValue"
                  />
                </vs-col>
                <vs-col
                  xs="12"
                  md="6"
                  lg="6"
                >
                  <vs-button
                    shadow
                    :active="false"
                    style="margin-top:1.5em"
                    class="withFocus"
                    :disabled="disableBtnMultipleKoli"
                    @click="openSettingMultipleKoli"
                  >
                    <i
                      class="bx bx-layer-plus"
                      style="margin-right:5px"
                    /> Atur Berat
                  </vs-button>
                </vs-col>
              </vs-row>

              <vs-row>
                <vs-col
                  xs="6"
                  md="3"
                  lg="3"
                >
                  <input-general
                    :name="InputObject['package_dimensi_weight'].label"
                    :rules="InputObject['package_dimensi_weight'].rule"
                    :form-key="InputObject['package_dimensi_weight'].key"
                    :value-data="InputObject['package_dimensi_weight'].value"
                    :type-input="koliinput +`|${listeninputDisabled == true ? 'disabled':''}`"
                    @updateValue="updateValue"
                  />
                </vs-col>
                <vs-col
                  xs="6"
                  md="3"
                  lg="3"
                >
                  <input-general
                    :name="InputObject['package_dimensi_length'].label"
                    :rules="InputObject['package_dimensi_length'].rule"
                    :form-key="InputObject['package_dimensi_length'].key"
                    :value-data="InputObject['package_dimensi_length'].value"
                    :type-input="koliinput +`|${listeninputDisabled == true ? 'disabled':''}`"
                    @updateValue="updateValue"
                  />
                </vs-col>
                <vs-col
                  xs="6"
                  md="3"
                  lg="3"
                >
                  <input-general
                    :name="InputObject['package_dimensi_width'].label"
                    :rules="InputObject['package_dimensi_width'].rule"
                    :form-key="InputObject['package_dimensi_width'].key"
                    :value-data="InputObject['package_dimensi_width'].value"
                    :type-input="koliinput +`|${listeninputDisabled == true ? 'disabled':''}`"
                    @updateValue="updateValue"
                  />
                </vs-col>
                <vs-col
                  xs="6"
                  md="3"
                  lg="3"
                >
                  <input-general
                    :name="InputObject['package_dimensi_height'].label"
                    :rules="InputObject['package_dimensi_height'].rule"
                    :form-key="InputObject['package_dimensi_height'].key"
                    :value-data="InputObject['package_dimensi_height'].value"
                    :type-input="koliinput +`|${listeninputDisabled == true ? 'disabled':''}`"
                    
                    @updateValue="updateValue"
                  />
                </vs-col>
              </vs-row>

              <vs-row>
                <vs-col
                  xs="12"
                  md="5"
                  lg="5"
                >
                  <checkbox
                    ref="package_tidak_packing_kayu_checkbox"
                    form-key="package_tidak_packing_kayu"
                    :is-checked="InputObject['package_tidak_packing_kayu'].value"
                    :name="InputObject['package_tidak_packing_kayu'].titleLabel"
                    :disabled="listeninputDisabled"
                    @updateValue="updateValue"
                  />
                  <div class="mt-05" />
                  <checkbox
                    ref="package_tidak_asuransi_checkbox"
                    form-key="package_tidak_asuransi"
                    :is-checked="InputObject['package_tidak_asuransi'].value"
                    :name="InputObject['package_tidak_asuransi'].titleLabel"
                    :disabled="listeninputDisabled"
                    @updateValue="updateValue"
                  />
                </vs-col>
                <vs-col
                  xs="12"
                  md="3"
                  lg="3"
                >
                  <vs-button
                    shadow
                    :active="false"
                    style="margin-top:0"
                    class="withFocus"
                    :disabled="btnPrintASRdanSJ == false"
                    @click="printASRdanSJ"
                  >
                    <i
                      class="bx bx-printer"
                      style="margin-right:5px"
                    /> Print
                  </vs-button>
                </vs-col>
              </vs-row>

              <vs-row>
                <vs-col
                  xs="12"
                  md="5"
                  lg="5"
                >
                  <vs-button
                    style="margin-left:0"
                    shadow
                    :active="false"
                    class="withFocus"
                    :disabled="!disableBtnMultipleKoli || listeninputDisabled == true"
                    @click="openSurchargeDialog"
                  >
                    <i
                      class="bx bx-plus"
                      style="margin-right:5px"
                    /> SURCHARGE / PACKING KAYU
                  </vs-button>
                  <div>
                    <template v-if="Object.keys(surchargeshow).length > 0">
                      <span
                        v-for="(item, key) in Object.keys(surchargeshow)"
                        :key="key"
                        :data-value="item"
                        class="vs-select__chips__chip"
                        style="width: fit-content;"
                      >
                        {{ `${surchargeshow[item].surcharge_name} | ${surchargeshow[item]['jumlah'] || ''}x` }}
                        <template v-if="!surchargeshow[item].hasOwnProperty('jumlah') && !surchargeshow[item].surcharge_name.toLowerCase().includes('overweight')">
                          <span
                            class="vs-select__chips__chip__close"
                            @click="removeSurcharge(item, 0, surchargeshow[item].surcharge_name)"
                          >
                            <i class="vs-icon-close vs-icon-hover-less" />
                          </span>
                        </template>
                      </span>
                    </template>
                  </div>
                </vs-col>
                <vs-col
                  xs="12"
                  md="4"
                  lg="4"
                >
                  <checkbox
                    ref="package_do_return"
                    style="margin-top:10px;margin-left: 18px;"
                    form-key="package_do_return"
                    :is-checked="InputObject['package_do_return'].value"
                    :name="InputObject['package_do_return'].titleLabel"
                    :disabled="listeninputDisabled"
                    @updateValue="updateValue"
                  />
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
        </template>
      </div>
    </div>

    <template>
      <bpik
        :close-dialog="closeBpikComponent"
        :active="bpikComponent"
        :arr-data="[]"
      />
    </template>

    <dialog-surcharge
      :active="surchargeSelector"
      :close-dialog="closeDialogSurcharge"
      :koli-obj="koliObj"
      :index="0"
      @updateValue="updateValue"
    />
    <dialog-multipleKoli
      :active="dialogSettingMultipleKoli"
      :close-dialog="closeSettingMultipleKoli"
      :surcharge-by-i-d="surchargeByID"
      @prosesmultipleKoli="prosesmultipleKoli"
    />

    <connote-number-dialog
      :active="connote_number_dialog"
      :close-dialog="closeConnoteNumberDialog"
      :title="connote_number_type"
      :type="connote_number_type"
      @updateValue="updateValue"
    />
  </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'
import TransactionMixin from '@/mixins/transaction.js'
import FormMaster from '@/components/form/formMaster'
import InputGeneral from '@/components/input/general'
import Selector from '@/components/input/select'
import Switch from '@/components/input/switch'
import Radio from '@/components/input/radio'
import Checkbox from '@/components/input/checkboxELUI'
import BPIK from '@/views/transaction/package/bpik'
import ConnoteNumberDialog from '@/views/transaction/connoteNumberDialog'

import dialogMultipleKoli from '@/views/transaction/package/dialogMultipleKoli'
import dialogSurcharge from '@/views/transaction/package/dialogSurcharge'
export default {
  name: 'PackageInformation',
  components: {
    'form-master': FormMaster,
    'input-general': InputGeneral,
    'selector': Selector,
    'switchNih': Switch,
    'radio': Radio,
    'checkbox': Checkbox,
    'dialog-surcharge': dialogSurcharge,
    'dialog-multipleKoli': dialogMultipleKoli,
    'bpik': BPIK,
    'connote-number-dialog': ConnoteNumberDialog,
  },
  props: {
      inputDisabled: Boolean,
  },
  mixins: [master, TransactionMixin],
  data() {
    return {
      InputObject: {},
      surchargeSelector: false,
      dialogSettingMultipleKoli: false,
      bpikComponent: false,
      surchargeByID: {},
      surchargeshow: {},
      template_koli:  {
        koli_id: '',
        height: 0,
        length: 0,
        width: 0,
        volume_weight: 0.00,
        actual_weight: 1,
        surcharge_id: [],
        surcharge_manual: 0,
        is_packing_kayu: false,
        is_packing_kayu_id: '',
        description: ''
      },
      connote_koli_item: [],
      koliObj: {},
      koliinput: 'number',
      disableBtnMultipleKoli: true,
      current_index_koli: 0,
      package_tidak_packing_kayu: false,
      package_tidak_asuransi: false,

      connote_number_type: '',
      connote_number_dialog: false,

      btnPrintASRdanSJ: false,
      connote_koli_item_sebelum_surcharge_menyerang: [],
      koli_b4_surcharge: {},
      tempActualWeightPackingKayu: null,
      tempvolumeWeightPackingKayu: null,
      listenJumlahPackage: null
    }
  },
  computed: {
    listenSurchargeList() {
      return this.$store.getters.getTransaction.package.package_surcharge.arrData
    },
    listen_package_category_arrData() {
      return this.$store.getters.getTransaction.package
    },
    listenPackageSurcharge() {
      return this.$store.getters.getTransaction.package.package_surcharge.value
    },
    listenPackageService() {
      return this.$store.getters.getTransaction.package.package_service.valueData || {}
    },
    listenConnoteKoliItem() {
      return this.$store.getters.getTransaction.connote_koli_item
    },
    listenDestinationCode() {
      return this.$store.getters.getTransaction.destination.destination_zip_code.input[1].value
    },


    // new code
    listenConnoteIndexActive() {
      return this.$store.getters.getTransaction.connote_index_active
    },
    listenPreviousConnoteIndexActive() {
      return this.$store.state.transaction.previous_connote_index_active
    },
    listeninputDisabled() {
      return this.inputDisabled || false
    },
    listenCustomerCode () {
      return this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive]['customer_code_tariff']
    },
  },
  watch: {
    listenPackageService(n, o) {
      if (n !== o) {
        this.prosesKoli0('', '', 0)
      }
    },
    listenJumlahPackage(n, o) {
      if (n !== o) {
        this.changeJumlah()
      }
    },
    listenConnoteIndexActive(n, o) {
      if (n !== o) {
        this.initialize()
      }
    },
    listenDestinationCode(n, o) {
      if (n !== o) {
        if (n !== '') {
          this.getShippingService()
        }
      }
    },
    listenCustomerCode(n, o) {
      if (n !== o) {
        if (n !== '') {
          this.getShippingService()
        }
      }
    },
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.listenJumlahPackage = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item.length;

      const obj = this.$store.getters.getTransaction.package || {}
      if (Object.keys(obj).length > 0) {
        const keys = Object.keys(obj)
        this.InputObject = obj
      } else {
        this.InputObject = {}
      }
      // this.connote_koli_item = this.listenConnoteKoliItem

      // new code
      if (this.listenConnoteIndexActive == this.listenPreviousConnoteIndexActive) {
        this.connote_koli_item = this.test(this.$store.state.transaction.connote_koli_item || [])
      }
      else {
        this.connote_koli_item = this.test(this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item || [])
      }
      
      // console.log("123d", this.listenConnoteIndexActive)
      this.wrapingSurcharge()
    },
    test(json) {
      // untuk mutus hubungan sama store
      return JSON.parse(JSON.stringify(json))
    },
    connoteNumberDialog(type) {
      this.connote_number_type = type || 'pra'
      this.connote_number_dialog = !this.connote_number_dialog
    },
    closeConnoteNumberDialog() {
      this.connote_number_dialog = false
    },
    printASRdanSJ() {
      this.printSPPAP()
      const routeData = this.$router.resolve({ name: 'printSPPAP' })
      window.open(routeData.href, '_blank')
    },
    wrapingSurcharge() {
      const arrSurcharge = this.listenSurchargeList
      const surchargeByID = {}
      arrSurcharge.map((item) => {
        surchargeByID[item.surcharge_id] = item
      })
      this.surchargeByID = surchargeByID
      // console.log('this.surchargeByID', this.surchargeByID)
      this.$store.dispatch(`SET_PACKAGE_PACKAGE_SURCHARGE_ValueData`, surchargeByID)
    },
    async getShippingService() {
      const connote_number = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_number || ''


      await axios
        .get(`${this.URL.tariff_shipping_service
        }?n=${this.listenNodeId}&destination=${this.listenDestinationCode}&customer_code_tariff=${this.listenCustomerCode}`,
        this.Helper.header())
        .then((res) => {
          // console.log('getShippingService', res.data.data)
          const { data } = res.data
          const arr = []
          data.map((item) => {
            const obj = {}
            obj.label = item.service_name
            obj.value = item.tariff_service_code.toLowerCase()
            obj.data = item
            obj.tarif = item.tariff_amount_1
            obj.tariff_calculation_type = item.tariff_calculation_type

            // tiering tarrif
            const tariffAkumulatif = {}
            const tariffStandar = {}
            const keys = Object.keys(item)

            // sudah dipastikan tiering sampe 50 biji
            for (let i = 1; i <= 50; i++) {
              if (i == 1) {
                tariffStandar.weight = item.tariff_weight_1 || 0
                tariffStandar.value = item.tariff_amount_1 || 0
              } else if (Number(item[`tariff_amount_${i}`]) != 0) {
                tariffAkumulatif[item[`tariff_weight_${i}`]] = item[`tariff_amount_${i}`] || 0
              }
            }

            obj.tariffAkumulatif = tariffAkumulatif
            obj.tariffStandar = tariffStandar

            if (item.tariff_service_code.toLowerCase().includes('reg')) {
              arr.unshift(obj)
            } else {
              arr.push(obj)
            }
          })

          // if create new transaction
          // if(connote_number == ""){

          // }
          this.$store.dispatch('SET_PACKAGE_PACKAGE_SERVICE', arr.length > 0 ? arr[0].value : '')
          this.$store.dispatch('SET_PACKAGE_PACKAGE_SERVICE_ValueData', arr.length > 0 ? arr[0] : '')
          this.$store.dispatch('SET_PACKAGE_PACKAGE_SERVICE_arrData', arr.length > 0 ? arr : [])

          const node_code = this.listenNodeCode
          const self = this
          this.autoApply(node_code).then(() => {
            self.surchargeView()
          })
          // this.loading = false
        }).catch((err) => {
          // this.loading = false
          this.checkAuth(err.response)
          // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate country list', err)
        })
      
    },
    changeJumlah() {
      if (this.listenJumlahPackage > 1) {
        this.disableBtnMultipleKoli = false
        this.koliinput += `|disabled`
      } else {
        this.disableBtnMultipleKoli = true
        this.koliinput = 'number'
      }

      if (this.listenJumlahPackage > 0) {
        const absValue = Math.abs(this.listenJumlahPackage - this.connote_koli_item.length)
        if (this.connote_koli_item.length > this.listenJumlahPackage) {
          this.connote_koli_item.splice((this.connote_koli_item.length) - absValue, absValue)
        } 
        else if (this.listenJumlahPackage > this.connote_koli_item.length) {
          for (let i = 0; i < absValue; i++) {
            this.connote_koli_item.push(this.template_koli)
          }
        }
      }

      this.$store.dispatch('SET_CONNOTE_DATA_KOLI', this.connote_koli_item)
      // this.calcDataKoli()
      const node_code = this.listenNodeCode
      const self = this
      this.autoApply(node_code).then(() => {
        self.surchargeView()
        self.calculation()
      })
    },
    updateValue(key, value, value2 = null, value3 = null, value4 = null) {
      switch (key) {
        case 'package_service':
          if (value2) {
            this.$store.dispatch('SET_PACKAGE_PACKAGE_SERVICE_ValueData', value2)
            this.$store.dispatch('SET_PACKAGE_PACKAGE_SERVICE', value)


            const node_code = this.listenNodeCode
            const self = this
            this.autoApply(node_code).then(() => {
              self.surchargeView()
              self.calculation()
            })

            // console.log('HASIL', this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive])
          }
          break
        case 'package_category':
          this.$store.dispatch('SET_PACKAGE_PACKAGE_CATEGORY', value)
          break
        case 'insured_goods_value':
          if (this.package_tidak_asuransi == false) {
            const numb = this.moneyParsing(value)

            this.$store.dispatch('SET_CALCULATOR_ASURANSI', numb * 0.002)
          } else {
            this.$store.dispatch('SET_CALCULATOR_ASURANSI', 0)
          }
          this.$store.dispatch('SET_PACKAGE_PACKAGE_INSURED_GOODS_VALUE', value)

          this.calculation()
          break
        case 'amount_discount':
          let num = this.moneyParsing(value)
          const val = value || 0
          if(num < 1){
            num = 0
          }
          // console.log('SET_PACKAGE_PACKAGE_DISKON', num, value, val)
          this.$store.dispatch('SET_CALCULATOR_DISKON', value)
          this.$store.dispatch('SET_PACKAGE_PACKAGE_DISKON', value)

          this.calculation()
          break
        case 'remarks':
          this.$store.dispatch('SET_PACKAGE_PACKAGE_INSTRUKSI', value)
          break
        case 'koli_jumlah':
          this.$store.dispatch('SET_PACKAGE_PACKAGE_JUMLAH', value)
          this.listenJumlahPackage = value
          break
        case 'koli_description':
          this.$store.dispatch('SET_PACKAGE_PACKAGE_DESCRIPTION', value)
          this.prosesKoli0('description', value, 0)
          break
        case 'koli_weight':
          this.prosesKoli0('actual_weight', value, 0)
          break
        case 'koli_length':
          this.prosesKoli0('length', value, 0)
          break
        case 'koli_width':
          this.prosesKoli0('width', value, 0)
          break
        case 'koli_height':
          this.prosesKoli0('height', value, 0)
          break
        case 'package_tidak_asuransi':
          this.$store.dispatch('SET_PACKAGE_PACKAGE_TIDAK_ASURANSI', value)
          this.package_tidak_asuransi = value

          if (value == true) {
            this.$store.dispatch('SET_CALCULATOR_ASURANSI', 0)
            this.$store.dispatch('SET_CALCULATOR_ADM_ASURANSI', 0)
          } else {
            const insured_good_value = this.$store.getters.getTransaction.package.package_insured_goods_value.value

            const goods_value = this.moneyParsing(insured_good_value)
            this.$store.dispatch('SET_CALCULATOR_ASURANSI', goods_value * 0.002)
          }
          this.calculation()
          break
        case 'package_tidak_packing_kayu':
          this.$store.dispatch('SET_PACKAGE_PACKAGE_TIDAK_PACKING_KAYU', value)
          this.package_tidak_packing_kayu = value
          this.tidakPackingKayuToggle()
          // console.log('package_tidak_packing_kayu', value)
          break
        case 'package_do_return':
          this.$store.dispatch('SET_PACKAGE_PACKAGE_DO_RETURN', value)
          break
        case 'amount_cod':
          this.$store.dispatch('SET_PACKAGE_PACKAGE_COD', value)
          break
        case 'handle_surcharge':

          this.connote_koli_item[value].surcharge_id = value2
           
          if (this.connote_koli_item[value].hasOwnProperty('is_packing_kayu_id')) {
            if (value3 !== null && value3 !== "") {
              this.connote_koli_item[value].is_packing_kayu = true
              this.connote_koli_item[value].is_packing_kayu_id = value3
            } else {
              this.connote_koli_item[value].is_packing_kayu = false
              this.connote_koli_item[value].is_packing_kayu_id = ""
            }
          }
          if(this.connote_koli_item[value].hasOwnProperty("surcharge_manual")) {
            this.connote_koli_item[value].surcharge_manual = value4 != null ? value4 : ""
          }
          this.$store.dispatch('SET_CONNOTE_DATA_KOLI', this.connote_koli_item)
          const node_code = this.listenNodeCode
          const self = this
          this.autoApply(node_code).then(() => {
            self.surchargeView()
            self.calculation()
          })
          break
        default:
                    // code block
      }


      if (this.package_tidak_asuransi == true || this.package_tidak_packing_kayu == true) {
        this.btnPrintASRdanSJ = true
      } else {
        this.btnPrintASRdanSJ = false
      }
    },
    prosesKoli0(key, value) {
      const service = this.listenPackageService.data || {}

      if (this.connote_koli_item[0].hasOwnProperty(key)) {
        this.connote_koli_item[0][key] = value
      }
      let volume_weight = 0

      if (Object.keys(service).length > 0) {
        const service_volume_divider = Number(service.service_volume_divider)
        volume_weight = (this.connote_koli_item[0].length * this.connote_koli_item[0].width * this.connote_koli_item[0].height) / service_volume_divider
      }

      this.connote_koli_item[0].volume_weight = volume_weight.toFixed(2)
      this.connote_koli_item_sebelum_surcharge_menyerang = this.connote_koli_item
      // new code
      this.$store.dispatch('SET_CONNOTE_DATA_KOLI', this.connote_koli_item)
      // this.calcDataKoli()
      const node_code = this.listenNodeCode
      const self = this
      this.autoApply(node_code).then(() => {
        self.surchargeView()
        self.calculation()
      })
    },
    tidakPackingKayuToggle() {
      const listKoli = this.connote_koli_item// this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item || []
      const tempKoliSurchargePackingKayu = {}
      const service = this.listenPackageService.data || {}

      listKoli.map((item, i) => {
        if (item.is_packing_kayu_id !== null && item.is_packing_kayu_id !== '') {
          tempKoliSurchargePackingKayu[i] = item.is_packing_kayu_id
        }
      })

      if (this.package_tidak_packing_kayu == true) {
        this.tempKoliSurchargePackingKayu = tempKoliSurchargePackingKayu

        // console.log('this.tempKoliSurchargePackingKayu ====', this.tempKoliSurchargePackingKayu)
        if (Object.keys(this.tempKoliSurchargePackingKayu).length > 0) {
          Object.keys(this.tempKoliSurchargePackingKayu).map((index) => {
            if (listKoli[index]) {
              listKoli[index].surcharge_id = listKoli[index].surcharge_id.filter((sur) => sur !== this.tempKoliSurchargePackingKayu[index])
              listKoli[index].is_packing_kayu_id = ''
              listKoli[index].is_packing_kayu = false

              let volume_weight = 0

              if (Object.keys(service).length > 0) {
                const service_volume_divider = Number(service.service_volume_divider)
                volume_weight = (listKoli[index].length * listKoli[index].width * listKoli[index].height) / service_volume_divider
              }

              listKoli[index].volume_weight = volume_weight.toFixed(2)
            }
          })
        }
        this.$store.dispatch('SET_CONNOTE_DATA', { key: 'is_packing_kayu', value: false })
      } else {
        // jika mau muncul lagi packing kayu yg sebelumnya saat uncheck
        // if (Object.keys(this.tempKoliSurchargePackingKayu).length > 0) {
        //     Object.keys(this.tempKoliSurchargePackingKayu).map(index => {
        //         if(listKoli[index]) {
        //             listKoli[index].surcharge_id.push(this.tempKoliSurchargePackingKayu[index])
        //             listKoli[index].is_packing_kayu_id = this.tempKoliSurchargePackingKayu[index]
        //             listKoli[index].is_packing_kayu = true
        //         }

        //     })
        // }
        this.$store.dispatch('SET_CONNOTE_DATA', { key: 'is_packing_kayu', value: true })
        // clear
        this.tempKoliSurchargePackingKayu = {}
      }

      this.$store.dispatch('SET_CONNOTE_DATA_KOLI', listKoli)
      this.surchargeView()
      this.calculation()
    },

    surchargeView() {
      this.surchargeshow = {}
      const koli = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item

      const { surchargeByID } = this
      // console.log('surchargeByID /////', surchargeByID)

      let jumlah = 1
      const surcharge_view = {}
      if (koli.length > 1) {
        koli.map((item) => {
          const obj = {}
          if (item.surcharge_id.length > 0) {
            item.surcharge_id.map((itm) => {
              if (surcharge_view.hasOwnProperty(itm)) {
                const data = surchargeByID[itm]
                jumlah += 1
                data.jumlah = jumlah
                surcharge_view[itm] = data
              } else {
                const data = surchargeByID[itm]
                data.jumlah = 1
                surcharge_view[itm] = data
              }
            })
          }
        })
      } else {
        koli.map((item) => {
          const obj = {}
          if (item.surcharge_id.length > 0) {
            item.surcharge_id.map((itm) => {
              if (surchargeByID.hasOwnProperty(itm)) {
                const data = surchargeByID[itm]
                surcharge_view[itm] = data
                // console.log('AFFFF', this.surchargeshow)
              }
            })
          }
        })
      }

      //     console.log('surchargeView', this.connote_koli_item,surchargeByID,this.surchargeshow)

      this.surchargeshow = surcharge_view
      // console.log('HIT surcharge view', this.surchargeshow)


      // this.surchargeshow = view
    },
    prosesmultipleKoli(val) {
      this.connote_koli_item = val
      this.connote_koli_item_sebelum_surcharge_menyerang = val

      this.$store.dispatch('SET_CONNOTE_DATA_KOLI', this.connote_koli_item)
      // this.calcDataKoli()
      const node_code = this.listenNodeCode
      const self = this
      this.autoApply(node_code).then(() => {
        self.surchargeView()
      })

      this.$nextTick(() => {
        this.calculation()
      })

      // this.$store.dispatch("SET_CONNOTE_KOLI_ITEM_index", {"index": index, "key":key, "value":value})
    },
    openBpikComponent() {
      this.bpikComponent = !this.bpikComponent
    },
    closeBpikComponent() {
      this.bpikComponent = false
    },
    openSurchargeDialog() {
      this.current_index_koli = 0
      this.koliObj = this.connote_koli_item[0]
      this.surchargeSelector = true
    },
    closeDialogSurcharge() {
      this.koliObj = {}
      this.surchargeSelector = false
      this.$refs.package_do_return.$el.querySelector("input").focus();
    },
    openSettingMultipleKoli() {
      this.dialogSettingMultipleKoli = true
    },
    closeSettingMultipleKoli() {
      this.dialogSettingMultipleKoli = false
      this.$refs.package_tidak_packing_kayu_checkbox.$el.querySelector("input").focus();
    },
    removeSurcharge(id, index, name) {
      const service = this.listenPackageService.data || {}
      const koli = this.connote_koli_item
      koli[index].surcharge_id = koli[index].surcharge_id.filter((item) => item != id)
      if (name.toLowerCase().includes('packing kayu')) {
        if (koli[index].hasOwnProperty('is_packing_kayu_id')) {
          koli[index].is_packing_kayu_id = ''
          koli[index].is_packing_kayu = false
          let volume_weight = 0

          if (Object.keys(service).length > 0) {
            const service_volume_divider = Number(service.service_volume_divider)
            volume_weight = (koli[index].length * koli[index].width * koli[index].height) / service_volume_divider
          }

          koli[index].volume_weight = volume_weight.toFixed(2)
        }
      }
      else if (name.toLowerCase().includes('surcharge manual')) {
        koli[index].surcharge_manual = 0
      }

      this.$store.dispatch('SET_CONNOTE_DATA_KOLI', koli)
      const node_code = this.listenNodeCode
      const self = this
      this.autoApply(node_code).then(() => {
        self.surchargeView()
        self.calculation()
      })
    },
    printSPPAP() {
      this.$ls.set('printSPPAP', {})
      const data = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive]
      const obj = {}
      obj.tidak_asuransi = this.package_tidak_asuransi// data.is_insured == false ? true : false
      obj.tidak_packing_kayu = this.package_tidak_packing_kayu// data.is_packing_kayu == false ? true : false // nnti di update
      this.$ls.set('printSPPAP', obj)
      // console.log('printSPPAP', obj, data.is_insured, data.is_packing_kayu)
    },
  },
}
</script>
<style lang="scss">
    .form-package{
        text-align: left;
        p{
            margin: .5em;
            font-size: 16px;
            &.surcharge{
                margin: 0 .5em;
            }
        }
        label{
            font-size: 16px !important;
            .el-checkbox__label{
                font-size: 16px !important;
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

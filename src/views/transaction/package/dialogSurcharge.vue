<template>
    <dialog-master 
    :actived="listenActive" 
    width="md"
    ref="cust"
    :closeDialog="cancel">

        <template v-slot:header>
            Surcharge
        </template>

        <template v-slot:content>
            <div>
                    <template v-if="Keys.length > 0">
                        <template v-for="(item,key) in Keys">
                            <vs-row :key="key">
                                <vs-col xs="12" sm="12" lg="12">
                                    <checkbox
                                        :formKey="`surcharge_type|${item}`"
                                        :isChecked="listenOptions.includes(item)"
                                        :name="item"
                                        :ref="`surchargeType${item.replace(/\s+/g, '')}`"
                                        
                                        @updateValue="updateValue" /> 
                                      <!-- selectedRadio.hasOwnProperty(item) -->
                                    <template v-if="(options.includes(item))">
                                        <vs-row>
                                            <vs-col xs="1" sm="1" lg="1">
                                            </vs-col>
                                            <template v-if="item.toLowerCase().includes('manual')">
                                              <vs-col xs="11" sm="11" lg="11">
                                                <!-- <input-general
                                                  name="Surcharge manual"
                                                  :rules="options.includes(item) ? 'required' : ''"
                                                  :form-key="`surcharge_manual|${item}`"
                                                  :value-data="manual"
                                                  type-input="text"
                                                  :border="true"
                                                  :placeholderGabung="true"
                                                  @updateValue="updateValue"
                                                /> -->
                                                <form @submit.prevent="processSurchargeManual">
                                                    <input-general
                                                      name="Surcharge manual"
                                                      :rules="options.includes(item) ? 'required|numeric' : 'numeric'"
                                                      :form-key="`surcharge_manual|${item}`"
                                                      :value-data="manual"
                                                      type-input="text"
                                                      :border="true"
                                                      :placeholderGabung="true"
                                                      @updateValue="updateValue"
                                                    />
                                                </form>
                                              </vs-col>
                                            </template>
                                            
                                            <template v-else>
                                              <vs-col xs="11" sm="11" lg="11">
                                                  <template v-if="objData[item] !== undefined ? objData[item].length > 0 : false">
                                                      <radio 
                                                              :ref="item"
                                                              :name="''" 
                                                              :rules="''" 
                                                              :vertical="true"
                                                              width="6"
                                                              :formKey="`radio_surcharge|${item}`"
                                                              :valueData="objData[item]"
                                                              :selectedValue="selectedRadio[item] ? selectedRadio[item] :null"
                                                              @updateValue="updateValue" />
                                                      
                                                      <!-- <template v-for="(sur,i) in objData[item]">
                                                          <template v-if="sur.service_relevant == true">
                                                              <vs-radio v-model="tempRadio" :val="sur.surcharge_id" :key ="i" @input="radioChange(item,tempRadio)">
                                                                  {{sur.surcharge_name}}
                                                              </vs-radio>
                                                          </template>
                                                      </template> -->
                                                  </template>
                                              </vs-col>
                                            </template>
                                        </vs-row>
                                    </template>
                                    <!-- jika surcharge manual maka inputan muncul -->
                                    
                                    
                                </vs-col>
                            </vs-row>
                        </template>
                    </template>
                    
            </div>
        </template>

        

        <template v-slot:footer>
            <vs-row justify="flex-end" class="mt-2">
                <vs-col w="3">
                    <vs-button
                    transparent
                    block
                    danger
                    flat
                    :active="true"
                    @click="cancel"
                    style="display: none"
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
                    class="outline"
                    v-on:keydown.tab="disable_tab_button($event)"
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
import DialogMaster from "@/components/dialog/dialogMaster"
import TransactionMixin from "@/mixins/transaction.js"
import Checkbox from "@/components/input/checkboxELUI"
import Radio from "@/components/input/radio"
import InputGeneral from '@/components/input/general'
export default {
    name: "dialog-surcharge",
    mixins: [TransactionMixin],
    components: {
        "dialog-master": DialogMaster,
        "checkbox": Checkbox,
        "radio": Radio,
        'input-general': InputGeneral,
    },
    props: {
        closeDialog: Function,
        active: Boolean,
        index: Number,
        koliObj: Object
    },
    data() {
        return {
            activeNames: [],
            objData: {},
            Keys: [],
            selectedData: [],
            koli: {},
            manual: "",
            options: [],
            selectedRadio: {
                test: null
            },
            selectedPackingKayu_id: '',
            tempRadio: '',
            hidden: {}
        }
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenSurchargeList() {
            return this.$store.getters['getTransaction']['package']['package_surcharge']['arrData']
        },
        listenSurchargeSelected() {
            return this.$store.getters['getTransaction']['package']['package_surcharge']['value']
        },
        listenPackageSurcharge () {
            return this.$store.getters.getTransaction.package.package_surcharge.value
        },
        listenPackageService () {
            return this.$store.getters.getTransaction.package.package_service.valueData
        },

        listenConnoteIndexActive () {
            return this.$store.getters.getTransaction.connote_index_active
        },
        listenCurrentIndexKoli () {
            return this.index || 0
        },
        listenOptions() {
            return this.options
        },
        listenkoliObj() {
            return this.koliObj
        }
    },
    watch: {
        active: function(val) {
            if(val != undefined) {
                if(val == true) {
                    this.initialize()
                    const cust = this.$refs.cust
                    let el = cust.$scopedSlots.content()
                    let self = this
                    this.$nextTick(() => {
                        // el[0].context.$refs.test.value = 'aaa'
                        // console.log('input', el[0].context.$refs)
                    //     // this.$refs.theInput.focus();
                        let str = `el[0].context.$refs.surchargeType${this.Keys[0].replace(/\s+/g, '')}`
                        let elInput = eval(str)[0]
                        let Checkbox = elInput.$el.querySelector('input')
                        // console.log('DIALOG SURCHARGE el', el[0].context, str, Checkbox)
                        // setTimeout(function(){ el[0].context.$refs.labelInput.$refs.generalInput.focus() }, 3000);
                        

                        
                        // let Checkbox = el[0].context.$refs.labelInput.$refs.generalInput.$el.querySelector('input')
                        // inputEl.focus();
                        setTimeout(function(){ Checkbox.focus(); }, 100);
                        
                        
                    });
                }
            }
        },
        // listenPackageService: function (n,o) {
        //     if(n !== o) {
        //         this.initialize()
        //     }
        // }
    },
    methods: {
        initialize() {
            // this.$store.dispatch(`SET_PACKAGE_PACKAGE_SURCHARGE`, [])
            let surcharge = this.listenSurchargeList
            this.koli = this.listenkoliObj //this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item[this.listenCurrentIndexKoli] || {}
            this.selectedRadio = {}
            this.options = []
            let selectedR = {}
            let prev_surcharge_id = this.koli['surcharge_id'] || []

            let obj = {}
            let hidden = {}
            surcharge.map(item => {
                item['service_relevant'] = false
                item['visible'] = true // default true | jika ada surcharge condition yg ditentukan dengan selected surcharge type
                let filter = this.filterSurcharge(item, this.koli)

                if(prev_surcharge_id.includes(item.surcharge_id)) {
                    selectedR[item.surcharge_type_name] = item.surcharge_id
                }
                
                if(obj.hasOwnProperty(item.surcharge_type_name)) {
                    if(filter.service_relevant == true && filter.visible == true) {
                        filter['value'] = filter.surcharge_id
                        filter['label'] = filter.surcharge_name
                        obj[item.surcharge_type_name].push(filter)
                    } else if (filter.visible == false) {
                        hidden[item.surcharge_type_name] = filter
                    }
                } else {
                    if(filter.service_relevant == true && filter.visible == true) {
                        obj[item.surcharge_type_name] = []
                        filter['value'] = filter.surcharge_id
                        filter['label'] = filter.surcharge_name
                        obj[item.surcharge_type_name].push(filter)
                    } else if (filter.visible == false) {
                        hidden[item.surcharge_type_name] = filter
                    }
                }
            })

            // console.log('selectedR ========', selectedR)

            let keys = Object.keys(obj)
            keys = keys.filter(item => !item.toLowerCase().includes('overweight'))
            this.hidden = hidden

            if (keys.length > 0) {
                this.objData = obj
                this.Keys = keys
                if(Object.keys(selectedR).length > 0) {
                    this.options = Object.keys(selectedR)
                    this.selectedRadio = selectedR
                    this.processSurchargeType()
                    // if(!this.options.includes(keys[0])) {
                    //     this.options.push(keys[0])
                    //     this.selectedRadio[keys[0]] = ""
                    // }
                } else {
                    // this.options.push(keys[0])
                    // this.selectedRadio[keys[0]] = obj[keys[0]].filter(item => item.service_relevant)[0].surcharge_id
                }
                
                
            }
            
            this.manual = this.koli['surcharge_manual']

            

            // console.log('this.options', this.options)
            // console.log('this.objData', this.objData)
            // console.log('this.selectedRadio', this.selectedRadio)
            
        },
        disable_tab_button(event) {
          event.preventDefault();

        },
        processSurchargeType() {
          // jika ada surcharge condition yg ditentukan dengan selected surcharge type
          // this.selectedRadio
          // console.log("this.hidden", this.hidden)
          
          let addKey = {}
          let hidden = Object.keys(this.hidden)
          hidden.map(item => {
              let filter = this.filterSurcharge(this.hidden[item], this.koli, null, this.options)
              if(filter.visible == true) {
                // filter['value'] = filter.surcharge_id
                // filter['label'] = filter.surcharge_name
                // addKey[item.surcharge_type_name] = filter
                if(!this.Keys.includes(filter.surcharge_type_name)) {
                  this.Keys.push(filter.surcharge_type_name)
                }
                //jika menggunakan via udara(DG), DG DOKUMENT FEE otomatis ikut 
                if(filter.surcharge_type_name === "DG DOCUMENT FEE") {
                    this.selectedRadio[item] = this.hidden[item]['surcharge_id']
                }
                
                // console.log("INI VISIBLE", filter, this.Keys)
              } else {
                this.Keys = this.Keys.filter(itm => {
                    return itm !== filter.surcharge_type_name
                })
                if(this.selectedRadio.hasOwnProperty(filter.surcharge_type_name)) {
                    delete this.selectedRadio[filter.surcharge_type_name]
                }
              }
          })
        },
        radioChange(key, val){

        },
        updateValue(key, value){

            let split = key.split("|")[1]
            switch(true) {
                case key.includes('surcharge_manual'):
                    // semi hardcode surcharge manual
                    let id_surcharge_manual = this.objData[split]
                    this.selectedRadio[split] = id_surcharge_manual[0]["value"]
                    this.manual = value
                    // 
                    // console.log('this.options === ', this.options)
                    // console.log('this.selectedRadio ===', this.selectedRadio)
                    break;
                case key.includes('surcharge_type'):
                    if(value == true) {
                        if(this.options.includes(split) == false){
                            this.options.push(split)
                            this.selectedRadio[split] = ''
                            
                            if(this.hidden.hasOwnProperty(split)) {
                              this.selectedRadio[split] = this.hidden[split]['surcharge_id']
                            }
                        }
                    } else {
                        if(this.options.includes(split) == true){
                            let temp = this.options.filter(item => item !== split)
                            this.options = temp
                            if(this.selectedRadio.hasOwnProperty(split)) {
                                delete this.selectedRadio[split]
                            }
                        }
                        
                        if(split.toLowerCase().includes("manual")) {
                          this.manual = ""
                        }
                    }
                    
                    // console.log('this.options === ', this.options)
                    // console.log('this.options has input_general =>', input_general)
                    // console.log('this.selectedRadio ===', this.selectedRadio)
                    break;
                case key.includes('radio_surcharge'):
                    // this.selectedRadio
                    let str = key.split("|")[1]

                    let self = this
                    let checkbox = `self.$refs.surchargeType${str.replace(/\s+/g, '')}`
                    
                    this.$nextTick(() => {
                        let el = eval(checkbox)
                    });
                    

                    if(this.options.includes(str) == false){
                        this.options.push(str)
                    }

                    if(this.selectedRadio.hasOwnProperty(str)) {
                        this.selectedRadio[str] = value
                    }
                    if(str.toLowerCase().includes('packing kayu')) {
                        this.selectedPackingKayu_id = value
                    }
                    // console.log('this.options === ', this.options)
                    // console.log('this.selectedRadio ===', this.selectedRadio)
                    break;
                default:
            }
            
            this.processSurchargeType()
            this.prosesSurcharge()
            
        },
        round03(numToRound){
            let oo = numToRound | 0
            let ooo = oo + 0.3
            let res = oo
            if(numToRound > ooo) {
                res = res +1
            } 
            return res;
        },
        
        cancel() {
            this.closeDialog()
            this.selectedData = []
        },
        prosesSurcharge(){
          let key = Object.keys(this.selectedRadio)
          let arr = []
          key.map(item => {
              if(this.selectedRadio[item] !== '') {
                  arr.push(this.selectedRadio[item])
              }
          })
          let manual = this.manual == "" ? 0 : parseInt(this.manual)
          this.$emit("updateValue", "handle_surcharge",this.index, arr, this.selectedPackingKayu_id, manual)
          // this.selectedRadio = {}
          this.selectedPackingKayu_id = ""
          // if(key.length > 0 ) {
          // 
          //     console.log('arr radio', arr)
          //     if(arr.length > 0) {
          // 
          //     }
          // }
          // console.log('this.selectedRadio', this.selectedRadio, key)
        },
        handleSubmit() {
          
          // this.prosesSurcharge()
            this.closeDialog()
            this.manual = ""
          
        }
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>
<style lang="scss">
  .with--placeholder{
    .vs-input__label{
      // opacity: 0.4;
      // visibility: visible;
    }
  }
  .outline {
  &:focus, &:hover {
    background-color: #153478;
  }
}
</style>
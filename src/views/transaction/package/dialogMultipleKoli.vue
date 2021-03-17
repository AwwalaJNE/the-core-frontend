<template>
    <div>
        <dialog-master 
        :actived="listenActive" 
        width="xl"
        ref="cust"
        :closeDialog="cancel">

            <template v-slot:header>
                Multiple Koli
            </template>

            <template v-slot:content>
                <div>
                    <vs-table  ref="tableColom">
                        <template #thead>
                        <vs-tr>
                            <vs-th>
                                No.
                            </vs-th>
                            <template v-for="(item, key) in tableHeader">
                                <vs-th :key="key" :class="item.width ? item.width : ''">
                                    {{item.label}}
                                </vs-th>
                            </template>
                            
                            <vs-th>
                                Action
                            </vs-th>
                        </vs-tr>
                        </template>
                        <template #tbody>

                            <template v-if="connote_koli_item.length > 0">
                                <vs-tr
                                    v-for="(item,key) in connote_koli_item"
                                    :key="key"
                                    :data="key"
                                >
                                    <vs-td>
                                        {{Number(key) + 1}}    
                                    </vs-td>
                                    <template v-for="(item_h, i) in tableHeader">
                                        <vs-td
                                            :key="i"
                                            :class="item.width ? item.width : ''"
                                        >
                                            <template v-if="Array.isArray(item[item_h.key])">
                                                <template v-if="item[item_h.key].length > 0">
                                                    <span 
                                                    v-for="(itm, i) in item[item_h.key]"
                                                    :data-value="itm" 
                                                    class="vs-select__chips__chip"
                                                    style="width: fit-content;"
                                                    :key="i">
                                                        {{surchargeByID[itm].surcharge_name}}
                                                        <template v-if="!surchargeByID[itm].surcharge_name.toLowerCase().includes('overweight')">
                                                            <span class="vs-select__chips__chip__close" @click="removeSurcharge(itm, key, surchargeByID[itm].surcharge_name)">
                                                                <i class="vs-icon-close vs-icon-hover-less"></i>
                                                            </span>
                                                        </template>
                                                    </span>
                                                </template>
                                                <hr>
                                            </template>
                                            <template v-else>
                                                <input-general 
                                                name="" 
                                                :rules="item_h.rule" 
                                                :formKey="`${item_h.key}|${key}`"
                                                :valueData="item[item_h.key]"
                                                :typeInput="`text${item_h.hasOwnProperty('disabled') ? item_h.disabled == true ? '|disabled' : '' : ''}`"
                                                :ref="`${item_h.key}${key}`"
                                                :id="`${item_h.key}${key}`"
                                                @updateValue="updateValue" />
                                            </template>
                                        </vs-td>
                                    </template>
                                    
                                    <vs-td>
                                        <vs-button
                                            shadow
                                            :active="false"
                                            @click="openSurchargeDialog(key)"
                                        >
                                            <i class='bx bx-plus' style="margin-right:5px"></i> SURCHARGE
                                        </vs-button>
                                    </vs-td>
                                    
                                </vs-tr>
                            </template>
                        </template>
                    </vs-table>
                </div>
            </template>

            <template v-slot:footer>
                <vs-row justify="flex-end" class="mt-2">
                    <vs-col w="2" justify="flex-end">
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
                    <vs-col w="2" justify="flex-end">
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
        <dialog-surcharge
                :active="surchargeSelector" 
                :closeDialog="closeDialogSurcharge"
                :index="indexSurcharge"
                @updateValue="updateValue"
                />
    </div>
</template>
<script>
import TransactionMixin from "@/mixins/transaction.js"
import DialogMaster from "@/components/dialog/dialogMaster"
import InputGeneral from "@/components/input/general"
import dialogSurcharge from "@/views/transaction/package/dialogSurcharge"
export default {
    name: "multiple-koli",
    mixins: [TransactionMixin],
    components: {
        "dialog-master": DialogMaster,
        "input-general": InputGeneral,
        "dialog-surcharge": dialogSurcharge,
    },
    props: {
        closeDialog: Function,
        active: Boolean,
        surchargeByID: Object
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenConnoteKoliItem () {
            return this.$store.getters.getTransaction.connote_koli_item
        },
        listenJumlahPackage () {
            return this.$store.getters.getTransaction.package.package_jumlah.value
        },
        listenPackageSurcharge () {
            return this.$store.getters.getTransaction.package.package_surcharge.value
        },
        listenPackageService () {
            return this.$store.getters.getTransaction.package.package_service.valueData || {}
        },

        // new code
        listenConnoteIndexActive () {
            return this.$store.getters.getTransaction.connote_index_active
        },
    },
    data() {
        return {
            indexSurcharge: 0,
            surchargeSelector: false,
            tableHeader: [
                {
                    label: 'Weight',
                    key: 'actual_weight',
                    rule: 'decimal|min_value:0',
                    width: "xxs"
                },
                {
                    label: 'Length',
                    key: 'length',
                    rule: 'decimal|min_value:0',
                    width: "xxs"
                },
                {
                    label: 'Width',
                    key: 'width',
                    rule: 'decimal|min_value:0',
                     width: "xxs"
                },
                {
                    label: 'Height',
                    key: 'height',
                    rule: 'decimal|min_value:0',
                     width: "xxs"
                },
                {
                    label: 'Volume Weight',
                    key: 'volume_weight',
                    rule: 'decimal|min_value:0',
                    width: "xxs",
                    disabled: true
                },
                {
                    label: 'Surcharge (s)',
                    key: 'surcharge_id',
                    rule: '',
                    width: "sm"
                },
                {
                    label: 'Description',
                    key: 'description',
                    rule: '',
                    width: "md"
                },
            ],
            connote_koli_item:{},
            surchargeshow: {},
            viewKoli: {},
            chargeable_weight: 0,
            actual_weight: 0,
            volume_weight: 0,
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
                        // let str = `el[0].context.$refs.surchargeType${this.Keys[0].replace(/\s+/g, '')}`
                        // let elInput = eval(str)[0]
                        // let Checkbox = elInput.$el.querySelector('input')

                        //actual_weight|0
                        let inputF = el[0].context.$refs.tableColom.$scopedSlots.tbody()[0].context.$refs.actual_weight0[0]
                        let inputEl = inputF.$el.querySelector('input')
                        console.log('DIALOG SURCHARGE el', inputF)
                        // setTimeout(function(){ el[0].context.$refs.labelInput.$refs.generalInput.focus() }, 3000);
                        

                        
                        // let Checkbox = el[0].context.$refs.labelInput.$refs.generalInput.$el.querySelector('input')
                        // inputEl.focus();
                        setTimeout(function(){ inputEl.focus(); }, 100);
                        
                        
                    });
                }
            }
        }
    },
    methods: {
        initialize() {
            // this.listenConnoteKoliItem issue jika pake ini, jdi perlu dibikin stringify
            // data is nested, you need to make a deep copy. One option to do this is JSON.parse(JSON.stringify(...))
            // https://github.com/vuejs/vue/issues/1849#issuecomment-158744006
            // let arr = JSON.parse(this.listenTempConnoteKoliItem)
            let data = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item
            let arr = JSON.parse(JSON.stringify(data))

            // fix karena key yg didapet dari respond create connote gak konsisten dengan key saat create data
            arr.map((item, i) => {
                if(item.hasOwnProperty('koli_actual_weight')) {
                   arr[i]['actual_weight'] = item['koli_actual_weight']
                }
                if(item.hasOwnProperty('koli_height')) {
                    arr[i]['height'] = item['koli_height']
                }
                if(item.hasOwnProperty('koli_length')) {
                    arr[i]['length'] = item['koli_length']
                }
                if(item.hasOwnProperty('koli_width')) {
                    arr[i]['width'] = item['koli_width']
                }
                if(item.hasOwnProperty('koli_volume_weight')) {
                    arr[i]['volume_weight'] = item['koli_volume_weight']
                }
            })

            this.connote_koli_item = arr
        },
        cancel() {
            this.closeDialog()
        },
        handleSubmit() {
            
            // this.$store.dispatch("SET_CALCULATOR_ACTUAL_WEIGHT", this.actual_weight)
            // this.$store.dispatch("SET_CALCULATOR_VOLUME_WEIGHT", this.volume_weight)
            // this.$store.dispatch("SET_CALCULATOR_CHARGEABLE_WEIGHT", this.chargeable_weight)
            this.closeDialog()
        },
        openSurchargeDialog(index){
            this.indexSurcharge = index
            this.surchargeSelector = true
        },
        closeDialogSurcharge() {
            this.surchargeSelector = false
        },
        updateValue(key, value, value2 = null, value3 = null) {
            let str = key.split("|")
            let index = str[1]
            // this.$emit("prosesmultipleKoli", str[0],index, value)
            switch(true) {
                case key.includes("description"):
                    this.prosesKoli("description", value, index)
                    break;
                case key.includes("actual_weight"):
                    this.prosesKoli("actual_weight", value, index)
                    break;
                case key.includes("length"):
                    this.prosesKoli("length", value, index)
                    break;
                case key.includes("width"):
                    this.prosesKoli("width", value, index)
                    break;
                case key.includes("height"):
                    this.prosesKoli("height", value, index)
                    break;
                case key.includes("handle_surcharge"):
                    

                    if(this.connote_koli_item[value].hasOwnProperty('surcharge_id')) {
                        this.connote_koli_item[value].surcharge_id = value2
                    }

                    if(this.connote_koli_item[value].hasOwnProperty('hasPackingKayu_id')) {
                        this.connote_koli_item[value].hasPackingKayu_id = value3
                    }


                    this.$emit("prosesmultipleKoli", this.connote_koli_item)
                    // this.$store.dispatch("SET_CONNOTE_KOLI_ITEM", this.connote_koli_item)
                    // this.surchargeView()
                    // this.calculation()
                    break;
                default:
                    console.log('meong')
                    // code block
            }
        },
        prosesKoli(key, value, index) {
            let service = this.listenPackageService.data || {}

            if(this.connote_koli_item[index].hasOwnProperty(key)) {
               this.connote_koli_item[index][key] = value
            }
            
            let volume_weight = 0
            
            if(Object.keys(service).length > 0) {
                let service_volume_divider = Number(service['service_volume_divider'])
                volume_weight = (this.connote_koli_item[index]['length'] * this.connote_koli_item[index]['width'] * this.connote_koli_item[index]['height']) / service_volume_divider 
            }
            this.connote_koli_item[index]['volume_weight'] = volume_weight.toFixed(2)
            
            this.$emit("prosesmultipleKoli", this.connote_koli_item)

            // this.$store.dispatch("SET_CONNOTE_KOLI_ITEM", this.connote_koli_item)
            this.calcMultipleKoli()
        },
        removeSurcharge(id, index, name) {
            this.connote_koli_item[index].surcharge_id = this.connote_koli_item[index].surcharge_id.filter(item => item != id)

            if(name.toLowerCase().includes('packing kayu')) {
                if(this.connote_koli_item[index].hasOwnProperty('hasPackingKayu_id')) {
                    this.connote_koli_item[index].hasPackingKayu_id = ''
                }
            }

            this.$emit("prosesmultipleKoli", this.connote_koli_item)
            // this.$store.dispatch("SET_CONNOTE_KOLI_ITEM", this.connote_koli_item)
            // this.surchargeView()
            // this.calculation()
        },
        surchargeView(){
            let koli = this.listenConnoteKoliItem
            let surchargeByID = this.surchargeByID
            let view = {}
            if(koli.length > 1) {
                koli.map(item => {
                    let obj = {}
                    if (item.surcharge_id.length > 0) {
                        item.surcharge_id.map(itm => {
                            if(surchargeByID.hasOwnProperty(itm)) {
                                let data = surchargeByID[itm]
                                data['jumlah'] += 1
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
            
        },
        calcMultipleKoli(){
            // let roundUp = this.round03(volume_weight.toFixed(2))
            // let chargeable_weight = Math.max(this.connote_koli_item[index]['actual_weight'], roundUp).toFixed(2)
            let chargeable_weight = 0
            let actual_weight = 0
            let volume_weight = 0
            if(this.connote_koli_item.length > 0) {
                this.connote_koli_item.map(item => {
                    let volume_weight_temp = 0
                    if(item['volume_weight']) {
                        volume_weight_temp = volume_weight_temp + Number(item['volume_weight'])
                    }
                    if(item['actual_weight']) {
                        actual_weight = actual_weight + Number(item['actual_weight'])
                    }
                    volume_weight = volume_weight + volume_weight_temp
                })
            }
            // volume_weight = volume_weight.toFixed(2)
            
            let roundUp = this.round03(volume_weight)
                chargeable_weight = Number(Math.max(actual_weight, roundUp)).toFixed(2)

            this.chargeable_weight = chargeable_weight
            this.actual_weight = actual_weight
            this.volume_weight = volume_weight
        }
    },
}
</script>
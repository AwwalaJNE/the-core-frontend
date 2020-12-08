<template>
    <div>
        <dialog-master 
        :actived="listenActive" 
        width="lg"
        :closeDialog="cancel">

            <template v-slot:header>
                Multiple Koli
            </template>

            <template v-slot:content>
                <div>
                    <vs-table>
                        <template #thead>
                        <vs-tr>
                            <vs-th>
                                No.
                            </vs-th>
                            <template v-for="(item, key) in tableHeader">
                                <vs-th :key="key">
                                    {{item.label}}
                                </vs-th>
                            </template>
                            
                            <vs-th>
                                Action
                            </vs-th>
                        </vs-tr>
                        </template>
                        <template #tbody>
                            <td>
                                <div v-for="(apartment, index) in apartments" :key="index">
                                <div class="row">
                                    <div class="form-group col-xs-5">
                                        <label>actual_weight</label>
                                        <input v-model="apartment.actual_weight" type="number"
                                            name="apartments[][actual_weight]" class="form-control" placeholder="Price">
                                    </div>
                                </div>
                            </div>
                            <pre>{{ $data.apartments }}</pre>
                            </td>
                        </template>
                    </vs-table>
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
        arrData: String
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenConnoteKoli() {
            return this.connote_koli_item
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
    },
    data() {
        return {
            koliData: this.$store.getters['getTransaction']['template_koli'],
            indexSurcharge: 0,
            surchargeSelector: false,
            tableHeader: [
                {
                    label: 'Weight',
                    key: 'actual_weight'
                },
                {
                    label: 'Length',
                    key: 'length'
                },
                {
                    label: 'Width',
                    key: 'width'
                },
                {
                    label: 'Height',
                    key: 'height'
                },
                {
                    label: 'Volume Weight',
                    key: 'volume_weight'
                },
                {
                    label: 'Surcharge (s)',
                    key: 'surcharge_id'
                },
                {
                    label: 'Description',
                    key: 'description'
                },
            ],
            connote_koli_item:{},
            surchargeByID: {},
            surchargeshow: {},
            viewKoli: {},
            valueKoli: [],
            apartment: {
      price: '',
      rooms: ''
    },
    apartments: [],
        }
    },
    watch: {
        active: function(val) {
            if(val != undefined) {
                if(val == true) {
                    console.log('awww aktif')
                    this.initialize()
                }
            }
        }
    },
    methods: {
        async initialize() {
            let jumlah = this.listenJumlahPackage
            let connote_koli_item = {}
            let arr = JSON.parse(this.arrData)
            this.apartments = arr
            



            // let absValue = Math.abs(jumlah - connote_koli_item.length)
            // console.log('multiple ', jumlah,absValue, connote_koli_item.length, connote_koli_item, this.listenConnoteKoliItem)
            
            
            // if(connote_koli_item.length > jumlah) {
            //     connote_koli_item.splice((connote_koli_item.length) - absValue,absValue)
            // } else if(jumlah > connote_koli_item.length) {
            //     let templateKoli = {
            //         koli_id: '',
            //         height: 0,
            //         length: 0,
            //         width: 0,
            //         volume_weight: 0,
            //         actual_weight: 1,
            //         surcharge_id: [],
            //         description: ''
            //     }
            //     for(let i=0; i < absValue; i++) {
            //         connote_koli_item.push(templateKoli)
            //     }
            // }

            this.connote_koli_item = connote_koli_item
            this.viewKoli = connote_koli_item
            // this.$store.dispatch("SET_CONNOTE_KOLI_ITEM", connote_koli_item)
            // console.log('multiple 2', this.connote_koli_item, absValue, this.connote_koli_item.length, this.connote_koli_item)
            
        },
        cancel() {
            this.connote_koli_item = []
            this.closeDialog()
        },
        handleSubmit() {
            
            this.closeDialog()
        },
        openSurchargeDialog(index){
            this.indexSurcharge = index
            this.surchargeSelector = true
        },
        closeDialogSurcharge() {
            this.surchargeSelector = false
        },
        updateValue(key, value, value2 = null) {
            let str = key.split("|")
            let index = str[1]
            this.connote_koli_item[index]["actual_weight"] = value
            console.log(key, value, value2,index)
            console.log('this.connote_koli_item', this.connote_koli_item)
            // this.$emit("prosesmultipleKoli", str[0],index, value)
            // switch(true) {
            //     case key.includes("actual_weight"):
            //         this.prosesKoli("actual_weight", value, index)
            //         break;
            //     case key.includes("length"):
            //         this.prosesKoli("length", value, index)
            //         break;
            //     case key.includes("width"):
            //         this.prosesKoli("width", value, index)
            //         break;
            //     case key.includes("height"):
            //         this.prosesKoli("height", value, index)
            //         break;
            //     case key.includes("handle_surcharge"):
            //         console.log(key, value, value2 )
            //         let surcharge = value2
            //         let ids = []
            //         if(surcharge.length > 0){
            //             surcharge.map(item => ids.push(item.surcharge_id))
            //         }
            //         this.connote_koli_item[index].surcharge_id = ids

            //         this.$store.dispatch("SET_CONNOTE_KOLI_ITEM", this.connote_koli_item)
            //         // this.surchargeView()
            //         this.calculation()
            //         break;
            //     default:
            //         console.log('meong')
            //         // code block
            // }
        },
        prosesKoli(key, value, index) {
            console.log('LLLLLL' ,key,index, this.connote_koli_item)
            let service = this.listenPackageService.data || {}

            if(this.connote_koli_item[index].hasOwnProperty(key)) {
               this.connote_koli_item[index][key] = value
               console.log('===> dipanggil ke', index, this.connote_koli_item[index])
            }
            
            // if(key.includes('length')) {
            //    this.connote_koli_item[index]['length'] = value
            // }

            // if(key.includes('width')) {
            //    this.connote_koli_item[index]['width'] = value
            // }

            // if(key.includes('height')) {
            //    this.connote_koli_item[index]['height'] = value
            // }
            
            let volume_weight = 0
            
            if(Object.keys(service).length > 0) {
                let service_volume_divider = service['service_volume_divider'].toString()
                volume_weight = (this.connote_koli_item[index]['length'] * this.connote_koli_item[index]['width'] * this.connote_koli_item[index]['height']) / service_volume_divider 
                volume_weight = volume_weight / 1000
            }
            this.connote_koli_item[index]['volume_weight'] = volume_weight.toFixed(2)
            
            console.log('this.connote_koli_item multiple', this.connote_koli_item)

            // let arr = []
            // for(let i=0; i < Object.keys(this.connote_koli_item); i++) {
            //     arr.push(this.connote_koli_item[i])
            // }

            // this.$store.dispatch("SET_CONNOTE_KOLI_ITEM", arr)
            this.calcMultipleKoli()
        },
        calcMultipleKoli(){
            // let roundUp = this.round03(volume_weight.toFixed(2))
            // let chargeable_weight = Math.max(this.connote_koli_item[index]['actual_weight'], roundUp).toFixed(2)
            let chargeable_weight = 0
            let actual_weight = 0
            let volume_weight = 0
            if(Object.keys(this.connote_koli_item).length > 0) {
                Object.keys(this.connote_koli_item).map(key => {
                    let tempchargeable_weight = 0
                    if(this.connote_koli_item[key]['volume_weight']) {
                        volume_weight = volume_weight + Number(this.connote_koli_item[key]['volume_weight'])
                        let val= Number(this.connote_koli_item[key]['volume_weight']).toFixed(2)
                        let roundUp = this.round03(val)
                        tempchargeable_weight = tempchargeable_weight + Number(Math.max(Number(this.connote_koli_item[key]['actual_weight']), roundUp).toFixed(2))
                    }
                    if(this.connote_koli_item[key]['actual_weight']) {
                        actual_weight = actual_weight + Number(this.connote_koli_item[key]['actual_weight'])
                        console.log('actual_weight',actual_weight)
                    }
                    chargeable_weight = chargeable_weight + tempchargeable_weight
                })
            }
            
            this.$store.dispatch("SET_CALCULATOR_ACTUAL_WEIGHT", actual_weight)
            this.$store.dispatch("SET_CALCULATOR_VOLUME_WEIGHT", volume_weight)
            this.$store.dispatch("SET_CALCULATOR_CHARGEABLE_WEIGHT", chargeable_weight) 
        }
    },
}
</script>
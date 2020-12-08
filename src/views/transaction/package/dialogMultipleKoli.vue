<template>
    <div>
        <dialog-master 
        :actived="listenActive" 
        width="xl"
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
                                                        <template>
                                                            <span class="vs-select__chips__chip__close" @click="removeSurcharge(itm, key)">
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
                                                :rules="''" 
                                                :formKey="`${item_h.key}|${key}`"
                                                :valueData="item[item_h.key]"
                                                typeInput="text"
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
        arrData: String,
        surchargeByID: Object
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenConnoteKoliItem () {
            return this.$store.getters.getTransaction.connote_koli_item
        },
        listenTempConnoteKoliItem () {
            return this.$store.getters.getTransaction.temp_koli_item
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
                    key: 'actual_weight',
                    width: "xxs"
                },
                {
                    label: 'Length',
                    key: 'length',
                     width: "xxs"
                },
                {
                    label: 'Width',
                    key: 'width',
                     width: "xxs"
                },
                {
                    label: 'Height',
                    key: 'height',
                     width: "xxs"
                },
                {
                    label: 'Volume Weight',
                    key: 'volume_weight',
                     width: "xxs"
                },
                {
                    label: 'Surcharge (s)',
                    key: 'surcharge_id',
                    width: "sm"
                },
                {
                    label: 'Description',
                    key: 'description',
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
                    console.log('awww aktif')
                    this.initialize()
                }
            }
        }
    },
    methods: {
        initialize() {
            // this.listenConnoteKoliItem
            let arr = JSON.parse(this.listenTempConnoteKoliItem)
            this.connote_koli_item = arr
            console.log('surcharge', this.surchargeByID)
        },
        cancel() {
            this.closeDialog()
        },
        handleSubmit() {
            this.$emit("prosesmultipleKoli", this.connote_koli_item)
            this.$store.dispatch("SET_CALCULATOR_ACTUAL_WEIGHT", this.actual_weight)
            this.$store.dispatch("SET_CALCULATOR_VOLUME_WEIGHT", this.volume_weight)
            this.$store.dispatch("SET_CALCULATOR_CHARGEABLE_WEIGHT", this.chargeable_weight)
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
            console.log(key, value, value2,index)
            console.log('this.connote_koli_item', this.connote_koli_item)
            // this.$emit("prosesmultipleKoli", str[0],index, value)
            switch(true) {
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
                    
                    let surcharge = value2
                    console.log('meong', surcharge,key, value, this.connote_koli_item[value] )
                    let ids = []
                    if(surcharge.length > 0){
                        surcharge.map(item => ids.push(item.surcharge_id))
                    }

                    if(this.connote_koli_item[value].hasOwnProperty('surcharge_id')) {
                        this.connote_koli_item[value].surcharge_id = ids
                    }
                    console.log("handle_surcharge",key, value, value2, this.connote_koli_item )

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

            // this.$store.dispatch("SET_CONNOTE_KOLI_ITEM", this.connote_koli_item)
            this.calcMultipleKoli()
        },
        removeSurcharge(id, index) {
            this.connote_koli_item[index].surcharge_id = this.connote_koli_item[index].surcharge_id.filter(item => item != id)
            console.log('remove multiple surcharge', this.connote_koli_item, id, index)
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
            
            let roundUp = this.round03(volume_weight)
                chargeable_weight = Number(Math.max(actual_weight, roundUp)).toFixed(2)

            this.chargeable_weight = chargeable_weight
            this.actual_weight = actual_weight
            this.volume_weight = volume_weight
        }
    },
}
</script>
<style lang="scss">
    .vs-table{
        table{
            text-align: left;
            .md{
                width: calc(100% / 3) !important;
            }
            .sm{
                width: calc(100% / 4) !important;
            }
            .xs{
                width: calc(100% / 10) !important;
            }
            .xxs{
                width: calc(100% / 12) !important;
            }
            .auto{
                width: auto;
            }
            
        }
    }
</style>
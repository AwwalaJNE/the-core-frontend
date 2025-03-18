<template>
    <div v-if="listenActive">
        <div ref="bpikBox" class="box" style="padding: 1.5em 0.5em .5em !important;">
            <template>
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
                                    
                            <vs-th class="md_5">
                                <p style="position: relative;margin:0;width:100%;text-align:center;">Action</p>
                            </vs-th>
                        </vs-tr>
                    </template>
                    <template #tbody>
                        <!-- v-if="listBpik.length > 0" -->
                        <template v-if="listenBpik.length > 0">
                            
                            <vs-tr
                                v-for="(item,key) in listenBpik"
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
                                        <template v-if="item_h.key == 'item_condition'">
                                            <selector 
                                            :ref="item_h.key"
                                            :name="''" 
                                            :rules="item_h.rule" 
                                            :formKey="`${item_h.key}|${key}`"
                                            :valueData="item_condition_Arr"
                                            :selectedValue="item[item_h.key]"
                                            :isMultiple="false"
                                            @updateValue="updateValue" />
                                        </template>
                                        <template v-else>
                                            <input-general 
                                            :ref="`bpikinput${key}${i}`"
                                            :id="`bpikinput${key}${i}`"
                                            :name="item_h.placeholder" 
                                            :rules="''" 
                                            :formKey="`${item_h.key}|${key}`"
                                            :valueData="item[item_h.key]"
                                            typeInput="text"
                                            :placeholderGabung="true"
                                            @updateValue="updateValue" />
                                        </template>
                                    </vs-td>
                                </template>

                                <vs-td class="md_5">
                                    <vs-row justify="space-between">
                                        <vs-col w="6" justify="flex-end">
                                            <vs-button
                                                shadow
                                                :active="false"
                                                @click="addNew"
                                            >
                                                <i class='bx bx-plus' style="margin-right:5px"></i> Add
                                            </vs-button>
                                        </vs-col>
                                        <vs-col w="6" justify="flex-end" v-if="listenBpik.length > 1 && key !== 0">
                                            <vs-button
                                                shadow
                                                :active="false"
                                                @click="remove(key)"
                                            >
                                                <i class='bx bx-minus' style="margin-right:5px"></i> Del
                                            </vs-button>
                                        </vs-col>
                                    </vs-row>
                                </vs-td>

                            </vs-tr>
                        </template>
                    </template>
                </vs-table>

                <div>
                    <vs-row justify="flex-end">
                        <!-- <vs-col w="1" justify="flex-end">
                            <vs-button
                            transparent
                            block
                            flat
                            :active="true"
                            @click="closeDialog"
                            >
                                Close
                            </vs-button>
                        </vs-col> -->
                        <!-- <vs-col w="1" justify="flex-end">
                            <router-link :to="{ name: 'printBpik'}" target="_blank">
                                <vs-button
                                transparent
                                block
                                flat
                                :active="true"
                                @click="printBPIK"
                                type="submit"
                                >
                                    Print
                                </vs-button>
                            </router-link>
                        </vs-col> -->
                    </vs-row>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import TransactionMixin from "@/mixins/transaction.js"
import InputGeneral from "@/components/input/general"
import Selector from "@/components/input/select"
export default {
    name: "bpik-form",
    mixins: [TransactionMixin],
    components: {
        "input-general": InputGeneral,
        "selector": Selector,
    },
    props: {
        closeDialog: Function,
        active: Boolean,
        arrData: Array
    },
    data() {
        return {
            tableHeader: [
                {
                    label: 'Nama Kiriman',
                    key: 'item_name',
                    placeholder: 'Nama Kiriman',
                    width: "sm_75",
                    rule: ''
                },
                {
                    label: 'Jenis Kiriman',
                    key: 'item_type',
                    placeholder: 'Jenis Kiriman',
                    width: "sm_75",
                    rule: ''
                },
                {
                    label: 'Nomer Seri/IMEI(*/**)',
                    key: 'item_serial_number',
                    placeholder: 'Nomer Seri',
                    width: "sm_75",
                    rule: ''
                },
                {
                    label: 'Jumlah',
                    key: 'item_total',
                    placeholder: 'Jumlah',
                    width: "xs",
                    rule: 'numeric'
                },
                {
                    label: 'Warna',
                    key: 'item_color',
                    placeholder: 'Warna',
                    width: "xs",
                    rule: ''
                },
                {
                    label: 'Kondisi(***)',
                    key: 'item_condition',
                    placeholder: 'Kondisi',
                    width: "xs",
                    rule: ''
                },
                {
                    label: 'Kelengkapan',
                    key: 'item_completeness',
                    placeholder: 'Kelengkapan',
                    width: "sm_75",
                    rule: ''
                },
            ],
            bpik: {
                item_name:'',
                item_type:'',
                item_serial_number:'',
                item_total:'',
                item_color:'',
                item_condition:'-',
                item_completeness:''
            },
            item_condition_Arr: [
                {
                    label: '-',
                    value: '-'
                },
                {
                    label: 'Baru',
                    value: 'baru'
                },
                {
                    label: 'Second/Bekas',
                    value: 'second/bekas'
                },
                {
                    label: 'Service/Rusak',
                    value: 'service/rusak'
                }
            ],
            listBpik: []
        }
    },
    computed: {
        listenActive(){
            return this.active || false
        },
        listenArrData() {
            return this.arrData
        },
        listenConnoteBPIK () {
            return this.$store.getters.getTransaction.proses_connote.connote_bpik
        },
        listenBpik() {
            return this.listBpik
        },
        listenConnoteIndexActive () {
            return this.$store.getters.getTransaction.connote_index_active
        },
    },
    watch: {
        active: function(val) {
            if(val != undefined) {
                if(val == true) {

                    this.initialize()
                    this.$nextTick(() => {
                        this.$refs.bpikBox.scrollIntoView({ behavior: 'smooth' })

                        let bpikINput = this.$refs.bpikinput00[0]
                        
                        setTimeout(function(){ bpikINput.$el.querySelector('input').focus() }, 100);
                    })
                } else {
                    this.emptyBpik()
                }
            }
        }
    },
    methods: {
        initialize() {
            let arr =  JSON.parse(JSON.stringify(this.listenConnoteBPIK))
            if(arr.length > 0) {

            } else {
                arr = [
                    {
                        item_name:'',
                        item_type:'',
                        item_serial_number:'',
                        item_total:'',
                        item_color:'',
                        item_condition:'-',
                        item_completeness:''
                    },
                ]
            }
            this.listBpik = arr
        },
        updateValue(key, value, value2){
            let str = key.split("|")
            let index = str[1]

            switch(true) {
                case key.includes("item_name"):
                    this.prosesBpik('item_name', value, index)
                    break;
                case key.includes("item_type"):
                    this.prosesBpik('item_type', value, index)
                    break;
                case key.includes("item_serial_number"):
                    this.prosesBpik('item_serial_number', value, index)
                    break;
                case key.includes("item_total"):
                    this.prosesBpik('item_total', value, index)
                    break;
                case key.includes("item_color"):
                    this.prosesBpik('item_color', value, index)
                    break;
                case key.includes("item_condition"):
                    this.prosesBpik('item_condition', value, index)
                    break;
                case key.includes("item_completeness"):
                    this.prosesBpik('item_completeness', value, index)
                    break;
                default:
            }
            // this.$store.dispatch("SET_CONNOTE_BPIK", value)
        },
        prosesBpik(key, value, index) {
            if(this.listBpik[index].hasOwnProperty(key)) {
               this.listBpik[index][key] = value
            }

            this.$store.dispatch("SET_CONNOTE_BPIK", this.listBpik)
            // this.$store.dispatch("SET_CONNOTE_KOLI_ITEM", this.connote_koli_item)
        },
        addNew() {
            // this.listBpik.push(this.bpik)
            this.listBpik.push(this.$VueExtend({}, this.bpik))
            this.$store.dispatch("SET_CONNOTE_BPIK", this.listBpik)

            let self = this
            let strEval = `self.$refs.bpikinput${this.listBpik.length - 1}0[0]`

            this.$nextTick(() => {
                let bpikINput = eval(strEval)
                        
                setTimeout(function(){ bpikINput.$el.querySelector('input').focus() }, 100);
            })
            
        },
        remove(i) {

            // this.listBpik.splice(i, 1);
            this.$VueDelete(this.listBpik, i);
            this.$store.dispatch("SET_CONNOTE_BPIK", this.listBpik)
        },
        emptyBpik() {
            this.listBpik = []
            this.$store.dispatch("SET_CONNOTE_BPIK", this.listBpik)
        },
        printBPIK() {
            this.$ls.set('printBPIK', {})
            let data = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive]
            let obj = {}
            obj['connote_number'] = data.connote_number || '-'
            obj['connote_bpik'] = data.connote_bpik
            obj['koli'] = data.connote_koli_item
            obj['pengirim'] = data.connote_shipper_name
            obj['penerima'] = data.connote_receiver_name
            obj['insured_goods_value'] = data.insured_goods_value
            obj['origin'] = this.$store.getters.getUser['node_id'].node_code
            obj['destination'] = data.connote_receiver_tariff_code
            obj['asuransi'] = data.is_insured
            obj['packing_kayu'] = data.is_packing_kayu // nnti di update
            this.$ls.set('printBPIK', obj)
        },
    },
}
</script>
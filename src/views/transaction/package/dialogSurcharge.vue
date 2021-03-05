<template>
    <dialog-master 
    :actived="listenActive" 
    width="lg"
    :closeDialog="cancel">

        <template v-slot:header>
            Surcharge
        </template>

        <template v-slot:content>
            <div>
                <!-- <el-collapse v-model="activeNames">

                        <template v-if="Keys.length > 0">
                            <el-collapse-item 
                            v-for="(item,key) in Keys"
                            :title="item" :name="item"
                            :key="key">
                                <template>
                                    <template v-if="objData[item].length > 0">
                                        <template v-for="(sur,i) in objData[item]">
                                            <template v-if="sur.service_relevant == true">
                                                <vs-checkbox 
                                                :val="sur" 
                                                v-model="selectedData"
                                                :key="i">
                                                    {{sur.surcharge_name}}
                                                </vs-checkbox>
                                            </template>
                                            
                                        </template>
                                    </template>
                                </template>
                            </el-collapse-item>
                        </template>
                    </el-collapse> -->
                    <template v-if="Keys.length > 0">
                        <template v-for="(item,key) in Keys">
                            <vs-row :key="key">
                                <vs-col xs="12" sm="12" lg="12">
                                    <checkbox
                                        :formKey="`surcharge_type|${item}`"
                                        :isChecked="options.includes(item)"
                                        :name="item"
                                        @updateValue="updateValue" /> 
                                    <template v-if="options.includes(item) && selectedRadio.hasOwnProperty(item)">
                                        <vs-row>
                                            <vs-col xs="1" sm="1" lg="1">
                                            </vs-col>
                                            <vs-col xs="11" sm="11" lg="11">
                                                <template v-if="objData[item].length > 0">
                                                    <radio 
                                                    :ref="item"
                                                    :name="''" 
                                                    :rules="''" 
                                                    :vertical="true"
                                                    width="6"
                                                    :formKey="`radio_surcharge|${item}`"
                                                    :valueData="objData[item]"
                                                    :selectedValue="selectedRadio[item]"
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
                                        </vs-row>
                                    </template>
                                    
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
</template>
<script>
import DialogMaster from "@/components/dialog/dialogMaster"
import TransactionMixin from "@/mixins/transaction.js"
import Checkbox from "@/components/input/checkbox"
import Radio from "@/components/input/radio"
export default {
    name: "dialog-surcharge",
    mixins: [TransactionMixin],
    components: {
        "dialog-master": DialogMaster,
        "checkbox": Checkbox,
        "radio": Radio,
    },
    props: {
        closeDialog: Function,
        active: Boolean,
        index: Number,
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
        
    },
    data() {
        return {
            activeNames: [],
            objData: {},
            Keys: [],
            selectedData: [],
            koli: {},

            options: [],
            selectedRadio: {
                test: null
            },
            tempRadio: ''
        }
    },
    watch: {
        active: function(val) {
            if(val != undefined) {
                if(val == true) {
                    this.initialize()
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
            this.koli = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item[this.listenCurrentIndexKoli] || {}
            this.selectedRadio = {}
            this.options = []
            let selectedR = {}
            let prev_surcharge_id = this.koli['surcharge_id'] || []
            console.log('this.koli', this.koli, surcharge)
            let obj = {}
            surcharge.map(item => {
                item['service_relevant'] = false

                if(prev_surcharge_id.includes(item.surcharge_id)) {
                    selectedR[item.surcharge_type_name] = item.surcharge_id
                }

                if(obj.hasOwnProperty(item.surcharge_type_name)) {
                    let filter = this.filterSurcharge(item, this.koli)
                    if(filter.service_relevant == true) {
                        filter['value'] = filter.surcharge_id
                        filter['label'] = filter.surcharge_name
                        obj[item.surcharge_type_name].push(filter)
                    }
                } else {
                    obj[item.surcharge_type_name] = []
                    let filter = this.filterSurcharge(item, this.koli)
                    if(filter.service_relevant == true) {
                        filter['value'] = filter.surcharge_id
                        filter['label'] = filter.surcharge_name
                        obj[item.surcharge_type_name].push(filter)
                    }
                }
            })

            console.log('selectedR ========', selectedR)

            let keys = Object.keys(obj)
            keys = keys.filter(item => !item.toLowerCase().includes('overweight'))

            if (keys.length > 0) {
                this.objData = obj
                this.Keys = keys

                if(Object.keys(selectedR).length > 0) {
                    this.options = Object.keys(selectedR)
                    this.selectedRadio = selectedR
                    if(!this.options.includes(keys[0])) {
                        this.options.push(keys[0])
                        this.selectedRadio[keys[0]] = ""
                    }
                } else {
                    this.options.push(keys[0])
                    this.selectedRadio[keys[0]] = obj[keys[0]].filter(item => item.service_relevant)[0].surcharge_id
                }
                
                
            }

            // this.selectedData = this.listenPackageSurcharge

            let activeSurchargeType = []
            this.listenPackageSurcharge.length > 0 && this.listenPackageSurcharge.map(item => {
                activeSurchargeType.push(item.surcharge_type_name)
            })

            this.activeNames = activeSurchargeType

            console.log('this.Keys', this.Keys)
            console.log('this.objData', this.objData)
            console.log('this.selectedRadio', this.selectedRadio, obj['PACKING KAYU'])
            console.log('this.activeNames', this.activeNames)
            
        },
        radioChange(key, val){
            console.log('radio change', key, val)
        },
        updateValue(key, value){
            console.log('selected name', key, value)
            switch(true) {
                case key.includes('surcharge_type'):
                    // this.options
                    let split = key.split("|")[1]
                    if(value == true) {
                        if(this.options.includes(split) == false){
                            this.options.push(split)
                            this.selectedRadio[split] = ''
                        }
                    } else {
                        if(this.options.includes(split) == true){
                            let temp = this.options.filter(item => item !== split)
                            this.options = temp
                            if(this.selectedRadio.hasOwnProperty(split)) {
                                delete this.selectedRadio[split]
                            }
                        }
                    }
                    
                    console.log('this.options === ', this.options)
                    console.log('this.selectedRadio ===', this.selectedRadio)
                    break;
                case key.includes('radio_surcharge'):
                    // this.selectedRadio
                    let str = key.split("|")[1]
                    if(this.selectedRadio.hasOwnProperty(str)) {
                        this.selectedRadio[str] = value
                    }
                    console.log('this.selectedRadio ===', this.selectedRadio)
                    break;
                default:
            }
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
        handleSubmit() {
            let key = Object.keys(this.selectedRadio)
            if(key.length > 0 ) {
                let arr = []
                key.map(item => {
                    if(this.selectedRadio[item] !== '') {
                        arr.push(this.selectedRadio[item])
                    }
                })
                console.log('arr radio', arr)
                if(arr.length > 0) {
                    this.$emit("updateValue", "handle_surcharge",this.index, arr)
                    this.selectedRadio = {}
                }
            }
            console.log('this.selectedRadio', this.selectedRadio, key)
            
            this.closeDialog()
        }
    },
    mounted() {
        
    },
}
</script>
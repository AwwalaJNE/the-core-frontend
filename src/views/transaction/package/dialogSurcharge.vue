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
                <el-collapse v-model="activeNames">
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
                                        <!-- <template v-else>
                                            <vs-checkbox 
                                            :val="sur" 
                                            v-model="selectedData"
                                            disabled
                                            :key="i">
                                                {{sur.surcharge_name}}
                                            </vs-checkbox>
                                        </template> -->
                                    </template>
                                </template>
                                
                                
                            </template>
                            

                        </el-collapse-item>
                    </template>
                </el-collapse>
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
export default {
    name: "dialog-surcharge",
    components: {
        "dialog-master": DialogMaster,
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
            koli: {}
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
        listenPackageService: function (n,o) {
            if(n !== o) {
                this.initialize()
            }
        }
    },
    methods: {
        initialize() {
            // this.$store.dispatch(`SET_PACKAGE_PACKAGE_SURCHARGE`, [])
            let surcharge = this.listenSurchargeList
            this.koli = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_koli_item[this.listenCurrentIndexKoli] || {}
            // console.log('this.koli', this.koli)
            let obj = {}
            surcharge.map(item => {
                item['service_relevant'] = false
                if(obj.hasOwnProperty(item.surcharge_type_name)) {
                    let filter = this.filterSurcharge(item)
                    obj[item.surcharge_type_name].push(filter)
                } else {
                    obj[item.surcharge_type_name] = []
                    let filter = this.filterSurcharge(item)
                    obj[item.surcharge_type_name].push(filter)
                }
            })

            let keys = Object.keys(obj)

            if (keys.length > 0) {
                this.objData = obj
                this.Keys = keys
            }

            this.selectedData = this.listenPackageSurcharge

            let activeSurchargeType = []
            this.listenPackageSurcharge.length > 0 && this.listenPackageSurcharge.map(item => {
                activeSurchargeType.push(item.surcharge_type_name)
            })

            this.activeNames = activeSurchargeType
            
        },
        filterSurcharge(obj) {
            let service = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive].connote_service_code || ''
            let status = false
            
            try {
                if (Object.keys(service).length > 0) {
                    let surcharge_condition = obj['surcharge_condition'] || {}
                    
                    // console.log('--- Surcharge -> '+obj['surcharge_name']+'----------', surcharge_condition, this.koli, this.listenCurrentIndexKoli)
                            if(Object.keys(surcharge_condition).length > 0) {
                                
                                Object.keys(surcharge_condition).map(condition => {
                                    let objective1 = condition
                                    let operator = surcharge_condition[objective1] !== undefined ? Object.keys(surcharge_condition[objective1])[0] : '='
                                    let objective2 = surcharge_condition[objective1][operator] !== undefined ? surcharge_condition[objective1][operator] : ''

                                    if(objective1.toLowerCase() == 'service') {
                                        if(service.toLowerCase().includes(objective2)) {
                                            status = true
                                        } else {
                                            status = false
                                        }
                                    } else {

                                        if(Object.keys(this.koli).length > 0) {
                                            if(!objective1.toLowerCase().includes('actual_weight') && !objective1.toLowerCase().includes('length')) {
                                                let con1 = typeof objective1 !== 'number' ? objective1.toLowerCase().replace("koli_", "") : ''
                                                let con2 = typeof objective2 !== 'number' ? objective2.toLowerCase().replace("koli_", "") : ''

                                                let value1 = Number(this.koli[con1]) || ''
                                                let value2 = Number(this.koli[con2]) || ''
                                                
                                                if(value1 !== '' && value2 !== '') {
                                                    let str = `value1 ${operator} value2`
                                                    status = eval(str)
                                                    // console.log('proses condition', str,value1,operator,value2, status)
                                                }
                                            }
                                        }

                                        if(objective1.toLowerCase().includes('actual_weight')) {
                                            if(Object.keys(this.koli).length > 0) {
                                                let actual_weight = Number(this.koli['actual_weight'])

                                                let value1 = actual_weight
                                                let value2 = objective2

                                                // if(operator.includes('<')) {
                                                //     value1 = objective2
                                                //     value2 = actual_weight
                                                // }

                                                if(typeof objective2 == 'number') {
                                                    let str = `${value1} ${operator} ${value2}`
                                                    status = eval(str)
                                                    // console.log('has KOLI_ACTUAL_WEIGHT condition', str,value1, operator, value2, eval(str))
                                                }
                                            }
                                        }

                                        if(objective1.toLowerCase().includes('chargeble_weight')) {
                                            if(Object.keys(this.koli).length > 0) {
                                                let volume_weight = Number(this.koli['volume_weight'])
                                                let actual_weight = Number(this.koli['actual_weight'])
                                                let roundUp = this.round03(volume_weight)
                                                let chargeble_weight = 0
                                                chargeble_weight = Number(Math.max(actual_weight, roundUp).toFixed(2))
                                                

                                                let value1 = chargeble_weight
                                                let value2 = objective2

                                                if(operator.includes('<')) {
                                                    value1 = objective2
                                                    value2 = chargeble_weight
                                                }

                                                if(typeof objective2 == 'number') {
                                                    let str = `${value1} ${operator} ${value2}`
                                                    status = eval(str)
                                                    // console.log('has KOLI_CHARGEBLE_WEIGHT condition', str,value1, operator, value2, eval(str))
                                                }
                                            }
                                        }

                                        if(objective1.toLowerCase() == 'length') {
                                            if(Object.keys(this.koli).length > 0) {
                                                let max = Number(Math.max(Number(Math.max(this.koli['length'], this.koli['width'])), this.koli['height']))
                                                
                                                let value1 = Number(max)
                                                let value2 = Number(objective2)

                                                if(operator.includes('<')) {
                                                    value1 = Number(objective2)
                                                    value2 = Number(max)
                                                }

                                                let str = `${value1} ${operator} ${value2}`
                                                status = eval(str)
                                                // console.log('has length', str,value1, operator, value2, status)
                                            }
                                        }
                                    }

                                    

                                    // console.log('condition', objective1, Object.keys(surcharge_condition[objective1])[0], surcharge_condition[objective1][Object.keys(surcharge_condition[objective1])[0]])
                                    // console.log('> objective1 -> ', objective1)
                                    // console.log('> operator -> ', operator)
                                    // console.log('> objective2 -> ', objective2)
                                })
                            }
                    obj['service_relevant'] = status
                    // console.log('=================== obj', obj)
                }
            } catch (error) {
                console.log('error', error)
                return {}
            }

            return obj
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
        filterSurchargeold(obj) {
            let filtered = {}
            let service = this.listenPackageService || {}
             
            if (Object.keys(service).length > 0) {
                let surcharge_condition = obj['surcharge_condition'] || {}
                if(surcharge_condition.hasOwnProperty('DESTINATION')) {
                    if(Object.keys(service).length > 0) {
                        if(service['data']['tariff_destination'].includes(surcharge_condition['DESTINATION'])) {
                            obj['service_relevant'] = true
                        } else {
                            obj['service_relevant'] = false
                        }
                    }
                }
                if(surcharge_condition.hasOwnProperty('FROM_BRANCH')) {
                    if(Object.keys(service).length > 0) {
                        if(service['data']['tariff_origin'].includes(surcharge_condition['FROM_BRANCH'])) {
                            obj['service_relevant'] = true
                        } else {
                            obj['service_relevant'] = false
                        }
                    }
                }
                if(surcharge_condition.hasOwnProperty('SERVICE')) {
                    if(Object.keys(service).length > 0) {
                        if(service['data']['tariff_service_code'].includes(surcharge_condition['SERVICE'])) {
                            obj['service_relevant'] = true
                        } else {
                            obj['service_relevant'] = false
                        }
                    }
                }
            }
            
            return obj

        },
        cancel() {
            this.closeDialog()
            this.selectedData = []
        },
        handleSubmit() {
            // this.$store.dispatch(`SET_PACKAGE_PACKAGE_SURCHARGE`, [])
            // this.$store.dispatch(`SET_PACKAGE_PACKAGE_SURCHARGE`, this.selectedData)
            this.$emit("updateValue", "handle_surcharge",this.index, this.selectedData)
            this.selectedData = []
            this.closeDialog()
        }
    },
    mounted() {
        
    },
}
</script>
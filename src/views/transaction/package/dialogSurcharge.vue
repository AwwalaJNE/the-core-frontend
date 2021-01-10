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
import TransactionMixin from "@/mixins/transaction.js"
export default {
    name: "dialog-surcharge",
    mixins: [TransactionMixin],
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
                    let filter = this.filterSurcharge(item, this.koli)
                    obj[item.surcharge_type_name].push(filter)
                } else {
                    obj[item.surcharge_type_name] = []
                    let filter = this.filterSurcharge(item, this.koli)
                    obj[item.surcharge_type_name].push(filter)
                }
            })

            let keys = Object.keys(obj)

            if (keys.length > 0) {
                this.objData = obj
                this.Keys = keys
            }

            // this.selectedData = this.listenPackageSurcharge

            let activeSurchargeType = []
            this.listenPackageSurcharge.length > 0 && this.listenPackageSurcharge.map(item => {
                activeSurchargeType.push(item.surcharge_type_name)
            })

            this.activeNames = activeSurchargeType
            
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
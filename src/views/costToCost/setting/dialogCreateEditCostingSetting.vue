<template>
    <dialog-master 
    :actived="listenActive" 
    width="xs"
    :closeDialog="cancel">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller 
                    ref="formCostingSettingController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    typeForm="cost_to_cost_setting"
                />
            </div>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
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
                        {{btnBlue || 'Add'}}
                    </vs-button>
                </vs-col>
            </vs-row>
                
                
        </template>


    </dialog-master>


</template>

<script>
import axios from "axios";
import master from "@/mixins/master"
import FormInputController from "@/components/form/formInputController"
import DialogMaster from "@/components/dialog/dialogMaster"

export default {
    name:"dialog-create-edit-costing-setting",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
    },
    props: {
       closeDialog: Function,
       active: Boolean,
       title: String,
       dataItem: Object,
       btnRed: String,
       btnBlue: String
    },
    data() {
        return {
            form: {},
            cosToCostId: '',
            dialogGetCustomer:false,
            listcostGroup :[
                {
                    "label" : "INBOUND",
                    "value" : "INBOUND"
                },
                {
                    "label" : "OUTBOUND",
                    "value" : "OUTBOUND"
                }
            ],
        }
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenTitle(){
            return this.title
        },
        listenDataItem() {
            return this.dataItem
        }
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.cosToCostId = val.cost_to_cost_id
            }
        }
    },
    methods: {
        formData(form){
                          console.log(form,'asd');
            if(form != undefined){
                let cost_value =[]
                form.dynamicinputcomponent_cost_value.map((item, index) =>{
                  let obj_cost = {}
                    obj_cost[item.inputs[0].key] = item.inputs[0].value
                    obj_cost[item.inputs[1].key] = item.inputs[1].value
                    obj_cost[item.inputs[2].key] = item.inputs[2].value

                    cost_value.push(obj_cost)

                })
                let cost_rule =[]
                form.dynamicinputcomponent_rules.map((item, index) =>{
                  let obj_rule = {}
                    obj_rule[item.inputs[0].key] = item.inputs[0].value
                    obj_rule[item.inputs[1].key] = item.inputs[1].value
                    obj_rule[item.inputs[2].key] = item.inputs[2].value

                    cost_rule.push(obj_rule)

                })
              
              this.form = form
              this.form.rule = cost_rule
              this.form.cost_value = cost_value
            }

            if(this.cosToCostId !== undefined && this.cosToCostId !== ''){
                // this.updateData()
            }else{
                this.addData()
            } 
            //   this.addData()

        },
        handleSubmit(){
            this.$refs.formCostingSettingController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formCostingSettingController.handleClearForm()
            this.form = {}
            this.node_id = ""
        },

        openGetCustomer() {
          this.dialogGetCustomer = true
          console.log('open ')
        },
        closeGetCustomer() {
          this.dialogGetCustomer = false
        },
        updateValue(key,value) {

          
        },
        initForm(){
           this.$store.dispatch("SET_COST_TO_COST_SETTING_COST_GROUP_CODE_ArrData", this.listcostGroup.length > 0 ? this.listcostGroup : null)
        },
        async getDataNode(){
            await axios
                .get(this.URL.node +
                `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.node_name
                            obj["value"] = item.node_id

                            arr.push(obj)
                        })
                        // this.dataNodeType = arr
                        this.$store.dispatch("SET_COST_TO_COST_SETTING_COST_OWNER_NODE_ID_ArrData", arr.length > 0 ? arr : null)
                        this.$store.dispatch("SET_COST_TO_COST_SETTING_COST_PAYER_NODE_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getCostingRules(){
            await axios
                .get(this.URL.cost_to_cost_rules +
                `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.description
                            obj["value"] = item.name

                            arr.push(obj)
                        })
                        // this.dataNodeType = arr
                        this.$store.dispatch("SET_COST_TO_COST_SETTING_RULE_CONDITION_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getCostingType(){
            await axios
                .get(this.URL.cost_to_cost_type +
                `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.name
                            obj["value"] = item.cost_type_code

                            arr.push(obj)
                        })
                        // this.dataNodeType = arr
                        this.$store.dispatch("SET_COST_TO_COST_SETTING_COST_TYPE_CODE_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },

        async getActivityType(){
            await axios
                .get(this.URL.activity_type +
                `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.name
                            obj["value"] = item.code

                            arr.push(obj)
                        })
                        // this.dataNodeType = arr
                        this.$store.dispatch("SET_COST_TO_COST_SETTING_TRACKING_TYPE_NAME_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async updateData(){
            await axios
                .put(
                    this.URL.cost_to_cost + `/${this.node_id}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Update success', 'Update cost_to_cost is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Update failed', err)
                })
        },
        async addData() {
            console.log('form', this.form)
            await axios
                .post(
                    this.URL.cost_to_cost + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Create Success', 'Create new Costing setting is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Create Costing setting failed', err)
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        }
    },
    mounted() {
        this.initForm()
        this.getDataNode()
        this.getCostingRules()
        this.getCostingType()
        this.getActivityType()
    },
}
</script>
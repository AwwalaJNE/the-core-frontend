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
                    ref="formCostingReportController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    typeForm="cost_to_cost_report"

                    :asynchronousSelect_url="autoComplateUrl"
                    :querySearch="querySearch"
                    @onChangeCustom="onChangeCustom"
                    @inputFocus="inputFocus"
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
            cost_report_id: '',
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
            autoComplateUrl: ""
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
                this.cost_report_id = val.cost_report_id
            }
        }
    },
    methods: {
        formData(form){
        
            form["cost_owner_node_id"] = form["cost_owner_node_id"]["node_id"]
            form["cost_payer_node_id"] = form["cost_payer_node_id"]["node_id"]
            this.node_id = this.listenNodeId
            this.form = form
            if(this.cost_report_id !== undefined && this.cost_report_id !== ''){
                // this.updateData()
                // console.log('update')
            }else{
                this.addData()
            } 
            //   console.log('FORM', form)

        },
        handleSubmit(){
            this.$refs.formCostingReportController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formCostingReportController.handleClearForm()
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
        querySearch(queryString, cb){
            
            // let flag = this.listenFlag
            // console.log('autocomplete url', flag)
            // console.log('meanwhile from prop was', this.listenUrl)
            axios.get(this.autoComplateUrl +`&s=${queryString}`, this.Helper.header())
            .then(res => {
                let result = res.data.data
                // console.log('result',result)
                let suggestions = [];

                result.length > 0 && result.map(item => {
                    if(item.hasOwnProperty('node_name')) {
                        suggestions.push({
                                value: item['node_name'],
                                data: item
                        });
                    }
                })
                

                // console.log('suggestions', suggestions)

                cb(suggestions);
                })
            .catch(error => console.log("error", error));
        },
        onChangeCustom(type, val, info = {}){
            // console.log('type',type, val, info)

            
        },
        inputFocus() {
            // untuk trigger perubahan url autocomplete
        },
        updateValue(key,value) {

          
        },
        initForm(){
           this.$store.dispatch("SET_COST_TO_COST_REPORT_COST_GROUP_CODE_ArrData", this.listcostGroup.length > 0 ? this.listcostGroup : null)
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
                        this.$store.dispatch("SET_COST_TO_COST_REPORT_COST_OWNER_NODE_ID_ArrData", arr.length > 0 ? arr : null)
                        this.$store.dispatch("SET_COST_TO_COST_REPORT_COST_PAYER_NODE_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
      
        async addData() {
            console.log('form', this.form)
            await axios
                .post(
                    this.URL.cost_to_cost_report + `?n=${this.listenNodeId}`,
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
        let url = this.URL.node +'?n='+ this.listenNodeId +'&sort_order=desc&limit=15&page=1'
        this.autoComplateUrl = url

        this.initForm()
        this.getDataNode()
    },
}
</script>
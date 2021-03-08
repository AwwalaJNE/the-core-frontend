<template>
    <dialog-master 
    :actived="listenActive" 
    width="lg"
    :closeDialog="cancel">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller 
                    ref="formEmployeeController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    typeForm="employee"
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
import customerByPhone from "@/views/transaction/customerByPhone"

export default {
    name:"dialog-create-edit-node",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
        "customerByPhone":customerByPhone,
    },
    props: {
       closeDialog: Function,
       active: Boolean,
       title: String,
       dataItem: Object,
       btnRed: String,
       btnBlue: String,
       withSchedule: Boolean
    },
    data() {
        return {
            form: {},
            node_id: '',
            employee_id:'',
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
        },
       
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.employee_id = val.employee_id
            }
        },

    },
    methods: {
        formData(form){
          this.form = form
          if(this.employee_id !== undefined && this.employee_id !== '') {
            this.form.employee_id = this.employee_id
            this.updateData()
          } else {
            this.addData()
          }

          

        },
        handleSubmit(){
            this.$refs.formEmployeeController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formEmployeeController.handleClearForm()
            this.form = {}
            this.employee_id = ""
        },

        async getDataEmployeeType(){
            await axios
                .get(this.URL.employee_type +
                `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.employee_type_name
                            obj["value"] = item.employee_type_id

                            arr.push(obj)
                        })
                        this.$store.dispatch("SET_EMPLOYEE_EMPLOYEE_TYPE_ID_ArrData", arr.length > 0 ? arr : null)
                    } 

                })
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
                        this.$store.dispatch("SET_EMPLOYEE_EMPLOYEE_NODE_ID_ArrData", arr.length > 0 ? arr : null)
                    }
                    
                })
        },
        async updateData(){
            await axios
                .put(
                    this.URL.employee + `/${this.employee_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Update success', 'Update employee is success')
                }).catch(err => {
                    let messageErr = err.response.data ? err.response.data.message : 'Update failed' 
                    this.loading = false
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Update failed', messageErr)
                })
        },
        async addData() {
            await axios
                .post(
                    this.URL.employee + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Create Success', 'Create new employee is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Create failed', err)
                })
        },
        cancel() {
            this.closeDialog()
            this.handleClearForm()
        }
    },
    mounted() {
        this.getDataEmployeeType()
        this.getDataNode()
    },
}
</script>
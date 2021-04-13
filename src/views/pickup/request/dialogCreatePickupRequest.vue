<template>
    <dialog-master 
    :actived="listenActive" 
    :loading="listenLoading"
    :closeDialog="cancel">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller 
                    ref="formUserPickupRequestController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    typeForm="pickup_request"
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
    name:"dialog-create-pickupRequest",
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
            DataArr:[],
            loading:false,
            node_request:''
        }
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenLoading(){
            return this.loading
        },
        listenTitle(){
            return this.title
        },
        listenDataItem() {
            return this.dataItem
        },
        listenFormKey(){
          return this.formKey || ''
        },
    },
    mounted() {
    //   this.getTableData();
    },
    watch: { 
      	active: function(newVal, oldVal) { // watch it
          if(newVal){
              this.getTableData();
          }
        }
      },
    methods: {
        handleSubmit(){
            this.$refs.formUserPickupRequestController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        formData(form){
            // this.form = form
            this.form.pickup_node_id_destination= form.node_request
            this.loading = true
            this.addData() 
        },
        
        handleClearForm(){
            this.$refs.formUserPickupRequestController.handleClearForm()
            this.node_request=''
            this.form = {}
        },
        async addData() {
            await axios
                .post(
                    this.URL.pickup_request + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.loading = false
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', 'Create pickup request is success')
                }).catch(err => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Create pickup request is failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        cancel() {
            this.loading = false
            this.handleClearForm()
            this.closeDialog()

        },
        async getTableData() {
          this.loading = true
          await axios
              .get(this.URL.node +
                  `/${this.listenNodeId}/destination-link?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&s=`,
                  this.Helper.header())
              .then(res => {
                if(res.data.data.length > 0) {
                    let arr = []
                    res.data.data.map(item => {
                        let obj = {}
                        obj["label"] = item.node_name
                        obj["value"] = Number(item.node_id)

                        arr.push(obj)
                    })

                  this.$store.dispatch("SET_PICKUP_REQUEST_NODE_REQUEST_ArrData", arr.length > 0 ? arr : null)
                }

                this.loading = false
              }).catch(err => {
                this.loading = false
                this.openNotification('danger', 'Failed to populate node list', err)
              })
        },
    },
}
</script>
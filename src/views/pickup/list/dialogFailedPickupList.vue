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
                    ref="formPickupListFailedController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    typeForm="pickup_list_failed"
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
                        {{btnBlue || 'Submit'}}
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
    name:"dialog-failed-pickupRequest",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,  
    },
    props: {
       closeDialog: Function, 
       active: Boolean,
       title: String,
       pickupNumber:String,
       dataItem: Object,
       btnRed: String,
       btnBlue: String
    },
    data() {
        return {
            form: {},
            DataArr:[],
            loading:false,
            node_request:'',
            pickup_number:''
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

    watch: {
        active: function(newVal, oldVal) {
          if(newVal){
            this.getStatus();
          }
        }

    },
    methods: {
        handleSubmit(){
            this.$refs.formPickupListFailedController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        formData(form){
            this.form = form
            this.form.pickup_failed_reason = form.status
            this.pickup_number = this.pickupNumber
            this.form.pickup_node_id_destination = form.node_request
            this.loading = true
            this.updateData()
        },
        
        handleClearForm(){
            this.$refs.formPickupListFailedController.handleClearForm()
            this.pickup_number=''
            this.form = {}
        },
        async updateData() {
            console.log("HALO2", this.pickup_number, this.listenNodeId, this.form)
            await axios
                .post(
                    this.URL.pickup + `/${this.pickup_number}/request-failed?n=${this.listenNodeId}`,
                    this.form, 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.loading = false
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', 'Request Failed Pickup is success, Waiting for Approval')
                })
                .catch(err => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Request Failed Pickup is failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        cancel() {
            this.loading = false
            this.handleClearForm()
            this.closeDialog()

        },
        async getStatus() {
          this.loading = true
          await axios
              .get(this.URL.status +
                  `?status_type=PICKUP-FAILED&n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&s=`,
                  this.Helper.header())
              .then(res => {
                if(res.data.data.length > 0) {
                    let arr = []
                    res.data.data.map(item => {
                        let obj = {}
                        obj["label"] = item.status_code + ' - '+ item.status_description
                        obj["value"] = item.status_code

                        arr.push(obj)
                    })

                  this.$store.dispatch("SET_PICKUP_LIST_FAILED_STATUS_ArrData", arr.length > 0 ? arr : null)
                }

                this.loading = false
              })
              .catch(err => {
                this.loading = false
                this.openNotification('danger', 'Failed to populate status list', err)
              })
        },
    },
    mounted() {
    }
}
</script>
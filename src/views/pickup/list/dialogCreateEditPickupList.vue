<template>
    <dialog-master 
    :actived="listenActive" 
    width="lg"
    :closeDialog="cancel">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <vs-row align="left">
              <vs-col xs="1" sm="1" lg="1">
                  <vs-button
                      shadow
                      icon
                      :active="false"
                      @click="openGetCustomer"
                  >
                    <i class='bx bx-user'></i>
                  </vs-button>
              </vs-col>
              <vs-col xs="10" sm="10" lg="10" align="left" style="padding-top: 10px; font-size: 12px">
                <span>Name, Corporate ID Or JLC</span>
              </vs-col>
            </vs-row>
            <div>
                <form-input-controller 
                    ref="formUserNodeController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    typeForm="pickup_list"
                />
            </div>


          <customerByPhone
              :active="dialogGetCustomer"
              :closeDialog="closeGetCustomer"
              title="origin"
              type="origin"
              @updateValue="updateValue"
          />
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
        "customerByPhone":customerByPhone
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
            node_id: '',
            dialogGetCustomer:false
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
                this.node_id = val.node_id
            }
        }
    },
    methods: {
        formData(form){
            this.form = form
            if(this.node_id !== undefined && this.node_id !== '') {
                    console.log('update')
                    this.updateData()
            } else {
                    console.log('create new')
                    this.addData()
            }
        },
        handleSubmit(){
            this.$refs.formUserNodeController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formUserNodeController.handleClearForm()
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

          if(Object.keys(value).length > 0 && key == 'origin') {
            this.forcererender = true
            this.$store.dispatch(`SET_ORIGIN_ORIGIN_NAME`, value.customer_name)
            this.$store.dispatch(`SET_ORIGIN_ORIGIN_PHONE`, value.customer_phone)
            this.$store.dispatch(`SET_ORIGIN_ORIGIN_ADDRESS`, value.geolocation_location_name)
            this.$store.dispatch(`SET_ORIGIN_ORIGIN_SUBDISTRICT_ID`, value.customer_subdistrict_id)
            this.$store.dispatch(`SET_ORIGIN_ORIGIN_ONCHANGE_ADDRESS`, value.geolocation_location_name)
            this.$store.dispatch(`SET_ORIGIN_ORIGIN_ZIP_CODE`, value.geolocation_subdistrict_zip_code)

            let self = this
            setTimeout(function(){ self.forcererender = false }, 100);

            let aaa = this.$store.getters.getTransaction.origin
            console.log('data origin', aaa)
          }
        },

        async getDataNode(){
            await axios
                .get(this.URL.node + 
                `?n=1&sort_order=desc&limit=1000&page=1`, 
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
                        this.$store.dispatch("SET_NODE_DEFAULT_NODE_LINK_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getDataAltAddress(){
            await axios
                .get(this.URL.node_alternate_address + 
                `?n=1&sort_order=desc&limit=1000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.node_alternate_address_name
                            obj["value"] = item.node_alternate_address_id

                            arr.push(obj)
                        })
                        this.$store.dispatch("SET_NODE_DEFAULT_NODE_ALTERNATE_ADDRESS_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getDataTariff(){
            await axios
                .get(this.URL.tariff + 
                `?n=1&sort_order=desc&limit=1000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.tariff_origin
                            obj["value"] = item.tariff_origin

                            arr.push(obj)
                        })
                        this.$store.dispatch("SET_NODE_NODE_TARIFF_CODE_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getDataNodeType(){
            await axios
                .get(this.URL.node_type + 
                `?n=1&sort_order=desc&limit=1000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.node_type_name
                            obj["value"] = item.node_type_id

                            arr.push(obj)
                        })
                        // this.dataNodeType = arr
                        this.$store.dispatch("SET_PICKUP_LIST_REQUEST_TO_ArrData", arr.length > 0 ? arr : null)
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
                    this.URL.node + `/${this.node_id}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Update success', 'Update node is success')
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
                    this.URL.node,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Create Success', 'Create new node is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Create failed', err)
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        }
    },
    mounted() {
        this.getDataNodeType()
        this.getDataTariff()
        this.getDataNode()
        this.getDataAltAddress()
    },
}
</script>
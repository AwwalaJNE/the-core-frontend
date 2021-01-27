<template>
    <dialog-master 
    :actived="listenActive" 
    width="lg"
    :fullScreen="true"
    :closeDialog="cancel">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>

            <vs-row>
              <vs-col lg="6" sm="6">
                <div>
                  <form-input-controller
                      ref="formUserNodeController"
                      @formData="formData"
                      :dataItem="listenDataItem"
                      typeForm="surat_muatan"
                  />
                </div>
              </vs-col>
              <vs-col lg="6" sm="6">
                <vs-col offset="1" w="5">
                    <!-- :autofocus="true" -->
                  <vs-input
                      border
                      type="text"
                      v-model="item_code"
                      label-placeholder="Masukkan code BAG / Connote"
                      v-on:keyup.enter="updateValue"
                      
                      ref="formInputItemManifest">

                  </vs-input>
                </vs-col>

              </vs-col>

            </vs-row>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="2">
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
                <vs-col w="2">
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
    name:"dialog-create-edit-node",
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
       btnBlue: String,
    },
    data() {
        return {
            form: {},
            node_id: '',
            manifest_number:'',
            item_code:''
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
                this.node_id = val.node_id
                this.manifest_number = val.manifest_number
            }
        },

    },
    methods: {
        formData(form){
          this.form = form

          if(this.manifest_number !== undefined && this.manifest_number !== '') {
            this.form.manifest_number = this.manifest_number
            console.log(this.form,'alah')
            this.updateData()
          } else {
            this.node_id = this.listenNodeId
            this.form.pickup_node_id_requestor = this.node_id
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
            this.manifest_number = ""
        },

        async getDataEmployee(){
            await axios
                .get(this.URL.employee +
                `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.employee_name
                            obj["value"] = item.employee_id

                            arr.push(obj)
                        })
                        this.$store.dispatch("SET_PICKUP_LIST_PICKUP_COURIER_EMPLOYEE_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }

                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },

        async getDataVehicleMode(){
            await axios
                .get(this.URL.vehicle_mode +
                `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.vehicle_mode_name
                            obj["value"] = item.vehicle_mode_id

                            arr.push(obj)
                        })
                        this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_METHOD_ID_ArrData", arr.length > 0 ? arr : null)
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },

        async getDataVehicleType(){
          await axios
              .get(this.URL.vehicle_type +
                  `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                  this.Helper.header())
              .then(res => {
                if(res.data.data.length > 0) {
                  let arr = []
                  res.data.data.map(item => {
                    let obj = {}
                    obj["label"] = item.vehicle_type_name
                    obj["value"] = item.vehicle_type_id

                    arr.push(obj)
                  })
                  this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_MODE_ID_ArrData", arr.length > 0 ? arr : null)
                }

              }).catch(err => {
                // this.openNotification('danger', 'Failed to collect role list', err)
              })
        },

        async getDataVehicle(){
          await axios
              .get(this.URL.vehicle +
                  `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                  this.Helper.header())
              .then(res => {
                if(res.data.data.length > 0) {
                  let arr = []
                  res.data.data.map(item => {
                    let obj = {}
                    obj["label"] = item.vehicle_name
                    obj["value"] = item.vehicle_id

                    arr.push(obj)
                  })
                  this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ID_ArrData", arr.length > 0 ? arr : null)
                }

              }).catch(err => {
                // this.openNotification('danger', 'Failed to collect role list', err)
              })
        },

        async getDataNodeorigin(){
            await axios
                .get(this.URL.node + `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
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
                        this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_ORIGIN_ArrData", arr.length > 0 ? arr : null)
                        this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_TRANSIT_1_ArrData", arr.length > 0 ? arr : null)
                        this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_TRANSIT_2_ArrData", arr.length > 0 ? arr : null)
                        this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_TRANSIT_3_ArrData", arr.length > 0 ? arr : null)
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },

        async getDataEmployee(){
            await axios
                .get(this.URL.employee + `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.employee_name
                            obj["value"] = item.employee_id

                            arr.push(obj)
                        })
                        // this.dataNodeType = arr
                        this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData", arr.length > 0 ? arr : null)
                    }

                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },

        async getDataNodeDestination(){
            await axios
                .get(this.URL.node +
                `/${this.listenNodeId}/destination-link?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
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
                        this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_DESTINATION_ArrData", arr.length > 0 ? arr : null)
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
                    this.URL.pickup + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Update success', 'Update pickup is success')
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
                    this.URL.pickup + `?n=${this.listenNodeId}`,
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
        },
        updateValue(val){

        }
    },
    mounted() {
        this.getDataNodeorigin()
        this.getDataNodeDestination()
        this.getDataVehicleType()
        this.getDataVehicle()
        this.getDataVehicleMode()
        this.getDataEmployee()
    },
}
</script>
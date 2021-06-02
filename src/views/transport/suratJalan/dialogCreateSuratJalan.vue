<template>
    <dialog-master 
    :actived="listenActive" 
    :loading="listenLoading"
    width="xl"
    :closeDialog="cancel">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <!-- <pre>{{listenDataItem}}</pre> -->
                <form-input-controller 
                    ref="formSuratJalan"
                    @formData="formData"
                    :dataItem="editData"
                    typeForm="surat_jalan"
                    @onChangeCustom="onChangeCustom"
                />

                <div class="mt-2 mb-2">
                    <vs-row justify="space-between">
                        <vs-col xs="6" sm="3" lg="3">
                            <form @submit.prevent="getDataSuratMuatan">
                                <input-general 
                                name="Scan Surat Muatan / Bag"
                                rules=""
                                formKey="scanBag"
                                :valueData="suratMuatan"
                                typeInput="text"
                                @updateValue="updateValue" />
                            </form>
                        </vs-col>
                    </vs-row>
                    <table-master 
                    :dataTable="dataTable" 
                    :dataColumn="datacolumn" 
                    :hasAction="false"
                    :hasPagination="false"

                    :customAction="true"
                    :customActionList="customActionList"
                    @actionUpdate="actionUpdate"
                    />
                </div>
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
import moment from "moment"
import DialogMaster from "@/components/dialog/dialogMaster"
import FormInputController from "@/components/form/formInputController"
import TableMaster from "@/components/table/tableMaster"
import InputGeneral from "@/components/input/general"
export default {
    name:"dialog-create-surat-jalan",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "table-master" : TableMaster,
        "input-general": InputGeneral,
        "form-input-controller": FormInputController,
    },
    props: {
       closeDialog: Function, 
       active: Boolean,
       title: String,
       dataItem: Object,
       btnRed: String,
       btnBlue: String,
       refresh: Function
    },
    data() {
        return {
            form: {},
            DataArr:[],
            loading:false,
            manifest_delivery_id:'',
            dataTable: [],
            datacolumn: [
              {
                label: "No Surat Muatan",
                key: "item_number",
                width: "xs"
              },
              {
                label: "Weight (Kg)",
                key: "total_weight",
                width: "auto"
              },
              {
                label: "Destination",
                key: "destination",
                width: "auto"
              },
              {
                label: "Type",
                key: "item_type",
                width: "auto"
              },
            ],
            customActionList: [
              {
                label: 'Remove',
                key: 'remove',
                attribute: '',
              }
            ],
            suratMuatan: '',
            vehicle_max_weight: 0,
            vehicle_type_id: '',
            lot_weight:0,
            no_moda_angkutan_id: null,
            etd:null,
            estimated_time_in_hour:null,

            editData: {}
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
            if (this.dataItem) {
            //     this.dataItem['destination_id'] = val['destination'] ? val['destination']['node_id'] : ''
            // this.dataItem['no_moda_angkutan_id'] = val['vehicle'] ? val['vehicle']['vehicle_id'] : ''
                // this.dataItem["destination_id"] = this.dataItem.node_id_destination
                // this.dataItem["moda_angkutan_id"] = this.dataItem.vehicle_mode_id
                // this.dataItem["no_moda_angkutan_id"] = this.dataItem.vehicle_id
                // this.dataItem["manifest_do_item"] = this.dataItem.detail
                // this.dataItem["driver_id"] = parseInt(this.dataItem.pic_employee_id)
            }

            return this.dataItem
        },
        listenFormKey(){
          return this.formKey || ''
        },
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.manifest_delivery_id = val.manifest_do_number
                this.dataTable = val.detail
                this.editData = val

                // this.editData["destination_id"] = val.node_id_destination ? val.node_id_destination : ''
                // this.editData["moda_angkutan_id"] = val.vehicle_mode_id ? val.vehicle_mode_id : ''
                // this.editData["no_moda_angkutan_id"] = val.vehicle_id ? val.vehicle_id : ''
                // this.editData["manifest_do_item"] = val.detail ? val.detail : ''
                // this.editData["driver_id"] = val.pic_employee_id ? parseInt(val.pic_employee_id) : ''

            }
        },
        active: function (val) {
            if (val == true) {
              this.getDestination()
              this.getNoModeAngkutan()
            }
        }
    },
    methods: {
        formData(form){
            let weight = 0
            this.dataTable.map(item => {    
                if(item.total_weight) {
                    weight =+ item.total_weight
                }
            })

            if(this.vehicle_max_weight >= weight) {
                let obj = {}
                obj['node_id_origin'] = this.listenNodeId
                obj['node_id_destination'] = form.destination_id
                obj['vehicle_mode_id'] = form.moda_angkutan_id
                obj['vehicle_id'] = form.no_moda_angkutan_id
                obj['pic_employee_id'] = form.driver_id
                obj['etd'] = form.etd
                obj['eta'] = form.eta
                obj['vehicle_type_id'] = this.vehicle_type_id
                obj['max_weight'] = this.vehicle_max_weight
                
                obj['manifest_do_item'] = this.dataTable

                this.form = obj
                
                if (this.form.eta > this.form.etd) {
                    if(this.manifest_delivery_id !== undefined && this.manifest_delivery_id !== '') {
                        this.updateData()
                    } else {
                        this.addData()
                    }
                } else {
                    this.openNotification('warning', 'Wrong Input in ETA/ETD field', 'ETA must more than ETD')
                }
            } else {
                // this.openNotification('warn', 'Melebihi berat', 'Berat muatan melebihi batas berat kendaraan')
            }
        },
        onChangeCustom(type, val, obj){
            // console.log('onchange',type, val, obj)
            switch(type) {
                case "no_moda_angkutan_id":
                    if(typeof obj === 'object') {
                        if(obj.hasOwnProperty('item')) {
                            this.vehicle_max_weight = obj['item']['vehicle_max_weight']
                            this.vehicle_type_id = obj['item']['vehicle_type_id']
                        }
                    }
                    this.no_moda_angkutan_id = val
                    this.getDriver()
                   break;
                case "destination_id":
                  if(typeof obj === 'object') {
                    if(obj.hasOwnProperty('item')) {
                      this.estimated_time_in_hour = obj['item']['estimated_time_in_hour']
                      this.handleEta(this.etd, this.estimated_time_in_hour)
                    }
                  }
                  break;
                case "etd":
                  this.etd = val
                  let dateEta = this.handleEta(this.etd, this.estimated_time_in_hour)

                  break;
                default:
                    console.log('meong')
                    // code block
            }
        },
        handleEta(dateTime, amount){
          if(dateTime && amount){
            let dateEta =  moment(dateTime).add(amount, 'hours').format('YYYY-MM-DD HH:mm:ss');
            this.$store.dispatch("SET_SURAT_JALAN_ETA", dateEta)
          }
        },
        actionUpdate(val, key) {
            console.log('table', key, val)
          switch(key) {
                case "remove":
                    if(this.dataTable.length > 0 && typeof val === 'object') {
                        let filter = this.dataTable.filter(item => item.item_number !== val.item_number)
                        this.dataTable = filter
                    }
                   break;
                default:
                    console.log('meong')
                    // code block
            }
        },
        handleSubmit(){
            this.$refs.formSuratJalan.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formSuratJalan.handleClearForm()
            this.form = {}
        },
        updateValue(key,val){
            switch(key) {
                case "scanBag":
                    this.suratMuatan = val
                    break;
                default:
                    console.log('meong')
                    // code block
            }
        },
        async addData() {
            this.loading = true
            await axios
                .post(
                    this.URL.manifest_delivery_order + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.closeDialog()
                    this.loading = false
                    this.$emit("refresh")
                    this.handleClearForm()
                    this.dataTable = []
                    this.openNotification(null, 'Success', 'Create surat jalan success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit("refresh")
                    this.dataTable = []
                    this.handleClearForm()
                    this.openNotification('danger', 'Create surat jalan failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        async updateData() {
            this.loading = true
            await axios
                .put(
                    this.URL.manifest_delivery_order + `/${this.manifest_delivery_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.closeDialog()
                    this.loading = false
                    this.$emit("refresh")
                    this.handleClearForm()
                    this.dataTable = []
                    this.openNotification(null, 'Success', 'Update surat jalan success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit("refresh")
                    this.dataTable = []
                    this.handleClearForm()
                    this.openNotification('danger', 'Create surat jalan failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        cancel() {
            this.loading = false
            this.handleClearForm()
            this.dataTable = []
            this.closeDialog()

        },
        async getDestination() {
            await axios
                .get(this.URL.node +
                `/${this.listenNodeId}/destination-link-manifest-delivery-order?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.node_name
                            obj["value"] = Number(item.node_id)
                            obj["item"] = item

                            arr.push(obj)
                        })

                        this.$store.dispatch("SET_SURAT_JALAN_DESTINATION_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        this.$store.dispatch("SET_SURAT_JALAN_DESTINATION_ID_ArrData", null)
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        // async getModeAngkutan() {
        //     await axios
        //         .get(this.URL.vehicle_mode +
        //         `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
        //         this.Helper.header())
        //         .then(res => {
        //             if(res.data.data.length > 0) {
        //                 let arr = []
        //                 res.data.data.map(item => {
        //                     let obj = {}
        //                     obj['label'] = item.vehicle_mode_name
        //                     obj['value'] = item.vehicle_mode_id
        //                     // obj["item"] = item
        //                     arr.push(obj)
        //                 })
        //
        //                 this.$store.dispatch("SET_SURAT_JALAN_MODA_ANGKUTAN_ID_ArrData", arr.length > 0 ? arr : null)
        //             } else {
        //                 // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
        //             }
        //
        //         }).catch(err => {
        //             // this.openNotification('danger', 'Failed to collect role list', err)
        //         })
        // },
        async getNoModeAngkutan() {
            await axios
                .get(this.URL.vehicle_manifest_delivery_order +
                `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.vehicle_name + '('+item.vehicle_police_no+')'
                            obj["value"] = item.vehicle_id
                            obj['item'] = item 
                            arr.push(obj)
                        })

                        this.$store.dispatch("SET_SURAT_JALAN_NO_MODA_ANGKUTAN_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
            
        },
        async getDataSuratMuatan(){
          await axios
              .get(this.URL.manifest_do +
                  `/scan?n=${this.listenNodeId}&item_no=${this.suratMuatan}`,
                  this.Helper.header())
              .then(res => {
                if(res.data.data) {
                    let data = res.data.data

                    let obj = {}
                    obj['item_number'] = data.item_number
                    obj['total_weight'] = data.total_weight
                    obj['destination'] = data.destination ? data.destination : ''
                    obj['node_id_receiver'] = data.node_id_receiver
                    obj['total_koli'] = data.total_koli
                    obj['item_type'] = data.item_type

                    this.dataTable.push(obj)

                    this.suratMuatan = ''
                }

              }).catch(err => {
                // this.openNotification('danger', 'Failed to collect role list', err)
              })
        },
        async getDriver() {
            await axios
                .get(this.URL.vehicle +
                `/${this.no_moda_angkutan_id}/driver?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = `${item.employee_name} (${item.employee_nik})`
                            obj["value"] = item.employee_id

                            arr.push(obj)
                        })

                        this.$store.dispatch("SET_SURAT_JALAN_DRIVER_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
            
          
        },
    },
    mounted() {
    //   this.getDestination()
    //   this.getNoModeAngkutan()
    //   this.getDriver()
    },
}
</script>
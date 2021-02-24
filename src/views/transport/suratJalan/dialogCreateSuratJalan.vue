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
                <form-input-controller 
                    ref="formSuratJalan"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    typeForm="surat_jalan"
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
       btnBlue: String
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
                key: "bag_number",
                width: "xs"
              },
              {
                label: "Weight (Kg)",
                key: "bag_weight",
                width: "auto"
              },
              {
                label: "Destination",
                key: "destination",
                width: "auto"
              },
              {
                label: "Type",
                key: "bag_type",
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
            suratMuatan: ''
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
        dataItem: function (val) {
            if(val !== undefined) {
                this.manifest_delivery_id = val.manifest_delivery_id
            }
        },
        active: function (val) {
            if (val == true) {
                this.getDestination()
                this.getModeAngkutan()
                this.getNoModeAngkutan()
                this.getDriver()
            }
        }
    },
    methods: {
        formData(form){
            this.form = form
            if(this.geolocation_city_id !== undefined && this.geolocation_city_id !== '') {
                    console.log('update')
                    this.updateData()
            } else {
                    this.addData()
            }
        },
        actionUpdate(val, key) {
          switch(key) {
                case "remove":
                    if(this.dataTable.length > 0 && typeof val === 'object') {
                        let filter = this.dataTable.filter(item => item.bag_number !== val.bag_number)
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
        async updateData(){
            await axios
                .put(
                    this.URL.manifest_delivery_order + `/${this.manifest_delivery_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', 'Update surat jalan success')
                }).catch(err => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Update surat jalan failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        async addData() {
            await axios
                .post(
                    this.URL.manifest_delivery_order + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.loading = false
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', 'Create surat jalan success')
                }).catch(err => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Create surat jalan failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        cancel() {
            this.loading = false
            this.handleClearForm()
            this.closeDialog()

        },
        async getDestination() {
            await axios
                .get(this.URL.node_link + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`, 
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

                        this.$store.dispatch("SET_SURAT_JALAN_DESTINATION_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getModeAngkutan() {
            await axios
                .get(this.URL.vehicle_mode + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`, 
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

                        this.$store.dispatch("SET_SURAT_JALAN_MODA_ANGKUTAN_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getNoModeAngkutan() {
            await axios
                .get(this.URL.vehicle + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`, 
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
              .get(this.URL.surat_muatan +
                  `/scan?n=${this.listenNodeId}&item_no=${this.suratMuatan}`,
                  this.Helper.header())
              .then(res => {
                if(res.data.data.length > 0) {
                    let data = res.data.data
                    let arr = []
                    data.map(item => {
                        let obj = {}
                        obj['bag_number'] = item.bag_number
                        obj['bag_weight'] = item.bag_weight
                        obj['destination'] = item.destination ? item.destination['node_name'] : ''
                        obj['bag_type'] = item.bag_type

                        this.dataTable.push(obj)
                    })
                    this.suratMuatan = ''
                }

              }).catch(err => {
                // this.openNotification('danger', 'Failed to collect role list', err)
              })
        },
        getDriver() {
            // await axios
            //     .get(this.URL.geolocation_province + 
            //     `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`, 
            //     this.Helper.header())
            //     .then(res => {
            //         if(res.data.data.length > 0) {
            //             let arr = []
            //             res.data.data.map(item => {
            //                 let obj = {}
            //                 obj["label"] = item.geolocation_province_name
            //                 obj["value"] = item.geolocation_province_id

            //                 arr.push(obj)
            //             })

            //             this.$store.dispatch("SET_GEOLOCATION_CITY_GEOLOCATION_PROVINCE_ID_ArrData", arr.length > 0 ? arr : null)
            //         } else {
            //             // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
            //         }
                    
            //     }).catch(err => {
            //         // this.openNotification('danger', 'Failed to collect role list', err)
            //     })
            let arr = [
                {
                    label: 'Son',
                    value: '1'
                },
                {
                    label: 'Veni',
                    value: '2'
                }
            ]
          this.$store.dispatch("SET_SURAT_JALAN_DRIVER_ID_ArrData", arr.length > 0 ? arr : null)
        },
    },
}
</script>
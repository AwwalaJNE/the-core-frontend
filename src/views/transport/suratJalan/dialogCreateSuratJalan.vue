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
                            <input-general 
                                name="Scan Surat Muatan / Bag"
                                rules=""
                                formKey="sancBag"
                                :valueData="''"
                                typeInput="text"
                                @updateValue="updateValue" />
                        </vs-col>
                    </vs-row>
                    <table-master 
                    :dataTable="dataTable" 
                    :dataColumn="datacolumn" 
                    :hasAction="false"
                    :hasPagination="false"
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
                key: "manifest_type",
                width: "xs"
              },
              {
                label: "Weight (Kg)",
                key: "pickup_number",
                width: "auto"
              },
              {
                label: "Destination",
                key: "vehicle_mode_name",
                width: "auto"
              },
              {
                label: "Type",
                key: "node_origin",
                width: "auto"
              },
            ],
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
        handleSubmit(){
            this.$refs.formSuratJalan.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formSuratJalan.handleClearForm()
            this.form = {}
        },
        updateValue(key,val){

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
        getDestination() {
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
                    label: 'BANDAR UDARA INTERNASIONAL SOEKARNO-HATTA',
                    value: '7087'
                }
            ]
          this.$store.dispatch("SET_SURAT_JALAN_DESTINATION_ID_ArrData", arr.length > 0 ? arr : null)
        },
        getModeAngkutan() {
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
                    label: 'MOTORCYCLE',
                    value: '23'
                },
                {
                    label: 'Van',
                    value: '203'
                },
                {
                    label: 'Truck',
                    value: '103'
                },
                {
                    label: 'Big Truck',
                    value: '13'
                },
            ]
          this.$store.dispatch("SET_SURAT_JALAN_MODA_ANGKUTAN_ID_ArrData", arr.length > 0 ? arr : null)
        },
        getNoModeAngkutan() {
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
                    label: 'GA GC',
                    value: '1'
                },
                {
                    label: 'QG (HLP) DG',
                    value: '2'
                }
            ]
          this.$store.dispatch("SET_SURAT_JALAN_NO_MODA_ANGKUTAN_ID_ArrData", arr.length > 0 ? arr : null)
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
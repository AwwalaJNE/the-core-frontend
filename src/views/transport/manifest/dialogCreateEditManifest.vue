<template>
    <dialog-master 
    :actived="listenActive" 
    width="lg"
    :closeDialog="cancel" class="custom-width">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>

            <vs-row>
              <vs-col lg="5" sm="5">
                <div>
                  <form-input-controller
                      ref="formSuratMuatanController"
                      @formData="formData"
                      :dataItem="listenDataItem"
                      typeForm="surat_muatan"
                      :querySearch="querySearch"
                      :itterateUrlAutoComplete="listenItterateUrlAutoComplete"
                      :itterateFlagAutoComplete="listenItterateFlagAutoComplete"
                      @onChangeCustom="onChangeOrigin"
                      @inputFocus="inputFocus"
                  />
                </div>
              </vs-col>
              <vs-col lg="7" sm="7">
                <vs-row>
                  <vs-col>
                    <vs-input
                        border
                        type="text"
                        v-model="item_code"
                        label-placeholder="Masukkan code BAG / Connote"
                        v-on:keyup.enter="updateValue"
                        :autofocus="true"
                        ref="formInputItemManifest">

                    </vs-input>
                  </vs-col>
                </vs-row>

                <!-- display informasi surat muatan-->
                <vs-row>
                  <table-master
                      :dataTable="dataTable"
                      :dataColumn="datacolumn"
                      :tableLoading="loading"
                      :pageSize="pagination.page_size"
                      :page="pagination.page"
                      :limit="pagination.limit"
                      :hasAction="false"
                      :hasPagination="false"
                      @actionPagination="actionPagination"
                  />
                </vs-row>
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
import TableMaster from "@/components/table/tableMaster.vue"
import moment from "moment";
export default {
    name:"dialog-create-edit-surat_muatan",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
        "table-master": TableMaster,
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
            item_code:'',
            dataTable:[],
            datacolumn: [
              {
                label: "Item No",
                key: "bag_number",
                width: "sm"
              },
              {
                label: "Type",
                key: "type",
                width: "auto"
              },
              {
                label: "Weight (Kg)",
                key: "bag_weight",
                width: "auto"
              },
              {
                label: "Destination",
                key: "destination",
                width: "xs"
              }
            ],
            loading:false,
            pagination: {
              limit:5,
              page_size: 1,
              page: 1
            },

            vehicle_mode_id : "",
            vehicle_type_id: "",
            node_id_origin: "",
            vehicle_id: "",
            manifest_method_id: "",

            autoComplateUrl: '',
            itterateUrlAutoComplete: '',
            itterateFlagAutoComplete: 'node_name',
            etd:null,
            estimated_time_in_hour:null,
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
        listenItterateUrlAutoComplete() {
            return this.itterateUrlAutoComplete
        },
        listenItterateFlagAutoComplete() {
            return this.itterateFlagAutoComplete
        }
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
        initialize(){
            // siapin url untuk input autocomplete
            // let url = this.URL.node +'/'+ this.listenNodeId +'/origin-link?n=' +this.listenNodeId+ '&sort_order=desc&limit=15&page=1'
            // this.autoComplateUrl = url
            // this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_ORIGIN_URL", url)
        },
        inputFocus(info){
          console.log('focus to', info)
          if(info && info.hasOwnProperty("key")) {
            let url = ""
            switch(info["key"]) {
                case "node_id_origin":
                    url = this.URL.node +'/'+ this.listenNodeId +'/origin-link?n=' +this.listenNodeId+ '&sort_order=desc&limit=15&page=1'
                    this.autoComplateUrl = url
                    break;
                case "node_id_destination":
                    let transit = this.$store.getters["getInputs"]["surat_muatan"]["dynamicinputcomponent_node_id_transit"]
                    let arr = transit["arrData"]
                    // console.log('node_id_destination transit', arr)

                    let nodeId = this.node_id_origin
                    // jika punya transit
                    if(arr && arr.length > 0) {
                      if(arr[arr.length-1].hasOwnProperty("inputs")) {
                        let data = arr[arr.length-1]["inputs"][0]["data"]
                        nodeId = data["node_id"] ? data["node_id"] : this.node_id_origin
                      }
                    }

                    url = this.URL.node +'/'+ nodeId +'/destination-link?n=' +this.listenNodeId+ '&vehicle_mode_id=' +this.vehicle_mode_id+ '&sort_order=desc&limit=15&page=1'
                    this.autoComplateUrl = url
                    break;
                default:
                    // code block
            }
          }
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
        formData(form){
          console.log('form',form)
          form['node_id_origin'] = form['node_id_origin']['node_id']
          form['node_id_destination'] = form['node_id_destination']['node_id']

          if(form.hasOwnProperty("dynamicinputcomponent_node_id_transit")){
            if(form["dynamicinputcomponent_node_id_transit"].length > 0) {
              form["node_id_transit_1"] = form["dynamicinputcomponent_node_id_transit"][0] ?
                                            form["dynamicinputcomponent_node_id_transit"][0]["inputs"][0]["data"]["node_id"] : ""

              form["node_id_transit_2"] = form["dynamicinputcomponent_node_id_transit"][1] ?
                                            form["dynamicinputcomponent_node_id_transit"][1]["inputs"][0]["data"]["node_id"] : ""

              form["node_id_transit_3"] = form["dynamicinputcomponent_node_id_transit"][2] ?
                                            form["dynamicinputcomponent_node_id_transit"][2]["inputs"][0]["data"]["node_id"] : ""
            }
          }


          this.form = form
          
          
          if (this.form.eta > this.form.etd) {
            if(this.manifest_number !== undefined && this.manifest_number !== '') {
              this.form.manifest_number = this.manifest_number
              this.updateData()
            } else {
              this.node_id = this.listenNodeId
              this.form.pickup_node_id_requestor = this.node_id
              this.addData()
            }
          } else {
            this.openNotification('warning', 'Wrong Input in ETA/ETD field', 'ETA must more than ETD')
          }

          // console.log('this.form',this.form)
        },
        handleSubmit(){
            this.$refs.formSuratMuatanController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formSuratMuatanController.handleClearForm()
            this.form = {}
            this.item_code = ""
            this.manifest_number = ""
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
                            obj["data"] = item

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
                  `?n=${this.listenNodeId}&vehicle_mode_id=${this.vehicle_mode_id}&sort_order=desc&limit=1000&page=1`,
                  this.Helper.header())
              .then(res => {
                let arr = []
                if(res.data.data.length > 0) {
                  
                  res.data.data.map(item => {
                    let obj = {}
                    obj["label"] = item.vehicle_type_name
                    obj["value"] = item.vehicle_type_id
                    obj["data"] = item

                    arr.push(obj)
                  })
                  
                } else {
                  arr = [{label: null, value: null, data: {}}]
                }
                this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_MODE_ID_ArrData", arr)
              }).catch(err => {
                // this.openNotification('danger', 'Failed to collect role list', err)
              })
        },

        async getDataVehicle(){
          await axios
              .get(this.URL.vehicle +
                  `?n=${this.listenNodeId}&vehicle_type_id=${this.vehicle_type_id}&sort_order=desc&limit=1000&page=1`,
                  this.Helper.header())
              .then(res => {
                if(res.data.data.length > 0) {
                  let arr = []
                  res.data.data.map(item => {
                    let obj = {}
                    obj["label"] = `${item.vehicle_name} | Police number: ${item.vehicle_police_no}`
                    obj["value"] = item.vehicle_id

                    arr.push(obj)
                  })
                  this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ID_ArrData", arr.length > 0 ? arr : null)
                } else {
                  this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ID", "")
                  this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ID_ArrData", [])

                  this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID", "")
                  this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData", [])
                }

              }).catch(err => {
                // this.openNotification('danger', 'Failed to collect role list', err)
              })
        },

        // async getDataNodeorigin(){
        //     await axios
        //         .get(this.URL.node + `/${this.listenNodeId}/origin-link?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
        //         this.Helper.header())
        //         .then(res => {
        //             if(res.data.data.length > 0) {
        //                 let arr = []
        //                 res.data.data.map(item => {
        //                     let obj = {}
        //                     obj["label"] = item.node_name
        //                     obj["value"] = item.node_id

        //                     arr.push(obj)
        //                 })
        //                 // this.dataNodeType = arr
        //                 this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_ORIGIN_ArrData", arr.length > 0 ? arr : null)
        //                 this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_TRANSIT_ArrData", arr.length > 0 ? arr : null)
        //                 this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_TRANSIT_2_ArrData", arr.length > 0 ? arr : null)
        //                 this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_TRANSIT_3_ArrData", arr.length > 0 ? arr : null)
        //             }
                    
        //         }).catch(err => {
        //             // this.openNotification('danger', 'Failed to collect role list', err)
        //         })
        // },

        async getDataEmployee(){
          //this.URL.employee + `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`
            await axios
                .get(this.URL.vehicle + `/${this.vehicle_id}/driver?n=${this.listenNodeId}&sort_order=desc&limit=100&page=1`,
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
                    } else {
                      this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID", "")
                      this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData", [])
                    }

                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
      
        async updateData(){
            await axios
                .put(
                    this.URL.surat_muatan + `/${this.manifest_number}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Update success', 'Update  surat muatan is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Update failed', err)
                })
        },

        async addData() {
            // console.log('form', this.form)
            this.form.manifest_item = this.dataTable
            this.form.vehicle_type_id = this.form.vehicle_mode_id
            this.form.max_weight = 1
            await axios
                .post(
                    this.URL.surat_muatan + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Create Success', 'Create surat muatan is success')
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
          this.getDataManifest(this.item_code)
        },

        async getDataManifest(val){
        await axios
            .get(this.URL.surat_muatan +
                `/scan?item_no=${val}&n=${this.listenNodeId}`,
                this.Helper.header())
            .then(res => {
              if(res.data.data.length > 0) {
                let arr = res.data.data
                arr.map(item => {
                  item["type"] = 'Bag'
                })
                this.dataTable = this.dataTable.concat(arr)
                // console.log(this.dataTable,'data')
              }

            }).catch(err => {
              this.openNotification('danger', 'Koli / Connote not found', err)
            })
        },
        actionPagination(val) {
          this.pagination.page = val
          this.refresh()
        },

        onChangeOrigin(type, val, info = {}){
          // console.log('type', type , val, info)
          if(this.manifest_method_id !== "" && type == 'manifest_method_id') {
              this.manifest_method_id !== val && this.resetForm()
              // setTimeout(function(){ }, 3000);
          }
          switch(type) {
            case 'vehicle_mode_id':
              if(info.hasOwnProperty('data')) {
                this.vehicle_type_id = info.data.vehicle_type_id || ''
                this.getDataVehicle()
              }
              break
            case 'manifest_method_id':
              this.manifest_method_id = val
              if(type == 'manifest_method_id' && val == 1){
                this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_visible", false)
                // this.jenisKiriman(true);
              }else if (type == 'manifest_method_id' && val != 1){
                // this.jenisKiriman(false);
                this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_visible", true)
              }
              if(info.hasOwnProperty('data')) {
                this.vehicle_mode_id = info.data.vehicle_mode_id || ''

                let url = this.URL.node +'/'+ this.listenNodeId +'/origin-link?n=' +this.listenNodeId+ '&vehicle_mode_id=' +this.vehicle_mode_id+ '&sort_order=desc&limit=15&page=1'
                this.autoComplateUrl = url

                this.getDataVehicleType()

              }
              break
            case 'vehicle_id':
              this.vehicle_id = val
              this.getDataEmployee()
              break
            case 'node_id_origin':
              if(Object.keys(info).length > 0) {
                if(info.hasOwnProperty('data')) {
                  this.node_id_origin = info['data']['node_id']
                  let url = this.URL.node +'/'+ this.node_id_origin +'/destination-link?n=' +this.listenNodeId+ '&vehicle_mode_id=' +this.vehicle_mode_id+ '&sort_order=desc&limit=15&page=1'
                  this.itterateUrlAutoComplete = url
                }
              }
              break
            case 'node_id_destination':
              if(typeof info === 'object') {
                if(info.hasOwnProperty('data')) {
                  this.estimated_time_in_hour = info['data'].estimated_time_in_hour
                  this.handleEta(this.etd, this.estimated_time_in_hour)
                }
              }
              break;
            case 'etd':
              this.etd = val
              this.handleEta(this.etd, this.estimated_time_in_hour)

              break;
            default:
              console.log(info)

          }

        },
        resetForm(){
          // this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData", [{label: null, value: null, data: {}}])
          this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_ORIGIN", "")
          this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_ORIGIN_ValueData", {})

          this.$store.dispatch("SET_SURAT_MUATAN_DYNAMICINPUTCOMPONENT_NODE_ID_TRANSIT", [])

          this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_DESTINATION", "")
          this.$store.dispatch("SET_SURAT_MUATAN_NODE_ID_DESTINATION_ValueData", {})

          this.$store.dispatch("SET_SURAT_MUATAN_PIC_EMPLOYEE_ID_ArrData", [])

          this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_MODE_ID", "")
          this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_MODE_ID_ArrData", [])

          this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ID", "")
          this.$store.dispatch("SET_SURAT_MUATAN_VEHICLE_ID_ArrData", [])

        },
        handleEta(dateTime, amount){
          if(dateTime && amount){
            let dateEta =  moment(dateTime).add(amount, 'hours').format('YYYY-MM-DD HH:mm:ss');
            this.$store.dispatch("SET_SURAT_MUATAN_ETA", dateEta)
          }
        },
        jenisKiriman(type){
          let arr = [
            {
              label:"DG",
              value:1,
            },{
              label:"Genko",
              value:2,
            },{
              label:"GoSynergy",
              value:3,
            },{
              label:"Special Cargo",
              value:4,
            }
          ];
          this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_TYPE_ID_visible", type)
          this.$store.dispatch("SET_SURAT_MUATAN_MANIFEST_TYPE_ID_ArrData", arr.length > 0 ? arr : null)
        }
    },
    mounted() {
        // this.getDataNodeorigin()
        // this.getDataNodeDestination()
        // this.getDataVehicleType()
        // this.getDataVehicle()

        this.getDataVehicleMode()
        // this.getDataEmployee()
    },
}
</script>
<style lang="scss">
@media (min-width: 1200px){
  .vs-dialog-content.custom-width .vs-dialog{
    min-width: 1000px;
  }
}

</style>
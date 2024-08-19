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
                    :querySearch="querySearch"
                />

                <template v-if="listenwithSchedule">
                    <!-- v-if="listenwithSchedule" -->
                    <div style="display:block; position: relative; text-align: left; padding-left: 8px;">
                        <p><b>Set Schedule:</b></p>
                        <template v-for="(item,key) in pickup_schedule">
                            <div :key="key">
                                <p>{{item.label}}</p>
                                <specialSchedule :arrData="item.time" :date="item.date" title="set_schedule" @updateValue="updateValue"/>
                            </div>
                        </template>
                    </div>
                </template>
            </div>


          <customerByPhone
              :active="dialogGetCustomer"
              :closeDialog="closeGetCustomer"
              title="customer"
              type="customer"
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
                    :loading="hasClicked"
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
            dialogGetCustomer:false,
            pickup_number:'',
            hasClicked: false,
            autoCompleteUrl: ''
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
        listenDataSchedule() {
            return this.$store.getters.getInputs.pickup_list.pickup_schedule || []
        },
        listenwithSchedule() {
            return this.withSchedule || false
        }
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                if (val.hasOwnProperty('node_destination')) {
                    console.log("INI", val)
                    this.$store.dispatch("SET_PICKUP_LIST_PICKUP_NODE_ID_DESTINATION", val.node_destination.node_name)
                }
                this.node_id = val.node_id
                this.pickup_number = val.pickup_number
            }
        },
        active: function (val) {
            if(val) {
                this.getDataVehicleType()
                this.getDataCourier()
            }
        },


    },
    methods: {
        initialize(){
            let url = this.URL.node +'?n=' +this.listenNodeId+ '&sort_order=desc&limit=15&page=1'
            this.autoCompleteUrl = url
        },
        formData(form){
            if (this.listenDataItem && this.listenDataItem.hasOwnProperty('pickup_courier_user_id') && this.listenDataItem['pickup_courier_user_id'] != null && this.listenDataItem['pickup_courier_user_id'] != "") {
                if(this.pickup_number !== undefined && this.pickup_number !== '') {
                    if (Number(this.listenDataItem['pickup_courier_user_id']) === Number(form['pickup_courier_user_id'])) {
                        form['pickup_status'] = this.listenDataItem['pickup_status']
                    } else {
                        form['pickup_status'] = 'HANDOVER'
                    }
                } else {
                    form['pickup_status'] = 'ASSIGNED'
                }
            } else if (this.listenDataItem && this.listenDataItem.hasOwnProperty('pickup_courier_user_id')) {
                form['pickup_status'] = this.listenDataItem['pickup_status']
            } else if (!this.listenDataItem && form['pickup_courier_user_id'] != null && form['pickup_courier_user_id'] != '') {
                form['pickup_status'] = 'ASSIGNED'
            }
          this.form = form
          let current = new Date();
          let minute = current.getMinutes()
          if(minute < 10){
            minute = '0'+minute
          }
          let hour = current.getHours()
          if(hour < 10){
            hour = '0'+hour
          }
          let time = hour + ":" + minute;          
          this.form.pickup_date = this.form.pickup_date + ' '+time

            if (this.form.hasOwnProperty("pickup_node_id_destination") && this.form.pickup_node_id_destination) {
                let objDestination = this.form.pickup_node_id_destination.node_id
                this.form['pickup_node_id_destination'] = objDestination
            } else if (this.listenDataItem && this.listenDataItem.hasOwnProperty('pickup_node_id_destination')) {
                this.form['pickup_node_id_destination'] = Number(this.listenDataItem.pickup_node_id_destination)
            }
            this.hasClicked = true;
          if(this.pickup_number !== undefined && this.pickup_number !== '') {
            this.form.pickup_number = this.pickup_number

            this.form.pickup_courier_employee_id = null
            this.form.pickup_courier_employee_code = null
            this.updateData()
          } else {
            this.node_id = this.listenNodeId
            this.form.pickup_node_id_requestor = this.node_id
            
            this.form.pickup_courier_employee_id = null
            this.form.pickup_courier_employee_code = null
            this.addData()
          }

          

        },
        handleSubmit(){
            this.$refs.formUserNodeController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.hasClicked = false;
            this.$refs.formUserNodeController.handleClearForm()
            this.form = {}
            this.node_id = ""
            this.pickup_number = ""
        },

        openGetCustomer() {
          this.dialogGetCustomer = true

        },
        closeGetCustomer() {
          this.dialogGetCustomer = false
        },
        updateValue(key, value) {
            if(Object.keys(value).length > 0 && key == 'customer') {
                this.forcererender = true
                this.$store.dispatch(`SET_PICKUP_LIST_PICKUP_NAME`, value.customer_name)
                this.$store.dispatch(`SET_PICKUP_LIST_PICKUP_PHONE_NUMBER`, value.customer_phone)
                this.$store.dispatch(`SET_PICKUP_LIST_PICKUP_ADDRESS`, value.geolocation_location_name)

                // let self = this
                // setTimeout(function(){ self.forcererender = false }, 100);

                let aaa = this.$store.getters.getInputs.pickup_list
            }
        },

        async getDataCourier(){
            await axios
                .get(this.URL.pickup_courier +`?n=${this.listenNodeId}`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            // obj["label"] = item.employee_name
                            // obj["value"] = item.employee_id
                            obj["label"] = item.user_login + ' - ' + item.user_name;
                            obj["value"] = item.user_id

                            arr.push(obj)
                        })
                        this.$store.dispatch("SET_PICKUP_LIST_PICKUP_COURIER_USER_ID_ArrData", arr.length > 0 ? arr : null)
                    }

                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getDataVehicleType(){
            await axios
                .get(this.URL.pickup_vehicle_type +
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
                        this.$store.dispatch("SET_PICKUP_LIST_VEHICLE_TYPE_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getDataNodeDestination(queryString = ''){
            await axios.get(this.autoCompleteUrl +`&s=${queryString}`, this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.node_name
                            obj["value"] = Number(item.node_id)

                            arr.push(obj)
                        })
                        // this.dataNodeType = arr
                        // this.$store.dispatch("SET_PICKUP_LIST_PICKUP_NODE_ID_DESTINATION_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        querySearch(queryString, cb){
            
            axios.get(this.autoCompleteUrl +`&s=${queryString}`, this.Helper.header())
            .then(res => {
                let result = res.data.data
                let suggestions = [];

                result.length > 0 && result.map(item => {
                    if(item.hasOwnProperty('node_name')) {
                        suggestions.push({
                                value: item['node_name']  + " (" + item.node_code + ")",
                                data: item
                        });
                    }
                })
                


                cb(suggestions);
                })
            .catch(error => console.log("error", error));
        },
        async updateData(){
            await axios
                .put(
                    this.URL.pickup + `/${this.pickup_number}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Update success', 'Update pickup is success')
                }).catch(err => {
                    this.hasClicked = false;
                    let message = err.response.data ? err.response.data.message : 'Update Failed'
                    this.loading = false
                    this.closeDialog()
                    this.handleClearForm()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Update failed', message)
                })
        },
        async addData() {
            await axios
                .post(
                    this.URL.pickup + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Create Success', 'Create new Pickup is success')
                }).catch(err => {
                    this.loading = false
                    this.hasClicked = false;
                    let message = err.response.data ? err.response.data.message : 'Create Failed'
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Create failed', message)
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        }
    },
    mounted() {
        this.initialize()
        // this.getDataNodeDestination()
    },
}
</script>
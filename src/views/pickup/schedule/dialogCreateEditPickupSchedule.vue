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
                    ref="formPickupScheduleController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    :querySearch="querySearch"
                    typeForm="pickup_schedule"
                    @onChangeCustom="onChangeCustom"
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
import specialSchedule from "@/components/input/specialSchedule"

export default {
    name:"dialog-create-edit-pickup-schedule",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
        "customerByPhone":customerByPhone,
        "specialSchedule": specialSchedule
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
            pickup_schedule_id:'',
            pickup_schedule: [
                {
                    date: 7,
                    label: 'Minggu',
                    time: []
                },
                {
                    date: 1,
                    label: 'Senin',
                    time: []
                },
                {
                    date: 2,
                    label: 'Selasa',
                    time: []
                },
                {
                    date: 3,
                    label: 'Rabu',
                    time: []
                },
                {
                    date: 4,
                    label: 'Kamis',
                    time: []
                },
                {
                    date: 5,
                    label: 'Jumat',
                    time: []
                },
                {
                    date: 6,
                    label: 'Sabtu',
                    time: []
                }
            ]
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
            return this.$store.getters.getInputs.pickup_schedule.pickup_schedule || []
        },
        listenwithSchedule() {
            return this.withSchedule || false
        }
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.node_id = val.node_id
                val.detail.map((item,index )=> {
                  if(item.day_of_week) {
                    this.pickup_schedule.map(itemschedule =>{
                      if(itemschedule['date'] == item.day_of_week){
                        itemschedule['time'].push(item.pickup_time)
                      }
                    })
                  }
                })
                this.pickup_schedule_id = val.pickup_schedule_id

            }
        },
        active: function (active) {
            if(active){
        this.getDataNodeDestination()
        this.getDataVehicleType()
        this.getDataCourier()


            }
        }

    },
    methods: {
        initialize() {
            if(this.listenDataSchedule.length > 0) {
                // better time complexity
                let obj = {}
                this.listenDataSchedule.map(item => {
                    if(item.date) {
                        obj[item.date] = item.time
                    }
                })

                this.pickup_schedule.map(item => {
                    if(obj.hasOwnProperty(item.date)) {
                        item.time = obj[item.date]
                    }
                })
            }
        },
        onChangeCustom(type, val, info = {}){
            switch(type) {
                case 'pickup_schedule_node_id_origin':
                    if(info.hasOwnProperty('data')) {
                        
                        this.pickup_schedule_node_id_origin = info.data.node_id || null
                        this.getDataNodeDestination(info.data.node_id || null)
                        
                        this.$store.dispatch(`SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NAME`, info.data.node_name || '')
                        this.$store.dispatch(`SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_PHONE_NUMBER`, info.data.node_phone || '')
                        this.$store.dispatch(`SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_ADDRESS`, info.data.default_node_alternate_address.node_alternate_address_address || '')                        
                        this.$store.dispatch(`SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_LATITUDE`, info.data.default_node_alternate_address.node_alternate_address_latitude || '')
                        this.$store.dispatch(`SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_LONGITUDE`, info.data.default_node_alternate_address.node_alternate_address_longitude || '')
                        
                        
                    }
                break
                case 'pickup_schedule_node_id_destination':
                    this.getDataCourier(val || null)
                break
                
            }
        },
        querySearch(queryString, cb){
            axios.get(this.URL.pickup_origin+`?n=${this.listenNodeId}&s=${queryString}`,
                this.Helper.header()
            )
            .then(res => {
                let result = res.data.data
                let suggestions = [];
                result.map(item => {
                    suggestions.push({
                        value: item['node_name'] + " (" + item.node_code + ")",
                        data: item
                    });
                });
                cb(suggestions);
            })
            .catch();
        },
        formData(form){
          this.form = form
          let current = new Date();
          let minute = current.getMinutes()
          if(minute < 10){
            minute = '0'+minute
          }
          let time = current.getHours() + ":" + minute;

          this.form.pickup_schedule_date = this.form.pickup_schedule_date + ' '+time


            // if(this.listenwithSchedule) {
                let schedule = []
                this.pickup_schedule.map(item => {
                    if(item.time.length > 0) {
                        schedule.push(item)
                    }
                })
                this.form['pickup_schedule_time'] = schedule
            // }


          if(this.pickup_schedule_id !== undefined && this.pickup_schedule_id !== '') {
            this.form.pickup_schedule_id = String(this.pickup_schedule_id)


            this.updateData()
          } else {
            this.node_id = this.listenNodeId
            this.form.pickup_node_id_requestor = this.node_id
            this.addData()
          }

          

        },
        handleSubmit(){
            this.$refs.formPickupScheduleController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formPickupScheduleController.handleClearForm()
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
        updateValue(key, value, info) {
            if(info !== undefined && info.title == 'set_schedule') {
                if(info.type == 'add') {
                    this.pickup_schedule.map(item => {
                        if(item.date == key) {
                            if(item.time.filter(val => val == value).length == 0) {
                                item.time.push(value)
                            }
                        }
                    })


                } else if(info.type == 'remove') {

                    this.pickup_schedule.map(item => {
                        if(item.date == key) {
                            let filteredAry = item.time.filter(e => e !== value)
                            item.time = filteredAry
                        }
                    })
                }
                

            } else if(Object.keys(value).length > 0 && key == 'customer') {
                this.forcererender = true
                this.$store.dispatch(`SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NAME`, value.customer_name)
                this.$store.dispatch(`SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_PHONE_NUMBER`, value.customer_phone)
                this.$store.dispatch(`SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_ADDRESS`, value.geolocation_location_name)

                // let self = this
                // setTimeout(function(){ self.forcererender = false }, 100);

                let aaa = this.$store.getters.getInputs.pickup_list

            }
        },

        async getDataCourier(node_destination = null){
            node_destination = node_destination!= null ? node_destination : this.listenNodeId;
            await axios
                .get(this.URL.node +
                `/${node_destination}/pickup-courier?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.user_name
                            obj["value"] = item.user_id

                            arr.push(obj)
                        })
                        this.$store.dispatch("SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_USER_COURIER_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', null, 'Roles data is empty!', ' Please create a new role data')
                    }

                }).catch(err => {
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
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
                        this.$store.dispatch("SET_PICKUP_SCHEDULE_VEHICLE_TYPE_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', null, 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
                })
        },
        async getDataNodeDestination(node_origin = null){
            node_origin = node_origin == null ? this.listenNodeId : node_origin;
            await axios
                .get(this.URL.node +
                `/${node_origin}/destination-link?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                this.Helper.header())
                .then(res => {

                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.node_name + " (" + item.node_code + ")",
                            obj["value"] = Number(item.node_id)

                            arr.push(obj)
                        })
                        // this.dataNodeType = arr
                        this.$store.dispatch("SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NODE_ID_DESTINATION_ArrData", arr.length > 0 ? arr : null)
                        this.$store.dispatch("SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NODE_ID_DESTINATION", null)
                        this.$store.dispatch("SET_PICKUP_SCHEDULE_PICKUP_SCHEDULE_NODE_ID_DESTINATION_ValueData", null)
                        
                        
                }).catch(err => {
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
                })
        },
        async updateData(){
            await axios
                .put(
                    this.URL.pickup_schedule + `/${this.pickup_schedule_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Update success', 'Update pickup is success')
                }).catch(err => {
                    this.loading = false
                    // this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Update failed', err)
                })
        },
        async addData() {

            await axios
                .post(
                    this.URL.pickup_schedule + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Create Success', 'Create new node is success')
                }).catch(err => {
                    this.loading = false
                    // this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Create failed', err)
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        }
    },
    mounted() {
        this.initialize()
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>
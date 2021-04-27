<template>
    <dialog-master 
    :actived="listenActive" 
    :closeDialog="cancel">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller 
                    ref="formVehicleController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    typeForm="vehicle"

                    :querySearch="querySearch"
                    @onChangeCustom="onFormChanged"
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
    name:"dialog-create-edit-vehicle",
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
            vehicle_id: '',
            autoComplateUrl: ""
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
                this.vehicle_id = val.vehicle_id
                this.vehicle_type_id = val.vehicle_type_id
                this.vehicle_mode_id = val.vehicle_mode_id
            }
        },
        active: function (val) {
            if (val == true) {
                // this.getNode()
                this.getVehicleMode()
                if(this.vehicle_mode_id != null && this.vehicle_mode_id != '' && this.vehicle_mode_id != 'undefined'){
                    this.getVehicleType(this.vehicle_mode_id)
                }
            }
        }
    },
    methods: {
        formData(form){
            form["vehicle_node_id"] = form["vehicle_node_id"]["node_id"]
            this.form = form
            if(this.vehicle_id !== undefined && this.vehicle_id !== '') {                    
                    this.updateData()
            } else {
                    this.addData()
            }
        },
        onFormChanged(componentId, value, obj){
            switch(componentId) {
                case 'vehicle_mode_id':
                        this.getVehicleType(value)
                    break;

                    default:
                        break;
            }
        },
        handleSubmit(){
            this.$refs.formVehicleController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formVehicleController.handleClearForm()
            this.form = {}
            this.vehicle_id = ""
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
        // async getNode(){
        //     await axios
        //         .get(this.URL.node + 
        //         `?n=${this.listenNodeId}&sort_order=desc&limit=50&page=1`, 
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

        //                 this.$store.dispatch("SET_VEHICLE_VEHICLE_NODE_ID_ArrData", arr.length > 0 ? arr : null)
        //             }
                    
        //         }).catch(err => {
        //             // this.openNotification('danger', 'Failed to collect role list', err)
        //         })
        // },
        async getVehicleMode(){
            await axios
                .get(this.URL.vehicle_mode + 
                `?n=${this.listenNodeId}&limit=20`, 
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

                        this.$store.dispatch("SET_VEHICLE_VEHICLE_MODE_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getVehicleType(vehicle_mode_id = null){
            
            this.$store.dispatch("SET_VEHICLE_VEHICLE_TYPE_ID", "");            
            if(this.vehicle_type_id != null && this.vehicle_type_id != '' && this.vehicle_type_id != 'undefined'){
                this.$store.dispatch("SET_VEHICLE_VEHICLE_TYPE_ID", this.vehicle_type_id);                            
            }
            this.$store.dispatch("SET_VEHICLE_VEHICLE_TYPE_ID_ArrData", []);

            let queryString = `?n=${this.listenNodeId}&sort_order=desc&limit=20&page=1`;

            if(vehicle_mode_id != null){
                queryString += `&vehicle_mode_id=${vehicle_mode_id}`
            }

            await axios
                .get(this.URL.vehicle_type + queryString, 
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

                        this.$store.dispatch("SET_VEHICLE_VEHICLE_TYPE_ID_ArrData", arr.length > 0 ? arr : null)
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async updateData(){
            await axios
                .put(
                    this.URL.vehicle + `/${this.vehicle_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', 'Update role is success')
                }).catch(err => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Update role is failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        async addData() {
            
            await axios
                .post(
                    this.URL.vehicle+`?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', res.data.message)
                }).catch(err => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Create new role is failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        }
    },
    mounted() {
        let url = this.URL.node +'?n='+ this.listenNodeId +'&sort_order=desc&limit=15&page=1'
        this.autoComplateUrl = url
    },
}
</script>
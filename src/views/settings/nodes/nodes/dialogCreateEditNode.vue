<template>
    <dialog-master 
    :actived="listenActive" 
    width="lg"
    :closeDialog="cancel">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller 
                    ref="formUserNodeController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    typeForm="node"
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
import Selector from "@/components/input/select"
export default {
    name:"dialog-create-edit-node",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
        "selector": Selector   
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
            form: {
                ip_address: []
            },
            node_id: '',
            ipAddress: [],
            ipAddressArray: [],
            pre_alert_sm: false,
            pre_alert_sj: false,
            pre_alert_bag: false
        }
    },
    computed: {
        listenActive(){
            if(this.active){
                this.getDataNodeType()
                this.getDataCustomer()
                this.getDataNode()
               this.getIpAddress()
                this.getDataAltAddress()
                
            }
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
                this.$store.dispatch("SET_NODE_NODE_ID_visible", true)
            }
        }
    },
    methods: {
        formData(form,value){
            this.form = form
            this.ipAddress = this.$store.getters.getInputs.value
 
            if(this.node_id !== undefined && this.node_id !== '') {
                if(this.form.hasOwnProperty('node_id')){
                  delete this.form.node_id
                }
                this.updateData()
            } else {
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
        async getDataNode(){
            await axios
                .get(this.URL.node + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, 
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
        async getIpAddress(){
            await axios
                .get(this.URL.node_ip_address + 
                `?n=${this.listenNodeId}`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let uniqueIPs = {};
                        res.data.data.forEach(item => {
                            if (item.ip_address !== null) {  
                                let ipAddresses = item.ip_address.split(',').map(address => address.trim()); 
                                ipAddresses.forEach(ip => {
                                    let cleanedIP = ip.replace(/[\[\]"]+/g, '');
                                    if (!uniqueIPs[cleanedIP]) {
                                        let obj = {};
                                        obj["label"] = cleanedIP;
                                        obj["value"] = cleanedIP;
                                        uniqueIPs[cleanedIP] = true; 
                                    }
                                });
                            }
                        });
                        let arr = Object.keys(uniqueIPs).map(ip => ({ label: ip, value: ip }));
                        this.$store.dispatch("SET_NODE_IP_ADDRESS_ArrData", arr.length > 0 ? arr : null)
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
                `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, 
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
                `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, 
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
                `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, 
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
                        this.$store.dispatch("SET_NODE_NODE_TYPE_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async getDataCustomer(){
            await axios
                .get(this.URL.customer + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.customer_code + ' ( ' + item.customer_name + ' ) '
                            obj["value"] = item.customer_code
                            arr.push(obj)
                        })

                        this.$store.dispatch("SET_NODE_NODE_CUSTOMER_CODE_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                }).catch(err => {
                    this.openNotification('danger', 'Failed to get Customer Code list', err)
                })
        },
        async updateData(){
            await axios
                .put(
                    this.URL.node + `/${this.node_id}?n=${this.listenNodeId}`,
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
                    this.openNotification('danger', 'Update failed', err.response.data.message)
                })

        },
        async addData() {

            await axios
                .post(
                    this.URL.node + `?n=${this.listenNodeId}`,
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
                    this.openNotification('danger', 'Create failed', err.response.data.message)
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        },
        updateFilter(key, value) {
        this.form.ip_address = value;
        this.$store.dispatch("SET_NODE_IP_ADDRESS_ArrData",{ key, value })

        switch(true) {
            case key.toLowerCase().includes("ipAddress"):
                this.ipAddress = value

                // this.$store.dispatch("SET_BAGGING_destination_selected", this.regional )
                break;
            case key.toLowerCase().includes("service"):
                this.service = value
                // this.$store.dispatch("SET_BAGGING_service_selected", this.service )
                break;
            default:
        }
        },
    },
    mounted() {
        // this.getDataNodeType()
        // this.getDataTariff()
    },
}
</script>
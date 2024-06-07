<template>
    <dialog-master 
        width="lg"
        :actived="listenActive" 
        :closeDialog="cancel"
    >
        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller
                    ref="formSlaController" 
                    typeForm="sla"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    :querySearch="querySearch"
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
    name:"dialog-create-edit-sla",
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
            form: {},
            serviceArray: [],
            originArray: [],
            destinationArray: [],
            customerNameArray: [],
            customerIdArray: [],
            activityArray: [],
            customerId: "",
            loadingDataOrigin: false,
            loadingDataDestination: false,
            loadingDataService: false,
            loadingDataCustomerName: false,
            loadingDataCustomerCode: false,
            loadingDataNode: false,
            loadingDataActivity: false,
            sla_id: ""
        }
    },
    computed: {
        listenActive(){
            if(this.active){
                this.getActivityName()
                this.getDataOrigin()
                this.getDataDestination()
                this.getDataService()
                this.getDataCustomerName()           
            }
            return this.active
        },
        listenTitle(){
            return this.title
        },
        listenDataItem() {
            return this.dataItem
        },
        listenCustomerName() {
            return this.$store.getters.getInputs.sla.customer_name.value;
        }
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.sla_id = val.sla_id
            }
        },
        listenCustomerName: {
            handler(newVal) {
                if (newVal !== null) {
                    this.getDataCustomerCode();
                }
            },
            immediate: true
        }
    },
    methods: {
        formData(form){
            for (const key in form) {
                if (key.endsWith('_radio')) {
                    const baseKey = key.slice(0, -6);
                    const radioValue = form[key];
                    const relatedKey = baseKey + (form.hasOwnProperty(baseKey) ? '' : '_radio');
                    
                    if (form.hasOwnProperty(relatedKey)) {
                        switch (radioValue) {
                            case 'hari':
                                form[relatedKey] *= 24 * 60;
                                this.$store.dispatch("SET_SLA_" + relatedKey.toUpperCase() + "_ArrValueData", 'menit');
                                break;
                            case 'jam':
                                form[relatedKey] *= 60;
                                this.$store.dispatch("SET_SLA_" + relatedKey.toUpperCase() + "_ArrValueData", 'menit');
                                break;
                            case 'menit':
                                break;
                            default:
                                break;
                        }

                        delete form[key];
                    }
                }
            }
            
            this.form = form
            if(this.sla_id !== undefined && this.sla_id !== '') {
                this.form.node_code = this.dataItem.node_code
                this.updateData()
            } else {
                this.addData()
            }
        },
        handleSubmit(){
            this.$refs.formSlaController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formSlaController.handleClearForm()
            this.form = {}
            this.sla_id = ""
        },
        async getActivityName() {
            this.loadingDataActivity = true
            await axios
                .get(this.URL.sla + `/activity-name?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            if (item.activity_name !== null) {
                                obj["label"] = item.activity_name
                                obj["value"] = item.activity_name

                                arr.push(obj)
                            }
                            
                        })
                        this.activityArray = arr
                        this.$store.dispatch("SET_SLA_ACTIVITY_NAME_ArrData", arr)
                    } else {
                        this.openNotification('warn', 'Activity data is empty!', ' Please create a new Activity data')
                    }
                    this.loadingDataActivity = false
                }).catch(err => {
                    this.loadingDataActivity = false
                    this.openNotification('danger', 'Failed to populate Activity list', err)
                })
        },        
        querySearch(queryString, cb){
            axios.get(this.URL.node +`?n=${this.listenNodeId}&s=${queryString}`, this.Helper.header())
            .then(res => {
                let result = res.data.data
                let suggestions = [];
                result.length > 0 && result.map(item => {
                    suggestions.push({
                        value: item['node_name'] + " (" + item['node_code'] + ")",
                        data: item.node_code
                    });
                });
                cb(suggestions);
                })
            .catch(error => console.log("error", error));
        },
        async getDataOrigin(){
            this.loadingDataOrigin = true
            await axios
                .get(this.URL.origin_code + `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            if (item.origin_code !== null) {
                                obj["label"] = item.origin_code
                                obj["value"] = item.origin_code

                                arr.push(obj)
                            }
                            
                        })
                        this.originArray = arr
                        this.$store.dispatch("SET_SLA_ORIGIN_ArrData", arr)
                    } else {
                        this.openNotification('warn', 'Origin data is empty!', ' Please create a new origin data')
                    }
                    this.loadingDataOrigin = false
                }).catch(err => {
                    this.loadingDataOrigin = false
                    this.openNotification('danger', 'Failed to populate service list', err)
                })
        },
        async getDataDestination(){
            this.loadingDataDestination = true
            await axios
                .get(this.URL.destination_code + `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            if (item.geolocation_subdistrict_tarif_code !== null) {
                                obj["label"] = item.geolocation_subdistrict_tarif_code
                                obj["value"] = item.geolocation_subdistrict_tarif_code

                                arr.push(obj)
                            }
                            
                        })
                        this.destinationArray = arr
                        this.$store.dispatch("SET_SLA_DESTINATION_ArrData", arr)
                    } else {
                        this.openNotification('warn', 'Destination data is empty!', ' Please create a new Destination data')
                    }
                    this.loadingDataDestination = false
                }).catch(err => {
                    this.loadingDataDestination = false
                    this.openNotification('danger', 'Failed to populate Destination list', err)
                })
        },
        async getDataService(){
            this.loadingDataService = true
            await axios
                .get(this.URL.service + `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.service_name
                            obj["value"] = item.service_code

                            arr.push(obj)
                        })
                        this.serviceArray = arr
                        this.$store.dispatch("SET_SLA_SERVICE_CODE_ArrData", arr)
                    } else {
                        this.openNotification('warn', 'Service data is empty!', ' Please create a new service data')
                    }
                    this.loadingDataService = false
                }).catch(err => {
                    this.loadingDataService = false
                    this.openNotification('danger', 'Failed to populate service list', err)
                })
        },
        async getDataCustomerName(){
            this.loadingDataCustomerName = true
            await axios
                .get(this.URL.customer + `/name?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.customer_name
                            obj["value"] = item.customer_name

                            arr.push(obj)
                        })
                        this.customerNameArray = arr
                        this.$store.dispatch("SET_SLA_CUSTOMER_NAME_ArrData", arr)
                    } else {
                        this.openNotification('warn', 'Customer Name data is empty!', ' Please create a new Customer Name data')
                    }
                    this.loadingDataCustomerName = false
                }).catch(err => {
                    this.loadingDataCustomerName = false
                    this.openNotification('danger', 'Failed to populate service list', err)
                })
        },
        async getDataCustomerCode(){
            this.loadingDataCustomerCode = true
            await axios
                .get(this.URL.customer + `/code?n=${this.listenNodeId}&customer_name=${this.listenCustomerName}&sort_order=desc&limit=1000&page=1`, this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.customer_code
                            obj["value"] = item.customer_code

                            arr.push(obj)
                        })
                        this.customerIdArray = arr
                        this.$store.dispatch("SET_SLA_CUSTOMER_CODE_ArrData", arr)
                    } else {
                        // this.openNotification('warn', 'Customer ID data is empty!', ' Please create a new Customer Id data')
                    }
                    this.loadingDataCustomerCode = false
                }).catch(err => {
                    this.loadingDataCustomerCode = false
                    this.openNotification('danger', 'Failed to populate service list', err)
                })
        },
        compareSharedProperties(obj1, obj2) {
            const keys1 = Object.keys(obj1).filter(key => key !== 'is_active');
            
            for (const key of keys1) {
                if (obj1[key] !== obj2[key]) {
                    return false;
                }
            }
            return true;
        },
        async updateData(){
            const isActiveDifferent = this.form.is_active !== this.dataItem.is_active;
            const areOthersEqual = this.compareSharedProperties(this.form, this.dataItem);

            if (isActiveDifferent && areOthersEqual) {
                await axios
                    .patch(
                        this.URL.sla + `/${this.sla_id}?n=${this.listenNodeId}`,
                        JSON.stringify({
                            is_active: this.form.is_active
                        }), 
                        this.Helper.header())
                    .then(res => {
                        this.handleClearForm()
                        this.closeDialog()
                        this.$emit("refresh")
                        this.openNotification(null, 'Update success', 'Update sla is success')
                    }).catch(err => {
                        this.loading = false
                        this.closeDialog()
                        this.$emit("refresh")
                        this.openNotification('danger', 'Update failed', err.response.data.message)
                    })
            } else {
                await axios
                    .put(
                        this.URL.sla + `/${this.sla_id}?n=${this.listenNodeId}`,
                        JSON.stringify(this.form), 
                        this.Helper.header())
                    .then(res => {
                        this.handleClearForm()
                        this.closeDialog()
                        this.$emit("refresh")
                        this.openNotification(null, 'Update success', 'Update sla is success')
                    }).catch(err => {
                        this.loading = false
                        this.closeDialog()
                        this.$emit("refresh")
                        this.openNotification('danger', 'Update failed', err.response.data.message)
                    })
            }
        },
        async addData() {
            await axios
                .post(
                    this.URL.sla + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Create Success', 'Create new sla is success')
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
    },
    created() {
    },
    mounted() {
    },
}
</script>
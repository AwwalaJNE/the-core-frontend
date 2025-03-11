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
                    typeForm="sla_node_to_node_b"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    :querySearch="querySearch"
                    :querySearch1="getDataNodeOrigin"
                    :querySearch2="getDataNodeDestination"
                    :querySearch3="getDataOrigin"
                    :permissionCreateSelect="checkPermission('create-sla-node-to-node-b')"
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
            typeArray: [
                {
                    label: "SJ",
                    value: "SJ"
                },
                {
                    label: "SM",
                    value: "SM"
                }
            ],
            deliveryZoneArray: [
                {
                    label: "A",
                    value: "A"
                }
            ],
            loadingDataOrigin: false,
            loadingDataNodeOrigin: false,
            loadingDataNodeDestination: false,
            loadingDataType: false,
            sla_id: "",
            queryOri: "",
            queryDest: ""
        }
    },
    computed: {
        listenActive(){
            if(this.active){
                this.getDataType()
            }
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
                this.sla_id = val.sla_id
            }
        },
    },
    methods: {
        checkPermission(permission) {
            const permissions = this.listenPermissions?.CORE || [];
            return permissions.includes(permission);
        },
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
                                this.$store.dispatch("SET_SLA_NODE_TO_NODE_B_" + relatedKey.toUpperCase() + "_ArrValueData", 'menit');
                                break;
                            case 'jam':
                                form[relatedKey] *= 60;
                                this.$store.dispatch("SET_SLA_NODE_TO_NODE_B_" + relatedKey.toUpperCase() + "_ArrValueData", 'menit');
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
        getDataOrigin(queryOri, cb){
            this.loadingDataOrigin = true
            axios
                .get(this.URL.origin_code + `?n=${this.listenNodeId}&s=${queryOri}&limit=100`, this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            if (item.origin_code !== null) {
                                obj["value"] = item.origin_code
                                obj["data"] = item.origin_code

                                arr.push(obj)
                            }
                            
                        })
                        cb(arr);
                    } else {
                        this.openNotification('warn', null, 'Origin data is empty!', ' Please create a new origin data')
                    }
                    this.loadingDataOrigin = false
                }).catch(err => {
                    this.loadingDataOrigin = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate service list', err)
                })
        },
        getDataNodeOrigin(queryOri, cb){
            this.loadingDataNodeOrigin = true
            axios
                .get(this.URL.node + `?n=${this.listenNodeId}&s=${queryOri}&limit=100`, this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            if (item.node_code !== null) {
                                obj["value"] = item.node_code
                                obj["data"] = item.node_code

                                arr.push(obj)
                            }
                            
                        })
                        cb(arr);
                    } else {
                        this.openNotification('warn', null, 'Origin data is empty!', ' Please create a new origin data')
                    }
                    this.loadingDataNodeOrigin = false
                }).catch(err => {
                    this.loadingDataNodeOrigin = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate service list', err)
                })
        },
        async getDataNodeDestination(queryDest, cb){
            this.loadingDataNodeDestination = true
            axios
                .get(this.URL.node + `?n=${this.listenNodeId}&s=${queryDest}&limit=100`, this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            if (item.node_code !== null) {
                                obj["value"] = item.node_code
                                obj["data"] = item.node_code

                                arr.push(obj)
                            }
                            
                        })
                        cb(arr);
                    } else {
                        this.openNotification('warn', null, 'Destination data is empty!', ' Please create a new destination data')
                    }
                    this.loadingDataNodeDestination = false
                }).catch(err => {
                    this.loadingDataNodeDestination = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate Destination list', err)
                })
        },
        getDataType(){
            this.$store.dispatch("SET_SLA_NODE_TO_NODE_B_TYPE_ArrData", this.typeArray)
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
                        this.URL.sla_node_to_node_b + `/${this.sla_id}?n=${this.listenNodeId}`,
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
                        this.openNotification('danger', err.response ? err.response.data.code : '', 'Update failed', err.response.data.message)
                    })
            } else {
                await axios
                    .put(
                        this.URL.sla_node_to_node_b + `/${this.sla_id}?n=${this.listenNodeId}`,
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
                        this.openNotification('danger', err.response ? err.response.data.code : '', 'Update failed', err.response.data.message)
                    })
            }
        },
        async addData() {
            await axios
                .post(
                    this.URL.sla_node_to_node_b + `?n=${this.listenNodeId}`,
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
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Create failed', err.response.data.message)
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
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>
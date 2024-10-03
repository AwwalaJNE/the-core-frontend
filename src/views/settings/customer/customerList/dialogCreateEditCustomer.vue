<template>
    <dialog-master 
    :actived="listenActive" 
    width="lg"
    :loading="listenLoading"
    :closeDialog="cancel">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller 
                    ref="formUserCustomerController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    :querySearch="querySearch"
                    typeForm="customer"
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
    name:"dialog-create-edit-customer",
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
            customer_id: '',
            loading:false,
            autoComplateUrl: "",
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
        listenLoading(){
            return this.loading
        },
    },
    watch: {
        dataItem: function (val) {
            if(val != undefined && val != null && val != '') {
                this.customer_id = val.customer_id
            }
        },
        active: function (val) {
            if(val == true) {
                let url = this.URL.node +'?n='+ this.listenNodeId +'&sort_order=desc&limit=15&page=1'
                this.autoComplateUrl = url

                // this.getDataNodeId()
                this.getDataCustomerType()
                this.getDataSubdistrict()
            }
        }
    },
    methods: {
        formData(form){
            form["n"] = form["n"]["node_id"]
            form["customer_default_node_id"] = form["customer_default_node_id"]["node_id"]
            this.form = form
            if(this.customer_id !== undefined && this.customer_id !== '') {
                    this.loading=true;
                    this.updateData()
            } else {
                    this.addData()
            }
        },
        handleSubmit(){
            this.$refs.formUserCustomerController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formUserCustomerController.handleClearForm()
            this.form = {}
            this.customer_id = ""
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
                    if(item.hasOwnProperty("node_name")) {
                        suggestions.push({
                                value: item["node_name"],
                                data: item
                        });
                    }
                })
                

                // console.log('suggestions', suggestions)

                cb(suggestions);
                })
            .catch(error => console.log("error", error));
        },
        async getDataSubdistrict(){
            this.loading = true
            await axios
                .get(this.URL.geolocation_subdistrict + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=10&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.geolocation_subdistrict_name
                            obj["value"] = item.geolocation_subdistrict_id

                            arr.push(obj)
                        })
                        
                        this.$store.dispatch("SET_CUSTOMER_CUSTOMER_SUBDISTRICT_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', null, 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
                })
        },
        async getDataCustomerType(){
            this.loading = true
            await axios
                .get(this.URL.customer_type + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=100&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.customer_type_name
                            obj["value"] = item.customer_type_id

                            arr.push(obj)
                        })
                        
                        this.$store.dispatch("SET_CUSTOMER_CUSTOMER_TYPE_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', null, 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
                })
        },
        // async getDataNodeId(){
        //     this.loading = true
        //     await axios
        //         .get(this.URL.node + 
        //         `?n=${this.listenNodeId}&sort_order=desc&limit=10&page=1`, 
        //         this.Helper.header())
        //         .then(res => {
        //             console.log(res.data.data,'him')
        //             if(res.data.data.length > 0) {
        //                 let arr = []
        //                 let arr_n = []
        //                 res.data.data.map(item => {
        //                     let obj = {}
        //                     let obj_n = {}
        //                     obj["label"] = item.node_name
        //                     obj["value"] = item.default_node_link_id

        //                     obj_n["label"] = item.node_name
        //                     obj_n["value"] = item.node_id

        //                     arr.push(obj)
        //                     arr_n.push(obj_n)
        //                 })
                        
        //                 this.$store.dispatch("SET_CUSTOMER_CUSTOMER_DEFAULT_NODE_ID_ArrData", arr_n.length > 0 ? arr_n : null)
        //                 this.$store.dispatch("SET_CUSTOMER_N_ArrData", arr_n.length > 0 ? arr_n : null)
        //             } else {
        //                 // this.openNotification('warn', null, 'Roles data is empty!', ' Please create a new role data')
        //             }
                    
        //             this.loading = false
        //         }).catch(err => {
        //             this.loading = false
        //             // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
        //         })
        // },
        async updateData(){
            await axios
                .put(
                    this.URL.customer + `/${this.customer_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.loading = false
                    this.openNotification(null, 'Update success', 'Update customer is success')
                }).catch(err => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Update failed', err)
                })
        },
        async addData() {

            await axios
                .post(
                    this.URL.customer + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Create Success', 'Create new customer is success')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Create failed', err)
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        },
        
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>
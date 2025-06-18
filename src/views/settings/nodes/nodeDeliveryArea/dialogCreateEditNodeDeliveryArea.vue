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
                    ref="formNodeDeliveryAreaController"
                    typeForm="node_delivery_area"
                    :dataItem="listenDataItem"
                    :querySearch="querySearch"
                    @inputFocus="inputFocus"
                    @formData="formData"
                />
            </div>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="3">
                    <vs-button
                        block
                        danger
                        flat
                        transparent
                        :active="true"
                        @click="cancel"
                    >
                        Cancel
                    </vs-button>
                </vs-col>
                <vs-col w="3">
                    <vs-button
                        block
                        flat
                        transparent
                        type="submit"
                        :active="true"                    
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

export default {
    name:"dialog-create-edit-node-delivery-area",
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
            autoComplateUrl: "",
            flag: "",
            form: {},
            node_delivery_id: '',
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
                this.getDataDetail(val)
            }
        }
    },
    methods: {
        async getDataDetail(val){
            this.node_delivery_id = val.node_delivery_id

            this.$store.dispatch("SET_NODE_DELIVERY_AREA_NODE_CODE_ValueData", val.node_code)
            this.$store.dispatch("SET_NODE_DELIVERY_AREA_DESTINATION_CODE_ValueData", val.destination_code)
            this.$store.dispatch("SET_NODE_DELIVERY_AREA_IS_ACTIVE_ValueData", val.is_active)
        },
        formData(form){
            form["node_code"] = form["node_code"]["node_code"] ? form["node_code"]["node_code"] : form["node_code"]
            form["destination_code"] = form["destination_code"]["geolocation_subdistrict_tarif_code"] ? form["destination_code"]["geolocation_subdistrict_tarif_code"] : form["destination_code"]
            form["is_active"] = form["is_active"] ? '1' : '0'
            this.form = form

            if(this.node_delivery_id !== undefined && this.node_delivery_id !== '') {
                this.form.node_delivery_id = this.node_delivery_id
                this.updateData()
            } else {
                this.addData()
            }
        },
        handleSubmit(){
            this.$refs.formNodeDeliveryAreaController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formNodeDeliveryAreaController.handleClearForm()
            this.form = {}
            this.node_delivery_id = ""
        },
        querySearch(queryString, cb){
            axios.get(this.autoComplateUrl +`&s=${queryString}`, this.Helper.header())
            .then(res => {
                let result = res.data.data
                let suggestions = [];

                result.length > 0 && result.map(item => {
                    if(item.hasOwnProperty(this.flag)) {
                        suggestions.push({
                            value: item[this.flag],
                            data: item
                        });
                    }
                })
                cb(suggestions);
            })
            .catch(error => console.log("error", error));
        },
        inputFocus(info) {
            let key = info.hasOwnProperty("key") ? info["key"] : ""
            let url = ""
            this.autoComplateUrl = url
            switch(key) {
                case "node_id_destination":
                    url = this.URL.node +'?n='+ this.listenNodeId +'&sort_order=desc&limit=15&page=1'
                    this.autoComplateUrl = url
                    this.flag = "node_name"
                    break;
                case "destination_code":
                    url = this.URL.destination_code +'?n='+ this.listenNodeId +'&sort_order=desc&limit=15&page=1'
                    this.autoComplateUrl = url
                    this.flag = "geolocation_subdistrict_tarif_code"
                    break;
                default:
                    //
            }
        },
        async updateData(){
            await axios
                .put(
                    this.URL.node_delivery_area + `/${this.node_delivery_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Update success', res.data.message)
                }).catch(err => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Update failed', err.response.data.message)
                })
        },
        async addData() {
            await axios
                .post(
                    this.URL.node_delivery_area + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Create Success', res.data.message)
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
            this.autoComplateUrl = ""
            this.flag = ""
        }
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>
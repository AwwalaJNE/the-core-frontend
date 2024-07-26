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
                    ref="formNodeLinkController"
                    typeForm="nodeLink"
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
            node_link_id: '',            
            searchByNode: "node_name",
            searchByVehicle: "vehicle_type_name",
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
                this.node_link_id = val.node_link_id
            }
        }
    },
    methods: {
        formData(form){
            form["node_link_origin_id"] = form["node_link_origin_id"]["node_id"]
            form["node_link_destination_id"] = form["node_link_destination_id"]["node_id"]
            form["node_link_vehicle_mode_id"] = form["node_link_vehicle_mode_id"]["vehicle_mode_id"]
            this.form = form

            if(this.node_link_id !== undefined && this.node_link_id !== '') {
                this.form.node_link_id = this.node_link_id
                this.updateData()
            } else {
                this.addData()
            }
        },
        handleSubmit(){
            this.$refs.formNodeLinkController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formNodeLinkController.handleClearForm()
            this.form = {}
            this.node_link_id = ""
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
                case "node_link_origin_id":
                    url = this.URL.node +'?n='+ this.listenNodeId +'&sort_order=desc&limit=15&page=1'
                    this.autoComplateUrl = url
                    this.flag = "node_name"
                    break;
                case "node_link_destination_id":
                    url = this.URL.node +'?n='+ this.listenNodeId +'&sort_order=desc&limit=15&page=1'
                    this.autoComplateUrl = url
                    this.flag = "node_name"
                    break;
                case "node_link_vehicle_mode_id":
                    url = this.URL.vehicle_mode +'?n='+ this.listenNodeId +'&sort_order=desc&limit=15&page=1'
                    this.autoComplateUrl = url
                    this.flag = "vehicle_mode_name"
                    break;
                default:
                    //
            }
        },
        async updateData(){
            await axios
                .put(
                    this.URL.node_link + `/${this.node_link_id}?n=${this.listenNodeId}`,
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
                    this.URL.node_link + `?n=${this.listenNodeId}`,
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
            this.autoComplateUrl = ""
            this.flag = ""
        }
    },
    mounted() {
    },
}
</script>
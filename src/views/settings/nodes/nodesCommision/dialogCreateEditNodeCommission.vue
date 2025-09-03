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
                    ref="formNodeCommisionController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    :querySearch="querySearch"
                    :data-testid="`form`"
                    typeForm="node_commission"
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
                    :data-testid="`cancel-button`"
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
                    :data-testid="`submit-button`"
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
    name:"dialog-create-edit-node-commision",
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
            node_commission_id: '',
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
                this.node_commission_id = val.node_commission_id
            }
        },
        active: function (val) {
            if(val == true) {
                let url = this.URL.node +'?n='+ this.listenNodeId +'&sort_order=desc&limit=15&page=1'
                this.autoComplateUrl = url
            }
        }
    },
    methods: {
        formData(form){
          form["node_id"] = form['node_id']['node_id']
          this.form = form
            if(this.node_commission_id !== undefined && this.node_commission_id !== '') {
                    this.updateData()
            } else {
                    this.addData()
            }
        },
        handleSubmit(){
            this.$refs.formNodeCommisionController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.$refs.formNodeCommisionController.handleClearForm()
            this.form = {}
            this.node_commission_id = ""
        },

        querySearch(queryString, cb){
            
            // let flag = this.listenFla
            axios.get(this.autoComplateUrl +`&s=${queryString}`, this.Helper.header())
            .then(res => {
                let result = res.data.data
 
                let suggestions = [];

                result.length > 0 && result.map(item => {
                    if(item.hasOwnProperty('node_name')) {
                        suggestions.push({
                                value: item['node_name'],
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
                    this.URL.node_commission + `/${this.node_commission_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form),
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', 'Update Node Commission is success')
                }).catch(err => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Update role is failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        async addData() {
            await axios
                .post(
                    this.URL.node_commission + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', 'Create new Node Commission is success')
                }).catch(err => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Create new Node Commission is failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        }
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>
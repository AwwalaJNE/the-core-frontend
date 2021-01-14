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
                    ref="formNodeLinkController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    typeForm="nodeLink"
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
    name:"dialog-create-edit-node-link",
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
            node_link_id: ''
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
            this.form = form
            if(this.node_link_id !== undefined && this.node_link_id !== '') {
                    console.log('update')
                    this.form.node_link_id = this.node_link_id
                    this.updateData()
            } else {
                    console.log('create new')
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
                        this.$store.dispatch("SET_NODELINK_NODE_LINK_ORIGIN_ID_ArrData", arr.length > 0 ? arr : null)
                        this.$store.dispatch("SET_NODELINK_NODE_LINK_DESTINATION_ID_ArrData", arr.length > 0 ? arr : null)
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    
                }).catch(err => {
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },

        async getVehicleMode(){
        await axios
            .get(this.URL.vehicle_mode +
                `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`,
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

                this.$store.dispatch("SET_NODELINK_NODE_LINK_VEHICLE_MODE_ID_ArrData", arr.length > 0 ? arr : null)
              } else {
                // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
              }

            }).catch(err => {
              // this.openNotification('danger', 'Failed to collect role list', err)
            })
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
            console.log('form', this.form)
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
        }
    },
    mounted() {
      this.getDataNode()
      this.getVehicleMode()
    },
}
</script>
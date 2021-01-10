<template>
    <dialog-master 
    :actived="listenActive" 
    :loading="listenLoading"
    :closeDialog="cancel">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
              <template v-if="DataArr.length > 0">
                <vs-select
                    class="m-select"
                    filter
                    :multiple="false"
                    placeholder="Select Link Request"
                    label="Request To"
                    v-model="node_request"
                    :border="true"
                    @change="updateValue"
                >
                  <template v-if="DataArr.length > 0">
                    <vs-option
                        v-for="(item,key) in DataArr"
                        :key="key"
                        :label="item.label"
                        :value="item.value">
                      {{item.label}}
                    </vs-option>
                  </template>

                </vs-select>
              </template>

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
import DialogMaster from "@/components/dialog/dialogMaster"
export default {
    name:"dialog-create-pickupRequest",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
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
            DataArr:[],
            loading:false,
            node_request:''
        }
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenLoading(){
            return this.loading
        },
        listenTitle(){
            return this.title
        },
        listenDataItem() {
            return this.dataItem
        },
        listenFormKey(){
          return this.formKey || ''
        },
    },
    mounted() {
      this.getTableData();
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.tariff_special_id = val.tariff_special_id
            }
        }
    },
    methods: {
        handleSubmit(){
            this.form.pickup_node_id_destination= this.node_request
            this.loading = true
            this.addData() // trigger function submit form dari luar component formInputController
        },
        handleClearForm(){
            this.node_request=''
            this.form = {}
        },
        updateValue(val){

        },

        async addData() {
            await axios
                .post(
                    this.URL.pickup_request + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.loading = false
                    this.$emit("refresh")
                    this.openNotification(null, 'Success', 'Create pickup request is success')
                }).catch(err => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit("refresh")
                    this.openNotification('danger', 'Create pickup request is failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        cancel() {
            this.loading = false
            this.handleClearForm()
            this.closeDialog()

        },
        async getTableData() {
          this.loading = true
          await axios
              .get(this.URL.node +
                  `/${this.listenNodeId}/destination-link?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&s=`,
                  this.Helper.header())
              .then(res => {
                if(res.data.data.length > 0) {
                  res.data.data.map(item => {
                    let obj = {}
                    obj["label"] = item.node_name
                    obj["value"] = item.node_id

                    this.DataArr.push(obj)
                  })
                }

                this.loading = false
              }).catch(err => {
                this.loading = false
                this.openNotification('danger', 'Failed to populate node list', err)
              })
        },
    },
}
</script>
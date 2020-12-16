<template>
    <dialog-master 
    :actived="listenActive" 
    :closeDialog="cancel">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
              <vs-select
                  class="m-select"
                  filter
                  :multiple="listenIsMultiple"
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
            node_request:''
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
        listenFormKey(){
          return this.formKey || ''
        },
        listenIsMultiple(){
          return this.isMultiple ? this.isMultiple : false
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
                    this.URL.tariff_special,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.handleClearForm()
                    this.closeDialog()
                    this.openNotification(null, 'Success', 'Create pickup request is success')
                }).catch(err => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.openNotification('danger', 'Create pickup request is failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        },
        async getTableData() {
          this.loading = true
          await axios
              .get(this.URL.node +
                  `?n=1&sort_order=desc&&limit=1000&page=1&s=`,
                  this.Helper.header())
              .then(res => {
                console.log('link', res)
                if(res.data.data.length > 0) {
                  res.data.data.map(item => {
                    let obj = {}
                    obj["label"] = item.node_code
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
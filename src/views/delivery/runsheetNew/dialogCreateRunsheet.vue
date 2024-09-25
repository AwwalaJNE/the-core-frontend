<template>
    <dialog-master 
        width="md"
        :actived="listenActive" 
        :loading="listenLoading"
        :closeDialog="cancel"
    >

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <selector 
                    ref="courier"
                    name="Courier" 
                    formKey="courier"
                    :rules="''" 
                    :valueData="courier_arr"
                    :selectedValue="''"
                    :isMultiple="false"
                    @updateValue="updateValue" 
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

import DialogMaster from "@/components/dialog/dialogMaster"
import FormInputController from "@/components/form/formInputController"
import Selector from "@/components/input/select"

export default {
    name:"dialog-create-runsheet",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,   
        "selector": Selector
    },
    props: {
        active: Boolean,
        btnRed: String,
        btnBlue: String,
        closeDialog: Function, 
        dataItem: Object,
        title: String
    },
    data() {
        return {
            loading: false,
            employee_id: '',
            courier_arr: []
        }
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenTitle(){
            return this.title
        },
        listenLoading(){
            return this.loading
        },
    },
    watch: {
        active: function (val) {
            if (val == true) {
                this.getDataCourier()
            }
        }
    },
    methods: {
        handleSubmit(){
            if (this.employee_id) {
                this.$router.push({ 
                    name: 'delivery-runsheet-new', 
                    params: { 
                        employee_id: this.employee_id
                    } 
                });
            } else {
                this.openNotification("warning", null, "Warning", "Courier not choosen yet");
            }
        },
        updateValue(key, val, info){
            switch(key) {
                case "courier":
                    let obj = this.courier_arr.filter(item => item.value == val)[0]

                    if(Object.keys(obj).length > 0) {
                        if(obj.hasOwnProperty('item')) {
                            this.employee_id = obj.item.employee_id || ''
                        }
                    }
                    break;
            }
        },
        async getDataCourier() {
            this.loading = true;

            await axios
                .get(this.URL.courier_delivery + `/list?n=${this.listenNodeId}`, this.Helper.header())
                .then(res => { 
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.employee_name + ' ( ' + item.employee_code + ' ) '
                            obj["value"] = item.employee_id
                            obj["item"] = item

                            arr.push(obj)
                        })

                        if(arr.length == 0) {
                            arr = [{'label': null, 'value': null}]
                        }

                        this.courier_arr = arr
                    } else {
                        this.openNotification('warn', null, 'Delivery courier data is empty!', ' Please create a new courier delivery')
                    }
                }).catch(err => {
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate delivery courier list', err.response ? err.response.data.message : 'something went wrong')
                })

            this.loading = false
        },
        handleClearForm(){
            this.employee = ""
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        }
    },
}
</script>
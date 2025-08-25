<template>
    <dialog-master 
        width="lg"
        :actived="listenActive" 
        :closeDialog="cancel"
        :loading="listenLoading"
    >
        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller
                    ref="formBagWeight" 
                    typeForm="bag_weight"
                    :dataItem="listenDataItem"
                    :querySearch="querySearch"
                    :data-testid="`form`"
                    @formData="formData"
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

import DialogMaster from "@/components/dialog/dialogMaster"
import FormInputController from "@/components/form/formInputController"
import Selector from "@/components/input/select"

export default {
    name:"bag-weight-dialog",
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
       title: String,
    },
    data() {
        return {
            form: {},
            loading: false,
            loadingDataService: false,
            bag_weight_setting_id: "",
        }
    },
    computed: {
        listenActive(){
            if(this.active){
                this.getDataService();
            }
            return this.active;
        },
        listenTitle(){
            return this.title;
        },
        listenDataItem() {
            return this.dataItem;
        },
        listenLoading() {
            return this.loading || this.loadingDataService;
        },
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.getEditData(val);
            }
        },
    },
    methods: {
        getEditData(val) {
            this.bag_weight_setting_id = val.bag_weight_setting_id;
            this.dataItem = val;
            
            let curr_destination_arr = [{
                label: val.destination,
                value: val.destination
            }]

            this.$store.dispatch("SET_BAG_WEIGHT_DESTINATION", val.destination);
            this.$store.dispatch("SET_BAG_WEIGHT_DESTINATION_ValueData", val.destination);
            this.$store.dispatch("SET_BAG_WEIGHT_DESTINATION_ArrData", curr_destination_arr);
        },
        formData(form){
            this.form = form;
            
            if(this.bag_weight_setting_id !== undefined && this.bag_weight_setting_id !== '') {
                this.updateData()
            } else {
                this.addData()
            }
        },
        handleSubmit(){
            this.$refs.formBagWeight.handleSubmit();
        },
        querySearch(queryString, cb){
            axios.get(`${this.URL.node_list}?n=${this.listenNodeId}&s=${queryString}`, this.Helper.header())
                .then(res => {
                    let result = res.data.data
                    let suggestions = [];
                    result.length > 0 && result.map(item => {

                        suggestions.push({
                            value: item['node_name'],
                            data: item['node_code']
                        });
                    });
                    cb(suggestions);
                    })
                .catch(error => console.log("error", error));
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
                            obj["label"] = item.service_code
                            obj["value"] = item.service_code

                            arr.push(obj)
                        })
                        this.$store.dispatch("SET_BAG_WEIGHT_SERVICE_TYPE_ArrData", arr)
                    } else {
                        this.openNotification('warn', null, 'Service data is empty!', ' Please create a new service data')
                    }
                    this.loadingDataService = false
                }).catch(err => {
                    this.loadingDataService = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate service list', err)
                })
        },
        async updateData() {
            this.loading = true;
            try {
                const res = await axios.put(`${this.URL.bag_weight_setting}/${this.bag_weight_setting_id}?n=${this.listenNodeId}`, JSON.stringify(this.form), this.Helper.header());                

                this.openNotification('success', null, "Success", res?.data?.message || "Update Success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
                this.cancel();
            }
        },
        async addData() {
            this.loading = true;
            try {
                const res = await axios.post(`${this.URL.bag_weight_setting}?n=${this.listenNodeId}`, JSON.stringify(this.form), this.Helper.header());                

                this.openNotification('success', null, "Success", res?.data?.message || "Create Success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
                this.cancel(); 
            }
        },
        handleClearForm(){
            this.$refs.formBagWeight.handleClearForm();
            this.form = {}
            this.bag_weight_setting_id = ""
        },
        cancel() {
            this.closeDialog();
            this.handleClearForm();
            this.$emit("refresh");
        },
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>
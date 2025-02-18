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
                    ref="formDataController" 
                    typeForm="application_role"
                    :dataItem="listenDataItem"
                    @formData="formData"
                />
            </div>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end" style="margin-top: 2rem;">
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
import master from "@/mixins/master";

import DialogMaster from "@/components/dialog/dialogMaster";
import FormInputController from "@/components/form/formInputController";
import Selector from "@/components/input/select";

export default {
    name:"application-role-dialog",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
        "selector": Selector   
    },
    props: {
        active: Boolean,
        btnBlue: String,
        closeDialog: Function,
        dataItem: Object,
        title: String
    },
    data() {
        return {
            form: {},
            app_role_id: "",
            loading: false,
        }
    },
    computed: {
        listenActive(){
            if (this.active) {
                this.getApplicationList();
            }
            return this.active;
        },
        listenTitle(){
            return this.title;
        },
        listenLoading() {
            return this.loading;
        },
        listenDataItem() {
            return this.dataItem;
        }
    },
    watch: {
        dataItem: function (val) {
            if(val !== undefined) {
                this.getDataDetail(val)
            }
        },
    },
    methods: {
        async getDataDetail(val){
            this.app_role_id = val.app_role_id;
        },
        async getApplicationList() {
            this.loading = true;

            try {
                const res = await axios.get(`${this.URL.application_list}?n=${this.listenNodeId}`, this.Helper.header());

                if (res.data.data.length > 0) {
                    let arr = res.data.data;

                    arr = arr.map(item => ({
                        label: item.lov_value,
                        value: item.lov_value,
                        item: item
                    }));

                    this.$store.dispatch("SET_APPLICATION_ROLE_APP_ArrData", arr)
                } else {
                    this.$store.dispatch("SET_APPLICATION_ROLE_APP", "");
                    this.$store.dispatch("SET_APPLICATION_ROLE_APP_ArrData", []);
                    this.openNotification('warn', null, 'Application list data is empty!', ' Please create a new application list')
                }
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        formData(form){
            const { id, ...formWithoutId } = form;

            this.form = formWithoutId;
            this.handleSubmitData();
        },
        async handleSubmitData() {
            this.loading = true;
            try {
                const url = `${this.URL.application_role}${this.app_role_id ? `/${this.app_role_id}` : ''}?n=${this.listenNodeId}`;
                const method = this.app_role_id ? 'put' : 'post';
                const res = await axios[method](url, this.form, this.Helper.header());

                this.openNotification('success', null, "Success", res?.data?.message || this.app_role_id ? "Success Update Data" : "Success Create Data");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
                this.cancel();
            }
        },
        handleSubmit(){
            this.$refs.formDataController.handleSubmit();
        },
        handleClearForm(){
            this.$refs.formDataController.handleClearForm();
            this.form = {}
            this.app_role_id = ""
        },
        cancel() {
            this.handleClearForm();
            this.$emit("refresh");
            this.closeDialog();
        },
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>
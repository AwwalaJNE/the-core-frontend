<template>
    <dialog-master 
        width="lg"
        :actived="listenActive" 
        :closeDialog="cancel"
        :loading="listenLoading"
    >

        <template v-slot:header>
            {{ listenTitle }}
        </template>

        <template v-slot:content>
            <vs-row>
                <vs-col xs="6" sm="6" lg="6">
                    <form @submit.prevent="scanConnote">
                    <vs-input
                        type="text"
                        autofocus
                        v-model="connote_number"
                        v-uppercase
                        label-placeholder="Nomer Connote"
                        :disabled="Object.keys(dataItem).length > 0"
                    />
                    </form>
                </vs-col>
                <vs-col xs="6" sm="6" lg="6" v-if="status === 'PS3' && connote_number && !isCreateManually">
                    <vs-input
                        type="text"
                        autofocus
                        v-model="crisscross_number"
                        v-uppercase
                        label-placeholder="New Connote"
                        :disabled="crisscross_number"
                    />
                </vs-col>
            </vs-row>
            
            <template v-if="status === 'PS3' && crisscross_number === ''">
                <div v-if="!isCreateManually">
                    <hr>
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <span class="crisscross-title">Choose Crisscross Number</span>
                        <div class="change-container">
                            <span 
                                class="change-link"
                                @click="selectCreate"
                            >
                                Create Manually
                            </span>
                        </div>
                    </div>
                    <div class="mt-05 mb-2 ">
                        <table-master 
                            hideColumnKey="dialog-connote-forward"
                            :dataTable="dataTable" 
                            :dataColumn="datacolumn" 
                            :tableLoading="loading"
                            :pageSize="pagination.page_size"
                            :page="pagination.page"
                            :hasLinked="['connote_number']"
                            :limit="pagination.limit"
                            :hasPagination="true"
                            :hasAction="false"
                            :onRowClickSelected="onRowClickSelected"
                            @actionLimit="actionLimit"
                            @actionPagination="actionPagination"
                            @handleEdit="handleEdit"
                        />
                    </div>
                </div>
            </template>

            <template v-if="status === 'PS2' || crisscross_number || isCreateManually">
                <hr>
                <div class="change-container">
                    <span 
                        class="change-link" 
                        @click="crisscross_number ? resetCrisscross() : selectCreate()" 
                        v-if="crisscross_number || isCreateManually"
                    >
                        {{ crisscross_number ? 'Change Crisscross' : 'Create Using Crisscross' }}
                    </span>
                </div>

                <div style="position: relative; display: flex; justify-content: flex-end;" v-if="status === 'PS2'">
                    <vs-switch v-model="isEdit">Edit</vs-switch>
                </div>

                <vs-row justify="space-between">
                    <vs-col :xs="12" :sm="12" :lg="12">
                        <div class="address_box">
                            <form-input-controller
                                ref="irreguralitiesReturnDestination"
                                typeForm="connote_forward"
                                :dataItem="dataItem"
                                :isDisabled="!!crisscross_number"
                                :querySearch="querySearch"
                                @formData="formData"
                                @onChangeCustom="onChangeCustom"
                            />
                        </div>
                    </vs-col>
                </vs-row>
            </template>

        </template>

        <template v-slot:footer v-if="status === 'PS2' || (status === 'PS3' && crisscross_number) || (status === 'PS3' && isCreateManually)">
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
                       Submit
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
import TableMaster from "@/components/table/tableMaster";


export default {
    name:"connote-forward-dialog",
    mixins:[master],
    components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
        "selector": Selector,
        "table-master" : TableMaster,
    },
    props: {
        active: Boolean,
        closeDialog: Function,
        title: String
    },
    computed: {
        listenActive(){
            return this.active;
        },
        listenTitle() {
            return this.title;
        },
        listenLoading() {
            return this.loading;
        },
        nodeOrigin() {
            return this.listenNode.length > 0 ? this.listenNode[0].origin_code : null;
        }
    },
    watch: {
        isEdit: function (val) {
            if (val == false) {
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ADDRESS_TYPE_isDisabled", true);

                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_NAME_isDisabled", true);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_PHONE_NUMBER_isDisabled", true);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_EMAIL_isDisabled", true);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_STREET_ADDRESS_isDisabled", true);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_ADMINISTRATIVE_ADDRESS_isDisabled", true);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_ZIP_CODE_isDisabled", true);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_TARIFF_CODE_isDisabled", true);

                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_NAME_isDisabled", true);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_PHONE_NUMBER_isDisabled", true);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_EMAIL_isDisabled", true);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_STREET_ADDRESS_isDisabled", true);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ADMINISTRATIVE_ADDRESS_isDisabled", true);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ZIP_CODE_isDisabled", true);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_TARIFF_CODE_isDisabled", true);
            } else {
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ADDRESS_TYPE_isDisabled", false);

                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_NAME_isDisabled", false);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_PHONE_NUMBER_isDisabled", false);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_EMAIL_isDisabled", false);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_STREET_ADDRESS_isDisabled", false);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_ADMINISTRATIVE_ADDRESS_isDisabled", false);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_ZIP_CODE_isDisabled", false);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_TARIFF_CODE_isDisabled", true);

                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_NAME_isDisabled", false);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_PHONE_NUMBER_isDisabled", false);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_EMAIL_isDisabled", false);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_STREET_ADDRESS_isDisabled", false);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ADMINISTRATIVE_ADDRESS_isDisabled", false);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ZIP_CODE_isDisabled", false);
                this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_TARIFF_CODE_isDisabled", false);
            }
        }
    },
    data() {
        return {
            loading: false,
            status: '',
            connote_number: "",
            crisscross_number: "",
            form: {},
            original_form: {},
            dataItem: {},
            dataTable: [],
            datacolumn: [
                {
                    label: "Transaction Date",
                    key: "transaction_date",
                    width: "xs"
                },
                {
                    label: "Connote Number",
                    key: "connote_number",
                    width: "xs"
                },
                {
                    label: "Node Name",
                    key: "node_name",
                    width: "md"
                },
                {
                    label: "User Name",
                    key: "user_name",
                    width: "xxs"
                },
                {
                    label: "Status Delivery",
                    key: "status_delivery",
                    width: "xxs"
                },
            ],
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            isEdit: true,
            isCreateManually: false
        }
    },
    methods: {
        updateValue(key, val){
            switch(key) {
                case "connote_number":
                    this.connote_number= val
                    this.scanConnote()
                    break;
                default:
            }
        },
        resetCrisscross() {
            this.crisscross_number = '';
        },
        refresh() {
            this.getCrisscross(this.pagination.limit, this.pagination.page);
        },
        actionLimit(val) {
            this.pagination.limit = val;
            this.pagination.page = 1;
            this.refresh();
        },
        actionPagination(val) {
            this.pagination.page = val;
            this.refresh();
        },
        handleEdit(item) {
            this.crisscross_number = item.connote_number;
            this.scanConnote();
        },
        onRowClickSelected(item) {
            this.crisscross_number = item.connote_number;
            this.scanConnote();
        },
        async getCrisscross(limit, page){
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.crisscross}/${this.connote_number}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = res.data.data;
                    arr.map(item => {
                        item["transaction_date"] = this.formatTimezone(item?.transaction_date);
                    })
                    this.dataTable = arr
                    this.pagination = {
                        page: res.data.meta.current_page,
                        limit: parseInt(res.data.meta.per_page),
                        page_size: res.data.meta.last_page,
                    };
                } else {
                    this.dataTable = [];
                } 
                
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async scanConnote(){
            this.loading = true;
            try {
                const res = this.crisscross_number && !this.isCreateManually ? await axios.get(`${this.URL.connote}/${this.crisscross_number}?n=${this.listenNodeId}`, this.Helper.header()) : await axios.get(`${this.URL.connote_forward}/${this.connote_number}/scan?n=${this.listenNodeId}`, this.Helper.header());
                if(res.data.data) {
                    let data = res.data.data;
                    const nodeOrigin = this.nodeOrigin;
                
                    let obj = {
                        connote_shipper_name: data.connote_shipper_name || '',
                        connote_shipper_phone_number: data.connote_shipper_phone_number || '',
                        connote_shipper_email: data.connote_shipper_email || '',
                        connote_shipper_street_address: data.connote_shipper_street_address || '',
                        connote_shipper_administrative_address: data.connote_shipper_administrative_address || '',
                        connote_shipper_zip_code: data.connote_shipper_zip_code || '',
                        connote_shipper_tariff_code: nodeOrigin || '',

                        connote_receiver_name: data.connote_receiver_name || '',
                        connote_receiver_phone_number: data.connote_receiver_phone_number || '',
                        connote_receiver_email: data.connote_receiver_email || '',
                        connote_receiver_street_address: data.connote_receiver_street_address || '',
                        connote_receiver_administrative_address: data.connote_receiver_administrative_address || '',
                        connote_receiver_zip_code: data.connote_receiver_zip_code || '',
                        connote_receiver_tariff_code: data.connote_receiver_tariff_code || '',

                        connote_receiver_address_type: data.connote_receiver_address_type || '',
                        connote_receiver_geolocation_subdistrict_id: data.connote_receiver_geolocation_subdistrict_id || '',
                        connote_receiver_tlc: data.connote_receiver_tlc || '',
                        connote_receiver_city_zone: data.connote_receiver_city_zone || ''
                    };

                    this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ADDRESS_TYPE", data?.connote_receiver_address_type);
                    this.dataItem = obj
                    this.connote_number = this.crisscross_number ? this.connote_number : res.data.data.connote_number || this.connote_number
                    this.status = res.data.status || this.status;

                    if (this.status === "PS3" && this.crisscross_number === "") {
                        if (!this.isCreateManually) {
                            await this.getCrisscross(this.pagination.limit, this.pagination.page);
                        }
                    }

                    const formObject = {
                        connote_number: this.connote_number,
                        connote: this.dataItem
                    };

                    this.form = formObject;
                    this.original_form = formObject;

                }
                
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
                this.connote_number = "";
            } finally {
                this.loading = false;
            }
        },
        async getTLC(zipCode) {
            try {
                const response = await axios.get(
                    `${this.URL.geolocation_search}?n=${this.listenNodeId}&s=${zipCode}`, 
                    this.Helper.header()
                );
                if (response.status === 200 && response.data.data.length > 0) {
                    return response.data.data[0].geolocation_subdistrict_tarif_code.substring(0, 3);
                }
            } catch (err) {
                this.checkAuth(err.response);
                return null;
            }
        },
        selectCreate() {
            this.isCreateManually = !this.isCreateManually;
            this.scanConnote();
        },
        async formData(form){
            const { connote_receiver_administrative_address, connote_shipper_administrative_address, ...formWithoutAdministrativeAddress } = form;
            const tlc_receiver = await this.getTLC(form.connote_receiver_zip_code);
            this.form = {
                ...this.form,
                connote: {
                    ...formWithoutAdministrativeAddress,
                    connote_receiver_administrative_address: connote_receiver_administrative_address?.geolocation_location_name || this.original_form?.connote?.connote_receiver_administrative_address || '',
                    connote_shipper_administrative_address: connote_shipper_administrative_address?.geolocation_location_name || this.original_form?.connote?.connote_shipper_administrative_address || '',
                    connote_receiver_tlc: tlc_receiver,
                    connote_receiver_city_zone:tlc_receiver
                } 
            };

            this.handleSubmitData();
        },
        async handleSubmitData() {
            this.loading = true;
            try {
                const res = await axios.post(`${this.URL.connote_forward}?n=${this.listenNodeId}`, this.form, this.Helper.header());
                if (res.status === 200) {
                    const { amount_total_price } = res.data.data;
                    console.log("amount_total_price:", amount_total_price);

                    if (amount_total_price <= 0) {
                        this.openNotification("warning", '', "Warning", "Connote Forward berhasil dibuat tanpa Tariff");
                    } else {
                        this.openNotification(null, '', "Success", "Connote Forward berhasil dibuat");
                    }
                }
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
                this.cancel();
            }
        },
        handleSubmit(){
            this.$refs.irreguralitiesReturnDestination.handleSubmit();
        },
        handleClearForm(){
            this.status = '';
            this.connote_number = "";
            this.crisscross_number = "";
            this.form = {};
            this.dataItem = {};
            this.dataTable = [];
            this.isCreateManually = false;
        },
        cancel() {
            this.handleClearForm();
            this.closeDialog();
        },
        async querySearch(queryString, cb){

          try {
            const response = await axios.get(`${this.URL.geolocation_search}?n=${this.listenNodeId}&s=${queryString}`, this.Helper.header());
            let data = response.data.data;
            let suggestions = [];
            data.length > 0 && data.map(item => {
              suggestions.push({
                value: item.geolocation_location_name,
                data: item
              });
            });
            cb(suggestions);
          } catch (_) {}
        },
      onChangeCustom(type, val, obj) {
          switch (type) {
          case "connote_shipper_administrative_address":
            this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_ADMINISTRATIVE_ADDRESS", obj?.data?.geolocation_location_name);
            this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_SHIPPER_ZIP_CODE", obj?.data?.geolocation_subdistrict_zip_code);
            break;
          case "connote_receiver_administrative_address":
            this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ADMINISTRATIVE_ADDRESS", obj?.data?.geolocation_location_name);
            this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_ZIP_CODE", obj?.data?.geolocation_subdistrict_zip_code);
            this.$store.dispatch("SET_CONNOTE_FORWARD_CONNOTE_RECEIVER_TARIFF_CODE", obj?.data?.geolocation_subdistrict_tarif_code);
            break;
          default:
        }
      },
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    }
}
</script>


<style scoped>
.crisscross-title {
    text-align: left;
    display: block;
    font-size: 0.8em;
    font-weight: bold;
    margin: 2em 0;
}

.change-container {
    text-align: right;
}

.change-link {
    display: inline-block;
    color: #007BFF;
    padding: 2px 12px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

.change-link:hover {
    transform: translateY(-2px);
}

.change-link:active {
    transform: translateY(0);
}

</style>
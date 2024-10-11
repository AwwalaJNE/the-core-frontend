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
                <vs-col xs="6" sm="6" lg="6" v-if="status === 'PS3' && connote_number">
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
            <!-- below new -->
            <template v-if="dataTable.length > 0 && crisscross_number === ''">
                <hr>
                <span class="crisscross-title">Choose Crisscross Number</span>
                <div class="mt-05 mb-2 ">
                    <table-master
                        :dataTable="dataTable" 
                        :dataColumn="datacolumn" 
                        :tableLoading="loading"
                        :pageSize="pagination.page_size"
                        :page="pagination.page"
                        :limit="pagination.limit"
                        :hasPagination="true"
                        :hasAction="false"
                        :onRowClickSelected="onRowClickSelected"
                        @actionLimit="actionLimit"
                        @actionPagination="actionPagination"
                    />
                </div>
            </template>
            <template v-if="(Object.keys(dataItem).length && status === 'PS2') || crisscross_number">
                <hr>
                <div class="change-container">
                    <span 
                        class="change-link"
                        v-if="crisscross_number" 
                        @click="resetCrisscross"
                    >
                        Change Connote
                    </span>
                </div>
                <vs-row justify="space-between">
                    <vs-col :xs="12" :sm="12" :lg="12">
                        <div class="address_box">
                            <form-input-controller
                                ref="irreguralitiesReturnDestination"
                                typeForm="connote_forward"
                                :dataItem="dataItem"
                            />
                        </div>
                    </vs-col>
                </vs-row>
            </template>
            <!-- above new -->
        </template>

        <template v-slot:footer v-if="status === 'PS2' || (status === 'PS3' && crisscross_number)">
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
        }
    },
    data() {
        return {
            loading: false,
            status: '',
            connote_number: "",
            crisscross_number: "",
            form: {},
            dataItem: {},
            dataTable: [],
            datacolumn: [
                {
                    label: "Transaction Date",
                    key: "transaction_date",
                    width: "md"
                },
                {
                    label: "Connote Number",
                    key: "connote_number",
                    width: "md"
                },
                {
                    label: "Node ID",
                    key: "node_id",
                    width: "md"
                },
                {
                    label: "User ID",
                    key: "user_id",
                    width: "md"
                },
                {
                    label: "Status Delivery",
                    key: "status_delivery",
                    width: "xs"
                },
            ],
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
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
        onRowClickSelected(item) {
            this.crisscross_number = item.connote_number;
        },
        async getCrisscross(limit, page){
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.crisscross}/${this.connote_number}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = res.data.data;
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
                const res = this.crisscross_number ? await axios.get(`${this.URL.connote}/${this.crisscross_number}?n=${this.listenNodeId}`, this.Helper.header()) : await axios.get(`${this.URL.connote_forward}/${this.connote_number}/scan?n=${this.listenNodeId}`, this.Helper.header());

                if(res.data) {
                    let obj = {}


                    obj['origin_name'] = res.data.data.connote_shipper_name || ''
                    obj['origin_phone'] = res.data.data.connote_shipper_phone_number || ''
                    obj['origin_email'] = res.data.data.connote_shipper_email || ''
                    obj['origin_address'] = res.data.data.connote_shipper_street_address || ''
                    obj['origin_onchange_address'] = res.data.data.connote_shipper_administrative_address || ''
                    obj['origin_subdistrict_id'] = res.data.data.connote_shipper_geolocation_subdistrict_id || ''
                    obj['zip_code'] = res.data.data.connote_shipper_zip_code || ''
                    obj['tariff_code'] = res.data.data.connote_shipper_tariff_code || ''

                    obj['destination_name'] = res.data.data.connote_receiver_name || ''
                    obj['destination_phone'] = res.data.data.connote_receiver_phone_number || ''
                    obj['destination_email'] = res.data.data.connote_receiver_email || ''
                    obj['destination_address'] = res.data.data.connote_receiver_street_address || ''
                    obj['destination_onchange_address'] = res.data.data.connote_receiver_administrative_address || ''
                    obj['destination_subdistrict_id'] = res.data.data.connote_receiver_geolocation_subdistrict_id || ''


                    obj['connote_shipper_administrative_address'] = res.data.data.connote_shipper_administrative_address || ''
                    obj['connote_receiver_geolocation_subdistrict_id'] = res.data.data.connote_receiver_geolocation_subdistrict_id || ""
                    obj['connote_receiver_administrative_address'] = res.data.data.connote_receiver_administrative_address || ''
                    obj['connote_receiver_email'] = res.data.data.connote_receiver_email || ''
                    obj['connote_receiver_tlc'] = res.data.data.connote_receiver_tlc || ''
                    obj['connote_receiver_city_zone'] = res.data.data.connote_receiver_city_zone || ''
                    obj['connote_number'] = res.data.data.connote_number || this.connote_number
                    this.connote_number = res.data.data.connote_number || this.connote_number

                    this.dataItem = obj
                    this.status = res.data.status;

                    if (this.status === "PS3") {
                        await this.getCrisscross(this.pagination.limit, this.pagination.page);
                    }

                    this.form = {
                        connote_number: this.connote_number,
                        connote: this.obj
                    }
                }
                
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
                this.connote_number = "";
            } finally {
                this.loading = false;
            }
        },
        async handleSubmit() {            
            this.loading = true;
            try {
                const res = await axios.post(`${this.URL.connote_forward}?n=${this.listenNodeId}`, this.form, this.Helper.header());
                this.openNotification('success', null, "Success", res?.data?.message || "Request connote forward is success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
                this.cancel();
            }
        },
        handleClearForm(){
            this.status = '';
            this.connote_number = "";
            this.crisscross_number = "";
            this.form = {};
            this.dataItem = {};
            this.dataTable = [];
        },
        cancel() {
            this.handleClearForm();
            this.closeDialog();
        }
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
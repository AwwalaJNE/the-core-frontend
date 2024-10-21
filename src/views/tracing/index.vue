<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{  is_history ? "Archive" : "Entry & Inventory" }}</h2>
                </div>                
            </vs-col>
        </vs-row>

        <div class="mt-2" style="display: flex; justify-content: space-between;" v-if="!is_history">
            <vs-row justify="space-between">
                <vs-col xs="9" sm="9" lg="9">
                    <form @submit.prevent="openDialog('create')">
                        <multi-input
                            ref="koliCode"
                            placeholder="Scan Item Here"
                            rules="" 
                            formKey="KOLI_CODE"
                            :loading="loading"
                            :selectedValue="koliCode"
                            :isMultiple="false"
                            :disabled="false"
                            :isAllowCreate="true"
                            :autofocus="true"
                            @updateValue="updateValue"
                        />
                    </form>
                </vs-col>
                <vs-col xs="3" sm="3" lg="3">
                    <vs-button
                        :active="true"
                        @click="openDialog('create')"
                    >
                        Submit
                    </vs-button>
                </vs-col>
            </vs-row>
            <vs-row justify="space-between">
                <vs-col xs="9" sm="9" lg="9">
                    <form @submit.prevent="openDialog('remove')">
                        <multi-input
                            ref="removeKoliCode"
                            placeholder="Remove Item Here"
                            rules="" 
                            formKey="REMOVE_KOLI_CODE"
                            :loading="loading"
                            :selectedValue="removeKoliCode"
                            :isMultiple="false"
                            :disabled="false"
                            :isAllowCreate="true"
                            @updateValue="updateValue"  
                        />
                    </form>
                </vs-col>
                <vs-col xs="3" sm="3" lg="3">
                    <vs-button
                        danger
                        :active="true"
                        @click="openDialog('remove')"
                    >
                        Remove
                    </vs-button>
                </vs-col>
            </vs-row>
        </div>

        <section class="nodes">
            <div class="box view">
                <div class="nav-box">
                    <vs-row justify="space-between">
                        <vs-col xs="12" sm="12" lg="6">
                            <vs-row>
                                <vs-col w="4">
                                    <select-search-by 
                                        :border="true"
                                        :isMultiple="false" 
                                        :selectedValue="filterDateBy" 
                                        :valueData="dateParams"
                                        @updateSearchBy="updateFilterDateBy" 
                                    />
                                </vs-col>
                                <vs-col w="8">
                                    <date-time 
                                        :name="''" 
                                        :rules="''" 
                                        :formKey="'TRIGGER_DATE'" 
                                        :valueData="dateRange"
                                        typeInput="daterange" 
                                        @updateValue="updateValue" 
                                    />
                                </vs-col>
                            </vs-row>
                        </vs-col>
                        <vs-col xs="12" sm="12" lg="6">
                            <vs-row justify="end">
                                <vs-col xs="6" sm="8" lg="4">
                                    <select-search-by 
                                        :border="true"
                                        :isMultiple="false" 
                                        :selectedValue="searchBy" 
                                        :valueData="searchParams"
                                        @updateSearchBy="updateSearchBy" 
                                    />
                                </vs-col>
                                <vs-col xs="6" sm="4" lg="4">
                                    <search-input 
                                        ref="searchInput"
                                        :placeholder="searchPlaceholder" 
                                        @searchValue="searchValue"
                                    />
                                </vs-col>
                            </vs-row>
                        </vs-col>
                    </vs-row>
                </div>

                <div class="mt-05">
                    <table-master 
                        :dataTable="dataTable" 
                        :dataColumn="datacolumn" 
                        :tableLoading="loading"
                        :pageSize="pagination.page_size"
                        :page="pagination.page"
                        :limit="pagination.limit"
                        :hasPagination="true"
                        :hasLinked="['koli_number']"
                        @handleEdit="showData"
                        @actionPagination="actionPagination"
                        @actionLimit="actionLimit"
                    />
                </div>
            </div>
        </section>

        <dialog-validate-tracing
            ref="dialogValidateTracing"
            title="Validate Tracing"
            :active="dialogValidateTracingActive"
            :closeDialog="closeDialog"
            :validItem="validItem"
            :loadingSubmit="loadingSubmit"
            :validateType="validateType"
            @updateValue="updateValue"
        />
    </div>
</template>

<script>
import axios from "axios";
import master from "@/mixins/master";
import moment from "moment";

import Breadcrumb from "@/components/breadcrumb/index"
import DateTime from "@/components/input/dateTime"
import NavItem from "@/components/navbar/navTab"
import SearchInput from "@/components/search/searchInput"
import TableMaster from "@/components/table/tableMaster.vue"
import SelectSearchBy from "@/components/search/selectSearchBy";
import MultiInput from "@/components/input/multiInput"
import DialogValidateTracing from "@/views/tracing/dialogValidateTracing"


export default {
    name:"tracing",
    mixins:[master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "date-time": DateTime,
        "select-search-by": SelectSearchBy,
        "table-master" : TableMaster,
        "multi-input": MultiInput,
        "dialog-validate-tracing": DialogValidateTracing,
    },
    data() {
        return {
            tempSearch: "",
            loading:false,
            dateRange: [],
            dataTable: [],
            datacolumn: [
                {
                    label: "Koli",
                    key: "koli_number",
                    width: "xxs"
                },
                {
                    label: "HRS",
                    key: "hrs_sequence",
                    width: "xxs"
                },
                {
                    label: "HRI",
                    key: "hri_sequence",
                    width: "xxs"
                },
                {
                    label: "HOC",
                    key: "hoc",
                    width: "xxs"
                },
                {
                    label: "Shipper Name",
                    key: "shipper_name",
                    width: "xxs"
                },
                {
                    label: "Shipper Phone",
                    key: "shipper_phone_number",
                    width: "xxs"
                },
                {
                    label: "Receiver Name",
                    key: "receiver_name",
                    width: "xxs"
                },
                {
                    label: "Receiver Phone",
                    key: "receiver_phone_number",
                    width: "xxs"
                },
                {
                    label: "Origin",
                    key: "origin",
                    width: "xxs"
                },
                {
                    label: "Destination",
                    key: "destination",
                    width: "xxs"
                },
                {
                    label: "Status Code",
                    key: "status_code",
                    width: "xxs"
                },
                {
                    label: "Status Name",
                    key: "status_name",
                    width: "xxs"
                },
            ],    
            form: {},
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            searchBy: "koli_number",
            filterDateBy: "created_at",
            searchPlaceholder: "Search Koli Number",
            searchParams: [
                {
                    label: "Koli Number",
                    value: "koli_number",
                },
                {
                    label: "HRS Number",
                    value: "hrs",
                },
                {
                    label: "HRI Number",
                    value: "hri",
                },
                {
                    label: "Shipper Name",
                    value: "shipper_name",
                },
                {
                    label: "Shipper Phone",
                    value: "shipper_phone",
                },
                {
                    label: "Receiver Name",
                    value: "receiver_name",
                },
                {
                    label: "Receiver Phone",
                    value: "receiver_phone",
                },
                {
                    label: "Origin",
                    value: "origin",
                },
                {
                    label: "Destination",
                    value: "destination",
                },
                {
                    label: "Status Code",
                    value: "status_code",
                },
                {
                    label: "Status Name",
                    value: "status_name",
                },
            ],
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'created_at'
                },
                {
                    label: 'Updated Date',
                    value: 'updated_at'
                }                
            ],
            koliCode: [],
            removeKoliCode: [],
            dialogValidateTracingActive: false,
            validItem: [],
            listValidItem: [],
            loading:false,
            loadingSubmit: false,
            loadingValidation: false,
            validateType: 'create',
            is_history: this.$route.fullPath.includes('history')
        }
    },
    methods: {
        async getTableData(limit, page, q, from, to) {
            this.loading = true;

            let query = q ?? '';            
            let startDate = from ?? "";
            let endDate = to ?? "";

            try {
                const res = await axios.get(`${this.URL.revamp_tracing}?n=${this.listenNodeId}&status=${this.is_history ? "1" : "0"}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`, this.Helper.header());

                this.dataTable = res.data.data;
                this.pagination = {
                    page: res.data.meta.current_page,
                    limit: parseInt(res.data.meta.per_page, 10),
                    page_size: res.data.meta.last_page,
                };
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code ?? '', 'Failed', err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        showData(row) {
            const baseRoute = this.is_history ? 'history' : 'outstanding';
            this.$router.push(`/tracing-${baseRoute}/${row.koli_number}`);
            this.setRoutePageHistory(this.$route.meta, false);
            this.refresh();
        },
        refresh(){
            let d = new Date()
            let from = ''
            let to = ''
            
            if(this.dateRange != null && this.dateRange.length > 0) {
                from = moment(this.dateRange[0]).format("YYYY-MM-DD")
                to = moment(this.dateRange[1]).format("YYYY-MM-DD")
            }

            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, from, to)

        },
        searchValue (val) {
            this.tempSearch = val;
            this.refresh()
        },
        actionLimit(val){
            this.pagination.limit = val
            this.pagination.page = 1
            this.refresh()
        },
        actionPagination(val) {
            this.pagination.page = val
            this.refresh()
        },
        async scanConnote() {
            this.loadingScanConnote = true;

            try {
                const res = await axios.post(`${this.URL.revamp_tracing}/create?n=${this.listenNodeId}`, this.form, this.Helper.header());
                this.openNotification("success", null, "Success", res?.data?.message ?? "Remove koli success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? "", "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.loadingScanConnote = false;
                this.dialogValidateTracingActive = false;
                this.handleClearForm();
                this.refresh();
            }
        },
        async removeConnote() {
            this.loadingScanConnote = true;

            try {
                const res = await axios.delete(`${this.URL.revamp_tracing}/delete?n=${this.listenNodeId}`,
                    {
                        headers: this.Helper.header().headers,
                        data: this.form,
                    }
                );
                this.openNotification("success", null, "Success", res?.data?.message ?? "Remove item success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? "", "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.loadingScanConnote = false;
                this.dialogValidateTracingActive = false;
                this.handleClearForm();
                this.refresh();
            }
        },
        updateSearchBy(key, val) {
            val = val.replaceAll(" ", "_");
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val;
            this.refresh();
        },
        openDialog(actionType) {
            this.validateType = actionType;
            if (actionType === 'create' && this.koliCode?.length) {
                this.validateCreateItem({ items: this.koliCode });
            } else if (actionType === 'remove' && this.removeKoliCode?.length) {
                // TODO: Adjust after Remove Validation API ready
                this.validateRemoveItem(this.removeKoliCode.map(el => ({item_number: el, status: "SUCCESS"})));
            }
        },
        closeDialog() {
            this.dialogValidateTracingActive = false
            this.dataItem = {}
        },
        updateValue(key, val) {
            switch(key) {
                case "KOLI_CODE":
                    this.koliCode = this.$refs.koliCode.value;
                    break;
                case "REMOVE_KOLI_CODE":
                    this.removeKoliCode = this.$refs.removeKoliCode.value;
                    break;
                case "TRIGGER_DATE":
                    this.dateRange = val
                    this.refresh()
                    break;
                case "SUBMIT_DIALOG_CREATE_VALIDATE_TRACING":
                    this.form = val;
                    this.scanConnote();
                    break;
                case "SUBMIT_DIALOG_REMOVE_VALIDATE_TRACING":
                    this.form = val;
                    this.removeConnote();
                    break;
                default:
            }
        },
        async validateCreateItem(validationKoliCode) {
            this.loadingValidation = true
            
            await axios
                .post(
                    this.URL.validation + `/create-tracing?n=${this.listenNodeId}`,
                    validationKoliCode, 
                    this.Helper.header())
                .then(res => {
                    this.validItem = res.data.data
                    this.listValidItem = this.validItem
                        .filter(item => item.status === 'SUCCESS')
                        .map(item => item.item_number);

                    if (this.listValidItem.length > 0) {
                        this.dialogValidateTracingActive = true
                    } else {
                        this.refresh();
                        this.handleClearForm();
                        this.openNotification('danger', err?.response?.data?.code ?? '', 'Error', this.validItem?.[0].message ?? 'something went wrong')
                    }                    
                }).catch(err => {
                    this.refresh();
                    this.handleClearForm();
                    this.openNotification('danger', err?.response?.data?.code ?? '', 'Input Validation Failed', err?.response?.data?.message ?? 'something went wrong')
                })

            this.loadingValidation = false
        },
        async validateRemoveItem(validationKoliCode) {
            this.loadingValidation = true
            
            // TODO: REMOVE after API validation ready
            this.validItem = validationKoliCode;
            this.dialogValidateTracingActive = true;

            // TODO: USE after API validation ready
            // await axios
            //     .post(
            //         this.URL.validation + `/remove-irregularity?n=${this.listenNodeId}`,
            //         JSON.stringify(validationKoliCode), 
            //         this.Helper.header())
            //     .then(res => {
            //         this.validItem = res.data.data
            //         this.listValidItem = this.validItem
            //             .filter(item => item.status === 'SUCCESS')
            //             .map(item => item.item_number);
                    
            //         if (this.listValidItem.length > 0) {
            //             this.primaryKeyList = this.listValidItem
            //             this.activeDialogConfirmRemoveBulk = true
            //         } else {
            //             this.handleClearRemoveForm();
            //             this.refresh();
            //             this.openNotification('danger', err.response ? err.response.data.code : '', 'Error', this.validItem?.[0].message ? this.validItem[0].message : 'something went wrong')
            //         }     
            //     }).catch(err => {
            //         this.handleClearRemoveForm();
            //         this.refresh();
            //         this.openNotification('danger', err.response ? err.response.data.code : '', 'Input Validation Failed', err.response ? err.response.data.message : 'something went wrong')
            //     })

            this.loadingValidation = false
        },
        handleClearForm(){
            this.$refs.koliCode.value = [];
            this.$refs.removeKoliCode.value = [];
        },  
    },
    mounted() {
        this.refresh();
    }
}
</script>
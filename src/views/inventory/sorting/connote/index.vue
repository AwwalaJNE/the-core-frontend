<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{ listenTitle }}</h2>
                </div>
            </vs-col>
        </vs-row>
        <section>
            <vs-row>
                <vs-col xs="12" sm="12" lg="6">
                    <div class="box view">
                        <vs-row style="align-items: center; margin-top: 10px;">
                            <vs-col xs="12" sm="12" lg="6">
                                <vs-input 
                                    border 
                                    icon-after
                                    ref="formInputSorting"
                                    type="text"
                                    v-model="item_number"
                                    v-on:keyup.enter="processSorting"
                                    v-uppercase
                                    :autofocus="true"
                                    :label-placeholder="'Masukkan Connote'"
                                    @click-icon="$refs.cameraScanner.open('formInputSorting')"
                                >
                                    <template #icon>
                                        <i class="bx bx-barcode-reader"></i>
                                    </template>
                                </vs-input>
                            </vs-col>
                            <vs-col xs="12" sm="12" lg="6">
                                <selector 
                                    ref="destination"
                                    rules="" 
                                    placeholder="Select Destination"
                                    formKey="destination"
                                    :loading="loading"
                                    :valueData="destinationArr"
                                    :selectedValue="destination"
                                    :isMultiple="false"
                                    :customBind="'data-kt-bag-type'"
                                    @updateValue="updateValue" 
                                />
                            </vs-col>
                        </vs-row>
                    </div>
                    <div class="box view">
                        <vs-row justify="space-between" class="mt-2">
                            <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
                                <template>
                                    <img class="logo" :src="require('../../../../assets/img/bagging-placeholder.png')" alt="jne" width="300" align="center">
                                </template>
                                <h3>Scan barcode connote untuk melakukan sorting</h3>
                            </vs-col>
                        </vs-row>
                    </div>
                </vs-col>
                <vs-col xs="12" sm="12" lg="6">
                    <div class="box view">
                        <vs-row>
                            <vs-col xs="12" sm="12" lg="4">
                                <h4 style="text-align: left;">Sorting History</h4>
                            </vs-col>
                            <vs-col xs="12" sm="6" lg="4" style="margin-top: 8px;">
                                <select-search-by 
                                    :border="true" 
                                    :isMultiple="false" 
                                    :selectedValue="searchBy" 
                                    :valueData="searchParams" 
                                    @updateSearchBy="updateSearchBy" 
                                />
                            </vs-col>
                            <vs-col xs="12" sm="6" lg="4" style="margin-top: 8px;">
                                <search-input 
                                    ref="searchInput" 
                                    :placeholder="searchPlaceholder" 
                                    @searchValue="searchValue" 
                                />
                            </vs-col>
                        </vs-row>
                        <table-master 
                            :dataTable="dataTable" 
                            :dataColumn="datacolumn" 
                            :tableLoading="loading"
                            :pageSize="pagination.page_size"
                            :page="pagination.page"
                            :limit="pagination.limit"
                            :hasAction="false"
                            :hasPagination="true"
                            @actionLimit="actionLimit"
                            @actionPagination="actionPagination"
                        />
                    </div>
                </vs-col>
            </vs-row>
        </section>
        <camera-scanner 
            ref="cameraScanner" 
            @data="onCameraScannerGetData" 
        />
    </div>
</template>

<script>
import axios from "axios";
import master from "@/mixins/master";

import AutoComplete from "@/components/input/autoComplete";
import Breadcrumb from "@/components/breadcrumb/index";
import CameraScanner from "@/components/scanner/camera";
import Selector from "@/components/input/select";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";
import TableMaster from "@/components/table/tableMaster";

export default {
    name:"inventory-sorting-connote",
    mixins: [master],
    components: {
        "auto-complete": AutoComplete,
        "breadcrumb": Breadcrumb,
        "camera-scanner": CameraScanner,
        "selector": Selector,
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy,
        "table-master" : TableMaster,
    },
    data() {
        return {
            title: 'Sorting Connote',
            item_number: '',
            form: {},
            loading: false,
            destination: "HUB_DELIVERY",
            destinationArr: [
                {
                    "label": "Hub Delivery",
                    "value": "HUB_DELIVERY"
                },
            ],
            loading: false,
            dataTable: [],
            datacolumn: [
                {
                    label: "Connote Number",
                    key: "connote_number",
                    width: "sm"
                },
                {
                    label: "Destination",
                    key: "destination",
                    width: "sm"
                },
                {
                    label: "Status",
                    key: "status",
                    width: "sm"
                },
                {
                    label: "Timestamp",
                    key: "timestamp",
                    width: "sm"
                },
            ],
            pagination: {
                limit: 10,
                page_size: 1,
                page: 1
            },
            tempSearch: "",
            searchPlaceholder: "Search Connote",
            searchBy: "connote_number",
            searchByDataType: false,
            searchParams: [
                {
                    label: "Connote",
                    value: "connote_number"
                },
                {
                    label: "Destination",
                    value: "destination"
                }
            ],
        }
    },
    computed: {
        listenTitle() {
            return this.title
        },
    },
    methods: {
        updateValue(key, val, info){
            switch(key) {
                case "destination":
                    this.destination = val;
            }
        },
        updateSearchBy(key, val, dataType) {
            this.searchBy = val;
            this.searchPlaceholder = key;
            this.searchByDataType = dataType;
            this.refresh();
        },
        searchValue (val) {
            this.tempSearch = val;
            this.refresh();
        },
        handleClearForm(){
            this.form = {};
            this.item_number = '';
            this.destination = '';
        },
        async processSorting() {
            if (this.destination && this.item_number) {
                this.form = {
                    item_number: this.item_number,
                    destination_scope : this.destination,
                }

                this.loading = true;
                try {
                    const res = await axios.post(`${this.URL.sorting_zip_code_validation}?n=${this.listenNodeId}`, JSON.stringify(this.form), this.Helper.header());                

                    this.openNotification('success', null, "Success", res?.data?.message || "Success");
                } catch (err) {
                    this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
                } finally {
                    this.loading = false;
                    this.handleClearForm();
                }
            } else {
                this.openNotification("danger", '', "Failed", 'Destination is mandatory');
            }
        },
        onCameraScannerGetData(data) {
            if (data && data.event === "result" && data.namespace === "formInputSorting") {
                this.item_number = data.data.text;
                this.updateValue();
            }
        },
        refresh(){
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.searchBy)
        },
        async getTableData(limit, page, q, searchBy) {
            this.loading = true

            let query = q || '';

            try {
                const res = await axios.get(`${this.URL.sorting_item_history}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&search_by=${searchBy}&item_type=KOLI`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = res.data.data;
                    this.dataTable = arr
                    this.pagination = {
                        page: res.data.meta.current_page,
                        limit: parseInt(res.data.meta.per_page, 10),
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
        actionLimit(val){
            this.pagination.limit = val
            this.pagination.page = 1
            this.refresh()
        },
        actionPagination(val) {
            this.pagination.page = val
            this.refresh()
        },
    },
    mounted() {
        this.refresh()
    },
}
</script>
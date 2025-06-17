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
                <vs-row>
                    <vs-col xs="12" sm="6" lg="4">
                        <select-search-by
                            key="searchBy"
                            :border="true"
                            :isMultiple="false"
                            :selectedValue="searchBy" 
                            :valueData="searchParams" 
                            @updateSearchBy="updateSearchBy" 
                        />
                    </vs-col>
                    <vs-col xs="12" sm="6" lg="4">
                        <search-input 
                            class="search-input"
                            key="searchInput"
                            ref="searchInput"  
                            :placeholder="searchPlaceholder" 
                            @searchValue="searchValue"
                        />
                    </vs-col>
                </vs-row>
                <vs-row>
                    <vs-col xs="12" sm="12" lg="12">
                        <date-time 
                            formKey="date_range"
                            :name="''" 
                            :rules="''" 
                            :valueData="dateRange"
                            typeInput="daterange" 
                            @updateValue="updateValue" 
                        />
                    </vs-col>
                </vs-row>
                <vs-row>
                    <vs-col xs="12" sm="12" lg="12">
                        <table-master 
                            hideColumnKey="dialog-surat-muatan-stock" 
                            :dataTable="dataTable" 
                            :dataColumn="datacolumn" 
                            :tableLoading="loadingTableData"
                            :onRowClickSelected="onRowClickSelected"
                        />
                    </vs-col>
                </vs-row>

                <div class="container-clear-item" @click="handleClearAll">
                    <!-- <div v-if="!isDisabled && dataTable.length !== 0" class="clear-item" @click="handleClearAll"> -->
                        Reset Inputs
                    <!-- </div> -->
                </div>

                <div>
                    <form-input-controller
                        ref="formDataController" 
                        typeForm="surat_muatan_stock"
                        :dataItem="dataItem"
                        :querySearch="querySearch"
                        @inputFocus="inputFocus"
                        @formData="formData"
                        @onChangeCustom="onChangeCustom"
                    />
                </div>
            </div>
        </template>

        <template v-slot:footer>
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

import DateTime from "@/components/input/dateTime"
import DialogMaster from "@/components/dialog/dialogMaster";
import FormInputController from "@/components/form/formInputController";
import Selector from "@/components/input/select";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";
import TableMaster from "@/components/table/tableMaster";

export default {
    name:"surat-muatan-settings-stock-dialog",
    mixins: [master],
    components: {
        "date-time": DateTime,
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
        "selector": Selector,
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy,
        "table-master" : TableMaster,
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
            autoCompleteUrl: "",
            form: {},
            id: "",
            loading: false,
            vehicle_id: '',
            tempSearch: "",
            dateRange: [],
            searchBy: "vehicle",
            searchPlaceholder: "Search Schedule Vehicle",
            searchParams: [
                {
                    label: 'Vehicle',
                    value: 'vehicle'
                },
                {
                    label: 'Origin',
                    value: 'origin'
                },
                {
                    label: 'Destination',
                    value: 'destination'
                },
                {
                    label: 'Vehicle Info',
                    value: 'vehicle_info'
                },
                {
                    label: 'Registration Number',
                    value: 'registration_number'
                },
            ],
            loadingTableData: false,
            dataTable: [],
            datacolumn: [
                {
                    label: "Vehicle",
                    key: "vehicle_name",
                    width: "sm"
                },
                {
                    label: "Type",
                    key: "vehicle_name",
                    width: "sm"
                },
                {
                    label: "SHP No",
                    key: "shipment_number",
                    width: "xs"
                },
                {
                    label: "Origin",
                    key: "origin",
                    width: "md"
                },
                {
                    label: "Destination",
                    key: "destination",
                    width: "md"
                },
                {
                    label: "ETD",
                    key: "etd_formatted",
                    width: "sm"
                },
                {
                    label: "ETA",
                    key: "eta_formatted",
                    width: "sm"
                },
                {
                    label: "Vehicle Info",
                    key: "vehicle_information",
                    width: "xs"
                },
                {
                    label: "Reg No",
                    key: "registration_number",
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
    computed: {
        listenActive(){
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
        active: function (val) {
            if (val && !this.dataItem) {
                this.getEmployeeDriver();
            }
        },
        dataItem: function (val) {
            if(val !== undefined) {
                this.getDataDetail(val);
            }
        },
        vehicle_id (newVal, oldVal) {
            if (newVal !== undefined && newVal !== oldVal) {
                this.$store.dispatch("SET_SURAT_MUATAN_STOCK_MANIFEST_NUMBER", '');
            }
        },
        query: function(val, old) {
            if(val !== undefined) {
                this.searchValue = val
                if(this.searchValue !== old) {
                    this.pagination.page = 1
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.startDate, this.endDate, this.searchBy)
                }
            }
        },
    },
    methods: {
        refresh(){
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.dateRange[0], this.dateRange[1], this.searchBy);

            if (this.tempSearch === "" && this.dateRange.length === 0 && this.searchBy === "") {
                this.dataTable = [];
            }
        },
        async getTableData(limit, page, q, from, to, searchBy) {
            this.loadingTableData = true

            let query = q || '';            
            let startDate = from || "";
            let endDate = to || "";
            
            try {
                const res = await axios.get(`${this.URL.sm_schedule}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&filter_date_by=etd&start_date=${startDate}&end_date=${endDate}&search_by=${searchBy}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = res.data.data;
                    arr.map(item => {
                        item,
                        item["origin"] = item?.origin_name + "\n" + item?.origin_identifier + "\n" + item?.origin_point;
                        item["destination"] = item?.destination_name + "\n" + item?.destination_identifier + "\n" + item?.destination_point;
                        item["schedule_id"] = item.schedule_id ? true : false;
                        item["etd_formatted"] = item?.etd + " " + item?.etd_timezone;
                        item["eta_formatted"] = item?.eta + " " + item?.eta_timezone;
                    })
                    
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
                this.loadingTableData = false;
            }
        },
        async getDataDetail(val) {
            console.log("PP", val)
            this.id = val.id;

            await this.getVehicle();
            await this.getNode(val.node_code_origin);
            // this.vehicle_id = parseInt(val.vehicle_id);
            // this.$store.dispatch("SET_SURAT_MUATAN_STOCK_VEHICLE_ID", this.vehicle_id);
        },
        async getDataDetailFromSchedule(val) {
            // this.loading = true;
            console.log("PP", val)
            await this.getVehicle();
            
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_MANIFEST_NUMBER", val?.manifest_number);
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_SCHEDULE_ID", val?.shipment_number);
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_VEHICLE_ID", parseInt(val.vehicle_id));
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_ETD", val?.etd);
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_ETD_TIMEZONE", val?.etd_timezone);
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_ETA", val?.eta);
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_ETA_TIMEZONE", val?.eta_timezone);
            // this.loading = false;
        },
        async getEmployeeDriver() {
            this.loading = true;

            try {
                const res = await axios.get(`${this.URL.courier_delivery}/list?n=${this.listenNodeId}`, this.Helper.header());

                if (res.data.data.length > 0) {
                    let arr = res.data.data;

                    arr = arr.map(item => ({
                        label: item.employee_name + ' ( ' + item.employee_code + ' ) ',
                        value: item.employee_id,
                        item: item
                    }));

                    this.$store.dispatch("SET_SURAT_MUATAN_STOCK_EMPLOYEE_DRIVER_ID_ArrData", arr)
                } else {
                    this.$store.dispatch("SET_SURAT_MUATAN_STOCK_EMPLOYEE_DRIVER_ID", "");
                    this.$store.dispatch("SET_SURAT_MUATAN_STOCK_EMPLOYEE_DRIVER_ID_ArrData", []);
                    this.openNotification('warn', null, 'Driver data is empty!', ' Please create a new driver')
                }
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        inputFocus(obj, val, info){
            this.autoCompleteUrl = this.URL.node +'?n='+ this.listenNodeId +'&sort_order=desc&limit=20&page=1';
            this.input_value = "node_id";
            this.input_label = "node_name";
        },
        querySearch(queryString, cb){
            axios.get(this.autoCompleteUrl +`&s=${queryString}`,
                this.Helper.header()
            )
            .then(res => {
                let result = res.data.data
                let suggestions = [];
                result.length > 0 && result.map(item => {
                    suggestions.push({
                        value: item[this.input_label],
                        data: String(item[this.input_value])
                    });
                });
                cb(suggestions);
                })
            .catch();
        },
        formData(form){
            const { id, ...formWithoutId } = form;
            
            formWithoutId.is_active = formWithoutId.is_active === true ? "1" : "0";

            this.form = formWithoutId;
            this.handleSubmitData();
        },
        onChangeCustom(type, val, obj) {
            switch (type) {
                case "vehicle_id":
                    this.vehicle_id = val;
                    break;
                default:
            }
        },
        updateValue(key, val, info){
            switch(key) {
                case "date_range":
                    this.dateRange = val;
                    this.refresh()
                    break;
                default:
            }
        },
        async getVehicle() {
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.vehicle}?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`, this.Helper.header());

                const data = res.data.data;

                if (res.data.data.length > 0) {
                    const arr = data.map(item => ({
                        label: item.vehicle_name,
                        value: item.vehicle_id,
                        data: item
                    }));

                    this.$store.dispatch("SET_SURAT_MUATAN_STOCK_VEHICLE_ID_ArrData", arr.length > 0 ? arr : null);
                } else {
                    this.$store.dispatch("SET_SURAT_MUATAN_STOCK_VEHICLE_ID", "");
                    this.$store.dispatch("SET_SURAT_MUATAN_STOCK_VEHICLE_ID_ArrData", []);
                }
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async getNode(node_id) {
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.node_list}?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1&s=${node_id}`, this.Helper.header());

                const data = res.data.data;

                console.log("PPx1", data, node_id, this.$store.getters.getInputs.surat_muatan_stock)
                if (res.data.data.length > 0) {
                    const arr = data.map(item => ({
                        label: item.node_name,
                        value: item.node_id,
                        data: item
                    }));

                    this.$store.dispatch("SET_SURAT_MUATAN_STOCK_NODE_ID_ORIGIN_ArrData", arr.length > 0 ? arr : null);
                    this.$store.dispatch("SET_SURAT_MUATAN_STOCK_NODE_ID_ORIGIN", parseInt(arr[0]?.value) || "");
                } else {
                    this.$store.dispatch("SET_SURAT_MUATAN_STOCK_NODE_ID_ORIGIN", "");
                    this.$store.dispatch("SET_SURAT_MUATAN_STOCK_NODE_ID_ORIGIN_ArrData", []);
                }
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async handleSubmitData() {
            this.loading = true;
            try {
                const res = this.id ? await axios.put(`${this.URL.sm_stock}/${this.id}?n=${this.listenNodeId}`, this.form, this.Helper.header()) : await axios.post(`${this.URL.sm_stock}?n=${this.listenNodeId}`, this.form, this.Helper.header());
                this.openNotification('success', null, "Success", res?.data?.message || this.id ? "Success Update Data" : "Success Create Data");
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
            this.form = {};
            this.id = "";
            this.vehicle_id = '';
            this.$emit("handleClearInput");
            this.$emit("refresh");
        },
        cancel() {
            this.handleClearForm();
            this.closeDialog();
        },
        searchValue (val) {
            this.tempSearch = val
            this.refresh();
        },
        updateSearchBy(key, val) {
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        handleClearAll() {
            this.$refs.formDataController.handleEmptyForm();
            this.form = {};
            this.dataTable = [];
        },
        async onRowClickSelected(item) {
            await this.getDataDetailFromSchedule(item);
        },
    },
    mounted() {
        this.refresh();
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>
<style> 
.container-clear-item {
  display: flex;
  justify-content: flex-end;
}
.clear-item {
  display: flex;
  justify-content: end;
  cursor: pointer;
  color: red;
  margin: 10px 0;
}
</style>
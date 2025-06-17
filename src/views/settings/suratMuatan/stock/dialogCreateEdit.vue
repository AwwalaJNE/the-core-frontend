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
                <vs-row align="center">
                    <vs-col xs="12" sm="4" lg="4">
                        <select-search-by
                            key="searchBy"
                            :border="true"
                            :isMultiple="false"
                            :selectedValue="searchBy" 
                            :valueData="searchParams" 
                            @updateSearchBy="updateSearchBy" 
                        />
                    </vs-col>
                    <vs-col xs="12" sm="8" lg="8">
                        <search-input 
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

                <div style="margin-top: 10px;">
                    <table-master 
                        hideColumnKey="dialog-surat-muatan-stock" 
                        :dataTable="dataTable" 
                        :dataColumn="datacolumn" 
                        :tableLoading="loadingTableData"
                        :onRowClickSelected="onRowClickSelected"
                        :isSingleSelect="true"
                        :selectedData="selectedData"
                    />
                </div>

                <div class="parent-container">
                    <div class="container-clear-item" @click="handleClearAll">
                        Reset Inputs
                    </div>
                </div>


                <form-input-controller
                    ref="formDataController" 
                    typeForm="surat_muatan_stock"
                    :dataItem="dataItem"
                    :querySearch="querySearch"
                    @formData="formData"
                />
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
            edit_data: {},
            selectedData: [],
        }
    },
    computed: {
        listenActive(){
            if (this.active) {
                this.getEmployeeDriver();
                this.getVehicle();
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
                this.getDataDetail(val);
                this.getDataTableByScheduleId(val.schedule_id);
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
        refresh() {
            const isTempSearchEmpty = this.tempSearch === "";
            const isDateRangeEmpty = !this.dateRange || this.dateRange.length === 0;

            if (isTempSearchEmpty && isDateRangeEmpty) {
                this.dataTable = [];
            } else {
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.dateRange?.[0] || null, this.dateRange?.[1] || null, this.searchBy);
            }
        },
        async getDataTableByScheduleId(schedule_id) {
            this.loadingTableData = true;

            try {
                const res = await axios.get(`${this.URL.sm_schedule}/9bb2f97d-95b6-4781-9696-2382175bf372?n=${this.listenNodeId}`, this.Helper.header());

                if (res.data.data) {
                    let arr = [res.data.data];
                    arr.map(item => {
                        item,
                        item["origin"] = item?.origin_name + "\n" + item?.origin_identifier + "\n" + item?.origin_point;
                        item["destination"] = item?.destination_name + "\n" + item?.destination_identifier + "\n" + item?.destination_point;
                        item["etd_formatted"] = item?.etd + " " + item?.etd_timezone;
                        item["eta_formatted"] = item?.eta + " " + item?.eta_timezone;
                    })
                    
                    this.dataTable = arr
                    this.selectedData = arr
                    this.onRowClickSelected(res.data.data)
                } else {
                    this.dataTable = [];
                }
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loadingTableData = false;
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
            this.edit_data = val;
            this.id = val.id;

            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_NODE_ID_ORIGIN", val.node_id_origin.toString());
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_NODE_ID_DESTINATION", val.node_id_destination.toString());
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_NODE_ID_ORIGIN_ValueData", val.node_id_origin.toString());
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_NODE_ID_DESTINATION_ValueData", val.node_id_destination.toString());

            val.node_id_origin = val.node_name_origin;
            val.node_id_destination = val.node_name_destination;
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
        querySearch(queryString, cb){
            axios.get(this.URL.node +`?n=${this.listenNodeId}&s=${queryString}`, this.Helper.header())
            .then(res => {
                let result = res.data.data
                let suggestions = [];
                result.length > 0 && result.map(item => {

                    suggestions.push({
                        value: item['node_name'],
                        data: item['node_id']
                    });
                });
                cb(suggestions);
                })
            .catch(error => console.log("error", error));
        },
        formData(form){
            const { id, ...formWithoutId } = form;
            
            if (this.edit_data.node_id_destination !== form?.node_id_destination) {
                formWithoutId.node_id_destination = form?.node_id_destination;
            }

            if (this.edit_data.node_id_origin !== form?.node_id_origin) {
                formWithoutId.node_id_origin = form?.node_id_origin;
            }

            formWithoutId.is_active = formWithoutId.is_active === true ? "1" : "0";

            this.form = formWithoutId;
            this.handleSubmitData();
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
            this.$emit("handleClearInput");
            this.$emit("refresh");
        },
        cancel() {
            this.dateRange = [];
            this.dataTable = [];
            this.clearSearch();
            this.handleClearForm();
            this.handleClearAll();
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
        clearSearch() {
            this.$refs.searchInput.clear()
        },
        handleClearAll() {
            this.selectedData = [];
            this.$refs.formDataController.handleEmptyForm();
            this.form = {};
            
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_ETA_isDisabled", false);
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_ETD_isDisabled", false);
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_VEHICLE_ID_isDisabled", false);
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_ETD_TIMEZONE_isDisabled", false);
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_ETA_TIMEZONE_isDisabled", false);  
        },
        onRowClickSelected(item) {
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_SCHEDULE_ID", item?.shipment_schedule_id);
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_VEHICLE_ID", parseInt(item.vehicle_id));
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_ETD", item?.etd);
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_ETD_TIMEZONE", item?.etd_timezone);
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_ETA", item?.eta);
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_ETA_TIMEZONE", item?.eta_timezone);
            
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_ETA_isDisabled", true);
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_ETD_isDisabled", true);
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_VEHICLE_ID_isDisabled", true);
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_ETD_TIMEZONE_isDisabled", true);
            this.$store.dispatch("SET_SURAT_MUATAN_STOCK_ETA_TIMEZONE_isDisabled", true);  
        },
    },
    mounted() {
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
.parent-container {
  display: flex;
  justify-content: flex-end;
}

.container-clear-item {
  cursor: pointer;
  color: #007bff;
}

</style>
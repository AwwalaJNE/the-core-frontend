<template>
    <div>
        <table-master 
            ref="tableMaster"
            :dataTable="dataTable" 
            :dataColumn="dataColumn" 
            :tableLoading="loading"
            :hasAction="false"
            :isSearchAble="true"
            :isMultipleSelect="true"
            @updateValue="updateValue"
            @handleAddData="handleAddData"
            @handleRemoveData="handleRemoveData"
        />
    </div>
</template>
<script>

import axios from "axios";
import master from "@/mixins/master";

import TableMaster from "@/components/table/tableMaster";

export default {
    name:"role-permission-data-table",
    mixins: [master],
    props: {
        app_role_id: String,
        changes_form: Array
    },
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            dataTable: [],
            dataColumn: [
                {
                    label: "Menu",
                    key: "feature_name",
                    type: "text",
                    width: "sm"
                },
                {
                    label: "Access Data",
                    key: "access_data",
                    type: "inputan",
                    typeInput: "multi-select-by",
                    selector: {
                        label: "Reference Entity*",
                        key: "reference_entity",
                        rules: "required",
                        typeInput: 'selector',
                        value: '',
                        data: [
                            {
                                label: "REGION",
                                value: "REGION",
                            },
                            {
                                "label": "BRANCH",
                                "value": "BRANCH"
                            },
                            {
                                "label": "ORIGIN",
                                "value": "ORIGIN"
                            },
                            {
                                "label": "NODE",
                                "value": "NODE"
                            },
                            {
                                "label": "USER",
                                "value": "USER"
                            },
                            {
                                "label": "EMPLOYEE",
                                "value": "EMPLOYEE"
                            },
                            {
                                "label": "CUSTOMER",
                                "value": "CUSTOMER"
                            },
                            {
                                "label": "SUBDISTRICT",
                                "value": "SUBDISTRICT"
                            },
                            {
                                "label": "DELIVERY ZONE",
                                "value": "DELIVERY_ZONE"
                            },
                            {
                                "label": "ZIP_CODE",
                                "value": "ZIP_CODE"
                            },
                            {
                                "label": "SERVICE",
                                "value": "SERVICE"
                            },
                            {
                                "label": "HIDDEN_COLUMN",
                                "value": "HIDDEN_COLUMN"
                            }
                        ],
                    },
                    multipleSelector: {
                        label: "Reference Value*",
                        key: "reference_value",
                        rules: "required",
                        typeInput: 'multipleSelector',
                        value: '',
                        autoCompleteUrl: '',
                        selectLabel: '',
                        selectValue: ''
                    },
                    width: "auto",
                }
            ],
            loading: false,
            pagination: {
                limit: 1000,
                page_size: 1,
                page: 1
            },
            tempSearch: '',
            autoCompleteUrl: '',
            input_value: '',
            input_label: '',
        }
    },
    watch: {
        app_role_id: function (val) {
            if (val !== undefined) {
                this.refresh()
            }
        },
        changes_form: function (val) {
            if (val !== undefined) {
                this.changes_form = val;
                this.sendChangesForm();
            }
        },
        dataColumn: function (val) {
            if (val !== undefined) {
                this.$nextTick(() => {
                    this.dataColumn = val;
                });
            }
        },
        dataTable: function (val) {
            if (val !== undefined) {
                this.$nextTick(() => {
                    this.dataTable = val;
                });
            }
        },
    },
    computed: {
        permissionMap() {
            return new Map(this.dataTable.map(item => [item.feature_permission_id, item]));
        },
    },
    methods: {
        sendChangesForm() {
            this.$emit('updateChangesForm', this.changes_form);
        },
        handleAddData(val) {
            const newFilter = {
                reference_entity: "",
                reference_value: []
            };
            
            if (Array.isArray(val.filter)) {
                val.filter.push(newFilter);
            } else {
                val.filter = [newFilter];
            }  
        },
        handleRemoveData(val, key) {
            val.filter.splice(key, 1);
        },
        refresh(){
            if (!this.app_role_id) return;
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch)
        },
        updateValue(index, key, val, info, dataObj) {
            const referenceMap = {
                REGION: { url: this.URL.regional_list, value: "regional_code", label: "regional_code" },
                BRANCH: { url: this.URL.branch_list, value: "branch_code", label: "branch_code" },
                ORIGIN: { url: this.URL.origin_list, value: "origin_code", label: "origin_code" },
                NODE: { url: this.URL.node_list, value: "node_code", label: "node_code" },
                USER: { url: this.URL.user_list, value: "user_login", label: "user_name" },
                EMPLOYEE: { url: this.URL.employee_list, value: "employee_nik", label: "employee_name" },
                CUSTOMER: { url: this.URL.customer_list, value: "customer_code", label: "customer_name" },
                SUBDISTRICT: { url: this.URL.subdistrict_list, value: "geolocation_subdistrict_name", label: "geolocation_subdistrict_name" },
                DELIVERY_ZONE: { url: this.URL.tlc_zone, value: "tlc_zone", label: "tlc_zone" },
                ZIP_CODE: { url: this.URL.zip_code_list, value: "zip_code", label: "zip_code" },
                SERVICE: { url: this.URL.service, value: "service_code", label: "service_code" }
            };

            dataObj.filter[index][key] = val;

            if (key === "reference_entity" && referenceMap[val]) {
                this.autoCompleteUrl = `${referenceMap[val].url}?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`;
                this.input_value = referenceMap[val].value;
                this.input_label = referenceMap[val].label;

                const col = this.dataColumn.find(col => col.key === "access_data");
                if (col) {
                    col.selector.value = val;
                    col.multipleSelector.value = [];
                    col.multipleSelector.autoCompleteUrl = this.autoCompleteUrl;
                    col.multipleSelector.selectValue = this.input_value;
                    col.multipleSelector.selectLabel = this.input_label;
                }
            }
            
            let changesMap = new Map(this.changes_form.map(item => [item.feature_permission_id, item]));
            changesMap.set(dataObj.feature_permission_id, dataObj);
            this.changes_form = Array.from(changesMap.values());

            console.log("PP", this.changes_form)
        },
        searchValue (val) {
            this.tempSearch = val
            this.refresh();
        },
        async getTableData(limit, page, q) {
            this.loading = true

            let query = q || '';
            
            try {
                const res = await axios.get(`${this.URL.application_role}/${this.app_role_id}/permission?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = res.data.data;
                    this.dataTable = arr;
                    this.pagination = {
                        page: res.data.meta.current_page,
                        limit: parseInt(res.data.meta.per_page, 10),
                        page_size: res.data.meta.last_page,
                    };
                } else {
                    this.dataTable = [];
                }  
            } catch (err) {
                this.redirectError(err)
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
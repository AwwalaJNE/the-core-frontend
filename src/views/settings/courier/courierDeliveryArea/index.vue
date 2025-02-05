<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="12">
                <vs-row>
                    <vs-col xs="6" sm="3" lg="2">
                        <div class="select-courier-delivery-area">
                            <selector 
                                formKey="filter_area_type"
                                :valueData="filterAreaType"
                                :selectedValue="filterAreaTypeBy"
                                :isMultiple="false"
                                :loading="loading"
                                @updateValue="updateFilterAreaTypeBy" 
                            />
                        </div>
                    </vs-col>
                    <vs-col xs="6" sm="3" lg="2">
                        <select-search-by 
                            :border="true"
                            :isMultiple="false" 
                            :selectedValue="filterDateBy" 
                            :valueData="filterDate" 
                            @updateSearchBy="updateFilterDateBy"
                        />
                    </vs-col>
                    <vs-col xs="12" sm="6" lg="6">
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
            </vs-col>
        </vs-row>
        <table-master 
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasAction="true"
            :hasPagination="true"
            @actionUpdate="actionUpdate"
            @actionRemove="actionRemove"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
        />

        <dialog-create-edit
            btnBlue="Edit"
            ref="dialog_edit"
            title="Edit Courier Delivery Area"
            :active="dialogEditActive" 
            :closeDialog="() => closeDialog('dialog_edit')"
            :dataItem="dataItem"
            :loading="loadingEdit"
        />

        <dialog-confirm
            ref="dialog_remove"
            title="Remove Courier Delivery Area"
            :active="dialogRemoveActive"
            :closeDialog="() => closeDialog('dialog_remove')"
            :loading="loadingRemove"
            :message="`Are you sure you want to remove this?`"
            @cancel="() => closeDialog('dialog_remove')"
            @confirm="confirmRemove"
        />
    </div>
</template>
<script>

import axios from "axios";
import master from "@/mixins/master";
import moment from "moment";

import DateTime from "@/components/input/dateTime"
import DialogConfirm from "@/components/dialog/dialogConfirm";
import Inputan from "@/components/input/inputan";
import SearchInput from "@/components/search/searchInput";
import Selector from "@/components/input/select";
import SelectSearchBy from "@/components/search/selectSearchBy";
import TableMaster from "@/components/table/tableMaster";

import DialogCreateEdit from "@/views/settings/courier/courierDeliveryArea/dialogCreateEdit";

export default {
    name:"data-table-courier-delivery-area",
    mixins: [master],
    props: {
        query: String,
        searchBy: String,
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit": DialogCreateEdit,
        "search-input": SearchInput,
        "date-time": DateTime,
        "inputan": Inputan,
        "dialog-confirm": DialogConfirm,
        "select-search-by": SelectSearchBy,
        "selector": Selector,
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Courier Name",
                    key: "courier_name",
                    width: "sm"
                },
                {
                    label: "Courier Node",
                    key: "courier_node",
                    width: "lg"
                },
                {
                    label: "Area Type",
                    key: "area_type",
                    width: "sm"
                },
                {
                    label: "Area Value",
                    key: "area_value_data",
                    width: "sm"
                },
                {
                    label: "Created At",
                    key: "created_at",
                    width: "xs"
                },
            ],
            loading: false,
            dataItem: {},
            dateRange: [],
            searchValue: this.query ? this.query : "",
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            selected_id: '',
            dialogEditActive: false,
            dialogRemoveActive: false,
            loadingRemove:false,
            loadingEdit: false,
            filterAreaTypeBy: "ALL",
            filterAreaType: [
                {
                    label: 'All Area Type',
                    value: 'ALL'
                },
                {
                    label: 'Delivery Zone',
                    value: 'DELIVERY_ZONE'
                },
                {
                    label: 'Zip Code',
                    value: 'ZIP_CODE'
                },
                {
                    label: 'District',
                    value: 'DISTRICT'
                },
                {
                    label: 'Subdistrict',
                    value: 'SUBDISTRICT'
                },
            ],
            filterDateBy: "created_at",
            filterDate: [
                {
                    label: 'Created At',
                    value: 'created_at'
                },
            ],
        }
    },
    computed: {
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.searchValue = val
                if(this.searchValue !== old) {
                    this.pagination.page = 1
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.startDate, this.endDate, this.searchBy)
                }
            }
        },
        searchBy: function(val, old) {
            if(val !== undefined) {
                this.searchBy = val
                if(this.searchBy !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, this.searchValue, this.startDate, this.endDate, val)
                }
            }
        },
    },
    methods: {
        refresh(){
            let from = ''
            let to = ''

            if(this.dateRange != null && this.dateRange.length > 0) {
                from = moment(this.dateRange[0]).format("YYYY-MM-DD")
                to = moment(this.dateRange[1]).format("YYYY-MM-DD")
            }

            this.getTableData(this.pagination.limit, this.pagination.page, this.searchValue, from, to, this.searchBy)
        },
        updateValue(key, val) {
            this.dateRange = val
            this.refresh()
        },
        updateFilterDateBy(key) {
            this.filterDateBy = key;
            this.refresh()
        },
        updateFilterAreaTypeBy(key, val) {
            this.filterAreaTypeBy = val;
            this.refresh()
        },
        async getTableData(limit, page, q, from, to, searchBy) {
            this.loading = true

            let query = q || '';            
            let startDate = from || "";
            let endDate = to || "";
            
            try {
                const res = await axios.get(`${this.URL.courier_delivery_area}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${searchBy}&filter_date_by=${this.filterDateBy}&area_type=${this.filterAreaTypeBy}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    let arr = res.data.data;
                    arr.map(item => {
                        item["courier_node"] = item.node_name;
                    })
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
                // TODO: REMOVE LATER
                let arr = [
                        {
                            "courier_delivery_area_id": "a48111b9-f747-4a96-b930-c0ba61264acb",
                            "courier_id": "76122",
                            "courier_name": "CGK AWWALA;",
                            "node_name": "CGK, KANTOR PERWAKILAN TOMANG 11 / 45",
                            "area_type": "TLC-ZONE",
                            "area_value": ["AMI-A","AMI-B"],
                            "created_at": "2024-12-11 06:12:00"
                        }
                    ]
                    arr.map(item => {
                        item["courier_node"] = item.node_name;
                        item["area_value_data"] = item.area_value
                            .map((itm, index) => `${index === 0 ? '' : '\n'}- ${itm}`)
                            .join('');

                    })
                    this.dataTable = arr;
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        actionUpdate(val){
            this.dataItem = val;
            this.dialogEditActive = true;
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
        closeDialog(ref) {
            switch (ref) {
                case 'dialog_edit':
                    this.dialogEditActive = false;
                    this.refresh();
                    break;
                case 'dialog_remove':
                    this.dialogRemoveActive = false;
                    this.refresh();
                    break;
                default:
                    break;
            }
        },
        actionRemove(val){
            this.selected_id = val.courier_delivery_area_id;
            this.dialogRemoveActive = true;
        },
        confirmRemove() {
            this.removeData();
        },
        async removeData() {
            this.loadingRemove = true;
            try {
                const res = await axios.delete(`${this.URL.courier_delivery_area}/${this.selected_id}?n=${this.listenNodeId}`, this.Helper.header());
                this.openNotification('success', null, "Success", res?.data?.message || "Remove Courier Delivery Area success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loadingRemove = false;
                this.closeDialog('dialog_remove');
            }
        }
    },
    mounted() {
        this.refresh()
    },
}
</script>
<style scoped>
.select-courier-delivery-area {
    margin-top: -10px !important;
}
</style>
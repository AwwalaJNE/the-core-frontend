<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="6" lg="3">
                <selector 
                    formKey="filter_destination_type"
                    :valueData="filterDestinationType"
                    :selectedValue="filterDestinationTypeBy"
                    :isMultiple="false"
                    :loading="loading"
                    @updateValue="updateFilterDestinationTypeBy" 
                />
            </vs-col>
        </vs-row>
        <table-master 
            hideColumnKey="active-bag-weight" 
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasAction="false"
            :hasPagination="true"
            :expandable="true"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
        />
    </div>
</template>
<script>
import axios from "axios";

import master from "@/mixins/master";

import Selector from "@/components/input/select";
import TableMaster from "@/components/table/tableMaster";

export default {
    name:"active-weight-data-tabel",
    mixins: [master],
    props: {
        query: String,
        searchBy: String,
    },
    components: {
        "selector": Selector,
        "table-master" : TableMaster,
    },
    data() {
        return {
            dataItem: {},
            dataTable: [],
            datacolumn: [
                {
                    label: "Reference",
                    key: "reference",
                    width: "auto"
                },
                {
                    label: "Threshold",
                    key: "threshold",
                    width: "auto"
                },
                {
                    label: "Current / Max Weight (kg)",
                    key: "summary",
                    width: "auto"
                },
                {
                    label: "Status",
                    key: "status_with_color",
                    width: "auto"
                },
            ],
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            loading: false,
            tempSearch: "",
            filterDestinationTypeBy: "ALL",
            filterDestinationType: [
                {
                    label: 'All Destination Type',
                    value: 'ALL'
                },
                {
                    label: 'Region',
                    value: 'REGION'
                },
                {
                    label: 'Branch',
                    value: 'BRANCH'
                },
                {
                    label: 'Origin',
                    value: 'ORIGIN'
                },
                {
                    label: 'Node',
                    value: 'NODE'
                },
            ],
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.pagination.page = 1
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.searchBy)
                }
            }
        },
    },
    methods: {
        refresh(){
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.searchBy)
        },
        async getTableData(limit, page, q, searchBy, destinationType) {
            this.loading = true;

            let query = q || '';
            
            try {
                const res = await axios.get(`${this.URL.active_bag_weight}/report?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&search_by=${searchBy}&destination_type=${this.filterDestinationTypeBy}`, this.Helper.header());

                let arr = (res?.data?.data || []).map(item => {
                    const children = (item?.destination ?? []).reduce(
                        (acc, k) => {
                            acc['Destination Type'].push(k?.destination_type ?? " ");
                            acc['Destination Value'].push(k?.destination_value ?? " ");
                            acc['Current Weight (kg)'].push(k?.current_weight ?? " ");
                            return acc;
                        },
                        { 'Destination Type': [], 'Destination Value': [], 'Current Weight (kg)': [] }
                    );

                    return {
                        ...item,
                        status_with_color: item?.status,
                        summary: item?.total_current_weight + "/" + item?.max_weight + " (" + item?.percentage + "%)",
                        children
                    };
                });
                this.dataTable = arr;
                this.pagination = {
                    page: result.meta.current_page,
                    limit: parseInt(result.meta.per_page, 10),
                    page_size: result.meta.last_page,
                };
                
                this.openNotification("success", null, "Success", res?.data?.message);
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        actionLimit(val){
            this.pagination.limit = val;
            this.pagination.page = 1;
            this.refresh();
        },
        actionPagination(val) {
            this.pagination.page = val;
            this.refresh();
        },
        updateFilterDestinationTypeBy(key, val) {
            this.filterDestinationTypeBy = val;
            this.refresh()
        },
    },
    mounted() {
        this.refresh()
    },
}
</script>
<template>
    <div>
        <section class="nodes">
            <vs-row justify="space-between">
                <vs-col xs="6" sm="4" lg="2">
                    <div class="select-status-receiving-log">
                        <selector 
                        ref="status"
                        formKey="status"
                        placeholder="Select Status"
                        :name="''" 
                        :valueData="statusArr"
                        :selectedValue="statusSearch"
                        :isMultiple="false"
                        @updateValue="updateValue" 
                    />
                    </div>
                </vs-col>
                <vs-col xs="6" sm="4" lg="4">
                    <date-time 
                        :name="''" 
                        :rules="''" 
                        :formKey="'DATE_TIME_WITHOUT_SECONDS'" 
                        :valueData="tempDate"
                        typeInput="datetimerange" 
                        @updateValue="searchDate" 
                    />
                </vs-col>
                <vs-col xs="12" sm="12" lg="6">
                    <template>
                        <vs-row justify="end">
                            <vs-col xs="6" sm="8" lg="4">
                                <select-search-by
                                    key="searchOriginBy"
                                    :border="true"
                                    :isMultiple="false"
                                    :selectedValue="searchOriginBy"
                                    :valueData="searchOriginParams"
                                    @updateSearchBy="updateSearchBy"
                                />
                            </vs-col>
                            <vs-col xs="6" sm="4" lg="4">
                                <search-input
                                    ref="searchInput"
                                    :placeholder="searchOriginPlaceholder"
                                    @searchValue="searchValue"
                                    @handleSearch="handleSearch"
                                />
                            </vs-col>
                        </vs-row>
                    </template>
                </vs-col>
            </vs-row>
        </section>
        <template>
            
                <receiving-log-list
                    ref="receivingLogList"
                    :pageSize="page_size"
                    :page="page"
                    :limit="limit"
                    :searchOriginBy="searchOriginBy"
                    :searchValue="tempSearch"
                    :statusSearch="statusSearch"
                    :startDate="startDate"
                    :endDate="endDate"
                />
            
        </template>
    </div>
</template>

<script>
import axios from 'axios';
import master from "@/mixins/master";

import Breadcrumb from "@/components/breadcrumb/index"
import dateRange from "@/components/daterange/index"
import DateTime from "@/components/input/dateTime"
import NavItem from "@/components/navbar/navTab"
import Selector from "@/components/input/select"
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";

import ReceivingLogList from "@/views/receivingLog/destination/receivingLogList";

export default {
    name: "Receiving-Log-Dest",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "date-time": DateTime,
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy,
        "selector": Selector,
        "receiving-log-list": ReceivingLogList
    },
    data() {
        return {
            dataTable: [],
            tempSearch: null,
            limit: 20,
            page_size: 1,
            page: 1,
            loading: false,
            loadingStatus: false,
            tempDate: null,
            startDate: null,
            endDate: null,
            searchOriginPlaceholder: "Search Inbound Number",
            searchOriginBy: "inbound_number",
            searchOriginByDataType: false,
            searchOriginParams: [
                {
                    label: "Inbound Number",
                    value: "inbound_number"
                },
                {
                    label: "Item Number",
                    value: "item_number"
                },
            ],
            statusArr: [],
            statusSearch: '',
            startDate: '',
            endDate: '',
        }
    },
    methods: {
        async getDataStatus() {
            this.loadingStatus = true;
            try {
                const res = await axios.get(`${this.URL.status}?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`, this.Helper.header());
                const data = res.data.data;

                this.statusArr = [
                    { label: 'All Status', value: '-' },
                    ...data
                        .filter(item => item.status_type?.toLowerCase() === 'irregularity')
                        .map(item => ({
                            label: item.status_code + ' - ' + item.status_description,
                            value: item.status_code,
                            item,
                        })),
                ];
            } catch (err) {
                this.statusArr = [{ label: 'All Status', value: '-' }];
            } finally {
                this.loadingStatus = false;
            }
        },
        updateValue(key, val, info) {
            this.statusSearch = this.statusArr.find(item => item.value === val)?.value || '';
        },
        updateSearchBy(key, value, info) {
            this.searchOriginPlaceholder = key;
            this.searchOriginBy = value;
        },
        searchValue(value) {
            this.tempSearch = value;
        },
        searchDate(formKey, val) {
            this.tempDate = val;
            this.startDate = this.tempDate !== null ? this.tempDate[0] : '';
            this.endDate = this.tempDate !== null ? this.tempDate[1] : '';
        },
        handleSearch() {
            this.$nextTick(() => {
                this.$refs.searchInput.clear();
            });
        },
    },
    mounted() {
        this.getDataStatus();
    }
}
</script>
<style scoped>
    .select-status-receiving-log {
        margin-top: -10px !important;
    }
</style>

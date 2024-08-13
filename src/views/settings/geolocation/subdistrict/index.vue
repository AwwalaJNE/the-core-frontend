<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="6">
                <vs-row>
                    <vs-col w="4">
                        <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateFilterDateBy"
                            :valueData="dateParams" :selectedValue="filterDateBy" />
                    </vs-col>
                    <vs-col w="8">
                        <date-time :name="''" :rules="''" :formKey="'TRIGGER_DATE'" :valueData="dateRange"
                            typeInput="daterange" @updateValue="updateValue" />
                    </vs-col>
                </vs-row>
            </vs-col>
            <vs-col xs="12" sm="12" lg="6">
                <vs-row justify="end">
                    <vs-col xs="6" sm="8" lg="4">
                        <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy"
                            :valueData="searchParams" :selectedValue="searchBy" />
                    </vs-col>
                    <vs-col xs="6" sm="4" lg="4">
                        <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholder" />
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

        <!--Edit District Dialog end-->
            <dialog-create-edit-subdistrict
            :active="dialogGeolocationSubDistrict" 
            :closeDialog="closeDialogGeolocationSubDistrict"
            @refresh="refresh"
            btnBlue="Edit"
            title="Edit district"
            :dataItem="dataItem"
            />
        
        <dialog-confirm
            title="Remove Geolocation Subdistrict"
            :message="`Are you sure you want to remove this geolocation subdistrict with id ${this.id}?`"
            :active="activeDialogConfirmRemove"
            :loading="loadingConfirmRemove"
            :closeDialog="closeDialogConfirmRemove"
            @confirm="confirmRemove"
            @cancel="closeDialogConfirmRemove"
        />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogConfirm from "@/components/dialog/dialogConfirm"
import DialogCreateEditSubDistrict from "@/views/settings/geolocation/subdistrict/dialogCreateEditSubDistrict"
import SelectSearchBy from "@/components/search/selectSearchBy"
import SearchInput from "@/components/search/searchInput"
import DateTime from "@/components/input/dateTime"
import moment from "moment"
export default {
    name:"subdistrict-list",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-subdistrict": DialogCreateEditSubDistrict,
        "select-search-by": SelectSearchBy,
        "search-input": SearchInput,
        "date-time": DateTime,
        "dialog-confirm": DialogConfirm,
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "geolocation_subdistrict_id",
                    width: "xs"
                },
                {
                    label: "District",
                    key: "geolocation_district_name",
                    width: "auto"
                },
                {
                    label: "Subdistrict",
                    key: "geolocation_subdistrict_name",
                    width: "auto"
                },
                {
                    label: "Zip Code",
                    key: "geolocation_subdistrict_zip_code",
                    width: "auto"
                },
                {
                    label: "Tariff Code",
                    key: "geolocation_subdistrict_tarif_code",
                    width: "auto"
                },
                {
                    label: "Zona Wilayah",
                    key: "geolocation_subdistrict_zona_wilayah",
                    width: "auto"
                },
                {
                    label: "Kode Routing",
                    key: "geolocation_subdistrict_kode_routing",
                    width: "auto"
                },
                
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            dialogGeolocationSubDistrict: false,
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            dateRange: [],
            searchBy: "subdistrict id",
            filterDateBy: "create",
            searchPlaceholder: "Search Subdistrict ID",
            searchParams: [
            {
                    label: "Subdistrict ID",
                    value: "subdistrict id",
                },
                {
                    label: "District Name",
                    value: "district_name",
                },
                {
                    label: "Subdistrict Name",
                    value: "name_subdistrict",
                },
                {
                    label: "Zip Code",
                    value: "subdistrict_zip_code",
                },
                {
                    label: "Tariff Code",
                    value: "subdistrict_tarif_code",
                },
                {
                    label: "Zona Wilayah",
                    value: "subdistrict_zona_wilayah",
                },
                {
                    label: "Kode Routing",
                    value: "subdistrict_kode_routing",
                },
            ],
            dateParams: [
              {
                label: 'Created Date',
                value: 'create'
              }
            ],
            id: '',
            activeDialogConfirmRemove: false,
            loadingConfirmRemove:false,
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val)
                }
            }
        }
    },
    methods: {
        async getTableData(limit,page,q,from,to) {
            this.loading = true
            let query = "";
            let startDate = "";
            let endDate = "";
            if(q !== undefined) {
                query = q
            }
            if(from !== undefined && to !== undefined) {
              startDate = from
              endDate = to
            }
            await axios
                .get(this.URL.geolocation_subdistrict + 
                `?n=${this.listenNodeId}&sort_order=desc&&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`, 
                this.Helper.header())
                .then(res => {

                    this.dataTable = res.data.data

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', 'district data is empty!', ' Please create a new district data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate district list', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.geolocation_subdistrict_id === val.geolocation_subdistrict_id
                })
                this.dataItem = obj[0]

                this.$nextTick(() => {
                    this.dialogGeolocationSubDistrict = true
                });
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
        refresh(){
            let from = ''
            let to = ''

            if(this.dateRange != null && this.dateRange.length > 0) {
                from = moment(this.dateRange[0]).format("YYYY-MM-DD")
                to = moment(this.dateRange[1]).format("YYYY-MM-DD")
            }
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch,from,to)
        },
        closeDialogGeolocationSubDistrict() {
            this.dialogGeolocationSubDistrict = false
        },
        updateValue(key, val) {
            this.dateRange = val
            this.refresh()
        },
        searchValue (val) {
            this.tempSearch = val
            this.refresh()
        },
        updateSearchBy(key, val) {
            val = val.replaceAll(" ", "_");
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val;
        },
        actionRemove(val){
            this.id = val.geolocation_subdistrict_id;
            this.activeDialogConfirmRemove = true
        },
        confirmRemove() {
            this.loadingConfirmRemove=true
            this.removeData()
        },
        async removeData(){
            await axios
                .delete(
                    this.URL.geolocation_subdistrict + `/${this.id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.closeDialogConfirmRemove()
                    this.loadingConfirmRemove = false
                    this.refresh()
                    this.openNotification(null, 'Delete success', 'Delete subdistrict is success')
                }).catch(err => {
                    this.loadingConfirmRemove = false
                    this.closeDialogConfirmRemove()
                    this.loading = false
                    this.openNotification('danger', 'Delete failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        closeDialogConfirmRemove(){
            this.activeDialogConfirmRemove = false
            this.loadingConfirmRemove=false
        },
    },
    mounted() {
        this.refresh()
    },
}
</script>

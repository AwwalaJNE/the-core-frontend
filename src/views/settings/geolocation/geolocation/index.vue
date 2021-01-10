<template>
    <div>
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

        <!--Create User Dialog end-->
            <!-- <dialog-create-edit-role 
            :active="dialogRole" 
            :closeDialogRole="closeDialogRole"
            :refresh="refresh"
            title="Edit role"
            :dataItem="dataItem"
            /> -->
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
export default {
    name:"geolocation-list",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        // "dialog-create-edit-role": DialogCreateEditRole
    },
    props: {
        query: String
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
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Geolocation",
                    key: "geolocation_location_name",
                    width: "auto"
                },
                {
                    label: "Province",
                    key: "geolocation_province_name",
                    width: "auto"
                },
                {
                    label: "City",
                    key: "geolocation_city_name",
                    width: "auto"
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
                    label: "Timezone",
                    key: "geolocation_province_time_zone",
                    width: "auto"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            dialogGeolocation: false,
            pagination: {
                limit:5,
                page_size: 1,
                page: 1
            }
        }
    },
    methods: {
        async getTableData(limit,page,q) {
            this.loading = true
            let query = "";
            if(q !== undefined) {
                query = q
            }
            await axios
                .get(this.URL.geolocation + 
                `?n=${this.listenNodeId}&sort_order=desc&&limit=${limit}&page=${page}&s=${query}`, 
                this.Helper.header())
                .then(res => {
                    this.dataTable = res.data.data

                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length == 0) {
                        this.openNotification('warn', 'Failed to populate country data', ' data is empty or not found, please check your keyword in the input search')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate country list', err)
                })
        },
        actionUpdate(){

        },
        actionRemove(){

        },
        actionLimit(val){
            this.pagination.limit = val
            this.pagination.page = 1
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },
        actionPagination(val) {
            this.pagination.page = val
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },
        refresh(){
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },
    },
    mounted() {
        this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
    },
}
</script>
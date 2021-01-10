<template>
    <div>
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
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogCreateEditSubDistrict from "@/views/settings/geolocation/subdistrict/dialogCreateEditSubDistrict"
export default {
    name:"subdistrict-list",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-subdistrict": DialogCreateEditSubDistrict
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
                    label: "Name",
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
                limit:5,
                page_size: 1,
                page: 1
            }
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
        async getTableData(limit,page,q) {
            this.loading = true
            let query = "";
            if(q !== undefined) {
                query = q
            }
            await axios
                .get(this.URL.geolocation_subdistrict + 
                `?n=${this.listenNodeId}&sort_order=desc&&limit=${limit}&page=${page}&s=${query}`, 
                this.Helper.header())
                .then(res => {
                    console.log(res)
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
                console.log(this.dataItem, 'nihh val', val)
                this.$nextTick(() => {
                    this.dialogGeolocationSubDistrict = true
                });
            }
        },
        async actionRemove(val){
            await axios
                .delete(
                    this.URL.geolocation_subdistrict + `/${val.geolocation_subdistrict_id}`,
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.refresh()
                    this.openNotification(null, 'Delete success', 'Delete subdistrict is success')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Delete failed', err.response ? err.response.data.message : 'something went wrong')
                })
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
            console.log("refresh")
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },
        closeDialogGeolocationSubDistrict() {
            this.dialogGeolocationSubDistrict = false
        }
    },
    mounted() {
        this.refresh()
    },
}
</script>

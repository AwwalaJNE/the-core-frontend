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

        <!--Update province Dialog-->
            <dialog-create-edit-province 
            :active="dialogGeolocationProvince" 
            :closeDialog="closeDialogProvince"
            @refresh="refresh"
            btnBlue="Edit"
            title="Edit province"
            :dataItem="dataItem"
            />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogCreateEditProvince from "@/views/settings/geolocation/province/dialogCreateEditProvince"
export default {
    name:"province-list",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-province": DialogCreateEditProvince
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "geolocation_province_id",
                    width: "xs"
                },
                {
                    label: "Name",
                    key: "geolocation_province_name",
                    width: "auto"
                },
                {
                    label: "Country",
                    key: "geolocation_country_name",
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
            dialogGeolocationProvince: false,
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
                .get(this.URL.geolocation_province + 
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
                        this.openNotification('warn', 'provinces data is empty!', ' Please create a new province data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate province list', err)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.geolocation_province_id === val.geolocation_province_id
                })
                this.dataItem = obj[0]
                console.log(this.dataItem, 'nihh val update', val)
                this.$nextTick(() => {
                    this.dialogGeolocationProvince = true
                });
            }
        },
        async actionRemove(val){
            await axios
                .delete(
                    this.URL.geolocation_province + `/${val.geolocation_province_id}`,
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.refresh()
                    this.openNotification(null, 'Romove success', 'Romove role is success')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Romove role is failed', err)
                })
        },
        actionLimit(val){
            this.pagination.limit = val
            this.pagination.page = 1
            this.getTableData(this.pagination.limit,this.pagination.page)
        },
        actionPagination(val) {
            this.pagination.page = val
            this.getTableData(this.pagination.limit,this.pagination.page)
        },
        refresh(){
            this.getTableData(this.pagination.limit,this.pagination.page)
        },
        closeDialogProvince() {
            this.dialogGeolocationProvince = false
        }
    },
    mounted() {
        this.getTableData(this.pagination.limit,this.pagination.page)
    },
}
</script>
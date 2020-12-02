<!--
    - @desc component yang handle crud frontend connote item
    - @param -
    - @emit -
    - @props -
-->

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
        @actionUpdate="actionUpdate"
        @actionRemove="actionRemove"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
export default {
    name:"list-user",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster
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
                    label: "Connote",
                    key: "connote_number",
                    width: "auto"
                },
                {
                    label: "Bag",
                    key: "on_bag",
                    width: "auto"
                },
                {
                    label: "Date",
                    key: "created_at",
                    width: "xs"
                },
                {
                    label: "Origin",
                    key: "connote_shipper_tariff_code",
                    width: "auto"
                },
                {
                    label: "Destination",
                    key: "connote_receiver_tariff_code",
                    width: "auto"
                },
                {
                    label: "Weight(Kg)",
                    key: "connote_chargeable_weight",
                    width: "auto"
                },                
                {
                    label: "Service",
                    key: "connote_service_code",
                    width: "auto"
                },
                {
                    label: "SLA",
                    key: "connote_sla_date",
                    width: "xs"
                },
                {
                    label: "Wood Package",
                    key: "packing_kayu_type",
                    width: "auto"
                },
                {
                    label: "Status",
                    key: "status_inventory",
                    width: "auto"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            dialogUser: false,
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
                .get(
                    this.URL.connote +
                    `?n=1&sort_order=desc&limit=${limit}&page=${page}&s=${query}`, 
                    this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    // arr.map(item => {
                    //     item["user_nodes"] = item.user_nodes.toString()
                    // })
                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    // if(res.data.data.length == 0) {
                    //     this.openNotification('warn', 'Failed to populate User data', )
                    // }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate users list', err.response.data.message)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.user_id === val.user_id
                })
                this.dataItem = obj[0]
                console.log(this.dataItem, 'nihh val', val)
                this.$nextTick(() => {
                    this.dialogUser = true
                });
            }
        },
        async actionRemove(val){
            await axios
                .delete(
                    this.URL.user + `/${val.user_id}`,
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
            this.refresh()
        },
        actionPagination(val) {
            this.pagination.page = val
            this.refresh()
        },
        refresh(val){
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },
        closeDialogUser(){
            this.dialogUser = false
        }
    },
    mounted() {
        this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
    },
}
</script>
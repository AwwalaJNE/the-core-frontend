<!--
    - @desc component yang handle crud frontend connote item
    - @param -
    - @emit -
    - @props -
-->

<template>
    <div>
        <table-master 
        hideColumnKey="-"
        :dataTable="dataTable" 
        :dataColumn="datacolumn" 
        :tableLoading="loading"
        :pageSize="pagination.page_size"
        :page="pagination.page"
        :limit="pagination.limit"
        :hasAction="false"
        :hasLinked="['koli_number']"
        :hasPagination="true"
        @actionUpdate="actionUpdate"
        @actionRemove="actionRemove"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        @handleEdit="showData"
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
        query: String,
        queryBag: String,
        queryInventory: String

    },
    components: {
        "table-master" : TableMaster
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.pagination.page = 1
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.status_bag, this.statusinventory)
                }
            }
        },
        queryInventory: function(val, old) {
          if(val !== undefined) {
            this.statusinventory = val
            if(this.statusinventory !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.status_bag, val)
            }
          }
        },
        queryBag: function(val, old) {
          if(val !== undefined) {
            this.status_bag = val
            if(this.status_bag !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, val, this.statusinventory)
            }
          }
        },

    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Connote",
                    key: "koli_number",
                    width: "auto"
                },
                {
                    label: "Bag",
                    key: "bag_number",
                    width: "auto"
                },
                {
                    label: "Date",
                    key: "created_at",
                    width: "xs"
                },
                {
                    label: "Origin",
                    key: "origin_tariff_code",
                    width: "auto"
                },
                {
                    label: "Destination",
                    key: "destination_tariff_code",
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
                    key: "is_confirmed",
                    width: "auto"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            dialogUser: false,
            status_bag:"",
            statusinventory:"",
            pagination: {
                limit:5,
                page_size: 1,
                page: 1
            }
        }
    },
    methods: {
        async getTableData(limit,page,q, statusBag, statusInventory) {
            this.loading = true
            let query = "";
            let isOnBag = "";
            let isInventory = "";
            if(q !== undefined) {
                query = q
            }
            if(statusBag !== undefined && statusBag !== '-') {
              isOnBag = statusBag
            }
            if(statusInventory !== undefined && statusInventory !== '-') {
              isInventory = statusInventory
            }
            await axios
                .get(
                    this.URL.koli +
                    `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&is_confirmed=${isInventory}&is_on_bag=${isOnBag}&page=${page}&s=${query}`,
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
                    //     this.openNotification('warn', null, 'Failed to populate User data', )
                    // }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate users list', err.response.data.message)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.user_id === val.user_id
                })
                this.dataItem = obj[0]

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

                    this.refresh()
                    this.openNotification(null, 'Romove success', 'Romove role is success')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Romove role is failed', err)
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.status_bag, this.statusinventory)
        },
        closeDialogUser(){
            this.dialogUser = false
        },

        showData(row) {
          this.$router.push(`/connote-detail/${row.koli_number}`);
          this.setRoutePageHistory(this.$route.meta, false);
        },
    },
    mounted() {
        this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.status_bag, this.statusinventory)
    },
}
</script>
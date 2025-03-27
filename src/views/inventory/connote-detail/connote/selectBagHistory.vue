<template>
    <div>
        <table-master 
        hideColumnKey="bag-history"
        :dataTable="dataTable" 
        :dataColumn="datacolumn" 
        :tableLoading="loading"
        :pageSize="pagination.page_size"
        :page="pagination.page"
        :limit="pagination.limit"
        :hasAction="false"
        :hasLinked="['bag_number']"
        :hasPagination="true"
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
    name:"connote-bag-history",
    mixins: [master],
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                  label: "Bag Number",
                  key: "bag_number",
                  width: "sm",
                },
                {
                  label: "Create Date",
                  key: "created_at",
                  width: "xs",
                },
                {
                    label: "User Create",
                    key: "user_creator",
                    width: "xs"
                },
                {
                    label: "Node Create",
                    key: "node_creator",
                    width: "auto"
                },
                {
                  label: "Open Date",
                  key: "opened_at",
                  width: "xs",
                },
                {
                    label: "User Open",
                    key: "user_opener",
                    width: "xs"
                },
                {
                    label: "Node Open",
                    key: "node_opener",
                    width: "auto"
                },
                {
                    label: "Remark",
                    key: "remark",
                    width: "auto"
                },
                
            ],
            loading: false,
            connote_number:"",
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            }
        }
    },
    methods: {
        async getTableData(limit,page) {
            await axios
                .get(
                    this.URL.connote +
                    `/${this.connote_number}/bag-history?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}`,
                    this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    arr.map((item, index) => {
                        item["counter"] = index+1
                        item["remark"] = item.deleted_at ? `Removed from the bag at ${item.deleted_at}` : ""
                    })
                    this.dataTable = arr
                    this.pagination.page = res.data.hasOwnProperty('meta') ? res.data.meta.current_page : 1
                    this.pagination.limit = res.data.hasOwnProperty('meta') ? parseInt(res.data.meta.per_page) : 20
                    this.pagination.page_size = res.data.hasOwnProperty('meta') ? res.data.meta.last_page : 1
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err?.response?.data?.code ?? '', 'Gagal', err?.response?.data?.message ?? "Gagal mendapatkan riwayat Bag")
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
            this.getTableData(this.pagination.limit,this.pagination.page)
        },
        getParamRoute(){
          if(this.$route.params.id){
            this.connote_number = this.$route.params.id
          }
        },
    },
    mounted() {
        this.getParamRoute()
        this.refresh()
    },
}
</script>
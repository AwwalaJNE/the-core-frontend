<!--
    - @desc component yang handle crud frontend connote item
    - @param -
    - @emit -
    - @props -
-->
<template>
  <vs-row>
    <vs-col xs="12" sm="6" lg="6" >
      <div class="box view">
        <div class="summary-unbag">
          <span class="subtitle" align="right"><p>0</p></span>
          <span class="title" align="right"><h4>Unbagged</h4></span>
        </div>
        <table-master
            :dataTable="dataTableBag"
            :dataColumn="datacolumn"
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasAction="false"
            :removeOnly="false"
            :hasPagination="false"
            @actionRemove="actionRemove"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
        />
      </div>

    </vs-col>
    <vs-col xs="12" sm="6" lg="6">
      <div class="box view">
        <div class="summary-unbag">
          <span class="subtitle" align="right"><p>0/0</p></span>
          <span class="title" align="right"><h4>Connote Scanned</h4></span>
        </div>
        <table-master
            :dataTable="dataTable"
            :dataColumn="datacolumn"
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasAction="false"
            :removeOnly="false"
            :hasPagination="false"
            @actionRemove="actionRemove"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
        />
      </div>
    </vs-col>
  </vs-row>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
export default {
    name:"list-detailbag",
    mixins: [master],
    props: {
        query: String,
        bagId: String

    },
    components: {
        "table-master" : TableMaster
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, this.bag_id)
                }
            }
        },


    },
    data() {
        return {
            dataTable: [],
            dataTableBag: [],
            datacolumn: [
                {
                    label: "No",
                    key: "no",
                    width: "xs"
                },
                {
                    label: "Items",
                    key: "item_number",
                    width: "auto"
                }
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            bag_id:"",
            bag_number :'',
            total_connote :'',
            total_weight :'',
            actual_weight :'',
            bag_detail_qty:'',
            pagination: {
                limit:5,
                page_size: 1,
                page: 1
            }
        }
    },
    methods: {

        async getTableData(limit,page, bag) {
            this.loading = true
            let bagId = "";
            if(bag !== undefined) {
              bagId = bag
            }

            await axios
                .get(
                    this.URL.bag + '/'+bagId+`?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    let arr = res.data.detail
                    arr.map((item, index)  => {
                      item["no"] = index+1
                    })
                    this.getSummaryBag(res)
                  // arr.map(item => {
                    //     item["user_nodes"] = item.user_nodes.toString()
                    // })
                    this.dataTable = arr
                    // this.pagination.page = res.data.meta.current_page
                    // this.pagination.limit = parseInt(res.data.meta.per_page)
                    // this.pagination.page_size = res.data.meta.last_page
                    // if(res.data.data.length == 0) {
                    //     this.openNotification('warn', 'Failed to populate User data', )
                    // }
                    
                    this.loading = false
                }).catch(err => {
                  console.log(err)
                    this.loading = false
                    // this.$router.push('/inventory/bagging')
                    // this.openNotification('danger', 'Failed to populate users list', err.response.data.message)
                })
        },

        getSummaryBag(val){
          this.bag_number = val.data.data.bag_number
          this.bag_detail_qty = val.data.data.bag_detail_qty
          this.total_connote = val.data.data.detail.length
          this.total_weight = val.data.data.bag_weight
          this.actual_weight = val.data.data.bag_weight
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
                    this.URL.bag+`/${val.bag_number}/detail/${val.bag_detail_id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.refresh()
                    this.openNotification('success', 'Romove success', 'Romove bag item successfully')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Romove bag item is failed', err)
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.bag_id)
        },
        closeDialogUser(){
            this.dialogUser = false
        },
        getBagIdParam(){
          this.bag_id = this.$route.params.id
        }
    },
    mounted() {
        this.getBagIdParam()
        this.getTableData(this.pagination.limit,this.pagination.page,this.bag_id)
    },
}
</script>
<style lang="scss">

  .summary-unbag p{
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .summary-unbag h4{
    margin-top: 0px;
  }

</style>
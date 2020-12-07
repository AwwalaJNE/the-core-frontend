<!--
    - @desc component yang handle crud frontend connote item
    - @param -
    - @emit -
    - @props -
-->
<template>
    <div>
        <div class="summary-bag">
          <vs-row>
            <vs-col xs="3" sm="3" lg="3" align="left">
              <span><b>Bag No. {{ bag_number }}</b></span>
            </vs-col>
            <vs-col xs="3" sm="3" lg="3" align="left">
              <span><p>Service: REG</p></span>
              <span><p>Destination: CGK</p></span>
            </vs-col>
            <vs-col xs="3" sm="3" lg="3" align="left">
              <span><p>Total Connote: {{ total_connote }} Pcs</p></span>
              <span><p>Total Weight: {{ total_weight }} Kg</p></span>
              <span><p>Actual Weight: {{ actual_weight }} Kg</p></span>
            </vs-col>
            <vs-col xs="3" sm="3" lg="3" align="right"><span><h1>{{ bag_detail_qty }}</h1></span><p>Bagged</p></vs-col>
          </vs-row>
        </div>

        <table-master
        :dataTable="dataTable" 
        :dataColumn="datacolumn" 
        :tableLoading="loading"
        :pageSize="pagination.page_size"
        :page="pagination.page"
        :limit="pagination.limit"
        :hasAction="false"
        :removeOnly="true"
        :hasPagination="true"
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
            datacolumn: [
                {
                    label: "No",
                    key: "no",
                    width: "auto"
                },
                {
                    label: "Item",
                    key: "item_number",
                    width: "auto"
                },
                {
                    label: "Koli#",
                    key: "koli_count",
                    width: "xs"
                },
                {
                    label: "Of#",
                    key: "koli_off",
                    width: "auto"
                },
                {
                    label: "Destination Code",
                    key: "destination_tariff_code",
                    width: "auto"
                },
                {
                    label: "Service",
                    key: "connote_chargeable_weight",
                    width: "auto"
                },                
                {
                    label: "Type",
                    key: "item_type",
                    width: "auto"
                },
                {
                    label: "Date",
                    key: "created_at",
                    width: "xs"
                }
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            dialogUser: false,
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
                    this.URL.bag + '/'+bagId+`?n=1`,
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
                    this.$router.push('/inventory/bagging')
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
                    this.URL.bag + `/${val.item_number}`,
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
  .summary-bag p, h1{
    margin-top: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
    margin-bottom: 5px;
  }
  .summary-bag p{
    font-size: 16px;
  }
  .summary-bag{
    margin-bottom: 40px;
  }
</style>
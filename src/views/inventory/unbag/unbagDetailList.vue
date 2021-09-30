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
          <span class="subtitle" align="right"><p>{{total_bag}}</p></span>
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
          <span class="subtitle" align="right"><p>{{ total_connote_in_bag - total_connote }}/{{ total_connote_in_bag }}</p></span>
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
        itemNumber: String,
        bagId: String

    },
    components: {
        "table-master" : TableMaster
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
            bag_number:"",
            item_number :'',
            total_connote :0,
            total_connote_in_bag :0,
            total_bag :0,
            total_confirmed :0,
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
            this.getTableData(this.pagination.limit, this.pagination.page)
          }
        }
      },
      itemNumber: function(val, old) {
        if(val !== undefined || val !== null) {
          this.item_number = val
          if(this.item_number !== old || this.item_number !== null) {
            this.getTableData(this.pagination.limit, this.pagination.page)
          }
        }
      },


    },
    methods: {

        async getTableData(limit,page) {
            this.loading = true
            let form = {};
            let itemNumber = "";
            if(this.item_number !== undefined) {
              itemNumber = this.item_number
              form.item_number = this.item_number
            }
            if(this.bag_number !== null || this.bag_number !== undefined){
              form.bag_number = this.bag_number
              console.log(form.bag_number.length, form.item_number.length)
              form.bag_number.length === form.item_number.length ? (this.total_connote_in_bag = 0) : this.total_connote_in_bag;
            }
            await axios
                .post(
                    this.URL.unbagging + `/bag?n=${this.listenNodeId}`,
                    JSON.stringify(form),
                    this.Helper.header())
                .then(res => {
                    if(res.data.data.bag_number != undefined) { // response dari BE jika data kosong bentuknya [] array kosong :( harusnya kan object
                        let itemNumberLength = form.item_number.length;
                        console.log("item", itemNumberLength);
                        if (this.total_connote_in_bag == 0) {
                            let totalItem = res.data.data.hasOwnProperty("koli_detail")
                            ? itemNumberLength > 11 
                                ? Object.keys(res.data.data.koli_detail).length + 1 
                                : Object.keys(res.data.data.koli_detail).length
                                : 1;
                            this.total_connote_in_bag = totalItem;
                        } else {
                          this.total_connote_in_bag;
                        }
                          if(res.data.data.is_unbagged == 1){
                            this.dataTable = []
                            this.dataTableBag = []
                            this.handleClearData()
                            this.openNotification('success', 'Unbagging is Success')
                          
                          }else{
                            let arr = [];
                            let arrBag = [];
                            let dataBag = {};
                          
                            dataBag['no'] = 1
                            dataBag['item_number'] = res.data.data.bag_number
                            this.bag_number = res.data.data.bag_number
                            this.getSummaryBag(res)
                            arrBag.push(dataBag)
                            if(res.data.data.koli_detail && res.data.data.koli_detail.length > 0) {
                              arr = res.data.data.koli_detail
                              arr.map((item, index)  => {
                                item["no"] = index+1
                                item["item_number"] = item.koli_number
                              })
                              this.dataTable = arr
                            }else{
                                this.dataTable = []
                            }
                            this.dataTableBag = arrBag
                          }
                    }
                  
                    this.loading = false
                }).catch(err => {
                  console.log(err.response)
                    this.loading = false
                    // this.$router.push('/inventory/bagging')
                    this.openNotification('danger', 'Failed to populate Connote', (err.response && err.response.data && err.response.data.message) ? err.response.data.message : err)
                })
        },

        getSummaryBag(val){
          console.log("getSummaryBag", val)
          if(val.data != undefined ){ // response dari BE jika data kosong bentuknya [] array kosong :( harusnya kan object
            this.total_bag = 1
            // this.total_connote = val.data.data.bag_detail_qty
            // this.total_confirmed = val.data.data.koli_detail ? (this.total_connote - val.data.data.koli_detail.length) : 0 
            this.total_connote = val.data.data.koli_detail.length
            this.total_confirmed = val.data.data.unbagging_summary[0]["total_confirmed"]
          } else {
            this.openNotification('danger', 'Bag empty', 'Bag empty')
          }
        },
        handleClearData(){
          this.bag_number=""
          this.item_number =""
          this.total_connote =0
          setTimeout(() => {
                this.total_connote_in_bag = 0
            }, 1500)
          this.total_bag =0
          this.total_confirmed =0
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
      //
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
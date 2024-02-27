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
            <vs-col xs="12" sm="3" lg="3" align="left" class="bag-no">
              <span><b>Bag No. {{ bag_number }}</b></span>
            </vs-col>
            <vs-col xs="12" sm="3" lg="3" align="left" >
                <!-- <span><p>Service: REG</p></span> -->
                <span><p>Destination: {{bag_destination}}</p></span>
                <span><p>Total Connote: {{ total_connote }} Pcs</p></span>
            </vs-col>
            <vs-col xs="12" sm="3" lg="3" align="left" >
            
              <span><p>Total Weight: {{ total_weight }} Kg</p></span>
              <span><p>Actual Weight: {{ actual_weight }} Kg</p></span>
            </vs-col>
            <vs-col xs="12" sm="3" lg="3" align="right"><span><h1>{{ bag_detail_qty }}</h1></span><p>Bagged</p></vs-col>
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
                    width: "xs"
                },
                {
                    label: "Item",
                    key: "item_number",
                    width: "auto"
                },
                {
                    label: "Quantity",
                    key: "koli_qty",
                    width: "xs"
                },
                {
                    label: "Of#",
                    key: "koli_sequence",
                    width: "auto"
                },
                {
                  label: "Weight",
                  key: "koli_actual_weight",
                  width: "auto"
                },
                {
                    label: "Destination Code",
                    key: "destination_code",
                    width: "auto"
                },
                {
                    label: "Service",
                    key: "connote_service_code",
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
            bag_destination:'',
            pagination: {
                limit:20,
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
                    this.URL.bag + '/'+bagId.replace('/','-')+`?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    let arr = res.data.detail
                    let bag_des = res.data.dat ? res.data.data.destination.node_code  : '-'
                    
                    this.$ls.set('getDataBag',res.data.data);
                    // console.log(arr, res,'klas')
                    arr.map((item, index)  => {
                      item["no"] = index+1
                      item['destination_code'] = item.connote_receiver_tariff_code ?  item.connote_receiver_tariff_code : bag_des
                      item['bag_detail_qty'] = res.data.data.bag_detail_qty
                      item["isDisabled"] = item.is_confirmed == 0 ? true : false;
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
                    this.$emit("getResponse", res.data, this.loading)
                }).catch(err => {
                    let errMessage = err.response ? err.response.data.message : 'Failed to populate bag'
                    this.loading = false
                    this.$emit("getResponse", {}, this.loading)
                    this.openNotification('danger', 'Failed to populate bag', errMessage)
                })
        },

        getSummaryBag(val){
          this.bag_number = val.data.data.bag_number
          this.bag_detail_qty = val.data.data.bag_detail_qty
          this.total_connote = val.data.detail.length
          this.total_weight = val.data.data.bag_weight
          this.actual_weight = val.data.data.bag_actual_weight
          this.bag_destination = val.data.data.destination ? val.data.data.destination.node_code : ''
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
                    if(res.data.detail.length > 0){
                    this.refresh()
                    }else{
                        this.$router.push({ name: 'InventoryBag', params: { } });
                    }
                    this.openNotification('success', 'Romove success', 'Romove bag item successfully')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Romove bag item is failed', err)
                })
                detail
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
  .bag-detail {
    @include for-phone-only {
      text-align: right;
    }
  }
  .bag-no {
    @include for-phone-only {
        text-align: center;
        margin-bottom: 15px;
    }
  }
</style>
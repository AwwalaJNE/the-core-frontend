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
              <span><b>Bag No. </b></span><span><b>{{ bag_number }}</b></span>
            </vs-col>
            <vs-col xs="12" sm="3" lg="3" align="left" >
                <span v-if="!is_pra_runsheet && !loading"><p>Destination: {{bag_destination}}</p></span>
                <span><p>Total Connote: {{ total_connote }} Pcs</p></span>
            </vs-col>
            <vs-col xs="12" sm="3" lg="3" align="left" >
            
              <span><p>Total Weight: {{ total_weight }} Kg</p></span>
              <span v-if="!is_pra_runsheet && !loading"><p>Actual Weight: {{ actual_weight }} Kg</p></span>
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

        <dialog-confirm
            title="Remove Item Detail"
            :message="`Are you sure you want to remove item with id ${this.primaryKey}?`"
            :active="activeDialogConfirmRemove"
            :loading="loadingConfirmRemove"
            :closeDialog="closeDialogConfirmRemove"
            @confirm="confirmRemove"
            @cancel="closeDialogConfirmRemove"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogConfirm from "@/components/dialog/dialogConfirm"
export default {
    name:"list-detailbag",
    mixins: [master],
    props: {
        query: String,
        bagId: String

    },
    components: {
        "table-master" : TableMaster,
        "dialog-confirm": DialogConfirm,
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
                },
                {
                    label: "Runsheet Number",
                    key: "runsheet_number",
                    width: "auto"
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
            },
            is_pra_runsheet: false,
            parentId: '',
            id: '',
            primaryKey: '',
            activeDialogConfirmRemove: false,
            loadingConfirmRemove:false,
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

 
                    arr.map((item, index)  => {
                      item["no"] = index+1
                      item['destination_code'] = item.item_type === 'KOLI' ?  item.connote_receiver_tariff_code : item.node_tariff_code
                      item['koli_qty'] = item.item_type == 'KOLI' ? item.koli_qty : item.bag_detail_qty
                      item['koli_actual_weight'] = item.item_type == 'KOLI' ? item.koli_actual_weight : item.bag_weight
                      item['koli_sequence'] = item.item_type == 'KOLI' ? item.koli_sequence : '-'
                      item['connote_service_code'] = item.item_type == 'KOLI' ? item.connote_service_code : item.bag_service.join(', ')
                      item['bag_detail_qty'] = res.data.data.bag_detail_qty
                      item["isDisabled"] = res.data.data.is_approve === 1 ? true : false;
                      item["runsheet_number"] = item?.runsheet ? item?.runsheet?.[item?.runsheet?.length - 1]?.delivery_runsheet_number : '';
                    })
                    this.is_pra_runsheet = res.data.data.is_pra_runsheet === "1" ? true : false;
                    this.getSummaryBag(res)
                  // arr.map(item => {
                    //     item["user_nodes"] = item.user_nodes.toString()
                    // })
                    this.dataTable = arr
                    // this.pagination.page = res.data.meta.current_page
                    // this.pagination.limit = parseInt(res.data.meta.per_page)
                    // this.pagination.page_size = res.data.meta.last_page
                    // if(res.data.data.length == 0) {
                    //     this.openNotification('warn', null, 'Failed to populate User data', )
                    // }
                    
                    this.loading = false
                    this.$emit("getResponse", res.data, this.loading)
                }).catch(err => {
                    let errMessage = err.response ? err.response.data.message : 'Failed to populate bag'
                    this.loading = false
                    this.$emit("getResponse", {}, this.loading)
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate bag', errMessage)
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

                this.$nextTick(() => {
                    this.dialogUser = true
                });
            }
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
        },
        actionRemove(val){
            this.id = val.bag_detail_id;
            this.parentId = val.bag_number;
            this.primaryKey = val.item_number;
            this.activeDialogConfirmRemove = true
        },
        confirmRemove() {
            this.loadingConfirmRemove=true
            this.removeData()
        },
        async removeData(){
            await axios
                .delete(
                    this.URL.bag+`/${this.parentId}/detail/${this.id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.closeDialogConfirmRemove()
                    this.loadingConfirmRemove = false
                    if(res.data.detail.length > 0){
                        this.$emit("resetBagActualWeight")
                        this.refresh()
                    }else{
                        this.$router.push({ name: 'InventoryBag', params: { } });
                        this.setRoutePageHistory(this.$route.meta, false);
                    }
                    this.openNotification('success', null, 'Remove success', 'Remove bag item successfully')
                }).catch(err => {
                    this.loadingConfirmRemove = false
                    this.closeDialogConfirmRemove()
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Remove bag item is failed', err.response.data.message)
                })
        },
        closeDialogConfirmRemove(){
            this.activeDialogConfirmRemove = false
            this.loadingConfirmRemove=false
        },
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
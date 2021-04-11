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
        :customBtn="true"
        customBtn_label="PRINT"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        @actionRemove="actionRemove"
        @actionUpdate="actionUpdate"
        />

        <!-- dialog confirm remove Costing-->
        <dialog-confirm
          :active="activeDialogRemove"
          :loading="activeLoadingRemove"
          :closeDialog="closeDialogConfirmRemove"
          title="Remove Costing"
          message="Are you sure you want to Remove Costing ?"
          @confirm="confirmRemove"
          @cancel="closeDialogConfirmRemove"
        />

        <!-- dialog new edit costing setting-->
        <dialogCreateEditCostingSetting
            :active="dialogNewEditCostingSetting"
            @refresh="refresh"
            :withSchedule="false"
            :closeDialog="closeDialogNewEditCostingSetting"
            title="Edit Cost To Cost Setting"
            :dataItem="dataItem"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogConfirm from "@/components/dialog/dialogConfirm"
import DialogCreateEditCostingSetting from "@/views/costToCost/setting/dialogCreateEditCostingSetting"

export default {
    name:"Inbound-Incoming",
    mixins: [master],
    props: {
        query: String,
        dateFilter: Array,
        node:String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-confirm": DialogConfirm,
        "dialogCreateEditCostingSetting":DialogCreateEditCostingSetting,
    },
    data() {
        return {
            activeDialogRemove:false,
            activeLoadingRemove:false,
            dialogNewEditCostingSetting:false,
            dataTable: [],
            datacolumn: [
               
                {
                    label: "Cost Owner",
                    key: "owner_name",
                    width: "auto"
                },
                {
                    label: "Cost Payer",
                    key: "payer_name",
                    width: "auto"
                },
                 {
                    label: "Group Code",
                    key: "cost_group_code",
                    width: "xs"
                },
                {
                    label: "Cost Name",
                    key: "name",
                    width: "auto"
                },
                {
                    label: "Date From",
                    key: "date_from",
                    width: "auto"
                },
                
                {
                    label: "Date To",
                    key: "date_to",
                    width: "auto"
                },
                
                {
                    label: "Jumlah Connote",
                    key: "total_connote",
                    width: "auto"
                },
                
                {
                    label: "Cost",
                    key: "cost_value",
                    width: "auto"
                }
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            tempDate: [],
            cost_to_cost_id:'',
            dialogTariff: false,
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
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.startDate, this.endDate)
                }
            }
        },
        
        
    },
    methods: {
        async getTableData(limit,page,q, from, to) {
            this.loading = true
            let query = "";
            let startDate = "";
            let endDate = "";
            if(q !== undefined) {
                query = q
            }
            if(from !== undefined && to !== undefined) {
              startDate = from
              endDate = to
            }
            await axios
                .get(this.URL.cost_to_cost_report +
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`,
                this.Helper.header())
                .then(res => {
                    let data = res.data.data;
                    data.map(item=>{
                        item['name'] = item.cost_to_cost.name
                        item['owner_name'] = item.cost_to_cost.cost_owner[0] ? item.cost_to_cost.cost_owner[0].node_name : null
                        item['payer_name'] = item.cost_to_cost.cost_payer[0] ? item.cost_to_cost.cost_payer[0].node_name : null
                        item['cost_group_code'] = item.cost_to_cost.cost_group_code
                    })
                   
                    this.dataTable = data
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', 'tariff data is empty!', ' Please create cost to cost data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate tariff list', err)
                })
        },

        closeDialogConfirm(){
            this.confirmDialog = false
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.startDate, this.endDate)
        },

        actionDetail(row){
          this.$router.push({ name: 'InboundIncomingScan', params: { inbound_number: row.inbound_number } });
        },

        actionRemove(val){
           this.activeDialogRemove = true;
           this.cost_to_cost_id = val.cost_to_cost_id;
        },
        actionUpdate(val){
          console.log(val,'val up print')
        },
        async removeCosting(){
            await axios
                .delete(
                    this.URL.cost_to_cost + `/${this.cost_to_cost_id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    this.refresh()
                    this.closeDialogConfirmRemove();
                    this.openNotification(null, 'Romove success', 'Romove Costing is success')
                    
                }).catch(err => {
                    this.loading = false
                     this.closeDialogConfirmRemove();
                    this.openNotification('danger', 'Romove Costing is failed', err)
                   
                })
        },

         //cancel pickup
        confirmRemove() {
          this.activeLoadingRemove = true;
          this.removeCosting();
        },

        closeDialogConfirmRemove(){
          this.activeDialogRemove = false
          this.activeLoadingRemove=false
          this.cost_to_cost_id = ""
        },
        closeDialogNewEditCostingSetting() {
          this.dialogNewEditCostingSetting = false
        },

    },
    mounted() {
        this.refresh()
    }
}
</script>
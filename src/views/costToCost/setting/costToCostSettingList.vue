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

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogConfirm from "@/components/dialog/dialogConfirm"
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
        "dialog-confirm": DialogConfirm
    },
    data() {
        return {
            activeDialogRemove:false,
            activeLoadingRemove:false,
            dataTable: [],
            datacolumn: [
                {
                    label: "Group Code",
                    key: "cost_group_code",
                    width: "xs"
                },
                {
                    label: "Name",
                    key: "name",
                    width: "auto"
                },
                {
                    label: "Owner Name",
                    key: "owner_name",
                    width: "auto"
                },
                {
                    label: "Payer Name",
                    key: "payer_name",
                    width: "auto"
                },
                {
                    label: "Activity",
                    key: "tracking_type_name",
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
                .get(this.URL.cost_to_cost +
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`,
                this.Helper.header())
                .then(res => {
                    this.dataTable = res.data.data
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        this.openNotification('warn', 'tariff data is empty!', ' Please create a new tariff data')
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
           console.log(val, 'val update')
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

    },
    mounted() {
        this.refresh()
    }
}
</script>
<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="6">
                <vs-row>
                    <vs-col w="4">
                        <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateFilterDateBy"
                            :valueData="dateParams" :selectedValue="filterDateBy" />
                    </vs-col>
                    <vs-col w="8">
                        <date-time :name="''" :rules="''" :valueData="dateRange"
                            typeInput="daterange" @updateValue="updateValue" />
                    </vs-col>
                </vs-row>
            </vs-col>
            <vs-col xs="12" sm="12" lg="6">
                <vs-row justify="end">
                    <vs-col xs="6" sm="8" lg="4">
                        <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy"
                            :valueData="searchParams" :selectedValue="searchBy" />
                    </vs-col>
                    <vs-col xs="6" sm="4" lg="4">
                        <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholder" />
                    </vs-col>
                </vs-row>
            </vs-col>
        </vs-row>
        <table-master 
        hideColumnKey="node-link" 
        :dataTable="dataTable" 
        :dataColumn="datacolumn" 
        :tableLoading="loading"
        :pageSize="pagination.page_size"
        :page="pagination.page"
        :limit="pagination.limit"
        :hasAction="true"
        :hasPagination="true"
        @actionUpdate="actionUpdate"
        @actionRemove="actionRemove"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        />

        <!--Create nodelik Dialog end-->
             <dialog-create-edit-node-link
              :active="dialogNodeLink"
              :closeDialog="closeDialogNodeLink"
              @refresh="refresh"
              btnBlue="Edit"
              title="Edit Node Link"
              :dataItem="dataItem"
            />

        <dialog-confirm
          title="Remove Node Link"
          :message="`Are you sure you want to remove this node link with id ${this.id}?`"
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
import DialogCreateEditNodeLink from "@/views/settings/nodes/nodeLink/dialogCreateEditNodeLink";
import SelectSearchBy from "@/components/search/selectSearchBy"
import SearchInput from "@/components/search/searchInput"
import DateTime from "@/components/input/dateTime"
import moment from "moment"

export default {
    name:"Node-Link",
    mixins: [master],
    props: {
      query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-node-link":DialogCreateEditNodeLink,
      // "dialog-create-edit-role": DialogCreateEditRole
        "select-search-by": SelectSearchBy,
        "search-input": SearchInput,
        "date-time": DateTime,
        "dialog-confirm": DialogConfirm,
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "node_link_id",
                    width: "xs"
                },
                {
                    label: "Origin",
                    key: "node_origin.node_name",
                    width: "auto"
                },
                {
                    label: "Destination",
                    key: "node_destination.node_name",
                    width: "auto"
                },
                {
                    label: "Vehicle Type",
                    key: "vehicle_mode.vehicle_mode_name",
                    width: "auto"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            dialogNodeLink: false,
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            dateRange: [],
            searchBy: "node link id",
            filterDateBy: "create",
            searchPlaceholder: "Search Node Link ID",
            searchParams: [
              {
                label: "Node Link ID",
                value: "node link id"
              },
              {
                label: "Node Origin",
                value: "nodeOrigin"
              },
              {
                label: "Node Destination",
                value: "nodeDestination"
              },
              {
                label: "Vehicle Type",
                value: "vehicleMode"
              }
            ],
            dateParams: [
              {
                label: 'Created Date',
                value: 'create'
              }
            ],
            id: '',
            activeDialogConfirmRemove: false,
            loadingConfirmRemove:false,
        }
    },
    watch: {
      query: function(val, old) {
        if(val !== undefined) {
          this.tempSearch = val
          if(this.tempSearch !== old) {
            this.pagination.page = 1
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch)
          }
        }
      }
    },
    methods: {
        async getTableData(limit,page,q,from,to) {
            this.loading = true
            let query = "";
            let startDate = "";
            let endDate = "";
            if(q !== undefined) {
                this.tempSearch = q
                query = q
            }
            if(from !== undefined && to !== undefined) {
              startDate = from
              endDate = to
            }
            await axios
                .get(this.URL.node_link +
                `?n=${this.listenNodeId}&sort_order=desc&&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        this.dataTable = res.data.data
                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    } else {
                      this.dataTable = []
                      this.pagination.page = 1
                      this.pagination.limit = 20
                      this.pagination.page_size = 1
                    }
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate node type list', err.response.data.message)
                })
        },

        actionUpdate(val){
          if(this.dataTable.length > 0) {
            let obj = this.dataTable.filter(item => {
              return item.node_link_id === val.node_link_id
            })
 
            this.dataItem = obj[0]
            this.dataItem.node_link_vehicle_mode_id = this.dataItem["vehicle_mode"]["vehicle_mode_name"] ? this.dataItem["vehicle_mode"]["vehicle_mode_name"] : this.dataItem["node_link_vehicle_mode_id"]
            this.dataItem.node_link_origin_id = this.dataItem["node_origin"]["node_name"] ? this.dataItem["node_origin"]["node_name"] : this.dataItem["node_link_origin_id"]
            this.dataItem.node_link_destination_id = this.dataItem["node_destination"]["node_name"] ? this.dataItem["node_destination"]["node_name"] : this.dataItem["node_link_destination_id"]

            this.$store.dispatch(`SET_NODELINK_NODE_LINK_ORIGIN_ID_ValueData`, this.dataItem["node_origin"]) // asumsi ada flag node_name (samain dg querysearch. klo mau dinamis pakein prop aja)
            this.$store.dispatch(`SET_NODELINK_NODE_LINK_DESTINATION_ID_ValueData`, this.dataItem["node_destination"]) // asumsi ada flag node_name
            this.$store.dispatch(`SET_NODELINK_NODE_LINK_VEHICLE_MODE_ID_ValueData`, this.dataItem["vehicle_mode"]) // asumsi ada flag node_name
            



            this.$nextTick(() => {
              this.dialogNodeLink = true
            });
          }
        },
        actionLimit(val){
            this.pagination.limit = val
            this.pagination.page = 1
            this.getTableData(this.pagination.limit,this.pagination.page)
        },
        actionPagination(val) {
            this.pagination.page = val
            this.getTableData(this.pagination.limit,this.pagination.page)
        },
        refresh(){
            let from = ''
            let to = ''

            if(this.dateRange != null && this.dateRange.length > 0) {
                from = moment(this.dateRange[0]).format("YYYY-MM-DD")
                to = moment(this.dateRange[1]).format("YYYY-MM-DD")
            }
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch,from,to)
        },
        closeDialogNodeLink() {
          this.dialogNodeLink = false
        },
        updateValue(key, val) {
            this.dateRange = val
            this.refresh()
        },
        searchValue (val) {
            this.tempSearch = val
            this.refresh()
        },
        updateSearchBy(key, val) {
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val;
        },

        actionRemove(val){
            this.id = val.node_link_id;
            this.activeDialogConfirmRemove = true
        },
        confirmRemove() {
            this.loadingConfirmRemove=true
            this.removeData()
        },
        async removeData(){
          await axios
              .delete(
                  this.URL.node_link + `/${this.id}?n=${this.listenNodeId}`,
                  this.Helper.header())
              .then(res => {
                this.closeDialogConfirmRemove()
                this.loadingConfirmRemove = false
                this.refresh()
                this.openNotification(null, 'Success', 'Delete node link is success')
              }).catch(err => {
                this.loadingConfirmRemove = false
                this.closeDialogConfirmRemove()
                this.loading = false
                this.openNotification('danger', err.response ? err.response.data.code : '', 'Delete node link is failed', err.response ? err.response.data.message : 'something went wrong')
              })
        },
        closeDialogConfirmRemove(){
            this.activeDialogConfirmRemove = false
            this.loadingConfirmRemove=false
        },
    },
    mounted() {
        this.getTableData(this.pagination.limit,this.pagination.page)
    },
}
</script>
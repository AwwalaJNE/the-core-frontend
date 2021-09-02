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
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogCreateEditNodeLink from "@/views/settings/nodes/nodeLink/dialogCreateEditNodeLink";
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
            }
        }
    },
    watch: {
      query: function(val, old) {
        if(val !== undefined) {
          this.tempSearch = val
          if(this.tempSearch !== old) {
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch)
          }
        }
      }
    },
    methods: {
        async getTableData(limit,page,q) {
            this.loading = true
            let query = "";
            if(q !== undefined) {
                this.tempSearch = q
                query = q
            }
            await axios
                .get(this.URL.node_link +
                `?n=${this.listenNodeId}&sort_order=desc&&limit=${limit}&page=${page}&s=${query}`, 
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
                    this.openNotification('danger', 'Failed to populate node type list', err.response.data.message)
                })
        },

        actionUpdate(val){
          if(this.dataTable.length > 0) {
            let obj = this.dataTable.filter(item => {
              return item.node_link_id === val.node_link_id
            })
            // console.log(obj,'obj')
            this.dataItem = obj[0]
            this.dataItem.node_link_vehicle_mode_id = this.dataItem["vehicle_mode"]["vehicle_mode_name"] ? this.dataItem["vehicle_mode"]["vehicle_mode_name"] : this.dataItem["node_link_vehicle_mode_id"]
            this.dataItem.node_link_origin_id = this.dataItem["node_origin"]["node_name"] ? this.dataItem["node_origin"]["node_name"] : this.dataItem["node_link_origin_id"]
            this.dataItem.node_link_destination_id = this.dataItem["node_destination"]["node_name"] ? this.dataItem["node_destination"]["node_name"] : this.dataItem["node_link_destination_id"]

            this.$store.dispatch(`SET_NODELINK_NODE_LINK_ORIGIN_ID_ValueData`, this.dataItem["node_origin"]) // asumsi ada flag node_name (samain dg querysearch. klo mau dinamis pakein prop aja)
            this.$store.dispatch(`SET_NODELINK_NODE_LINK_DESTINATION_ID_ValueData`, this.dataItem["node_destination"]) // asumsi ada flag node_name
            this.$store.dispatch(`SET_NODELINK_NODE_LINK_VEHICLE_MODE_ID_ValueData`, this.dataItem["vehicle_mode"]) // asumsi ada flag node_name
            


            console.log(this.dataItem, 'nihh val', val, this.dataItem['node_link_origin_id'])
            this.$nextTick(() => {
              this.dialogNodeLink = true
            });
          }
        },
        async actionRemove(val){
          await axios
              .delete(
                  this.URL.node_link + `/${val.node_link_id}?n=${this.listenNodeId}`,
                  this.Helper.header())
              .then(res => {
                console.log('res', res)
                this.refresh()
                this.openNotification(null, 'Success', 'Delete node link is success')
              }).catch(err => {
                this.loading = false
                this.openNotification('danger', 'Delete node link is failed', err)
              })
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
          console.log("refresh")
          this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },
        closeDialogNodeLink() {
          this.dialogNodeLink = false
        }
    },
    mounted() {
        this.getTableData(this.pagination.limit,this.pagination.page)
    },
}
</script>
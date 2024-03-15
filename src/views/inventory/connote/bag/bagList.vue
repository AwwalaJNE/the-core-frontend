<!--
    - @desc component yang handle crud frontend user role
    - @param -
    - @emit -
    - @props -
-->

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
        :hasLinked="['bag_number']"
        :printAction="true"
        :hasPagination="true"
        @handleEdit="actionDetail"
        @actionPrint="actionPrint"
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
    name:"Role-list",
    mixins: [master],
    props: {
        query: String,
        bagDestination: [],
        bagRouting: String,
        bagTipe: String
    },
    components: {
        "table-master" : TableMaster,
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.bagFilter,this.routingFilter)
                }
            }
        },
      bagDestination: function(val, old) {
          if(val !== undefined) {
            this.bagFilter = val
            if(this.bagFilter !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, val,this.routingFilter)
            }
          }
        },
        bagRouting: function(val, old) {
          if(val !== undefined) {
            this.routingFilter = val
            if(this.routingFilter !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.bagFilter, val )
            }
          }
        },
        bagTipe: function(val, old) {
          if(val !== undefined) {
            this.tipeBagFilter = val
            if(this.tipeBagFilter !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.bagFilter,this.routingFilter, val )
            }
          }
        }
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Bag #",
                    key: "bag_number",
                    width: "xs"
                },
                {
                    label: "Date #",
                    key: "created_at",
                    width: "xs"
                },
                {
                    label: "# Connote",
                    key: "bag_detail_qty",
                    width: "auto"
                },
                {
                    label: "Weight (Kg)",
                    key: "bag_weight",
                    width: "auto"
                },
                {
                    label: "Origin",
                    key: "origin_tariff_code",
                    width: "auto"
                },
                {
                    label: "Destination",
                    key: "destination_tariff_code",
                    width: "auto"
                },
                {
                    label: "Runsheet",
                    key: "total_runsheet",
                    width: "xs"
                },
                {
                    label: "UnRunsheet",
                    key: "total_unRunsheet",
                    width: "xs"
                },
                {
                    label: "Consolidation",
                    key: "is_consolidated",
                    width: "xs"
                },
                {
                    label: "With Courier",
                    key: "current_user",
                    width: "auto"
                },
                {
                    label: "Surat Muatan",
                    key: "surat_muatan",
                    width: "auto"
                },
                {
                    label: "Surat Jalan",
                    key: "surat_jalan",
                    width: "auto"
                }
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            bagFilter: this.bagDestination ? this.bagDestination : "",
            routingFilter: this.bagRouting ? this.bagRouting : "",
            tipeBagFilter: this.bagTipe ? this.bagTipe : "",
            dialogRole: false,
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            }
        }
    },
    methods: {
        async getTableData(limit,page,q, bagDestination, bagRouting, bagTipe) {
            this.loading = true
            let query = "";
            let bagDes = "";
            let bagRout= "";
            let bagTipee= "";
            if(q !== undefined) {
                query = q
            }
            if(bagDestination !== undefined && bagDestination !== '-') {
              bagDes = bagDestination
            }
            if(bagRouting !== undefined && bagRouting !== '-') {
              bagRout = bagRouting
            }
            if(bagTipe !== undefined && bagTipe !== '-') {
              bagTipee = bagTipe
            }
            await axios
                .get(this.URL.bag +
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&destination_node=${bagDes}&routing=${bagRout}&tipe_bag=${bagTipee}`,
                this.Helper.header())
                .then(res => {
                    res.data.data.forEach(el => {
                        el.surat_muatan = []
                        el.surat_jalan = []
                        el.total_runsheet = 0
                        el.total_unRunsheet = 0
                        if (el.sj_detail.length > 0) {
                            el.sj_detail.forEach(sj => {
                                el.surat_jalan.push(sj.manifest_do_number)
                            });
                            
                        }
                        
                        if (el.sm_detail.length > 0) {
                            el.sm_detail.forEach(sm => {
                                el.surat_muatan.push(sm.manifest_number)
                            })
                        }
                        if (el.runsheet_detail.length > 0) {
                            el.runsheet_detail.forEach(runsheet => {
                                if (runsheet.status_delivery !== null) {
                                    el.total_runsheet++ 
                                } else {
                                    el.total_unRunsheet++
                                }
                            })
                        }
                        el.surat_muatan = el.surat_muatan.join(", ")
                        el.surat_jalan = el.surat_jalan.join(", ")
                    });
                    this.dataTable = res.data.data

                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length == 0) {
                        if (query != "") {
                            this.openNotification('danger', 'Failed to populate bag data', ' data is empty or not found, please check your keyword in the input search')
                        }
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate bag list', err)
                })
        },
        actionDetail(val){
          this.$router.push('/bagging-detail/'+val.bag_number.replace('/','-'))
        },
        actionPrint(val){
            let routeData = this.$router.resolve({ 
                name: 'printGeneral', 
                params: { 
                    'id': val.bag_number, 
                    'type': 'bag',
                    'node_id': this.listenNodeId
                } 
            });
        window.open(routeData.href, '_blank');
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.bagFilter, this.routingFilter, this.tipeBagFilter)
        },
        closeDialogRole() {
            this.dialogRole = false
        }
    },
    mounted() {
        this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.bagFilter, this.routingFilter, this.tipeBagFilter)
    },
}
</script>
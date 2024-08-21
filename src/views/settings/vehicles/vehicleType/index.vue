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
        :dataTable="dataTable" 
        :dataColumn="datacolumn" 
        :tableLoading="loading"
        :pageSize="pagination.page_size"
        :page="pagination.page"
        :limit="pagination.limit"
        :hasAction="false"
        :hasPagination="true"
        
        @actionRemove="actionRemove"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"

        :customAction="true"
        :customActionList="customActionList"
        @actionUpdate="actionUpdate"

        />

        <dialog-create-edit-VehicleType
            :active="dialogVehicleType" 
            :closeDialog="closeDialogVehicleType"
            @refresh="refresh"
            title="Edit Vehicle Type"
            :dataItem="dataItem"
            />
        
        <dialog-confirm
          :active="confirmDialog"
          :closeDialog="closeDialogConfirm"
          title="Vehicle Type"
          :message="message"
          @confirm="confirm"
          @cancel="closeDialogConfirm"
      />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import dialogCreateEditVehicleType from "@/views/settings/vehicles/vehicleType/dialogCreateEditVehicleType"
import DialogConfirm from "@/components/dialog/dialogConfirm"
import SelectSearchBy from "@/components/search/selectSearchBy"
import SearchInput from "@/components/search/searchInput"
import DateTime from "@/components/input/dateTime"
import moment from "moment"

export default {
    name:"vehicle-type",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-VehicleType": dialogCreateEditVehicleType,
        "dialog-confirm": DialogConfirm,
        "select-search-by": SelectSearchBy,
        "search-input": SearchInput,
        "date-time": DateTime,
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "vehicle_type_id",
                    width: "xs"
                },
                {
                    label: "Vehicle type name",
                    key: "vehicle_type_name",
                    width: "md"
                },
                {
                    label: "Vehicle mode name",
                    key: "vehicle_mode_name",
                    width: "md"
                },
            ],
            customActionList: [
              {
                label: 'Edit',
                key: 'edit',
                attribute: '',
              },
              {
                label: 'Remove',
                key: 'remove',
                attribute: 'danger',
              }
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            dialogVehicleType: false,
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            confirmDialog: false,
            message: "",
            tempData: {},
            dateRange: [],
            searchBy: "vehicle type name",
            filterDateBy: "create",
            searchPlaceholder: "Search Vehicle Type Name",
            searchParams: [
                {
                    label: "Vehicle Type ID",
                    value: "vehicle_type_id",
                },
                {
                    label: "Vehicle Type Name",
                    value: "vehicle type name",
                },
                {
                    label: "Vehicle Mode Name",
                    value: "vehicleMode",
                }
            ],
            dateParams: [
              {
                label: 'Created Date',
                value: 'create'
              }
            ]
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val)
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
                query = q
            }
            if(from !== undefined && to !== undefined) {
              startDate = from
              endDate = to
            }
            await axios
                .get(this.URL.vehicle_type + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`, 
                this.Helper.header())
                .then(res => {
                    const arr = res.data.data
                    arr.map(item=>{
                      item['vehicle_mode_name'] = item.vehicle_mode ? item.vehicle_mode.vehicle_mode_name  : '-'
                    })
                    this.dataTable = arr
                  
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        // this.openNotification('warn', null, 'Vehicle mode data is empty!', ' Please create a new Vehicle mode data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate Vehicle mode list', err)
                })
        },
        actionUpdate(val, key){
            switch(key) {
                case "edit":
                    if(this.dataTable.length > 0) {
                        let obj = this.dataTable.filter(item => {
                            return item.vehicle_type_id === val.vehicle_type_id
                        })
                        this.dataItem = obj[0]
                        
                        this.$nextTick(() => {
                            this.dialogVehicleType = true
                        });
                    }
                    break;
                case "remove":
                    this.tempData = val
                    this.confirmDialog = true
                    this.message = `Are you sure want to delete vehicle type ${val.vehicle_type_name}`
                   break;
                default:

                    // code block
            }
            
        },
        
        closeDialogConfirm(){
          this.confirmDialog = false
        },
        confirm(val) {
          if(val) {
              this.confirmDialog = false
              this.actionRemove()
          }
        },
        async actionRemove(val){
            // this.confirmDialog = true
            await axios
                .delete(
                    this.URL.vehicle_type + `/${this.tempData.vehicle_type_id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.refresh()
                    this.openNotification(null, 'Delete success', 'Delete vehicle type is success')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Delete failed', err.response ? err.response.data.message : 'something went wrong')
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
        refresh(){
            let from = ''
            let to = ''

            if(this.dateRange != null && this.dateRange.length > 0) {
                from = moment(this.dateRange[0]).format("YYYY-MM-DD")
                to = moment(this.dateRange[1]).format("YYYY-MM-DD")
            }
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch,from,to)
        },
        closeDialogVehicleType() {
            this.dialogVehicleType = false
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
            val = val.replaceAll(" ", "_");
            this.searchBy = val;
            this.searchPlaceholder = key;
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val;
        },
    },
    mounted() {
        this.refresh()
    }
}
</script>
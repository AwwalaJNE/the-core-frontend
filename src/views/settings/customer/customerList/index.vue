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
        :hasAction="true"
        :hasPagination="true"
        @actionUpdate="actionUpdate"
        @actionRemove="actionRemove"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        />

        <!--Create User Dialog end-->
            <dialog-create-edit-customer 
                :active="dialogCustomer" 
                :closeDialog="closeDialogCustomer"
                @refresh="refresh"
                title="Edit customer"
                :dataItem="dataItem"
                btnBlue="Edit"
            />

            <dialog-confirm
                :active="activeDialogRemove"
                :loading="activeLoadingRemove"
                :closeDialog="closeDialogConfirmRemove"
                title="Remove Customer"
                message="Are you sure you want to remove Customer ?"
                @confirm="confirmRemove"
                @cancel="closeDialogConfirmRemove"
            />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogCreateEditCustomer from "@/views/settings/customer/customerList/dialogCreateEditCustomer"
import DialogConfirm from "@/components/dialog/dialogConfirm"
import SelectSearchBy from "@/components/search/selectSearchBy"
import SearchInput from "@/components/search/searchInput"
import DateTime from "@/components/input/dateTime"
import moment from "moment"

export default {
    name:"customer-list",
    mixins: [master],
    props: {
        query: String
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-customer": DialogCreateEditCustomer,
        "dialog-confirm": DialogConfirm,
        "select-search-by": SelectSearchBy,
        "search-input": SearchInput,
        "date-time": DateTime
    },
    data() {
        return {
            dialogCustomer:false,
            activeDialogRemove:false,
            activeLoadingRemove:false,
            dataTable: [],
            datacolumn: [
                {
                    label: "Customer Name",
                    key: "customer_name",
                    width: "sm"
                },
                {
                    label: "Customer Type",
                    key: "customer_type_name",
                    width: "auto"
                },
                {
                    label: "Customer Phone",
                    key: "customer_phone",
                    width: "auto"
                },
                {
                    label: "Customer Code",
                    key: "customer_code",
                    width: "auto"
                },
                {
                    label: "Status",
                    key: "status",
                    width: "auto"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            customer_id:'',
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            dateRange: [],
            searchBy: "customer name",
            filterDateBy: "create",
            searchPlaceholder: "Search Customer Namme",
            searchParams: [
                {
                    label: "Customer Name",
                    value: "customer name"
                },
                {
                    label: "Customer Type",
                    value: "customer_type"
                },
                {
                    label: "Customer Phone",
                    value: "customer_phone"
                },
                {
                    label: "Customer Code",
                    value: "customer_code"
                },
                {
                    label: "Status",
                    value: "status"
                },
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
            let startDate = "";
            let endDate = "";
            let query = (q !== undefined) ? (q.toLowerCase() === 'active' ? 1 : (q.toLowerCase() === 'unactive' ? 0 : q)) : "";
            if(from !== undefined && to !== undefined) {
              startDate = from
              endDate = to
            }
            await axios
                .get(this.URL.customer + 
                `?n=${this.listenNodeId}&sort_order=desc&&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`, 
                this.Helper.header())
                .then(res => {
                    console.log(res,'cus')
                    if(res.data.data.length > 0) {
                        if(res.data.data.length > 0){
                            res.data.data.map(item =>{
                                item['customer_type_name'] = item.customer_type.customer_type_name
                                if(item.is_active == true){
                                    item['status'] = 'Active'
                                }else{
                                    item['status'] = 'Unactive'
                                }
                            })
                            this.dataTable = res.data.data

                            this.pagination.page = res.data.meta.current_page
                            this.pagination.limit = parseInt(res.data.meta.per_page)
                            this.pagination.page_size = res.data.meta.last_page

                        }
                        
                    } else {
                        this.dataTable = [];
                        // this.openNotification('warn', 'Customer data is empty!', ' Please create a new Customer')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate customer list', err)
                })
        },
        async getCustomerById(customer_id) {
            await axios
                .get(this.URL.customer + `/${customer_id}?n=${this.listenNodeId}`, 
                this.Helper.header())
                .then(res => {
                    this.dataItem = res.data.data
                    this.dialogCustomer = true
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate customer list', err)
                })
        },
        actionUpdate(val){
            this.dataItem = null
            let customer_id = val.customer_id;
            this.getCustomerById(customer_id)
        },
        actionRemove(val){
            this.customer_id = val.customer_id
            this.activeDialogRemove = true
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
        actionLimit(val){
            this.pagination.limit = val
            this.pagination.page = 1
            this.refresh()
        },
        actionPagination(val) {
            this.pagination.page = val
            this.refresh()
        },
        closeDialogCustomer() {
            this.dialogCustomer = false
        },

        closeDialogConfirmRemove(){
          this.activeDialogRemove = false
          this.activeLoadingRemove=false
        },
         confirmRemove() {
          this.activeLoadingRemove=true
          this.removeCustomer()
        },
        async removeCustomer(){
          await axios
              .delete(this.URL.customer + `/${this.customer_id}?n=${this.listenNodeId}`,
                  this.Helper.header())
              .then(res => {
                this.closeDialogConfirmRemove()
                this.activeLoadingRemove = false
                this.refresh()
                this.openNotification(null, 'Success', 'Delete Customer is success')
              }).catch(err => {
                this.activeLoadingRemove = false
                this.closeDialogConfirmRemove()
                this.refresh()
                this.openNotification('danger', 'Delete Customer is failed', err)
              })
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
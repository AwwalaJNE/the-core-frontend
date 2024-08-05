<!--
    - @desc component yang handle crud frontend connote item
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
        :hasPagination="true"
        :expandable="true"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import moment from "moment"
export default {
    name:"list-connote",
    mixins: [master],
    props: {
        query: String,
        queryBag: String,
        queryInventory: String,
        querySearch: String,
        queryDate: String,
        dateFilter: Array,
    },
    components: {
        "table-master" : TableMaster
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.status_bag, this.statusinventory, this.startDate, this.endDate, this.querySearch, this.queryDate)
                }
            }
        },
        queryInventory: function(val, old) {
          if(val !== undefined) {
            this.statusinventory = val
            if(this.statusinventory !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.status_bag, val, this.startDate, this.endDate, this.querySearch, this.queryDate)
            }
          }
        },
        dateFilter: function (val, old) {
            if (val !== undefined && val !== null) {
                let d = new Date()
                let from = ''
                let to = ''
                
                this.tempDate = val;
                if (this.tempDate !== old) {
                    if(this.tempDate.length > 0) {
                        from = moment(this.tempDate[0]).format("YYYY-MM-DD")
                        to = moment(this.tempDate[1]).format("YYYY-MM-DD")
                    } else {
                        from = moment(d).format("YYYY-MM-DD")
                        to = moment(d).format("YYYY-MM-DD")
                    }
                    this.startDate = from
                    this.endDate = to
                }
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.status_bag, this.statusinventory, from, to, this.querySearch, this.queryDate);
            }
            else {
                this.startDate = ""
                this.endDate = ""
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.status_bag, this.statusinventory, this.startDate, this.endDate, this.querySearch, this.queryDate);
            }
        },
        queryBag: function(val, old) {
          if(val !== undefined) {
            this.status_bag = val
            if(this.status_bag !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, val, this.statusinventory, this.startDate, this.endDate, this.querySearch, this.queryDate)
            }
          }
        },

    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Connote Number",
                    key: "connote_number",
                    width: "auto"
                },
                {
                    label: "Origin",
                    key: "connote_shipper_tariff_code",
                    width: "auto"
                },
                {
                    label: "Destination",
                    key: "connote_receiver_tariff_code",
                    width: "auto"
                },
                {
                    label: "Weight(Kg)",
                    key: "connote_chargeable_weight",
                    width: "xs"
                },
                {
                    label: "Service",
                    key: "connote_service_code",
                    width: "auto"
                },
                {
                    label: "COD",
                    key: "is_cod",
                    width: "auto"
                },
                {
                    label: "Amount COD (Rp)",
                    key: "amount_cod",
                    width: "xxs",
                    textAlign: "right"
                },
                {
                    label: "SLA",
                    key: "connote_sla_date",
                    width: "auto"
                },
                {
                    label: "Created At",
                    key: "created_at",
                    width: "auto"
                },                
                {
                    label: "Cancel",
                    key: "is_void_status",
                    width: "auto"
                }
            ],
            loading: false,
            tempSearch: this.query ? this.query : "",
            tempDate: [],
            startDate: "",
            endDate: "",
            status_bag:"",
            statusinventory:"",
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            loadInterval: null
        }
    },
    methods: {
        pollData () {
            this.loadInterval = setInterval(() => {
                this.refresh()
            }, 60000) // 1 menit
        },
        async getTableData(limit,page,q, statusBag, statusInventory, from, to, searchBy, filterDateBy) {
            this.loading = true
            let query = "";
            let isOnBag = "";
            let isInventory = "";
            if(q !== undefined) {
                query = q
            }
            if(statusBag !== undefined && statusBag !== '-') {
              isOnBag = statusBag
            }
            if(statusInventory !== undefined && statusInventory !== '-') {
              isInventory = statusInventory
            }
            await axios
                .get(
                    this.URL.connote +
                    `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&is_confirmed=${isInventory}&is_on_bag=${isOnBag}&page=${page}&s=${query}&start_date=${from}&end_date=${to}&search_by=${searchBy}&filter_date_by=${filterDateBy}`,
                    this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    arr.map(item => {
                        item["is_void_status"] = item.is_void == 1 ? 'YES' : '-'
                        item["is_cod"] = item.is_cod == 1 ? 'YES' : '-'
                        let koli_number = []
                        let bag = []
                        let packing_kayu = []
                        let received_at = []
                        let irregularity = []
                        let is_confirmed = []
                        let children = {}
                        item.koli.map(k => {
                            koli_number.push(k.koli_number)
                            bag.push(k.location_bag_number ?? " ")
                            packing_kayu.push(k.packing_kayu_type ? "Y" : "-")
                            received_at.push(k.received_at ?? " ")
                            irregularity.push(k.irregularity?.irregularity_status_description ?? " ")
                            is_confirmed.push(k.is_confirmed == 1 ? 'Confirmed' : 'Unconfirmed')
                        })
                        children['Koli Number'] = koli_number
                        children['Bag'] = bag
                        children['Wood Package'] = packing_kayu
                        children['Receiving Date'] = received_at
                        children['Status Irregularity'] = irregularity
                        children['Status'] = is_confirmed
                        item['children'] = children
                    })
                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate connote list', err.response.data.message)
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.status_bag, this.statusinventory, this.startDate, this.endDate, this.querySearch, this.queryDate)
        },
    },
    mounted() {
        this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.status_bag, this.statusinventory, this.startDate, this.endDate, this.querySearch, this.queryDate)
        this.pollData()
    },
    beforeDestroy () {
        clearInterval(this.loadInterval) // prevent memory leaks
    }
}
</script>
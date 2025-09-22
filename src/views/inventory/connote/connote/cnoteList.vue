<!--
    - @desc component yang handle crud frontend connote item
    - @param -
    - @emit -
    - @props -
-->

<template>
    <div>
        <table-master 
            hideColumnKey="inventory-connote"
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasAction="false"
            :hasPagination="true"
            :expandable="true"
            :hasLinkedChild="this.listenUserRoleName === 'HELPDESK' ? [] : ['Koli Number']"
            :hasLinked="this.listenUserRoleName === 'HELPDESK' ? ['connote_number'] : []"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
            @handleEdit="showData"
            @handleEditLinkedChild="actionDetail"
        />

        <dialog-helpdesk-edit-connote
            title="Edit Connote"
            :active="dialogHelpdeskEditConnote"
            :connoteNumber="connote_number"
            :closeDialog="closeDialog"
        />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import moment from "moment"

import TableMaster from "@/components/table/tableMaster.vue"

import DialogHelpdeskEditConnote from "@/views/helpdesk/connote/dialogHelpdeskEditConnote";

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
        "table-master" : TableMaster,
        "dialog-helpdesk-edit-connote": DialogHelpdeskEditConnote
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.pagination.page = 1
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.status_bag, this.statusinventory, this.startDate, this.endDate, this.querySearch, this.queryDate)
                }
            }
        },
        queryDate: function(val, old) {
          if(val !== undefined) {
            if(val !== old) {
              this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.status_bag, this.statusinventory, this.startDate, this.endDate, this.querySearch, val)
            }
          }
        },
        queryInventory: function(val, old) {
          if(val !== undefined) {
            this.statusinventory = val
            if(this.statusinventory !== old) {
                this.pagination.page = 1
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
                this.pagination.page = 1
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.status_bag, this.statusinventory, from, to, this.querySearch, this.queryDate);
            }
            else {
                this.startDate = ""
                this.endDate = ""
                this.pagination.page = 1
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.status_bag, this.statusinventory, this.startDate, this.endDate, this.querySearch, this.queryDate);
            }
        },
        queryBag: function(val, old) {
          if(val !== undefined) {
            this.status_bag = val
            if(this.status_bag !== old) {
                this.pagination.page = 1
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, val, this.statusinventory, this.startDate, this.endDate, this.querySearch, this.queryDate)
            }
          }
        },
        querySearch: function(val, old) {
            if(val !== undefined) {
                if(val !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.status_bag, this.statusinventory, this.startDate, this.endDate, val, this.queryDate)
                }
            }
        },
    },
    data() {
        return {
            dialogHelpdeskEditConnote: false,
            dataItem: {},
            dataTable: [],
            datacolumn: [
                {
                    label: "Connote Number",
                    key: "connote_number",
                    width: "xs"
                },
                {
                    label: "Origin",
                    key: "connote_shipper_tariff_code",
                    width: "xs"
                },
                {
                    label: "Destination",
                    key: "connote_receiver_tariff_code",
                    width: "xs"
                },
                {
                    label: "Weight(Kg)",
                    key: "connote_chargeable_weight",
                    width: "xs"
                },
                {
                    label: "Routing Type",
                    key: "routing_type",
                    width: "xs"
                },  
                {
                    label: "Service",
                    key: "connote_service_code",
                    width: "xs"
                },
                {
                    label: "COD",
                    key: "is_cod",
                    width: "xs"
                },
                {
                    label: "Amount COD (Rp)",
                    key: "amount_cod",
                    width: "sm",
                    type_amount: true,
                    textAlign: "right"
                },
                {
                    label: "SLA",
                    key: "connote_sla_date",
                    width: "xs"
                },
                {
                    label: "Created At",
                    key: "created_at",
                    width: "xs"
                },  
                {
                    label: "Created By",
                    key: "created_by_user",
                    width: "xs"
                },                
                {
                    label: "Cancel",
                    key: "is_void_status",
                    width: "xs"
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
            loadInterval: null,
            connote_number: ''
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
                        item.created_at = this.formatTimezone(item.created_at);
                        item["created_by_user"] = item?.koli?.[0]?.created_by_user || '-',
                        item["is_void_status"] = item.is_void == 1 ? 'YES' : '-'
                        item["is_cod"] = item.is_cod == 1 ? 'YES' : '-'
                        item['children_width'] = {
                            'Koli Number': 'xs',
                            'Bag': 'xs',
                            'Wood Package': 'xs',
                            'Receiving Date': 'sm',
                            'Scanned Date': 'sm',
                            'Status Irregularity': 'xs',
                            'Delivery Status Code': 'xs',
                            'Status': 'xs'
                        }
                        let koli_number = []
                        let bag = []
                        let packing_kayu = []
                        let received_at = []
                        let latest_opened_bag = []
                        let irregularity = []
                        let is_confirmed = []
                        let delivery_status_code = []
                        let children = {}
                        item.koli.map(k => {
                            koli_number.push(k.koli_number)
                            bag.push(k.location_bag_number ?? " ")
                            packing_kayu.push(k.packing_kayu_type ? "Y" : "-")
                            received_at.push(k.received_at ?? " ")
                            latest_opened_bag.push(k.latest_opened_bag ?? " ")
                            irregularity.push(k.irregularity?.irregularity_status_description ?? " ")
                            is_confirmed.push(k.is_confirmed == 1 ? 'Confirmed' : 'Unconfirmed')
                            delivery_status_code.push(k.delivery_status_code ?? "-")
                        })
                        children['Koli Number'] = koli_number
                        children['Bag'] = bag
                        children['Wood Package'] = packing_kayu
                        children['Receiving Date'] = this.formatTimezone(received_at);
                        children['Scanned Date'] = this.formatTimezone(latest_opened_bag);
                        children['Status Irregularity'] = irregularity
                        children['Status'] = is_confirmed
                        children['Delivery Status Code'] = delivery_status_code
                        item['children'] = children
                    })
                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    
                    this.loading = false
                }).catch(err => {
                    console.log(err)
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate connote list', err.response.data.message)
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
        showData(row) {
            this.connote_number = row.connote_number;
            this.dialogHelpdeskEditConnote = true;
        },
        actionDetail(row){
            this.$router.push({ name: 'detailConnote', params: { id: row.transaction_id } });
            this.setRoutePageHistory(this.$route.meta, false);
        },

        closeDialog() {
            this.dialogHelpdeskEditConnote = false;
            this.refresh();
        },
    },
    mounted() {
        window.addEventListener('timezone-changed', this.refresh);
        this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, this.status_bag, this.statusinventory, this.startDate, this.endDate, this.querySearch, this.queryDate)
    },
    beforeDestroy () {
        window.removeEventListener('timezone-changed', this.refresh);
        clearInterval(this.loadInterval) // prevent memory leaks
    }
}
</script>
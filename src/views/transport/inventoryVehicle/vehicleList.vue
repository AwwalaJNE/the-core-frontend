<!--
    - @desc component yang handle crud frontend connote item
    - @param -
    - @emit -
    - @props -
-->

<template>
    <div>
        <table-master 
        hideColumnKey="vehicle-list"
        :dataTable="dataTable" 
        :dataColumn="datacolumn" 
        :tableLoading="loading"
        :pageSize="pagination.page_size"
        :page="pagination.page"
        :limit="pagination.limit"
        :hasAction="false"
        :hasLinked="['koli_number']"
        :hasPagination="true"
        @actionUpdate="actionUpdate"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        @handleEdit="showData"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
export default {
    name:"list-user",
    mixins: [master],
    props: {
        query: String,
        queryVehicle: String/Number,
        queryBags: String/Number,
        queryDriver: String/Number
    },
    components: {
        "table-master" : TableMaster
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.tempSearch = val
                if(this.tempSearch !== old) {
                    this.pagination.page = 1
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.status_bag, this.statusinventory)
                }
            }
        },
        queryVehicle: function(val, old) {
            if (val !== undefined) {
                this.temp_vehicle = val;
                if (this.temp_vehicle !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, val, this.temp_bag, this.temp_driver);
                }

            }
        },
        queryBags: function(val, old) {
            if (val !== undefined) {
                this.temp_bag = val;
                if (this.temp_bag !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.temp_vehicle, val, this.temp_driver);
                }

            }
        },
        queryDriver: function(val, old) {
            if (val !== undefined) {
                this.temp_driver = val;
                if (this.temp_driver !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.temp_vehicle, this.temp_bag, val);
                }

            }
        },
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Connote",
                    key: "koli_number",
                    width: "auto"
                },
                {
                    label: "Bag",
                    key: "bag_number",
                    width: "auto"
                },
                {
                    label: "Receiving Date",
                    key: "received_at",
                    width: "xs"
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
                    label: "Weight(Kg)",
                    key: "connote_chargeable_weight",
                    width: "auto"
                },                
                {
                    label: "Service",
                    key: "connote_service_code",
                    width: "auto"
                },                
                {
                    label: "Current Location",
                    key: "vehicle_name",
                    width: "auto"
                },                
                {
                    label: "Current Location Name",
                    key: "current_location_name",
                    width: "auto"
                },                
                {
                    label: "Current Location type",
                    key: "current_location_type",
                    width: "auto"
                },
                {
                    label: "SLA",
                    key: "connote_sla_date",
                    width: "xs"
                },
                {
                    label: "Wood Package",
                    key: "packing_kayu_type",
                    width: "auto"
                },
                {
                  label: "Cancel",
                  key: "is_void_status",
                  width: "auto"
                },
                {
                    label: "Status",
                    key: "is_confirmed",
                    width: "auto"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : "",
            dialogUser: false,
            status_bag:"",
            statusinventory:"",
            pagination: {
                limit:20,
                page_size: 1,
                page: 1
            },
            loadInterval: null,
            temp_vehicle: '',
            temp_driver: ''
        }
    },
    methods: {
        async getTableData(limit,page,q,vehicle, bags, driver) {
            this.loading = true
            let query = "";
            let isVehicle = "";
            let isBags = "";
            let isDriver = "";
            if(q !== undefined) {
                query = q
            }
            
            if(vehicle !== undefined && vehicle !== '-') {
              isVehicle = vehicle
            } 
            if(bags !== undefined && bags !== '-') {
              isBags = bags
            }
            
            if(driver !== undefined && driver !== '-') {
              isDriver = driver
            } 
            await axios
                .get(
                    this.URL.inventory_vehicle +
                    `?n=${this.listenNodeId}&vehicle_id=${isVehicle}&bag_number=${isBags}&driver_id=${isDriver}&sort_order=desc&limit=${limit}&limit=${limit}&page=${page}&s=${query}`,
                    this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    arr.map(item => {
                        item["received_at"] = this.formatTimezone(item["received_at"]);
                        item["connote_sla_date"] = this.formatTimezone(item["connote_sla_date"]);
                        item["is_confirmed"] = item.is_confirmed == 1 ? 'Confirmed' : 'Unconfirmed'
                        item["is_void_status"] = item.is_void == 1 ? 'YES' : '-'
                        item["packing_kayu_type"] = item.packing_kayu_type != null ? 'PK-'+item.packing_kayu_type : '-'
                    })
                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate inventory vehicle list', err.response.data.message)
                })
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.user_id === val.user_id
                })
                this.dataItem = obj[0]

                // this.$nextTick(() => {
                //     this.dialogUser = true
                // });
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        },

        showData(row) {
          this.$router.push(`/connote-detail/${row.koli_number}`);
          this.setRoutePageHistory(this.$route.meta, false);
        },
    },
    mounted() {
        this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        window.addEventListener('timezone-changed', this.refresh);
    },
    beforeDestroy() {
        window.removeEventListener('timezone-changed', this.refresh);
    },
}
</script>
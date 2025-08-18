<template>
    <div>
        <table-master 
            hideColumnKey="trace-flight-list"
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="loading"
            :hasAction="false"
            :hasLinked="['shipment_number']"
            :hasPagination="true"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
        />
    </div>
</template>

<script>

import axios from "axios";
import master from "@/mixins/master";

import TableMaster from "@/components/table/tableMaster";

export default {
    name:"flight-list",
    mixins: [master],
    props: {
        flightNumber: String
    },
    components: {
        "table-master" : TableMaster
    },
    computed: {
        listenFlightNumber() {
            return this.flightNumber || "";
        }
    },
    data() {
        return {
            loading: false,
            dataTable: [],
            datacolumn: [
                {
                    label: "SHP No",
                    key: "shipment_number",
                    width: "xxs"
                },
                {
                    label: "Vehicle",
                    key: "vehicle_name",
                    width: "sm"
                },
                {
                  label: "Mode",
                  key: "vehicle_mode_name",
                  width: "xxs",
                },
                {
                    label: "Origin",
                    key: "origin_name",
                    width: "sm"
                },
                {
                    label: "Destination",
                    key: "destination_name",
                    width: "sm"
                },
                {
                    label: "ETD",
                    key: "etd",
                    width: "sm"
                },
                {
                    label: "ETA",
                    key: "eta",
                    width: "sm"
                },
                {
                    label: "Vehicle Info",
                    key: "vehicle_information",
                    width: "sm"
                },
                {
                    label: "Reg No",
                    key: "registration_number",
                    width: "sm"
                },
                {
                    label: "Flight Status",
                    key: "flight_status",
                    width: "xs"
                }
            ],
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            transport_type: "flight",
            flight_status: "",
            flight_date: "",
        }
    },
    methods: {
        async getTableData(limit, page, transport_type, flight_status, flight_date, flight_iata) {
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.sync_flight}?n=${this.listenNodeId}&transport_type=${transport_type}&flight_status=${flight_status}&flight_date=${flight_date}&flight_iata=${flight_iata}&limit=${limit}&page=${page}`, this.Helper.header());
                this.dataTable = res.data.data;
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        actionLimit(val){
            this.pagination.limit = val;
            this.pagination.page = 1;
            this.refresh();
        },
        actionPagination(val) {
            this.pagination.page = val;
            this.refresh();
        },
        refresh(){
            this.getTableData(this.pagination.limit, this.pagination.page, this.transport_type, this.flight_status, this.flight_date, this.listenFlightNumber)
        },
    },
    mounted() {
        this.refresh();
    },
}
</script>
<template>
    <div>
        <table-master 
            hideColumnKey="runsheet-history"
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="loading"
            :hasAction="false"
            :hasLinked="['delivery_runsheet_number']"
            :hasPagination="false"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";

import TableMaster from "@/components/table/tableMaster";

export default {
    name:"runsheet-history",
    mixins: [master],
    props: {
        connoteNumber: String,
        koliNumber: String
    },
    components: {
        "table-master" : TableMaster
    },
    computed: {
        listenConnoteNumber() {
            return this.connoteNumber;
        },
        listenKoliNumber() {
            return this.koliNumber;
        }
    },
    data() {
        return {
            loading: false,
            dataTable: [],
            datacolumn: [
                {
                    label: "POD Date",
                    key: "pod_at",
                    width: "sm"
                },
                {
                  label: "Runsheet Number",
                  key: "delivery_runsheet_number",
                  width: "md",
                },
                {
                    label: "Courier Code",
                    key: "courier_code",
                    width: "sm"
                },
                {
                    label: "Courier Name",
                    key: "courier_name",
                    width: "sm"
                },
                {
                    label: "Elapsed Time",
                    key: "activity_code",
                    width: "md"
                },
                {
                    label: "Status POD",
                    key: "status",
                    width: "xs"
                },
                {
                    label: "Receiver Name",
                    key: "receiver_name",
                    width: "sm"
                },
                {
                    label: "Remarks",
                    key: "remarks",
                    width: "sm"
                },
                
            ]
        }
    },
    methods: {
        async getTableData() {
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.delivery}/history/${this.listenKoliNumber}?n=${this.listenNodeId}`, this.Helper.header());

                let arr = res.data.data;
                arr.map((item, index) => {
                    item["counter"] = index + 1;
                    item["node_name"] = item["node_name"];
                    item["user_name"] = item["employee_name"] ?? item["user_name"];
                })

                this.dataTable = arr;
            } catch (err) {
                this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate activity list', err)
            } finally {
                this.loading = false;
            }
        },
        refresh(){
            this.getTableData();
        },
    },
    mounted() {
        this.refresh();
    },
}
</script>
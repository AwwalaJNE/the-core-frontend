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
            :hasLinked="['employee_name']"
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
export default {
    name:"hrs-history-table",
    mixins: [master],
    props: {
        query: String,
        searchBy: String
    },
    components: {
        "table-master" : TableMaster
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "HRS ID",
                    key: "handover_runsheet_id",
                    width: "xs"
                },
                {
                    label: "HRS Number",
                    key: "handover_number",
                    width: "sm"
                },
                {
                    label: "Orion Number",
                    key: "hrs_number",
                    width: "xs"
                },
                {
                    label: "Courier",
                    key: "courier_employee_id",
                    width: "xs"
                },
                {
                    label: "Created By",
                    key: "created_by",
                    width: "xs"
                },
                {
                    label: "Node Id",
                    key: "node_id",
                    width: "xs"
                }
            ],
            loading: false,
            tempSearch: "",
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            handover_number: "",
            hrs_number: "",
            employee: "",
            created_by: ""
        }
    },
    watch: {
        // query: function(val, old) {
        //     if(val !== undefined) {
        //         this.tempSearch = val
        //         if(this.tempSearch !== old) {
        //             this.getTableData(this.pagination.limit, 1, val)
        //         }
        //     }
        // }
    },
    methods: {
        async getTableData(limit, page, q) {
            this.loading = true;
            const query = q ?? '';

            try {
                const res = await axios.get(
                    `${this.URL.handover_runsheet}/history?n=${this.listenNodeId}&handover_number=${this.handover_number}&hrs_number=${this.hrs_number}&employee=${this.employee}&created_by=${this.created_by}&page=${page}&limit=${limit}`,
                    this.Helper.header()
                );

                const arr = res.data.data.map(item => {
                    const children = {
                        'Runsheet #': [],
                        'DRI Number': [],
                        'HRS Number': [],
                        'Status': [],
                        'Status Delivery': []
                    };

                    item?.runsheets.forEach(el => {
                        children['Runsheet #'].push(el.delivery_runsheet_number);
                        children['DRI Number'].push(el.dri ?? '-');
                        children['HRS Number'].push(el.hrs ?? '-');
                        children['Status'].push(el.status);
                        children['Status Delivery'].push(el.status_delivery);
                    });

                    item.children_width = {
                        'Runsheet #': 'auto',
                        'DRI Number': 'auto',
                        'HRS Number': 'auto',
                        'Status': 'auto',
                        'Status Delivery': 'auto'
                    };
                    item.children = children;

                    return item;
                });

                this.dataTable = arr;
                this.pagination = {
                    page: res.data.meta.current_page,
                    limit: parseInt(res.data.meta.per_page),
                    page_size: res.data.meta.last_page
                };
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code ?? '', 'Failed', err?.response?.data?.message ?? 'Failed to Populate HRS Runsheet List');
            } finally {
                this.loading = false;
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
        refresh(){
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
        }
    },
    mounted() {
        this.refresh()
    }
}
</script>
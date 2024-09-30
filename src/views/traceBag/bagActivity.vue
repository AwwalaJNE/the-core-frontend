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
            :hasPagination="true"
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
    name:"bag-activity",
    mixins: [master],
    props: {
        bagNumber: String
    },
    components: {
        "table-master": TableMaster
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Date/Time",
                    key: "created_at",
                    width: "sm"
                },
                {
                  label: "Bag Number",
                  key: "bag_number",
                  width: "xs",
                },
                {
                    label: "PIC",
                    key: "user_login",
                    width: "xs"
                },
                {
                    label: "Node",
                    key: "node_name",
                    width: "md"
                },
                {
                    label: "Activity",
                    key: "activity_name",
                    width: "xs"
                },
                {
                    label: "Value",
                    key: "value",
                    width: "xs"
                },
                {
                    label: "Description",
                    key: "description",
                    width: "auto"
                },
                
            ],
            loading: false,
            bag_number: this.bagNumber,
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            }
        }
    },
    methods: {
        async getTableData(limit, page) {
            this.loading = true;
            
            try {
                const res = await axios.get(`${this.URL.bag}/${this.bag_number}/history?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}`,  this.Helper.header());
                
                this.dataTable = res.data.data.map((item, index) => ({
                    ...item,
                    counter: index + 1,
                    user_name: item.employee_name ?? item.user_name
                }));
                
                this.pagination = {
                    page: res.data.meta.current_page,
                    limit: parseInt(res.data.meta.per_page),
                    page_size: res.data.meta.last_page
                };
            } catch (err) {
                this.openNotification('danger', err.response?.data?.code ?? '', 'Failed', err?.response?.data?.message ?? 'something went wrong');
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
            this.getTableData(this.pagination.limit, this.pagination.page)
        },
    },
    mounted() {
        this.getTableData(this.pagination.limit, this.pagination.page);
    },
}
</script>
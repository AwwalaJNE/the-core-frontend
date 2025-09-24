<template>
    <div>
        <table-master 
            hideColumnKey="trace-bag-activity"
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasAction="false"
            :hasLinked="['bag_number']"
            :hasLinkedCustom="['value']"
            :hasLinkedCustomValidation="['sm_value']"
            :hasPagination="true"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
            @handleEditCustom="openDialog"
        />

        <dialogCreateManifest
            title="Manifest Info"
            :active="dialogManifestList"
            :closeDialog="closeDialog"
            :isReadOnly="true"
            :sm_number="sm_number"
            @refresh="refresh"
        />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"

import TableMaster from "@/components/table/tableMaster.vue"

import DialogCreateManifest from "@/views/transport/manifestNew/dialogCreateEditManifest"

export default {
    name:"bag-activity",
    mixins: [master],
    props: {
        bagNumber: String
    },
    components: {
        "table-master": TableMaster,
        "dialogCreateManifest": DialogCreateManifest,
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
                    label: "User",
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
            },
            loadingSuratMuatan: false,
            sm_number: "",
            dialogManifestList:false,
        }
    },
    methods: {
        async getTableData(limit, page) {
            this.loading = true;
            
            try {
                const res = await axios.get(`${this.URL.bag}/${this.bag_number}/history?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}`,  this.Helper.header());

                this.dataTable = res.data.data.map((item, index) => ({
                    ...item,
                    created_at: this.formatTimezone(item.created_at),
                    counter: index + 1,
                    user_name: item.employee_name ?? item.user_name,
                    sm_value: item.activity_name?.startsWith('SM_') ? true : false
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
        async openDialog(val) {
            if (val.sm_value) {
                this.sm_number = val.value;
                this.dialogManifestList = true;
            }
        },
        closeDialog() {
            this.dialogManifestList = false
            this.refresh();
        },
    },
    mounted() {
        this.getTableData(this.pagination.limit, this.pagination.page);
        window.addEventListener('timezone-changed', this.refresh);
    },
    beforeDestroy() {
        window.removeEventListener('timezone-changed', this.refresh);
    }
}
</script>
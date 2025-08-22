<template>
    <div>
        <table-master 
            hideColumnKey="warning-sla" 
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

        <dialog-create-edit-configuration-warning-sla
            title="Edit Configuration Warning SLA"
            btnBlue="Edit"
            :active="dialogConfigurationWarningSLA" 
            :closeDialog="closeDialog"
            :dataItem="dataItem"
            @refresh="refresh"
        />

        <dialog-confirm
            title="Remove Configuration Warning SLA"
            :message="`Are you sure you want to remove this configuration warning SLA with id ${this.id}?`"
            :active="activeDialogConfirmRemove"
            :loading="loadingConfirmRemove"
            :closeDialog="closeDialogConfirmRemove"
            @confirm="confirmRemove"
            @cancel="closeDialogConfirmRemove"
        />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import DialogConfirm from "@/components/dialog/dialogConfirm"
import DialogCreateEditConfigurationWarningSLA from "@/views/settings/configurationWarningRunsheet/warningSLA/dialogCreateEditConfigurationWarningSLA"
export default {
    name:"configuration-warning-sla-list",
    mixins: [master],
    props: {
        query: String,
        searchBy: String,
    },
    components: {
        "table-master" : TableMaster,
        "dialog-create-edit-configuration-warning-sla": DialogCreateEditConfigurationWarningSLA,
        "dialog-confirm": DialogConfirm,
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Formula Type",
                    key: "formula_type",
                    width: "auto"
                },
                {
                    label: "Value",
                    key: "value",
                    width: "auto"
                },
                {
                    label: "Applied For",
                    key: "node_name",
                    width: "auto"
                },
            ],
            loading: false,
            dataItem: {},
            searchValue: this.query ? this.query : "",
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            id: '',
            dialogConfigurationWarningSLA: false,
            activeDialogConfirmRemove: false,
            loadingConfirmRemove:false,
        }
    },
    watch: {
        query: function(val, old) {
            if(val !== undefined) {
                this.searchValue = val
                if(this.searchValue !== old) {
                    this.pagination.page = 1
                    this.getTableData(this.pagination.limit, this.pagination.page, val, this.searchBy)
                }
            }
        },
        searchBy: function(val, old) {
            if(val !== undefined) {
                this.searchBy = val
                if(this.searchBy !== old) {
                    this.getTableData(this.pagination.limit, this.pagination.page, this.searchValue, val)
                }
            }
        },
    },
    methods: {
        async getTableData(limit,page,q,searchBy) {
            this.loading = true
            let query = "";
            
            if (q !== undefined) {
                this.searchValue = q
                query = q
            }
            await axios
                .get(this.URL.configuration_warning_sla + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&search_by=${searchBy}`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        this.dataTable = res.data.data
                        this.dataTable.length > 0 && this.dataTable.map((item) => {
                            item["node_name"] = item.nodes.map((itm, index) => {
                                const { node_name } = itm || {};
                                let newline = "\n";

                                if (index == 0) {
                                    newline = "";
                                }

                                return newline + '- ' + node_name;
                            }).toString();
                        })

                        this.pagination.page = res.data.meta.current_page;
                        this.pagination.limit = parseInt(res.data.meta.per_page);
                        this.pagination.page_size = res.data.meta.last_page ;
                    }
                    else {
                        this.dataTable = res.data.data
                    }
                }).catch(err => {
                    this.openNotification('danger', err?.response?.data?.code ?? '', 'Gagal mendapatkan data tabel', err?.response?.data?.message ?? "Gagal mendapatkan data tabel warning SLA")
                })
            this.loading = false
        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.setting_id === val.setting_id
                })
                this.dataItem = obj[0]
                this.$nextTick(() => {
                    this.dialogConfigurationWarningSLA = true
                });
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
            this.getTableData(this.pagination.limit,this.pagination.page,this.searchValue,this.searchBy)
        },
        closeDialog() {
            this.$store.dispatch("SET_CONFIGURATION_WARNING_SLA_SETTING_ID_visible", false)
            this.dialogConfigurationWarningSLA = false
            this.refresh()
        },
        actionRemove(val){
            this.id = val.setting_id;
            this.activeDialogConfirmRemove = true
        },
        confirmRemove() {
            this.loadingConfirmRemove=true
            this.removeData()
        },
        async removeData(){
            await axios
                .delete(
                    this.URL.configuration_warning_sla + `/${this.id}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.closeDialogConfirmRemove()
                    this.loadingConfirmRemove = false
                    this.refresh()
                    this.openNotification("success", 'Success', res?.data?.message ?? 'Berhasil menghapus Konfigurasi Warning SLA')
                }).catch(err => {
                    this.loadingConfirmRemove = false
                    this.closeDialogConfirmRemove()
                    this.loading = false
                    this.openNotification('danger', err?.response?.data?.code ?? '', 'Gagal', err?.response?.data?.message ?? "Gagal menghapus Konfigurasi Warning SLA")
                })
        },
        closeDialogConfirmRemove(){
            this.activeDialogConfirmRemove = false
            this.loadingConfirmRemove=false
        },
    },
    mounted() {
        this.refresh()
    },
}
</script>
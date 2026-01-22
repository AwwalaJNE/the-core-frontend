<template>
    <div>
        <table-master
            hideColumnKey="cod"
            :dataTable="dataTable"
            :dataColumn="datacolumn"
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasPagination="true"
            :expandable="true"
            :isMultipleSelectColoum="true"
            :onRowClickCallback="onRowClickCallback"
            :allCheckCallback="onAllCheckCallback"
            @updateSelected="updateSelected"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
        />
    </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'
import TableMaster from '@/components/table/tableMaster.vue'
export default {
    name: 'delivery-runsheet',
    mixins: [master],
    props: {
        query: String,
        dateFilter: Array,
        searchBy: String,
    },
    components: {
        'table-master': TableMaster,
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: 'HRS Number',
                    key: 'hrs_number',
                    width: 'xs',
                },
                {
                    label: 'HRS Date',
                    key: 'created_at',
                    width: 'xs',
                },
                {
                    label: 'Courier Name',
                    key: 'employee_name',
                    width: 'xs',
                },
                {
                    label: 'Courier Code',
                    key: 'employee_code',
                    width: 'xs',
                },
                {
                    label: 'Total Runsheet',
                    key: 'total_runsheet',
                    width: 'xs',
                },
                {
                    label: 'Total Connote',
                    key: 'total_connote',
                    width: 'xs',
                },
                {
                    label: 'Total COD (Rp)',
                    key: 'total_amount_cod',
                    width: 'xs',
                    type_amount: true,
                    textAlign: 'right',
                },
                {
                    label: 'Total Cash (Rp)',
                    key: 'total_amount_cash',
                    width: 'xs',
                    type_amount: true,
                    textAlign: 'right',
                },
                {
                    label: 'Total Digital Payment (Rp)',
                    key: 'total_amount_e-pay',
                    width: 'xs',
                    type_amount: true,
                    textAlign: 'right',
                },
            ],
            loading: false,
            dataItem: {},
            form: {},
            tempSearch: '',
            tempDate: [],
            startDate: '',
            endDate: '',
            dialogTariff: false,
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1,
            },
            filtered_item: [],
            filtered_all_item: [],
            is_all_selected: false,
        }
    },
    watch: {
        query: function (val, old) {
            if (val !== undefined) {
                this.tempSearch = val
                if (this.tempSearch !== old) {
                    this.pagination.page = 1
                    this.getTableData(
                        this.pagination.limit,
                        this.pagination.page,
                        val,
                        this.startDate,
                        this.endDate
                    )
                }
            }
        },
        dateFilter: function (val, old) {
            if (val !== undefined) {
                this.tempDate = val
                if (this.tempDate !== old) {
                    this.startDate = this.tempDate !== null ? this.tempDate[0] : ''
                    this.endDate = this.tempDate !== null ? this.tempDate[1] : ''
                }
                this.getTableData(
                    this.pagination.limit,
                    this.pagination.page,
                    this.tempSearch,
                    this.startDate,
                    this.endDate
                )
            }
        },
    },
    methods: {
        async getTableData(limit, page, q, from, to) {
            this.loading = true
            let query = ''
            let startDate = ''
            let endDate = ''
            if (q !== undefined) {
                query = q
            }
            if (from !== undefined && to !== undefined) {
                startDate = this.formatToWIB(from)
                endDate = this.formatToWIB(to)
            }
            await axios
                .get(
                    this.URL.delivery_cod +
                        `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}`,
                    this.Helper.header()
                )
                .then((res) => {
                    let arr = res.data.data
                    arr.map((item) => {
                        let children = {}
                        let delivery_runsheet_number = []
                        let dri = []
                        let hrs = []
                        let total_connote = []
                        let cod_payment_type = []
                        let total_amount_cod = []
                        item['children_width'] = {
                            ID: 'md',
                            'DRI Number': 'sm',
                            'Total Connote': 'sm',
                            'Payment Type': 'sm',
                            'Total COD (Rp)': 'sm',
                        }
                        item['created_at'] = this.formatTimezone(item?.created_at)
                        item['type_amount'] = ['Total COD (Rp)']
                        item.runsheets?.map((el) => {
                            delivery_runsheet_number.push(el.delivery_runsheet_number)
                            dri.push(el.dri)
                            hrs.push(el.hrs)
                            total_connote.push(el.total_connote)
                            cod_payment_type.push(el.cod_payment_type)
                            total_amount_cod.push(el.total_amount_cod)
                        })
                        children['ID'] = delivery_runsheet_number
                        children['DRI Number'] = dri
                        children['Total Connote'] = total_connote
                        children['Payment Type'] = cod_payment_type
                        children['Total COD (Rp)'] = total_amount_cod
                        item['children'] = children
                    })
                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    this.loading = false
                })
                .catch((err) => {
                    this.loading = false
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        err?.response?.data?.code ?? null,
                        'Get List Failed',
                        err?.response?.data?.message ?? 'Failed to populate Outstanding COD'
                    )
                })
        },
        closeDialogConfirm() {
            this.confirmDialog = false
        },
        onRowClickCallback(event, item, selected) {
            this.filtered_item = selected.map((item) => item.hrs_number)
            this.$emit('update-selected', this.filtered_item)
        },
        onAllCheckCallback(val, selected) {
            this.is_all_selected = val
            if (val) {
                this.filtered_all_item = selected.map((item) => item.hrs_number)
                this.$emit('update-selected', this.filtered_all_item)
            } else {
                this.$emit('update-selected', selected)
            }
        },
        updateSelected(selected) {
            this.filtered_item = selected.map((item) => item.hrs_number)
            this.$emit('update-selected', this.filtered_item)
        },
        actionLimit(val) {
            this.pagination.limit = val
            this.pagination.page = 1
            this.refresh()
        },
        actionPagination(val) {
            this.pagination.page = val
            this.refresh()
        },
        refresh() {
            this.getTableData(
                this.pagination.limit,
                this.pagination.page,
                this.tempSearch,
                this.startDate,
                this.endDate
            )
        },
    },
    beforeDestroy() {
        window.removeEventListener('timezone-changed', this.refresh)
    },
    mounted() {
        window.addEventListener('timezone-changed', this.refresh)
        this.refresh()
    },
}
</script>

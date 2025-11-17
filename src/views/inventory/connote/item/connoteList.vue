<template>
    <div>
        <template v-if="hasStatusDelivery === '1'">
            <table-master
                hideColumnKey="inventory-archive"
                :dataTable="dataTable"
                :dataColumn="datacolumn"
                :tableLoading="loading"
                :pageSize="pagination.page_size"
                :page="pagination.page"
                :limit="pagination.limit"
                :hasAction="false"
                :hasLinked="['koli_number']"
                :hasLinkedDanger="'status_irregularity'"
                :hasPagination="true"
                :hasId="true"
                @actionLimit="actionLimit"
                @actionPagination="actionPagination"
                @handleEdit="showData"
            />
        </template>
        <template v-else>
            <table-master
                hideColumnKey="inventory-koli"
                :dataTable="dataTable"
                :dataColumn="datacolumn"
                :tableLoading="loading"
                :pageSize="pagination.page_size"
                :page="pagination.page"
                :limit="pagination.limit"
                :hasAction="false"
                :hasLinked="['koli_number']"
                :hasLinkedDanger="'status_irregularity'"
                :hasPagination="true"
                :hasId="true"
                @actionLimit="actionLimit"
                @actionPagination="actionPagination"
                @handleEdit="showData"
            />
        </template>
    </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'

import master from '@/mixins/master'
import TableMaster from '@/components/table/tableMaster.vue'

export default {
    name: 'list-user',
    mixins: [master],
    props: {
        query: String,
        queryBag: String,
        queryInventory: String,
        querySearch: String,
        queryDate: String,
        dateFilter: Array,
        hasStatusDelivery: String,
        statusDelivery: String,
    },
    components: {
        'table-master': TableMaster,
    },
    watch: {
        $props: {
            handler() {
                this.refresh()
            },
            deep: true,
        },
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: 'Koli Number',
                    key: 'koli_number',
                    width: 'xs',
                },
                {
                    label: 'Bag',
                    key: 'bag_number',
                    width: 'xxxs',
                },
                {
                    label: 'Connote Created Date',
                    key: 'created_at',
                    width: 'xs',
                },
                {
                    label: 'Created By',
                    key: 'created_by_user',
                    width: 'xs',
                },
                {
                    label: 'Receiving Date',
                    key: 'received_at',
                    width: 'xs',
                },
                {
                    label: 'Received By',
                    key: 'latest_received_by_user_name',
                    width: 'xs',
                },
                {
                    label: 'Last Bag Opened Date',
                    key: 'latest_opened_bag',
                    width: 'xs',
                },
                {
                    label: 'Origin',
                    key: 'origin_tariff_code',
                    width: 'auto',
                },
                {
                    label: 'Destination',
                    key: 'destination_tariff_code',
                    width: 'auto',
                },
                {
                    label: 'Actual Weight(Kg)',
                    key: 'connote_actual_weight',
                    width: 'auto',
                },
                {
                    label: 'Cost Weight(Kg)',
                    key: 'connote_chargeable_weight',
                    width: 'auto',
                },
                {
                    label: 'Routing Type',
                    key: 'routing_type',
                    width: 'auto',
                },
                {
                    label: 'Service',
                    key: 'connote_service_code',
                    width: 'auto',
                },
                {
                    label: 'COD',
                    key: 'is_cod',
                    width: 'auto',
                },
                {
                    label: 'Amount COD (Rp)',
                    key: 'amount_cod',
                    width: 'xxxs',
                    type_amount: true,
                    textAlign: 'right',
                },
                {
                    label: 'SLA',
                    key: 'connote_sla_date',
                    width: 'xs',
                },
                {
                    label: 'Runsheet Number',
                    key: 'delivery_runsheet_number',
                    width: 'xs',
                },
                {
                    label: 'Wood Package',
                    key: 'packing_kayu_type',
                    width: 'auto',
                },
                {
                    label: 'Cancel',
                    key: 'is_void_status',
                    width: 'auto',
                },
                {
                    label: 'Status POD',
                    key: 'delivery_status_code',
                    width: 'auto',
                },
                {
                    label: 'Status Irregularity',
                    key: 'status_irregularity',
                    width: 'auto',
                },
                {
                    label: 'Status',
                    key: 'is_confirmed',
                    width: 'auto',
                },
            ],
            loading: false,
            startDate: '',
            endDate: '',
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1,
            },
            loadInterval: null,
        }
    },
    methods: {
        pollData() {
            this.loadInterval = setInterval(() => {
                this.refresh()
            }, 60000) // 1 menit
        },
        formatDateRange() {
            if (this.dateFilter?.length) {
                this.startDate = moment(this.dateFilter[0]).format('YYYY-MM-DD')
                this.endDate = moment(this.dateFilter[1]).format('YYYY-MM-DD')
            } else {
                this.startDate = ''
                this.endDate = ''
            }
        },
        async getTableData() {
            this.loading = true
            this.formatDateRange()

            const params = {
                n: this.listenNodeId,
                sort_order: 'desc',
                limit: this.pagination.limit,
                page: this.pagination.page,
                s: this.query || '',
                is_on_bag: this.queryBag || '',
                is_confirmed: this.queryInventory || '',
                start_date: this.startDate,
                end_date: this.endDate,
                search_by: this.querySearch || '',
                filter_date_by: this.queryDate || '',
                has_status_delivery: this.hasStatusDelivery || '0',
                status_delivery: this.statusDelivery || '',
            }

            try {
                const res = await axios.get(this.URL.koli, {
                    params,
                    ...this.Helper.header(),
                })
                const arr = res.data.data.map((item) => ({
                    ...item,
                    created_at: this.formatTimezone(item.created_at),
                    received_at: this.formatTimezone(item.received_at),
                    latest_opened_bag: this.formatTimezone(item.latest_opened_bag),
                    is_cod: item.is_cod == 1 ? 'YES' : '-',
                    is_confirmed: item.is_confirmed == 1 ? 'Confirmed' : 'Unconfirmed',
                    is_void_status: item.is_void == 1 ? 'YES' : '-',
                    packing_kayu_type: item.packing_kayu_type ? 'Y' : '-',
                    status_irregularity: item.irregularity?.irregularity_status_description,
                }))
                this.dataTable = arr
                this.pagination.page = res.data.meta.current_page
                this.pagination.limit = parseInt(res.data.meta.per_page)
                this.pagination.page_size = res.data.meta.last_page
            } catch (err) {
                this.openNotification(
                    'danger',
                    err.response?.data?.code,
                    'Failed to populate users list',
                    err.response?.data?.message
                )
            } finally {
                this.loading = false
            }
        },
        refresh() {
            this.getTableData()
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
        showData(row) {
            this.$router.push(`/connote-detail/${row.koli_number}`)
            this.setRoutePageHistory(this.$route.meta, false)
        },
    },
    mounted() {
        window.addEventListener('timezone-changed', this.refresh)
        this.refresh()
    },
    beforeDestroy() {
        window.removeEventListener('timezone-changed', this.refresh)
        clearInterval(this.loadInterval) // prevent memory leaks
    },
}
</script>

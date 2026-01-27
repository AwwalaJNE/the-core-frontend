<template>
    <div>
        <table-master
            hideColumnKey="receiving"
            :key="listenBreadcrumbTitle"
            :dataTable="dataTable"
            :dataColumn="datacolumn"
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasAction="false"
            :hasLinked="['inbound_number']"
            :hasPagination="true"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
            @handleEdit="actionDetail"
        />
    </div>
</template>

<script>
import axios from 'axios'

import master from '@/mixins/master'

import TableMaster from '@/components/table/tableMaster.vue'

export default {
    name: 'Inbound-Incoming',
    mixins: [master],

    components: {
        'table-master': TableMaster,
    },

    props: {
        query: String,
        dateFilter: Array,
        searchBy: String,
        nodeType: String,
        origin: [String, Number],
        received: [String, Number],
        prealert: [String, Array],
        filterDateBy: String,
        isReset: Boolean,
        title: String,
        type: String,
    },

    data() {
        const saved = JSON.parse(localStorage.getItem('InboundFilters')) || {}

        return {
            dataTable: [],
            datacolumn: [],

            loading: false,

            tempSearch: saved.tempSearch || '',
            tempDate: saved.tempDate || [],
            nodeOrigin: saved.node_origin || '',
            node_type: saved.node_request || '',
            statusReceived: saved.value || '',
            prealertFilter: saved.values || '',
            localFilterDateBy: saved.filterDateBy || '',
            localSearchBy: saved.searchBy || '',

            pagination: {
                limit: 20,
                page: 1,
                page_size: 1,
            },
        }
    },

    computed: {
        listenBreadcrumbTitle() {
            return this.title
        },

        listenBreadcrumbCode() {
            return this.type
        },

        filters() {
            return {
                query: this.query,
                dateFilter: this.dateFilter,
                searchBy: this.searchBy,
                nodeType: this.nodeType,
                origin: this.origin,
                received: this.received,
                prealert: this.prealert,
                filterDateBy: this.filterDateBy,
                type: this.type,
            }
        },
    },

    watch: {
        filters: {
            deep: true,
            handler() {
                if (this.isReset) return

                this.tempSearch = this.query || ''
                this.tempDate = this.dateFilter || []
                this.node_type = this.nodeType || ''
                this.nodeOrigin = this.origin || ''
                this.statusReceived = this.received || ''
                this.localSearchBy = this.searchBy || ''
                this.localFilterDateBy = this.filterDateBy || ''
                this.prealertFilter = this.normalizePrealert(this.prealert)

                this.pagination.page = 1
                this.refresh()
                this.$emit('updateLocalStorage')
            },
        },

        isReset(val, old) {
            if (val !== old && !val) {
                this.refresh()
            }
        },

        listenBreadcrumbTitle: {
            handler(val, oldVal) {
                if (val !== oldVal && val !== undefined) {
                    this.setDatacolumn()
                }
            },
            immediate: true,
        },
    },

    methods: {
        setDatacolumn() {
            const title = this.listenBreadcrumbTitle
            const code = this.listenBreadcrumbCode

            const isPreAlert = title === 'Pre-Alert'
            const isRDO = title === 'RDO'
            const isReceivingItem = ['Receiving Connote', 'Receiving Bag', 'RCVB'].includes(title)

            const inboundLabel = code === 'Pre Alert' ? 'Incoming' : code === 'RDO' ? 'DO' : code

            this.datacolumn = [
                {
                    label: `${inboundLabel} Number`,
                    key: 'inbound_number',
                    width: 'xxxs',
                },

                ...(isPreAlert
                    ? [
                          {
                              label: `${code} Type`,
                              key: 'document_type',
                              width: 'xxxs',
                          },
                      ]
                    : []),

                {
                    label: 'Status',
                    key: 'status',
                    width: 'xxs',
                },

                ...(!isReceivingItem
                    ? [
                          {
                              label: 'Orion Number',
                              key: 'orion_number',
                              width: 'xxxs',
                          },
                      ]
                    : []),

                ...(isRDO
                    ? [
                          {
                              label: `${code} Number`,
                              key: 'rdo',
                              width: 'xxxs',
                          },
                      ]
                    : []),

                ...(!isReceivingItem
                    ? [
                          {
                              label: 'Bag Received',
                              key: 'total_received',
                              width: 'xxxs',
                          },
                          {
                              label: 'Bag Outstanding',
                              key: 'total_outstanding',
                              width: 'xxxs',
                          },
                          {
                              label: 'Total Bag',
                              key: 'total_item',
                              width: 'xxxs',
                          },
                          {
                              label: 'IM Numbers',
                              key: 'im_numbers',
                              width: 'xxxs',
                          },
                          {
                              label: 'Flight Number',
                              key: 'flight_number',
                              width: 'xxxs',
                          },
                          {
                              label: 'Vehicle',
                              key: 'vehicle',
                              width: 'xxxs',
                          },
                          {
                              label: 'Driver',
                              key: 'carrier_employee_name',
                              width: 'auto',
                          },
                      ]
                    : []),

                ...(title === 'Receiving Connote'
                    ? [
                          {
                              label: 'Receiving Number',
                              key: 'receiving_number',
                              width: 'xxs',
                          },
                      ]
                    : []),

                {
                    label: 'Branch Origin',
                    key: 'inbound_branch',
                    width: 'xs',
                },
                {
                    label: 'Node Origin',
                    key: 'formatted_node_origin',
                    width: 'md',
                },
                {
                    label: 'Created',
                    key: 'created_orion',
                    width: 'xxxs',
                },
                {
                    label: 'Created By',
                    key: 'created_by_user',
                    width: 'auto',
                },
                {
                    label: 'ETD',
                    key: 'inbound_etd',
                    width: 'xxxs',
                },
                {
                    label: 'ETA',
                    key: 'inbound_eta',
                    width: 'xxxs',
                },
                {
                    label: 'Handover to Transport',
                    key: 'departed_at',
                    width: 'xxs',
                },
                {
                    label: 'Received At',
                    key: 'inbound_node_name_receiver',
                    width: 'xxxs',
                },
                {
                    label: 'Received By',
                    key: 'received_by_user',
                    width: 'auto',
                },
                {
                    label: 'Received Time',
                    key: 'received_at',
                    width: 'xxxs',
                },
            ]
        },

        normalizePrealert(val) {
            if (Array.isArray(val)) return val.join(',')
            return String(val || '').replace(/\s+/g, '')
        },

        async getTableData({ pagination, filters }) {
            this.loading = true

            try {
                const res = await axios.get(this.URL.inbound_incoming, {
                    params: {
                        n: this.listenNodeId,
                        sort_order: 'desc',
                        limit: pagination.limit,
                        page: pagination.page,
                        ...filters,
                    },
                    ...this.Helper.header(),
                })

                this.dataTable = res.data.data.map(this.mapInboundRow)

                this.pagination = {
                    page: res.data.meta.current_page,
                    limit: Number(res.data.meta.per_page),
                    page_size: res.data.meta.last_page,
                }
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code || '',
                    'Failed to populate data',
                    err
                )
            } finally {
                this.loading = false
            }
        },

        mapInboundRow(item) {
            const im = [
                ...(item.manifest_do_items ?? []).map((i) => i.im_number),
                ...(item.manifest_items ?? []).map((i) => i.im_number),
            ]

            return {
                ...item,
                total_received: item?.total_received || '0',
                total_outstanding: item?.total_outstanding || '0',
                total_item: item?.total_item || '0',
                formatted_node_origin: item?.inbound_node_code_origin + ' - ' + item?.inbound_node_name_origin,
                orion_number:
                    item?.manifest_delivery_order?.do ||
                    item?.manifest_delivery_order?.hbag ||
                    item?.manifest_delivery_order?.mts ||
                    '',
                inbound_branch: item.inbound_branch_name_origin
                    ? `${item.inbound_branch_code_origin} - ${item.inbound_branch_name_origin}`
                    : item.inbound_branch_code_origin,
                created_orion: this.formatTimezone(item.created_orion || item.created_at),
                inbound_etd: this.formatTimezone(item.inbound_etd),
                inbound_eta: this.formatTimezone(item.inbound_eta),
                received_at: this.formatTimezone(item.received_at),
                inbound_number:
                    this.prealertFilter === 'bag' ? item.bag_number : item.inbound_number,
                im_numbers: [...new Set(im)].join(', '),
                rdo: item?.manifest_delivery_order?.rdo || '',
            }
        },

        async actionLimit(val) {
            this.pagination.limit = val
            this.pagination.page = 1
            await this.refresh()
        },

        async actionPagination(val) {
            this.pagination.page = val
            await this.refresh()
        },

        async refresh() {
            await this.getTableData({
                pagination: this.pagination,
                filters: {
                    s: this.tempSearch,
                    origin: this.nodeOrigin,
                    type: this.node_type,
                    status: this.statusReceived !== '-' ? this.statusReceived : '',
                    prealert:
                        this.normalizePrealert(this.prealertFilter) !== '-'
                            ? this.normalizePrealert(this.prealertFilter)
                            : '',
                    search_by: this.localSearchBy,
                    filter_date_by: this.localFilterDateBy,
                    start_date: this.tempDate?.[0] ? this.formatToWIB(this.tempDate[0]) : '',
                    end_date: this.tempDate?.[1] ? this.formatToWIB(this.tempDate[1]) : '',
                    inbound_type: this.type,
                },
            })
        },

        actionDetail(row) {
            this.$router.push({
                name: 'InboundIncomingScan',
                params: {
                    inbound_number: row.inbound_number,
                },
            })
            this.setRoutePageHistory(this.$route.meta, false)
        },
    },

    async mounted() {
        this.setDatacolumn()
        await this.refresh()
        window.addEventListener('timezone-changed', this.refresh)
    },

    beforeDestroy() {
        window.removeEventListener('timezone-changed', this.refresh)
    },
}
</script>

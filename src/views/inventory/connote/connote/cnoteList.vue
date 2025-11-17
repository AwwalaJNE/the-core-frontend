<template>
    <div>
        <table-master
            hideColumnKey="inventory-connote"
            :dataTable="dataTable"
            :dataColumn="datacolumn"
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasAction="false"
            :hasPagination="true"
            :expandable="true"
            :hasLinkedChild="listenUserRoleName === 'HELPDESK' ? [] : ['Koli Number']"
            :hasLinked="listenUserRoleName === 'HELPDESK' ? ['connote_number'] : []"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
            @handleEdit="showData"
            @handleEditLinkedChild="actionDetail"
        />

        <dialog-helpdesk-edit-connote
            title="Edit Connote"
            :active="dialogHelpdeskEditConnote"
            :connoteNumber="connote_number"
            :closeDialog="closeDialog"
        />
    </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'

import master from '@/mixins/master'

import TableMaster from '@/components/table/tableMaster.vue'

import DialogHelpdeskEditConnote from '@/views/helpdesk/connote/dialogHelpdeskEditConnote'

export default {
    name: 'list-connote',
    mixins: [master],
    props: {
        query: String,
        queryBag: String,
        queryInventory: String,
        querySearch: String,
        queryDate: String,
        dateFilter: Array,
    },
    components: {
        'table-master': TableMaster,
        'dialog-helpdesk-edit-connote': DialogHelpdeskEditConnote,
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
            dialogHelpdeskEditConnote: false,
            dataTable: [],
            datacolumn: [
                {
                    label: 'Connote Number',
                    key: 'connote_number',
                    width: 'xs',
                },
                {
                    label: 'Origin',
                    key: 'connote_shipper_tariff_code',
                    width: 'xs',
                },
                {
                    label: 'Destination',
                    key: 'connote_receiver_tariff_code',
                    width: 'xs',
                },
                {
                    label: 'Weight(Kg)',
                    key: 'connote_chargeable_weight',
                    width: 'xs',
                },
                {
                    label: 'Routing Type',
                    key: 'routing_type',
                    width: 'xs',
                },
                {
                    label: 'Service',
                    key: 'connote_service_code',
                    width: 'xs',
                },
                {
                    label: 'COD',
                    key: 'is_cod',
                    width: 'xs',
                },
                {
                    label: 'Amount COD (Rp)',
                    key: 'amount_cod',
                    width: 'sm',
                    type_amount: true,
                    textAlign: 'right',
                },
                {
                    label: 'SLA',
                    key: 'connote_sla_date',
                    width: 'xs',
                },
                {
                    label: 'Created At',
                    key: 'created_at',
                    width: 'xs',
                },
                {
                    label: 'Created By',
                    key: 'created_by_user',
                    width: 'xs',
                },
                {
                    label: 'Cancel',
                    key: 'is_void_status',
                    width: 'xs',
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
            connote_number: '',
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
            }

            try {
                const { data } = await axios.get(this.URL.connote, {
                    params,
                    ...this.Helper.header(),
                })

                this.dataTable = data.data.map((item) => this.formatItem(item))
                this.pagination = {
                    page: data.meta.current_page,
                    limit: parseInt(data.meta.per_page),
                    page_size: data.meta.last_page,
                }
            } catch (err) {
                this.openNotification(
                    'danger',
                    err.response?.data?.code,
                    'Failed to populate connote list',
                    err.response?.data?.message
                )
            } finally {
                this.loading = false
            }
        },
        formatItem(item) {
            const formatted = {
                ...item,
                created_at: this.formatTimezone(item.created_at),
                is_void_status: item.is_void == 1 ? 'YES' : '-',
                is_cod: item.is_cod == 1 ? 'YES' : '-',
                created_by_user: item.koli?.[0]?.created_by_user || '-',
            }

            const children = this.formatChildren(item.koli)
            formatted.children = children
            formatted.children_width = {
                'Koli Number': 'xs',
                Bag: 'xs',
                'Wood Package': 'xs',
                'Receiving Date': 'sm',
                'Scanned Date': 'sm',
                'Status Irregularity': 'xs',
                'Delivery Status Code': 'xs',
                Status: 'xs',
            }

            return formatted
        },
        formatChildren(koliList = []) {
            const fields = {
                'Koli Number': [],
                Bag: [],
                'Wood Package': [],
                'Receiving Date': [],
                'Scanned Date': [],
                'Status Irregularity': [],
                'Delivery Status Code': [],
                Status: [],
            }

            koliList.forEach((k) => {
                fields['Koli Number'].push(k.koli_number)
                fields['Bag'].push(k.location_bag_number ?? ' ')
                fields['Wood Package'].push(k.packing_kayu_type ? 'Y' : '-')
                fields['Receiving Date'].push(this.formatTimezone(k.received_at))
                fields['Scanned Date'].push(this.formatTimezone(k.latest_opened_bag))
                fields['Status Irregularity'].push(
                    k.irregularity?.irregularity_status_description ?? ' '
                )
                fields['Delivery Status Code'].push(k.delivery_status_code ?? '-')
                fields['Status'].push(k.is_confirmed == 1 ? 'Confirmed' : 'Unconfirmed')
            })

            return fields
        },
        refresh(val) {
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
            this.connote_number = row.connote_number
            this.dialogHelpdeskEditConnote = true
        },
        actionDetail(row) {
            this.$router.push({ name: 'detailConnote', params: { id: row.transaction_id } })
            this.setRoutePageHistory(this.$route.meta, false)
        },
        closeDialog() {
            this.dialogHelpdeskEditConnote = false
            this.refresh()
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

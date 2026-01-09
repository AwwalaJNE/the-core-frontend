<template>
    <div>
        <table-master
            :key="tableKey"
            hideColumnKey="receiving-detail-info"
            :dataTable="dataTableProp"
            :dataColumn="dataColumn"
            :tableLoading="loading"
            :hasAction="false"
            :hasPagination="true"
            :pageSize="pageSize"
            :page="page"
            :limit="limit"
            :customAction="true"
            :customActionList="customActionList"
            :isIconButton="true"
            :hasLinked="hasLinkedColumns"
            @actionLimit="$emit('actionLimit', $event)"
            @actionPagination="$emit('actionPagination', $event)"
            @actionUpdate="openDialogReceivingLog"
            @handleEdit="openDialogTraceBagDetail"
        />

        <dialog-create-receiving-log
            ref="dialogReceivingLog"
            title="Edit Receiving Log"
            btnBlue="Edit"
            :active="isReceivingLogOpen"
            :inboundDetail="inboundDetail"
            :receivingLogs="receivingLogs"
            @closeDialog="closeDialogReceivingLog"
        />

        <dialog-trace-bag-detail
            ref="dialogTraceBagDetail"
            title="Bag Detail"
            :active="isTraceBagDetailOpen"
            :item_number="item_number"
            @closeDialog="closeDialogTraceBagDetail"
        />
    </div>
</template>
<script>
import master from '@/mixins/master'
import TableMaster from '@/components/table/tableMaster.vue'
import DialogCreateReceivingLog from '../../inboundAirport/scan/dialogCreateReceivingLog.vue'
import DialogTraceBagDetail from '@/views/inbound/scan/dialogTraceBagDetail.vue'

const BAG_TYPE_MAP = {
    OM: { label: 'TM', key: 'tm' },
    HACB: { label: 'RCVB', key: 'rcvb' },
    HVO: { label: 'HVI', key: 'hvi' },
    DO: { label: 'HVI', key: 'hvi' },
}

const DEFAULT_BAG = { label: 'HVI', key: 'hvi' }

export default {
    name: 'InboundDetail',
    mixins: [master],
    components: {
        TableMaster,
        DialogCreateReceivingLog,
        DialogTraceBagDetail,
    },
    props: {
        dataTableProp: {
            type: Array,
            default: () => [],
        },
        loading: Boolean,
        pageSize: Number,
        page: Number,
        limit: Number,
        receivingLogs: Array,
        inboundNumber: String,
        is_prealert: Boolean,
    },
    data() {
        return {
            isReceivingLogOpen: false,
            isTraceBagDetailOpen: false,
            inboundDetail: null,
            item_number: '',
            customActionList: Object.freeze([
                {
                    label: 'Entry Status',
                    key: 'entry_status',
                },
            ]),
        }
    },

    computed: {
        bagType() {
            const tipeBag = this.dataTableProp?.[0]?.bag?.tipe_bag
            return BAG_TYPE_MAP[tipeBag] || DEFAULT_BAG
        },

        tableKey() {
            return `${this.bagType.key}-${this.bagType.label}`
        },

        dataColumn() {
            return [
                {
                    label: 'Item Number',
                    key: 'item_number',
                    width: 'sm',
                },
                {
                    label: 'Total Connote',
                    key: 'total_connote',
                    width: 'sm',
                },
                {
                    label: 'Item type',
                    key: 'item_type',
                    width: 'sm',
                },

                {
                    label: this.bagType.label,
                    key: this.bagType.key,
                    width: 'sm',
                },
                {
                    label: 'Irregularity Status',
                    key: 'irregularity_status',
                    width: 'sm',
                },
                {
                    label: 'Status receiving',
                    key: 'is_received',
                    type: 'status',
                    width: 'sm',
                    is_missroute: 'is_missroute',
                },
            ]
        },

        hasLinkedColumns() {
            const hasBagItem = this.dataTableProp.some(
                (row) => row.item_type === 'BAG' || row.item_type === 'MASTERBAG'
            )

            return hasBagItem ? ['item_number'] : []
        },
    },

    methods: {
        openDialogBase(dialogKey) {
            this[dialogKey] = true
            this.$emit('autoFocusInput', false)
        },

        openDialogReceivingLog(row) {
            this.inboundDetail = {
                ...row,
                inbound_number: this.inboundNumber,
            }
            this.openDialogBase('isReceivingLogOpen')
        },

        openDialogTraceBagDetail(row) {
            this.item_number = row.item_number
            this.openDialogBase('isTraceBagDetailOpen')
        },

        closeDialogBase(dialogKey) {
            this[dialogKey] = false
            this.$emit('refresh')
            this.$emit('autoFocusInput', true)
        },

        closeDialogReceivingLog() {
            this.inboundDetail = null
            this.closeDialogBase('isReceivingLogOpen')
        },

        closeDialogTraceBagDetail() {
            this.item_number = ''
            this.closeDialogBase('isTraceBagDetailOpen')
        },
    },
}
</script>

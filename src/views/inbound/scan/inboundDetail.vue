<template>
    <div>
        <table-master
            :key="tableKey"
            hideColumnKey="receiving-detail-info"
            :dataTable="dataTableProp"
            :dataColumn="datacolumn"
            :tableLoading="listenLoading"
            :hasAction="false"
            :hasPagination="true"
            :pageSize="pageSize"
            :page="page"
            :limit="limit"
            :customAction="true"
            :customActionList="customActionList"
            :isIconButton="true"
            :expandable="true"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
            @actionUpdate="entryReceivingLog"
        />

        <dialog-create-receiving-log
            ref="dialogEditReceivingLog"
            title="Edit Receiving Log"
            btnBlue="Edit"
            :active="dialogEditReceivingLogActive"
            :inboundDetail="inboundDetail"
            :receivingLogs="receivingLogs"
            @closeDialog="closeDialog"
        />
    </div>
</template>
<script>
import master from '@/mixins/master'
import TableMaster from '@/components/table/tableMaster.vue'
import DialogCreateReceivingLog from '../../inboundAirport/scan/dialogCreateReceivingLog.vue'

const BAG_TYPE_MAP = {
    OM: { label: 'TM', key: 'tm' },
    HACB: { label: 'RCVB', key: 'rcvb' },
    HVO: { label: 'HVI', key: 'hvi' },
    DO: { label: 'HVI', key: 'hvi' },
}

export default {
    name: 'Inbound-Detail',
    mixins: [master],
    props: {
        dataTableProp: Array,
        loading: Boolean,
        pageSize: Number,
        page: Number,
        limit: Number,
        actionLimit: Function,
        actionPagination: Function,
        receivingLogs: Array,
        inboundNumber: String,
        is_prealert: Boolean,
        autoFocusInput: Function,
    },
    components: {
        'table-master': TableMaster,
        'dialog-create-receiving-log': DialogCreateReceivingLog,
    },
    data() {
        return {
            customActionList: [
                {
                    label: 'Entry Status',
                    key: 'entry_status',
                    attribute: '',
                },
            ],
            dialogEditReceivingLogActive: false,
            inboundDetail: null,
        }
    },
    computed: {
        listenLoading() {
            return this.loading
        },

        bagTypeConfig() {
            return BAG_TYPE_MAP[this.dataTableProp?.[0]?.bag?.tipe_bag] ?? null
        },

        tableKey() {
            if (!this.bagTypeConfig) {
                return 'no-dynamic-column'
            }

            return `${this.bagTypeConfig.key}-${this.bagTypeConfig.label}`
        },

        datacolumn() {
            const columns = [
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
            ]

            if (this.bagTypeConfig) {
                columns.push({
                    label: this.bagTypeConfig.label,
                    key: this.bagTypeConfig.key,
                    width: 'sm',
                })
            }

            columns.push(
                {
                    label: 'Irregularity Status',
                    key: 'irregularity_status',
                    width: 'sm',
                },
                {
                    label: 'Status Receiving',
                    key: 'is_received',
                    type: 'status',
                    width: 'sm',
                    is_missroute: 'is_missroute',
                }
            )

            return columns
        },
    },

    methods: {
        entryReceivingLog(val) {
            this.dialogEditReceivingLogActive = true
            this.inboundDetail = {
                ...val,
                inbound_number: this.inboundNumber,
            }

            this.$emit('autoFocusInput', true)
        },

        closeDialog() {
            this.dialogEditReceivingLogActive = false
            this.inboundDetail = null

            this.$emit('refresh')
            this.$emit('autoFocusInput', false)
        },
    },
}
</script>

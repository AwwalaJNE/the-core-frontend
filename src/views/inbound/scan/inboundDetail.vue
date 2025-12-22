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
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
            :customAction="true"
            :customActionList="customActionList"
            @actionUpdate="entryReceivingLog"
            :isIconButton="true"
        />

        <dialog-create-receiving-log
            ref="dialogEditReceivingLog"
            :active="dialogEditReceivingLogActive"
            :inboundDetail="inboundDetail"
            @closeDialog="closeDialog"
            btnBlue="Edit"
            title="Edit Receiving Log"
            :receivingLogs="receivingLogs"
        />
    </div>
</template>
<script>
import master from '@/mixins/master'
import TableMaster from '@/components/table/tableMaster.vue'
import DialogCreateReceivingLog from '../../inboundAirport/scan/dialogCreateReceivingLog.vue'
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
            dataTable: [],
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
        tableKey() {
            return `${this.getDynamicColumnKey}-${this.getDynamicColumnLabel}`
        },

        getDynamicColumnLabel() {
            if (this.dataTableProp && this.dataTableProp.length > 0) {
                const firstItem = this.dataTableProp[0]
                const tipeBag = firstItem.bag?.tipe_bag

                switch (tipeBag) {
                    case 'OM':
                        return 'TM'
                    case 'HACB':
                        return 'RCVB'
                    case 'HVO':
                    case 'DO':
                        return 'HVI'
                    default:
                        return 'HVI' // default fallback
                }
            }
            return 'HVI' // default ketika belum ada data
        },

        getDynamicColumnKey() {
            if (this.dataTableProp && this.dataTableProp.length > 0) {
                const firstItem = this.dataTableProp[0]
                const tipeBag = firstItem.bag?.tipe_bag

                switch (tipeBag) {
                    case 'OM':
                        return 'tm'
                    case 'HACB':
                        return 'rcvb'
                    case 'HVO':
                    case 'DO':
                        return 'hvi'
                    default:
                        return 'bag_number' // default fallback
                }
            }
            return 'bag_number' // default ketika belum ada data
        },

        datacolumn() {
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
                    // 🧠 kolom dinamis
                    label: this.getDynamicColumnLabel,
                    key: this.getDynamicColumnKey,
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

        listenLoading() {
            return this.loading
        },
    },
    methods: {
        entryReceivingLog(val) {
            this.dialogEditReceivingLogActive = true
            this.inboundDetail = val
            this.inboundDetail.inbound_number = this.inboundNumber

            this.$emit('autoFocusInput', this.dialogEditReceivingLogActive)
        },

        closeDialog() {
            this.dialogEditReceivingLogActive = false
            this.inboundDetail = null
            this.$emit('refresh')

            this.$emit('autoFocusInput', this.dialogEditReceivingLogActive)
        },
    },
}
</script>

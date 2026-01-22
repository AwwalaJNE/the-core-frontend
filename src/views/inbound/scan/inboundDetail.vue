<template>
    <div :class="{ 'box-v1': boxed }">
        <vs-row justify="space-between" align="center">
            <h4 v-if="title">{{ title }}</h4>

            <core-button
                v-if="dataTable?.length > 0"
                icon="bx bx-pencil"
                name="remark"
                :customStyle="{ width: 'auto' }"
                @click="openDialog('insert_remark')"
            >
                Insert Remark
            </core-button>
        </vs-row>

        <vs-row class="section-padding">
            <vs-col w="12">
                <table-master
                    hideColumnKey="receiving-detail-info"
                    :key="`${tableKey}-${documentType}`"
                    :dataTable="dataTable"
                    :dataColumn="datacolumn"
                    :tableLoading="loading"
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
                    @actionUpdate="handleActionUpdate"
                />
            </vs-col>
        </vs-row>

        <dialog-insert-remark
            :actived="dialogInsertRemark"
            :inbound_number="inboundNumber"
            @closeDialog="closeDialog('insert_remark')"
        />

        <dialog-create-receiving-log
            ref="dialogReceivingLog"
            title="Receiving Log"
            btnBlue="Save"
            :active="dialogReceivingLog"
            :inboundDetail="inboundDetail"
            :receivingLogs="receivingLogs"
            @closeDialog="closeDialog('receiving_log')"
        />
    </div>
</template>

<script>
import master from '@/mixins/master'

import Button from '@/components/button'
import TableMaster from '@/components/table/tableMaster'

import DialogCreateReceivingLog from '../../inboundAirport/scan/dialogCreateReceivingLog'
import DialogInsertRemark from '@/views/inbound/scan/dialogInsertRemark'

const BAG_TYPE_MAP = {
    OM: { label: 'TM', key: 'tm' },
    HACB: { label: 'RCVB', key: 'rcvb' },
    HVO: { label: 'HVI', key: 'hvi' },
    DO: { label: 'HVI', key: 'hvi' },
}

export default {
    name: 'InboundDetailBox',
    mixins: [master],
    components: {
        'core-button': Button,
        'table-master': TableMaster,
        'dialog-create-receiving-log': DialogCreateReceivingLog,
        'dialog-insert-remark': DialogInsertRemark,
    },
    props: {
        boxed: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        dataTable: {
            type: Array,
            default: () => [],
        },
        loading: {
            type: Boolean,
            default: false,
        },
        pageSize: {
            type: Number,
            default: 10,
        },
        page: {
            type: Number,
            default: 1,
        },
        limit: {
            type: Number,
            default: 10,
        },
        actionLimit: {
            type: Function,
        },
        actionPagination: {
            type: Function,
        },
        receivingLogs: {
            type: Array,
            default: () => [],
        },
        inboundNumber: {
            type: String,
            default: '',
        },
        documentType: {
            type: String,
            default: ''
        }
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
            inboundDetail: null,
            dialogReceivingLog: false,
            dialogInsertRemark: false,
        }
    },
    computed: {
        bagTypeConfig() {
            return BAG_TYPE_MAP[this.dataTable?.[0]?.bag?.tipe_bag] || null
        },
        tableKey() {
            return this.bagTypeConfig
                ? `${this.bagTypeConfig.key}-${this.bagTypeConfig.label}`
                : 'no-dynamic-column'
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
            // Conditionally add HVO column before the dynamic column if documentType is 'DO'
            if (this.documentType === 'DO') {
                columns.push({
                    label: 'HVO',
                    key: 'hvo',
                    width: 'sm',
                });
            }
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
        handleActionUpdate(row) {
            this.openDialog('receiving_log', row)
        },
        openDialog(type, row = null) {
            this.$emit('autoFocusInput', true)

            const dialogMap = {
                insert_remark: () => {
                    this.dialogInsertRemark = true
                },

                receiving_log: () => {
                    if (!row) return

                    this.dialogReceivingLog = true
                    this.inboundDetail = {
                        ...row,
                        inbound_number: this.inboundNumber,
                    }
                },
            }

            dialogMap[type]?.()
        },
        closeDialog(type) {
            const closeMap = {
                insert_remark: () => {
                    this.dialogInsertRemark = false
                },
                receiving_log: () => {
                    this.dialogReceivingLog = false
                    this.inboundDetail = null
                },
            }

            closeMap[type]?.()
            this.$emit('refresh')
            this.$emit('autoFocusInput', false)
        },
    },
}
</script>

<template>
    <dialog-master width="xl" :actived="active" :loading="loading" :closeDialog="cancel">
        <template #header>
            {{ title }}
        </template>

        <template #content>
            <table-master
                hideColumnKey="dialog-trace-bag-detail"
                :dataTable="dataTable"
                :dataColumn="dataColumn"
                :tableLoading="loading"
                :pageSize="pagination.page"
                :page="pagination.page"
                :limit="pagination.limit"
                :hasAction="false"
                :hasPagination="true"
                @actionLimit="onLimitChange"
                @actionPagination="onPageChange"
            />
        </template>
    </dialog-master>
</template>

<script>
import axios from 'axios'
import master from '@/mixins/master'
import DialogMaster from '@/components/dialog/dialogMaster'
import TableMaster from '@/components/table/tableMaster.vue'

const COLUMNS = Object.freeze([
    { label: 'No', key: 'no', width: 'xs' },
    { label: 'Item', key: 'item_number', width: 'md' },
    { label: 'Quantity', key: 'koli_qty', width: 'xs' },
    { label: 'Of#', key: 'koli_sequence', width: 'auto' },
    { label: 'Weight', key: 'bag_weight', width: 'auto' },
    { label: 'Destination Code', key: 'destination_code', width: 'auto' },
    { label: 'Service', key: 'connote_service_code', width: 'auto' },
    { label: 'Type', key: 'item_type', width: 'auto' },
    { label: 'Date', key: 'created_at', width: 'xs' },
])

export default {
    name: 'DialogTraceBagDetail',
    mixins: [master],
    components: {
        DialogMaster,
        TableMaster,
    },

    props: {
        active: Boolean,
        title: String,
        item_number: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            loading: false,
            dataTable: [],
            dataColumn: COLUMNS,
            pagination: {
                page: 1,
                limit: 20,
            },
        }
    },

    watch: {
        active: {
            immediate: true,
            handler(val) {
                if (val) this.resetAndFetch()
            },
        },

        'pagination.page': 'fetchBagActivity',
        'pagination.limit': 'resetAndFetch',
    },

    methods: {
        resetAndFetch() {
            this.pagination.page = 1
            this.fetchBagActivity()
        },

        mapBagItem(item, index, meta) {
            const isKoli = !this.is_consolidated

            return {
                ...item,
                no: index + 1,
                created_at: this.formatTimezone(item.created_at),
                destination_code: isKoli
                    ? item.connote_receiver_tariff_code
                    : item.node_tariff_code,
                koli_qty: isKoli ? item.koli_qty : item.bag_detail_qty,
                koli_sequence: isKoli ? item.koli_sequence : '-',
                bag_weight: isKoli ? item?.connote_actual_weight : item.bag_weight,
                connote_service_code: isKoli
                    ? item.connote_service_code
                    : item.bag_service.join(', '),
                bag_detail_qty: meta.bag_detail_qty,
                isDisabled: meta.is_approve === 1,
                runsheet_number: item?.runsheet?.at(-1)?.delivery_runsheet_number || '',
            }
        },

        async fetchBagActivity() {
            if (!this.active) return

            this.loading = true

            try {
                const { page, limit } = this.pagination

                const { data } = await axios.get(`${this.URL.bag}/${this.item_number}`, {
                    ...this.Helper.header(),
                    params: {
                        n: this.listenNodeId,
                        sort_order: 'desc',
                        page,
                        limit,
                    },
                })

                this.dataTable = data.detail.map((item, index) =>
                    this.mapBagItem(item, index, data.data)
                )
            } catch (error) {
                this.openNotification(
                    'danger',
                    error?.response?.data?.code || '',
                    'Failed to load bag activity data',
                    error
                )
            } finally {
                this.loading = false
            }
        },

        onLimitChange(limit) {
            this.pagination.limit = limit
        },

        onPageChange(page) {
            this.pagination.page = page
        },

        cancel() {
            this.$emit('closeDialog')
        },
    },
}
</script>

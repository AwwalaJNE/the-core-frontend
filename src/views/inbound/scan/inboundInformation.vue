<template>
    <div :class="{ 'box-v1': boxed }">
        <h4 v-if="title" align="left">{{ title }}</h4>
        <table-master
            hideColumnKey="receiving-master-info"
            :dataTable="dataTable"
            :dataColumn="datacolumn"
            :tableLoading="loading"
            :hasAction="false"
            :hasPagination="false"
            @handleEdit="actionDetail"
        />
    </div>
</template>

<script>
import master from '@/mixins/master'

import TableMaster from '@/components/table/tableMaster'

export default {
    name: 'Inbound-Incoming',
    mixins: [master],
    props: {
        boxed: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        dataTableProp: {
            type: [Array, Object],
            default: () => [],
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        'table-master': TableMaster,
    },
    computed: {
        dataTable() {
            return this.dataTableProp
        },
    },
    data() {
        return {
            datacolumn: [
                {
                    label: 'Receiving Number',
                    key: 'inbound_number',
                    width: 'xs',
                },
                {
                    label: 'Type',
                    key: 'document_type',
                    width: 'xs',
                },
                {
                    label: 'Received',
                    key: 'total_received',
                    width: 'xxs',
                },
                {
                    label: 'Unreceived',
                    key: 'total_unreceived',
                    width: 'xxs',
                },

                {
                    label: 'Status',
                    key: 'status_received',
                    width: 'xxs',
                },
            ],
        }
    },
    methods: {
        actionDetail(row) {
            this.$router.push({ name: 'detailConnote', params: { id: row.transaction_id } })
            this.setRoutePageHistory(this.$route.meta, false)
        },
    },
}
</script>

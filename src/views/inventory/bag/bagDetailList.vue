<!--
    - @desc component yang handle crud frontend connote item
    - @param -
    - @emit -
    - @props -
-->
<template>
    <div>
        <div class="summary-bag">
            <vs-row align="center">
                <vs-col xs="12" sm="9" lg="9" align="left" class="bag-no">
                    <template v-if="!is_pra_runsheet">
                        <div class="bag-header">
                            <h3>Bag No. {{ bag_number }}</h3>
                        </div>
                        <div class="bag-info">
                            <p>Destination: {{ bag_destination_name }} ( {{ bag_destination }} )</p>
                            <p>
                                Total Connote: {{ total_connote }} Pcs | Actual Weight:
                                {{ actual_weight }} Kg | Cost Weight: {{ cost_weight }} Kg
                            </p>
                        </div>
                    </template>
                    <template v-else>
                        <vs-col xs="12" sm="9" lg="9" align="left">
                            <p>Total Connote: {{ total_connote }} Pcs</p>
                        </vs-col>
                        <vs-col xs="12" sm="9" lg="9" align="left">
                            <p>Total Weight: {{ total_weight }} Kg</p>
                        </vs-col>
                    </template>
                </vs-col>
                <vs-col xs="12" sm="3" lg="3" align="right">
                    <h1>{{ bag_detail_qty }}</h1>
                    <p>Bagged</p>
                </vs-col>
            </vs-row>
        </div>

        <table-master
            hideColumnKey="bag-detail"
            :dataTable="dataTable"
            :dataColumn="!is_consolidated ? dataColumn.concat(additionalColumn) : dataColumn"
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasAction="false"
            :removeOnly="true"
            :hasPagination="true"
            @actionRemove="actionRemove"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
        />

        <dialog-confirm
            title="Remove Item Detail"
            :message="`Are you sure you want to remove item with id ${this.primaryKey}?`"
            :active="activeDialogConfirmRemove"
            :loading="loadingConfirmRemove"
            :closeDialog="closeDialogConfirmRemove"
            @confirm="confirmRemove"
            @cancel="closeDialogConfirmRemove"
        />
    </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'
import TableMaster from '@/components/table/tableMaster.vue'
import DialogConfirm from '@/components/dialog/dialogConfirm'
export default {
    name: 'list-detailbag',
    mixins: [master],
    props: {
        query: String,
        bagId: String,
    },
    components: {
        'table-master': TableMaster,
        'dialog-confirm': DialogConfirm,
    },
    watch: {
        query: function (val, old) {
            if (val !== undefined) {
                this.tempSearch = val
                if (this.tempSearch !== old) {
                    this.pagination.page = 1
                    this.getTableData(this.pagination.limit, this.pagination.page, this.bag_id)
                }
            }
        },
        is_consolidated: function (val, old) {
            if (val !== undefined) {
                this.is_consolidated = val
            }
        },
    },
    data() {
        return {
            dataTable: [],
            dataColumn: [
                {
                    label: 'No',
                    key: 'no',
                    width: 'xxxxs',
                },
                {
                    label: 'Item',
                    key: 'item_number',
                    width: 'sm',
                },
                {
                    label: 'Quantity',
                    key: 'koli_qty',
                    width: 'auto',
                },
                {
                    label: 'Actual Weight',
                    key: 'actual_weight_item',
                    width: 'xxs',
                },
                {
                    label: 'Cost Weight',
                    key: 'cost_weight_item',
                    width: 'xxs',
                },
                {
                    label: 'Destination Code',
                    key: 'destination_code',
                    width: 'xs',
                },
                {
                    label: 'Service',
                    key: 'connote_service_code',
                    width: 'xxxs',
                },
                {
                    label: 'Type',
                    key: 'item_type',
                    width: 'xxxs',
                },
                {
                    label: 'Date',
                    key: 'created_at',
                    width: 'sm',
                },
            ],
            additionalColumn: [
                {
                    label: 'Runsheet Number',
                    key: 'runsheet_number',
                    width: 'sm',
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: this.query ? this.query : '',
            dialogUser: false,
            bag_id: '',
            bag_number: '',
            total_connote: '',
            total_weight: '',
            actual_weight: '',
            cost_weight: '',
            bag_detail_qty: '',
            bag_destination: '',
            bag_destination_id: '',
            bag_destination_name: '',
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1,
            },
            is_pra_runsheet: false,
            parentId: '',
            id: '',
            primaryKey: '',
            activeDialogConfirmRemove: false,
            loadingConfirmRemove: false,
            is_consolidated: false,
            data: {},
        }
    },
    methods: {
        async getTableData(limit, page, bag) {
            this.loading = true
            let bagId = bag ?? ''

            try {
                const res = await axios.get(
                    this.URL.bag + '/' + bagId + `?n=${this.listenNodeId}`,
                    this.Helper.header()
                )

                this.data = res?.data

                let arr = res?.data?.detail
                let arrData = res?.data?.data

                this.$ls.set('getDataBag', arrData)

                this.is_consolidated = arrData?.is_consolidated === '1'
                this.is_pra_runsheet = arrData?.is_pra_runsheet === '1' ? true : false

                arr.map((item, index) => {
                    item['no'] = index + 1
                    item['destination_code'] =
                        item.item_type === 'KOLI'
                            ? item.connote_receiver_tariff_code
                            : item.node_tariff_code
                    item['koli_qty'] =
                        item.item_type == 'KOLI' ? item.koli_qty : item.bag_detail_qty
                    item['koli_sequence'] = item.item_type == 'KOLI' ? item.koli_sequence : '-'
                    item['bag_weight'] =
                        item.item_type == 'KOLI' ? item?.connote_actual_weight : item.bag_weight
                    item['connote_service_code'] =
                        item.item_type == 'KOLI'
                            ? item.connote_service_code
                            : item.bag_service.join(', ')
                    item['bag_detail_qty'] = res.data.data.bag_detail_qty
                    item['isDisabled'] = res.data.data.is_approve === 1 ? true : false
                    item['runsheet_number'] = item?.runsheet
                        ? item?.runsheet?.[item?.runsheet?.length - 1]?.delivery_runsheet_number
                        : ''
                    item['actual_weight_item'] = item.actual_weight_item + ' Kg'
                    item['cost_weight_item'] = item.cost_weight_item + ' Kg'
                    item['created_at'] = this.formatTimezone(item['created_at'])
                })

                this.getSummaryBag(res)
                this.dataTable = arr
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code || '',
                    'Failed',
                    err?.response?.data?.message || 'Failed to populate bag'
                )
            } finally {
                this.loading = false
                this.$emit('getResponse', this.data, this.loading)
            }
        },

        getSummaryBag(val) {
            this.bag_number = val.data.data.bag_number
            this.bag_detail_qty = val.data.data.bag_detail_qty
            this.total_connote = val.data.total_item_connote
            this.total_weight = val.data.total_weight
            this.actual_weight = val.data.data.bag_actual_weight
            this.cost_weight = val.data.data.cost_weight
            this.bag_destination = val?.data?.data?.destination?.node_code ?? ''
            this.bag_destination_id = val?.data?.data?.destination?.node_id ?? ''
            this.bag_destination_name = val?.data?.data?.destination?.node_name ?? ''
        },
        actionUpdate(val) {
            if (this.dataTable.length > 0) {
                let obj = this.dataTable.filter((item) => {
                    return item.user_id === val.user_id
                })
                this.dataItem = obj[0]

                this.$nextTick(() => {
                    this.dialogUser = true
                })
            }
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
        refresh(val) {
            this.getTableData(this.pagination.limit, this.pagination.page, this.bag_id)
        },
        closeDialogUser() {
            this.dialogUser = false
        },
        getBagIdParam() {
            this.bag_id = this.$route.params.id
        },
        actionRemove(val) {
            this.id = val.bag_detail_id
            this.parentId = val.bag_number
            this.primaryKey = val.item_number
            this.activeDialogConfirmRemove = true
        },
        confirmRemove() {
            this.loadingConfirmRemove = true
            this.removeData()
        },
        async removeData() {
            let bagNumberForRoute = this.parentId
            await axios
                .delete(
                    this.URL.bag + `/${bagNumberForRoute}/detail/${this.id}?n=${this.listenNodeId}`,
                    this.Helper.header()
                )
                .then((res) => {
                    this.closeDialogConfirmRemove()
                    this.loadingConfirmRemove = false
                    if (res.data.detail.length > 0) {
                        this.refresh()
                    } else {
                        this.$router.push('/outgoing/bag')
                        this.setRoutePageHistory(this.$route.meta, false)
                    }
                    this.openNotification(
                        'success',
                        null,
                        'Remove success',
                        'Remove bag item successfully'
                    )
                })
                .catch((err) => {
                    this.loadingConfirmRemove = false
                    this.closeDialogConfirmRemove()
                    this.loading = false
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'Remove bag item is failed',
                        err.response.data.message
                    )
                })
        },
        closeDialogConfirmRemove() {
            this.activeDialogConfirmRemove = false
            this.loadingConfirmRemove = false
        },
    },
    mounted() {
        this.getBagIdParam()
        this.getTableData(this.pagination.limit, this.pagination.page, this.bag_id)
        window.addEventListener('timezone-changed', this.refresh)
    },
    beforeDestroy() {
        window.removeEventListener('timezone-changed', this.refresh)
    },
}
</script>
<style lang="scss">
.summary-bag p,
h1 {
    margin-top: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
    margin-bottom: 5px;
}
.summary-bag p {
    font-size: 16px;
}
.summary-bag {
    margin-bottom: 40px;
}
.bag-header {
    margin-bottom: 15px;
}
.bag-title,
.bag-number {
    font-size: 20px;
    font-weight: bold;
}
.bag-info {
    margin-top: 10px;
}
.bag-info p {
    font-size: 14px;
    margin-bottom: 3px;
}
.bag-detail {
    @include for-phone-only {
        text-align: right;
    }
}
.bag-no {
    @include for-phone-only {
        text-align: center;
        margin-bottom: 15px;
    }
}
</style>

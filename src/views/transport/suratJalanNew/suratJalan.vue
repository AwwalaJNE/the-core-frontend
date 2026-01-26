<template>
    <div>
        <table-master
            hideColumnKey="surat-jalan"
            :dataTable="dataTable"
            :dataColumn="datacolumn"
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasPagination="true"
            :hasLinked="['manifest_do_number']"
            :customAction="true"
            :customActionList="customActionList"
            @actionLimit="actionLimit"
            @actionPagination="actionPagination"
            @actionUpdate="actionUpdate"
            @handleEdit="handleEdit"
        />

        <div v-if="true">
            <dialogCreateSuratJalanV2
                btnBlue="Edit"
                :title="`Edit Transport ${listenBreadcrumbTitle}`"
                :breadcrumb="`${listenBreadcrumbTitle}`"
                :active="dialogSuratJalan"
                :closeDialog="closeDialogSuratJalan"
                :dataItem="dataItem"
                :sj_type="listenBreadcrumbCode"
                @refresh="refresh"
            />
        </div>
        <div v-else>
            <dialogCreateSuratJalan
                btnBlue="Edit"
                :title="`Edit Transport ${listenBreadcrumbTitle}`"
                :breadcrumb="`${listenBreadcrumbTitle}`"
                :active="dialogSuratJalan"
                :closeDialog="closeDialogSuratJalan"
                :dataItem="dataItem"
                :sj_type="listenBreadcrumbCode"
                @refresh="refresh"
            />
        </div>

        <dialog-confirm
            title="Cancel Surat Jalan"
            :message="`Are you sure you want to cancel this surat jalan with number ${this.id}?`"
            :active="activeDialogConfirmCancel"
            :loading="loadingConfirmCancel"
            :closeDialog="closeDialogConfirmCancel"
            @confirm="confirmCancel"
            @cancel="closeDialogConfirmCancel"
        />
    </div>
</template>

<script>
import master from '@/mixins/master'
import axios from 'axios'

import DialogConfirm from '@/components/dialog/dialogConfirm'
import TableMaster from '@/components/table/tableMaster'

import DialogCreateSuratJalan from '@/views/transport/suratJalanNew/dialogCreateSuratJalan'
import DialogCreateSuratJalanV2 from '@/views/transport/suratJalanNew/dialogCreateSuratJalanV2'

export default {
    name: 'transport-surat-jalan-table-new',
    mixins: [master],
    props: {
        dateFilter: Array,
        filterDateBy: String,
        query: String,
        searchBy: String,
        status: [Array, String],
        title: String,
        sj_type: String,
    },
    components: {
        'table-master': TableMaster,
        'dialog-confirm': DialogConfirm,

        dialogCreateSuratJalan: DialogCreateSuratJalan,
        dialogCreateSuratJalanV2: DialogCreateSuratJalanV2,
    },
    data() {
        return {
            form: {},
            dataTable: [],
            dialogSuratJalan: false,
            datacolumn: [],
            customActionList: [
                {
                    label: 'Print',
                    key: 'print',
                    attribute: '',
                },
                {
                    label: 'Depart',
                    key: 'depart',
                    attribute: '',
                },
                {
                    label: 'Cancel',
                    key: 'cancel',
                    attribute: 'danger',
                },
            ],

            loading: false,
            dataItem: {},
            tempSearch: '',
            tempDate: [],
            startDate: '',
            endDate: '',
            dialogTariff: false,
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1,
            },
            activeDialogCancel: false,
            activeLoadingCancel: false,
            pickupData: {},
            manifest_do_number: '',
            id: '',
            activeDialogConfirmCancel: false,
            loadingConfirmCancel: false,
        }
    },
    computed: {
        listenBreadcrumbTitle() {
            return this.title
        },
        listenBreadcrumbCode() {
            return this.sj_type
        },
    },
    watch: {
        listenBreadcrumbTitle: {
            handler(val, oldVal) {
                if (val !== oldVal && val !== undefined) {
                    this.setDatacolumn()
                }
            },
            immediate: true,
        },
        query: function (val, old) {
            if (val !== undefined) {
                this.tempSearch = val
                if (this.tempSearch !== old) {
                    this.pagination.page = 1
                    this.getTableData(
                        this.pagination.limit,
                        this.pagination.page,
                        val,
                        this.startDate,
                        this.endDate,
                        this.filterDateBy,
                        this.sj_type
                    )
                }
            }
        },
        filterDateBy: function (val, old) {
            if (val !== undefined) {
                if (val !== old) {
                    this.getTableData(
                        this.pagination.limit,
                        this.pagination.page,
                        this.tempSearch,
                        this.startDate,
                        this.endDate,
                        val,
                        this.sj_type
                    )
                }
            }
        },
        dateFilter: function (val, old) {
            if (val !== undefined) {
                this.tempDate = val
                if (this.tempDate !== old) {
                    this.startDate = this.tempDate !== null ? this.tempDate[0] : ''
                    this.endDate = this.tempDate !== null ? this.tempDate[1] : ''
                }
                this.getTableData(
                    this.pagination.limit,
                    this.pagination.page,
                    this.tempSearch,
                    this.startDate,
                    this.endDate,
                    this.filterDateBy,
                    this.sj_type
                )
            }
        },
        sj_type: function (val, old) {
            if (val !== undefined) {
                if (val !== old) {
                    this.getTableData(
                        this.pagination.limit,
                        this.pagination.page,
                        this.tempSearch,
                        this.startDate,
                        this.endDate,
                        this.filterDateBy,
                        val
                    )
                }
            }
        },
    },
    methods: {
        setDatacolumn() {
            this.datacolumn = [
                {
                    label: `No ${this.listenBreadcrumbCode}`,
                    key: 'manifest_do_number',
                    width: 'xxxs',
                },
                {
                    label: 'Status',
                    key: 'status_with_tooltip',
                    width: 'xxs',
                },
                {
                    label: 'Received',
                    key: 'total_received',
                    width: 'xxxs',
                },
                {
                    label: 'Outstanding',
                    key: 'total_outstanding',
                    width: 'xxxs',
                },
                // {
                //     label: 'Total Bag',
                //     key: 'total_item',
                //     width: 'xxxs',
                // },
                {
                    label: 'Orion Number',
                    key: 'orion_number',
                    width: 'xxxs',
                },
                ...(this.listenBreadcrumbCode === 'DO'
                    ? [
                          {
                              label: `No RDO`,
                              key: 'rdo',
                              width: 'xxxs',
                          },
                      ]
                    : []),
                {
                    label: 'Document Type',
                    key: 'document_type',
                    width: 'xxxs',
                },
                {
                    label: 'Created',
                    key: 'created_at',
                    width: 'auto',
                },
                {
                    label: 'Created By',
                    key: 'created_by_user',
                    width: 'auto',
                },
                {
                    label: 'Vehicle',
                    key: 'formatted_vehicle',
                    width: 'xxs',
                },
                {
                    label: 'Driver',
                    key: 'driver_name',
                    width: 'xxxs',
                },
                {
                    label: 'Mode',
                    key: 'vehicle_mode_name',
                    width: 'auto',
                },
                {
                    label: 'Origin',
                    key: 'node_id_origin_name',
                    width: 'xxs',
                },
                {
                    label: 'Destination',
                    key: 'node_id_destination_name',
                    width: 'xxs',
                },
                // {
                //   label: "Fix Cost Weight",
                //   key: "fix_cost_weight",
                //   width: "auto",
                // },
                // {
                //   label: "Live Cost Weight",
                //   key: "live_cost_weight",
                //   width: "auto",
                // },
                // {
                //   label: "Fix Actual Weight",
                //   key: "fix_actual_weight",
                //   width: "auto",
                // },
                // {
                //   label: "Live Actual Weight",
                //   key: "live_actual_weight",
                //   width: "auto",
                // },
                {
                    label: 'ETD',
                    key: 'etd',
                    width: 'xxxs',
                },
                {
                    label: 'ETA',
                    key: 'eta',
                    width: 'xxxs',
                },
                {
                    label: 'Handover to Transport',
                    key: 'departed_time',
                    width: 'xxxs',
                },
                {
                    label: 'Approved',
                    key: 'approved',
                    type: 'status',
                    width: 'xxxxs',
                },
                {
                    label: 'Latest Node',
                    key: 'latest_node_code_receiver',
                    width: 'xxxxs',
                },
                {
                    label: 'Total Master Bag',
                    key: 'total_masterbag',
                    width: 'xxxs',
                },
                {
                    label: 'Total Bag',
                    key: 'total_bag',
                    width: 'xxxs',
                },
                {
                    label: 'Total Connote',
                    key: 'total_connote',
                    width: 'xxxs',
                },
            ]
        },

        async getTableData(limit, page, q, from, to, qDate, sj_type) {
            this.loading = true
            let query = ''
            let startDate = ''
            let endDate = ''
            let queryDate = ''
            let sjType = ''

            if (q !== undefined) {
                query = q
                if (q.includes('/')) {
                    query = query.replaceAll('/', '-')
                }
            }
            if (from !== undefined && to !== undefined) {
                startDate = from
                endDate = to
            }
            if (qDate !== undefined) {
                queryDate = qDate
            }

            if (sj_type !== undefined) {
                sjType = sj_type
            }

            startDate = this.formatToWIB(startDate)
            endDate = this.formatToWIB(endDate)

            await axios
                .get(
                    this.URL.revamp_surat_jalan_v3 +
                        `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${queryDate}&status=${this.status}&sj_type=${sjType}`,
                    this.Helper.header()
                )
                .then((res) => {
                    let arr = res.data.data
                    let buttonStatus = {
                        print: true,
                        depart: true,
                        cancel: true,
                    }

                    arr.map((item) => {
                        item['pickup_courier_employee_name'] = item.employee_courier
                            ? item.employee_courier.employee_name
                            : null
                        item['node_id_origin_name'] = item.origin
                            ? item.manifest_do_number?.startsWith('SJA')
                                ? `${item.origin.node_name} (AIRPORT)`
                                : `${item.origin.node_code ? item.origin.node_code : 'null'} - ${
                                      item.origin.node_name
                                  }`
                            : null
                        item['node_id_destination_name'] = item.destination
                            ? `${
                                  item.destination.node_code ? item.destination.node_code : 'null'
                              } - ${item.destination.node_name}`
                            : item.facility_code_destination
                        item['driver_id'] = item.pic_employee_id
                            ? parseInt(item.pic_employee_id)
                            : null
                        item['driver_name'] = item.pic ? item.pic.employee_name : null
                        item['orion_number'] = item.mts || item.do || item.hbag || ''
                        item['document_type'] = this.getOrionDocumentType(item['orion_number'])
                        item['approved'] = item.is_approve === 1 ? true : false

                        item['total_masterbag'] =
                            item.total_masterbag === 0 ? '0' : item.total_masterbag
                        item['total_bag'] = item.total_bag === 0 ? '0' : item.total_bag
                        item['total_connote'] = item.total_connote === 0 ? '0' : item.total_connote
                        item['total_received'] =
                            item.total_received === 0 ? '0' : item.total_received
                        item['total_outstanding'] =
                            item.total_outstanding === 0 ? '0' : item.total_outstanding

                        item['created_at'] = this.formatTimezone(item['created_at'])
                        item['etd'] = this.formatTimezone(item['etd'])
                        item['eta'] = this.formatTimezone(item['eta'])
                        item['departed_time'] = this.formatTimezone(item['departed_time'])

                        if (
                            (item.manifest_do_number?.startsWith('SJA') ||
                                item.manifest_do_number?.startsWith('BM')) &&
                            item['driver_name'] === null &&
                            item['vehicle_mode_name'] === null
                        ) {
                            item['orion_number'] = 'Auto By System'
                            item['vehicle_type_name'] = 'Auto By System'
                            item['driver_name'] = 'Auto By System'
                            item['vehicle_mode_name'] = 'Auto By System'
                        }

                        item['status_with_tooltip'] =
                            item.is_transit === 1
                                ? `${item.status} <span class="status-tooltip" title="Terdapat Bag masih dalam proses transit."><i class="bx bxs-truck" style="font-size: 0.8rem; vertical-align: middle; border: 1px solid; border-radius: 50%; padding: 3px;"></i></span>`
                                : item.status

                        if (item?.status != null) {
                            const str = item.status.toLowerCase()

                            let buttonStatus = {
                                print: false,
                                depart: false,
                                cancel: false,
                            }

                            if (str.includes('receive')) {
                                buttonStatus.print = true
                            }

                            if (str.includes('approved')) {
                                buttonStatus.cancel = true
                                buttonStatus.depart = item.is_approve === 1
                            }

                            if (item.auto_depart === '1' && item.is_approve === 1) {
                                buttonStatus.depart = false
                            }

                            item.button_status = buttonStatus
                        }

                        if (item.is_orion === '1') {
                            item.button_status = {
                                print: true,
                                depart: false,
                                cancel: false,
                            }
                        }
                    })

                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if (res.data.data.length > 0) {
                    } else {
                        // this.openNotification('warn', null, 'Surat Jalan data is empty!', ' Please create a new Surat Jalan data')
                    }

                    this.loading = false
                })
                .catch((err) => {
                    this.loading = false
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'Failed to populate Surat Jalan data',
                        err
                    )
                })
        },

        closeDialogConfirm() {
            this.confirmDialog = false
            this.refresh()
        },

        actionUpdate(val, key) {
            switch (key) {
                case 'print':
                    this.manifest_do_number = val.manifest_do_number
                    this.print(this.listenBreadcrumbCode)
                    break
                case 'depart':
                    this.manifest_do_number = val.manifest_do_number
                    this.depart()
                    break
                case 'cancel':
                    this.manifest_do_number = val.manifest_do_number
                    this.id = val.manifest_do_number
                    this.activeDialogConfirmCancel = true
                    break
                default:
            }
        },
        handleEdit(val) {
            if (this.dataTable.length > 0) {
                this.dataItem = val
                this.dataItem['destination_id'] = val.node_id_destination
                    ? val.node_id_destination
                    : ''
                this.dataItem['moda_angkutan_id'] = val.vehicle_mode_id
                    ? parseInt(val.vehicle_mode_id)
                    : ''
                this.dataItem['no_moda_angkutan_id'] = val.vehicle_id
                    ? parseInt(val.vehicle_id)
                    : ''
                this.dataItem['manifest_do_item'] = val.detail ? val.detail : ''
                this.dataItem['driver_id'] = val.pic_employee_id
                    ? parseInt(val.pic_employee_id)
                    : ''
                this.dataItem['max_weight'] = val.max_weight
                this.dataItem['driver_id'] = val.driver_id ? parseInt(val.driver_id) : ''
                this.dataItem['vehicle_type_id'] = val.vehicle_type_id
                    ? parseInt(val.vehicle_type_id)
                    : ''
                this.$nextTick(() => {
                    this.dialogSuratJalan = true
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
        refresh() {
            this.getTableData(
                this.pagination.limit,
                this.pagination.page,
                this.tempSearch,
                this.startDate,
                this.endDate,
                this.filterDateBy,
                this.sj_type
            )
        },
        print() {
            let routeData = this.$router.resolve({
                name: 'printGeneralDo',
                params: {
                    id: this.manifest_do_number,
                    type: 'manifest-delivery-order',
                    node_id: this.listenNodeId,
                    sj_type: this.listenBreadcrumbCode,
                },
            })

            const printWindow = window.open(routeData.href, '_blank', 'noopener')

            if (printWindow) {
                printWindow.onload = function () {
                    printWindow.print()
                    printWindow.onafterprint = () => printWindow.close()
                }
            }
        },
        async depart() {
            this.loading = true

            try {
                const res = await axios.patch(
                    `${this.URL.revamp_surat_jalan_v3}/${this.manifest_do_number}/depart?n=${this.listenNodeId}&is_departed=1`,
                    {},
                    this.Helper.header()
                )
                this.print(this.listenBreadcrumbCode)
                this.openNotification('success', null, 'Success', 'Update surat jalan success')
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Update surat jalan failed',
                    err?.response?.data?.message ?? 'something went wrong'
                )
            } finally {
                this.loading = false
                this.refresh()
            }
        },
        closeDialogSuratJalan() {
            this.dialogSuratJalan = false
            this.refresh()
        },
        confirmCancel() {
            this.loadingConfirmCancel = true
            this.cancel()
        },
        async cancel() {
            try {
                const res = await axios.delete(
                    `${this.URL.revamp_surat_jalan_v3}/${this.manifest_do_number}?n=${this.listenNodeId}`,
                    this.Helper.header()
                )
                this.openNotification('success', null, 'Success', 'Cancel surat jalan success')
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
            } finally {
                this.closeDialogConfirmCancel()
                this.refresh()
            }
        },
        closeDialogConfirmCancel() {
            this.activeDialogConfirmCancel = false
            this.loadingConfirmCancel = false
        },
    },
    mounted() {
        this.refresh()
        window.addEventListener('timezone-changed', this.refresh)
    },
    beforeDestroy() {
        window.removeEventListener('timezone-changed', this.refresh)
    },
}
</script>

<style scoped>
.status-tooltip {
    margin-left: 5px;
    font-weight: bold;
    color: #666;
    cursor: help;
}
</style>

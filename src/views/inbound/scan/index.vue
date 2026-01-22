<template>
    <div>
        <vs-row justify="space-between" align="center" class="section-padding">
            <div class="titlePage">
                <breadcrumb />
                <h2 v-copy="title">{{ title }}</h2>
            </div>

            <core-button
                v-if="is_sm && !is_user_check"
                name="close-sm"
                :square="true"
                :customStyle="{ width: 'auto' }"
                @click="closePreAlert"
            >
                Close SM
            </core-button>
        </vs-row>

        <section>
            <vs-row justify="space-between" align="stretch" class="section-padding">
                <vs-col xs="12" sm="6" lg="6">
                    <InboundScan
                        ref="inboundScan"
                        :boxed="true"
                        :inbound_number="inbound_number"
                        :loading="loadingDataTable || processing"
                        @submit="handleScanSubmit"
                        @removeInboundNumber="removeInboundNumber"
                    />
                </vs-col>

                <vs-col xs="12" sm="6" lg="6">
                    <InboundInformation
                        ref="inboundInformation"
                        title="Receiving Information"
                        :boxed="true"
                        :dataTableProp="dataTable"
                        :loading="loadingDataTable || processing"
                    />
                </vs-col>
            </vs-row>

            <vs-row justify="space-between" class="section-padding">
                <vs-col xs="12" sm="6" lg="6">
                    <InboundDetail
                        ref="inboundDetail"
                        title="List of Items"
                        :boxed="true"
                        :dataTable="dataTableProp"
                        :loading="loadingDataTable || processing"
                        :pageSize="pagination.page_size"
                        :page="pagination.page"
                        :limit="pagination.limit"
                        :actionLimit="actionLimit"
                        :actionPagination="actionPagination"
                        :receivingLogs="receivingLogs"
                        :inboundNumber="inbound_number"
                        @autoFocusInput="autoFocusInput"
                        @refresh="refresh"
                    />
                </vs-col>

                <vs-col xs="12" sm="6" lg="6">
                    <MisrouteBag
                        ref="misrouteBag"
                        title="Misrouted Bag"
                        :boxed="true"
                        @autoFocusInput="autoFocusInput"
                    />
                </vs-col>
            </vs-row>
        </section>

        <vs-row justify="flex-end">
            <vs-col w="1">
                <core-button icon="bx bxs-chevron-left" :square="true" name="back" @click="back">
                    BACK
                </core-button>
            </vs-col>
        </vs-row>
    </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'

import Button from '@/components/button'
import Breadcrumb from '@/components/breadcrumb/index'

import InboundScan from '@/views/inbound/scan/inboundScan'
import InboundInformation from '@/views/inbound/scan/inboundInformation'
import InboundDetail from '@/views/inbound/scan/inboundDetail'
import MisrouteBag from '@/views/inbound/scan/misrouteBag'

export default {
    name: 'inbound',
    mixins: [master],
    components: {
        breadcrumb: Breadcrumb,
        InboundScan: InboundScan,
        InboundInformation: InboundInformation,
        InboundDetail: InboundDetail,
        MisrouteBag: MisrouteBag,
        'core-button': Button,
    },
    computed: {
        is_prealert() {
            return !!this.$route.params.inbound_number
        },
    },

    watch: {
        async is_prealert() {
            await this.refresh()
        },
    },
    data() {
        return {
            title: 'Receiving',

            form: {},

            inbound_number: '',

            loading: false,
            loadingDataTable: false,

            dataTable: [],
            dataTableProp: [],
            dataTableReceivingLog: [],
            receivingLogs: [],

            pagination: {
                limit: 20,
                page_size: 1,
                page: 1,
            },
            receivingLogs: [],
            inboundNumber: '',
            documentType: '',
            processing: false,
            isSubmitting: false,

            is_sm: false,
            is_user_check: false,
        }
    },
    methods: {
        /* ======================================================
         * INIT
         * ====================================================== */

        async init() {
            await this.loadInboundFromStorage()
            await this.getParamRoute()
        },

        async getParamRoute() {
            if (this.is_prealert) {
                this.inbound_number = this.$route.params.inbound_number.toString()
                await this.refresh()
            } else {
                this.$refs.misrouteBag?.refresh()
                this.autoFocusInput()
            }
        },

        /* ======================================================
         * LOCAL STORAGE
         * ====================================================== */

        async loadInboundFromStorage() {
            const storedData = localStorage.getItem('inboundScanData')
            if (storedData) {
                const inboundData = JSON.parse(storedData)
                this.inbound_number = inboundData.inbound_number

                await this.getTableData()
            }
        },

        saveInboundToStorage() {
            const inboundData = {
                inbound_number: this.inbound_number,
            }
            localStorage.setItem('inboundScanData', JSON.stringify(inboundData))
        },

        clearInboundFromStorage() {
            localStorage.removeItem('inboundScanData')
        },

        /* ======================================================
         * SCAN SUBMIT
         * ====================================================== */
        async handleScanSubmit({ type, value }) {
            switch (type) {
                case 'parent_no':
                    await this.submitParent(value)
                    break

                case 'child_no':
                    await this.submitChild(value)
                    break
            }
        },

        async submitParent(value) {
            this.inbound_number = value
            this.saveInboundToStorage()
            await this.refresh()
        },

        async submitChild(value) {
            this.form = this.inbound_number
                ? { item_no: value, inbound_number: this.inbound_number }
                : { item_no: value }

            await this.processInbound()
        },

        /* ======================================================
         * PROCESS INBOUND
         * ====================================================== */

        async processInbound() {
            this.processing = true

            try {
                const res = await axios.post(
                    `${this.URL.receiving}?n=${this.listenNodeId}`,
                    this.form,
                    this.Helper.header()
                )

                this.openNotification(
                    'success',
                    null,
                    'Success',
                    res?.data?.message ?? 'Receiving success'
                )

                this.inbound_number = res?.data?.data?.inbound_number ?? this.inbound_number
            } catch (err) {
                await this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )

                this.inbound_number = err?.response?.data?.reference ?? this.inbound_number

                if (!this.is_prealert && !this.inbound_number) {
                    this.handleClearTableInfo()
                }
            } finally {
                await this.refresh()
                this.processing = false
            }
        },

        /* ======================================================
         * GET DATA
         * ====================================================== */

        async refresh() {
            await this.getTableData()
            this.$refs.misrouteBag?.refresh()
            this.autoFocusInput()
        },

        async getTableData() {
            if (!this.inbound_number) return

            this.loadingDataTable = true

            try {
                const res = await axios.get(
                    `${this.URL.inbound}/${this.inbound_number}/inbound-status?n=${this.listenNodeId}&page=${this.pagination.page}&limit=${this.pagination.limit}`,
                    this.Helper.header()
                )

                const { data, detail } = res.data

                this.is_sm = data.inbound_type === 'SM'
                this.is_user_check = this.is_sm && data.is_user_check === '1'

                this.inbound_number = ['RECEIVING CONNOTE', 'RECEIVING BAG'].includes(
                    data.inbound_type
                )
                    ? ''
                    : this.inbound_number || ''

                this.dataTable = ['RECEIVING CONNOTE', 'RECEIVING BAG'].includes(data.inbound_type)
                    ? []
                    : [
                          {
                              ...data,
                              total_received: data.total_received?.toString(),
                              total_unreceived: data.total_unreceived?.toString(),
                              is_missroute: data.is_missroute ? 1 : 0,
                          },
                      ]

                this.dataTableProp = res.data.detail.map((item) => {
                    item.item_type = item.is_masterbag === '1' ? 'MASTERBAG' : item.item_type
                    item.is_missroute = item.is_missroute === true ? 1 : 0
                    item.total_connote = item.total_connote?.toString()
                    item, (item['button_status'] = { entry_status: item.is_received == '0' })

                    if (item.item_type === 'MASTERBAG') {
                        item.children = {
                            'Bag Number': item.masterbag_childs?.map((el) => el?.bag_number) || [],
                        }
                    } else if (item.item_type === 'BAG') {
                        item.children = {
                            'Connote Number':
                                item.bag_childs?.map((el) => el?.connote_number) || [],
                        }
                    }

                    return item
                })

                this.receivingLogs = data.receiving_log

                this.pagination = {
                    page: res.data.meta.current_page,
                    limit: parseInt(res.data.meta.per_page),
                    page_size: res.data.meta.last_page,
                }

                this.getTableDataReceivingLog()
            } catch (err) {
                await this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )

                if (!this.is_prealert) {
                    this.removeInboundNumber()
                }
            } finally {
                this.loadingDataTable = false
            }
        },

        async getTableDataReceivingLog() {
            this.loading = true
            try {
                let search_by = ''
                let s = ''

                if (this.inbound_number) {
                    search_by = 'inbound_number'
                    s = this.inbound_number
                } else if (this.child_no) {
                    search_by = 'item_number'
                    s = this.child_no
                }

                const res = await axios.get(
                    `${this.URL.receiving_log}?n=${this.listenNodeId}&page=${this.pagination.page}&limit=${this.pagination.limit}&search_by=${search_by}&s=${s}&pov=receiver`,
                    this.Helper.header()
                )
                this.dataTableReceivingLog = res.data.data
                this.dataTableReceivingLog.forEach((item) => {
                    item.button_status = {
                        edit: item.status == null || item.status == undefined || item.status == '',
                    }
                })
            } catch (err) {
                this.dataTableReceivingLog = []
                // this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false
            }
        },

        /* ======================================================
         * CLEAR DATA
         * ====================================================== */

        handleClearTableInfo() {
            this.dataTable = []
            this.dataTableProp = []
            this.inbound_number = ''
        },

        removeInboundNumber() {
            this.is_sm = false
            this.is_user_check = false
            this.inbound_number = ''

            this.dataTable = []
            this.dataTableProp = []
            this.dataTableReceivingLog = []

            this.clearInboundFromStorage()

            if (this.is_prealert) this.$router.push('/inbound/prealert/scan')

            this.autoFocusInput()
        },

        /* ======================================================
         * PAGINATION
         * ====================================================== */
        async actionLimit(val) {
            this.pagination.limit = val
            this.pagination.page = 1
            await this.refresh()
        },

        async actionPagination(val) {
            this.pagination.page = val
            await this.refresh()
        },

        /* ======================================================
         * BUTTON
         * ====================================================== */
        async closePreAlert() {
            this.loading = true
            try {
                const res = await axios.post(
                    `${this.URL.close_pre_alert_sm}/${this.inbound_number}?n=${this.listenNodeId}`,
                    {},
                    this.Helper.header()
                )

                this.openNotification('success', null, 'Success', 'Succes Close SM')
            } catch (err) {
                await this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
            } finally {
                this.loading = false
                this.refresh()
            }
        },

        back() {
            this.$router.back()
            this.setRoutePageHistory(this.$route.meta, false)
        },

        /* ======================================================
         * AUTO FOCUS INPUT
         * ====================================================== */
        autoFocusInput() {
            this.$refs.inboundScan?.autoFocusInput()
        },
    },
    async mounted() {
        await this.init()
    },
}
</script>

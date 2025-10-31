<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="6" lg="6">
                <div class="titlePage">
                    <breadcrumb />
                    <h2 v-copy="title">{{ title }}</h2>
                </div>
            </vs-col>
            <template v-if="is_sm && !listenIsGateway && !is_user_check">
                <vs-col xs="6" sm="3" lg="3">
                    <div style="position: relative; display: flex; justify-content: flex-end">
                        <div style="width: 100px; padding-right: 5px">
                            <vs-button
                                flat
                                square
                                block
                                :active="true"
                                :data-testid="`close-sm-button`"
                                @click="closePreAlert"
                            >
                                Close SM
                            </vs-button>
                        </div>
                    </div>
                </vs-col>
            </template>
        </vs-row>

        <section>
            <vs-row justify="space-between" align="stretch" style="padding: 1em 0">
                <vs-col xs="12" sm="6" lg="6">
                    <div class="box-v1" style="gap: 1em">
                        <template v-if="is_prealert">
                            <h4 align="left">List of Bags</h4>
                            <vs-row style="margin-top: 2em">
                                <vs-col xs="12" sm="12" lg="12">
                                    <vs-input
                                        border
                                        type="text"
                                        v-model="item_no"
                                        label-placeholder="Masukkan code Bag / Connote"
                                        icon-after
                                        v-uppercase
                                        ref="formInputInbound"
                                        :disabled="processing || dialogActive"
                                        :data-testid="`input-item_no`"
                                        @keyup.enter.native="updateValue('item_no')"
                                        @click-icon="$refs.cameraScanner.open('formInputInbound')"
                                        @input="sanitizeAlphanumeric('item_no')"
                                        @keydown.native="
                                            handleTabNavigation($event, 'formInputInbound', [
                                                'formInputInbound',
                                            ])
                                        "
                                    >
                                        <template #icon>
                                            <i class="bx bx-barcode-reader"></i>
                                        </template>
                                    </vs-input>
                                </vs-col>
                            </vs-row>
                        </template>

                        <template v-else>
                            <h4 align="left">Scan Item</h4>
                            <vs-row style="gap: 2em">
                                <vs-col xs="12" sm="12" lg="12">
                                    <vs-input
                                        border
                                        type="text"
                                        v-model="parent_no"
                                        label-placeholder="Masukkan SM / SJ / Pickup"
                                        icon-after
                                        v-uppercase
                                        ref="formInputParentInbound"
                                        :disabled="hasInboundNumber"
                                        :data-testid="`input-parent_no`"
                                        @keyup.enter.native="updateValue('parent_no')"
                                        @click-icon="
                                            $refs.cameraScanner.open('formInputParentInbound')
                                        "
                                        @input="sanitizeAlphanumeric('parent_no')"
                                        @keydown.native="
                                            handleTabNavigation($event, 'formInputParentInbound', [
                                                'formInputParentInbound',
                                                'formInputChildInbound',
                                            ])
                                        "
                                    >
                                        <template #icon v-if="!hasInboundNumber">
                                            <i class="bx bx-barcode-reader"></i>
                                        </template>
                                    </vs-input>
                                    <template v-if="hasInboundNumber">
                                        <div style="position: absolute; right: 20px; top: 15px">
                                            <span
                                                class="vs-select__chips__chip__close"
                                                :data-testid="`close-button-parent_no`"
                                                @click="removeInboundNumber"
                                            >
                                                <i class="vs-icon-close vs-icon-hover-less"></i>
                                            </span>
                                        </div>
                                    </template>
                                </vs-col>
                                <vs-col xs="12" sm="12" lg="12">
                                    <vs-input
                                        border
                                        type="text"
                                        v-model="child_no"
                                        label-placeholder="Masukkan Masterbag / Bag / Connote"
                                        icon-after
                                        v-uppercase
                                        ref="formInputChildInbound"
                                        :disabled="processing || dialogActive"
                                        :data-testid="`input-child_no`"
                                        @keyup.enter.native="updateValue('child_no')"
                                        @click-icon="
                                            $refs.cameraScanner.open('formInputChildInbound')
                                        "
                                        @input="sanitizeAlphanumeric('child_no')"
                                        @keydown.native="
                                            handleTabNavigation($event, 'formInputChildInbound', [
                                                'formInputParentInbound',
                                                'formInputChildInbound',
                                            ])
                                        "
                                    >
                                        <template #icon>
                                            <i class="bx bx-barcode-reader"></i>
                                        </template>
                                    </vs-input>
                                </vs-col>
                            </vs-row>
                        </template>
                    </div>
                </vs-col>

                <vs-col xs="12" sm="6" lg="6">
                    <div class="box-v1">
                        <h4 align="left">Receiving Information</h4>
                        <div class="nav-box">
                            <transition name="slide-fade">
                                <InboundInformation
                                    :ref="'inboundInformation'"
                                    :dataTableProp="dataTable"
                                    :loading="loading"
                                />
                            </transition>
                        </div>
                    </div>
                </vs-col>
            </vs-row>

            <vs-row justify="space-between" align="stretch" style="padding: 1em 0">
                <vs-col xs="12" sm="6" lg="6">
                    <div class="box-v1">
                        <div class="header-remark-bar">
                            <h4 align="left">Receiving Detail</h4>
                            <template v-if="dataTableProp.length > 0">
                                <vs-button
                                    :data-testid="`remark-button`"
                                    @click="openDialog('receiving_log')"
                                >
                                    <i class="bx bx-pencil mr-1"></i> Insert Remark
                                </vs-button>
                                <dialog-insert-remark
                                    :actived="showDialog"
                                    :loading="false"
                                    :closeDialog="() => closeDialog('receiving_log')"
                                    :inbound_number="inbound_number"
                                />
                            </template>
                        </div>
                        <div class="nav-box">
                            <transition name="slide-fade">
                                <InboundDetail
                                    ref="inboundDetail"
                                    :dataTableProp="dataTableProp"
                                    :loading="loading"
                                    :pageSize="page_size"
                                    :page="page"
                                    :limit="limit"
                                    :actionLimit="actionLimit"
                                    :actionPagination="actionPagination"
                                    :receivingLogs="receivingLogs"
                                    :inboundNumber="inboundNumber"
                                    @autoFocusInput="autoFocusInput"
                                    @refresh="refresh"
                                />
                            </transition>
                        </div>
                    </div>
                </vs-col>
                <vs-col xs="12" sm="6" lg="6">
                    <div class="box-v1">
                        <div class="header-remark-bar">
                            <h4 align="left">Misrouted Bag</h4>
                            <template v-if="$refs.misrouteBag?.dataTable.length > 0">
                                <div style="display: flex">
                                    <vs-button
                                        :data-testid="`remark-button`"
                                        @click="openDialog('surat_jalan')"
                                    >
                                        <i class="bx bx-plus"></i> Surat Jalan
                                    </vs-button>
                                    <vs-button
                                        :data-testid="`remark-button`"
                                        @click="openDialog('surat_muatan')"
                                    >
                                        <i class="bx bx-plus"></i> Surat Muatan
                                    </vs-button>
                                </div>
                                <dialog-bulk-surat-jalan
                                    title="Create Surat Jalan"
                                    :active="dialogSuratJalan"
                                    :dataItem="selectedData"
                                    @closeDialog="() => closeDialog('surat_jalan')"
                                />
                            </template>
                        </div>
                        <div class="nav-box">
                            <transition name="slide-fade">
                                <MisrouteBag ref="misrouteBag" @autoFocusInput="autoFocusInput" />
                            </transition>
                        </div>
                    </div>
                </vs-col>
            </vs-row>
            <vs-button
                style="float: right; margin-top: 1em"
                square
                active
                :data-testid="`back-button`"
                @click="back"
            >
                <i class="bx bxs-chevron-left"> </i> BACK
            </vs-button>
        </section>

        <camera-scanner
            ref="cameraScanner"
            :data-testid="`camera-button`"
            @data="onCameraScannerGetData"
        />
    </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'
import NavItem from '@/components/navbar/navTab'
import Breadcrumb from '@/components/breadcrumb/index'

import InboundInformation from '@/views/inbound/scan/inboundInformation'
import InboundDetail from '@/views/inbound/scan/inboundDetail'
import MisrouteBag from '@/views/inbound/scan/misrouteBag'
import InboundReceivingLog from '@/views/inbound/scan/inboundReceivingLog'
import CameraScanner from '@/components/scanner/camera.vue'
import dialogInsertRemark from '@/views/inbound/scan/dialogInsertRemark.vue'
import DialogBulkSuratJalan from '@/views/inbound/scan/dialogBulkSuratJalan.vue'

export default {
    name: 'inbound-scan',
    mixins: [master],
    components: {
        'nav-item': NavItem,
        breadcrumb: Breadcrumb,
        InboundInformation: InboundInformation,
        InboundDetail: InboundDetail,
        ReceivingLog: InboundReceivingLog,
        MisrouteBag: MisrouteBag,
        CameraScanner,
        dialogInsertRemark,
        'dialog-bulk-surat-jalan': DialogBulkSuratJalan,
    },
    computed: {
        is_prealert() {
            const pattern = /\/scan\/[\w-]+$/
            return pattern.test(this.$route.fullPath)
        },
    },
    watch: {
        is_prealert(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.refresh()
            }
        },
        processLoading: function (val) {
            if (val !== undefined) {
                this.processLoading = val
                if (val == true) {
                    this.loadingHandler()
                } else {
                    this.closeLoading()
                }
            }
        },
    },
    data() {
        return {
            title: 'Receiving',
            item_no: '',
            form: {},
            inbound_number: '',
            loading: false,
            dataTable: [],
            dataTableProp: [],
            dataTableReceivingLog: [],
            limit: 20,
            page_size: 1,
            page: 1,
            parent_no: '',
            child_no: '',
            hasInboundNumber: false,
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1,
            },
            receivingLogs: [],
            inboundNumber: '',
            processing: false,
            showDialog: false,
            is_missroute: false,
            is_plain: false,
            is_sm: false,
            is_user_check: false,
            processLoading: false,
            refloading: null,

            dialogActive: false,

            dialogSuratJalan: false,
            selectedData: [],
        }
    },
    methods: {
        saveInboundToStorage() {
            const inboundData = {
                parent_no: this.parent_no,
                inbound_number: this.inbound_number,
                hasInboundNumber: this.hasInboundNumber,
            }
            localStorage.setItem('inboundScanData', JSON.stringify(inboundData))
        },

        loadingHandler() {
            if (this.is_prealert) {
                this.refloading = this.$vs.loading({
                    target: this.$refs.formInputInbound.$el,
                    type: 'scale',
                    text: 'Loading...',
                    background: '#EAEAEA',
                    color: '#3b86ff',
                })
            } else {
                this.refloading = this.$vs.loading({
                    target: this.$refs.formInputChildInbound.$el,
                    type: 'scale',
                    text: 'Loading...',
                    background: '#EAEAEA',
                    color: '#3b86ff',
                })
            }
        },

        closeLoading() {
            if (this.refloading) {
                this.refloading.close()
                this.refloading = null
            }
        },

        async loadInboundFromStorage() {
            const storedData = localStorage.getItem('inboundScanData')
            if (storedData) {
                const inboundData = JSON.parse(storedData)
                this.parent_no = inboundData.parent_no
                this.inbound_number = inboundData.inbound_number
                this.hasInboundNumber = inboundData.hasInboundNumber

                if (this.inbound_number) {
                    await this.getTableData()
                }
            }
        },

        clearInboundFromStorage() {
            localStorage.removeItem('inboundScanData')
        },
        refresh() {
            this.getTableData()
            this.$refs.misrouteBag.refresh()
        },
        updateValue(type) {
            switch (type) {
                case 'item_no':
                    if (!this.item_no || this.item_no.trim() === '') {
                        return
                    }

                    this.item_no = this.item_no.replaceAll(/\s+/g, '')
                    this.form = {
                        item_no: this.item_no,
                        inbound_number: this.inbound_number,
                    }
                    this.processInbond()
                    this.setActiveInput('formInputInbound', null, () => this.dialogActive)

                    break

                case 'parent_no':
                    if (!this.parent_no || this.parent_no.trim() === '') {
                        return
                    }

                    this.inbound_number = this.parent_no
                    this.hasInboundNumber = true
                    this.saveInboundToStorage()
                    this.refresh()
                    break

                case 'child_no':
                    if (!this.child_no || this.child_no.trim() === '') {
                        return
                    }

                    this.child_no = this.child_no.replaceAll(/\s+/g, '')
                    this.form = this.parent_no
                        ? { item_no: this.child_no, inbound_number: this.parent_no }
                        : { item_no: this.child_no }

                    this.processInbond()
                    this.setActiveInput('formInputChildInbound', null, () => this.dialogActive)

                    break
            }
        },
        getParamRoute() {
            if (this.is_prealert) {
                this.inbound_number = this.$route.params.inbound_number.toString()
                this.refresh()
            }
        },
        async processInbond() {
            this.processing = true
            this.processLoading = true

            this.openProgress(
                null,
                'Processing',
                `${this.form.item_no ? this.form.item_no : 'Item'} is in process`
            )

            try {
                const res = await axios.post(
                    `${this.URL.receiving}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form),
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
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
                this.inbound_number = err?.response?.data?.reference ?? this.inbound_number

                if (!this.is_prealert && !this.parent_no) {
                    this.handleClearTableInfo()
                }
                this.processLoading = false
                this.processing = false
            } finally {
                this.refresh()
                this.closeProgress()
                this.handlerClearForm()
                this.processLoading = false
                this.processing = false
            }
        },
        async getTableData() {
            if (this.inbound_number) {
                this.loading = true
                // check if inbound_number contain => for receiving bag (due to new bag number format)

                try {
                    const res = await axios.get(
                        `${this.URL.inbound}/${this.inbound_number}/inbound-status?n=${this.listenNodeId}&page=${this.page}&limit=${this.limit}`,
                        this.Helper.header()
                    )

                    let arr = [res.data.data]
                    this.receivingLogs = res.data.data.receiving_log
                    this.inboundNumber = res.data.data.inbound_number
                    if (
                        res.data.data.inbound_type === 'RECEIVING CONNOTE' ||
                        res.data.data.inbound_type === 'RECEIVING BAG'
                    ) {
                        this.is_plain = true
                    }

                    if (res.data.data.inbound_type === 'SM') {
                        this.is_sm = true
                        this.is_user_check = res.data.data.is_user_check === '1'
                    }

                    arr = arr.map((item) => ({
                        ...item,
                        total_received: item.total_received.toString(),
                        total_unreceived: item.total_unreceived.toString(),
                        is_missroute: item.is_missroute == true ? 1 : 0,
                    }))
                    if (!this.is_plain) {
                        this.dataTable = arr
                    } else {
                        this.dataTable = []
                    }
                    this.dataTableProp = res.data.detail
                    this.dataTableProp.forEach((item) => {
                        if (item.is_masterbag === '1') {
                            item.item_type = 'MASTERBAG'
                        }
                        item.is_missroute = item.is_missroute == true ? 1 : 0
                        item.total_connote = item.total_connote.toString()
                    })
                    this.dataTableProp.map((item) => {
                        item, (item['button_status'] = { entry_status: item.is_received == '0' })
                    })
                    this.page = res.data.meta.current_page
                    this.limit = parseInt(res.data.meta.per_page)
                    this.page_size = res.data.meta.last_page

                    if (!this.is_prealert) {
                        this.setActiveInput('formInputChildInbound', null, () => this.dialogActive)
                    }

                    this.getTableDataReceivingLog()
                } catch (err) {
                    this.openNotification(
                        'danger',
                        err?.response?.data?.code ?? '',
                        'Failed',
                        err?.response?.data?.message ?? 'Something went wrong'
                    )

                    if (!this.is_prealert) {
                        this.removeInboundNumber()
                    }
                } finally {
                    this.loading = false
                }
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
                } else if (this.item_no || this.child_no) {
                    search_by = 'item_number'
                    s = this.item_no || this.child_no
                }

                const res = await axios.get(
                    `${this.URL.receiving_log}?n=${this.listenNodeId}&page=${this.page}&limit=${this.limit}&search_by=${search_by}&s=${s}&pov=receiver`,
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
        back() {
            this.$router.back()
            this.setRoutePageHistory(this.$route.meta, false)
        },
        handlerClearForm() {
            if (this.is_prealert) {
                this.item_no = ''
                this.setActiveInput('formInputInbound', null, () => this.dialogActive)
            } else {
                this.child_no = ''
                this.setActiveInput('formInputChildInbound', null, () => this.dialogActive)
            }
        },
        handleClearTableInfo() {
            this.dataTable = []
            this.dataTableProp = []
            this.inbound_number = ''
        },
        removeInboundNumber() {
            this.is_sm = false
            this.is_user_check = false
            this.parent_no = ''
            this.inbound_number = ''
            this.hasInboundNumber = false
            this.dataTable = []
            this.dataTableProp = []
            this.dataTableReceivingLog = []

            this.clearInboundFromStorage()

            this.setActiveInput('formInputParentInbound', null, () => this.dialogActive)
        },
        onCameraScannerGetData(data) {
            if (data?.event === 'result' && data?.data?.text) {
                const {
                    namespace,
                    data: { text },
                } = data

                if (namespace === 'formInputInbound') {
                    this.item_no = text
                    this.updateValue('item_no')
                } else if (namespace === 'formInputParentInbound') {
                    this.parent_no = text
                    this.updateValue('parent_no')
                } else if (namespace === 'formInputChildInbound') {
                    this.child_no = text
                    this.updateValue('child_no')
                }
            }
        },
        actionLimit(val) {
            this.limit = val
            this.page = 1
            this.refresh()
        },
        actionPagination(val) {
            this.page = val
            this.refresh()
        },
        openDialog(type) {
            this.autoFocusInput(true)

            if (type === 'receiving_log') {
                this.showDialog = true
            } else if (type === 'surat_jalan') {
                if (this.$refs.misrouteBag?.selectedData.length < 1) {
                    this.openNotification('danger', '', 'Failed', 'Please select at least one bag')
                } else {
                    this.dialogSuratJalan = true
                    this.selectedData = this.$refs.misrouteBag.selectedData
                }
            } else if (type === 'surat_muatan') {
            }
        },
        closeDialog(type) {
            if (type === 'receiving_log') {
                this.showDialog = false
            } else if (type === 'surat_jalan') {
                this.dialogSuratJalan = false
                this.$refs.misrouteBag.refresh()
            } else if (type === 'surat_muatan') {
            }

            this.autoFocusInput(false)
        },

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
                this.openNotification(
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
        autoFocusInput(dialogValue) {
            this.dialogActive = dialogValue

            if (!this.dialogActive) {
                if (!this.hasInboundNumber && !this.is_prealert) {
                    this.setActiveInput('formInputParentInbound', null, () => this.dialogActive)
                } else if (this.hasInboundNumber && !this.is_prealert) {
                    this.setActiveInput('formInputChildInbound', null, () => this.dialogActive)
                } else if (this.is_prealert) {
                    this.setActiveInput('formInputInbound', null, () => this.dialogActive)
                }
            }
        },
    },
    async mounted() {
        await this.loadInboundFromStorage()

        this.getParamRoute()

        if (!this.hasInboundNumber && !this.is_prealert && this.$refs.formInputParentInbound) {
            this.setActiveInput('formInputParentInbound')
        } else if (this.is_prealert && this.$refs.formInputInbound) {
            this.setActiveInput('formInputInbound')
        }
    },
}
</script>

<style scoped>
.header-remark-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>

<template>
    <div>
        <vs-loading :active="listenLoading" text="Loading..." />
        <vs-row>
            <vs-col>
                <div class="titlePage">
                    <breadcrumb />
                    <h2 v-copy="title">{{ title }}</h2>
                </div>
            </vs-col>
        </vs-row>

        <vs-row align="self-end" style="margin-top: 1rem">
            <vs-col xs="12" sm="3" lg="3">
                <vs-row v-if="!disabledApprove" class="mb-2" style="gap: 1rem">
                    <vs-checkbox
                        v-model="is_auto_open_bag"
                        @change="handleAutoOpenBag"
                        data-testid="checkbox-auto_open_bag"
                    >
                        Auto Open Bag
                    </vs-checkbox>

                    <vs-checkbox
                        v-model="is_validate_courier"
                        @change="handleValidateCourier"
                        data-testid="checkbox-validate_courier"
                    >
                        Validate Courier
                    </vs-checkbox>
                </vs-row>

                <div class="center">
                    <vs-input
                        ref="formInputBag"
                        v-model="item_bag"
                        border
                        icon-after
                        v-uppercase
                        label-placeholder="Scan Bag Pra Runsheet Here"
                        :disabled="disabledApprove || isSubmitting"
                        data-testid="input-formInputBag"
                        @keydown.enter="updateValue('formInputBag')"
                        @click="setActiveInput('formInputBag')"
                        @click-icon="$refs.cameraScanner.open('formInputBag')"
                        @keydown.native="
                            handleTabNavigation($event, 'formInputBag', [
                                'formInputBag',
                                'formInputConnote',
                                'formRemoveConnote',
                            ])
                        "
                    >
                        <template #icon>
                            <i class="bx bx-barcode-reader" />
                        </template>
                    </vs-input>
                </div>
            </vs-col>

            <vs-col xs="12" sm="3" lg="3">
                <div class="center">
                    <vs-input
                        ref="formInputConnote"
                        v-model="item_no"
                        border
                        icon-after
                        v-uppercase
                        autofocus
                        label-placeholder="Scan Connote Here"
                        :disabled="disabledApprove || isSubmitting"
                        data-testid="input-formInputConnote"
                        @keydown.enter="updateValue('formInputConnote')"
                        @click="setActiveInput('formInputConnote')"
                        @click-icon="$refs.cameraScanner.open('formInputConnote')"
                        @keydown.native="
                            handleTabNavigation($event, 'formInputConnote', [
                                'formInputBag',
                                'formInputConnote',
                                'formRemoveConnote',
                            ])
                        "
                    >
                        <template #icon>
                            <i class="bx bx-barcode-reader" />
                        </template>
                    </vs-input>
                </div>
            </vs-col>

            <vs-col xs="12" sm="3" lg="3">
                <div class="center">
                    <vs-input
                        ref="formRemoveConnote"
                        v-model="item_no_remove"
                        border
                        icon-after
                        v-uppercase
                        label-placeholder="Remove Connote Here"
                        :disabled="disabledApprove || isSubmitting"
                        data-testid="input-formRemoveConnote"
                        @keydown.enter="updateValue('formRemoveConnote')"
                        @click="setActiveInput('formRemoveConnote')"
                        @click-icon="$refs.cameraScanner.open('formRemoveConnote')"
                        @keydown.native="
                            handleTabNavigation($event, 'formRemoveConnote', [
                                'formInputBag',
                                'formInputConnote',
                                'formRemoveConnote',
                            ])
                        "
                    >
                        <template #icon>
                            <i class="bx bx-barcode-reader" />
                        </template>
                    </vs-input>
                </div>
            </vs-col>

            <vs-col xs="12" sm="3" lg="3" v-if="dataDelivery.length">
                <ul class="left summary-list">
                    <li>User : {{ activeUserLabel }}</li>
                    <li>Total : {{ dataDelivery.length }} Connotes</li>
                    <li>Expectations COD : {{ moneyformat(dataDeliverySummary.amount_cod) }}</li>
                </ul>
            </vs-col>
        </vs-row>

        <vs-row>
            <vs-col lg="12" sm="12" xs="12">
                <div class="box information">
                    <vs-row justify="space-between" align="center">
                        <vs-col xs="12" sm="6" lg="3">
                            <asynchronous-select
                                ref="courier"
                                name="Courier"
                                formKey="courier"
                                :valueData="courier_arr"
                                :selectedValue="selectedCourier"
                                isSingleInput
                                :url="autoCompleteCourierUrl"
                                :selectValue="input_value"
                                :selectLabel="input_label"
                                :searchKeyword="lastKeywordCourier"
                                :labelFormatter="formatEmployeeLabel"
                                :disabled="disabledApprove"
                                @updateValue="updateValueCourier"
                                @inputFocus="onCourierFocus"
                                @search="handleSearchCourier"
                            />
                        </vs-col>

                        <vs-col xs="12" sm="6" lg="9">
                            <vs-row justify="end" v-if="hasDelivery">
                                <vs-button
                                    class="mr-2"
                                    :loading="loadingConfirm"
                                    :disabled="disabledConfirm"
                                    data-testid="confirm-status-button"
                                    @click="confirmAction"
                                >
                                    Confirm Status
                                </vs-button>

                                <vs-button
                                    v-if="!isHelpdesk"
                                    :loading="loadingApprove"
                                    :disabled="disabledApprove"
                                    data-testid="approve-runsheet-button"
                                    @click="approveAction(true)"
                                >
                                    {{ disabledApprove ? 'Runsheet Approved' : 'Approve Runsheet' }}
                                </vs-button>

                                <template v-else>
                                    <vs-button
                                        v-if="!disabledApprove"
                                        :loading="loadingApprove"
                                        :disabled="hrsStatus"
                                        data-testid="approve-runsheet-button"
                                        @click="approveAction(true)"
                                    >
                                        Approve Runsheet
                                    </vs-button>

                                    <vs-button
                                        v-else
                                        danger
                                        :loading="loadingApprove"
                                        :disabled="hrsStatus"
                                        data-testid="unapprove-runsheet-button"
                                        @click="approveAction(false)"
                                    >
                                        Unapprove Runsheet
                                    </vs-button>
                                </template>
                            </vs-row>
                        </vs-col>
                    </vs-row>

                    <div class="nav-box" v-if="arrStatus">
                        <RunsheetInformation
                            ref="runsheetInformation"
                            :arrStatus="arrStatus"
                            :dataDelivery="dataDelivery"
                            :deliveryNumber="delivery_runsheet_number"
                            :loading="loadingRunsheet"
                            :selectedItems="selectedUpdateItems"
                            @update-selected="updateSelected"
                            @updatePOD="updatePOD"
                            @editPOD="editPOD"
                        />
                    </div>
                </div>
            </vs-col>
        </vs-row>

        <vs-row justify="flex-end" style="padding-top: 40px">
            <vs-button v-if="is_approve === '1'" class="mt-1 mr-2" square active @click="print">
                <i class="bx bxs-printer" /> PRINT
            </vs-button>

            <vs-button class="mt-1" square active @click="back">
                <i class="bx bx-left-arrow" /> BACK
            </vs-button>
        </vs-row>

        <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />

        <dialog-recheck-connote-sla
            ref="recheck_connote_sla"
            title="Recheck Connote Sla"
            :active="openDialogReCheckConnoteSla"
            :closeDialog="() => closeDialog('recheck_connote_sla')"
            :dataItemCheckSla="dataItemCheckSla"
            :type="type"
            @checkZoneDelivery="checkZoneDelivery"
        />

        <dialog-recheck-connote-zone
            ref="recheck_connote_zone"
            title="Recheck Connote Zone"
            :active="openDialogReCheckConnoteZone"
            :closeDialog="() => closeDialog('recheck_connote_zone')"
            :dataItem="dataItem"
            :listConnote="listConnote"
            :type="type"
            @addConnoteToRunsheet="addConnoteToRunsheet"
            @addBagPraRunsheetToRunsheet="addBagPraRunsheetToRunsheet"
        />

        <dialog-confirm
            ref="unapprove_runsheet"
            title="Unapprove Runsheet"
            :message="`Are you sure you want to unapprove this runsheet?`"
            :active="activeDialogConfirmUnpproveRunsheet"
            :loading="loadingConfirmUnpproveRunsheet"
            :closeDialog="() => closeDialog('unapprove_runsheet')"
            @confirm="confirmUnpproveRunsheet"
            @cancel="closeDialog('unapprove_runsheet')"
        />
    </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'

import Breadcrumb from '@/components/breadcrumb/index'
import CameraScanner from '@/components/scanner/camera'
import NavItem from '@/components/navbar/navTab'
import Selector from '@/components/input/select'
import AsynchronousSelect from '@/components/input/asynchronousSelect'
import Loading from '@/components/loading'

import DialogConfirm from '@/components/dialog/dialogConfirm'
import DialogConfirmCustom from '@/views/delivery/runsheetNew/edit/dialogConfirm'
import DialogReCheckConnoteZone from '@/views/delivery/runsheetNew/edit/dialogReCheckConnoteZone'
import DialogReCheckConnoteSla from '@/views/delivery/runsheetNew/edit/dialogReCheckConnoteSla'
import RunsheetInformation from '@/views/delivery/runsheetNew/edit/runsheetInformation'

export default {
    name: 'DeliveryRunsheetEdit',
    components: {
        'nav-item': NavItem,
        breadcrumb: Breadcrumb,
        RunsheetInformation,
        CameraScanner,
        'vs-loading': Loading,
        'dialog-confirm': DialogConfirm,
        'dialog-recheck-courier': DialogConfirmCustom,
        'dialog-recheck-connote-zone': DialogReCheckConnoteZone,
        'dialog-recheck-connote-sla': DialogReCheckConnoteSla,
        selector: Selector,
        AsynchronousSelect,
    },
    mixins: [master],
    computed: {
        listenLoading() {
            return (
                this.loadingStatus ||
                this.loadingRunsheet ||
                this.loadingApprove ||
                this.loadingConfirm ||
                this.loadingConfirmUnpproveRunsheet ||
                this.loadingCourier
            )
        },
        hasDelivery() {
            return this.dataDelivery.length > 0
        },
        isHelpdesk() {
            return this.listenUserRoleName === 'HELPDESK'
        },
        activeUserLabel() {
            if (!this.listenActiveUser) return ''
            const { user_login, user_id } = this.listenActiveUser
            return `${user_login} (${user_id})`
        },
    },
    data() {
        return {
            title: 'Edit Assign',
            item_no: '',
            item_bag: '',
            item_no_remove: '',
            form: {},
            delivery_runsheet_number: '',
            employee_id: '',
            dataDelivery: [],
            summary: [],
            arrStatus: null,
            statusObj: {},
            dataDeliverySummary: null,
            employee_code: '',
            employee_name: '',
            selectedCourier: '',

            form: {},

            loadingRunsheet: false,
            loadingStatus: false,
            loadingCourier: false,
            loadingConfirm: false,
            loadingApprove: false,

            selectedUpdateItems: [],
            navActive: 'k-LIST-DELIVERY',
            disabledConfirm: true,
            disabledApprove: false,
            dataItem: {},
            dataItemCheckSla: {},
            openDialogReCheckConnoteZone: false,
            openDialogReCheckConnoteSla: false,
            type: '',
            listConnote: [],
            activeDialogConfirmUnpproveRunsheet: false,
            loadingConfirmUnpproveRunsheet: false,
            hrsStatus: false,
            courier_arr: [],
            is_approve: '0',
            is_auto_open_bag: true,
            is_validate_courier: false,
            autoCompleteCourierUrl: '',
            lastKeywordCourier: '',

            input_value: 'employee_id',
            input_label: 'employee_name',

            isSubmitting: false,

            timer: null,
            now: Date.now(),
        }
    },
    methods: {
        /* ======================================================
         * TIMER HELPER (RECHECK LATER)
         * ====================================================== */
        startSlaTimer() {
            if (this.timer) return

            this.timer = setInterval(() => {
                this.now = Date.now()
            }, 1000)
        },

        stopSlaTimer() {
            if (this.timer) {
                clearInterval(this.timer)
                this.timer = null
            }
        },

        /* ======================================================
         * INIT
         * ====================================================== */
        async initRoute() {
            const { employee_id = '', delivery_runsheet_number = '' } = this.$route.params || {}

            this.employee_id = employee_id
            this.delivery_runsheet_number = delivery_runsheet_number

            const tasks = []

            if (this.isSubmitting) return
            this.isSubmitting = true

            tasks.push(this.getStatus())

            if (this.employee_id) {
                tasks.push(this.getCourier())
            }

            if (this.delivery_runsheet_number) {
                tasks.push(this.getDataDelivery())
            }

            await Promise.all(tasks)

            this.isSubmitting = false

            this.setActiveInput('formInputConnote')
        },

        async getStatus() {
            this.loadingStatus = true

            try {
                const { data } = await axios.get(
                    `${this.URL.status}?status_type=DELIVERY&n=${this.listenNodeId}&limit=-1`,
                    this.Helper.header()
                )

                const list = Array.isArray(data?.data) ? data.data : []
                const statusObj = {}

                this.arrStatus = list.map((item) => {
                    const label = `${item.status_description} (${item.status_code})`

                    const statusItem = {
                        label,
                        formattedLabel: label.length > 60 ? this.splitText(label, 60) : undefined,
                        value: item.status_code,
                        data: item,
                    }

                    const condition = item.status_condition?.toLowerCase()
                    if (condition) {
                        statusObj[condition] ||= []
                        statusObj[condition].push(statusItem)
                    }

                    return statusItem
                })

                this.statusObj = statusObj
            } catch (err) {
                await this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed to populate status',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
            } finally {
                this.loadingStatus = false
            }
        },

        splitText(text, maxLineLength) {
            const words = text.split(' ')
            let lines = []
            let currentLine = ''

            words.forEach((word) => {
                if ((currentLine + word).length <= maxLineLength) {
                    currentLine += word + ' '
                } else {
                    lines.push(currentLine.trim())
                    currentLine = word + ' '
                }
            })

            if (currentLine.length > 0) {
                lines.push(currentLine.trim())
            }

            return lines
        },

        /* ======================================================
         * DATA DELIVERY
         * ====================================================== */
        async getDataDelivery() {
            this.loadingRunsheet = true

            try {
                const res = await axios.get(
                    `${this.URL.employee}/${this.employee_id}/delivery?n=${this.listenNodeId}&delivery_runsheet_number=${this.delivery_runsheet_number}`,
                    this.Helper.header()
                )

                const { data, summary } = res.data

                this.dataDelivery = this.processDataDelivery(data)
                this.dataDeliverySummary = summary
                this.delivery_runsheet_number = summary?.delivery_runsheet_number?.toString() ?? ''

                if (!data?.delivery?.length) {
                    this.back()
                }
            } catch (err) {
                this.loadingRunsheet = false

                await this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed to load delivery data',
                    err?.response?.data?.message ?? 'Something went wrong'
                )

                this.clearInputs()
            } finally {
                this.loadingRunsheet = false
                this.clearInputs()
            }
        },

        processDataDelivery(data) {
            const status = this.statusObj || {}
            const delivery = data.delivery ? data.delivery : []

            delivery.map((item) => {
                item.status_delivery = []
                item.is_disabled_input = false

                if (item.hasOwnProperty('koli_number')) {
                    // if (item.koli_number.toLowerCase().includes("rt")) {
                    //     item.status_delivery = [...status.rt, ...status.all];
                    // } else {
                    //     item.status_delivery = [...status.normal, ...status.all];
                    // }

                    // filter untuk all status
                    item.status_delivery = [
                        ...(status?.normal ?? []),
                        ...(status?.rt ?? []),
                        ...(status?.all ?? []),
                    ]
                }
                if (item.hasOwnProperty('remarks')) {
                    if (item['status_code'] == null) {
                        item['is_disabled_input_remarks'] =
                            item['remarks'] !== null || item['remarks'] !== '' ? true : false
                    }
                }
                if (item.hasOwnProperty('receiver_name')) {
                    if (item['status_code'] == null) {
                        item['is_disabled_input_reveiver'] =
                            item['receiver_name'] !== null || item['receiver_name'] !== ''
                                ? true
                                : false
                    }
                }

                this.is_approve = item.is_approve
                if (item.is_approve === '1') {
                    this.disabledApprove = true
                } else {
                    item['is_disabled_input_status'] = true
                }

                if (item.is_hrs) {
                    this.hrsStatus = true
                }

                item.isDisabled = item.is_delivered === 1
                if (
                    item.is_delivered == 1 ||
                    item.is_pod_orion == 1 ||
                    this.hasPermission('disable-pod')
                ) {
                    this.disableDeliveredPOD(item)
                }
                item.employee_name = data.employee_name
                item.employee_code = data.employee_code
                item.warning_koli_record_id = item?.warning_koli_record_id
                item.created_at = this.formatTimezone(item?.created_at)

                if (item?.days_elapsed != null) {
                    item.days_elapsed = this.formatElapsedDay(item.days_elapsed)
                }
            })

            return delivery
        },

        /* ======================================================
         * BASIC TOGGLES, BUTTON & UI
         * ====================================================== */
        handleAutoOpenBag(e) {
            this.is_auto_open_bag = e.target.checked
        },

        handleValidateCourier(e) {
            this.is_validate_courier = e.target.checked
        },

        back() {
            this.clearInputs()

            this.$router.push('/delivery/runsheet')
            this.setRoutePageHistory(this.$route.meta, false)
        },

        reload() {
            this.getDataDelivery()
        },

        /* ======================================================
         * COURIER & UPDATE COURIER
         * ====================================================== */
        formatEmployeeLabel(item = {}) {
            const { employee_name = '', employee_code = '' } = item
            return employee_code ? `${employee_name} (${employee_code})` : employee_name
        },

        handleSearchCourier(keyword) {
            this.lastKeywordCourier = keyword
        },

        onCourierFocus() {
            this.autoCompleteCourierUrl = `${this.URL.courier_delivery}/list?n=${this.listenNodeId}`
        },

        async getCourier() {
            if (!this.employee_id) return

            this.loadingCourier = true

            try {
                const res = await axios.get(
                    `${this.URL.employee}/${this.employee_id}?n=${this.listenNodeId}`,
                    this.Helper.header()
                )

                const employee = res?.data?.data
                if (!employee) return

                const label = this.formatEmployeeLabel(employee)

                this.employee_id = employee.employee_id
                this.selectedCourier = label

                this.employee_name = employee.employee_name
                this.employee_code = employee.employee_code

                this.courier_arr = [
                    {
                        label,
                        value: label,
                        item: employee,
                    },
                ]
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
            } finally {
                this.loadingCourier = false
            }
        },

        updateValueCourier(key, label, info) {
            if (key !== 'courier') return

            const courierId = info?.employee_id ?? label
            this.setCourierState(courierId, label, info)
            this.updateRunsheetCourier()
        },

        setCourierState(courierId, label, info) {
            this.employee_id = courierId
        },

        async updateRunsheetCourier() {
            if (!this.employee_id) return

            if (!this.delivery_runsheet_number) {
                this.$router.push({
                    name: 'delivery-runsheet-new',
                    params: { employee_id: this.employee_id },
                })
                return
            }

            try {
                const res = await axios.put(
                    `${this.URL.revamp_delivery}/${this.delivery_runsheet_number}?n=${this.listenNodeId}`,
                    { courier_employee_id: this.employee_id },
                    this.Helper.header()
                )

                this.openNotification('success', null, 'Success', res?.data?.message)

                this.setURL()

                await Promise.all([this.getCourier(), this.getDataDelivery()])
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
            }
        },

        /* ======================================================
         * UPDATE VALUE
         * ====================================================== */
        applyForm(payload = {}) {
            this.form = {
                ...payload,
                courier_employee_id: this.employee_id,
            }

            document.activeElement?.blur()
        },

        getUpdateValueConfig() {
            return {
                formInputBag: {
                    guard: () => this.item_bag,
                    form: () => ({
                        bag_number: this.item_bag,
                        auto_open_bag: this.is_auto_open_bag,
                    }),
                    after: () => this.validateBagPraRunsheet(),
                },

                formInputConnote: {
                    guard: () => this.item_no,
                    form: () => ({
                        koli_number: this.item_no,
                        auto_open_bag: this.is_auto_open_bag,
                    }),
                    after: () => {
                        this.scanConnote()
                        this.setActiveInput('formInputConnote')
                    },
                },

                formRemoveConnote: {
                    guard: () => this.item_no_remove,
                    form: () => ({
                        koli_number: this.item_no_remove,
                    }),
                    after: () => this.removeConnote(),
                },
            }
        },

        updateValue(type) {
            const action = this.getUpdateValueConfig()[type]
            if (!action || !action.guard()) return

            this.applyForm(action.form())
            action.after?.()
        },

        /* ======================================================
         * SCAN & VALIDATION
         * ====================================================== */
        async scanConnote() {
            if (this.isSubmitting) return
            this.isSubmitting = true
            this.loadingRunsheet = true

            const payload = {
                item_number: this.form.koli_number,
                delivery_runsheet_number: this.delivery_runsheet_number,
                courier_id: this.employee_id,
                auto_open_bag: this.is_auto_open_bag,
                validate_courier: this.is_validate_courier,
            }

            try {
                await axios.post(
                    `${this.URL.validation}/create-runsheet?n=${this.listenNodeId}`,
                    payload,
                    this.Helper.header()
                )
                this.checkItemSla('KOLI')
            } catch (err) {
                this.loadingRunsheet = false

                await this.openNotification(
                    'danger',
                    '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )

                this.clearInputs()
            } finally {
                this.setActiveInput('formInputConnote')
            }
        },

        async validateBagPraRunsheet() {
            if (this.isSubmitting) return
            this.isSubmitting = true

            this.loadingRunsheet = true

            try {
                await axios.post(
                    `${this.URL.validation}/create-runsheet-pra?n=${this.listenNodeId}`,
                    {
                        item_number: this.item_bag,
                        delivery_runsheet_number: this.delivery_runsheet_number,
                        courier_id: this.employee_id,
                        auto_open_bag: this.is_auto_open_bag,
                        validate_courier: this.is_validate_courier,
                    },
                    this.Helper.header()
                )
                this.validateCourier()
            } catch (err) {
                this.loadingRunsheet = false

                await this.openNotification(
                    'danger',
                    '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )

                this.clearInputs()
            } finally {
                this.setActiveInput('formInputBag')
            }
        },

        async validateCourier() {
            try {
                await axios.get(
                    `${this.URL.bag}/${this.form.bag_number}?n=${this.listenNodeId}&courier_employee_id=${this.employee_id}`,
                    this.Helper.header()
                )
                this.checkItemSla('BAG')
            } catch (err) {
                this.loadingRunsheet = false

                await this.openNotification(
                    'danger',
                    '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )

                this.clearInputs()
            } finally {
                this.clearAll()
                this.setActiveInput('formInputBag')
            }
        },

        /* ======================================================
         * SLA & ZONE
         * ====================================================== */
        async checkItemSla(type) {
            const url =
                type === 'KOLI'
                    ? `${this.URL.configuration_warning_sla}/check-sla?n=${this.listenNodeId}&item_number=${this.form.koli_number}`
                    : `${this.URL.configuration_warning_sla}/check-sla-bag?n=${this.listenNodeId}&bag_number=${this.form.bag_number}`

            try {
                const res = await axios.get(url, this.Helper.header())
                const data = Array.isArray(res.data.data) ? res.data.data : [res.data.data]

                const safe = data.every((i) => i.status === 'SAFE')
                safe ? this.checkZoneDelivery(type) : (this.openDialogReCheckConnoteSla = true)
            } catch (err) {
                this.loadingRunsheet = false

                await this.openNotification(
                    'danger',
                    '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )

                this.clearInputs()
            } finally {
                this.setActiveInput(type === 'KOLI' ? 'formInputConnote' : 'formInputBag')
            }
        },

        async checkZoneDelivery(type) {
            const item = type === 'BAG' ? this.form.bag_number : this.form.koli_number

            try {
                await axios.get(
                    `${this.URL.check_delivery_area}?item_number=${item}&type=${type}&n=${this.listenNodeId}`,
                    this.Helper.header()
                )
                type === 'BAG'
                    ? this.addBagPraRunsheetToRunsheet(this.form)
                    : this.addConnoteToRunsheet(this.form)
            } catch (err) {
                this.loadingRunsheet = false

                await this.openNotification(
                    'danger',
                    '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )

                this.clearInputs()
            } finally {
                this.setActiveInput(type === 'KOLI' ? 'formInputConnote' : 'formInputBag')
            }
        },

        /* ======================================================
         * RUNSHEET CRUD
         * ====================================================== */
        async submitRunsheet({ form, baseUrl, activeForm = 'formInputConnote' }) {
            try {
                const isCreate = !this.delivery_runsheet_number
                const url = isCreate
                    ? `${baseUrl}?n=${this.listenNodeId}`
                    : `${baseUrl}/${this.delivery_runsheet_number}/detail?n=${this.listenNodeId}`

                const { data } = await axios.post(url, JSON.stringify(form), this.Helper.header())

                this.dataDeliverySummary = data.summary
                this.delivery_runsheet_number = data.summary.delivery_runsheet_number.toString()

                if (isCreate) this.setURL()

                await this.getDataDelivery()

                this.openNotification('success', null, 'Success', 'Success')
            } catch (err) {
                this.loadingRunsheet = false

                await this.openNotification(
                    'danger',
                    '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )

                this.clearInputs()
            } finally {
                this.loadingRunsheet = false
                this.clearAll()
                this.setActiveInput(activeForm)
            }
        },

        addConnoteToRunsheet(form) {
            return this.submitRunsheet({
                form,
                baseUrl: this.URL.revamp_delivery,
                activeForm: 'formInputConnote',
            })
        },

        addBagPraRunsheetToRunsheet(form) {
            return this.submitRunsheet({
                form,
                baseUrl: this.URL.revamp_delivery_bag_pra,
                activeForm: 'formInputBag',
            })
        },

        async removeConnote() {
            if (this.isSubmitting) return

            this.isSubmitting = true
            this.loadingRunsheet = true

            try {
                const { data } = await axios.delete(
                    `${this.URL.revamp_delivery}/${this.delivery_runsheet_number}/detail/${this.form.koli_number}?n=${this.listenNodeId}`,
                    this.Helper.header()
                )

                const { summary, data: detail, message } = data || {}

                if (summary) {
                    this.dataDeliverySummary = summary
                    this.delivery_runsheet_number =
                        summary.delivery_runsheet_number?.toString() ?? ''
                }

                await this.getDataDelivery()

                this.openNotification('success', null, 'Success', message ?? 'Remove item success')
            } catch (err) {
                this.loadingRunsheet = false
                await this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    (err?.response?.data?.type !== 'NotFoundHttpException'
                        ? err?.response?.data?.message
                        : 'Tidak dapat menemukan runsheet atau detail delivery yang diminta. \nPastikan runsheet sudah dibuat atau item yang dimasukkan valid.') ??
                        'Something went wrong'
                )
            } finally {
                this.loadingRunsheet = false
                this.clearAll()
                this.setActiveInput('formRemoveConnote')
            }
        },

        /* ======================================================
         * UPDATE CHECKBOX
         * ====================================================== */
        updateSelected(arr) {
            this.loadingRunsheet = false
            this.selectedUpdateItems = arr
            this.disabledConfirm = !(arr.length > 0 && this.disabledApprove)
        },

        /* ======================================================
         * APPROVE & UNAPPROVE RUNSHEET
         * ====================================================== */
        confirmUnpproveRunsheet() {
            this.approve(false)
            this.activeDialogConfirmUnpproveRunsheet = false
            this.reload()
        },

        approveAction(val) {
            if (!val) {
                this.activeDialogConfirmUnpproveRunsheet = true
                return
            }

            this.approve(true)
        },

        async approve(val) {
            this.loadingApprove = true
            this.loadingConfirmUnpproveRunsheet = true

            try {
                const res = await axios.patch(
                    `${this.URL.revamp_delivery}/${this.delivery_runsheet_number}/approval?n=${this.listenNodeId}`,
                    { approved: val },
                    this.Helper.header()
                )

                this.form = {}
                this.is_approve = val
                this.disabledApprove = val

                this.openNotification('success', null, 'Success', res?.data?.message)
                this.reload()
            } catch (err) {
                await this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
            } finally {
                this.loadingApprove = false
                this.loadingConfirmUnpproveRunsheet = false
            }
        },

        /* ======================================================
         * CONFIRM RUNSHEET & UPDATE POD
         * ====================================================== */
        mapItemToPOD(item) {
            return {
                courier_employee_id: item.courier_employee_id,
                delivery_runsheet_number: item.delivery_runsheet_number,
                koli_number: item.koli_number,
                status: item.status_code,
                remarks: item.remarks,
                receiver_name: item.receiver_name,
            }
        },

        async confirmAction() {
            if (!this.selectedUpdateItems.length) {
                return this.openNotification(
                    'danger',
                    '',
                    'Failed',
                    'Please select at least one item'
                )
            }

            for (const item of this.selectedUpdateItems) {
                await this.updatePOD(this.mapItemToPOD(item))
            }
        },

        async submitPOD(dataPOD, runsheetNumber) {
            if (!dataPOD.status) {
                this.openNotification('warn', null, 'Status Required')
                return
            }

            this.loadingConfirm = true

            try {
                const res = await axios.put(
                    `${this.URL.revamp_delivery}/${runsheetNumber}/detail/${dataPOD.koli_number}/status?n=${this.listenNodeId}`,
                    dataPOD,
                    this.Helper.header()
                )

                this.openNotification('success', null, 'Success', res?.data?.message)
                await this.getDataDelivery()
            } catch (err) {
                await this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
            } finally {
                this.loadingConfirm = false
            }
        },

        async editPOD(val) {
            const dataPOD = this.mapItemToPOD(val)
            await this.submitPOD(dataPOD, val.delivery_runsheet_number)
        },

        async updatePOD(dataPOD) {
            await this.submitPOD(dataPOD, this.delivery_runsheet_number)
        },

        /* ==========================
         * CAMERA SCAN HANDLER
         * ========================== */
        onCameraScannerGetData({ namespace, data }) {
            const value = data.text
            if (!value) return

            if (namespace === 'formInputBag') {
                this.item_bag = value
                this.validateBag()
            }
            if (namespace === 'formInputConnote') {
                this.item_no = value
                this.scanConnote()
            }
            if (namespace === 'formRemoveConnote') {
                this.item_no_remove = value
                this.removeConnote()
            }
        },

        /* ======================================================
         * UTIL
         * ====================================================== */
        setURL() {
            this.$router.push({
                name: 'delivery-runsheet-edit',
                params: {
                    employee_id: this.employee_id,
                    delivery_runsheet_number: this.delivery_runsheet_number,
                },
            })
            this.setRoutePageHistory(this.$route.meta, false)
        },

        clearInputs() {
            this.item_no = ''
            this.item_no_remove = ''
            this.item_bag = ''
            this.isSubmitting = false
        },

        clearAll() {
            this.clearInputs()
            this.form = {}
        },

        disableDeliveredPOD(val) {
            this.$set(val, 'is_disabled_input_status', true)
            this.$set(val, 'is_disabled_input_remarks', true)
            this.$set(val, 'is_disabled_input_reveiver', true) // TODO: CHANGE THIS WRONG KEY receiver
        },

        print() {
            const routeData = this.$router.resolve({
                name: 'printGeneral',
                params: {
                    id: this.delivery_runsheet_number,
                    type: 'delivery',
                    employee_id: this.employee_id,
                    node_id: this.listenNodeId,
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
    },
    async mounted() {
        await this.initRoute()
        // this.startSlaTimer()

        window.addEventListener('timezone-changed', this.reload)

        this.timer = setInterval(() => {
            this.dataDelivery = this.dataDelivery.map((item) => ({
                ...item,
                sla_connote_formatted: this.formatSlaTime(item.sla_date, item.end_date),
            }))
        }, 1000)
    },
    beforeDestroy() {
        // this.stopSlaTimer()
        window.removeEventListener('timezone-changed', this.reload)
        clearInterval(this.timer)
    },
}
</script>
<style lang="scss" scoped>
.summary-list {
    padding: 0;
    text-align: left;
    list-style: none;
}
</style>

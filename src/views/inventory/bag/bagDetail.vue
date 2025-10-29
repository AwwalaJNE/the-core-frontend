<template>
    <div>
        <vs-row justify="space-between" style="display: flex">
            <div class="titlePage">
                <breadcrumb />
                <div style="display: flex; align-items: center">
                    <h2 style="margin-right: 10px" v-copy="title">{{ title }}</h2>

                    <vs-tooltip bottom v-if="!isAllowed && !loading">
                        <i class="bx bx-info-circle"></i>
                        <template #tooltip>
                            {{ messageIsAllowed }}
                        </template>
                    </vs-tooltip>
                </div>
            </div>
            <div style="display: flex" class="buttonPage" v-if="!loading">
                <vs-button
                    v-if="listenUserRoleName !== 'HELPDESK' && tipe_bag === 'OM'"
                    @click="openDialogTransit"
                    :disabled="disabledAddTransit"
                    :data-testid="`button-add-transit`"
                >
                    <i class="bx bx-plus"></i> Add Transit
                </vs-button>
                <template v-if="listenUserRoleName === 'HELPDESK'">
                    <vs-button
                        @click="approveAction(true)"
                        :disabled="!isAllowed"
                        style="width: 6rem"
                        :data-testid="`button-approve`"
                        v-if="!disabledApprove"
                    >
                        <span> Approve </span>
                    </vs-button>
                    <vs-button
                        @click="approveAction(false)"
                        danger
                        :disabled="!isAllowed"
                        style="width: 6rem"
                        v-if="disabledApprove"
                        :data-testid="`button-unapprove`"
                    >
                        <span> Unapprove </span>
                    </vs-button>
                </template>
                <template v-else>
                    <vs-button
                        @click="approveAction(true)"
                        :disabled="disabledApprove"
                        style="width: 6rem"
                        :data-testid="disabledApprove ? `button-unapproved` : 'button-approve'"
                    >
                        <span>
                            {{ disabledApprove ? 'Approved' : 'Approve' }}
                        </span>
                    </vs-button>
                </template>
                <vs-button
                    v-if="listenUserRoleName !== 'HELPDESK'"
                    style="width: 6rem"
                    :data-testid="`button-new`"
                    @click="newBag"
                >
                    <i class="bx bx-plus"></i> New
                </vs-button>
                <vs-button
                    v-if="listenUserRoleName !== 'HELPDESK' && is_approve"
                    style="width: 6rem"
                    @click="print"
                    :data-testid="`button-print`"
                    >Print</vs-button
                >
                <vs-button
                    v-if="listenUserRoleName === 'HELPDESK'"
                    style="width: 6rem"
                    :data-testid="`button-edit`"
                    @click="editBag"
                >
                    Edit
                </vs-button>
            </div>
        </vs-row>

        <template v-if="!disabledApprove && !loading && !is_masterbag">
            <vs-row class="mb-2 mt-2" align="center">
                <vs-checkbox
                    v-model="is_auto_open_bag"
                    @change="handleAutoOpenBag"
                    :data-testid="`checkbox-is_auto_open_bag`"
                >
                    Auto Open Bag
                </vs-checkbox>
                <vs-checkbox
                    v-if="!disable_hub_delivery"
                    style="margin-left: 20px"
                    v-model="is_hub_delivery_validation"
                    @change="handleValidateHubDelivery"
                    :data-testid="`checkbox-validate_hub_delivery`"
                >
                    Validate Hub Delivery
                </vs-checkbox>

                <!-- NOTES: HIDE SINCE CURRENTLY VALIDATION NOT USED -->
                <template v-if="is_pra_runsheet && false">
                    <vs-col xs="12" sm="3" lg="3">
                        <selector
                            ref="validation"
                            name=""
                            rules=""
                            placeholder="Select Validation"
                            formKey="validation"
                            :loading="loading"
                            :selectedValue="validation"
                            :disabled="true"
                            :customBind="'data-kt-routing'"
                        />
                    </vs-col>
                    <vs-col xs="12" sm="6" lg="6">
                        <asynchronousSelect
                            ref="validation_reference"
                            name=""
                            rules=""
                            formKey="validation_reference"
                            typeInput="multipleselector"
                            :selectedValue="validation_reference"
                            :disabled="true"
                        />
                    </vs-col>
                </template>
            </vs-row>
        </template>

        <section class="bagging">
            <vs-row justify="space-between">
                <vs-col xs="12" sm="4" lg="4">
                    <template v-if="!disabledApprove && !loading">
                        <div v-if="!is_masterbag" class="center in-get-bag">
                            <vs-input
                                border
                                type="text"
                                v-model="item_number"
                                label-placeholder="Masukkan Koli/Connote"
                                v-on:keyup.enter="addBagDetail"
                                icon-after
                                v-uppercase
                                ref="formInputBaggingKoli"
                                @click-icon="$refs.cameraScanner.open('formInputBaggingKoli')"
                                v-bind:data-kt="'scan_input'"
                                :data-testid="`input-item_number`"
                                :disabled="dialogActive"
                                @input="sanitizeAlphanumeric('item_number')"
                            >
                                <template #icon>
                                    <i class="bx bx-barcode-reader"></i>
                                </template>
                            </vs-input>
                        </div>
                        <div v-else class="center in-get-bag">
                            <vs-input
                                border
                                type="text"
                                v-model="item_number"
                                label-placeholder="Masukkan code Bag"
                                v-on:keyup.enter="addBagDetail"
                                icon-after
                                v-uppercase
                                :data-testid="`input-item_number`"
                                ref="formInputBaggingBag"
                                :disabled="dialogActive"
                                @click-icon="$refs.cameraScanner.open('formInputBaggingBag')"
                                v-bind:data-kt="'scan_input'"
                                @input="sanitizeAlphanumeric('item_number')"
                            >
                                <template #icon>
                                    <i class="bx bx-barcode-reader"></i>
                                </template>
                            </vs-input>
                        </div>
                    </template>
                </vs-col>
            </vs-row>

            <vs-row style="margin-top: 1em" v-if="!is_pra_runsheet && !loading">
                <vs-col xs="12" sm="6" lg="2">
                    <selector
                        ref="routing"
                        name="Routing"
                        rules="required"
                        formKey="routing"
                        :valueData="routingArray"
                        :selectedValue="routing"
                        :disabled="true"
                        @updateValue="updateValue"
                    />
                </vs-col>
                <vs-col xs="12" sm="6" lg="2">
                    <selector
                        ref="service"
                        name="Service"
                        rules="required"
                        formKey="service"
                        :isMultiple="true"
                        :valueData="serviceArray"
                        :selectedValue="service"
                        :disabled="true"
                        @updateValue="updateValue"
                    />
                </vs-col>
                <!--input update location -->
                <vs-col xs="12" sm="8" lg="6">
                    <auto-complete
                        ref="destination"
                        name="Destination"
                        rules="required"
                        formKey="destination"
                        :querySearch="querySearch"
                        :selectedValue="destinationLabel"
                        :disabled="(disabledApprove && !loading) || dialogActive"
                        @inputFocus="inputFocus"
                        @updateValue="updateValue"
                        @click.native="focusDestinationInput"
                    />
                </vs-col>
                <vs-col xs="12" sm="4" lg="2">
                    <span class="c-label">Weight</span>
                    <vs-input
                        ref="weight"
                        v-model="weight"
                        type="text"
                        border
                        name="weight"
                        placeholder="Weight"
                        :disabled="(disabledApprove && !loading) || dialogActive"
                        @keypress="onlyNumber"
                        @keyup.enter="updateBag"
                        icon-after
                        :data-testid="`input-weight`"
                        @click="focusWeightInput"
                    >
                        <template #icon> Kg </template>
                    </vs-input>
                </vs-col>
            </vs-row>

            <div class="box view">
                <detailbagList ref="detailbagList" :bagId="bag_id" @getResponse="getResponse" />
            </div>

            <vs-col xs="12" sm="12" lg="12" align="right" style="padding: 20px 5px">
                <vs-button @click="back">Back</vs-button>
            </vs-col>
        </section>
        <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />
        <dialog-confirm
            title="Unapprove Bag"
            :message="`Are you sure you want to unapprove this bag?`"
            :active="activeDialogConfirmUnpproveBag"
            :loading="loadingConfirmUnpproveBag"
            :closeDialog="closeDialogConfirmUnpproveBag"
            @confirm="confirmUnpproveBag"
            @cancel="closeDialogConfirmUnpproveBag"
        />
        <dialog-helpdesk-edit-bag
            title="Edit Bag"
            :active="dialogHelpdeskEditBag"
            :bagNumber="bag_id"
            :closeDialog="closeDialog"
        />

        <dialog-create-edit-transit
            title="Add Transit Route"
            :active="dialogTransitActive"
            :bagNumber="bag_id"
            :closeDialog="closeDialogTransit"
        />
    </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'
import AutoComplete from '@/components/input/autoComplete'
import Breadcrumb from '@/components/breadcrumb/index'
import detailBagList from '@/views/inventory/bag/bagDetailList'
import Selector from '@/components/input/select'
import CameraScanner from '@/components/scanner/camera.vue'
import DialogConfirm from '@/components/dialog/dialogConfirm'
import DialogHelpdeskEditBag from '@/views/helpdesk/bag/dialogHelpdeskEditBag'
import DialogCreateEditTransit from '@/views/inventory/bag/transit/dialogCreateEdit.vue'

import asynchronousSelect from '@/components/input/asynchronousSelect'

export default {
    name: 'InventoryBaggingList',
    mixins: [master],
    components: {
        breadcrumb: Breadcrumb,
        detailbagList: detailBagList,
        selector: Selector,
        CameraScanner,
        'dialog-confirm': DialogConfirm,
        'dialog-helpdesk-edit-bag': DialogHelpdeskEditBag,
        'dialog-create-edit-transit': DialogCreateEditTransit,
        asynchronousSelect: asynchronousSelect,
        'auto-complete': AutoComplete,
    },
    data() {
        return {
            title: 'Bagging Detail',
            item_number: '',
            bag_id: '',
            weight: '',
            actual_weight: '',
            form: {},

            is_disabled: true,

            routing: '',
            routingArray: [
                {
                    label: 'All Routing',
                    value: 'ALL_ROUTING',
                },
                {
                    label: 'Intracity',
                    value: 'intracity',
                },
                {
                    label: 'Intercity',
                    value: 'intercity',
                },
                {
                    label: 'Domestic',
                    value: 'domestic',
                },
                {
                    label: 'International',
                    value: 'international',
                },
            ],
            service: [],
            serviceArray: [
                {
                    label: 'All Service',
                    value: 'ALL_SERVICE',
                },
                {
                    label: 'REG',
                    value: 'REG23',
                },
                {
                    label: 'YES',
                    value: 'YES23',
                },
                {
                    label: 'OKE',
                    value: 'OKE23',
                },
                {
                    label: 'JTR',
                    value: 'jTR',
                },
                {
                    label: 'SPS',
                    value: 'SPS23',
                },
                {
                    label: 'JTR23',
                    value: 'JTR23',
                },
                {
                    label: 'JTR250',
                    value: 'JTR250',
                },
                {
                    label: 'JTR<150',
                    value: 'JTR<150',
                },
                {
                    label: 'JTR>250',
                    value: 'JTR>250',
                },
                {
                    label: '@BOX3KG',
                    value: '@BOX3KG',
                },
                {
                    label: '@BOX5KG',
                    value: '@BOX5KG',
                },
                {
                    label: 'CML',
                    value: 'CML',
                },
                {
                    label: 'CML_CTC',
                    value: 'CML_CTC',
                },
                {
                    label: 'CTC',
                    value: 'CTC15',
                },
                {
                    label: 'CTCJTR',
                    value: 'CTCJTR23',
                },
                {
                    label: 'CTCSPS',
                    value: 'CTCSPS23',
                },
                {
                    label: 'CTCTRC11',
                    value: 'CTCTRC11',
                },
                {
                    label: 'CTCTRC15',
                    value: 'CTCTRC15',
                },
                {
                    label: 'CTCYES',
                    value: 'CTCYES23',
                },
                {
                    label: 'DIP',
                    value: 'DIP',
                },
                {
                    label: 'INTL10',
                    value: 'INTL10',
                },
                {
                    label: 'INTL15',
                    value: 'INTL15',
                },
                {
                    label: 'INTL20',
                    value: 'INTL20',
                },
                {
                    label: 'P2P',
                    value: 'P2P',
                },
                {
                    label: 'PARCEL',
                    value: 'PARCEL',
                },
                {
                    label: 'QR-INST',
                    value: 'QR-INST',
                },
                {
                    label: 'QR-SMDKP',
                    value: 'QR-SMDKP',
                },
                {
                    label: 'QR-SMDY',
                    value: 'QR-SMDY',
                },
                {
                    label: 'TRC11',
                    value: 'TRC11',
                },
                {
                    label: 'TRC13',
                    value: 'TRC13',
                },
            ],
            destinationLabel: '',
            destinationValue: '',

            loading: true,
            isAllowed: true,
            messageIsAllowed: '',
            employee: '',
            is_pra_runsheet: false,
            toggle_approve: {},
            disabledApprove: false,
            disabledAddTransit: false,
            activeDialogConfirmUnpproveBag: false,
            loadingConfirmUnpproveBag: false,
            dialogHelpdeskEditBag: false,
            is_approve: false,
            is_actual_weight_mandatory: false,
            is_auto_open_bag:
                this.$store.getters.getInputs.bag_is_auto_open_bag.bag_is_auto_open_bag.value,
            is_hub_delivery_validation:
                this.$store.getters.getInputs.is_hub_delivery_validation.value,
            disable_hub_delivery: false,
            validation: '',
            validation_reference: [],
            courierArr: [],
            dialogTransitActive: false,
            tipe_bag: '',

            autoCompleteUrl: '',
            dialogActive: false,
        }
    },
    watch: {
        is_masterbag(old, val) {
            if (old !== val) {
                this.setInputFocus()
            }
        },
        loading(newValue) {
            if (!newValue) {
                this.setInputFocus()
            }
        },
    },
    methods: {
        onlyNumber(e) {
            // hanya boleh angka 0–9
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault()
            }
        },
        refresh() {
            this.$refs.detailbagList.refresh()
        },
        handleAutoOpenBag(val) {
            this.is_auto_open_bag = val.target.checked
        },
        handleValidateHubDelivery(val) {
            this.is_hub_delivery_validation = val.target.checked || false
        },
        async getResponse(data, loading) {
            this.tipe_bag = data.data.tipe_bag
            this.is_pra_runsheet = data.data.is_pra_runsheet === '1' ? true : false
            this.is_actual_weight_mandatory =
                data.data.is_actual_weight_mandatory === '0' ? false : true

            this.is_masterbag = data.data.is_consolidated === '1' ? true : false

            if (this.is_pra_runsheet || this.is_masterbag) {
                this.disable_hub_delivery = true
            }

            this.isAllowed = data.status.is_allowed
            this.messageIsAllowed = data.status.message

            let data_destination = data?.data?.destination || null
            if (data_destination) {
                this.destinationLabel =
                    data_destination?.node_name + ' (' + data_destination?.node_code + ')'
                this.destinationValue = data_destination?.node_id
            }

            let data_validation = data.validation || []
            if (data_validation.length > 0) {
                this.routing = data_validation?.[0]?.destination || '-'
            } else {
                this.routing = 'all_routing'
            }

            let data_validation_service = data.validation_service || []
            if (data_validation_service.length > 0) {
                this.service = data_validation_service
            } else {
                this.service = ['all_service']
            }

            this.employee = data.employee_name ? data.employee_name : ''
            this.disabledApprove = data.data.is_approve === 0 ? false : true
            this.disabledAddTransit = data.data.is_approve === 0 ? false : true
            this.is_approve = data.data.is_approve === 0 ? false : true
            this.actual_weight = data.data.bag_actual_weight

            this.validation = data.data.validation

            this.validation_reference = String(data.data.validation_reference || '').split(',')

            if (this.validation === 'COURIER') {
                await this.getDataCourier()
                this.validation_reference = this.courierArr
                    .filter((item) => this.validation_reference.includes(String(item.value)))
                    .map((item) => item.label)
            }

            this.loading = loading
        },

        inputFocus() {
            this.autoCompleteUrl = `${this.URL.node}/${this.listenNodeId}/destination-link?n=${this.listenNodeId}`
        },
        async querySearch(queryString, cb) {
            try {
                const res = await axios.get(
                    this.autoCompleteUrl + `&s=${queryString}`,
                    this.Helper.header()
                )
                const result = res.data.data || []
                const suggestions = result.map((item) => {
                    const value = item.node_name || ''
                    return { value, data: item }
                })
                cb(suggestions)
            } catch (error) {
                console.error('error', error)
            }
        },

        async getDataCourier() {
            this.loading = true
            try {
                const res = await axios.get(
                    `${this.URL.courier_delivery}/list?n=${this.listenNodeId}`,
                    this.Helper.header()
                )
                if (res.data.data.length > 0) {
                    let arr = res.data.data
                    arr = arr.map((item) => ({
                        label: item.employee_name + ' ( ' + item.employee_code + ' ) ',
                        value: item.employee_id,
                    }))
                    this.courierArr = arr
                } else {
                    this.courierArr = []
                    this.openNotification(
                        'warn',
                        null,
                        'Courier data is empty!',
                        ' Please create a new courier delivery'
                    )
                }
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code || '',
                    'Failed',
                    err?.response?.data?.message || 'Something went wrong'
                )
            } finally {
                this.loading = false
            }
        },
        getBagIdParam() {
            this.bag_id = this.$route.params.id
        },
        updateValue(key, val, info) {
            switch (key) {
                case 'routing':
                    this.routing = val
                    this.updateBag()
                    break
                case 'service':
                    this.service = val
                    this.updateBag()
                    break
                case 'destination':
                    if (info?.data) {
                        this.destinationValue = info?.data?.node_id
                        this.updateBag()
                    }
                    break
                default:
                    break
            }
        },
        async updateBag() {
            this.loading = true
            try {
                const res = await axios.put(
                    `${this.URL.bag}/${this.bag_id}?n=${this.listenNodeId}`,
                    {
                        bag_number: this.bag_id,
                        bag_actual_weight: this.weight || this.actual_weight,
                        destination_node_id: this.destinationValue,
                        service: this.service,
                        routing: this.routing,
                    },
                    this.Helper.header()
                )
                this.openNotification('success', null, 'Success', 'Update surat jalan success')
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code || '',
                    'Failed',
                    err?.response?.data?.message || 'Something went wrong'
                )
            } finally {
                this.loading = false
                this.handleClearForm()
                this.refresh()
            }
        },
        handleClearForm() {
            this.item_number = ''
            this.weight = ''
        },
        async addBagDetail() {
            this.loading = true
            try {
                const res = await axios.post(
                    `${this.URL.bag}/${this.bag_id}/detail?n=${this.listenNodeId}`,
                    {
                        item_number: this.item_number.replace(/\s+/g, ''),
                        is_pra_runsheet: this.is_pra_runsheet,
                        auto_open_bag: this.is_auto_open_bag,
                        is_hub_delivery_validation: this.is_hub_delivery_validation || false,
                    },
                    this.Helper.header()
                )

                this.openNotification('success', null, 'Success', 'Add Bagging is success')
                this.refresh()
            } catch (err) {
                const errorCode = err.response ? err.response.data.code : ''
                const errorMessage = err.response
                    ? err.response.data.message
                    : 'something went wrong'

                if (errorCode === 'CORE-1135') {
                    this.openNotificationCenter('danger', errorCode, 'FAILED', errorMessage)
                } else {
                    this.openNotification('danger', errorCode, 'FAILED', errorMessage)
                }
            } finally {
                this.loading = false
                this.handleClearForm()
            }
        },
        print() {
            let routeData = this.$router.resolve({
                name: 'printGeneral',
                params: {
                    id: encodeURIComponent(this.bag_id),
                    type: 'bag',
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
        back() {
            this.$router.push('/inventory/bag')
            this.setRoutePageHistory(this.$route.meta, false)
        },
        onCameraScannerGetData(data) {
            if (
                data &&
                data.event === 'result' &&
                (data.namespace === 'formInputBagging' ||
                    data.namespace === 'formInputBaggingConnote' ||
                    data.namespace === 'formInputBaggingKoli' ||
                    data.namespace === 'formInputBaggingBag')
            ) {
                this.item_number = data.data.text
                this.addBagDetail()
            }
        },
        newBag() {
            this.$router.push('/outgoing/bag')
            this.setRoutePageHistory(this.$route.meta, false)
        },
        openDialogTransit() {
            this.dialogTransitActive = true
            this.setInputFocus2(this.dialogTransitActive)
        },
        closeDialogTransit() {
            this.dialogTransitActive = false
            this.setInputFocus2(this.dialogTransitActive)
        },
        editBag() {
            this.dialogHelpdeskEditBag = true
        },
        setInputFocus() {
            if (this.is_masterbag) {
                this.setActiveInput('formInputBaggingBag')
            } else {
                this.setActiveInput('formInputBaggingKoli')
            }
        },
        setInputFocus2(val) {
            this.dialogActive = val
            if (this.is_masterbag) {
                this.setActiveInput('formInputBaggingBag', null, () => this.dialogActive)
            } else {
                this.setActiveInput('formInputBaggingKoli', null, () => this.dialogActive)
            }
        },
        approveAction(val) {
            if (
                this.isAllowed &&
                !this.is_pra_runsheet &&
                this.actual_weight == 0 &&
                this.is_actual_weight_mandatory
            ) {
                this.openNotification(
                    'warning',
                    null,
                    'Empty Weight!',
                    'Bag Actual Weight must not be 0!'
                )
            } else {
                this.updateApprove(val)
            }
        },
        updateApprove(val) {
            this.toggle_approve = {
                is_approve: val ? 1 : 0,
            }
            if (val) {
                this.confirmationApprove(val)
            } else {
                this.activeDialogConfirmUnpproveBag = true
            }
        },
        confirmUnpproveBag() {
            this.confirmationApprove(false)
            this.activeDialogConfirmUnpproveBag = false
            this.refresh()
        },
        closeDialog() {
            this.dialogHelpdeskEditBag = false
            this.refresh()
        },
        closeDialogConfirmUnpproveBag() {
            this.activeDialogConfirmUnpproveBag = false
        },
        async confirmationApprove(val) {
            this.loadingConfirmUnpproveBag = true
            await axios
                .put(
                    `${this.URL.approval}-bag/${this.bag_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.toggle_approve),
                    this.Helper.header()
                )
                .then((res) => {
                    this.toggle_approve = {}
                    this.disabledApprove = val
                    this.openNotification('success', null, 'Success', res?.data?.message)
                    this.refresh()
                })
                .catch((err) => {
                    this.openNotification(
                        'danger',
                        err?.response?.data?.code ?? '',
                        'Approve FAILED!',
                        err?.response?.data?.message ?? `Approve Bag ${this.bag_id} Failed`
                    )
                })
            this.loadingConfirmUnpproveBag = false
        },
        focusWeightInput() {
            this.setActiveInput('weight')
        },
        focusDestinationInput() {
            this.setActiveInput('destination')
        },
    },
    mounted() {
        this.getBagIdParam()
        this.setInputFocus() // TODO: RECHECK
        this.handlePrintShortcut(this.print)
    },
}
</script>
<style lang="scss">
.bagging {
    min-height: 50vh;
    margin-top: 2em;
}

.in-get-bag {
    font-size: 16px;
}

.box {
    margin-top: 20px !important;
}
</style>

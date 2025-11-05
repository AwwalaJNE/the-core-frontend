<template>
    <dialog-master
        :actived="listenActive"
        :loading="listenLoading"
        :closeDialog="cancel2"
        width="lg"
    >
        <template v-slot:header>
            {{ listenTitle }}
        </template>

        <template v-slot:content>
            <vs-row>
                <vs-col w="12">
                    <progress-stepper
                        :steps="steps"
                        :step-validators="[
                            validateTypeSection,
                            validateSuratMuatanForm,
                            validateBagSection,
                        ]"
                        @invalid-step="handleInvalidStep"
                        @valid-step="handleValidStep"
                        @cancel="cancel2"
                        @submit="handleSubmit"
                    >
                        <template #step-0>
                            <div class="text-left">
                                <h2>Choose Type</h2>
                                <p>
                                    Please select your surat muatan type, bear in mind that each
                                    type has its own purpose
                                </p>
                            </div>

                            <div class="surat-muatan-container">
                                <div
                                    v-for="(item, index) in suratMuatanTypeArray"
                                    :key="index"
                                    :class="[
                                        'surat-muatan-box',
                                        { active: sm_type.value === item.value },
                                    ]"
                                    :data-testid="`bag-${item.label}`"
                                    @click="selectTipeSuratMuatan(item)"
                                >
                                    <i
                                        v-if="sm_type.value === item.value"
                                        class="bx bx-check check-icon"
                                    ></i>
                                    <i :class="item.icon" class="bag-icon"></i>
                                    <div class="bag-label">{{ item.label }}</div>
                                </div>
                            </div>
                        </template>
                        <template #step-1>
                            <div class="text-left">
                                <h2>Fill Mandatory Attributes</h2>
                                <p>
                                    Please fill up the forms, additionally you can choose from
                                    available stock and add some vehicles
                                </p>
                            </div>

                            <div>
                                <vs-row
                                    align="center"
                                    justify="end"
                                    style="position: absolute; margin-top: 0.5em"
                                >
                                    <vs-col w="2">
                                        <vs-button
                                            flat
                                            block
                                            :active="true"
                                            :data-testid="`create-button-sm-stock`"
                                            @click="openDialog('sm_stock')"
                                        >
                                            Stock
                                        </vs-button>
                                    </vs-col>
                                </vs-row>
                                <form-input-controller
                                    ref="formSuratMuatanBulkController"
                                    typeForm="surat_muatan_bulk"
                                    :querySearch="querySearch"
                                    @formData="formData"
                                    @inputFocus="inputFocus"
                                    @onChangeCustom="onChangeCustom"
                                    @handleIconClick="openDialog('search_sm_stock')"
                                />
                                <vs-row align="center" style="margin-top: 1em">
                                    <template v-if="vehicle.length === 0">
                                        <vs-col w="6">
                                            <vs-button
                                                shadow
                                                :active="false"
                                                :data-testid="`add-vehicle-button`"
                                                @click="openDialog('manifest_vehicle')"
                                            >
                                                <i class="bx bx-plus"></i> Vehicle
                                            </vs-button>
                                        </vs-col>
                                        <vs-col w="6" justify="end">
                                            <div
                                                class="container-clear-item"
                                                :data-testid="`reset-button`"
                                                @click="
                                                    handleClearForm()
                                                    resetForm()
                                                "
                                            >
                                                Reset Inputs
                                            </div>
                                        </vs-col>
                                    </template>
                                    <template v-else>
                                        <vs-row align="center" justify="space-between">
                                            <h3 class="title">List Vehicle</h3>
                                            <vs-button
                                                shadow
                                                :active="false"
                                                :disabled="isDisabled"
                                                :data-testid="`more-vehicle-button`"
                                                @click="openDialog('manifest_vehicle')"
                                                style="min-width: 120px"
                                            >
                                                <i class="bx bx-plus"></i> More Vehicle
                                            </vs-button>
                                        </vs-row>

                                        <vs-row>
                                            <vs-col w="12">
                                                <radio-with-card
                                                    :name="'manifest_vehicle'"
                                                    :value-data="vehicle"
                                                    :selected-value="listenSelectedManifestVehicle"
                                                    :isRemoveButton="true"
                                                    @updateValue="chooseRow"
                                                    @removeRow="removeRow"
                                                />
                                            </vs-col>
                                        </vs-row>

                                        <vs-row align="center">
                                            <vs-col w="12" justify="end">
                                                <div
                                                    class="container-clear-item"
                                                    :data-testid="`reset-button`"
                                                    @click="
                                                        handleClearForm()
                                                        resetForm()
                                                    "
                                                >
                                                    Reset Inputs
                                                </div>
                                            </vs-col>
                                        </vs-row>
                                    </template>
                                </vs-row>
                            </div>
                        </template>
                        <template #step-2>
                            <div class="text-left">
                                <h2>Validate Each Item</h2>
                                <p>Please scan each master bag / bag number here</p>
                            </div>

                            <vs-row style="gap: 1em">
                                <vs-col xs="12" sm="6" lg="6">
                                    <input-general
                                        name=""
                                        rules=""
                                        formKey="scanItemNumber"
                                        ref="scanItemNumber"
                                        :valueData="item_number"
                                        :typeInput="`text`"
                                        :enter_to_update="true"
                                        :hasBarcode="true"
                                        @click-icon="handleIconClick"
                                        @updateValue="updateValue"
                                        @enterUpdate="validateScanItem"
                                    >
                                        <template #icon>
                                            <i class="bx bx-barcode-reader"></i>
                                        </template>
                                    </input-general>
                                </vs-col>

                                <vs-col w="12">
                                    <table-master
                                        hideColumnKey="validate-surat-muatan-bulk"
                                        :dataTable="dataTable"
                                        :dataColumn="dataColumn"
                                        :tableLoading="listenLoading"
                                        :hasAction="false"
                                        :hasPagination="false"
                                    />
                                </vs-col>
                            </vs-row>
                        </template>
                    </progress-stepper>
                </vs-col>
            </vs-row>
            <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />
            <dialog-create-edit-stock
                title="Create Surat Muatan Stock"
                source="sm_create"
                :active="dialogStockActive"
                :closeDialog="() => closeDialog2('sm_stock')"
                @handleCreateManifestStock="handleCreateManifestStock"
            />

            <dialog-select-manifest-stock
                title="Pilih Stock"
                :active="dialogSearchStockActive"
                :close="() => closeDialog2('search_sm_stock')"
                :mode="parseInt(sm_type.value)"
                @selectManifest="handleSelectManifest"
            />

            <dialog-manage-vehicle-manifest
                title="Manifest Vehicle"
                :manifest_number="manifest_number"
                :manifest_method="parseInt(sm_type.value)"
                :active="dialogManifestVehicleActive"
                :closeDialog="() => closeDialog2('manifest_vehicle')"
                :submitType="'prefill'"
                @updateVehicleValue="updateVehicleValue"
            />
        </template>
    </dialog-master>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'

import CameraScanner from '@/components/scanner/camera'
import DialogMaster from '@/components/dialog/dialogMaster'
import FormInputController from '@/components/form/formInputController'
import InputGeneral from '@/components/input/general'
import ProgressStepper from '@/components/progress/progressStepper'
import RadioWithCard from '@/components/input/radioWithCard'
import TableMaster from '@/components/table/tableMaster'

import DialogCreateEditStock from '@/views/settings/suratMuatan/stock/dialogCreateEdit'
import DialogManageVehicleManifest from '@/views/transport/manifestVehicle/dialogCreateManage'
import DialogSelectManifestStock from '@/views/transport/manifestNew/dialogSelectManifestStock'

export default {
    name: 'Inbound-Dialog-Bulk-Surat-Muatan',
    mixins: [master],
    components: {
        CameraScanner,
        'dialog-create-edit-stock': DialogCreateEditStock,
        'dialog-manage-vehicle-manifest': DialogManageVehicleManifest,
        'dialog-select-manifest-stock': DialogSelectManifestStock,
        'dialog-master': DialogMaster,
        'form-input-controller': FormInputController,
        'input-general': InputGeneral,
        'progress-stepper': ProgressStepper,
        'radio-with-card': RadioWithCard,
        'table-master': TableMaster,
    },
    props: {
        active: Boolean,
        closeDialog: Function,
        dataItem: Array,
        title: String,
    },
    computed: {
        listenActive() {
            return this.active
        },
        listenLoading() {
            return this.loading
        },
        listenTitle() {
            return this.title
        },
        listenSelectedManifestVehicle() {
            return this.selected_manifest_vehicle || ''
        },
    },
    watch: {
        dataItem: function (val) {
            if (val !== undefined) {
                this.dataTable = val
            }
        },
        active: async function (val) {
            if (val !== undefined) {
            }
        },
    },
    data() {
        return {
            status_arr: [],

            loading: false,

            isDisabled: false,
            sm_type: '',
            suratMuatanTypeArray: [
                {
                    label: 'DARAT\n(TRUK)',
                    value: '2',
                    prefix: 'SMDT-',
                    icon: 'bx bxs-truck',
                },
                {
                    label: 'DARAT\n(KERETA)',
                    value: '3',
                    prefix: 'SMDK-',
                    icon: 'bx bxs-train',
                },
                {
                    label: 'UDARA\n(PESAWAT)',
                    value: '1',
                    prefix: 'SMU-',
                    icon: 'bx bxs-plane-alt',
                },
                {
                    label: 'LAUT\n(KAPAL)',
                    value: '4',
                    prefix: 'SML-',
                    icon: 'bx bxs-ship',
                },
            ],

            steps: ['Choose Moda', 'Fill Mandatory Attributes', 'Validate Each Item'],

            dataTable: [],
            dataColumn: [
                {
                    label: 'Bag Number',
                    key: 'bag_number',
                    width: 'sm',
                },
                {
                    label: 'Destination',
                    key: 'bag_destination_node_code',
                    width: 'sm',
                },
                {
                    label: 'Type',
                    key: 'bag_type',
                    width: 'sm',
                },
                {
                    label: 'Status',
                    key: 'status',
                    type: 'status',
                    width: 'sm',
                },
            ],
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1,
            },

            item_number: '',
            list_item_no: [],

            vehicle: [],
            vehicle_form: [],

            form: {},
            manifest_number: '',
            dialogStockActive: false,
            dialogManifestVehicleActive: false,
            dialogSearchStockActive: false,

            selected_manifest_vehicle: '',
        }
    },
    methods: {
        selectTipeSuratMuatan(item) {
            this.sm_type = item
            this.isDisabled = false
        },
        handleClearForm() {
            this.sm_type = ''
            this.$refs?.formSuratMuatanBulkController?.handleClearForm()
            this.form = {}
            this.vehicle = []
            this.vehicle_form = []
            this.item_number = ''
        },
        resetForm() {
            this.$store.dispatch('SET_SURAT_MUATAN_BULK_NODE_ID_DESTINATION', '')
            this.$store.dispatch('SET_SURAT_MUATAN_BULK_NODE_ID_DESTINATION_ValueData', {})
            this.$store.dispatch('SET_SURAT_MUATAN_BULK_ETD', '')
            this.$store.dispatch('SET_SURAT_MUATAN_BULK_ETA', '')

            this.$store.dispatch('SET_SURAT_MUATAN_BULK_MANIFEST_NUMBER_isDisabled', false)
            this.$store.dispatch('SET_SURAT_MUATAN_BULK_NODE_ID_ORIGIN_isDisabled', false)
            this.$store.dispatch('SET_SURAT_MUATAN_BULK_NODE_ID_DESTINATION_isDisabled', false)
            this.$store.dispatch('SET_SURAT_MUATAN_BULK_ETD_isDisabled', false)
            this.$store.dispatch('SET_SURAT_MUATAN_BULK_ETA_isDisabled', false)
        },
        cancel() {
            this.$emit('closeDialog')
        },
        cancel2() {
            this.handleClearForm
            this.cancel()
        },
        validateTypeSection() {
            return this.sm_type.value
        },
        validateSuratMuatanForm() {
            // TODO: RECHECK THIS< HARUS KLIK 2X
            this.$refs.formSuratMuatanBulkController.handleSubmit()

            return this.$refs.formSuratMuatanBulkController.hasErrors()
        },
        validateBagSection() {
            this.list_item_no = this.dataTable
                .filter((bag) => bag.status === true)
                .map((bag) => bag.bag_number)
            return this.list_item_no.length > 0
        },
        handleInvalidStep(stepIndex) {
            if (stepIndex === 0)
                this.openNotification('danger', '', 'Failed', 'Wajib memilih tipe surat muatan')
            else if (stepIndex === 2)
                this.openNotification('danger', '', 'Failed', 'No items have been validated')
        },
        handleValidStep(stepIndex) {
            if (stepIndex === 0) this.setDefaultData()
            else if (stepIndex === 1) return
            else if (stepIndex === 2) return
        },
        updateValue(key, val) {
            switch (key) {
                case 'scanItemNumber':
                    this.item_number = val
                    break
                default:
            }
        },
        validateScanItem() {
            let found = false

            this.dataTable.forEach((bag) => {
                if (bag.bag_number === this.item_number) {
                    bag.status = true
                    found = true
                }
            })

            if (!found) {
                this.openNotification('danger', '', 'Failed', 'Item number not found')
            }
            this.item_number = ''
        },
        handleIconClick() {
            this.$refs.cameraScanner.open('item_number')
        },
        onCameraScannerGetData(data) {
            if (data?.event === 'result' && data.namespace === 'item_number') {
                this.item_number = data.data.text
            }
        },
        async handleSubmit(done) {
            // TODO: RECHECK WHY FORM NOT UPDATED
            console.log('CEK', this.form)
            let form = {
                ...this.form,
                manifest_method_id: parseInt(this.sm_type.value),
                manifest_item: this.list_item_no,
            }

            await this.createBulkSuratMuatan(form, done)
        },
        async createBulkSuratMuatan(form, done) {
            this.loading = true

            try {
                const res = await axios.post(
                    `${this.URL.revamp_surat_muatan_bulk}?n=${this.listenNodeId}`,
                    JSON.stringify(form),
                    this.Helper.header()
                )

                this.openNotification('success', null, 'Success', 'Create surat muatan success')
                done(true)
                this.cancel2()
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
                done(false)
            } finally {
                this.loading = false
            }
        },
        openDialog(type) {
            if (type === 'sm_stock') {
                this.dialogStockActive = true
            } else if (type === 'manifest_vehicle') {
                this.dialogManifestVehicleActive = true
            } else if (type === 'search_sm_stock') {
                this.dialogSearchStockActive = true
            }
        },
        closeDialog2(type) {
            if (type === 'sm_stock') {
                this.dialogStockActive = false
            } else if (type === 'manifest_vehicle') {
                this.dialogManifestVehicleActive = false
            } else if (type === 'search_sm_stock') {
                this.dialogSearchStockActive = false
            }
        },
        handleSelectManifest(val) {
            this.manifest_number = val.manifest_number
            // this.manifest_method_id = parseInt(val.vehicle_mode_id)
            // this.vehicle_type_id = val.vehicle_type_id
            this.$store.dispatch(
                'SET_SURAT_MUATAN_BULK_MANIFEST_PREFIX',
                val.vehicle_prefix_name + '-'
            )
            this.$store.dispatch('SET_SURAT_MUATAN_BULK_MANIFEST_NUMBER', val.manifest_number)
            this.$store.dispatch(
                'SET_SURAT_MUATAN_BULK_NODE_ID_ORIGIN',
                val?.node_name_origin + ' (' + val?.node_code_origin + ')'
            )
            this.$store.dispatch(
                'SET_SURAT_MUATAN_BULK_NODE_ID_DESTINATION',
                val?.node_name_destination + ' (' + val?.node_code_destination + ')'
            )
            this.$store.dispatch('SET_SURAT_MUATAN_BULK_ETD', val.etd)
            this.$store.dispatch('SET_SURAT_MUATAN_BULK_ETA', val.eta)

            this.$store.dispatch(
                'SET_SURAT_MUATAN_BULK_MANIFEST_PREFIX_ValueData',
                val.vehicle_prefix_name + '-'
            )
            this.$store.dispatch(
                'SET_SURAT_MUATAN_BULK_NODE_ID_ORIGIN_ValueData',
                val.node_id_origin
            )
            this.$store.dispatch(
                'SET_SURAT_MUATAN_BULK_NODE_ID_DESTINATION_ValueData',
                val.node_id_destination
            )

            this.$store.dispatch('SET_SURAT_MUATAN_BULK_MANIFEST_NUMBER_isDisabled', true)
            this.$store.dispatch('SET_SURAT_MUATAN_BULK_NODE_ID_ORIGIN_isDisabled', true)
            this.$store.dispatch('SET_SURAT_MUATAN_BULK_NODE_ID_DESTINATION_isDisabled', true)
            this.$store.dispatch('SET_SURAT_MUATAN_BULK_ETD_isDisabled', true)
            this.$store.dispatch('SET_SURAT_MUATAN_BULK_ETA_isDisabled', true)

            this.getManifestVehicleSMStock()
        },
        handleCreateManifestStock(val) {
            this.manifest_number = val
            this.getAndApplySmStock()
            this.getManifestVehicleSMStock()
        },
        async getAndApplySmStock() {
            this.loading = true
            try {
                const res = await axios.get(
                    `${this.URL.sm_stock}/get-by-manifest/${this.manifest_number}?n=${this.listenNodeId}`,
                    this.Helper.header()
                )
                let arr = res.data.data

                this.manifest_method_id = parseInt(arr.vehicle_mode_id)
                this.vehicle_type_id = arr.vehicle_type_id
                this.$store.dispatch(
                    'SET_SURAT_MUATAN_BULK_MANIFEST_PREFIX',
                    arr.vehicle_prefix_name + '-'
                )
                this.$store.dispatch('SET_SURAT_MUATAN_BULK_MANIFEST_NUMBER', arr.manifest_number)
                this.$store.dispatch(
                    'SET_SURAT_MUATAN_BULK_MANIFEST_METHOD_ID',
                    parseInt(arr.vehicle_mode_id)
                )
                this.$store.dispatch(
                    'SET_SURAT_MUATAN_BULK_NODE_ID_ORIGIN',
                    arr.node_name_origin + ' (' + arr.node_code_origin + ')'
                )
                this.$store.dispatch(
                    'SET_SURAT_MUATAN_BULK_NODE_ID_DESTINATION',
                    arr.node_name_destination + ' (' + arr.node_code_destination + ')'
                )
                this.$store.dispatch('SET_SURAT_MUATAN_BULK_ETD', arr.etd)
                this.$store.dispatch('SET_SURAT_MUATAN_BULK_ETA', arr.eta)

                this.$store.dispatch(
                    'SET_SURAT_MUATAN_BULK_MANIFEST_PREFIX_ValueData',
                    arr.vehicle_prefix_name + '-'
                )
                this.$store.dispatch(
                    'SET_SURAT_MUATAN_BULK_NODE_ID_ORIGIN_ValueData',
                    arr.node_id_origin
                )
                this.$store.dispatch(
                    'SET_SURAT_MUATAN_BULK_NODE_ID_DESTINATION_ValueData',
                    arr.node_id_destination
                )

                this.$store.dispatch('SET_SURAT_MUATAN_BULK_MANIFEST_NUMBER_isDisabled', true)
                this.$store.dispatch('SET_SURAT_MUATAN_BULK_NODE_ID_ORIGIN_isDisabled', true)
                this.$store.dispatch('SET_SURAT_MUATAN_BULK_NODE_ID_DESTINATION_isDisabled', true)
                this.$store.dispatch('SET_SURAT_MUATAN_BULK_ETD_isDisabled', true)
                this.$store.dispatch('SET_SURAT_MUATAN_BULK_ETA_isDisabled', true)

                this.loading = false
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code || '',
                    'Failed',
                    err?.response?.data?.message || 'Something went wronasdsag'
                )
                this.loading = false
            }
        },
        async getManifestVehicleSMStock() {
            this.loading = true
            try {
                const res = await axios.get(
                    `${this.URL.manifest_vehicle}/${this.manifest_number}?n=${this.listenNodeId}`,
                    this.Helper.header()
                )

                let arr = res.data.data

                if (this.selected_manifest_vehicle === '')
                    this.selected_manifest_vehicle = arr.find(
                        (item) => item.status === 'ACTIVE'
                    )?.manifest_vehicle_log_id

                this.vehicle = arr.map((item) => ({
                    key: item.manifest_vehicle_log_id,
                    state: {
                        origin_vehicle: item?.name_origin_tlc || '',
                        destination_vehicle: item?.name_destination_tlc || '',
                        origin_vehicle_tlc: item?.origin_tlc || '',
                        destination_vehicle_tlc: item?.destination_tlc || '',
                        vehicle_id: item?.vehicle_name || '',
                        pic_employee_id: item?.employee_name || '',
                        flight_number: item?.flight_number || '',
                        flight_schedule: this.formatTimezone(item?.flight_schedule) || '',
                        etd_vehicle: this.formatTimezone(item?.etd) || '',
                        eta_vehicle: this.formatTimezone(item?.eta) || '',
                        is_active: item?.status === 'ACTIVE',
                    },
                }))

                this.vehicle_form = arr.map((item, idx) => ({
                    key: item.manifest_vehicle_log_id,
                    state: {
                        vehicle_id: item?.vehicle_id || '',
                        vehicle_type_id: item?.vehicle_type_id || '',
                        employee_driver_id: item?.pic_employee_id || '',
                        origin_branch_code: item?.origin_tlc || '',
                        destination_branch_code: item?.destination_tlc || '',
                        flight_number: item?.flight_number || '',
                        flight_schedule: this.manifest_method_id === 1 ? item?.etd : '' || '',
                        etd: item?.etd || '',
                        eta: item?.eta || '',
                        is_active: item?.status === 'ACTIVE',
                    },
                }))
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
        chooseRow(newKey, done) {
            this.selected_manifest_vehicle = newKey
            this.vehicle = this.vehicle.map((item) => ({
                ...item,
                state: {
                    ...item.state,
                    is_active: item.key === newKey,
                },
            }))
            this.vehicle_form = this.vehicle_form.map((item) => ({
                ...item,
                state: {
                    ...item.state,
                    flight_schedule: this.formatToWIB(item?.flight_schedule) || '',
                    etd: this.formatToWIB(item?.etd_vehicle) || '',
                    eta: this.formatToWIB(item?.eta_vehicle) || '',
                    is_active: item.key === newKey,
                },
            }))
        },
        removeRow(row_id) {
            this.vehicle = this.vehicle.filter((item) => item.key !== row_id)
            this.vehicle_form = this.vehicle_form.filter((item) => item.key !== row_id)
        },
        updateVehicleValue(form) {
            let form_id = Date.now() + Math.random()

            if (this.selected_manifest_vehicle === '') this.selected_manifest_vehicle = form_id

            let created_vehicle = {
                key: form_id,
                state: {
                    origin_vehicle: form?.origin_vehicle_name || '',
                    destination_vehicle: form?.destination_vehicle_name || '',
                    origin_vehicle_tlc: form?.origin_vehicle?.value || form.origin_vehicle || '',
                    destination_vehicle_tlc:
                        form?.destination_vehicle?.value || form.destination_vehicle || '',
                    vehicle_id: form.vehicle_name,
                    pic_employee_id:
                        form.pic_employee_id?.employee_name || form?.pic_employee_id || '',
                    flight_number: form.flight_number,
                    flight_schedule: form.flight_schedule,
                    etd_vehicle: form.etd_vehicle,
                    eta_vehicle: form.eta_vehicle,
                    is_active: this.vehicle.length === 0,
                },
            }

            let vehicle_form = {
                key: form_id,
                state: {
                    vehicle_id: form?.vehicle_id || '',
                    vehicle_type_id: form?.vehicle_type_id || '',
                    pic_employee_id: form?.pic_employee_id?.employee_id || '',
                    flight_number: form?.flight_number || '',
                    flight_schedule: this.formatToWIB(form?.flight_schedule) || '',
                    etd: this.formatToWIB(form?.etd_vehicle) || '',
                    eta: this.formatToWIB(form?.eta_vehicle) || '',
                    origin_branch_code: form?.origin_vehicle || '',
                    destination_branch_code: form?.destination_vehicle || '',
                    is_active: this.vehicle.length === 0,
                },
            }

            this.vehicle.push(created_vehicle)
            this.vehicle_form.push(vehicle_form)
        },
        async querySearch(queryString, cb) {
            try {
                const res = await axios.get(
                    this.autoComplateUrl + `&s=${queryString}`,
                    this.Helper.header()
                )
                const result = res.data.data || []
                const suggestions = result.map((item) => {
                    const value =
                        item.node_name ||
                        item.branch_name ||
                        item.vehicle_name ||
                        item.employee_name ||
                        ''
                    return { value, data: item }
                })
                cb(suggestions)
            } catch (error) {
                console.error('error', error)
            }
        },
        inputFocus(info) {
            if (info?.key) {
                switch (info.key) {
                    case 'node_id_origin':
                        this.autoComplateUrl = `${this.URL.branch_list_v2}?n=${this.listenNodeId}`
                        break
                    case 'node_id_destination':
                        this.autoComplateUrl = `${this.URL.branch_list_v2}?n=${this.listenNodeId}`
                        break
                    default:
                        break
                }
            }
        },
        onChangeCustom(type, val, info = {}) {},
        formData(form) {
            let userTimezone = this.$ls.get('timezone')

            form.node_id_origin =
                form.node_id_origin?.node_id ||
                form.node_id_origin ||
                this.listenCurrentNode.node_id
            form.node_id_destination = form.node_id_destination?.node_id || form.node_id_destination

            form.vehicles = this.vehicle_form.map((item) => item.state)

            let active_vehicle = this.vehicle_form.find((item) => item.state.is_active)?.state
            form.vehicle_id = active_vehicle?.vehicle_id
            form.vehicle_type_id = active_vehicle?.vehicle_type_id
            form.vehicle_mode_id = active_vehicle?.vehicle_mode_id

            if (form.manifest_prefix && form.manifest_number) {
                form.manifest_number = `${form.manifest_prefix}${form.manifest_number}`
            }

            this.form = form

            console.log('CEKK', this.form, form)

            if (this.form.eta > this.form.etd) {
                this.form.etd = this.Helper.convertTimezone(
                    this.form.etd,
                    userTimezone,
                    'Asia/Jakarta'
                )
                this.form.eta = this.Helper.convertTimezone(
                    this.form.eta,
                    userTimezone,
                    'Asia/Jakarta'
                )
                // this.form.pickup_node_id_requestor = this.listenNodeId
            } else {
                this.openNotification(
                    'warning',
                    'Wrong Input in ETA/ETD field',
                    'ETA must more than ETD'
                )
            }
        },
        setDefaultData() {
            this.$store.dispatch(
                'SET_SURAT_MUATAN_BULK_NODE_ID_ORIGIN',
                this.listenCurrentNode.branch_name
            )
            this.$store.dispatch('SET_SURAT_MUATAN_BULK_MANIFEST_PREFIX', this.sm_type.prefix)
        },
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>
<style lang="scss" scoped>
.surat-muatan-container {
    display: grid;
    gap: 16px;

    grid-template-columns: repeat(4, 1fr);

    .surat-muatan-box {
        border-radius: 16px;
        text-align: center;
        padding: 16px;
        height: 120px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.2s ease;
        cursor: pointer;
        position: relative;

        i {
            font-size: 40px;
            color: #333;
        }

        span,
        div {
            font-size: 14px;
            font-weight: 500;
        }

        .check-icon {
            position: absolute;
            top: -10px;
            right: -10px;
            background: $coreBlue;
            color: white !important;
            border-radius: 50%;
            font-size: 25px;
        }

        .bag-label {
            white-space: pre-line;
        }

        &.active {
            box-shadow: 0 1px 4px $coreBlue;
            color: $coreBlue;

            i {
                color: $coreBlue;
            }
        }
    }

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
}
</style>

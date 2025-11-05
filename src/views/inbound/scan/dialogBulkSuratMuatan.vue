<template>
    <dialog-master
        :actived="listenActive"
        :loading="listenLoading"
        :closeDialog="cancel"
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
                        @cancel="cancel"
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
                                <vs-row align="center" justify="end" style="position: absolute">
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
                                />
                                <vs-button
                                    shadow
                                    :active="false"
                                    :data-testid="`add-vehicle-button`"
                                    @click="openDialog('manifest_vehicle')"
                                    style="margin-top: 1em"
                                >
                                    <i class="bx bx-plus"></i> Vehicle
                                </vs-button>
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
import TableMaster from '@/components/table/tableMaster'

import DialogCreateEditStock from '@/views/settings/suratMuatan/stock/dialogCreateEdit'

export default {
    name: 'Inbound-Dialog-Bulk-Surat-Muatan',
    mixins: [master],
    components: {
        CameraScanner,
        'dialog-create-edit-stock': DialogCreateEditStock,
        'dialog-master': DialogMaster,
        'form-input-controller': FormInputController,
        'input-general': InputGeneral,
        'progress-stepper': ProgressStepper,
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

            form: {},
            manifest_number: '',
            dialogStockActive: false,
            dialogManifestVehicleActive: true,
        }
    },
    methods: {
        selectTipeSuratMuatan(item) {
            this.sm_type = item
            this.isDisabled = false
        },
        handleClearForm() {
            this.sm_type = ''
        },
        cancel() {
            this.handleClearForm()
            this.$emit('closeDialog')
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
            console.log('CEK')
            let form = {
                auto_depart: true,
                manifest_method_id: 2,
                manifest_prefix: 'SMDT-',
                manifest_number: 'SMDT-758275827582578',
                max_weight: '100',
                node_id_origin: 84185,
                node_id_destination: 83549,
                etd: '2025-10-30 00:00:00',
                eta: '2025-10-31 00:00:00',
                vehicles: [
                    {
                        vehicle_id: 1979,
                        vehicle_type_id: '2',
                        pic_employee_id: 666,
                        flight_number: '',
                        flight_schedule: '',
                        etd: '2025-10-30 00:00:00',
                        eta: '2025-10-31 00:00:00',
                        origin_branch_code: '',
                        destination_branch_code: '',
                        is_active: true,
                    },
                ],
                vehicle_id: 1979,
                vehicle_type_id: '2',
                pickup_node_id_requestor: 84185,
                manifest_item: ['OM/BDO/SUX/1761790401802', 'OM/BDO/SUX/1761790401803'],
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
                this.cancel()
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
            }
        },
        closeDialog2(type) {
            if (type === 'sm_stock') {
                this.dialogStockActive = false
            } else if (type === 'manifest_vehicle') {
                this.dialogManifestVehicleActive = false
            }
        },
        handleCreateManifestStock(val) {
            // this.handleClearForm()
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
            this.form = form
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

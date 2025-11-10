<template>
    <div>
        <dialog-master
            width="lg"
            :actived="listenActive"
            :loading="listenLoading"
            :closeDialog="cancel"
        >
            <template v-slot:header>
                <template v-if="Object.keys(editData).length === 0">
                    <div v-copy="listenTitle">
                        {{ listenTitle }}
                    </div>
                </template>
                <template v-else>
                    <vs-row justify="flex-end">
                        <vs-col w="6">
                            <span v-copy="listenTitle">{{ listenTitle }}</span>
                        </vs-col>
                        <vs-col w="3" justify="flex-end" style="display: flex">
                            <template v-if="listenUserRoleName === 'HELPDESK'">
                                <vs-button
                                    class="button-item"
                                    :danger="is_approve === 1"
                                    :disabled="!isDisabledApprove"
                                    @click="approve"
                                >
                                    {{ is_approve === 1 ? 'Unapprove' : 'Approve' }}
                                </vs-button>
                            </template>
                            <template v-else>
                                <vs-button
                                    class="button-item"
                                    :disabled="is_approve === 1 || isDisabledApprove"
                                    @click="approve"
                                >
                                    {{ is_approve === 1 ? 'Approved' : 'Approve' }}
                                </vs-button>
                            </template>
                        </vs-col>
                    </vs-row>
                </template>
            </template>

            <template v-slot:content>
                <template v-if="Object.keys(editData).length === 0">
                    <vs-col xs="12" sm="6" lg="6">
                        <input-general
                            :name="getScanLabel"
                            rules=""
                            formKey="scanBag"
                            ref="scanBag"
                            :valueData="item_number"
                            :typeInput="`text`"
                            :enter_to_update="true"
                            :hasBarcode="true"
                            @click-icon="handleIconClick"
                            @updateValue="updateValue"
                            @enterUpdate="createSuratJalan"
                        >
                            <template #icon>
                                <i class="bx bx-barcode-reader"></i>
                            </template>
                        </input-general>
                    </vs-col>
                </template>
                <template v-else>
                    <div>
                        <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />

                        <div class="nomor-sj" v-if="manifest_do_number">
                            <input-general
                                :name="`No ${listenBreadcrumbTitle}`"
                                :formKey="listenSjType"
                                :valueData="manifest_do_number"
                                :typeInput="`text`"
                                :disabled="true"
                            />
                        </div>

                        <!-- Form Utama -->
                        <form-input-controller
                            ref="formSuratJalan"
                            typeForm="surat_jalan"
                            :dataItem="editData"
                            :isDisabled="isDisabled"
                            @formData="formData"
                            @onChangeCustom="onChangeCustom"
                        />

                        <div class="mt-2 mb-2">
                            <vs-row align="center">
                                <vs-col xs="6" sm="3" lg="3">
                                    <form @submit.prevent="submitSuratJalan">
                                        <input-general
                                            icon-after
                                            :name="getScanLabel"
                                            rules=""
                                            formKey="scanBag"
                                            ref="scanBag"
                                            :valueData="item_number"
                                            :typeInput="`text`"
                                            :disabled="isDisabled || dialogTraceBag"
                                            @click-icon="handleIconClick"
                                            @updateValue="updateValue"
                                        >
                                            <template #icon>
                                                <i class="bx bx-barcode-reader"></i>
                                            </template>
                                        </input-general>
                                    </form>
                                </vs-col>
                            </vs-row>
                            <table-master
                                hideColumnKey="dialog-surat-jalan"
                                :dataTable="dataTable"
                                :dataColumn="datacolumn"
                                :pageSize="pagination.page_size"
                                :page="pagination.page"
                                :limit="pagination.limit"
                                :hasAction="false"
                                :hasPagination="true"
                                :customAction="true"
                                :customActionList="customActionList"
                                @actionUpdate="actionUpdate"
                                @actionLimit="actionLimit"
                                @actionPagination="actionPagination"
                            />
                        </div>
                    </div>
                </template>
            </template>
        </dialog-master>

        <dialog-trace-bag
            title="Trace Bag Activity"
            :active="dialogTraceBag"
            :closeDialog="
                () => {
                    this.dialogTraceBag = false
                    this.setActiveInput('scanBag', 'formSuratJalan', () => this.dialogTraceBag)
                }
            "
            :bag_number="selectedBagNumber"
        />
    </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'
import moment from 'moment'

import CameraScanner from '@/components/scanner/camera'
import DialogMaster from '@/components/dialog/dialogMaster'
import FormInputController from '@/components/form/formInputController'
import InputGeneral from '@/components/input/general'
import TableMaster from '@/components/table/tableMaster'
import Switch from '@/components/input/switch'
import DialogTraceBag from '@/views/transport/suratJalanNew/dialogTraceBag'

export default {
    name: 'transport-surat-jalan-dialog-new',
    mixins: [master],
    components: {
        'dialog-master': DialogMaster,
        'table-master': TableMaster,
        'input-general': InputGeneral,
        'form-input-controller': FormInputController,
        CameraScanner,
        'destination-switch': Switch,
        'dialog-trace-bag': DialogTraceBag,
    },
    props: {
        active: Boolean,
        breadcrumb: String,
        btnRed: String,
        btnBlue: String,
        closeDialog: Function,
        dataItem: Object,
        refresh: Function,
        sj_type: String,
        title: String,
    },
    data() {
        return {
            form: {},
            loading: false,
            manifest_do_number: '',
            dataTable: [],
            datacolumn: [
                {
                    label: 'Item Number',
                    key: 'item_number',
                    width: 'sm',
                },
                {
                    label: 'Trip Status',
                    key: 'status_trip',
                    width: 'sm',
                },
                {
                    label: 'Actual Weight (Kg)',
                    key: 'actual_weight',
                    width: 'sm',
                },
                {
                    label: 'Cost Weight (Kg)',
                    key: 'cost_weight',
                    width: 'sm',
                },
                {
                    label: 'Node Code Destination',
                    key: 'node_code_destination',
                    width: 'sm',
                },
                {
                    label: 'Node Name Destination',
                    key: 'node_name_destination',
                    width: 'sm',
                },
                {
                    label: 'Destination',
                    key: 'destination',
                    width: 'sm',
                },
                {
                    label: 'Type',
                    key: 'item_type',
                    width: 'sm',
                },
                {
                    label: 'Received',
                    key: 'received_status',
                    is_missroute: 'is_missroute',
                    type: 'status',
                    width: 'sm',
                },
            ],
            customActionList: [
                {
                    label: 'Remove',
                    key: 'remove',
                    attribute: '',
                },
                {
                    label: 'Trace Bag',
                    key: 'trace_bag',
                    attribute: 'primary',
                },
            ],
            item_number: '',
            vehicle_max_weight: 0,
            no_moda_angkutan_id: null,
            etd: null,
            estimated_time_in_hour: null,
            manifest_lov: '',
            destinationUnlock: '',
            manifest_lov_list: [
                {
                    label: 'Multi Destination',
                    value: 'ALL',
                },
                {
                    label: 'Single Destination',
                    value: 'SAME DESTINATION',
                },
            ],
            editData: {},
            is_penerusan: true,
            isDisabled: false,
            isDisabledPrint: false,
            isDisabledApprove: false,
            isDestinationEnabled: false,
            is_approve: 0,
            item_remove: '',
            total_weight: 0,
            master_form: {},
            pagination: {
                limit: 10,
                page_size: 1,
                page: 1,
            },
            editData: {},
            destination_name_code: '',
            is_missroute: false,
            dialogTraceBag: false,
            selectedBagNumber: '',
        }
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
        listenDisableSwitch() {
            return this.manifest_do_number ? true : false
        },
        listenBreadcrumbTitle() {
            return this.breadcrumb
        },
        listenSjType() {
            return this.sj_type
        },
        getScanLabel() {
            switch (this.sj_type) {
                case 'SJ':
                    return 'Scan Masterbag / Bag / Koli'
                case 'HBAG':
                    return 'Scan Masterbag / Bag'
                case 'MTS':
                    return 'Scan Koli'
                case 'DO':
                    return 'Scan Masterbag / Bag'
                default:
                    return 'Scan Item'
            }
        },
    },
    watch: {
        dataItem: function (val) {
            if (val !== undefined) {
                this.getEditData(val)
            }
        },
        active: function (val) {
            if (val == true) {
                this.$nextTick(() => {
                    this.setActiveInput('scanBag', 'formSuratJalan', () => this.dialogTraceBag)
                })
                this.getDestination2()
                this.getNoModeAngkutan()
                // this.getLov();
                this.getDriver()
            }
        },
    },
    methods: {
        getEditData(val) {
            this.manifest_do_number = val.manifest_do_number
            this.dataTable = val.detail
            this.is_penerusan = val.is_penerusan === '1'

            this.isDestinationEnabled = val.node_id_destination === null

            this.isDisabled =
                val.status !== 'UNAPPROVED' || val.is_orion === '1' || val.is_approve === 1
            this.isDisabledPrint = val.status === 'CANCELED'
            this.isDisabledApprove = val.status !== 'UNAPPROVED' || val.is_orion === '1'

            this.is_approve = val.is_approve

            this.dataTable.forEach((item) => {
                item.destination =
                    item.bag?.destination?.node_tariff_code ||
                    item.koli?.connote?.connote_receiver_tariff_code ||
                    item.manifest?.destination?.node_tariff_code ||
                    ''
                item.node_code_destination =
                    item?.bag?.destination?.node_code ||
                    item?.manifest?.destination?.branch_code ||
                    ''
                item.node_name_destination = item?.bag?.destination?.node_name || ''
                item.status_trip =
                    (item?.bag?.status_trip || '') + ' ' + (item?.bag?.current_node_name || '')

                if (val.status !== 'UNAPPROVED' || val.is_approve === 1) {
                    item.button_status = { remove: false }
                }

                item.received_status = item.received_at ? 1 : 0
                item.is_missroute = item.is_missroute === true ? 1 : 0
            })

            this.total_weight = val.total_weight
            this.editData = val
            this.editData.destination_id = val.node_id_destination
            this.destination_name_code =
                val?.destination?.node_name + ' (' + val?.destination?.node_code + ')' ||
                val.node_id_destination

            // this.getDestination(val.node_id_destination)

            this.no_moda_angkutan_id = val.no_moda_angkutan_id || null

            this.master_form = {
                node_id_origin: val.node_id_origin,
                node_id_destination: val.node_id_destination,
                vehicle_id: val.vehicle_id,
                pic_employee_id: val.pic_employee_id,
                etd: val.etd,
                eta: val.eta,
                max_weight: val.max_weight,
                manifest_lov: val.manifest_lov,
                item_no: val.item_number,
                is_penerusan: val.is_penerusan,
            }
        },
        // JANGAN DIHAPUS TAKUT NANTI DIPAKE LAGI
        // getDestination(node_id_destination) {
        //     let item_destination = {
        //         label: this.destination_name_code,
        //         value: node_id_destination
        //     }

        //     this.$store.dispatch("SET_SURAT_JALAN_DESTINATION_ID_ArrData", [{
        //         ...item_destination,
        //         item: item_destination
        //     }]);
        // },
        formData(form) {
            const obj = {
                node_id_origin: this.listenNodeId,
                node_id_destination: form.destination_id,
                vehicle_id: form.no_moda_angkutan_id,
                pic_employee_id: form.driver_id,
                etd: form.etd,
                eta: form.eta,
                max_weight: this.vehicle_max_weight,
                manifest_lov: this.manifest_lov,
                item_no: this.item_number,
                is_penerusan: this.is_penerusan,
            }

            this.form = obj
            if (this.form.eta > this.form.etd) {
                if (this.manifest_do_number) {
                    this.addSuratJalanDetail()
                } else {
                    this.createSuratJalan()
                }
            } else {
                this.openNotification(
                    'warning',
                    null,
                    'Wrong Input in ETA/ETD field',
                    'ETA must more than ETD'
                )
            }
        },
        onChangeCustom(type, val, obj) {
            const updateMasterForm = (key, value) => {
                if (this.manifest_do_number && this.master_form?.[key] !== value) {
                    this.master_form = { ...this.master_form, [key]: value }
                    this.updateSuratJalan()
                }
            }

            switch (type) {
                case 'destination_id':
                    if (typeof obj === 'object') {
                        const { item, value } = obj
                        if (item?.estimated_time_in_hour) {
                            this.estimated_time_in_hour = item.estimated_time_in_hour
                            this.handleEta(this.etd, this.estimated_time_in_hour)
                        }
                        this.destinationUnlock = value
                    }
                    updateMasterForm('node_id_destination', val)
                    break

                case 'no_moda_angkutan_id':
                    if (typeof obj === 'object' && obj.item) {
                        const { vehicle_max_weight, vehicle_type_id } = obj.item
                        this.vehicle_max_weight = vehicle_max_weight
                        this.vehicle_type_id = vehicle_type_id
                    }
                    this.no_moda_angkutan_id = val
                    updateMasterForm('vehicle_id', val)
                    break

                case 'etd':
                    this.etd = this.formatToWIB(val)
                    updateMasterForm('etd', this.formatToWIB(val))
                    break

                case 'eta':
                    this.$store.dispatch(
                        'SET_SURAT_JALAN_ETA',
                        moment(val.length === 10 ? val + ' 00:00:00' : val)
                            .add(this.estimated_time_in_hour, 'hours')
                            .format('YYYY-MM-DD HH:mm:ss')
                    )
                    updateMasterForm('eta', this.formatToWIB(val))
                    break

                case 'manifest_lov':
                    if (typeof obj === 'object' && obj.value) {
                        this.manifest_lov = obj.value
                        this.$store.dispatch('SET_SURAT_JALAN_MANIFEST_LOV_ValueData', obj.value)
                    }
                    updateMasterForm('manifest_lov', val)
                    break

                case 'driver_id':
                    updateMasterForm('pic_employee_id', val)
                    break

                default:
                    break
            }
        },
        handleEta(dateTime, amount) {
            if (dateTime && amount) {
                this.$store.dispatch(
                    'SET_SURAT_JALAN_ETA',
                    moment(dateTime).add(amount, 'hours').format('YYYY-MM-DD HH:mm:ss')
                )
            }
        },
        updateValue(key, val) {
            switch (key) {
                case 'scanBag':
                    this.item_number = val
                    break
                default:
            }
        },
        actionUpdate(val, key) {
            switch (key) {
                case 'remove':
                    this.item_remove = val.item_number
                    this.removeSuratJalanDetail()
                    break
                case 'trace_bag':
                    this.selectedBagNumber = val.item_number
                    this.dialogTraceBag = true
                    break
                default:
            }
        },
        print() {
            let routeData = this.$router.resolve({
                name: 'printGeneral',
                params: {
                    id: this.manifest_do_number,
                    type: 'manifest-delivery-order',
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
        handlePenerusan(val) {
            if (this.isDisabled) {
                this.is_penerusan = !val.target.checked
                this.openNotification('warn', null, 'Information', 'Surat Jalan is DEPARTED')
            } else {
                this.is_penerusan = val.target.checked
                if (this.manifest_do_number) {
                    const updateMasterForm = (key, value) => {
                        if (this.manifest_do_number && this.master_form?.[key] !== value) {
                            this.master_form = { ...this.master_form, [key]: value }
                            this.updateSuratJalan()
                        }
                    }

                    updateMasterForm('is_penerusan', this.is_penerusan)
                }
            }
        },
        submitSuratJalan() {
            this.$refs.formSuratJalan.handleSubmit()
        },
        async createSuratJalan() {
            this.loading = true
            let form = {
                item_no: this.item_number,
                is_penerusan: this.is_penerusan,
                sj_type: this.listenSjType,
            }
            try {
                const res = await axios.post(
                    `${this.URL.revamp_surat_jalan_v3}?n=${this.listenNodeId}`,
                    JSON.stringify(form),
                    this.Helper.header()
                )

                let data = res.data.data
                if (data) {
                    this.manifest_do_number = data.manifest_do_number
                    this.total_weight = data.total_weight
                    this.master_form = {
                        node_id_origin: data.node_id_origin,
                        node_id_destination: data.node_id_destination,
                        vehicle_id: data.vehicle_id || null,
                        pic_employee_id: data.pic_employee_id || null,
                        etd: data.etd,
                        eta: data.eta,
                        max_weight: data.max_weight,
                        manifest_lov: data.manifest_lov,
                        item_no: data.item_number,
                        is_penerusan: data.is_penerusan,
                    }
                    this.destination_name_code =
                        data?.destination?.node_name + ' (' + data?.destination?.node_code + ')' ||
                        data.node_id_destination
                    // this.getDestination(data.node_id_destination)
                    this.editData = {
                        destination_id: data.node_id_destination,
                        node_id_origin: data.node_id_origin,
                        node_id_destination: data.node_id_destination,
                        etd: data.etd,
                        eta: data.eta,
                        manifest_lov: data.manifest_lov,
                        item_no: data.item_number,
                        is_penerusan: data.is_penerusan,
                    }
                    this.isDestinationEnabled = data.node_id_destination === null
                    await this.getSuratJalanDetail()
                }

                this.openNotification('success', null, 'Success', 'Create surat jalan success')
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
            } finally {
                this.item_number = ''
                this.loading = false
            }
        },
        async addSuratJalanDetail() {
            this.loading = true
            try {
                const res = await axios.post(
                    `${this.URL.revamp_surat_jalan}/${this.manifest_do_number}/detail?n=${this.listenNodeId}`,
                    { item_number: this.item_number },
                    this.Helper.header()
                )

                if (res.data.data) {
                    this.manifest_do_number = res.data.data.manifest_do_number
                    this.total_weight = res.data.data.total_weight
                    await this.getSuratJalanDetail()
                }

                this.openNotification('success', null, 'Success', 'Add item success')
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
            } finally {
                this.item_number = ''
                this.loading = false
            }
        },
        async getSuratJalanDetail() {
            this.loading = true
            try {
                const res = await axios.get(
                    `${this.URL.revamp_surat_jalan}/${this.manifest_do_number}/detail?n=${this.listenNodeId}`,
                    this.Helper.header()
                )

                if (res.data.data.length > 0) {
                    let arr = res.data.data

                    arr = arr.map((item) => ({
                        ...item,
                        received_status: item.received_at ? 1 : 0,
                        destination: item.item_destination,
                        node_code_destination: item.node_code_destination,
                        status_trip:
                            (item?.bag?.status_trip || '') +
                            ' ' +
                            (item?.bag?.current_node_name || ''),
                        is_missroute: item.is_missroute,
                    }))

                    this.dataTable = arr
                } else {
                    this.dataTable = []
                    this.cancel()
                }
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed 2',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
            } finally {
                this.loading = false
            }
        },
        async updateSuratJalan() {
            this.loading = true
            try {
                const res = await axios.put(
                    `${this.URL.revamp_surat_jalan_v2}/${this.manifest_do_number}?n=${this.listenNodeId}`,
                    JSON.stringify(this.master_form),
                    this.Helper.header()
                )
                this.openNotification('success', null, 'Success', 'Update surat jalan success')
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
            } finally {
                this.loading = false
                this.setActiveInput('scanBag', 'formSuratJalan', () => this.dialogTraceBag)
            }
        },
        async removeSuratJalanDetail() {
            this.loading = true
            try {
                const res = await axios.delete(
                    `${this.URL.revamp_surat_jalan}/${this.manifest_do_number}/detail/${this.item_remove}?n=${this.listenNodeId}`,
                    this.Helper.header()
                )
                this.openNotification('success', null, 'Success', 'Remove surat jalan success')
                await this.getSuratJalanDetail()
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
            } finally {
                this.loading = false
            }
        },
        async approve() {
            if (this.master_form.vehicle_id === null || this.master_form.pic_employee_id === null) {
                this.$refs.formSuratJalan.handleSubmit()
            } else {
                this.loading = true
                try {
                    const res = await axios.patch(
                        `${this.URL.revamp_surat_jalan_v2}/${this.manifest_do_number}/approval?n=${this.listenNodeId}`,
                        { is_approve: this.is_approve ^ 1 },
                        this.Helper.header()
                    )

                    this.is_approve ^= 1
                    this.isDisabled = !this.isDisabled
                    this.cancel()
                    this.openNotification('success', null, 'Success', res?.data?.message)
                } catch (err) {
                    this.openNotification(
                        'danger',
                        err?.response?.data?.code ?? '',
                        'Failed',
                        err?.response?.data?.message ?? 'Something went wrong'
                    )
                } finally {
                    this.loading = false
                }
            }
        },
        handleClearForm() {
            this.manifest_do_number = ''
            this.item_number = ''
            this.isDisabled = false
            this.isDisabledPrint = false
            this.isDisabledApprove = false
            this.is_approve = 0
            this.vehicle_max_weight = 0
            this.no_moda_angkutan_id = null
            this.etd = null
            this.estimated_time_in_hour = null
            this.manifest_lov = ''
            this.form = {}
            this.master_form = {}
            this.editData = {}
            this.destination_name_code = ''
        },
        cancel() {
            if (Object.keys(this.editData).length !== 0) {
                this.$refs.formSuratJalan.handleClearForm()
            }
            this.loading = false
            this.handleClearForm()
            this.dataTable = []
            this.closeDialog()
            this.is_penerusan = true
        },
        getLov() {
            const arr = this.manifest_lov_list.map((item) => ({
                label: item.label,
                value: item.value,
            }))

            this.$store.dispatch('SET_SURAT_JALAN_MANIFEST_LOV_ArrData', arr.length ? arr : null)

            if (this.dataItem?.manifest_lov) {
                this.manifest_lov = this.dataItem.manifest_lov
            }
        },
        async getDestination2() {
            await axios
                .get(
                    this.URL.node +
                        `/${this.listenNodeId}/destination-link-manifest-delivery-order?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                    this.Helper.header()
                )
                .then((res) => {
                    if (res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map((item) => {
                            let obj = {}
                            obj['label'] = item.node_name + ' (' + item.node_code + ')'
                            obj['value'] = item.node_id
                            obj['item'] = item

                            arr.push(obj)
                        })

                        this.$store.dispatch(
                            'SET_SURAT_JALAN_DESTINATION_ID_ArrData',
                            arr.length > 0 ? arr : null
                        )
                    } else {
                        this.$store.dispatch('SET_SURAT_JALAN_DESTINATION_ID_ArrData', null)
                    }
                })
                .catch((err) => {
                    this.openNotification(
                        'danger',
                        err?.response?.data?.code ?? '',
                        'Failed to get node destination list',
                        err?.response?.data?.message ?? err
                    )
                })
        },
        async getNoModeAngkutan() {
            await axios
                .get(
                    this.URL.vehicle_manifest_delivery_order +
                        `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`,
                    this.Helper.header()
                )
                .then((res) => {
                    if (res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map((item) => {
                            let obj = {}
                            obj['label'] = item.vehicle_name + '(' + item.vehicle_police_no + ')'
                            obj['value'] = item.vehicle_id
                            obj['item'] = item
                            arr.push(obj)
                        })

                        this.$store.dispatch(
                            'SET_SURAT_JALAN_NO_MODA_ANGKUTAN_ID_ArrData',
                            arr.length > 0 ? arr : null
                        )
                    } else {
                        // this.openNotification('warn', null, 'Roles data is empty!', ' Please create a new role data')
                    }
                })
                .catch((err) => {
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
                })
        },
        async getDriver() {
            try {
                const res = await axios.get(
                    `${this.URL.employee}/driver?n=${this.listenNodeId}`,
                    this.Helper.header()
                )

                if (res.data.data.length > 0) {
                    const arr = res.data.data.map((item) => ({
                        label: `${item.employee_name} (${item.employee_nik})`,
                        value: item.employee_id,
                    }))

                    this.$store.dispatch('SET_SURAT_JALAN_DRIVER_ID_ArrData', arr)
                } else {
                    // this.openNotification('warn', null, 'Roles data is empty!', ' Please create a new role data');
                }
            } catch (err) {
                // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err);
            }
        },
        handleIconClick() {
            if (!this.isDisabled) {
                this.$refs.cameraScanner.open('item_number')
            }
        },
        onCameraScannerGetData(data) {
            if (!this.isDisabled && data?.event === 'result' && data.namespace === 'item_number') {
                this.item_number = data.data.text
            }
        },
        actionLimit(val) {
            this.pagination.limit = val
            this.pagination.page = 1
            this.refreshDetail()
        },
        actionPagination(val) {
            this.pagination.page = val
            this.refreshDetail()
        },
        refreshDetail() {
            this.getSuratJalanDetail()
        },
        openTraceBagDialog() {
            this.dialogTraceBag = true
        },
    },
    mounted() {
        this.handlePrintShortcut(this.print)
    },
}
</script>
<style>
.nomor-sj {
    width: inherit;
}
</style>
<style scoped>
.title-helper {
    width: 60%;
    align-content: center;
}

.button-helper {
    display: flex;
    justify-content: flex-end;
}

button {
    width: 6em;
}
.destination-container {
    display: flex;
    align-items: center;
    gap: 8px; /* Beri jarak antara label dan switch */
}

.destination-label {
    font-size: 12px; /* Sesuaikan ukuran label */
    font-weight: 450;
    margin-left: 10px;
}

.custom-switch {
    transform: scale(0.8); /* Mengecilkan ukuran switch */
}
</style>

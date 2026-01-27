<template>
    <dialog-master
        :actived="listenActive"
        :loading="listenLoading"
        width="xl"
        :closeDialog="btnBlue === 'Approve' ? cancelAdd : cancelEdit"
    >
        <template v-slot:header>
            <div class="button-helper">
                <div class="title-helper" v-copy="listenTitle">
                    {{ listenTitle }}
                </div>
                <vs-button @click="print"> Print </vs-button>
                <vs-button @click="approve" :danger="is_approve === 1">
                    {{ is_approve === 1 ? 'Unapproved' : 'Approve' }}
                </vs-button>
            </div>
        </template>

        <template v-slot:content>
            <div>
                <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />
                <div class="nomor-sj" v-if="dataItem">
                    <input-general
                        name="No Surat Jalan"
                        :valueData="dataItem.manifest_do_number"
                        :typeInput="`text`"
                        :disabled="true"
                    >
                    </input-general>
                </div>

                <!-- <pre>{{listenDataItem}}</pre> -->
                <form-input-controller
                    ref="formSuratJalan"
                    @formData="formData"
                    :dataItem="editData"
                    typeForm="surat_jalan"
                    :isDisabled="isDisabled"
                    @onChangeCustom="onChangeCustom"
                />

                <div v-if="btnBlue == 'Approve'" class="container-clear-item">
                    <div
                        v-if="!isDisabled && dataTable.length !== 0"
                        class="clear-item"
                        @click="handleClearAll"
                    >
                        Clear Form
                    </div>
                </div>

                <div class="mt-2 mb-2">
                    <vs-row align="center">
                        <vs-col xs="6" sm="3" lg="3">
                            <form @submit.prevent="getDataSuratMuatan">
                                <input-general
                                    name="Scan Surat Muatan / Masterbag / Bag"
                                    rules=""
                                    formKey="scanBag"
                                    :valueData="suratMuatan"
                                    :typeInput="`text|${isDestinationDisable}`"
                                    @updateValue="updateValue"
                                    icon-after
                                    @click-icon="handleIconClick"
                                    :disabled="isDisabled"
                                >
                                    <template #icon>
                                        <i class="bx bx-barcode-reader"></i>
                                    </template>
                                </input-general>
                            </form>
                        </vs-col>
                        <vs-col xs="6" sm="3" lg="3">
                            <vs-checkbox v-model="is_penerusan" @change="handlePenerusan">
                                Penerusan
                            </vs-checkbox>
                        </vs-col>
                    </vs-row>
                    <table-master
                        hideColumnKey="dialog-surat-jalan"
                        :dataTable="dataTable"
                        :dataColumn="datacolumn"
                        :hasAction="false"
                        :hasPagination="false"
                        :customAction="true"
                        :customActionList="customActionList"
                        @actionUpdate="actionUpdate"
                    />
                </div>
            </div>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="3">
                    <vs-button
                        transparent
                        block
                        danger
                        flat
                        :active="true"
                        @click="btnBlue === 'Approve' ? cancelAdd() : cancelEdit()"
                    >
                        Close
                    </vs-button>
                </vs-col>
                <vs-col w="3">
                    <vs-button
                        transparent
                        block
                        flat
                        :active="true"
                        type="submit"
                        @click="handleSubmit"
                        :disabled="isDisabled"
                    >
                        {{ btnBlue || 'Add' }}
                    </vs-button>
                </vs-col>
            </vs-row>
        </template>
    </dialog-master>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'
import moment from 'moment'
import DialogMaster from '@/components/dialog/dialogMaster'
import FormInputController from '@/components/form/formInputController'
import TableMaster from '@/components/table/tableMaster'
import InputGeneral from '@/components/input/general'
import CameraScanner from '@/components/scanner/camera'

export default {
    name: 'dialog-create-surat-jalan',
    mixins: [master],
    components: {
        'dialog-master': DialogMaster,
        'table-master': TableMaster,
        'input-general': InputGeneral,
        'form-input-controller': FormInputController,
        CameraScanner,
    },
    props: {
        closeDialog: Function,
        active: Boolean,
        title: String,
        dataItem: Object,
        btnRed: String,
        btnBlue: String,
        refresh: Function,
    },
    data() {
        return {
            form: {},
            DataArr: [],
            loading: false,
            manifest_delivery_id: '',
            dataTable: [],
            datacolumn: [
                {
                    label: 'Item Number',
                    key: 'item_number',
                    width: 'xs',
                },
                {
                    label: 'Weight (Kg)',
                    key: 'total_weight',
                    width: 'auto',
                },
                {
                    label: 'Destination',
                    key: 'destination',
                    width: 'auto',
                },
                {
                    label: 'Type',
                    key: 'item_type',
                    width: 'auto',
                },
                {
                    label: 'Received',
                    key: 'received_status',
                    type: 'status',
                    width: 'auto',
                },
            ],
            customActionList: [
                {
                    label: 'Remove',
                    key: 'remove',
                    attribute: '',
                },
            ],
            suratMuatan: '',
            vehicle_max_weight: 0,
            vehicle_type_id: '',
            lot_weight: 0,
            no_moda_angkutan_id: null,
            etd: null,
            estimated_time_in_hour: null,
            manifest_lov: '',
            destinationUnlock: '',
            manifest_lov_list: [
                // {
                //   label: "Multi Destination",
                //   value: "ALL",
                // },
                {
                    label: 'Single Destination',
                    value: 'SAME DESTINATION',
                },
            ],
            editData: {},
            isDestinationDisable: '',
            is_penerusan: true,
            isDisabled: false,
            is_approve: 0,
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
        listenDataItem() {
            if (this.dataItem) {
                //     this.dataItem['destination_id'] = val['destination'] ? val['destination']['node_id'] : ''
                // this.dataItem['no_moda_angkutan_id'] = val['vehicle'] ? val['vehicle']['vehicle_id'] : ''
                // this.dataItem["destination_id"] = this.dataItem.node_id_destination
                // this.dataItem["moda_angkutan_id"] = this.dataItem.vehicle_mode_id
                // this.dataItem["no_moda_angkutan_id"] = this.dataItem.vehicle_id
                // this.dataItem["manifest_do_item"] = this.dataItem.detail
                // this.dataItem["driver_id"] = parseInt(this.dataItem.pic_employee_id)
            }

            return this.dataItem
        },
        listenFormKey() {
            return this.formKey || ''
        },
    },
    watch: {
        dataItem: function (val) {
            if (val !== undefined) {
                this.manifest_delivery_id = val.manifest_do_number

                this.dataTable = val.detail
                this.is_penerusan = val.is_penerusan === '1' ? true : false
                this.isDisabled =
                    val.status !== 'READY' || val.is_orion == '1' || val.is_approve == 1
                        ? true
                        : false
                this.is_approve = val.is_approve
                this.dataTable.map((item) => {
                    if (item.bag) {
                        item.destination = item.bag.destination
                            ? item.bag.destination.node_tariff_code
                            : ''
                    } else if (item.koli) {
                        item.destination = item.koli.connote
                            ? item.koli.connote.connote_receiver_tariff_code
                            : ''
                    } else if (item.manifest) {
                        item.destination = item.manifest.destination
                            ? item.manifest.destination.node_tariff_code
                            : ''
                    }
                    if (val.status !== 'READY') {
                        item.button_status = {
                            remove: false,
                        }
                    }
                    item.received_status = item.received_at ? 1 : 0
                })

                this.editData = val
                this.no_moda_angkutan_id = val['no_moda_angkutan_id']
                    ? val['no_moda_angkutan_id']
                    : null

                // this.editData["destination_id"] = val.node_id_destination ? val.node_id_destination : ''
                // this.editData["moda_angkutan_id"] = val.vehicle_mode_id ? val.vehicle_mode_id : ''
                // this.editData["no_moda_angkutan_id"] = val.vehicle_id ? val.vehicle_id : ''
                // this.editData["manifest_do_item"] = val.detail ? val.detail : ''
                // this.editData["driver_id"] = val.pic_employee_id ? parseInt(val.pic_employee_id) : ''
            }
        },
        active: function (val) {
            if (val == true) {
                this.getDestination()
                this.getNoModeAngkutan()
                this.getLov()
                this.getDriver()
                this.setEmptyDataTable()
                this.isDestinationDisableCheck()
            }
        },
    },
    methods: {
        setEmptyDataTable() {
            let initial_data = this.$store.getters.getInputs.surat_jalan
            if (
                !initial_data['destination_id'].value &&
                !initial_data['driver_id'].value &&
                !initial_data['eta'].value &&
                !initial_data['etd'].value &&
                !initial_data['no_moda_angkutan_id'].value &&
                !initial_data['manifest_lov'].value &&
                Object.keys(this.editData).length === 0
            ) {
                this.dataTable = []
                this.manifest_lov = ''
                this.destinationUnlock = ''
            } else {
                this.manifest_lov = initial_data['manifest_lov'].value
                    ? initial_data['manifest_lov'].value
                    : initial_data['manifest_lov']
                this.destinationUnlock = initial_data['destination_id']
                let vehicle = initial_data['no_moda_angkutan_id'].arrData.find(
                    (el) => el.value === initial_data['no_moda_angkutan_id'].value
                )
                if (vehicle !== null) {
                    this.vehicle_max_weight = vehicle?.item?.vehicle_max_weight
                }
            }
        },
        formData(form) {
            let weight = 0
            this.dataTable.map((item) => {
                if (item.total_weight) {
                    weight = +item.total_weight
                }
            })

            if (this.editData.max_weight > 0 && this.vehicle_max_weight < 1) {
                this.vehicle_max_weight = this.editData.max_weight
            }
            if (this.vehicle_max_weight >= weight) {
                let obj = {}
                obj['node_id_origin'] = this.listenNodeId
                obj['node_id_destination'] = form.destination_id
                obj['vehicle_mode_id'] = form.moda_angkutan_id
                obj['vehicle_id'] = form.no_moda_angkutan_id
                obj['pic_employee_id'] = form.driver_id
                obj['etd'] = form.etd
                obj['eta'] = form.eta
                obj['vehicle_type_id'] = this.vehicle_type_id
                obj['max_weight'] = this.vehicle_max_weight
                obj['manifest_lov'] = this.manifest_lov
                obj['manifest_do_item'] = this.dataTable
                obj['is_penerusan'] = this.is_penerusan

                this.form = obj

                if (this.form.eta > this.form.etd) {
                    if (
                        this.manifest_delivery_id !== undefined &&
                        this.manifest_delivery_id !== ''
                    ) {
                        if (
                            this.vehicle_type_id === '' ||
                            this.vehicle_type_id === undefined ||
                            this.vehicle_type_id === null
                        ) {
                            this.form.vehicle_type_id = this.dataItem.vehicle_type_id
                                ? parseInt(this.dataItem.vehicle_type_id)
                                : this.dataItem.vehicle_type_id
                        }
                        this.updateData()
                    } else {
                        this.addData()
                    }
                } else {
                    this.openNotification(
                        'warning',
                        'Wrong Input in ETA/ETD field',
                        'ETA must more than ETD'
                    )
                }
            } else {
                this.openNotification(
                    'warn',
                    'Melebihi berat',
                    'Berat muatan melebihi batas berat kendaraan'
                )
            }
        },
        onChangeCustom(type, val, obj) {
            switch (type) {
                case 'no_moda_angkutan_id':
                    if (typeof obj === 'object') {
                        if (obj.hasOwnProperty('item')) {
                            this.vehicle_max_weight = obj['item']['vehicle_max_weight']
                            this.vehicle_type_id = obj['item']['vehicle_type_id']
                        }
                    }
                    this.no_moda_angkutan_id = val
                    break
                case 'destination_id':
                    if (typeof obj === 'object') {
                        if (obj.hasOwnProperty('item')) {
                            this.estimated_time_in_hour = obj['item']['estimated_time_in_hour']
                            this.handleEta(this.etd, this.estimated_time_in_hour)
                        }
                        this.destinationUnlock = parseInt(obj['value'])
                    }
                    this.isDestinationDisableCheck()
                    break
                case 'etd':
                    this.etd = val
                    let dateEta = this.handleEta(this.etd, this.estimated_time_in_hour)
                    break
                case 'manifest_lov':
                    if (typeof obj === 'object') {
                        if (obj.hasOwnProperty('value')) {
                            this.manifest_lov = obj['value']
                            this.$store.dispatch(
                                'SET_SURAT_JALAN_MANIFEST_LOV_ValueData',
                                obj['value']
                            )
                        }
                    }
                    this.isDestinationDisableCheck()
                default:

                // code block
            }
        },
        handleEta(dateTime, amount) {
            if (dateTime && amount) {
                let dateEta = moment(dateTime).add(amount, 'hours').format('YYYY-MM-DD HH:mm:ss')
                this.$store.dispatch('SET_SURAT_JALAN_ETA', dateEta)
            }
        },
        actionUpdate(val, key) {
            switch (key) {
                case 'remove':
                    if (this.dataTable.length > 0 && typeof val === 'object') {
                        let filter = this.dataTable.filter(
                            (item) => item.item_number !== val.item_number
                        )
                        this.dataTable = filter
                    }
                    break
                default:

                // code block
            }
        },
        async approve() {
            await axios
                .put(
                    `${this.URL.approval}-manifest-do/${this.manifest_delivery_id}?n=${this.listenNodeId}`,
                    JSON.stringify({
                        is_approve: this.is_approve ^ 1,
                    }),
                    this.Helper.header()
                )
                .then((res) => {
                    this.is_approve ^= 1
                    this.openNotification('success', null, 'Success', res?.data?.message)
                })
                .catch((err) => {
                    this.openNotification(
                        'danger',
                        err?.response?.data?.code ?? '',
                        'Failed',
                        err?.response?.data?.message ?? 'something went wrong'
                    )
                })
        },
        print() {
            let routeData = this.$router.resolve({
                name: 'printGeneral',
                params: {
                    id: this.manifest_delivery_id,
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
        handleSubmit() {
            this.$refs.formSuratJalan.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm() {
            this.$refs.formSuratJalan.handleClearForm()
            this.form = {}
        },
        handlePenerusan(val) {
            if (this.isDisabled) {
                this.is_penerusan = !val.target.checked
                this.openNotification('warn', null, 'Information', 'Surat Jalan is DEPARTED')
            } else {
                this.is_penerusan = val.target.checked
            }
        },
        updateValue(key, val) {
            switch (key) {
                case 'scanBag':
                    this.suratMuatan = val
                    break
                default:

                // code block
            }
        },
        async addData() {
            this.loading = true
            await axios
                .post(
                    this.URL.revamp_surat_jalan_v3 + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form),
                    this.Helper.header()
                )
                .then((res) => {
                    this.closeDialog()
                    this.loading = false
                    this.$emit('refresh')
                    this.handleClearForm()
                    this.dataTable = []
                    this.openNotification(null, 'Success', 'Create surat jalan success')
                })
                .catch((err) => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit('refresh')
                    // this.dataTable = [];
                    // this.handleClearForm();
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'Create surat jalan failed',
                        err.response ? err.response.data.message : 'something went wrong'
                    )
                })
        },
        async updateData() {
            this.loading = true
            await axios
                .put(
                    this.URL.revamp_surat_jalan_v3 +
                        `/${this.manifest_delivery_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form),
                    this.Helper.header()
                )
                .then((res) => {
                    this.closeDialog()
                    this.loading = false
                    this.$emit('refresh')
                    this.handleClearForm()
                    this.dataTable = []
                    this.openNotification(null, 'Success', 'Update surat jalan success')
                })
                .catch((err) => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit('refresh')
                    // this.dataTable = [];
                    // this.handleClearForm();
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'Create surat jalan failed',
                        err.response ? err.response.data.message : 'something went wrong'
                    )
                })
        },
        cancelEdit() {
            this.loading = false
            this.handleClearForm()
            this.dataTable = []
            this.closeDialog()
        },
        cancelAdd() {
            this.loading = false
            this.closeDialog()
        },
        handleClearAll() {
            this.$refs.formSuratJalan.handleEmptyForm()
            this.form = {}
            this.dataTable = []
        },
        async getDestination() {
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
                        // this.openNotification('warn', null, 'Roles data is empty!', ' Please create a new role data')
                    }
                })
                .catch((err) => {
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
                })
        },
        getLov() {
            let arr = []
            this.manifest_lov_list.map((item) => {
                let obj = {}
                obj['label'] = item.label
                obj['value'] = item.value

                arr.push(obj)
            })
            this.$store.dispatch(
                'SET_SURAT_JALAN_MANIFEST_LOV_ArrData',
                arr.length > 0 ? arr : null
            )
            if (this.dataItem && this.dataItem.manifest_lov) {
                this.manifest_lov = this.dataItem.manifest_lov
            }
        },
        isDestinationDisableCheck() {
            if (!this.dataItem) {
                this.isDestinationDisable = 'disabled'
            }
            if (!this.manifest_lov) {
                this.isDestinationDisable = 'disabled'
            }
            if (this.manifest_lov && this.destinationUnlock) {
                this.isDestinationDisable = ''
            }
            if (this.dataItem && this.dataItem.node_id_destination && this.manifest_lov) {
                this.isDestinationDisable = ''
            }
        },
        // async getModeAngkutan() {
        //     await axios
        //         .get(this.URL.vehicle_mode +
        //         `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
        //         this.Helper.header())
        //         .then(res => {
        //             if(res.data.data.length > 0) {
        //                 let arr = []
        //                 res.data.data.map(item => {
        //                     let obj = {}
        //                     obj['label'] = item.vehicle_mode_name
        //                     obj['value'] = item.vehicle_mode_id
        //                     // obj["item"] = item
        //                     arr.push(obj)
        //                 })
        //
        //                 this.$store.dispatch("SET_SURAT_JALAN_MODA_ANGKUTAN_ID_ArrData", arr.length > 0 ? arr : null)
        //             } else {
        //                 // this.openNotification('warn', null, 'Roles data is empty!', ' Please create a new role data')
        //             }
        //
        //         }).catch(err => {
        //             // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
        //         })
        // },
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
        async getDataSuratMuatan() {
            let manifest_do_number = ''
            let destination_id = ''
            if (this.editData && this.editData.hasOwnProperty('manifest_do_number')) {
                manifest_do_number = this.editData.manifest_do_number
            }
            if (this.editData && this.editData.hasOwnProperty('destination_id')) {
                destination_id = parseInt(this.editData.destination_id)
            }
            if (!destination_id) {
                destination_id = this.destinationUnlock
            }
            await axios
                .get(
                    this.URL.manifest_do +
                        `/scan?n=${this.listenNodeId}&item_no=${this.suratMuatan}&manifest_do_number=${manifest_do_number}&manifest_destination=${destination_id}&manifest_lov=${this.manifest_lov}`,
                    this.Helper.header()
                )
                .then((res) => {
                    if (res.data.data) {
                        let data = res.data.data

                        let obj = {}
                        obj['item_number'] = data.item_number
                        obj['total_weight'] = data.total_weight
                        obj['destination'] = data.destination ? data.destination : ''
                        obj['node_id_receiver'] = data.node_id_receiver
                        obj['total_koli'] = data.total_koli
                        obj['item_type'] = data.item_type
                        obj['total_connote'] = data.total_connote
                        obj['total_bag'] = data.total_bag

                        this.validateTempItemSJ(obj)

                        this.suratMuatan = ''
                    }
                })
                .catch((err) => {
                    if (err) {
                        let message = err.response.data
                            ? err.response.data.message
                            : 'failed Load Data'
                        this.openNotification('warn', null, 'Failed Get Data', message)
                    }
                })
        },
        async getDriver() {
            await axios
                .get(this.URL.employee + `/driver?n=${this.listenNodeId}`, this.Helper.header())
                .then((res) => {
                    if (res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map((item) => {
                            let obj = {}
                            obj['label'] = `${item.employee_name} (${item.employee_nik})`
                            obj['value'] = item.employee_id

                            arr.push(obj)
                        })

                        this.$store.dispatch(
                            'SET_SURAT_JALAN_DRIVER_ID_ArrData',
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
        validateTempItemSJ(itemSJ) {
            if (Object.keys(this.dataTable).length === 0) {
                this.dataTable.push(itemSJ)
            } else {
                let itemNumberExists = this.dataTable.some(
                    (item) => item.item_number === itemSJ.item_number
                )
                if (itemNumberExists) {
                    this.openNotification(
                        'warn',
                        'Information',
                        'item ' + itemSJ.item_number + ' already exists'
                    )
                } else {
                    this.dataTable.push(itemSJ)
                }
            }
        },
        handleIconClick() {
            if (!this.isDisabled) {
                this.$refs.cameraScanner.open('suratMuatan')
            }
        },
        onCameraScannerGetData(data) {
            if (!this.isDisabled) {
                if (data && data.event === 'result') {
                    if (data.namespace === 'suratMuatan') {
                        this.suratMuatan = data.data.text
                    }
                }
            }
        },
    },
    mounted() {
        //   this.getDestination()
        //   this.getNoModeAngkutan()
        //   this.getDriver()
    },
}
</script>
<style>
.container-clear-item {
    display: flex;
    justify-content: flex-end;
}
.clear-item {
    display: flex;
    justify-content: end;
    cursor: pointer;
    color: red;
    margin: 10px 0;
}
.nomor-sj {
    width: inherit;
}
</style>
<style scoped>
.title-helper {
    width: 70%;
    align-content: center;
}

.button-helper {
    display: flex;
    justify-content: flex-end;
}

button {
    width: 6em;
}
</style>

<template>
    <dialog-master
        width="xl"
        :actived="listenActive"
        :closeDialog="cancel"
        :loading="listenLoading"
    >
        <template v-slot:header>
            <span v-copy="listenTitle">{{ listenTitle }}</span>
        </template>

        <template v-slot:content>
            <div>
                <div class="nomor-sj" v-if="manifest_do_number">
                    <input-general
                        name="No Surat Jalan"
                        :valueData="manifest_do_number"
                        :typeInput="`text`"
                        :disabled="true"
                    />
                </div>
                <form-input-controller
                    ref="formSuratJalan"
                    typeForm="surat_jalan"
                    :dataItem="editData"
                    :isDisabled="true"
                />
                <div class="mt-2 mb-2">
                    <table-master
                        hideColumnKey="dialog-surat-jalan-airport"
                        :dataTable="dataTable"
                        :dataColumn="datacolumn"
                        :hasAction="false"
                        :hasPagination="false"
                    />
                </div>
            </div>
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
            DataArr: [],
            loading: false,
            manifest_do_number: '',
            dataTable: [],
            datacolumn: [
                {
                    label: 'Item Number',
                    key: 'item_number',
                    width: 'xs',
                },
                {
                    label: 'Cost Weight (Kg)',
                    key: 'cost_weight',
                    width: 'xs',
                },
                {
                    label: 'Actual Weight (Kg)',
                    key: 'actual_weight',
                    width: 'xs',
                },
                {
                    label: 'Destination',
                    key: 'destination',
                    width: 'sm',
                },
                {
                    label: 'Destination Name',
                    key: 'destination_name',
                    width: 'sm',
                },
                {
                    label: 'Type',
                    key: 'item_type',
                    width: 'xs',
                },
                {
                    label: 'Received',
                    key: 'received_status',
                    type: 'status',
                    width: 'xs',
                },
            ],
            manifest_lov: '',
            manifest_lov_list: [
                // {
                //     label: "Multi Destination",
                //     value: "ALL",
                // },
                {
                    label: 'Single Destination',
                    value: 'SAME DESTINATION',
                },
            ],
            editData: {},
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
    },
    watch: {
        dataItem: function (val) {
            if (val !== undefined) {
                this.getEditData(val)
            }
        },
        active: function (val) {
            if (val == true) {
                this.getLov()
            }
        },
    },
    methods: {
        getEditData(val) {
            this.manifest_do_number = val.manifest_do_number

            this.dataTable = val.detail
            this.dataTable.forEach((item) => {
                item.destination =
                    item.bag?.destination?.node_tariff_code ||
                    item.koli?.connote?.connote_receiver_tariff_code ||
                    item.manifest?.destination?.node_tariff_code ||
                    ''

                if (val.status !== 'READY') {
                    item.button_status = { remove: false }
                }
                item.destination_name = item?.bag?.destination?.node_name || ''
                item.received_status = item.received_at ? 1 : 0
            })

            this.editData = val

            this.getArr(
                val.node_id_destination,
                val.destination.node_name,
                val.destination.node_code,
                'SET_SURAT_JALAN_DESTINATION_ID_ArrData'
            )
            this.getArr(
                val.no_moda_angkutan_id,
                val.vehicle.vehicle_name,
                val.vehicle.vehicle_code,
                'SET_SURAT_JALAN_NO_MODA_ANGKUTAN_ID_ArrData'
            )
            this.getArr(
                val.driver_id,
                val.pic.employee_name,
                val.pic.employee_code,
                'SET_SURAT_JALAN_DRIVER_ID_ArrData'
            )
        },
        cancel() {
            this.loading = false
            this.$refs.formSuratJalan.handleClearForm()
            this.dataTable = []
            this.closeDialog()
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
        getArr(data_id, data_name, data_code, data_table) {
            let data = {
                label: data_code ? data_name + ' (' + data_code + ')' : data_name,
                value: data_id,
            }

            this.$store.dispatch(data_table, [
                {
                    ...data,
                    item: data,
                },
            ])
        },
    },
}
</script>

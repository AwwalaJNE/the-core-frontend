<template>
    <dialog-master
        width="md"
        :actived="listenActive"
        :loading="listenLoading"
        :closeDialog="cancel"
    >
        <template v-slot:header>
            <span v-copy="listenTitle">{{ listenTitle }}</span>
        </template>

        <template v-slot:content>
            <div>
                <div>
                    <selector
                        ref="editType"
                        formKey="editType"
                        name="Edit Type"
                        :isMultiple="false"
                        :rules="'required'"
                        :selectedValue="selectedEditType"
                        :valueData="edit_type_list"
                        @updateValue="updateValue"
                    />
                </div>
                <div v-if="selectedEditType === 'EDIT_CONNOTE'">
                    <form-input-controller
                        key="formHelpdeskEditConnote"
                        ref="formHelpdeskEditConnote"
                        typeForm="helpdesk_edit_connote"
                        :dataItem="formHelpdeskEditConnote"
                        :querySearch="geolocationQuerySearch"
                        @formData="formDataEditConnote"
                        @onChangeCustom="onChangeCustom"
                        :listenIsDisabled="true"
                    />
                </div>
                <div v-else-if="selectedEditType === 'MOVE_CONNOTE'">
                    <form-input-controller
                        key="formHelpdeskMoveConnote"
                        ref="formHelpdeskMoveConnote"
                        typeForm="helpdesk_move_connote"
                        :querySearch="querySearch"
                        @formData="formDataMoveConnote"
                    />
                </div>
            </div>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="3">
                    <vs-button block danger flat transparent :active="true" @click="cancel">
                        Close
                    </vs-button>
                </vs-col>
                <vs-col w="3">
                    <vs-button
                        block
                        flat
                        transparent
                        type="submit"
                        :active="true"
                        @click="handleSubmit"
                    >
                        Edit
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
import InputGeneral from '@/components/input/general'
import Selector from '@/components/input/select'
import TableMaster from '@/components/table/tableMaster'

export default {
    name: 'dialog-helpdesk-edit-connote',
    mixins: [master],
    components: {
        'dialog-master': DialogMaster,
        'table-master': TableMaster,
        'input-general': InputGeneral,
        'form-input-controller': FormInputController,
        selector: Selector,
    },
    props: {
        active: Boolean,
        closeDialog: Function,
        connoteNumber: String,
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
        listenConnoteNumber() {
            return this.connoteNumber
        },
        listenDataItem() {
            return this.dataItem
        },
    },
    watch: {
        active: function (val) {
            if (val == true) {
                this.getConnote()
            }
        },
    },
    data() {
        return {
            formHelpdeskEditConnote: {},
            formHelpdeskMoveConnote: '',
            loading: false,
            selectedEditType: '',
            edit_type_list: [
                {
                    label: 'Edit Connote Form',
                    value: 'EDIT_CONNOTE',
                },
                {
                    label: 'Move Connote Location',
                    value: 'MOVE_CONNOTE',
                },
            ],
            services: [],
        }
    },
    methods: {
        async getConnote() {
            this.loading = true
            try {
                let res = await axios.get(
                    `${this.URL.connote}/${this.listenConnoteNumber}?n=${this.listenNodeId}`,
                    this.Helper.header()
                )
                let val = res.data.data

                const connoteReceiverTariffCode = val.connote_receiver_tariff_code
                const connoteServiceCode = val.connote_service_code
                // const customerCodeTariff = val.customer_code_tariff;
                const customerCodeTariff = ''

                this.formHelpdeskMoveConnote = val.node_id
                this.$store.dispatch(
                    `SET_HELPDESK_MOVE_CONNOTE_NODE_LOCATION_ID`,
                    val?.current_location_name
                )
                this.$store.dispatch(`SET_HELPDESK_EDIT_CONNOTE_WEIGHT`, val?.connote_actual_weight)
                this.formHelpdeskEditConnote = {
                    connote_shipper_name: val.connote_shipper_name,
                    connote_shipper_street_address: val.connote_shipper_street_address,
                    connote_shipper_email: val.connote_shipper_email,
                    connote_shipper_phone_number: val.connote_shipper_phone_number,
                    connote_receiver_name: val.connote_receiver_name,
                    // connote_receiver_street_address: val.connote_receiver_street_address,
                    connote_receiver_administrative_address:
                        val.connote_receiver_administrative_address,
                    connote_receiver_email: val.connote_receiver_email,
                    connote_receiver_phone_number: val.connote_receiver_phone_number,
                    amount_cod: val.amount_cod,
                    amount_tariff: val.amount_tariff,
                    remarks: val.remarks,
                    connote_service_code: val.connote_service_code,
                    connote_actual_weight: val.connote_actual_weight,
                }

                await this.getShippingService(
                    connoteReceiverTariffCode,
                    customerCodeTariff,
                    connoteServiceCode
                )
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed to populate list',
                    err?.response?.data?.message ?? ''
                )
            } finally {
                this.loading = false
            }
        },
        querySearch(queryString, cb) {
            axios
                .get(
                    this.URL.node + `?n=${this.listenNodeId}&s=${queryString}`,
                    this.Helper.header()
                )
                .then((res) => {
                    let result = res.data.data
                    let suggestions = []
                    result.length > 0 &&
                        result.map((item) => {
                            suggestions.push({
                                value: item['node_name'],
                                data: item,
                            })
                        })

                    cb(suggestions)
                })
                .catch((error) => console.log('error', error))
        },
        formDataEditConnote() {
            this.updateConnote()
        },
        formDataMoveConnote(form) {
            if (form.node_location_id) {
                this.formHelpdeskMoveConnote = form['node_location_id']['node_id']
            }
            this.updateLocation()
        },
        async updateLocation() {
            this.loading = true
            try {
                const res = await axios.patch(
                    `${this.URL.connote}/${this.listenConnoteNumber}/move?n=${this.listenNodeId}&node_location_id=${this.formHelpdeskMoveConnote}`,
                    {},
                    this.Helper.header()
                )
                this.openNotification('success', null, 'Success', res?.data?.message)
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
            } finally {
                this.cancel()
                this.loading = false
            }
        },
        async updateConnote() {
            this.loading = true
            try {
                const res = await axios.put(
                    `${this.URL.connote}/${this.listenConnoteNumber}?n=${this.listenNodeId}`,
                    JSON.stringify(this.formHelpdeskEditConnote),
                    this.Helper.header()
                )
                this.openNotification('success', null, 'Success', res?.data?.message)
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
            } finally {
                this.cancel()
                this.loading = false
            }
        },
        handleSubmit() {
            if (this.selectedEditType === 'MOVE_CONNOTE') {
                this.$refs.formHelpdeskMoveConnote.handleSubmit()
            } else if (this.selectedEditType === 'EDIT_CONNOTE') {
                this.$refs.formHelpdeskEditConnote.handleSubmit()
            }
        },
        handleClearForm() {
            this.formHelpdeskEditConnote = {}
            this.formHelpdeskMoveConnote = ''
            this.flag = ''
            this.autoComplateUrl = ''
            this.selectedEditType = ''

            if (this.selectedEditType === 'MOVE_CONNOTE') {
                this.$refs.formHelpdeskMoveConnote.handleClearForm()
            } else if (this.selectedEditType === 'EDIT_CONNOTE') {
                this.$refs.formHelpdeskEditConnote.handleClearForm()
            }
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        },
        updateValue(key, val) {
            if (key === 'editType') {
                this.selectedEditType = this.edit_type_list.find(
                    (item) => item.value === val
                )?.value
            }
        },
        onChangeCustom(type, val, obj) {
            this.formHelpdeskEditConnote[type] = val
            if (type == 'connote_receiver_administrative_address') {
                if (obj != null && obj != undefined) {
                    const { data } = obj
                    if (data == null || data == undefined) {
                        return
                    }
                    const destination = data.geolocation_subdistrict_tarif_code
                    this.getShippingService(
                        destination,
                        '',
                        this.formHelpdeskEditConnote.connote_service_code,
                        'update'
                    )
                    this.formHelpdeskEditConnote['amount_tariff'] =
                        this.services.length > 0 ? this.services[0].data.tariff_amount_1 : 0
                    this.$store.dispatch(
                        'SET_HELPDESK_EDIT_CONNOTE_AMOUNT_TARIFF',
                        this.formHelpdeskEditConnote['amount_tariff']
                    )
                }
            }
        },
        async geolocationQuerySearch(queryString, cb) {
            try {
                const response = await axios.get(
                    `${this.URL.geolocation_search}?n=${this.listenNodeId}&s=${queryString}`,
                    this.Helper.header()
                )
                let data = response.data.data
                let suggestions = []
                data.length > 0 &&
                    data.map((item) => {
                        suggestions.push({
                            value: item.geolocation_location_name,
                            data: item,
                        })
                    })
                cb(suggestions)
            } catch (_) {}
        },
        async getShippingService(
            destination,
            customerCodeTariff,
            connoteServiceCode,
            action = 'init'
        ) {
            try {
                const res = await axios.get(
                    `${this.URL.tariff_shipping_service}?n=${this.listenNodeId}&destination=${destination}&customer_code_tariff=${customerCodeTariff}`,
                    this.Helper.header()
                )
                const resData = res.data.data
                const serviceData = []

                resData.map((item) => {
                    const obj = {}
                    obj.label = item.service_name
                    obj.value = item.tariff_service_code
                    obj.data = item

                    // tiering tarrif
                    const tariffAkumulatif = {}
                    const tariffStandar = {}
                    const keys = Object.keys(item)

                    // sudah dipastikan tiering sampe 50 biji
                    for (let i = 1; i <= 50; i++) {
                        if (i == 1) {
                            tariffStandar.weight = item.tariff_weight_1 || 0
                            tariffStandar.value = item.tariff_amount_1 || 0
                        } else if (Number(item[`tariff_amount_${i}`]) != 0) {
                            tariffAkumulatif[item[`tariff_weight_${i}`]] =
                                item[`tariff_amount_${i}`] || 0
                        }
                    }

                    obj.tariffAkumulatif = tariffAkumulatif
                    obj.tariffStandar = tariffStandar

                    if (item.tariff_service_code.toLowerCase().includes('reg')) {
                        serviceData.unshift(obj)
                    } else {
                        serviceData.push(obj)
                    }
                })

                this.services = serviceData
                if (action == 'init') {
                    this.$store.dispatch('SET_HELPDESK_EDIT_CONNOTE_SERVICE', connoteServiceCode)
                } else {
                    this.$store.dispatch(
                        'SET_HELPDESK_EDIT_CONNOTE_SERVICE',
                        serviceData.length > 0 ? serviceData[0].value : ''
                    )
                }
                // this.$store.dispatch('SET_HELPDESK_EDIT_CONNOTE_SERVICE_ValueData', serviceData.length > 0 ? serviceData[0] : '')
                this.$store.dispatch(
                    'SET_HELPDESK_EDIT_CONNOTE_SERVICE_arrData',
                    serviceData.length > 0 ? serviceData : []
                )
            } catch (err) {}
        },
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>

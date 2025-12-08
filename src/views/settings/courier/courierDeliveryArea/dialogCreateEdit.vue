<template>
    <dialog-master
        width="lg"
        :actived="listenActive"
        :closeDialog="cancel"
        :loading="listenLoading"
    >
        <template v-slot:header>
            {{ listenTitle }}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller
                    ref="formDataController"
                    typeForm="courier_delivery_area"
                    :asynchronousSelect_url="autoCompleteUrl"
                    :dataItem="listenDataItem"
                    :selectValue="input_value"
                    :selectLabel="input_label"
                    :isNestedData="isNestedData"
                    :nestedKey="nestedKey"
                    :tableKey="tableKey"
                    :data-testid="`form`"
                    @formData="formData"
                    @onChangeCustom="onChangeCustom"
                    @inputFocus="inputFocus"
                />
            </div>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end" style="margin-top: 2rem">
                <vs-col w="3">
                    <vs-button
                        block
                        danger
                        flat
                        transparent
                        :active="true"
                        :data-testid="`cancel-button`"
                        @click="cancel"
                    >
                        Cancel
                    </vs-button>
                </vs-col>
                <vs-col w="3">
                    <vs-button
                        block
                        flat
                        transparent
                        type="submit"
                        :active="true"
                        :data-testid="`submit-button`"
                        @click="handleSubmit"
                    >
                        {{ btnBlue || 'Save Changes' }}
                    </vs-button>
                </vs-col>
            </vs-row>
        </template>
    </dialog-master>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'

import DialogMaster from '@/components/dialog/dialogMaster'
import FormInputController from '@/components/form/formInputController'
import Selector from '@/components/input/select'

export default {
    name: 'dialog-courier-delivery-area',
    mixins: [master],
    components: {
        'dialog-master': DialogMaster,
        'form-input-controller': FormInputController,
        selector: Selector,
    },
    props: {
        active: Boolean,
        btnBlue: String,
        closeDialog: Function,
        dataItem: Object,
        title: String,
    },
    data() {
        return {
            form: {},
            courier_id: '',
            autoCompleteUrl: null,
            input_value: '',
            input_label: '',
            tableKey: '',
            loading: false,
            isNestedData: false,
            nestedKey: '',
        }
    },
    computed: {
        listenActive() {
            return this.active
        },
        listenTitle() {
            return this.title
        },
        listenLoading() {
            return this.loading
        },
        listenDataItem() {
            return this.dataItem
        },
    },
    watch: {
        dataItem: function (val) {
            if (val !== undefined) {
                this.getDataDetail(val)
            }
        },
    },
    methods: {
        inputFocus(obj, val, info) {
            if (obj.key === 'courier_id') {
                this.autoCompleteUrl = `${this.URL.courier_delivery}/list?n=${this.listenNodeId}`
                this.input_value = 'employee_id'
                this.input_label = 'employee_name'
                this.isNestedData = false
            }
        },
        async getDataDetail(val) {
            this.areaType(val.area_type)

            this.courier_id = val.courier_id

            this.$store.dispatch('SET_COURIER_DELIVERY_AREA_COURIER_ID', parseInt(val.courier_id))
            this.$store.dispatch('SET_COURIER_DELIVERY_AREA_COURIER_ID_isDisabled', true)
        },
        formData(form) {
            const { id, ...formWithoutId } = form

            this.form = formWithoutId
            this.handleSubmitData()
        },
        onChangeCustom(type, val, obj) {
            if (type === 'area_type') {
                this.areaType(val)
            }
        },
        areaType(val) {
            this.autoCompleteUrl = `${this.URL.geolocation_search_by}?n=${this.listenNodeId}&search_by=${val}&sort_order=desc&page=1`
            this.tableKey = val
        },
        async handleSubmitData() {
            this.loading = true
            try {
                const url = `${this.URL.courier_delivery_area}${
                    this.courier_id ? `/${this.courier_id}` : ''
                }?n=${this.listenNodeId}`
                const method = this.courier_id ? 'put' : 'post'
                const res = await axios[method](url, this.form, this.Helper.header())

                this.openNotification(
                    'success',
                    null,
                    'Success',
                    res?.data?.message || this.courier_id
                        ? 'Success Update Data'
                        : 'Success Create Data'
                )
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code || '',
                    'Failed',
                    err?.response?.data?.message || 'Something went wrong'
                )
            } finally {
                this.loading = false
                this.cancel()
            }
        },
        handleSubmit() {
            this.$refs.formDataController.handleSubmit()
        },
        handleClearForm() {
            this.$refs.formDataController.handleClearForm()
            this.form = {}
            this.courier_id = ''
            this.$store.dispatch('SET_COURIER_DELIVERY_AREA_COURIER_ID_isDisabled', false)
        },
        cancel() {
            this.handleClearForm()
            this.$emit('refresh')
            this.closeDialog()
        },
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>

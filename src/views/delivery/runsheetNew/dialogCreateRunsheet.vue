<template>
    <dialog-master
        width="md"
        :actived="listenActive"
        :loading="listenLoading"
        :closeDialog="cancel"
    >
        <template v-slot:header>
            {{ listenTitle }}
        </template>

        <template v-slot:content>
            <div>
                <asynchronous-select
                    ref="courier"
                    name="Courier"
                    formKey="courier"
                    :rules="''"
                    :valueData="courier_arr"
                    :selectedValue="selectedCourier"
                    :isSingleInput="true"
                    :url="autoComplateUrl"
                    :selectValue="input_value"
                    :selectLabel="input_label"
                    :isNestedData="isNestedData"
                    :nestedKey="nestedKey"
                    :searchKeyword="lastKeyword"
                    :data-testid="`select-courier`"
                    @updateValue="updateValue"
                    @inputFocus="inputFocus"
                    @search="handleSearchKeyword"
                />
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
                        @click="cancel"
                        :data-testid="`cancel-button`"
                    >
                        Cancel
                    </vs-button>
                </vs-col>
                <vs-col w="3">
                    <vs-button
                        transparent
                        block
                        flat
                        :active="true"
                        type="submit"
                        :data-testid="`sumit-button`"
                        @click="handleSubmit"
                    >
                        {{ btnBlue || 'Add' }}
                    </vs-button>
                </vs-col>
            </vs-row>
        </template>
    </dialog-master>
</template>

<script>
import master from '@/mixins/master'

import DialogMaster from '@/components/dialog/dialogMaster'
import FormInputController from '@/components/form/formInputController'
import Selector from '@/components/input/select'
import AsynchronousSelect from '../../../components/input/asynchronousSelect.vue'

export default {
    name: 'dialog-create-runsheet',
    mixins: [master],
    components: {
        'dialog-master': DialogMaster,
        'form-input-controller': FormInputController,
        selector: Selector,
        AsynchronousSelect,
    },
    props: {
        active: Boolean,
        btnRed: String,
        btnBlue: String,
        closeDialog: Function,
        dataItem: Object,
        title: String,
    },
    data() {
        return {
            loading: false,
            employee_id: '',
            autoComplateUrl: null,
            courier_arr: [],
            input_value: 'employee_id',
            input_label: 'employee_name',
            isNestedData: false,
            nestedKey: '',
            selectedCourier: null, // optional, boleh dihapus kalau sudah tidak dipakai
            lastKeyword: '',
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
    },
    methods: {
         handleSubmit() {
            if (this.employee_id) {
            this.$router.push({
                name: 'delivery-runsheet-new',
                params: {
                employee_id: this.employee_id,
                },
            })
            this.setRoutePageHistory(this.$route.meta, false)
            } else {
            this.openNotification(
                'warning',
                null,
                'Warning',
                'Courier not choosen yet'
            )
            }
        },
        updateValue(key, val /*, info, dataObj */) {
            if (key !== 'courier') return

            // Kalau someday val = array (multi) → ambil terakhir saja
            let selected = Array.isArray(val) ? val[val.length - 1] : val

            // Kalau komponenmu nanti diubah emit object { value, label, data }
            if (selected && typeof selected === 'object') {
            this.employee_id =
                selected.employee_id ??
                selected.data?.employee_id ??
                selected.value ??
                ''
            } else {
            // sekarang paling besar kemungkinan: selected = employee_id (string/number)
            this.employee_id = selected || ''
            }
        },

        inputFocus(obj, val, info) {
            if (obj.key === 'courier') {
                const newUrl =
                    this.URL.courier_delivery + `/list?n=${this.listenNodeId}`

                if (this.autoComplateUrl !== newUrl) {
                    this.autoComplateUrl = newUrl
                }

                this.input_value = 'employee_id'
                this.input_label = 'employee_name'
                this.isNestedData = false
                this.nestedKey = ''
            }
        },

        handleSearchKeyword(keyword) {
            this.lastKeyword = keyword || ''
        },
        handleClearForm() {
            this.employee_id = ''
            this.selectedCourier = null
            this.lastKeyword = ''
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        },
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>

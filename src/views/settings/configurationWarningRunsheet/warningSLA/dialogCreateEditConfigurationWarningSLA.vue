<template>
    <dialog-master width="lg" :actived="listenActive" :closeDialog="cancel">
        <template v-slot:header>
            {{ listenTitle }}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller
                    ref="formConfigurationWarningSLAController"
                    typeForm="configuration_warning_sla"
                    :dataItem="listenDataItem"
                    :asynchronousSelect_url="autoCompleteUrl"
                    :permissionCreateSelect="checkPermission('create-warning-sla-setting')"
                    :data-testid="`form`"
                    @formData="formData"
                />
            </div>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end" style="margin-top: 2pc">
                <vs-col w="3">
                    <vs-button
                        transparent
                        block
                        danger
                        flat
                        :active="true"
                        :data-testid="`cancel-button`"
                        @click="cancel"
                    >
                        Cancel
                    </vs-button>
                </vs-col>
                <vs-col w="3">
                    <vs-button
                        transparent
                        block
                        flat
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
import FormInputController from '@/components/form/formInputController'
import DialogMaster from '@/components/dialog/dialogMaster'
import Selector from '@/components/input/select'

export default {
    name: 'dialog-create-edit-sla',
    mixins: [master],
    components: {
        'dialog-master': DialogMaster,
        'form-input-controller': FormInputController,
        selector: Selector,
    },
    props: {
        closeDialog: Function,
        active: Boolean,
        title: String,
        dataItem: Object,
        btnRed: String,
        btnBlue: String,
    },
    data() {
        return {
            form: {},
            setting_id: '',
            autoCompleteUrl: null,
        }
    },
    computed: {
        listenActive() {
            if (this.active) {
                this.getDataFormulaType()
                this.getUrlNodeName()
            }
            return this.active
        },
        listenTitle() {
            return this.title
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
        checkPermission(permission) {
            const permissions = this.listenPermissions?.core || []
            return permissions.includes(permission)
        },
        async getDataDetail(val) {
            this.setting_id = val.setting_id

            let arr_node_id = []
            let arr = []
            val.nodes.map((item) => {
                let obj = {}
                obj['label'] = item.node_name
                obj['value'] = item.node_id

                arr.push(obj)
                arr_node_id.push(item.node_id)
            })
            this.$store.dispatch('SET_CONFIGURATION_WARNING_SLA_NODE_ID', arr_node_id)
            this.$store.dispatch('SET_CONFIGURATION_WARNING_SLA_NODE_ID_ArrData', arr)
        },
        formData(form) {
            const { setting_id, ...formWithoutId } = form
            this.form = formWithoutId

            if (form.formula_type === 'PERCENTAGE' && Number(form.value) > 100) {
                this.openNotification(
                    'warn',
                    null,
                    'Invalid Value',
                    'Maksimal value 100 untuk persentase!'
                )
                return
            }

            if (this.setting_id !== undefined && this.setting_id !== '') {
                this.updateData()
            } else {
                this.addData()
            }
        },
        handleSubmit() {
            this.$refs.formConfigurationWarningSLAController.handleSubmit()
        },
        handleClearForm() {
            this.$refs.formConfigurationWarningSLAController.handleClearForm()
            this.form = {}
            this.setting_id = ''
        },
        getDataFormulaType() {
            let arr = [
                {
                    label: 'PERCENTAGE',
                    value: 'PERCENTAGE',
                },
                {
                    label: 'MINUTE',
                    value: 'MINUTE',
                },
            ]
            this.$store.dispatch('SET_CONFIGURATION_WARNING_SLA_FORMULA_TYPE_ArrData', arr)
        },
        getUrlNodeName() {
            let url = this.URL.node + '?n=' + this.listenNodeId + '&sort_order=desc&limit=20&page=1'
            this.autoCompleteUrl = url
        },
        async updateData() {
            await axios
                .put(
                    this.URL.configuration_warning_sla +
                        `/${this.setting_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form),
                    this.Helper.header()
                )
                .then((res) => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit('refresh')
                    this.openNotification(
                        'success',
                        'Update berhasil',
                        'Update konfigurasi Warning SLA berhasil'
                    )
                })
                .catch((err) => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit('refresh')
                    this.openNotification(
                        'danger',
                        err?.response?.data?.code ?? '',
                        'Update gagal',
                        err?.response?.data?.message ?? 'Update konfigurasi Warning SLA gagal'
                    )
                })
        },
        async addData() {
            await axios
                .post(
                    this.URL.configuration_warning_sla + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form),
                    this.Helper.header()
                )
                .then((res) => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit('refresh')
                    this.openNotification(
                        'success',
                        'Data berhasil dibuat',
                        'Berhasil membuat konfigurasi Warning SLA'
                    )
                })
                .catch((err) => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit('refresh')
                    this.openNotification(
                        'danger',
                        err?.response?.data?.code ?? '',
                        'Gagal membuat data',
                        err?.response?.data?.message ?? 'Gagal membuat data konfigurasi Warning SLA'
                    )
                })
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

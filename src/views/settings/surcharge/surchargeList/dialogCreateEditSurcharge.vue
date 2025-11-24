<template>
    <dialog-master :actived="listenActive" :closeDialog="cancel">
        <template v-slot:header>
            {{ listenTitle }}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller
                    ref="formSurchargeController"
                    @formData="formData"
                    :dataItem="listenDataItem"
                    :data-testid="`form`"
                    typeForm="surcharge"
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
                        :active="true"
                        type="submit"
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
export default {
    name: 'dialog-create-edit-surcharge',
    mixins: [master],
    components: {
        'dialog-master': DialogMaster,
        'form-input-controller': FormInputController,
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
            surcharge_id: '',
        }
    },
    computed: {
        listenActive() {
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
                this.surcharge_id = val.surcharge_id
            }
        },
        active: function (val) {
            if (val == true) {
                this.getDataSurchargeType()
            }
        },
    },
    methods: {
        formData(form) {
            this.form = form
            // this.form.hasOwnProperty('surcharge_condition') ? this.form['surcharge_condition'] = JSON.parse(this.form['surcharge_condition']) : ''
            // this.form.hasOwnProperty('surcharge_formula') ? this.form['surcharge_formula'] = JSON.parse(this.form['surcharge_formula']) : ''

            // this.form['surcharge_condition'] = this.form['surcharge_condition'].toString()
            // this.form['surcharge_formula'] = this.form['surcharge_formula'].toString()

            if (this.surcharge_id !== undefined && this.surcharge_id !== '') {
                this.updateData()
            } else {
                this.addData()
            }
        },
        handleSubmit() {
            this.$refs.formSurchargeController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm() {
            this.$refs.formSurchargeController.handleClearForm()
            this.form = {}
            this.surcharge_id = ''
        },
        async getDataSurchargeType() {
            await axios
                .get(
                    this.URL.surcharge_type +
                        `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`,
                    this.Helper.header()
                )
                .then((res) => {
                    if (res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map((item) => {
                            let obj = {}
                            obj['label'] = item.surcharge_type_name
                            obj['value'] = item.surcharge_type_id.toString()

                            arr.push(obj)
                        })

                        this.$store.dispatch(
                            'SET_SURCHARGE_SURCHARGE_TYPE_ID_ArrData',
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
        async updateData() {
            await axios
                .put(
                    this.URL.surcharge + `/${this.surcharge_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form),
                    this.Helper.header()
                )
                .then((res) => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit('refresh')
                    this.openNotification(null, 'Success', 'Update surcharge is success')
                })
                .catch((err) => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit('refresh')
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'Update surcharge is failed',
                        err.response ? err.response.data.message : 'something went wrong'
                    )
                })
        },
        async addData() {
            await axios
                .post(
                    this.URL.surcharge + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form),
                    this.Helper.header()
                )
                .then((res) => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit('refresh')
                    this.openNotification(null, 'Success', 'Create new role is success')
                })
                .catch((err) => {
                    this.loading = false
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit('refresh')
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'Create new role is failed',
                        err.response ? err.response.data.message : 'something went wrong'
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

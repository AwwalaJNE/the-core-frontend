<template>
    <dialog-master width="lg" :actived="listenActive" :closeDialog="cancel">
        <template v-slot:header>
            {{ listenTitle }}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller
                    ref="formDataController"
                    typeForm="kpi_process_target"
                    :dataItem="listenDataItem"
                    :querySearch="querySearch"
                    :data-testid="`form`"
                    @formData="formData"
                    @inputFocus="inputFocus"
                    @onChangeCustom="onChangeCustom"
                />
            </div>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end" style="margin-top: 2pc">
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

import FormInputController from '@/components/form/formInputController'
import DialogMaster from '@/components/dialog/dialogMaster'
import Selector from '@/components/input/select'

export default {
    name: 'kpi-process-target-dialog',
    mixins: [master],
    components: {
        'dialog-master': DialogMaster,
        'form-input-controller': FormInputController,
        selector: Selector,
    },
    props: {
        active: Boolean,
        btnRed: String,
        btnBlue: String,
        dataItem: Object,
        closeDialog: Function,
        title: String,
    },
    data() {
        return {
            form: {},
            kpi_process_target_id: '',
            autoCompleteUrl: null,
            input_value: '',

            loadingDataOrigin: false,
        }
    },
    computed: {
        listenActive() {
            if (this.active) {
                this.getActivityName()
            }
            return this.active
        },
        listenTitle() {
            return this.title
        },
        listenDataItem() {
            return this.dataItem
        },
        listenEntity() {
            return this.$store.getters.getInputs.kpi_process_target.reference_entity.value
        },
    },
    watch: {
        dataItem: function (val) {
            if (val !== undefined) {
                this.getDataDetail(val)
            }
        },
        listenEntity: function (val, oldVal) {
            if (val !== undefined && this.reference_entity !== oldVal) {
                this.autoCompleteUrl = null
                this.input_value = ''
            }
        },
    },
    methods: {
        async getDataDetail(val) {
            this.kpi_process_target_id = val.kpi_process_target_id

            let curr_reference_value_arr = [
                {
                    label: val.reference_value,
                    value: val.reference_value,
                },
            ]

            this.$store.dispatch('SET_KPI_PROCESS_TARGET_REFERENCE_VALUE', val.reference_value)
            this.$store.dispatch(
                'SET_KPI_PROCESS_TARGET_REFERENCE_VALUE_ValueData',
                val.reference_value
            )
            this.$store.dispatch(
                'SET_KPI_PROCESS_TARGET_REFERENCE_VALUE_ArrData',
                curr_reference_value_arr
            )
        },
        formData(form) {
            const { kpi_process_target_id, ...formWithoutId } = form

            this.form = formWithoutId
            this.handleSubmitData()
        },
        onChangeCustom(type, val, obj) {
            switch (type) {
                case 'reference_entity':
                    this.$store.dispatch('SET_KPI_PROCESS_TARGET_REFERENCE_VALUE', '')
                    break
                default:
            }
        },
        inputFocus(obj) {
            if (obj.key == 'reference_value' && this.listenEntity) {
                switch (this.listenEntity) {
                    case 'REGION':
                        this.autoCompleteUrl =
                            this.URL.regional_list +
                            '?n=' +
                            this.listenNodeId +
                            '&sort_order=desc&limit=10&page=1'
                        this.input_value = 'regional_code'
                        this.input_label = 'regional_code'
                        break
                    case 'BRANCH':
                        this.autoCompleteUrl =
                            this.URL.branch_list +
                            '?n=' +
                            this.listenNodeId +
                            '&sort_order=desc&limit=10&page=1'
                        this.input_value = 'branch_code'
                        this.input_label = 'branch_code'
                        break
                    case 'ORIGIN':
                        this.autoCompleteUrl =
                            this.URL.origin_list +
                            '?n=' +
                            this.listenNodeId +
                            '&sort_order=desc&limit=10&page=1'
                        this.input_value = 'origin_code'
                        this.input_label = 'origin_code'
                        break
                    case 'NODE':
                        this.autoCompleteUrl =
                            this.URL.node_list +
                            '?n=' +
                            this.listenNodeId +
                            '&sort_order=desc&limit=10&page=1'
                        this.input_value = 'node_code'
                        this.input_label = 'node_name'
                        break
                    case 'USER':
                        this.autoCompleteUrl =
                            this.URL.user_list +
                            '?n=' +
                            this.listenNodeId +
                            '&sort_order=desc&limit=10&page=1'
                        this.input_value = 'user_login'
                        this.input_label = 'user_name'
                        break
                    case 'EMPLOYEE':
                        this.autoCompleteUrl =
                            this.URL.employee_list +
                            '?n=' +
                            this.listenNodeId +
                            '&sort_order=desc&limit=10&page=1'
                        this.input_value = 'employee_nik'
                        this.input_label = 'employee_name'
                        break
                    default:
                }
            }
        },
        querySearch(queryString, cb) {
            axios
                .get(
                    this.autoCompleteUrl + `?n=${this.listenNodeId}&s=${queryString}`,
                    this.Helper.header()
                )
                .then((res) => {
                    let result = res.data.data
                    let suggestions = []
                    result.length > 0 &&
                        result.map((item) => {
                            suggestions.push({
                                value: item[this.input_label],
                                data: String(item[this.input_value]),
                            })
                        })
                    cb(suggestions)
                })
                .catch()
        },
        async getActivityName() {
            this.loadingDataActivity = true
            await axios
                .get(
                    this.URL.sla +
                        `/activity/activity-name?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                    this.Helper.header()
                )
                .then((res) => {
                    if (res.data.data.length > 0) {
                        let arr = []
                        res.data.data.forEach((item) => {
                            if (item.activity_name !== null) {
                                let obj = {
                                    label: item.activity_name,
                                    value: item.activity_name,
                                }
                                arr.push(obj)
                            }
                        })

                        this.$store.dispatch('SET_KPI_PROCESS_TARGET_PROCESS_NAME_ArrData', arr)
                    } else {
                        this.openNotification(
                            'warn',
                            null,
                            'Activity data is empty!',
                            ' Please create a new Activity data'
                        )
                    }
                    this.loadingDataActivity = false
                })
                .catch((err) => {
                    this.loadingDataActivity = false
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'Failed to populate Activity list',
                        err
                    )
                })
        },
        async handleSubmitData() {
            this.loading = true
            try {
                const res = this.kpi_process_target_id
                    ? await axios.put(
                          `${this.URL.kpi_process_target}/${this.kpi_process_target_id}?n=${this.listenNodeId}`,
                          this.form,
                          this.Helper.header()
                      )
                    : await axios.post(
                          `${this.URL.kpi_process_target}?n=${this.listenNodeId}`,
                          this.form,
                          this.Helper.header()
                      )
                this.openNotification(
                    'success',
                    null,
                    'Success',
                    res?.data?.message || this.kpi_process_target_id
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
                this.$emit('handleClearInput')
                this.$emit('refresh')
            }
        },
        handleSubmit() {
            this.$refs.formDataController.handleSubmit()
        },
        handleClearForm() {
            this.$refs.formDataController.handleClearForm()
            this.form = {}
            this.kpi_process_target_id = ''
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

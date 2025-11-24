<template>
    <dialog-master :actived="listenActive" width="lg" :closeDialog="cancel">
        <template v-slot:header>
            {{ listenTitle }}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller
                    ref="formEmployeeController"
                    @formData="formData"
                    :dataItem="editData"
                    :querySearch="querySearch"
                    :data-testid="`form`"
                    typeForm="employee"
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
import customerByPhone from '@/views/transaction/customerByPhone'

export default {
    name: 'dialog-create-edit-node',
    mixins: [master],
    components: {
        'dialog-master': DialogMaster,
        'form-input-controller': FormInputController,
        customerByPhone: customerByPhone,
    },
    props: {
        closeDialog: Function,
        active: Boolean,
        title: String,
        dataItem: Object,
        btnRed: String,
        btnBlue: String,
        withSchedule: Boolean,
    },
    data() {
        return {
            form: {},
            node_id: '',
            employee_id: '',
            editData: {},
            employee_gender: '',
            employee_gender_list: [
                {
                    label: 'Laki Laki',
                    value: 'L',
                },
                {
                    label: 'Perempuan',
                    value: 'P',
                },
            ],
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
                this.employee_id = val.employee_id
                this.editData = val
            }
        },
        active: function (val) {
            if (val == true) {
                this.getDataEmployeeType()
                this.getGender()
            }
        },
    },
    methods: {
        formData(form) {
            form['employee_node_id'] = form['employee_node_id']['node_id']
            this.form = form
            if (this.employee_id !== undefined && this.employee_id !== '') {
                this.form.employee_id = this.employee_id
                this.updateData()
            } else {
                this.addData()
            }
        },
        handleSubmit() {
            this.$refs.formEmployeeController.handleSubmit() // trigger function submit form dari luar component formInputController
        },
        handleClearForm() {
            this.$refs.formEmployeeController.handleClearForm()
            this.form = {}
            this.employee_id = ''
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

        async getDataEmployeeType() {
            await axios
                .get(this.URL.employee_type + `?n=${this.listenNodeId}`, this.Helper.header())
                .then((res) => {
                    if (res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map((item) => {
                            let obj = {}
                            obj['label'] = item.employee_type_name
                            obj['value'] = item.employee_type_id

                            arr.push(obj)
                        })
                        this.$store.dispatch(
                            'SET_EMPLOYEE_EMPLOYEE_TYPE_ID_ArrData',
                            arr.length > 0 ? arr : null
                        )
                    }
                })
        },
        getGender() {
            let arr = []
            this.employee_gender_list.map((item) => {
                let obj = {}
                obj['label'] = item.label
                obj['value'] = item.value

                arr.push(obj)
            })
            this.$store.dispatch(
                'SET_EMPLOYEE_EMPLOYEE_GENDER_ArrData',
                arr.length > 0 ? arr : null
            )
        },
        // async getDataNode(){
        //     await axios
        //         .get(this.URL.node +
        //         `?n=${this.listenNodeId}`,
        //         this.Helper.header())
        //         .then(res => {
        //             if(res.data.data.length > 0) {
        //                 let arr = []
        //                 res.data.data.map(item => {
        //                     let obj = {}
        //                     obj["label"] = item.node_name
        //                     obj["value"] = item.node_id

        //                     arr.push(obj)
        //                 })
        //                 // this.dataNodeType = arr
        //                 this.$store.dispatch("SET_EMPLOYEE_EMPLOYEE_NODE_ID_ArrData", arr.length > 0 ? arr : null)
        //             }

        //         })
        // },
        async updateData() {
            await axios
                .put(
                    this.URL.employee + `/${this.employee_id}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form),
                    this.Helper.header()
                )
                .then((res) => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit('refresh')
                    this.openNotification(null, 'Update success', 'Update employee is success')
                })
                .catch((err) => {
                    let messageErr = err.response.data ? err.response.data.message : 'Update failed'
                    this.loading = false
                    this.closeDialog()
                    this.$emit('refresh')
                    this.handleClearForm()
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'Update failed',
                        messageErr
                    )
                })
        },
        async addData() {
            await axios
                .post(
                    this.URL.employee + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form),
                    this.Helper.header()
                )
                .then((res) => {
                    this.handleClearForm()
                    this.closeDialog()
                    this.$emit('refresh')
                    this.openNotification(null, 'Create Success', 'Create new employee is success')
                })
                .catch((err) => {
                    this.loading = false
                    this.closeDialog()
                    this.$emit('refresh')
                    this.handleClearForm()
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'Create failed',
                        err
                    )
                })
        },
        cancel() {
            this.closeDialog()
            this.handleClearForm()
        },
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>

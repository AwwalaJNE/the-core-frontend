<template>
    <dialog-master
        :actived="listenActive"
        :loading="listenLoading"
        :closeDialog="cancel"
        width="lg"
    >
        <template v-slot:header>
            {{ listenTitle }}
        </template>

        <template v-slot:content>
            <vs-row>
                <vs-col w="12">
                    <progress-stepper
                        :steps="steps"
                        :step-validators="[validateTypeSection, validateBagSection]"
                        @invalid-step="handleInvalidStep"
                        @valid-step="handleValidStep"
                        @cancel="cancel"
                        @submit="handleSubmit"
                    >
                        <template #step-0>
                            <div class="text-left">
                                <h2>Choose Type</h2>
                                <p>
                                    Please select your surat jalan type, bear in mind that each type
                                    has its own purpose
                                </p>
                            </div>

                            <div class="surat-jalan-container">
                                <div
                                    v-for="(item, index) in suratJalanTypeArray"
                                    :key="index"
                                    :class="[
                                        'surat-jalan-box',
                                        { active: sj_type.value === item.value },
                                    ]"
                                    :data-testid="`bag-${item.label}`"
                                    @click="selectTipeSuratJalan(item)"
                                >
                                    <i
                                        v-if="sj_type.value === item.value"
                                        class="bx bx-check check-icon"
                                    ></i>
                                    <i :class="item.icon" class="bag-icon"></i>
                                    <div class="bag-label">{{ item.label }}</div>
                                </div>
                            </div>
                        </template>
                        <template #step-1>
                            <div class="text-left">
                                <h2>Validate Each Item</h2>
                                <p>Please {{ sj_type.enableItemPlaceholder.toLowerCase() }} here</p>
                            </div>

                            <vs-row style="gap: 1em">
                                <vs-col xs="12" sm="6" lg="6">
                                    <input-general
                                        name=""
                                        rules=""
                                        formKey="scanItemNumber"
                                        ref="scanItemNumber"
                                        :valueData="item_number"
                                        :typeInput="`text`"
                                        :enter_to_update="true"
                                        :hasBarcode="true"
                                        @click-icon="handleIconClick"
                                        @updateValue="updateValue"
                                        @enterUpdate="validateScanItem"
                                    >
                                        <template #icon>
                                            <i class="bx bx-barcode-reader"></i>
                                        </template>
                                    </input-general>
                                </vs-col>

                                <vs-col w="12">
                                    <table-master
                                        hideColumnKey="validate-surat-jalan-bulk"
                                        :dataTable="dataTable"
                                        :dataColumn="dataColumn"
                                        :tableLoading="listenLoading"
                                        :hasAction="false"
                                        :hasPagination="false"
                                    />
                                </vs-col>
                            </vs-row>
                        </template>
                    </progress-stepper>
                </vs-col>
            </vs-row>
            <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />
        </template>
    </dialog-master>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'

import CameraScanner from '@/components/scanner/camera'
import DialogMaster from '@/components/dialog/dialogMaster'
import InputGeneral from '@/components/input/general'
import ProgressStepper from '@/components/progress/progressStepper'
import TableMaster from '@/components/table/tableMaster'

export default {
    name: 'Inbound-Dialog-Bulk-Surat-Jalan',
    mixins: [master],
    components: {
        CameraScanner,
        'dialog-master': DialogMaster,
        'input-general': InputGeneral,
        'progress-stepper': ProgressStepper,
        'table-master': TableMaster,
    },
    props: {
        active: Boolean,
        closeDialog: Function,
        dataItem: Array,
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
    },
    watch: {
        dataItem: function (val) {
            if (val !== undefined) {
                this.dataTable = val
            }
        },
    },
    data() {
        return {
            status_arr: [],

            loading: false,

            isDisabled: false,
            sj_type: '',
            suratJalanTypeArray: [
                {
                    label: 'SURAT JALAN',
                    value: 'SJ',
                    icon: 'bx bx-archive',
                    enableItemPlaceholder: 'Scan Masterbag / Bag / Koli',
                },
                {
                    label: 'DO',
                    value: 'DO',
                    icon: 'bx bx-archive',
                    enableItemPlaceholder: 'Scan Masterbag / Bag',
                },
                {
                    label: 'MTS',
                    value: 'MTS',
                    icon: 'bx bx-archive',
                    enableItemPlaceholder: 'Scan Koli',
                },
                {
                    label: 'HBAG',
                    value: 'HBAG',
                    icon: 'bx bx-archive',
                    enableItemPlaceholder: 'Scan Masterbag / Bag',
                },
            ],

            steps: ['Choose Type', 'Validate Each Item'],

            dataTable: [],
            dataColumn: [
                {
                    label: 'Bag Number',
                    key: 'bag_number',
                    width: 'sm',
                },
                {
                    label: 'Destination',
                    key: 'bag_destination_node_code',
                    width: 'sm',
                },
                {
                    label: 'Type',
                    key: 'bag_type',
                    width: 'sm',
                },
                {
                    label: 'Status',
                    key: 'status',
                    type: 'status',
                    width: 'sm',
                },
            ],
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1,
            },

            item_number: '',
            list_item_no: [],
        }
    },
    methods: {
        selectTipeSuratJalan(item) {
            this.sj_type = item
            this.isDisabled = false
        },
        handleClearForm() {
            this.sj_type = ''
        },
        cancel() {
            this.handleClearForm()
            this.$emit('closeDialog')
        },
        validateTypeSection() {
            return this.sj_type.value
        },
        validateBagSection() {
            this.list_item_no = this.dataTable
                .filter((bag) => bag.status === true)
                .map((bag) => bag.bag_number)
            return this.list_item_no.length > 0
        },
        handleInvalidStep(stepIndex) {
            if (stepIndex === 0)
                this.openNotification('danger', '', 'Failed', 'Wajib memilih tipe surat jalan')
            else if (stepIndex === 1)
                this.openNotification('danger', '', 'Failed', 'No items have been validated')
        },
        handleValidStep(stepIndex) {
            if (stepIndex === 0) this.setActiveInput('scanItemNumber')
            else if (stepIndex === 1) return
        },
        updateValue(key, val) {
            switch (key) {
                case 'scanItemNumber':
                    this.item_number = val
                    break
                default:
            }
        },
        validateScanItem() {
            let found = false

            this.dataTable.forEach((bag) => {
                if (bag.bag_number === this.item_number) {
                    bag.status = true
                    found = true
                }
            })

            if (!found) {
                this.openNotification('danger', '', 'Failed', 'Item number not found')
            }
            this.item_number = ''
        },
        handleIconClick() {
            this.$refs.cameraScanner.open('item_number')
        },
        onCameraScannerGetData(data) {
            if (data?.event === 'result' && data.namespace === 'item_number') {
                this.item_number = data.data.text
            }
        },
        async handleSubmit(done) {
            let form = {
                item_no: this.list_item_no,
                is_penerusan: true,
                sj_type: this.sj_type.value,
            }

            await this.createBulkSuratJalan(form, done)
        },
        async createBulkSuratJalan(form, done) {
            this.loading = true

            try {
                const res = await axios.post(
                    `${this.URL.revamp_surat_jalan_v3_bulk}?n=${this.listenNodeId}`,
                    JSON.stringify(form),
                    this.Helper.header()
                )

                this.openNotification('success', null, 'Success', 'Create surat jalan success')
                done(true)
                this.cancel()
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
                done(false)
            } finally {
                this.loading = false
            }
        },
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>
<style lang="scss" scoped>
.surat-jalan-container {
    display: grid;
    gap: 16px;

    grid-template-columns: repeat(4, 1fr);

    .surat-jalan-box {
        border-radius: 16px;
        text-align: center;
        padding: 16px;
        height: 120px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.2s ease;
        cursor: pointer;
        position: relative;

        i {
            font-size: 40px;
            color: #333;
        }

        span,
        div {
            font-size: 14px;
            font-weight: 500;
        }

        .check-icon {
            position: absolute;
            top: -10px;
            right: -10px;
            background: $coreBlue;
            color: white !important;
            border-radius: 50%;
            font-size: 25px;
        }

        &.active {
            box-shadow: 0 1px 4px $coreBlue;
            color: $coreBlue;

            i {
                color: $coreBlue;
            }
        }
    }

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
}
</style>

<template>
    <dialog-master
        :actived="listenActive"
        :loading="listenLoading"
        :closeDialog="cancel"
        width="md"
    >
        <template v-slot:header>
            {{ listenTitle }}
        </template>

        <template v-slot:content>
            <vs-row>
                <vs-col>
                    <progress-stepper :steps="steps" :currentStep="currentStep" />
                </vs-col>
            </vs-row>
            <vs-row>
                <vs-col w="12">
                    <div v-if="currentStep === 1">
                        <div class="text-left">
                            <h2>Choose Type</h2>
                            <p>
                                Please select your surat jalan type, bear in mind that each type has
                                its own purpose
                            </p>
                        </div>

                        <div class="surat-jalan-container">
                            <div
                                v-for="(item, index) in suratJalanTypeArray"
                                :key="index"
                                :class="['surat-jalan-box', { active: sj_type === item.value }]"
                                :data-testid="`bag-${item.label}`"
                                @click="selectTipeSuratJalan(item)"
                            >
                                <i v-if="sj_type === item.value" class="bx bx-check check-icon"></i>
                                <i :class="item.icon" class="bag-icon"></i>
                                <div class="bag-label">{{ item.label }}</div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="currentStep === 2">
                        <div class="text-left">
                            <h2>Validate Each Item</h2>
                            <p>Please {{ getScanLabel().toLowerCase() }} here</p>
                        </div>

                        <vs-row>
                            <vs-col xs="12" sm="6" lg="6">
                                <input-general
                                    icon-after
                                    name=""
                                    rules=""
                                    formKey="scanItemNumber"
                                    ref="scanItemNumber"
                                    :valueData="item_number"
                                    :typeInput="`text`"
                                    :enter_to_update="true"
                                    @click-icon="handleIconClick"
                                    @updateValue="updateValue"
                                    @enterUpdate="validateItem"
                                >
                                    <template #icon>
                                        <i class="bx bx-barcode-reader"></i>
                                    </template>
                                </input-general>
                            </vs-col>
                        </vs-row>
                        <vs-row>
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
                    </div>
                </vs-col>
            </vs-row>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="3" v-if="currentStep === 1">
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
                <vs-col w="3" v-if="currentStep !== 1">
                    <vs-button
                        transparent
                        block
                        flat
                        type="submit"
                        :data-testid="`submit-button`"
                        @click="prevStep"
                    >
                        Previous Steps
                    </vs-button>
                </vs-col>
                <vs-col w="3" v-if="currentStep !== steps.length">
                    <vs-button
                        transparent
                        block
                        flat
                        :active="true"
                        type="submit"
                        :data-testid="`submit-button`"
                        @click="nextStep"
                    >
                        Next Steps
                    </vs-button>
                </vs-col>
                <vs-col w="3" v-if="currentStep === steps.length">
                    <vs-button
                        transparent
                        block
                        flat
                        :active="true"
                        type="submit"
                        :data-testid="`submit-button`"
                        @click="handleSubmit"
                    >
                        Proceed
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
import InputGeneral from '@/components/input/general'
import ProgressStepper from '@/components/progress/progressStepper'
import TableMaster from '@/components/table/tableMaster'

export default {
    name: 'Inbound-Dialog-Bulk-Surat-Jalan',
    mixins: [master],
    components: {
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
            return this.loadingStatus || this.loading
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
                    enableItem: 'Connote',
                    enableItemPlaceholder: 'Insert Connote Number',
                },
                {
                    label: 'DO',
                    value: 'DO',
                    icon: 'bx bx-archive',
                    enableItem: 'Bag',
                    enableItemPlaceholder: 'Insert Bag Number',
                },
                {
                    label: 'MTS',
                    value: 'MTS',
                    icon: 'bx bx-archive',
                    enableItem: 'Connote',
                    enableItemPlaceholder: 'Insert Connote Number',
                },
                {
                    label: 'HBAG',
                    value: 'HBAG',
                    icon: 'bx bx-archive',
                    enableItem: 'Connote',
                    enableItemPlaceholder: 'Insert Connote Number',
                },
            ],

            currentStep: 1,
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
        }
    },
    methods: {
        selectTipeSuratJalan(item) {
            this.sj_type = item.value
            this.isDisabled = false
            // this.setActiveInput('scanItem')
        },
        handleClearForm() {
            ;(this.receiving_log_id = ''),
                (this.inbound_number = ''),
                (this.item_number = ''),
                (this.status = ''),
                (this.remark = ''),
                (this.fileList = [])
        },
        cancel() {
            this.handleClearForm()
            this.$emit('closeDialog')
        },
        nextStep() {
            if (this.currentStep === 1 && !this.sj_type) {
                return
            }
            if (this.currentStep < this.steps.length) this.currentStep++
        },
        prevStep() {
            if (this.currentStep > 1) this.currentStep--
        },
        getScanLabel() {
            switch (this.sj_type) {
                case 'SJ':
                    return 'Scan Masterbag / Bag / Koli'
                case 'HBAG':
                    return 'Scan Masterbag / Bag'
                case 'MTS':
                    return 'Scan Koli'
                case 'DO':
                    return 'Scan Masterbag / Bag'
                default:
                    return 'Scan Item'
            }
        },
        updateValue(key, val) {
            switch (key) {
                case 'scanItemNumber':
                    this.item_number = val
                    console.log('CEKK', val)
                    break
                default:
            }
        },
        validateItem() {
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
        async handleSubmit() {
            let list_item_no = this.dataTable
                .filter((bag) => bag.status === true)
                .map((bag) => bag.bag_number)

            if (list_item_no.length === 0) {
                this.openNotification('danger', '', 'Failed', 'No items have been validated')
            } else {
                let form = {
                    item_no: list_item_no,
                    is_penerusan: true,
                    sj_type: this.sj_type,
                }

                await this.createBulkSuratJalan(form)
            }
        },
        async createBulkSuratJalan(form) {
            this.loading = true

            try {
                const res = await axios.post(
                    `${this.URL.revamp_surat_jalan_v3_bulk}?n=${this.listenNodeId}`,
                    JSON.stringify(form),
                    this.Helper.header()
                )

                this.openNotification('success', null, 'Success', 'Create surat jalan success')
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
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

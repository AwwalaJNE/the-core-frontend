<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="8" sm="8" lg="8">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{ title }} - {{ employeeName }} ({{ employeeCode }})</h2>
                </div>
            </vs-col>
            <vs-col xs="4" sm="4" lg="4" align="right">
                <div class="btn-print-all">
                    <vs-button
                        class="btn-cash-register"
                        square
                        block
                        @click="finishReceiving"
                        :data-testid="'approve-button'"
                        :disabled="!isFinishReceiving"
                    >
                        Approve HRS
                    </vs-button>
                </div>
            </vs-col>
        </vs-row>

        <section>
            <vs-row>
                <vs-col lg="6" sm="6" xs="12">
                    <div class="box information" style="padding-top: 1px !important">
                        <div class="nav-box">
                            <vs-row justify="space-between">
                                <vs-col xs="12" sm="6" lg="6" style="margin-top: 2em">
                                    <template>
                                        <div class="center">
                                            <vs-input
                                                border
                                                type="text"
                                                v-model="item_no"
                                                label-placeholder="Masukkan Item"
                                                v-on:keyup.enter="updateValue"
                                                autofocus
                                                icon-after
                                                v-uppercase
                                                ref="formInputInbound"
                                                :disabled="loading"
                                                :data-testid="'input-item_no'"
                                            >
                                                <template #icon>
                                                    <i class="bx bxs-file"> </i>
                                                </template>
                                            </vs-input>
                                        </div>
                                    </template>
                                </vs-col>
                            </vs-row>
                        </div>
                    </div>
                    <vs-col lg="12" sm="12" xs="12">
                        <div class="box information" style="padding-top: 1px !important">
                            <vs-row style="padding-top: 5px" justify="space-around">
                                <vs-col lg="12" sm="12" xs="12" w="3">
                                    <h5 align="left">List All Connote Runsheet</h5>
                                </vs-col>
                            </vs-row>
                            <div class="nav-box">
                                <template>
                                    
                                        <ConnoteRunsheetInformation
                                            :ref="'ConnoteRunsheetInformation'"
                                            :employeeId="listenEmployeeId"
                                            :loadingScan="loading"
                                        />
                                    
                                </template>
                            </div>
                        </div>
                    </vs-col>
                </vs-col>

                <!-- col for detail unreceive item-->
                <vs-col lg="6" sm="6" xs="12">
                    <div class="box information" style="padding-top: 1px !important">
                        <vs-row style="padding-top: 5px" justify="space-around">
                            <vs-col lg="12" sm="12" xs="12" w="3">
                                <h5 align="left">
                                    List Connote Undelivered ({{
                                        this.totalConnote ? this.totalConnote : 0
                                    }})
                                </h5>
                            </vs-col>
                        </vs-row>

                        <div class="nav-box">
                            <template>
                                
                                    <UndeliveryInformation
                                        :ref="'undeliveryInformation'"
                                        :employeeId="listenEmployeeId"
                                        v-on:total-connote="getTotal"
                                        :loadingScan="loading"
                                    />
                                
                            </template>
                        </div>
                    </div>

                    <vs-button class="mt-1" style="float: right" square active @click="back">
                        <i class="bx bxs-chevron-left"> </i> BACK
                    </vs-button>
                </vs-col>
            </vs-row>
        </section>

        <!-- dialog confirm create receiving -->
        <dialog-confirm
            :active="activeDialogFinishReceiving"
            :loading="activeLoadingFinishReceiving"
            :closeDialog="closeDialogConfirm"
            title="Finish Receiving Runsheet"
            message="Are you sure you want to Finish Receiving Runsheet?"
            @confirm="confirm"
            @cancel="closeDialogConfirm"
        />
    </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'
import NavItem from '@/components/navbar/navTab'
import Breadcrumb from '@/components/breadcrumb/index'

import UndeliveryInformation from '@/views/delivery/undelivery/UndeliveryInformation'
import DialogConfirm from '@/components/dialog/dialogConfirm'
import ConnoteRunsheetInformation from '@/views/delivery/undelivery/ConnoteRunsheetInformation'

export default {
    name: 'undelivery-hrs',
    mixins: [master],
    components: {
        'nav-item': NavItem,
        breadcrumb: Breadcrumb,
        UndeliveryInformation: UndeliveryInformation,
        'dialog-confirm': DialogConfirm,
        ConnoteRunsheetInformation: ConnoteRunsheetInformation,
    },
    data() {
        return {
            title: 'Handover Runsheet',
            item_no: '',
            no_runsheet: '',
            form: {},
            totalConnote: 0,
            activeDialogFinishReceiving: false,
            activeLoadingFinishReceiving: false,
            isFinishReceivingButtonVisible: false,
            isFinishReceiving: false,
            employeeName: '',
            employeeCode: '',
            loading: false,
        }
    },
    computed: {
        listenEmployeeId() {
            return this.$route.params.employee_id
        },
    },
    watch: {
        isFinishReceiving(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.getButtonValue()
            }
        },
    },
    methods: {
        getTotal(val) {
            this.totalConnote = val
        },
        async refresh() {
            await this.$refs.undeliveryInformation.refresh() // trigger function refresh form dari luar component list
            await this.$refs.ConnoteRunsheetInformation.refresh() // trigger function refresh form dari luar component list
            await this.getButtonValue()
        },
        async updateValue() {
            if (!this.item_no) return

            this.form = {
                item_number: this.item_no,
            }
            await this.processUndelivery()
        },
        async processUndelivery() {
            this.loading = true
            try {
                const res = await axios.post(
                    `${this.URL.undelivery}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form),
                    this.Helper.header()
                )
            } catch (err) {
                await this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
            } finally {
                this.loading = false
                await this.refresh()
                this.handleClearForm()
            }
        },
        async getButtonValue() {
            try {
                const res = await axios.get(
                    `${this.URL.courier_delivery}/${this.listenEmployeeId}/hrs-status?n=${this.listenNodeId}`,
                    this.Helper.header()
                )
                this.isFinishReceiving = res.data.data.ready_to_hrs
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
            }
        },
        back() {
            this.$router.push('/hrs')
            this.setRoutePageHistory(this.$route.meta, false)
        },
        handleClearForm() {
            this.form = {}
            this.item_no = ''
            this.no_runsheet = ''
        },
        finishReceiving() {
            this.activeDialogFinishReceiving = true
        },
        closeDialogConfirm() {
            this.activeDialogFinishReceiving = false
        },
        async confirm(val) {
            if (val) {
                await this.addData()
            }
        },
        async addData() {
            let payload = { courier_id: this.listenEmployeeId }
            this.activeLoadingFinishReceiving = true
            try {
                const res = await axios.post(
                    `${this.URL.handover_runsheet}?n=${this.listenNodeId}`,
                    JSON.stringify(payload),
                    this.Helper.header()
                )
                this.openNotification(
                    'success',
                    null,
                    'Success',
                    res?.data?.message ?? 'Success Receiving Runsheet'
                )
                this.back()
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
                await this.refresh()
            } finally {
                this.activeDialogFinishReceiving = false
                this.activeLoadingFinishReceiving = false
            }
        },
        async getEmployeeData() {
            try {
                const res = await axios.get(
                    `${this.URL.employee}/${this.listenEmployeeId}?n=${this.listenNodeId}`,
                    this.Helper.header()
                )

                this.employeeName = res.data.data.employee_name
                this.employeeCode = res.data.data.employee_code
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code ?? '',
                    'Failed',
                    err?.response?.data?.message ?? 'Something went wrong'
                )
            }
        },
    },
    async mounted() {
        await this.refresh()
        await this.getEmployeeData()
        this.setActiveInput('formInputInbound')
    },
}
</script>
<style lang="scss">
.mb-15 {
    margin-bottom: 1.5em;
}
.custom-title {
    padding: 0.6em;
    text-align: right;
    font-weight: 600;
}
.nav-box {
    margin-top: 1em;
}
.in-get-bag-flex {
    font-size: 16px;
    display: flex;
}
</style>

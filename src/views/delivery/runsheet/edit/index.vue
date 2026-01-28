<!-- eslint-disable vue/max-attributes-per-line -->
<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2 v-copy="title">{{ title }}</h2>
                </div>
            </vs-col>
        </vs-row>
        <template>
            <vs-row style="margin-top: 3em">
                <vs-col xs="12" sm="3" lg="2" style="margin-bottom: 10px">
                    <vs-radio v-model="radio_option" val="connote" :disabled="disabledApprove">
                        Connote (orion)
                    </vs-radio>
                </vs-col>
                <vs-col xs="12" sm="3" lg="2" style="margin-bottom: 10px">
                    <vs-radio v-model="radio_option" val="koli" :disabled="disabledApprove">
                        Koli
                    </vs-radio>
                </vs-col>
                <!-- <vs-col xs="12" sm="3" lg="3" >
          <vs-radio v-model="radio_option" val="bag" :disabled="disabledApprove">
            Bag Pra Runsheet
          </vs-radio>
        </vs-col> -->
                <vs-col xs="12" sm="3" lg="3">
                    <vs-radio v-model="radio_option" val="bag-ex" :disabled="disabledApprove">
                        Bag Pra Runsheet
                    </vs-radio>
                </vs-col>
            </vs-row>
        </template>
        <vs-row align="center" style="margin-top: 1rem">
            <template>
                <vs-col v-if="radio_option === 'bag'" xs="12" sm="3" lg="3">
                    <div class="center">
                        <vs-input
                            ref="formInputConnote"
                            v-model="item_bag"
                            border
                            type="text"
                            label-placeholder="Scan Bag disini"
                            autofocus
                            icon-after
                            v-uppercase
                            :disabled="disabledApprove"
                            @keyup.enter="updateValueBag"
                            @click-icon="$refs.cameraScanner.open('formInputConnote')"
                        >
                            <template #icon>
                                <i class="bx bx-barcode-reader" />
                            </template>
                        </vs-input>
                    </div>
                </vs-col>
                <vs-col v-if="radio_option === 'bag-ex'" xs="12" sm="3" lg="3">
                    <div class="center">
                        <vs-input
                            ref="formInputConnote"
                            v-model="item_bag"
                            border
                            type="text"
                            label-placeholder="Scan Bag disini"
                            autofocus
                            icon-after
                            v-uppercase
                            :disabled="disabledApprove"
                            @keyup.enter="updateValueBag"
                            @click-icon="$refs.cameraScanner.open('formInputConnote')"
                        >
                            <template #icon>
                                <i class="bx bx-barcode-reader" />
                            </template>
                        </vs-input>
                    </div>
                </vs-col>
                <vs-col xs="12" sm="3" lg="3">
                    <div v-if="radio_option === 'koli'" class="center">
                        <vs-input
                            ref="formInputConnote"
                            v-model="item_no"
                            border
                            type="text"
                            label-placeholder="Scan Koli here"
                            autofocus
                            icon-after
                            v-uppercase
                            :disabled="disabledApprove"
                            @keyup.enter="updateValue"
                            @click-icon="$refs.cameraScanner.open('formInputConnote')"
                        >
                            <template #icon>
                                <i class="bx bx-barcode-reader" />
                            </template>
                        </vs-input>
                    </div>
                    <div v-else-if="radio_option === 'connote'" class="center">
                        <vs-input
                            ref="formInputConnoteOrion"
                            v-model="item_no_orion"
                            border
                            type="text"
                            label-placeholder="Scan Connote here (orion)"
                            autofocus
                            icon-after
                            v-uppercase
                            :disabled="disabledApprove"
                            @keyup.enter="updateValueOrion"
                            @click-icon="$refs.cameraScanner.open('formInputConnoteOrion')"
                        >
                            <template #icon>
                                <i class="bx bx-barcode-reader" />
                            </template>
                        </vs-input>
                    </div>
                    <div v-else-if="radio_option === 'bag'" class="center">
                        <vs-input
                            ref="formInputConnote"
                            v-model="item_no"
                            border
                            type="text"
                            label-placeholder="Scan Koli disini "
                            autofocus
                            icon-after
                            v-uppercase
                            :disabled="disabledApprove"
                            @keyup.enter="updateValue"
                            @click-icon="$refs.cameraScanner.open('formInputConnote')"
                        >
                            <template #icon>
                                <i class="bx bx-barcode-reader" />
                            </template>
                        </vs-input>
                    </div>
                    <div v-else-if="radio_option === 'bag-ex'" class="center">
                        <vs-input
                            ref="formInputConnote"
                            v-model="item_no"
                            border
                            type="text"
                            label-placeholder="Scan Koli disini "
                            autofocus
                            icon-after
                            v-uppercase
                            :disabled="disabledApprove"
                            @keyup.enter="updateValue"
                            @click-icon="$refs.cameraScanner.open('formInputConnote')"
                        >
                            <template #icon>
                                <i class="bx bx-barcode-reader" />
                            </template>
                        </vs-input>
                    </div>
                </vs-col>
                <vs-col xs="12" sm="3" lg="3">
                    <div v-if="radio_option === 'koli'" class="center">
                        <vs-input
                            ref="formRemoveConnote"
                            v-model="item_no_remove"
                            border
                            type="text"
                            label-placeholder="Remove Koli here"
                            autofocus
                            icon-after
                            v-uppercase
                            :disabled="disabledApprove"
                            @keyup.enter="removeValue"
                            @click-icon="$refs.cameraScanner.open('formRemoveConnote')"
                        >
                            <template #icon>
                                <i class="bx bx-barcode-reader" />
                            </template>
                        </vs-input>
                    </div>
                    <div v-else-if="radio_option === 'connote'" class="center">
                        <vs-input
                            ref="formRemoveConnoteOrion"
                            v-model="item_no_orion_remove"
                            border
                            type="text"
                            label-placeholder="Remove Connote here (orion)"
                            autofocus
                            icon-after
                            v-uppercase
                            :disabled="disabledApprove"
                            @keyup.enter="removeValueOrion"
                            @click-icon="$refs.cameraScanner.open('formRemoveConnoteOrion')"
                        >
                            <template #icon>
                                <i class="bx bx-barcode-reader" />
                            </template>
                        </vs-input>
                    </div>
                    <div v-else-if="radio_option === 'bag'" class="center">
                        <vs-input
                            ref="formRemoveConnote"
                            v-model="item_no_remove"
                            border
                            type="text"
                            label-placeholder="Hapus Koli disini"
                            autofocus
                            icon-after
                            v-uppercase
                            :disabled="disabledApprove"
                            @keyup.enter="removeValue"
                            @click-icon="$refs.cameraScanner.open('formRemoveConnote')"
                        >
                            <template #icon>
                                <i class="bx bx-barcode-reader" />
                            </template>
                        </vs-input>
                    </div>
                    <div v-else-if="radio_option === 'bag-ex'" class="center">
                        <vs-input
                            ref="formRemoveConnote"
                            v-model="item_no_remove"
                            border
                            type="text"
                            label-placeholder="Hapus Koli disini"
                            autofocus
                            icon-after
                            v-uppercase
                            :disabled="disabledApprove"
                            @keyup.enter="removeValue"
                            @click-icon="$refs.cameraScanner.open('formRemoveConnote')"
                        >
                            <template #icon>
                                <i class="bx bx-barcode-reader" />
                            </template>
                        </vs-input>
                    </div>
                </vs-col>
            </template>
            <vs-col xs="12" sm="3" lg="3">
                <template v-if="dataDelivery.length > 0">
                    <div class="left">
                        <ul style="float: left; text-align: left; padding: 0">
                            <li>
                                User :
                                {{
                                    listenActiveUser
                                        ? `${listenActiveUser.user_login} (${listenActiveUser.user_id})`
                                        : ''
                                }}
                            </li>
                            <!-- <li>Date : {{ dataDelivery.delivery[0].date }}</li> -->
                            <li>
                                Total :
                                {{ dataDelivery.length + ' Connotes' }}
                            </li>
                            <li>
                                Expectations COD :
                                {{ moneyformat(dataDeliverySummary.amount_cod) }}
                            </li>
                        </ul>
                    </div>
                </template>
            </vs-col>
        </vs-row>
        <section>
            <vs-row>
                <vs-col lg="12" sm="12" xs="12">
                    <div class="box information" style="padding-top: 1px !important">
                        <vs-row justify="space between" align="center" style="margin-top: 1rem">
                            <vs-col xs="12" sm="5" lg="7">
                                <p align="left">
                                    <b>Courier</b>
                                </p>
                                <template>
                                    <p align="left">
                                        {{ employee_code }}
                                        ({{ employee_name }})
                                    </p>
                                </template>
                            </vs-col>
                            <vs-col xs="12" sm="7" lg="5">
                                <vs-row justify="end">
                                    <template v-if="dataDelivery.length > 0">
                                        <vs-button
                                            :loading="loadingConfirm"
                                            @click="confirmAction"
                                            style="float: right"
                                            :disabled="disabledConfirm"
                                        >
                                            <span> Confirm Status </span>
                                        </vs-button>
                                    </template>
                                    <template v-if="dataDelivery.length > 0">
                                        <div v-if="!disabledApprove">
                                            <vs-button
                                                :loading="loadingConfirm"
                                                @click="approveAction(true)"
                                                style="float: left"
                                                :disabled="hrsStatus"
                                            >
                                                <span> Approve Runsheet </span>
                                            </vs-button>
                                        </div>
                                        <div v-else-if="disabledApprove">
                                            <vs-button
                                                :loading="loadingConfirm"
                                                @click="approveAction(false)"
                                                style="float: left"
                                                danger
                                                :disabled="hrsStatus"
                                            >
                                                <span> Unapprove Runsheet </span>
                                            </vs-button>
                                        </div>
                                    </template>
                                </vs-row>
                            </vs-col>
                        </vs-row>
                        <div class="nav-box">
                            <div
                                v-if="radio_option === 'bag' && listenDataDelivery.length > 0"
                                style="margin-top: 10px"
                            >
                                <vs-row justify="space-between">
                                    <vs-col xs="12" sm="9" lg="9">
                                        <nav-item :navItem="navItemm" @activeTab="activeTab" />
                                    </vs-col>
                                </vs-row>

                                <template v-if="navActive === 'k-LIST-DELIVERY'">
                                    
                                        <template v-if="listenDataDelivery.length > 0">
                                            <RunsheetInformation
                                                v-if="arrStatus && dataDelivery"
                                                :ref="'runsheetInformation'"
                                                :data-delivery="dataDelivery"
                                                :arr-status="arrStatus"
                                                :query="tempSearch"
                                                :loading="loadingRunsheet"
                                                :delivery-number="delivery_runsheet_number"
                                                :radioOption="radio_option"
                                                @update-selected="updateSelected"
                                                @updatePOD="updatePOD"
                                                @editPOD="editPOD"
                                                :selectedItems="selectedUpdateItems"
                                            />
                                        </template>
                                    
                                </template>
                                <template v-if="navActive === 'k-LIST-DELETE'">
                                    
                                        <template v-if="radio_option === 'bag'">
                                            <RunsheetInformationCancel
                                                v-if="arrStatus && dataDelivery"
                                                :ref="'runsheetInformationCancel'"
                                                :data-delivery="dataDeliveryCancel"
                                                :arr-status="arrStatus"
                                                :query="tempSearch"
                                                :loading="loadingRunsheet"
                                                :delivery-number="delivery_runsheet_number"
                                                :radioOption="radio_option"
                                                @updatePOD="updatePOD"
                                                @editPOD="editPOD"
                                                :selectedItems="selectedUpdateItems"
                                            />
                                        </template>
                                    
                                </template>
                            </div>
                            <vs-row v-if="radio_option !== 'bag'">
                                <!-- col for detail unreceive item-->
                                <vs-col lg="12" :sm="12" xs="12">
                                    <template>
                                        
                                            <template v-if="listenDataDelivery.length > 0">
                                                <RunsheetInformation
                                                    v-if="arrStatus && dataDelivery"
                                                    :ref="'runsheetInformation'"
                                                    :data-delivery="dataDelivery"
                                                    :arr-status="arrStatus"
                                                    :query="tempSearch"
                                                    :loading="loadingRunsheet"
                                                    :delivery-number="delivery_runsheet_number"
                                                    :radioOption="radio_option"
                                                    @update-selected="updateSelected"
                                                    @updatePOD="updatePOD"
                                                    @editPOD="editPOD"
                                                    :selectedItems="selectedUpdateItems"
                                                />
                                            </template>
                                        
                                    </template>
                                </vs-col>
                            </vs-row>
                        </div>
                    </div>
                </vs-col>
            </vs-row>
            <vs-row justify="flex-end">
                <vs-button class="mt-1" style="float: right" square active @click="print">
                    <i class="bx bxs-printer" /> PRINT
                </vs-button>
                <vs-button class="mt-1" style="float: right" square active @click="back">
                    <i class="bx bx-left-arrow" /> BACK
                </vs-button>
            </vs-row>
        </section>

        <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />
        <dialog-confirm-custom
            :active="dialogConfirmEmployee"
            :closeDialog="closeDialogConfirmEmployee"
            @updateValue="updateValueBag"
        />
        <dialog-recheck-connote-zone
            title="Recheck Connote Zone"
            :active="openDialogReCheckConnoteZone"
            :closeDialog="closeActionPopup"
            :dataItem="dataItem"
            :listConnote="listConnote"
            :type="type"
            @addConnoteToRunsheet="addConnoteToRunsheet"
            @addBagPraRunsheetToRunsheet="addBagPraRunsheetToRunsheet"
        />

        <dialog-confirm
            title="Unapprove Runsheet"
            :message="`Are you sure you want to unapprove this runsheet?`"
            :active="activeDialogConfirmUnpproveRunsheet"
            :loading="loadingConfirmUnpproveRunsheet"
            :closeDialog="closeDialogConfirmUnpproveRunsheet"
            @confirm="confirmUnpproveRunsheet"
            @cancel="closeDialogConfirmUnpproveRunsheet"
        />
    </div>
</template>
<script>
/* eslint-disable indent, semi, quotes, import/extensions, quote-props, operator-linebreak */
import axios from 'axios'
import moment from 'moment'
import master from '@/mixins/master'
import NavItem from '@/components/navbar/navTab'
import Breadcrumb from '@/components/breadcrumb/index'
import CameraScanner from '@/components/scanner/camera'

import RunsheetInformation from '@/views/delivery/runsheet/edit/runsheetInformation'
import RunsheetInformationCancel from '@/views/delivery/runsheet/edit/runsheetInformationCancel'
import DialogConfirmCustom from '@/views/delivery/runsheet/edit/dialogConfirm'
import DialogConfirm from '@/components/dialog/dialogConfirm'
import DialogReCheckConnoteZone from '@/views/delivery/runsheet/edit/dialogReCheckConnoteZone'

export default {
    name: 'DeliveryRunsheetEdit',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        'nav-item': NavItem,
        breadcrumb: Breadcrumb,
        RunsheetInformation,
        RunsheetInformationCancel,
        CameraScanner,
        'dialog-confirm-custom': DialogConfirmCustom,
        'dialog-confirm': DialogConfirm,
        'dialog-recheck-connote-zone': DialogReCheckConnoteZone,
    },
    mixins: [master],
    // props: {
    //   radio_option: String
    // },
    data() {
        return {
            title: 'Edit Assign',
            tempSearch: '',
            tempDate: [],
            dialogPickupRequest: false,
            item_no: '',
            item_bag: '',
            item_no_remove: '',
            item_no_orion_remove: '',
            item_no_orion: '',
            form: {},
            delivery_runsheet_number: '',
            employee_id: '',
            employee_data: {},
            dataDelivery: [],
            dataDeliveryCancel: [],
            summary: [],
            arrStatus: null,
            statusObj: {},
            dataDeliverySummary: null,
            loadingRunsheet: false,
            employee_code: '',
            employee_name: '',
            radio_option: 'connote',

            loadingCourier: false,
            loadingConfirm: false,

            selectedUpdateItems: [],
            dialogConfirmEmployee: false,
            dialogLoadingEmployee: false,
            navItemm: [
                {
                    label: 'LIST DELIVERY',
                    key: 'k-LIST-DELIVERY',
                    title: 'Connote List',
                },
                {
                    label: 'DELETE',
                    key: 'k-LIST-DELETE',
                    title: 'Bag List',
                },
            ],
            navActive: 'k-LIST-DELIVERY',
            disabledConfirm: true,
            disabledApprove: false,
            dataItem: {},
            openDialogReCheckConnoteZone: false,
            type: '',
            listConnote: [],
            activeDialogConfirmUnpproveRunsheet: false,
            loadingConfirmUnpproveRunsheet: false,
            hrsStatus: false,
        }
    },
    computed: {
        listenDataDelivery() {
            return this.dataDelivery
        },
        listenDataDeliveryCancel() {
            return this.dataDeliveryCancel
        },
    },
    mounted() {
        this.getStatus()
        this.setFocus()
    },
    methods: {
        // refresh() {
        //   this.$refs.runsheetInformation.refresh(); // trigger function refresh form dari luar component list
        // },
        setFocus() {
            this.$nextTick(() => {
                let inputElement = null

                if (this.radio_option === 'bag' || this.radio_option === 'connote') {
                    inputElement = this.$refs.formInputConnoteOrion?.$el.querySelector('input')
                } else if (this.radio_option === 'koli') {
                    inputElement = this.$refs.formInputConnote?.$el.querySelector('input')
                }

                if (inputElement) {
                    inputElement.focus()
                }
            })
        },
        reload() {
            this.getDataDelivery()
        },
        searchValue(val) {
            this.tempSearch = val
        },
        searchDate(val) {
            this.tempDate = val
        },
        clearSearch() {
            this.$refs.searchInput.clear()
        },
        closeDialogPickupRequest() {
            this.dialogPickupRequest = false
        },
        openDialog() {
            this.dialogPickupRequest = true
        },
        updateValueBag(val) {
            this.form.bag_number = this.item_bag
            this.form.courier_employee_id = this.employee_id
            this.item_no = null
            this.form.koli_number = null
            if (this.radio_option === 'bag') {
                this.getKoli(val)
            } else if (this.radio_option === 'bag-ex') {
                this.dialogConfirmEmployee = false
                this.validateBagPraRunsheet(val)
            }
        },
        updateValue() {
            this.form.koli_number = this.item_no
            this.form.courier_employee_id = this.employee_id
            this.form.bag_number = null
            this.scanConnote()
        },
        updateValueOrion() {
            this.form.koli_number = `${this.item_no_orion}00`
            this.form.courier_employee_id = this.employee_id
            this.form.bag_number = null
            this.scanConnote()
        },
        removeValue() {
            this.form.koli_number = this.item_no_remove
            this.form.courier_employee_id = this.employee_id
            this.form.bag_number = null
            this.removeConnote()
        },
        removeValueOrion() {
            this.form.koli_number = `${this.item_no_orion_remove}00`
            this.form.courier_employee_id = this.employee_id
            this.form.bag_number = null
            this.removeConnote()
        },
        getParamRoute() {
            this.employee_id = this.$route.params.employee_id.toString()
            this.getCourier()
            // this.employee_data.employee_name = this.$route.params.employee_name
            // this.employee_data.employee_code = this.$route.params.employee_code

            if (this.$route.name === 'delivery-runsheet-edit') {
                this.delivery_runsheet_number =
                    this.$route.params.delivery_runsheet_number.toString()
                this.tempDate =
                    typeof this.$route.params.date_filter !== 'undefined'
                        ? this.$route.params.date_filter.toString()
                        : moment().format('YYYY-MM-DD')

                this.getDataDelivery()
            }
        },
        async getCourier() {
            this.loadingCourier = true
            await axios
                .get(
                    `${this.URL.employee}/${this.employee_id}?n=${this.listenNodeId}`,
                    this.Helper.header()
                )
                .then((res) => {
                    const { data } = res.data
                    this.employee_code = data.employee_name
                    this.employee_name = data.employee_code
                    this.loadingCourier = false
                })
                .catch((err) => {
                    this.loadingCourier = true
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate status', err)
                })
        },
        closeDialogConfirmEmployee() {
            this.dialogConfirmEmployee = false
            this.dialogLoadingEmployee = false
        },
        async validateBagPraRunsheet(val) {
            let valForm = {
                item_number: this.item_bag,
                delivery_runsheet_number: this.delivery_runsheet_number,
                courier_id: this.employee_id,
            }
            await axios
                .post(
                    this.URL.validation + `/create-runsheet-pra?n=${this.listenNodeId}`,
                    valForm,
                    this.Helper.header()
                )
                .then((res) => {
                    this.validateCourier(val)
                })
                .catch((err) => {
                    this.openNotification(
                        'danger',
                        err.response.data.status,
                        err.response.data.message
                    )
                    this.clearInputs()
                })
        },
        async validateCourier(val) {
            await axios
                .get(
                    this.URL.bag +
                        '/' +
                        this.form.bag_number +
                        `?n=${this.listenNodeId}&courier_employee_id=${this.employee_id}`,
                    this.Helper.header()
                )
                .then((res) => {
                    const details = res.data.detail
                    for (let detail of details) {
                        this.validation_employee =
                            val === false ? val : res.data.validation_employee
                        if (this.validation_employee) {
                            this.dialogConfirmEmployee = true
                            return
                        }
                    }
                    const postData = {
                        bag_number: this.form.bag_number,
                        courier_employee_id: this.employee_id,
                        delivery_runsheet_number: this.delivery_runsheet_number,
                    }
                    this.scanBagPraRunsheet(postData)
                    // this.refresh()
                    // this.openNotification('success', null, ' success', 'Insert bag item successfully')
                })
                .catch((err) => {
                    this.loading = false
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        ' Nomor bag item is failed',
                        err
                    )
                })
        },
        async scanBagPraRunsheet(postData) {
            if (postData) {
                this.form = postData
            }
            this.type = 'BAG'

            await axios
                .get(
                    `${this.URL.check_delivery_area}?item_number=${this.form.bag_number}&type=${this.type}&n=${this.listenNodeId}&limit=-1`,
                    this.Helper.header()
                )
                .then((res) => {
                    this.addBagPraRunsheetToRunsheet(this.form)
                })
                .catch((err) => {
                    if (err.response.data.status == 'failed') {
                        this.actionPopup(this.form, err.response.data.data)
                    } else {
                        this.openNotification(
                            'danger',
                            err.response ? err.response.data.code : '',
                            '',
                            err.response.data.message
                        )
                    }
                })
        },
        async getKoli(val) {
            await axios
                .get(
                    this.URL.bag +
                        '/' +
                        this.form.bag_number +
                        `?n=${this.listenNodeId}&courier_employee_id=${this.employee_id}`,
                    this.Helper.header()
                )
                .then((res) => {
                    const details = res.data.detail
                    let index = 0
                    for (let detail of details) {
                        const item_number = detail.item_number
                        const detailsLength = details.length
                        const postData = {
                            bag_number: this.form.bag_number,
                            courier_employee_id: this.employee_id,
                            koli_number: item_number,
                        }
                        this.validation_employee =
                            val === false ? val : res.data.validation_employee
                        if (this.validation_employee) {
                            this.dialogConfirmEmployee = true
                        } else {
                            this.dialogConfirmEmployee = false
                            // jika nomor runsheet kosong dan kirim data lebih dari 1
                            // set timeout untuk mendapatkan nomor runsheet yang sama
                            if (detailsLength > 1 && !this.delivery_runsheet_number && index > 0) {
                                setTimeout(() => {
                                    this.scanConnote(postData)
                                }, 5000)
                            } else {
                                this.scanConnote(postData)
                            }
                            index++
                        }
                    }
                    // this.refresh()
                    // this.openNotification('success', null, ' success', 'Insert bag item successfully')
                })
                .catch((err) => {
                    this.loading = false
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        ' Nomor bag item is failed',
                        err
                    )
                })
        },
        actionPopup(dataItem, listConnote) {
            this.dataItem = dataItem
            this.listConnote = listConnote
            this.openDialogReCheckConnoteZone = true
        },
        closeActionPopup() {
            this.openDialogReCheckConnoteZone = false
        },
        async scanConnote(postData) {
            let valForm = {}
            if (postData) {
                this.form = postData
                valForm = {
                    item_number: postData.koli_number,
                    delivery_runsheet_number: this.delivery_runsheet_number,
                    courier_id: this.employee_id,
                }
            } else {
                valForm = {
                    item_number: this.form.koli_number,
                    delivery_runsheet_number: this.delivery_runsheet_number,
                    courier_id: this.employee_id,
                }
            }

            await axios
                .post(
                    `${this.URL.validation}/create-runsheet?n=${this.listenNodeId}`,
                    valForm,
                    this.Helper.header()
                )
                .then((res) => {
                    this.checkZoneDelivery(this.form)
                })
                .catch((err) => {
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        err.response.data.status,
                        err.response.data.message
                    )
                    this.clearInputs()
                })
        },
        async checkZoneDelivery(postData) {
            if (postData) {
                this.form = postData
            }
            this.type = 'KOLI'

            await axios
                .get(
                    `${this.URL.check_delivery_area}?item_number=${this.form.koli_number}&type=${this.type}&n=${this.listenNodeId}&limit=-1`,
                    this.Helper.header()
                )
                .then((res) => {
                    this.addConnoteToRunsheet(this.form)
                })
                .catch((err) => {
                    if (err.response.data.status == 'failed') {
                        this.actionPopup(this.form, err.response.data.data)
                    } else {
                        this.openNotification(
                            'danger',
                            err.response ? err.response.data.code : '',
                            '',
                            err.response.data.message
                        )
                    }
                })
        },
        async addConnoteToRunsheet(form) {
            this.loadingRunsheet = true
            await axios
                .post(
                    `${this.URL.employee}/${this.employee_id}/delivery?n=${this.listenNodeId}&delivery_runsheet_number=${this.delivery_runsheet_number}`,
                    JSON.stringify(form),
                    this.Helper.header()
                )
                .then((res) => {
                    // this.dataDelivery = this.processDataDelivery(res.data.data)
                    // this.dataDelivery.map((item) => {
                    //   item.employee_name = res.data.data.employee_name
                    // })
                    if (res.data.hasOwnProperty('summary')) {
                        this.dataDelivery.employee_name = res.data.data.employee_name
                            ? res.data.data.employee_name
                            : null
                        this.dataDelivery.employee_code = res.data.data.employee_code
                            ? res.data.data.employee_code
                            : null
                        this.dataDeliverySummary = res.data.summary
                        this.delivery_runsheet_number =
                            this.dataDeliverySummary.delivery_runsheet_number.toString()
                        this.getDataDelivery()
                        this.openNotification(null, 'Success', 'Update success')
                        this.loadingRunsheet = false
                        this.clearInputs()
                        this.setFocus()
                    } else {
                        this.getDataDelivery()
                        this.openNotification(null, 'Success', res.data.message)
                        this.loadingRunsheet = false
                        this.clearInputs()
                    }
                })
                .catch((err) => {
                    this.loadingRunsheet = false
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        '',
                        err.response.data.message
                    )
                })
        },
        async addBagPraRunsheetToRunsheet(form) {
            this.loadingRunsheet = true
            await axios
                .post(
                    `${this.URL.employee}/${this.employee_id}/delivery/bag-pra?n=${this.listenNodeId}`,
                    JSON.stringify(form),
                    this.Helper.header()
                )
                .then((res) => {
                    // this.dataDelivery = this.processDataDelivery(res.data.data)
                    // this.dataDelivery.map((item) => {
                    //   item.employee_name = res.data.data.employee_name
                    // })
                    if (res.data.hasOwnProperty('summary')) {
                        this.dataDelivery.employee_name = res.data.data.employee_name
                            ? res.data.data.employee_name
                            : null
                        this.dataDelivery.employee_code = res.data.data.employee_code
                            ? res.data.data.employee_code
                            : null
                        this.dataDeliverySummary = res.data.summary
                        this.delivery_runsheet_number =
                            this.dataDeliverySummary.delivery_runsheet_number.toString()
                        this.getDataDelivery()
                        this.openNotification(null, 'Success', 'Update success')
                        this.loadingRunsheet = false
                        this.clearInputs()
                        this.setFocus()
                    } else {
                        this.loadingRunsheet = false
                        this.getDataDelivery()
                        this.openNotification(null, 'Success', res.data.message)
                        this.loadingRunsheet = false
                        this.clearInputs()
                    }
                })
                .catch((err) => {
                    this.loadingRunsheet = false
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        '',
                        err.response.data.message
                    )
                })
        },
        async removeConnote() {
            this.loadingRunsheet = true
            await axios
                .delete(
                    `${this.URL.employee}/${this.employee_id}/delivery/cancel?n=${this.listenNodeId}&delivery_runsheet_number=${this.delivery_runsheet_number}&koli_number=${this.form.koli_number}`,
                    this.Helper.header()
                )
                .then((res) => {
                    // this.dataDelivery = this.processDataDelivery(res.data.data)
                    // this.dataDelivery.map((item) => {
                    //   item.employee_name = res.data.data.employee_name
                    // })
                    if (res.data.hasOwnProperty('summary')) {
                        this.dataDelivery.employee_name = res.data.data.employee_name
                            ? res.data.data.employee_name
                            : null
                        this.dataDelivery.employee_code = res.data.data.employee_code
                            ? res.data.data.employee_code
                            : null
                        this.dataDeliverySummary = res.data.summary
                        this.delivery_runsheet_number =
                            this.dataDeliverySummary.delivery_runsheet_number.toString()
                        this.getDataDelivery()
                        this.openNotification(null, 'Success', 'Remove koli success')
                        this.loadingRunsheet = false
                        this.clearInputs()
                    } else {
                        this.getDataDelivery()
                        this.openNotification(null, 'Success', res.data.message)
                        this.loadingRunsheet = false
                        this.clearInputs()
                    }
                })
                .catch((err) => {
                    this.loadingRunsheet = false
                    this.clearInputs()
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        '',
                        err.response.data.message
                    )
                })
        },
        async getStatus() {
            await axios
                .get(
                    `${this.URL.status}?status_type=DELIVERY&n=${this.listenNodeId}&limit=-1`,
                    this.Helper.header()
                )
                .then((res) => {
                    const statusObj = {}
                    this.arrStatus = res.data.data.map((item) => {
                        const obj = {}
                        obj.label = `${item.status_description}(${item.status_code})`
                        obj.value = item.status_code
                        obj.data = item

                        if (
                            item.hasOwnProperty('status_condition') &&
                            item.status_condition !== null
                        ) {
                            if (statusObj.hasOwnProperty(item.status_condition.toLowerCase())) {
                                statusObj[item.status_condition.toLowerCase()].push(obj)
                            } else {
                                statusObj[item.status_condition.toLowerCase()] = [obj]
                            }
                        }

                        return obj
                    })
                    this.statusObj = statusObj
                    this.getParamRoute() // perlu data status dulu sebelum getDataDelivery didalam getParamRoute {fix issue data tidak tampil}
                })
                .catch((err) => {
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate status', err)
                })
        },
        async getDataDelivery() {
            let deliveryCancel = this.radio_option === 'bag'
            this.loadingRunsheet = true
            await axios
                .get(
                    `${this.URL.employee}/${this.employee_id}/delivery?n=${this.listenNodeId}&delivery_runsheet_number=${this.delivery_runsheet_number}&date_filter=${this.tempDate}&deliveryCancel=${deliveryCancel}`,
                    this.Helper.header()
                )
                .then((res) => {
                    this.dataDelivery = this.processDataDelivery(res.data.data)
                    this.dataDeliveryCancel = this.processDataDeliveryCancel(res.data.data)

                    this.dataDeliverySummary = res.data.summary
                    this.delivery_runsheet_number =
                        res.data.summary.delivery_runsheet_number.toString()
                    this.loadingRunsheet = false
                })
                .catch((err) => {
                    this.loadingRunsheet = false
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate status', err)
                })
        },
        processDataDelivery(data) {
            const status = this.statusObj || {}
            const delivery = data.delivery ? data.delivery : []
            // eslint-disable-next-line array-callback-return
            delivery.map((item) => {
                item.status_delivery = []
                item.is_disabled_input = false
                if (item.hasOwnProperty('koli_number')) {
                    if (item.koli_number.toLowerCase().includes('rt')) {
                        item.status_delivery = [...status.rt, ...status.all]
                    } else {
                        item.status_delivery = [...status.normal, ...status.all]
                    }
                }
                // if(item.hasOwnProperty("status")) {
                //   // item["is_disabled_input"] = item
                //   if(item["status"] !== null && typeof item["status"] == 'object') {
                //       if(item["status"].hasOwnProperty('status_code')) {
                //         item["is_disabled_input_status"] = item["status"]["status_code"] !== null || item["status"]["status_code"] !== "" ? true : false
                //       }
                //   }
                // }
                // if(item.hasOwnProperty("status_code")){
                //   if(item["status_code"] !== null && typeof item["status_code"] == 'string') {
                //     item["is_disabled_input_status"] = item["status_code"] !== null || item["status_code"] !== "" ? true : false
                //   }
                // }
                if (item.hasOwnProperty('remarks')) {
                    if (item['status_code'] == null) {
                        item['is_disabled_input_remarks'] =
                            item['remarks'] !== null || item['remarks'] !== '' ? true : false
                    }
                }
                if (item.hasOwnProperty('receiver_name')) {
                    if (item['status_code'] == null) {
                        item['is_disabled_input_reveiver'] =
                            item['receiver_name'] !== null || item['receiver_name'] !== ''
                                ? true
                                : false
                    }
                }
                if (item.is_approve === '1') {
                    this.disabledApprove = true
                } else {
                    item['is_disabled_input_status'] = true
                }

                if (item.is_hrs) {
                    this.hrsStatus = true
                }

                item.isDisabled = item.is_delivered === 1
                if (item.is_delivered == 1 || item.is_pod_orion == 1) {
                    this.disableDeliveredPOD(item)
                }
                item.employee_name = data.employee_name
                item.employee_code = data.employee_code
                item.warning_koli_record_id = item?.warning_koli_record_id
            })
            // console.log(" processDataDelivery : status =>", status);
            // console.log(" processDataDelivery : delivery =>", delivery);

            return delivery
        },
        processDataDeliveryCancel(data) {
            const status = this.statusObj || {}
            const deliveryCancel = data.delivery_cancel ? data.delivery_cancel : []
            deliveryCancel.map((item) => {
                item.status_delivery = []
                item.is_disabled_input = false
                item['is_disabled_cancel'] = true
                if (item.hasOwnProperty('koli_number')) {
                    if (item.koli_number.toLowerCase().includes('rt')) {
                        item.status_delivery = [...status.rt, ...status.all]
                    } else {
                        item.status_delivery = [...status.normal, ...status.all]
                    }
                }
                item.isDisabled = item.is_delivered === 1
                item.employee_name = data.employee_name
                item.employee_code = data.employee_code
            })

            return deliveryCancel
        },
        async updatePOD(dataPOD, info) {
            if (dataPOD.remarks || dataPOD.receiver_name || dataPOD.status) {
                if (!dataPOD.status) {
                    this.openNotification('warn', null, 'Status Kosong', 'Status Wajib Diisi')
                    return
                } else {
                    let statusDesc = this.arrStatus.find(
                        (status) => status.value === dataPOD.status
                    )
                    if (statusDesc.label.includes('RECEIVED') && !dataPOD.receiver_name) {
                        this.openNotification(
                            'warn',
                            null,
                            'Receiver Kosong',
                            'Receiver Wajib Diisi'
                        )
                        return
                    }
                }
                if (this.delivery_runsheet_number) {
                    dataPOD.delivery_runsheet_number = this.delivery_runsheet_number
                    if (this.employee_id != null || this.employee_id !== '') {
                        dataPOD.courier_employee_id = this.employee_id
                    }

                    this.loadingConfirm = true

                    await axios
                        .put(
                            `${this.URL.delivery}/${this.delivery_runsheet_number}/detail?n=${this.listenNodeId}`,
                            JSON.stringify(dataPOD),
                            this.Helper.header()
                        )
                        .then((res) => {
                            this.getDataDelivery()
                            this.form = {}
                            this.openNotification(null, 'Success', 'POD UPDATED!')
                            this.selectedUpdateItems = []
                            this.disabledConfirm = true
                        })
                        .catch((err) => {
                            this.openNotification(
                                'danger',
                                err.response.data.message,
                                err.response.data.message
                            )
                        })
                        .finally(() => {
                            this.loadingConfirm = false
                        })
                } else {
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'Failed',
                        'Runsheet unavailable!'
                    )
                }
            } else {
                this.openNotification(
                    'danger',
                    err.response ? err.response.data.code : '',
                    'POD KOSONG',
                    'Isi POD terlebih dahulu'
                )
            }
        },
        disableDeliveredPOD(val) {
            this.$set(val, 'is_disabled_input_status', true)
            this.$set(val, 'is_disabled_input_remarks', true)
            this.$set(val, 'is_disabled_input_reveiver', true)
        },
        async editPOD(val) {
            const dataPOD = {
                courier_employee_id: val.courier_employee_id,
                delivery_runsheet_number: val.delivery_runsheet_number,
                koli_number: val.koli_number,
                status: val.status_code,
                remarks: val.remarks,
                receiver_name: val.receiver_name,
            }
            await axios
                .put(
                    `${this.URL.delivery}/${val.delivery_runsheet_number}/edit?n=${this.listenNodeId}`,
                    JSON.stringify(dataPOD),
                    this.Helper.header()
                )
                .then((res) => {
                    this.getDataDelivery()
                    this.form = {}
                    this.openNotification(null, 'Success', 'POD EDITED!')
                })
                .catch((err) => {
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'EDIT FAILED !',
                        err.response.data.message
                    )
                })
        },
        back() {
            this.$router.push('/delivery/runsheet')
            this.setRoutePageHistory(this.$route.meta, false)
        },
        print() {
            const routeData = this.$router.resolve({
                name: 'printGeneral',
                params: {
                    id: this.delivery_runsheet_number,
                    type: 'delivery',
                    employee_id: this.employee_id,
                    node_id: this.listenNodeId,
                },
            })

            const printWindow = window.open(routeData.href, '_blank', 'noopener')

            if (printWindow) {
                printWindow.onload = function () {
                    printWindow.print()
                    printWindow.onafterprint = () => printWindow.close()
                }
            }
        },
        updateSelected(arr) {
            this.selectedUpdateItems = arr
            this.disabledConfirm = arr.length > 0 && this.disabledApprove ? false : true
        },
        confirmAction() {
            if (this.selectedUpdateItems.length > 0) {
                // this.$refs.runsheetInformation.runsheetAction(this.selectedUpdateItems);
                this.selectedUpdateItems.forEach((item) => {
                    const dataPOD = {
                        // Construct the payload to be sent in the request body
                        courier_employee_id: item.courier_employee_id,
                        delivery_runsheet_number: item.delivery_runsheet_number,
                        koli_number: item.koli_number,
                        status: item.status_code,
                        remarks: item.remarks,
                        receiver_name: item.receiver_name,
                    }

                    this.updatePOD(dataPOD)
                })
            } else {
                this.openNotification('danger', 'Failed', 'Please select at least one item')
            }
        },
        approveAction(val) {
            this.updateApprove(val)
        },

        updateApprove(val) {
            this.data_is_approve = {
                approved: val,
            }

            if (val) {
                this.confirmationApprove(val)
            } else {
                this.activeDialogConfirmUnpproveRunsheet = true
            }
        },
        confirmUnpproveRunsheet() {
            this.confirmationApprove(false)
            this.activeDialogConfirmUnpproveRunsheet = false
            this.reload()
        },
        closeDialogConfirmUnpproveRunsheet() {
            this.activeDialogConfirmUnpproveRunsheet = false
        },
        async confirmationApprove(val) {
            this.loadingConfirmUnpproveRunsheet = true
            await axios
                .patch(
                    `${this.URL.delivery}/${this.delivery_runsheet_number}/approve?n=${this.listenNodeId}`,
                    JSON.stringify(this.data_is_approve),
                    this.Helper.header()
                )
                .then((res) => {
                    this.form = {}
                    this.disabledApprove = val
                    this.openNotification(null, 'Success', res.data.message)
                    this.reload()
                })
                .catch((err) => {
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'approve FAILED !',
                        err.response.data.message
                    )
                })
            this.loadingConfirmUnpproveRunsheet = false
        },

        onCameraScannerGetData(data) {
            if (data && data.event === 'result') {
                const result = data.data

                switch (data.namespace) {
                    case 'formInputConnoteOrion':
                        this.item_no_orion = result.text
                        this.updateValueOrion()
                        break
                    case 'formInputConnote':
                        this.item_no = result.text
                        this.updateValue()
                        break
                    case 'formRemoveConnote':
                        this.item_no_remove = result.text
                        this.removeValue()
                        break
                    case 'formRemoveConnoteOrion':
                        this.item_no_orion_remove = result.text
                        this.removeValueOrion()
                        break
                    default:
                        break
                }
            }
        },
        activeTab(val) {
            this.navActive = val
            let item = this.navItemm.filter((item) => {
                return item.key == val
            })
            this.title = item[0].title
        },
        clearInputs() {
            this.item_no = ''
            this.item_no_orion = ''
            this.item_no_remove = ''
            this.item_no_orion_remove = ''
            this.item_bag = ''
            delete this.form.delivery_runsheet_number
            this.openDialogReCheckConnoteZone = false
        },
    },
    watch: {
        radio_option(val) {
            this.radio_option = val
            if (this.radio_option == 'bag') {
                this.getDataDelivery(val)
            }

            this.setFocus()
        },
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
.information {
    min-height: 190px;
}
.nav-box {
    margin-top: 1em;
}
</style>

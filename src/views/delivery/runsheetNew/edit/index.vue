<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{ title }}</h2>
                </div>
            </vs-col>
        </vs-row>
        <vs-row align="self-end" style="margin-top: 1rem;">
            <template>
                <vs-col xs="12" sm="3" lg="3">
                    <vs-row class="mb-2" style="gap: 1rem;">
                        <vs-checkbox v-model="is_auto_open_bag" @change="handleAutoOpenBag">
                            Auto Open Bag
                        </vs-checkbox>
                        <vs-checkbox v-model="is_validate_courier" @change="handleValidateCourier">
                            Validate Courier
                        </vs-checkbox>
                    </vs-row>

                    <vs-row>
                        <div class="center" style="width: 100%">
                            <vs-input
                                ref="formInputBag"
                                v-model="item_bag"
                                border
                                type="text"
                                label-placeholder="Scan Bag Pra Runsheet Here"
                                icon-after
                                v-uppercase
                                :disabled="disabledApprove"
                                @keydown.enter="updateValueBag"
                                @click-icon="$refs.cameraScanner.open('formInputBag')"
                                @focus="activeInput = 'formInputBag'"
                            >
                                <template #icon>
                                <i class="bx bx-barcode-reader" />
                                </template>
                            </vs-input>
                        </div>
                    </vs-row>
                </vs-col>

                <vs-col xs="12" sm="3" lg="3">
                    <div class="center">
                        <vs-input
                            ref="formInputConnote"
                            v-model="item_no"
                            border
                            type="text"
                            label-placeholder="Scan Connote Here"
                            icon-after
                            v-uppercase
                            :disabled="disabledApprove"
                            @keydown.enter="updateValue"
                            @click-icon="$refs.cameraScanner.open('formInputConnote')"
                            @focus="activeInput = 'formInputConnote'"
                        >
                            <template #icon>
                                <i class="bx bx-barcode-reader" />
                            </template>
                        </vs-input>
                    </div>
                </vs-col>
                <vs-col xs="12" sm="3" lg="3">
                    <div class="center">
                        <vs-input
                            ref="formRemoveConnote"
                            v-model="item_no_remove"
                            border
                            type="text"
                            label-placeholder="Remove Connote Here"
                            icon-after
                            v-uppercase
                            :disabled="disabledApprove"
                            @keydown.enter="removeValue"
                            @click-icon="$refs.cameraScanner.open('formRemoveConnote')"
                            @focus="activeInput = 'formRemoveConnote'"
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
                                    listenActiveUser ? `${listenActiveUser.user_login} (${listenActiveUser.user_id})` : ""
                                }}
                            </li>
                            <li>
                                Total :
                                {{ dataDelivery.length + " Connotes" }}
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
                        <vs-row justify="space between" align="center" style="margin-top: 1rem;">
                            <vs-col xs="12" sm="5" lg="7">
                                <p align="left">
                                    <b>Courier</b>
                                </p>
                                <vs-col xs="12" sm="4" lg="4">
                                    <template>
                                        <div>
                                            <selector 
                                                ref="courier"
                                                formKey="courier"
                                                :rules="''" 
                                                :valueData="courier_arr"
                                                :selectedValue="selectedCourier"
                                                :isMultiple="false"
                                                :disabled="disabledApprove"
                                                @updateValue="updateValueCourier" 
                                            />
                                        </div>
                                    </template>
                                </vs-col>
                            </vs-col>
                            <vs-col xs="12" sm="7" lg="5">
                                <vs-row justify="end">
                                        <template v-if="dataDelivery.length > 0">
                                            <vs-button
                                                style="float: right"
                                                :loading="loadingConfirm"
                                                :disabled="disabledConfirm"
                                                @click="confirmAction"
                                            >
                                                <span>
                                                    Confirm Status
                                                </span>
                                            </vs-button>
                                        </template>
                                        <template v-if="dataDelivery.length > 0">
                                            <template v-if="listenUserRoleName === 'HELPDESK'">
                                                <div v-if="!disabledApprove">
                                                    <vs-button
                                                        style="float: left"
                                                        :disabled="hrsStatus"
                                                        :loading="loadingApprove"
                                                        @click="approveAction(true)"
                                                    >
                                                        <span>
                                                            Approve Runsheet
                                                        </span>
                                                    </vs-button>
                                                </div>
                                                <div v-else-if="disabledApprove">
                                                    <vs-button
                                                        danger
                                                        style="float: left"
                                                        :disabled="hrsStatus"
                                                        :loading="loadingApprove"
                                                        @click="approveAction(false)"
                                                    >
                                                        <span>
                                                            Unapprove Runsheet
                                                        </span>
                                                    </vs-button>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <vs-button
                                                    style="float: left"
                                                    :disabled="disabledApprove"
                                                    :loading="loadingApprove"
                                                    @click="approveAction(true)"
                                                >
                                                    <span>
                                                        {{ disabledApprove ? "Runsheet Approved" : "Approve Runsheet"}}
                                                    </span>
                                                    </vs-button>
                                            </template>
                                        </template>
                                </vs-row>
                            </vs-col>
                        </vs-row>
                        <div class="nav-box">
                            <vs-row>
                                <vs-col lg="12" :sm="12" xs="12">
                                    <template>
                                        <transition name="slide-fade">
                                            <template v-if="listenDataDelivery.length > 0 ">
                                                <RunsheetInformation
                                                    v-if="arrStatus && dataDelivery"
                                                    ref="runsheetInformation"
                                                    :arr-status="arrStatus"
                                                    :data-delivery="dataDelivery"
                                                    :delivery-number="delivery_runsheet_number"
                                                    :loading="loadingRunsheet"
                                                    :selectedItems="selectedUpdateItems"
                                                    @update-selected="updateSelected"
                                                    @updatePOD="updatePOD"
                                                    @editPOD="editPOD"
                                                />
                                            </template>
                                        </transition>
                                    </template>
                                </vs-col>
                            </vs-row>
                        </div>
                    </div>
                </vs-col>
            </vs-row>
            <vs-row justify="flex-end" style="padding-top: 40px;">
                <template v-if="is_approve === '1'">
                    <vs-button
                        class="mt-1"
                        style="float: right"
                        square
                        active
                        @click="print"
                    >
                        <i class="bx bxs-printer" /> PRINT
                    </vs-button>
                </template>
                
                <vs-button
                    class="mt-1"
                    style="float: right;"
                    square
                    active
                    @click="back"
                >
                    <i class="bx bx-left-arrow" /> BACK
                </vs-button>
            </vs-row>
        </section>

        <camera-scanner 
            ref="cameraScanner" 
            @data="onCameraScannerGetData" 
        />

        <dialog-recheck-connote-sla
            ref="recheck_connote_sla"
            title="Recheck Connote Sla"
            :active="openDialogReCheckConnoteSla"
            :closeDialog="() => closeDialog('recheck_connote_sla')"
            :dataItemCheckSla="dataItemCheckSla"
            :type="type"
            @checkZoneDelivery="checkZoneDelivery"
        />

        <dialog-recheck-connote-zone
            ref="recheck_connote_zone"
            title="Recheck Connote Zone"
            :active="openDialogReCheckConnoteZone"
            :closeDialog="() => closeDialog('recheck_connote_zone')"
            :dataItem="dataItem"
            :listConnote="listConnote"
            :type="type"
            @addConnoteToRunsheet="addConnoteToRunsheet"
            @addBagPraRunsheetToRunsheet="addBagPraRunsheetToRunsheet"
        />

        <dialog-confirm
            ref="unapprove_runsheet"
            title="Unapprove Runsheet"
            :message="`Are you sure you want to unapprove this runsheet?`"
            :active="activeDialogConfirmUnpproveRunsheet"
            :loading="loadingConfirmUnpproveRunsheet"
            :closeDialog="() => closeDialog('unapprove_runsheet')"
            @confirm="confirmUnpproveRunsheet"
            @cancel="closeDialog('unapprove_runsheet')"
        />
    </div>
</template>
<script>

import axios from "axios";
import master from "@/mixins/master";
import moment from "moment";

import Breadcrumb from "@/components/breadcrumb/index";
import CameraScanner from "@/components/scanner/camera";
import NavItem from "@/components/navbar/navTab";
import Selector from "@/components/input/select"

import DialogConfirm from "@/components/dialog/dialogConfirm"
import DialogConfirmCustom from "@/views/delivery/runsheetNew/edit/dialogConfirm";
import DialogReCheckConnoteZone from "@/views/delivery/runsheetNew/edit/dialogReCheckConnoteZone";
import DialogReCheckConnoteSla from "@/views/delivery/runsheetNew/edit/dialogReCheckConnoteSla";
import RunsheetInformation from "@/views/delivery/runsheetNew/edit/runsheetInformation";

export default {
    name: "DeliveryRunsheetEdit",
    components: {
        "nav-item": NavItem,
        breadcrumb: Breadcrumb,
        RunsheetInformation,
        CameraScanner,
        "dialog-confirm": DialogConfirm,
        "dialog-recheck-courier": DialogConfirmCustom,
        "dialog-recheck-connote-zone": DialogReCheckConnoteZone,
        "dialog-recheck-connote-sla": DialogReCheckConnoteSla,
        "selector": Selector
    },
    mixins: [master],
    data() {
        return {
            title: "Edit Assign",
            tempDate: [],
            item_no: "",
            item_bag: "",
            item_no_remove: "",
            form: {},
            delivery_runsheet_number: "",
            employee_id: "",
            employee_data: {},
            dataDelivery: [],
            summary: [],
            arrStatus: null,
            statusObj: {},
            dataDeliverySummary: null,
            loadingRunsheet: false,
            employee_code: "",
            employee_name: "",

            loadingCourier: false,
            loadingConfirm: false,
            loadingApprove: false,

            selectedUpdateItems: [],
            navItemm: [
                {
                    label: "LIST DELIVERY",
                    key: "k-LIST-DELIVERY",
                    title: "Connote List"
                },
                {
                    label: "DELETE",
                    key: "k-LIST-DELETE",
                    title: "Bag List"
                }
            ],
            navActive: "k-LIST-DELIVERY",
            disabledConfirm: true,
            disabledApprove: false,
            dataItem: {},
            dataItemCheckSla: {},
            openDialogReCheckConnoteZone: false,
            openDialogReCheckConnoteSla: false,
            type: '',
            listConnote: [],
            activeDialogConfirmUnpproveRunsheet: false,
            loadingConfirmUnpproveRunsheet:false,
            hrsStatus: false,
            courier_arr: [],
            selectedCourier: "",
            is_approve: '0',
            is_auto_open_bag: true,
            is_validate_courier: false
        };
    },
    computed: {
        listenDataDelivery() {
            return this.dataDelivery;
        }
    },
    beforeDestroy() {
        window.removeEventListener('timezone-changed', this.reload);
    },
    mounted() {
        window.addEventListener('timezone-changed', this.reload);
        this.getStatus();
        this.setFocusRemove();
        this.setFocusPra();
        this.setFocus();
        this.getDataCourier();
    },
    methods: {
        setFocus() {
            this.$nextTick(() => {
                this.focusInput('formInputConnote')
            });
        },
        setFocusPra() {
            this.$nextTick(() => {
                this.focusInput('formInputBag')
            });
        },
        setFocusRemove() {
            this.$nextTick(() => {
                this.focusInput('formRemoveConnote')
            });
        },
        reload() {
            this.getDataDelivery();
        },
        async getDataCourier() {
            this.loading = true;

            await axios
                .get(this.URL.courier_delivery + `/list?n=${this.listenNodeId}`, this.Helper.header())
                .then(res => { 
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            let obj = {}
                            obj["label"] = item.employee_name + ' ( ' + item.employee_code + ' ) '
                            obj["value"] = item.employee_id
                            obj["item"] = item

                            arr.push(obj)
                        })

                        if(arr.length == 0) {
                            arr = [{'label': null, 'value': null}]
                        }

                        this.courier_arr = arr;
                    } else {
                        this.openNotification('warn', null, 'Delivery courier data is empty!', ' Please create a new courier delivery');
                    }
                }).catch(err => {
                    this.openNotification('danger', err?.err?.response?.data?.code ?? '', 'Failed to populate delivery courier list', err?.response?.data?.message ?? 'something went wrong');
                })

            this.loading = false
        },
        updateValueCourier(key, val, info){
            switch(key) {
                case "courier":
                    const obj = this.courier_arr.find(item => item.value == val);

                    if (obj?.item) {
                        this.selectedCourier = obj.item.employee_id || '';
                        this.updateRunsheetCourier();
                    }
                    break;
            }
        },
        async updateRunsheetCourier() { 
            if (this.delivery_runsheet_number) {
                try {
                    const res = await axios.put(`${this.URL.revamp_delivery}/${this.delivery_runsheet_number}?n=${this.listenNodeId}`, {courier_employee_id: this.selectedCourier}, this.Helper.header());
                    this.openNotification('success', null, "Success", res?.data?.message ?? "Sukses mengganti kurir");
                    this.$router.push({ 
                        name: 'delivery-runsheet-edit', 
                        params: { 
                            employee_id: this.selectedCourier,
                            delivery_runsheet_number: this.delivery_runsheet_number,
                            date_filter: this.tempDate
                        } 
                    });
                    this.setRoutePageHistory(this.$route.meta, false);
                } catch (err) {
                    this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
                    this.selectedCourier = this.employee_name + "( " + this.employee_code + " )";
                }   
            } else {
                this.employee_id = this.selectedCourier;
                this.$router.push({ 
                    name: 'delivery-runsheet-new', 
                    params: { 
                        employee_id: this.selectedCourier
                    } 
                });
                this.setRoutePageHistory(this.$route.meta, false);
            }
        },
        updateValueBag(val) {
            this.form.bag_number = this.item_bag;
            this.form.courier_employee_id = this.employee_id;
            this.item_no = null;
            this.form.koli_number = null;
            this.form.auto_open_bag = this.is_auto_open_bag;
            document.activeElement.blur();
            this.validateBagPraRunsheet(val);
        },
        updateValue() {
            this.form.koli_number = this.item_no;
            this.form.courier_employee_id = this.employee_id;
            this.form.bag_number = null;
            this.form.auto_open_bag = this.is_auto_open_bag;
            document.activeElement.blur();
            this.scanConnote();
        },
        removeValue() {
            this.form.koli_number = this.item_no_remove;
            this.form.courier_employee_id = this.employee_id;
            this.form.bag_number = null;
            document.activeElement.blur();
            this.removeConnote();
        },
        getParamRoute() {
            this.employee_id = this.$route.params.employee_id.toString();
            this.getCourier();

            if (this.$route.name === "delivery-runsheet-edit") {
                this.delivery_runsheet_number = this.$route.params.delivery_runsheet_number.toString();
                this.tempDate =
                    typeof this.$route.params.date_filter !== "undefined"
                        ? this.$route.params.date_filter.toString()
                        : moment().format("YYYY-MM-DD");

                this.getDataDelivery();
            }
        },
        async getCourier() {
            this.loadingCourier = true;
            await axios
                .get(
                    `${this.URL.employee}/${this.employee_id}?n=${this.listenNodeId}`,
                    this.Helper.header()
                )
                .then((res) => {
                    const { data } = res.data;
                    this.employee_code = data.employee_code;
                    this.employee_name = data.employee_name;
                    this.loadingCourier = false;
                    this.selectedCourier = data.employee_id;
                })
                .catch((err) => {
                    this.loadingCourier = true;
                    this.openNotification('danger', err?.response?.data?.code ?? '', 'Failed to populate status', err?.response?.data?.message ?? 'something went wrong')
                });
        },
        async validateBagPraRunsheet(val) {
            let valForm = {
                item_number: this.item_bag,
                delivery_runsheet_number: this.delivery_runsheet_number,
                courier_id: this.employee_id,
                auto_open_bag: this.is_auto_open_bag,
                validate_courier: this.is_validate_courier
            }
            await axios
                .post(this.URL.validation + `/create-runsheet-pra?n=${this.listenNodeId}`, valForm, this.Helper.header())
                .then(res => {
                    this.validateCourier(val)
                }).catch(err => {
                    this.openNotification("danger", err.response.data.status, err.response.data.message);
                    this.clearInputs();
                })
        },
        async validateCourier(val) {
            await axios
                .get(this.URL.bag + '/' + this.form.bag_number + `?n=${this.listenNodeId}&courier_employee_id=${this.employee_id}`, this.Helper.header())
                .then(res => {
                    const details = res.data.detail;
                    const postData = {
                        bag_number: this.form.bag_number,
                        courier_employee_id: this.employee_id,
                        delivery_runsheet_number: this.delivery_runsheet_number,
                        auto_open_bag: this.is_auto_open_bag,
                        validate_courier: this.is_validate_courier
                    };

                    if (postData) {
                        this.form = postData
                    }
                    this.checkItemSla('BAG')
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err?.response?.data?.code ?? '', ' Nomor bag item is failed', err?.response?.data?.message ?? 'something went wrong');
                })
        },
        closeDialog(ref) {
            switch (ref) {
                case 'recheck_connote_sla':
                    this.openDialogReCheckConnoteSla = false;
                    break;
                case 'recheck_connote_zone':
                    this.openDialogReCheckConnoteZone = false;
                    break;
                case 'unapprove_runsheet':
                    this.activeDialogConfirmUnpproveRunsheet = false
                default:
                    break;
            }
        },
        async scanConnote(postData) {
            let valForm = {}
            if (postData) {
                this.form = postData
                valForm = {
                    item_number: postData.koli_number,
                    delivery_runsheet_number: this.delivery_runsheet_number,
                    courier_id: this.employee_id,
                    auto_open_bag: this.is_auto_open_bag,
                    validate_courier: this.is_validate_courier
                }
            } else {
                valForm = {
                    item_number: this.form.koli_number,
                    delivery_runsheet_number: this.delivery_runsheet_number,
                    courier_id: this.employee_id,
                    auto_open_bag: this.is_auto_open_bag,
                    validate_courier: this.is_validate_courier
                }
            }

            // NOTES TODO: Change this to addConnoteToRunsheet if backend validation's ready
            await axios
                .post(`${this.URL.validation}/create-runsheet?n=${this.listenNodeId}`, valForm, this.Helper.header())
                .then((res) => {
                    this.checkItemSla('KOLI')
                })
                .catch((err) => {
                    this.openNotification("danger", err.response ? err.response.data.code : '', err.response.data.status, err.response.data.message);
                    this.clearInputs();
                });
        },
        async checkItemSla(type) {
            this.type = type;
            const url = this.type === 'KOLI' 
                ? `${this.URL.configuration_warning_sla}/check-sla?n=${this.listenNodeId}&item_number=${this.form.koli_number}`
                : `${this.URL.configuration_warning_sla}/check-sla-bag?n=${this.listenNodeId}&bag_number=${this.form.bag_number}`;

            try {
                const res = await axios.get(url, this.Helper.header());
                
                this.dataItemCheckSla = res.data.data;

                const itemData = this.type === 'KOLI' ? [res.data.data] : res.data.data;

                const allItemStatusSafe = Array.isArray(itemData) 
                    ? itemData.every(item => item.status === 'SAFE') 
                    : false;
                
                if (allItemStatusSafe) {
                    this.checkZoneDelivery();
                } else {
                    this.openDialogReCheckConnoteSla = true;
                }
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            }
        },
        async checkZoneDelivery() {
            this.openDialogReCheckConnoteSla = false;
            const itemNumber = this.type === 'BAG' ? this.form.bag_number : this.form.koli_number;

            try {
                const res = await axios.get(`${this.URL.check_delivery_area}?item_number=${itemNumber}&type=${this.type}&n=${this.listenNodeId}&limit=-1`, this.Helper.header());

                if (this.type === 'BAG') {
                    this.addBagPraRunsheetToRunsheet(this.form);
                } else {
                    this.addConnoteToRunsheet(this.form);
                }
            } catch (err) {
                if (err?.response?.data?.status === 'failed') {
                    this.dataItem = this.form;
                    this.listConnote = err?.response?.data?.data
                    this.openDialogReCheckConnoteZone = true;
                } else {
                    this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
                }
            }
        },
        async addConnoteToRunsheet(form) {
            this.loadingRunsheet = true;            
            try {
                if (!this.delivery_runsheet_number) {
                    const res = await axios.post(`${this.URL.revamp_delivery}?n=${this.listenNodeId}`, JSON.stringify(form), this.Helper.header());

                    this.dataDeliverySummary = res.data.summary;
                    this.delivery_runsheet_number = this.dataDeliverySummary.delivery_runsheet_number.toString();
                    this.$router.push({ 
                        name: 'delivery-runsheet-edit', 
                        params: { 
                            employee_id: this.employee_id,
                            delivery_runsheet_number: this.delivery_runsheet_number
                        } 
                    });
                    this.setRoutePageHistory(this.$route.meta, false);
                    this.getDataDelivery();
                    this.openNotification('success', null, "Success", res?.data?.message ?? "Create runsheet success");
                } else {
                    const res = await axios.post(`${this.URL.revamp_delivery}/${this.delivery_runsheet_number}/detail?n=${this.listenNodeId}`, JSON.stringify(form), this.Helper.header());
                    
                    this.dataDelivery.employee_name = res?.data?.data?.employee_name ?? null;
                    this.dataDelivery.employee_code = res?.data?.data?.employee_code ?? null;
                    this.dataDeliverySummary = res.data.summary;
                    this.delivery_runsheet_number = this.dataDeliverySummary.delivery_runsheet_number.toString();
                    this.getDataDelivery();
                    this.openNotification('success', null, "Success", res?.data?.message ?? "Update runsheet success");
                }
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.clearInputs();
                this.setFocus();
                this.loadingRunsheet = false;
            }
        },
        async addBagPraRunsheetToRunsheet(form) {
            this.loadingRunsheet = true;
            try {
                if (!this.delivery_runsheet_number) {
                    const res = await axios.post(`${this.URL.revamp_delivery_bag_pra}?n=${this.listenNodeId}`, JSON.stringify(form), this.Helper.header());

                    this.dataDeliverySummary = res.data.summary;
                    this.delivery_runsheet_number = this.dataDeliverySummary.delivery_runsheet_number.toString();
                    this.$router.push({ 
                        name: 'delivery-runsheet-edit', 
                        params: { 
                            employee_id: this.employee_id,
                            delivery_runsheet_number: this.delivery_runsheet_number
                        } 
                    });
                    this.setRoutePageHistory(this.$route.meta, false);
                    
                    this.getDataDelivery();
                    this.openNotification('success', null, "Success", res?.data?.message ?? "Create runsheet success");
                } else {
                    const res = await axios.post(`${this.URL.revamp_delivery_bag_pra}/${this.delivery_runsheet_number}/detail?n=${this.listenNodeId}`, JSON.stringify(form), this.Helper.header());
                    
                    this.dataDelivery.employee_name = res?.data?.data?.employee_name ?? null;
                    this.dataDelivery.employee_code = res?.data?.data?.employee_code ?? null;
                    this.dataDeliverySummary = res.data.summary;
                    this.delivery_runsheet_number = this.dataDeliverySummary.delivery_runsheet_number.toString();
                    this.getDataDelivery();
                    this.openNotification('success', null, "Success", res?.data?.message ?? "Update runsheet success");
                }
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.clearInputs()
                this.setFocusRemove()
                this.loadingRunsheet = false;
            }
        },
        async removeConnote() {
            this.loadingRunsheet = true;            
            try {
                const res = await axios.delete(`${this.URL.revamp_delivery}/${this.delivery_runsheet_number}/detail/${this.form.koli_number}?n=${this.listenNodeId}`, this.Helper.header());
                
                if (res.data.hasOwnProperty("summary")) {
                    this.dataDelivery.employee_name = res.data.data.employee_name
                        ? res.data.data.employee_name
                        : null;
                    this.dataDelivery.employee_code = res.data.data.employee_code
                        ? res.data.data.employee_code
                        : null;
                    this.dataDeliverySummary = res.data.summary;
                    this.delivery_runsheet_number = this.dataDeliverySummary.delivery_runsheet_number.toString();
                    this.getDataDelivery();
                    this.openNotification('success', null, "Success", "Remove item success");
                    this.loadingRunsheet = false;
                    this.clearInputs()
                } else {
                    this.getDataDelivery();
                    this.openNotification('success', null, "Success", res?.data?.message ?? "Remove item success");
                    this.loadingRunsheet = false;
                    this.clearInputs()
                }
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.setFocusRemove()
                this.loadingRunsheet = false;
            }
        },
        async getStatus() {
            await axios
                .get(
                    // filter untuk semua type
                    `${this.URL.status}?status_type=DELIVERY&n=${this.listenNodeId}&limit=-1`,
                    this.Helper.header()
                )
                .then((res) => {
                    const statusObj = {};
                    this.arrStatus = res.data.data.map((item) => {
                        const obj = {};
                        obj.label = `${item.status_description}(${item.status_code})`;
                        if (obj.label.length > 60) {
                            obj.formattedLabel = this.splitText(obj.label, 60);
                        }
                        obj.value = item.status_code;
                        obj.data = item;

                        if (
                            item.hasOwnProperty("status_condition") &&
                            item.status_condition !== null
                        ) {
                            if (
                                statusObj.hasOwnProperty(item.status_condition.toLowerCase())
                            ) {
                                statusObj[item.status_condition.toLowerCase()].push(obj);
                            } else {
                                statusObj[item.status_condition.toLowerCase()] = [obj];
                            }
                        }

                        return obj;
                    });
                    this.statusObj = statusObj;
                    this.getParamRoute();
 
                })
                .catch((err) => {
                    this.openNotification('danger', err?.response?.data?.code ?? '', 'Failed to populate status', err?.response?.data?.message ?? 'something went wrong');
                });
        },
        async getDataDelivery() {
            this.loadingRunsheet = true;
            await axios
                .get(
                    `${this.URL.employee}/${this.employee_id}/delivery?n=${this.listenNodeId}&delivery_runsheet_number=${this.delivery_runsheet_number}&date_filter=${this.tempDate}`,
                    this.Helper.header()
                )
                .then((res) => {
                    this.dataDelivery = this.processDataDelivery(res.data.data);

                    this.dataDeliverySummary = res.data.summary;
                    this.delivery_runsheet_number = res.data.summary.delivery_runsheet_number.toString();
                    this.loadingRunsheet = false;
                })
                .catch((err) => {
                    this.loadingRunsheet = false;
                    this.openNotification('danger', err?.response?.data?.code ?? '', 'Failed to populate status', err?.response?.data?.message ?? 'something went wrong');
                });
        },
        processDataDelivery(data) {
            const status = this.statusObj || {};
            const delivery = data.delivery ? data.delivery : [];
            
            delivery.map((item) => {
                item.status_delivery = [];
                item.is_disabled_input = false;
                
                if (item.hasOwnProperty("koli_number")) {
                    
                    // if (item.koli_number.toLowerCase().includes("rt")) {
                    //     item.status_delivery = [...status.rt, ...status.all];
                    // } else {
                    //     item.status_delivery = [...status.normal, ...status.all];
                    // }
                    
                    // filter untuk all status 
                    item.status_delivery = [...status.normal,...status.rt, ...status.all];
                }
                if (item.hasOwnProperty("remarks")) {
                    if (item["status_code"] == null) {
                        item["is_disabled_input_remarks"] =
                            item["remarks"] !== null || item["remarks"] !== "" ? true : false;
                    }
                }
                if (item.hasOwnProperty("receiver_name")) {
                    if (item["status_code"] == null) {
                        item["is_disabled_input_reveiver"] = item["receiver_name"] !== null || item["receiver_name"] !== "" ? true : false;
                    }
                }
                
                this.is_approve = item.is_approve;
                if (item.is_approve === '1') {
                    this.disabledApprove = true
                } else {
                    item["is_disabled_input_status"] = true
                }

                if (item.is_hrs) {
                    this.hrsStatus = true
                }
 
                item.isDisabled = item.is_delivered === 1;
                if (item.is_delivered == 1 || item.is_pod_orion == 1) {
                    this.disableDeliveredPOD(item)
                }
                item.employee_name = data.employee_name;
                item.employee_code = data.employee_code;
                item.warning_koli_record_id = item?.warning_koli_record_id
                item.created_at = this.formatTimezone(item?.created_at);

                if (item?.days_elapsed != null) {
                    item.days_elapsed = this.formatElapsedDay(item.days_elapsed);
                } 
            });

            return delivery;
        },
        async updatePOD(dataPOD, info) {
 
            if (dataPOD.remarks || dataPOD.receiver_name || dataPOD.status) {
                if (!dataPOD.status) {
                    this.openNotification('warn', null, 'Status Kosong', 'Status Wajib Diisi')
                    return
                }
                else {
                    let statusDesc = this.arrStatus.find(status => status.value === dataPOD.status)
                    if (statusDesc.label.includes("RECEIVED") && !dataPOD.receiver_name) {
                        this.openNotification('warn', null, 'Receiver Kosong', 'Receiver Wajib Diisi')
                        return
                    }
                }
                if (this.delivery_runsheet_number) {
                    dataPOD.delivery_runsheet_number = this.delivery_runsheet_number;
                    if (this.employee_id != null || this.employee_id !== "") {
                        dataPOD.courier_employee_id = this.employee_id;
                    }

                    this.loadingConfirm = true;

                    try {
                        const res = await axios.put(`${this.URL.revamp_delivery}/${this.delivery_runsheet_number}/detail/${dataPOD.koli_number}/status?n=${this.listenNodeId}`, JSON.stringify(dataPOD), this.Helper.header());
                        this.openNotification('success', null, "Success", res?.data?.message ?? "POD UPDATED!");
                        this.getDataDelivery();
                        this.form = {};
                        this.selectedUpdateItems = []
                        this.disabledConfirm = true

                    } catch (err) {
                        this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
                    } finally {
                        this.loadingConfirm = false;
                    }
                } else {
                    this.openNotification("danger", err.response ? err.response.data.code : '', "Failed", "Runsheet unavailable!");
                }
            }
            else {
                this.openNotification("danger", err.response ? err.response.data.code : '', "POD KOSONG", "Isi POD terlebih dahulu");
            }
        },
        disableDeliveredPOD(val) {
            this.$set(val, 'is_disabled_input_status', true);
            this.$set(val, 'is_disabled_input_remarks', true);
            this.$set(val, 'is_disabled_input_reveiver', true);
        },
        async editPOD(val) {
            this.loadingConfirm = true;
            const dataPOD = {
                courier_employee_id: val.courier_employee_id,
                delivery_runsheet_number: val.delivery_runsheet_number,
                koli_number: val.koli_number,
                status: val.status_code,
                remarks: val.remarks,
                receiver_name: val.receiver_name,
            };
            try {
                const res = await axios.put(`${this.URL.revamp_delivery}/${val.delivery_runsheet_number}/detail/${dataPOD.koli_number}/status?n=${this.listenNodeId}`, JSON.stringify(dataPOD), this.Helper.header());                
                this.getDataDelivery();
                this.form = {};
                this.openNotification('success', null, "Success", res?.data?.message ?? "POD EDITED!");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.loadingConfirm = false;
            }
        },
        back() {
            this.$router.push("/delivery/runsheet");
            this.setRoutePageHistory(this.$route.meta, false);
        },
        print() {
            const routeData = this.$router.resolve({
                name: "printGeneral",
                params: {
                    id: this.delivery_runsheet_number,
                    type: "delivery",
                    employee_id: this.employee_id,
                    node_id: this.listenNodeId,
                },
            });

            const printWindow = window.open(routeData.href, '_blank', 'noopener');
      
            if (printWindow) {
                printWindow.onload = function() {
                    printWindow.print();
                    printWindow.onafterprint = () => printWindow.close();
                };
            }
        },
        updateSelected(arr) {
            this.selectedUpdateItems = arr;
            this.disabledConfirm = arr.length > 0 && this.disabledApprove ? false : true;
        },
        confirmAction() {
            if (this.selectedUpdateItems.length > 0) {
                this.selectedUpdateItems.forEach((item) => {
                    const dataPOD = {
                        courier_employee_id: item.courier_employee_id,
                        delivery_runsheet_number: item.delivery_runsheet_number,
                        koli_number: item.koli_number,
                        status: item.status_code,
                        remarks: item.remarks,
                        receiver_name: item.receiver_name,
                    };

                    this.updatePOD(dataPOD);
                });
            } else {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || "Please select at least one item");
            }
        },
        approveAction(val){
            this.data_is_approve = {
                approved: val
            };
            
            if (val) {
                this.approve(val)
            } else {
                this.activeDialogConfirmUnpproveRunsheet = true
            }
        },
        confirmUnpproveRunsheet() {
            this.approve(false)
            this.activeDialogConfirmUnpproveRunsheet = false
            this.reload()
        },
        async approve(val) {
            this.loadingApprove=true
            this.loadingConfirmUnpproveRunsheet = true;
            try {
                const res = await axios.patch(`${this.URL.revamp_delivery}/${this.delivery_runsheet_number}/approval?n=${this.listenNodeId}`, JSON.stringify(this.data_is_approve), this.Helper.header());
                
                this.form = {};
                this.is_approve = val;
                this.disabledApprove = val;
                this.openNotification("success", null, "Success", res?.data?.message);
                this.reload()
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? "", "Failed", err?.response?.data?.message ?? "Something went wrong"); 
            } finally {
                this.loadingConfirmUnpproveRunsheet=false;
                this.loadingApprove=false
            }
        },
        onCameraScannerGetData(data) {
            if (data && data.event === "result") {
                const result = data.data;

                switch (data.namespace) {
                    case "formInputBag":
                        this.item_bag = result.text;
                        this.updateValueBag();
                        break;
                    case "formInputConnote":
                        this.item_no = result.text;
                        this.updateValue();
                        break;
                    case "formRemoveConnote":
                        this.item_no_remove = result.text;
                        this.removeValue();
                        break;
                    default:
                        break;
                }
            }
        },
        clearInputs() {
            this.item_no = ""
            this.item_no_remove = ""
            this.item_bag = ""
            delete this.form.delivery_runsheet_number; 
            this.openDialogReCheckConnoteZone = false;
            this.openDialogReCheckConnoteSla = false;
        },
        splitText(text, maxLineLength) {
            const words = text.split(' ');
            let lines = [];
            let currentLine = '';

            words.forEach((word) => {
                if ((currentLine + word).length <= maxLineLength) {
                    currentLine += word + ' ';
                }
                else {
                    lines.push(currentLine.trim());
                    currentLine = word + ' ';
                }
            });

            if (currentLine.length > 0) {
                lines.push(currentLine.trim());
            }

            return lines;
        },
        handleAutoOpenBag(val) {
            this.is_auto_open_bag = val.target.checked;
        },
        handleValidateCourier(val) {
            this.is_validate_courier = val.target.checked;
        },
        setActiveInput(refName) {
            this.activeInput = refName
            this.$nextTick(() => {
                this.focusInput(refName)
            })
        },
        focusInput(refName) {
            this.$nextTick(() => {
                const inputEl = this.$refs[refName]?.$el.querySelector('input')
                if (inputEl) {
                    inputEl.focus()
                    inputEl.removeEventListener('blur', this.preventUnfocus)
                    inputEl.addEventListener('blur', this.preventUnfocus)
                }
            })
        },
        preventUnfocus(e) {
            this.$nextTick(() => {
                const inputConnote =
                    this.$refs.formInputConnote?.$el.querySelector('input')
                const inputBag =
                    this.$refs.formInputBag?.$el.querySelector('input')
                const inputRemoveConnote = 
                    this.$refs.formRemoveConnote?.$el.querySelector('input')
                const nextEl = e.relatedTarget
                if (
                    nextEl === inputConnote ||
                    nextEl === inputBag ||
                    nextEl === inputRemoveConnote
                ) {
                    return
                }
                this.focusInput(this.activeInput)
            })
        },
    }
};
</script>
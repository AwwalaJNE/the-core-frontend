<template>
    <dialog-master
        width="xl"
        :actived="listenActive"
        :loading="listenLoading"
        :closeDialog="cancel"
    >
        <template v-slot:header>
            <div class="button-helper">
                <div class="title-helper">
                    {{ listenTitle }}
                </div>
                <vs-button 
                    :disabled="isDisabledPrint"
                    @click="print"
                >
                    Print
                </vs-button>
                <template v-if="listenUserRoleName === 'HELPDESK'">
                    <vs-button  
                        :danger="is_approve === 1"
                        :disabled="isDisabledApprove"
                        @click="approve" 
                    >
                        {{ is_approve === 1 ? 'Unapprove' : 'Approve' }}
                    </vs-button>
                </template>
                <template v-else>
                    <vs-button
                        :disabled="is_approve === 1 || isDisabledApprove"
                        @click="approve" 
                    >
                        {{ is_approve === 1 ? 'Approved' : 'Approve' }}
                    </vs-button>
                </template>
            </div>
        </template>

        <template v-slot:content>
            <div>
                <camera-scanner 
                    ref="cameraScanner" 
                    @data="onCameraScannerGetData" 
                />

                <div class="nomor-sj" v-if="manifest_do_number">
                    <input-general
                        name="No Surat Jalan"
                        :valueData="manifest_do_number"
                        :typeInput="`text`"
                        :disabled="true"
                    />
                </div>

                <form-input-controller
                    ref="formSuratJalan"
                    typeForm="surat_jalan"
                    :dataItem="editData"
                    :isDisabled="isDisabled"
                    @formData="formData"
                    @onChangeCustom="onChangeCustom"
                />

                <div class="mt-2 mb-2">
                    <vs-row align="center">
                        <vs-col xs="6" sm="3" lg="3">
                            <form @submit.prevent="submitSuratJalan">
                                <input-general
                                    icon-after
                                    name="Scan Surat Muatan / Masterbag / Bag"
                                    rules=""
                                    formKey="scanBag"
                                    :valueData="item_number"
                                    :typeInput="`text|${isDestinationDisable}`"
                                    :disabled="isDisabled"
                                    @click-icon="handleIconClick"
                                    @updateValue="updateValue"
                                >
                                    <template #icon>
                                        <i class="bx bx-barcode-reader"></i>
                                    </template>
                                </input-general>
                            </form>
                        </vs-col>
                        <vs-col xs="6" sm="3" lg="3">
                            <vs-checkbox v-model="is_penerusan" @change="handlePenerusan">
                                Penerusan
                            </vs-checkbox>
                        </vs-col>
                    </vs-row>
                    <table-master
                        :dataTable="dataTable"
                        :dataColumn="datacolumn"
                        :hasAction="false"
                        :hasPagination="false"
                        :customAction="true"
                        :customActionList="customActionList"
                        @actionUpdate="actionUpdate"
                    />
                </div>
            </div>
        </template>
    </dialog-master>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";
import moment from "moment";

import CameraScanner from "@/components/scanner/camera";
import DialogMaster from "@/components/dialog/dialogMaster";
import FormInputController from "@/components/form/formInputController";
import InputGeneral from "@/components/input/general";
import TableMaster from "@/components/table/tableMaster";

export default {
    name: "transport-surat-jalan-dialog-new",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "table-master": TableMaster,
        "input-general": InputGeneral,
        "form-input-controller": FormInputController,
        CameraScanner,
    },
    props: {
        active: Boolean,
        btnRed: String,
        btnBlue: String,
        closeDialog: Function,        
        dataItem: Object,
        refresh: Function,
        title: String,
    },
    data() {
        return {
            form: {},
            loading: false,
            manifest_do_number: "",
            dataTable: [],
            datacolumn: [
                {
                    label: "Item Number",
                    key: "item_number",
                    width: "xs",
                },
                {
                    label: "Weight (Kg)",
                    key: "total_weight",
                    width: "auto",
                },
                {
                    label: "Destination",
                    key: "destination",
                    width: "auto",
                },
                {
                    label: "Type",
                    key: "item_type",
                    width: "auto",
                },
                {
                    label: "Received",
                    key: "received_status",
                    type: "status",
                    width: "auto",
                },
            ],
            customActionList: [
                {
                    label: "Remove",
                    key: "remove",
                    attribute: "",
                },
            ],
            item_number: "",
            vehicle_max_weight: 0,
            vehicle_type_id: "",
            no_moda_angkutan_id: null,
            etd: null,
            estimated_time_in_hour: null,
            manifest_lov: "",
            destinationUnlock: "",
            manifest_lov_list: [
                {
                    label: "Multi Destination",
                    value: "ALL",
                },
                {
                    label: "Same Destination",
                    value: "SAME DESTINATION",
                },
            ],
            editData: {},
            isDestinationDisable: "",
            is_penerusan: true,
            isDisabled: false,
            isDisabledPrint: false,
            isDisabledApprove: false,
            is_approve: 0,
            item_remove: "",
            total_weight: 0,
            master_form: {}
        };
    },
    computed: {
        listenActive() {
            return this.active;
        },
        listenLoading() {
            return this.loading;
        },
        listenTitle() {
            return this.title;
        },
        listenUserRoleName() {
            return this.listenUserRole.user_role_name
        }
    },
    watch: {
        dataItem: function(val) {
            if (val !== undefined) {
                this.getEditData(val);
            }
        },
        active: function(val) {
            if (val == true) {
                this.getDestination();
                this.getNoModeAngkutan();
                this.getLov();
                this.getDriver();
                this.isDestinationDisableCheck();
            }
        },
    },
    methods: {
        getEditData(val) {
            this.manifest_do_number = val.manifest_do_number;
            this.dataTable = val.detail;
            this.is_penerusan = val.is_penerusan === "1";

            this.isDisabled = val.status !== 'READY' || val.is_orion === "1" || val.is_approve === 1;
            this.isDisabledPrint = val.status === 'CANCELED';
            this.isDisabledApprove = val.status !== 'READY' || val.is_orion === "1";

            this.is_approve = val.is_approve;

            this.dataTable.forEach(item => {
                item.destination = item.bag?.destination?.node_tariff_code || item.koli?.connote?.connote_receiver_tariff_code || item.manifest?.destination?.node_tariff_code || '';

                if (val.status !== "READY") {
                    item.button_status = { remove: false };
                }

                item.received_status = item.received_at ? 1 : 0;
            });

            this.total_weight = val.total_weight;
            this.editData = val;
            this.no_moda_angkutan_id = val.no_moda_angkutan_id || null;

            this.master_form = {
                node_id_origin: val.node_id_origin,
                node_id_destination: val.node_id_destination,
                vehicle_mode_id: val.vehicle_mode_id,
                vehicle_id: val.vehicle_id,
                pic_employee_id: val.pic_employee_id,
                etd: val.etd,
                eta: val.eta,
                vehicle_type_id: val.vehicle_type_id || parseInt(val.vehicle_type_id),
                max_weight: val.max_weight,
                manifest_lov: val.manifest_lov,
                item_no: val.item_number,
                is_penerusan: val.is_penerusan
            };
        },
        formData(form) {
            let weight = this.dataTable.reduce((sum, item) => sum + (item.total_weight || 0), 0);

            if (this.editData.max_weight > 0 && this.vehicle_max_weight < 1) {
                this.vehicle_max_weight = this.editData.max_weight;
            }
            if (this.vehicle_max_weight >= weight) {
                const obj = {
                    node_id_origin: this.listenNodeId,
                    node_id_destination: form.destination_id,
                    vehicle_mode_id: form.moda_angkutan_id,
                    vehicle_id: form.no_moda_angkutan_id,
                    pic_employee_id: form.driver_id,
                    etd: form.etd,
                    eta: form.eta,
                    vehicle_type_id: this.vehicle_type_id || (this.dataItem.vehicle_type_id ? parseInt(this.dataItem.vehicle_type_id) : this.dataItem.vehicle_type_id),
                    max_weight: this.vehicle_max_weight,
                    manifest_lov: this.manifest_lov,
                    item_no: this.item_number,
                    is_penerusan: this.is_penerusan
                };

                this.form = obj;
                if (this.form.eta > this.form.etd) {
                    if (this.manifest_do_number) {
                        if (!this.vehicle_type_id) {
                            this.form.vehicle_type_id = this.dataItem.vehicle_type_id  ? parseInt(this.dataItem.vehicle_type_id) : this.dataItem.vehicle_type_id;
                        }

                        this.addSuratJalanDetail();
                    }
                    else {
                        this.createSuratJalan();
                    }
                } else {
                    this.openNotification("warning", null, "Wrong Input in ETA/ETD field", "ETA must more than ETD");
                }
            } else {
                this.openNotification("warning", null, "Melebihi berat", "Berat muatan melebihi batas berat kendaraan");
            }
        },
        onChangeCustom(type, val, obj) {
            const updateMasterForm = (key, value) => {
                if (this.manifest_do_number && this.master_form?.[key] !== value) {
                    this.master_form = { ...this.master_form, [key]: value };
                    this.updateSuratJalan();
                }
            };

            switch (type) {
                case "destination_id":
                    if (typeof obj === "object") {
                        const { item, value } = obj;
                        if (item?.estimated_time_in_hour) {
                            this.estimated_time_in_hour = item.estimated_time_in_hour;
                            this.handleEta(this.etd, this.estimated_time_in_hour);
                        }
                        this.destinationUnlock = parseInt(value);
                    }
                    updateMasterForm("node_id_destination", val);
                    this.isDestinationDisableCheck();
                    break;

                case "no_moda_angkutan_id":
                    if (typeof obj === "object" && obj.item) {
                        const { vehicle_max_weight, vehicle_type_id } = obj.item;
                        this.vehicle_max_weight = vehicle_max_weight;
                        this.vehicle_type_id = vehicle_type_id;
                    }
                    this.no_moda_angkutan_id = val;
                    updateMasterForm("vehicle_id", val);
                    break;

                case "etd":
                    this.etd = val;
                    this.handleEta(this.etd, this.estimated_time_in_hour);
                    updateMasterForm("etd", val);
                    break;

                case "eta":
                    updateMasterForm("eta", val);
                    break;

                case "manifest_lov":
                    if (typeof obj === "object" && obj.value) {
                        this.manifest_lov = obj.value;
                        this.$store.dispatch("SET_SURAT_JALAN_MANIFEST_LOV_ValueData", obj.value);
                    }
                    updateMasterForm("manifest_lov", val);
                    this.isDestinationDisableCheck();
                    break;

                case "driver_id":
                    updateMasterForm("pic_employee_id", val);
                    break;

                default:
                    break;
            }
        },
        handleEta(dateTime, amount) {
            if (dateTime && amount) {
                this.$store.dispatch("SET_SURAT_JALAN_ETA", moment(dateTime).add(amount, "hours").format("YYYY-MM-DD HH:mm:ss"));
            };
        },
        updateValue(key, val) {
            switch (key) {
                case "scanBag":
                    this.item_number = val;
                    break;
                default:
            }
        },
        actionUpdate(val, key) {
            switch (key) {
                case "remove":
                    this.item_remove = val.item_number;
                    this.removeSuratJalanDetail();
                    break;
                default:
            }
        },
        print() {
            let routeData = this.$router.resolve({ 
                name: 'printGeneral', 
                params: { 
                    'id': this.manifest_do_number, 
                    'type': 'manifest-delivery-order', 
                    'node_id':this.listenNodeId 
                } 
            });
            window.open(routeData.href, '_blank');
        },
        handlePenerusan(val) {
            if (this.isDisabled) {
                this.is_penerusan = !val.target.checked;
                this.openNotification('warn', null, 'Information', 'Surat Jalan is DEPARTED');
            }
            else {
                this.is_penerusan = val.target.checked;
            }
        },
        submitSuratJalan() {
            this.$refs.formSuratJalan.handleSubmit();
        },
        async createSuratJalan() {
            this.loading = true;
            try {
                const res = await axios.post(`${this.URL.revamp_surat_jalan}?n=${this.listenNodeId}`, JSON.stringify(this.form), this.Helper.header());                

                let data = res.data.data;
                if (data) {
                    this.manifest_do_number = data.manifest_do_number;
                    this.total_weight = data.total_weight;
                    this.master_form = {
                        node_id_origin: data.node_id_origin,
                        node_id_destination: data.node_id_destination,
                        vehicle_mode_id: data.vehicle_mode_id,
                        vehicle_id: data.vehicle_id,
                        pic_employee_id: data.pic_employee_id,
                        etd: data.etd,
                        eta: data.eta,
                        vehicle_type_id: data.vehicle_type_id || parseInt(data.vehicle_type_id),
                        max_weight: data.max_weight,
                        manifest_lov: data.manifest_lov,
                        item_no: data.item_number,
                        is_penerusan: data.is_penerusan
                    };
                    await this.getSuratJalanDetail();
                }

                this.openNotification('success', null, "Success", "Create surat jalan success");

            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.item_number = "";
                this.loading = false;
            }
        },
        async addSuratJalanDetail() {
            this.loading = true;
            try {
                const res = await axios.post(`${this.URL.revamp_surat_jalan}/${this.manifest_do_number}/detail?n=${this.listenNodeId}`, {item_number: this.item_number}, this.Helper.header());

                if (res.data.data) {
                    this.manifest_do_number = res.data.data.manifest_do_number;
                    this.total_weight = res.data.data.total_weight;
                    await this.getSuratJalanDetail();
                }
                
                this.openNotification("success", null, "Success", "Add item success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.item_number = "";
                this.loading = false;
            }
        },
        async getSuratJalanDetail() {
            try {
                const res = await axios.get(`${this.URL.revamp_surat_jalan}/${this.manifest_do_number}/detail?n=${this.listenNodeId}`, this.Helper.header());

                if (res.data.data) {
                    let arr = res.data.data;

                    arr = arr.map(item => ({
                        ...item,
                        received_status: item.received_at ? 1 : 0,
                        destination: item.item_destination
                    }));

                    this.dataTable = arr;
                }
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed 2", err?.response?.data?.message ?? 'Something went wrong');
            }
        },
        async updateSuratJalan() {
            this.loading = true;
            try {
                const res = await axios.put(`${this.URL.revamp_surat_jalan}/${this.manifest_do_number}?n=${this.listenNodeId}`, JSON.stringify(this.master_form), this.Helper.header());
                this.openNotification('success', null, "Success", "Update surat jalan success");

            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async removeSuratJalanDetail() {
            this.loading = true;
            try {
                const res = await axios.delete(`${this.URL.revamp_surat_jalan}/${this.manifest_do_number}/detail/${this.item_remove}?n=${this.listenNodeId}`, this.Helper.header());
                this.openNotification('success', null, "Success", "Remove surat jalan success");
                await this.getSuratJalanDetail();
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async approve() {
            try {
                const res = await axios.patch(`${this.URL.revamp_surat_jalan}/${this.manifest_do_number}/approval?n=${this.listenNodeId}`, { is_approve: this.is_approve ^ 1 }, this.Helper.header());
                
                this.is_approve ^= 1;
                this.isDisabled = !this.isDisabled;
                this.openNotification("success", null, "Success", res?.data?.message);

                if (this.is_approve === 1) {
                    this.print();
                }
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? "", "Failed", err?.response?.data?.message ?? "Something went wrong"); 
            } finally {
                this.$emit('refresh');
            }
        },
        handleClearForm() {
            this.$refs.formSuratJalan.handleClearForm();
            this.form = {};
        },
        cancel() {
            this.loading = false;
            this.handleClearForm();
            this.dataTable = [];
            this.closeDialog();
        },
        getLov() {
            const arr = this.manifest_lov_list.map(item => ({
                label: item.label,
                value: item.value
            }));

            this.$store.dispatch("SET_SURAT_JALAN_MANIFEST_LOV_ArrData", arr.length ? arr : null);

            if (this.dataItem?.manifest_lov) {
                this.manifest_lov = this.dataItem.manifest_lov;
            }
        },
        isDestinationDisableCheck() {
            if (!this.dataItem || !this.manifest_lov) {
                this.isDestinationDisable = "disabled";
            } 
            
            if (this.manifest_lov && (this.destinationUnlock || this?.dataItem?.node_id_destination)) {
                this.isDestinationDisable = "";
            }
        },
        async getDestination() {
            await axios
                .get(
                    this.URL.node +
                        `/${this.listenNodeId}/destination-link-manifest-delivery-order?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
                    this.Helper.header()
                )
                .then((res) => {
                    if (res.data.data.length > 0) {
                        let arr = [];
                        res.data.data.map((item) => {
                            let obj = {};
                            obj["label"] = item.node_name + " (" + item.node_code + ")";
                            obj["value"] = item.node_id;
                            obj["item"] = item;

                            arr.push(obj);
                        });

                        this.$store.dispatch(
                            "SET_SURAT_JALAN_DESTINATION_ID_ArrData",
                            arr.length > 0 ? arr : null
                        );
                    } else {
                        this.$store.dispatch(
                            "SET_SURAT_JALAN_DESTINATION_ID_ArrData",
                            null
                        );
                        // this.openNotification('warn', null, 'Roles data is empty!', ' Please create a new role data')
                    }
                })
                .catch((err) => {
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
                });
        },
        async getNoModeAngkutan() {
            await axios
                .get(
                    this.URL.vehicle_manifest_delivery_order +
                        `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`,
                    this.Helper.header()
                )
                .then((res) => {
                    if (res.data.data.length > 0) {
                        let arr = [];
                        res.data.data.map((item) => {
                            let obj = {};
                            obj["label"] =
                                item.vehicle_name + "(" + item.vehicle_police_no + ")";
                            obj["value"] = item.vehicle_id;
                            obj["item"] = item;
                            arr.push(obj);
                        });

                        this.$store.dispatch(
                            "SET_SURAT_JALAN_NO_MODA_ANGKUTAN_ID_ArrData",
                            arr.length > 0 ? arr : null
                        );
                    } else {
                        // this.openNotification('warn', null, 'Roles data is empty!', ' Please create a new role data')
                    }
                })
                .catch((err) => {
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
                });
        },
        async getDriver() {
            try {
                const res = await axios.get(`${this.URL.employee}/driver?n=${this.listenNodeId}`, this.Helper.header());

                if (res.data.data.length > 0) {
                    const arr = res.data.data.map(item => ({
                        label: `${item.employee_name} (${item.employee_nik})`,
                        value: item.employee_id
                    }));

                    this.$store.dispatch("SET_SURAT_JALAN_DRIVER_ID_ArrData", arr);
                } else {
                    // this.openNotification('warn', null, 'Roles data is empty!', ' Please create a new role data');
                }
            } catch (err) {
                // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err);
            }
        },
        handleIconClick() {
            if (!this.isDisabled) {
                this.$refs.cameraScanner.open('item_number');
            }
        },
        onCameraScannerGetData(data) {
            if (!this.isDisabled && data?.event === "result" && data.namespace === "item_number") {
                this.item_number = data.data.text;
            }
        },
    },
    mounted() {
        this.handlePrintShortcut(this.print)
    }
};
</script>
<style> 
.container-clear-item {
    display: flex;
    justify-content: flex-end;
}
.clear-item {
    display: flex;
    justify-content: end;
    cursor: pointer;
    color: red;
    margin: 10px 0;
} 
.nomor-sj {
    width: inherit;
}
</style>
<style scoped>
.title-helper {
    width: 70%;
    align-content: center;
}

.button-helper {
    display: flex; 
    justify-content: flex-end;
}

button {
    width: 6em;
}
</style>

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
                <vs-button @click="print">
                    Print
                </vs-button>
                <vs-button @click="approve" :danger="is_approve === 1">
                    {{ is_approve === 1 ? 'Unapproved' : 'Approve' }}
                </vs-button>
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

        <!-- <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="3">
                    <vs-button
                        transparent
                        block
                        danger
                        flat
                        :active="true"
                        @click="btnBlue === 'Approve' ? cancelAdd() : cancelEdit()"
                    >
                        Close
                    </vs-button>
                </vs-col>
                <vs-col w="3">
                    <vs-button
                        transparent
                        block
                        flat
                        :active="true"
                        type="submit"
                        @click="handleSubmit"
                        :disabled="isDisabled"
                    >
                        {{ btnBlue || "Add" }}
                    </vs-button>
                </vs-col>
            </vs-row>
        </template> -->
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
            DataArr: [],
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
            lot_weight: 0,
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
            is_approve: 0,
            item_remove: "",
            total_weight: 0
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
        listenDataItem() {
            return this.dataItem;
        },
        listenFormKey() {
            return this.formKey || "";
        },
    },
    watch: {
        dataItem: function(val) {
            if (val !== undefined) {
                console.log("PP", val)
                this.manifest_do_number = val.manifest_do_number;

                this.dataTable = val.detail;
                this.is_penerusan = val.is_penerusan === "1" ? true : false
                this.isDisabled = val.status !== 'READY' || val.is_orion == "1" || val.is_approve == 1 ? true : false
                this.is_approve = val.is_approve;
                this.dataTable.map((item) => {
                    if (item.bag) {
                        item.destination = item.bag.destination
                            ? item.bag.destination.node_tariff_code
                            : "";
                    }
                    else if (item.koli) {
                        item.destination = item.koli.connote
                            ? item.koli.connote.connote_receiver_tariff_code
                            : "";
                    }
                    else if (item.manifest) {
                        item.destination = item.manifest.destination
                            ? item.manifest.destination.node_tariff_code
                            : "";
                    }
                    if (val.status !== "READY" ) {
                        item.button_status = {
                            remove: false,
                        };
                    }
                    item.received_status = item.received_at ? 1 : 0
                });

                this.total_weight = val.total_weight;
                this.editData = val;
                this.no_moda_angkutan_id = val["no_moda_angkutan_id"]
                    ? val["no_moda_angkutan_id"]
                    : null;

                // this.editData["destination_id"] = val.node_id_destination ? val.node_id_destination : ''
                // this.editData["moda_angkutan_id"] = val.vehicle_mode_id ? val.vehicle_mode_id : ''
                // this.editData["no_moda_angkutan_id"] = val.vehicle_id ? val.vehicle_id : ''
                // this.editData["manifest_do_item"] = val.detail ? val.detail : ''
                // this.editData["driver_id"] = val.pic_employee_id ? parseInt(val.pic_employee_id) : ''
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
        formData(form) {
            let weight = 0;
            this.dataTable.map((item) => {
                if (item.total_weight) {
                    weight += item.total_weight;
                }
            });

            if (this.editData.max_weight > 0 && this.vehicle_max_weight < 1) {
                this.vehicle_max_weight = this.editData.max_weight;
            }
            if (this.vehicle_max_weight >= weight) {
                let obj = {};
                obj["node_id_origin"] = this.listenNodeId;
                obj["node_id_destination"] = form.destination_id;
                obj["vehicle_mode_id"] = form.moda_angkutan_id;
                obj["vehicle_id"] = form.no_moda_angkutan_id;
                obj["pic_employee_id"] = form.driver_id;
                obj["etd"] = form.etd;
                obj["eta"] = form.eta;
                obj["vehicle_type_id"] = this.vehicle_type_id;
                obj["max_weight"] = this.vehicle_max_weight;
                obj["manifest_lov"] = this.manifest_lov;
                obj["item_no"] = this.item_number;
                obj["is_penerusan"] = this.is_penerusan;

                this.form = obj;

                if (this.form.eta > this.form.etd) {
                    if (this.manifest_do_number) {
                        if (!this.vehicle_type_id) {
                            this.form.vehicle_type_id = this.dataItem.vehicle_type_id  ? parseInt(this.dataItem.vehicle_type_id) : this.dataItem.vehicle_type_id;
                        }

                        // this.updateSuratJalan();
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
            switch (type) {
                case "no_moda_angkutan_id":
                    if (typeof obj === "object") {
                        if (obj.hasOwnProperty("item")) {
                            this.vehicle_max_weight = obj["item"]["vehicle_max_weight"];
                            this.vehicle_type_id = obj["item"]["vehicle_type_id"];
                        }
                    }
                    this.no_moda_angkutan_id = val;
                    // this.updateSuratJalan();
                    break;
                case "destination_id":
                    if (typeof obj === "object") {
                        if (obj.hasOwnProperty("item")) {
                            this.estimated_time_in_hour =
                                obj["item"]["estimated_time_in_hour"];
                            this.handleEta(this.etd, this.estimated_time_in_hour);
                        }
                        this.destinationUnlock = parseInt(obj["value"]);
                    }
                    this.isDestinationDisableCheck();
                    break;
                case "etd":
                    this.etd = val;
                    let dateEta = this.handleEta(this.etd, this.estimated_time_in_hour);
                    break;
                case "manifest_lov":
                    if (typeof obj === "object") {
                        if (obj.hasOwnProperty("value")) {
                            this.manifest_lov = obj["value"];
                            this.$store.dispatch(
                                "SET_SURAT_JALAN_MANIFEST_LOV_ValueData",
                                obj["value"]
                            );
                        }
                    }
                    this.isDestinationDisableCheck();
                default:

                // code block
            }
        },
        handleEta(dateTime, amount) {
            if (dateTime && amount) {
                let dateEta = moment(dateTime)
                    .add(amount, "hours")
                    .format("YYYY-MM-DD HH:mm:ss");
                this.$store.dispatch("SET_SURAT_JALAN_ETA", dateEta);
            }
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
        async approve() {
            try {
                const res = await axios.patch(`${this.URL.revamp_surat_jalan}/${this.manifest_do_number}/approval?n=${this.listenNodeId}`, { is_approve: this.is_approve ^ 1 }, this.Helper.header());
                
                this.is_approve ^= 1;
                this.openNotification("success", null, "Success", res?.data?.message);

                if (this.is_approve === 1) {
                    this.print();
                }
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? "", "Failed", err?.response?.data?.message ?? "Something went wrong"); 
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
        handleSubmit() {
            this.$refs.formSuratJalan.handleSubmit();
        },
        handleClearForm() {
            this.$refs.formSuratJalan.handleClearForm();
            this.form = {};
        },
        handlePenerusan(val) {
            if (this.isDisabled) {
                this.is_penerusan = !val.target.checked
                this.openNotification('warn', null, 'Information', 'Surat Jalan is DEPARTED')
            }
            else {
                this.is_penerusan = val.target.checked
            }
        },
        submitSuratJalan() {
            this.$refs.formSuratJalan.handleSubmit();
        },
        async createSuratJalan() {
            this.loading = true;
            try {
                const res = await axios.post(`${this.URL.revamp_surat_jalan}?n=${this.listenNodeId}`, JSON.stringify(this.form), this.Helper.header());                

                if (res.data.data) {
                    this.manifest_do_number = res.data.data.manifest_do_number;
                    this.total_weight = res.data.data.total_weight;
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
                const res = await axios.put(`${this.URL.revamp_surat_jalan}/${this.manifest_do_number}?n=${this.listenNodeId}`, JSON.stringify(this.form), this.Helper.header());
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
        cancel() {
            this.loading = false;
            this.handleClearForm();
            this.dataTable = [];
            this.closeDialog();
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
        getLov() {
            let arr = [];
            this.manifest_lov_list.map((item) => {
                let obj = {};
                obj["label"] = item.label;
                obj["value"] = item.value;

                arr.push(obj);
            });
            this.$store.dispatch(
                "SET_SURAT_JALAN_MANIFEST_LOV_ArrData",
                arr.length > 0 ? arr : null
            );
            if (this.dataItem && this.dataItem.manifest_lov) {
                this.manifest_lov = this.dataItem.manifest_lov;
            }
        },
        isDestinationDisableCheck() {
            if (!this.dataItem) {
                this.isDestinationDisable = "disabled";
            }
            if (!this.manifest_lov) {
                this.isDestinationDisable = "disabled";
            }
            if (this.manifest_lov && this.destinationUnlock) {
                this.isDestinationDisable = "";
            }
            if (
                this.dataItem &&
                this.dataItem.node_id_destination &&
                this.manifest_lov
            ) {
                this.isDestinationDisable = "";
            }
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
            await axios
                .get(
                    this.URL.employee +
                    `/driver?n=${this.listenNodeId}`,
                    this.Helper.header()
                )
                .then((res) => {
                    if (res.data.data.length > 0) {
                        let arr = [];
                        res.data.data.map((item) => {
                            let obj = {};
                            obj["label"] = `${item.employee_name} (${item.employee_nik})`;
                            obj["value"] = item.employee_id;

                            arr.push(obj);
                        });

                        this.$store.dispatch(
                            "SET_SURAT_JALAN_DRIVER_ID_ArrData",
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
        handleIconClick() {
            if (!this.isDisabled) {
                this.$refs.cameraScanner.open('item_number');
            }
        },
        onCameraScannerGetData(data) {
            if (!this.isDisabled) {
                if (data && data.event === "result") {
                    if (data.namespace === "item_number") {
                        this.item_number = data.data.text;
                    }
                }
            }
        },
    },
    mounted() {
    },
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

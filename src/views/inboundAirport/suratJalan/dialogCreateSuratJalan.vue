<template>
    <dialog-master
        width="xl"
        :actived="listenActive"
        :closeDialog="cancel"
        :loading="listenLoading"
    >
        <template v-slot:header>
            {{ listenTitle }}
        </template>

        <template v-slot:content>
            <div>
                <form-input-controller
                    ref="formSuratJalan"
                    @formData="formData"
                    :dataItem="editData"
                    typeForm="surat_jalan"
                    :isDisabled="isDisabled"
                    @onChangeCustom="onChangeCustom"
                />
                <div class="mt-2 mb-2">
                    <table-master
                        :dataTable="dataTable"
                        :dataColumn="datacolumn"
                        :hasAction="false"
                        :hasPagination="false"
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
import DialogMaster from "@/components/dialog/dialogMaster";
import FormInputController from "@/components/form/formInputController";
import TableMaster from "@/components/table/tableMaster";
import InputGeneral from "@/components/input/general";
import CameraScanner from "@/components/scanner/camera";

export default {
    name: "dialog-create-surat-jalan",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "table-master": TableMaster,
        "input-general": InputGeneral,
        "form-input-controller": FormInputController,
        CameraScanner,
    },
    props: {
        closeDialog: Function,
        active: Boolean,
        title: String,
        dataItem: Object,
        btnRed: String,
        btnBlue: String,
        refresh: Function,
    },
    data() {
        return {
            form: {},
            DataArr: [],
            loading: false,
            manifest_delivery_id: "",
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
                    width: "xs",
                },
                {
                    label: "Destination",
                    key: "destination",
                    width: "sm",
                },
                {
                    label: "Type",
                    key: "item_type",
                    width: "xs",
                },
                {
                    label: "Received",
                    key: "received_status",
                    type: "status",
                    width: "xs",
                },
            ],
            suratJalan: "",
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
                    label: "Single Destination",
                    value: "SAME DESTINATION",
                },
            ],
            editData: {},
            isDestinationDisable: "",
            isDisabled: false
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
    },
    watch: {
        dataItem: function(val) {
            if (val !== undefined) {
                this.manifest_delivery_id = val.manifest_do_number;

                this.dataTable = val.detail;
                this.isDisabled = val.status !== 'READY' || val.is_orion == "1" ? true : false
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

                this.editData = val;
                this.no_moda_angkutan_id = val["no_moda_angkutan_id"]
                    ? val["no_moda_angkutan_id"]
                    : null;
                }
        },
        active: function(val) {
            if (val == true) {
                this.getDestination();
                this.getNoModeAngkutan();
                this.getLov();
                this.getDriver();
                this.setEmptyDataTable();
                this.isDestinationDisableCheck();
            }
        },
    },
    methods: {
        setEmptyDataTable() {
            let initial_data = this.$store.getters.getInputs.surat_jalan;
            if (
                !initial_data['destination_id'].value && 
                !initial_data['driver_id'].value && 
                !initial_data['eta'].value && 
                !initial_data['etd'].value && 
                !initial_data['no_moda_angkutan_id'].value &&
                !initial_data['manifest_lov'].value && Object.keys(this.editData).length === 0
            ) {
                this.dataTable= [];
                this.manifest_lov = ""
                this.destinationUnlock = ""
            }
            else {
                this.manifest_lov = initial_data['manifest_lov'].value
                this.destinationUnlock = initial_data['destination_id'].value
                let vehicle = initial_data['no_moda_angkutan_id'].arrData.find(el => el.value === initial_data['no_moda_angkutan_id'].value)
                if (vehicle !== null) {
                    this.vehicle_max_weight = vehicle?.item?.vehicle_max_weight    
                }
            }
        },
        formData(form) {
            let weight = 0;
            this.dataTable.map((item) => {
                if (item.total_weight) {
                    weight = +item.total_weight;
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
                obj["manifest_do_item"] = this.dataTable;

                this.form = obj;

                if (this.form.eta > this.form.etd) {
                    this.addData();
                } else {
                    this.openNotification(
                        "warning",
                        "Wrong Input in ETA/ETD field",
                        "ETA must more than ETD"
                    );
                }
            } else {
                this.openNotification(
                    "warn",
                    "Melebihi berat",
                    "Berat muatan melebihi batas berat kendaraan"
                );
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
        handleClearForm() {
            this.$refs.formSuratJalan.handleClearForm();
            this.form = {};
        },
        updateValue(key, val) {
            switch (key) {
                case "scanBag":
                    this.suratJalan = val;
                    break;
                default:
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
                            obj["label"] = item.node_name;
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
        async getDatasuratJalan() {
            let manifest_do_number = "";
            let destination_id = "";
            if (this.editData && this.editData.hasOwnProperty("manifest_do_number")) {
                manifest_do_number = this.editData.manifest_do_number;
            }
            if (this.editData && this.editData.hasOwnProperty("destination_id")) {
                destination_id = parseInt(this.editData.destination_id);
            }
            if (!destination_id) {
                destination_id = this.destinationUnlock;
            }
            await axios
                .get(
                    this.URL.manifest_do +
                        `/scan?n=${this.listenNodeId}&item_no=${this.suratJalan}&manifest_do_number=${manifest_do_number}&manifest_destination=${destination_id}&manifest_lov=${this.manifest_lov}`,
                    this.Helper.header()
                )
                .then((res) => {
                    if (res.data.data) {
                        let data = res.data.data;

                        let obj = {};
                        obj["item_number"] = data.item_number;
                        obj["total_weight"] = data.total_weight;
                        obj["node_id_receiver"] = data.node_id_receiver;
                        obj["total_koli"] = data.total_koli;
                        obj["item_type"] = data.item_type;
                        obj["total_connote"] = data.total_connote;
                        obj["total_bag"] = data.total_bag;

                        this.validateTempItemSJ(obj);

                        this.suratJalan = "";
                    }
                })
                .catch((err) => {
                    if (err) {
                        let message = err.response.data
                            ? err.response.data.message
                            : "failed Load Data";
                        this.openNotification("warn", null, "Information", message);
                    }
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
        validateTempItemSJ(itemSJ) {
            if (Object.keys(this.dataTable).length === 0) {
                this.dataTable.push(itemSJ);
            } else {
                let itemNumberExists = this.dataTable.some(
                    (item) => item.item_number === itemSJ.item_number
                );
                if (itemNumberExists) {
                    this.openNotification(
                        "warn",
                        "Information",
                        "item " + itemSJ.item_number + " already exists"
                    );
                } else {
                    this.dataTable.push(itemSJ);
                }
            }
        },
    },
};
</script>
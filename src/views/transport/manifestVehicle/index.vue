<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>Manifest Vehicle</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3" v-if="hasManifestNumber">
                <vs-row justify="flex-end">
                    <vs-col w="3">
                        <vs-button
                            flat
                            :active="true"
                            @click="openDialog"
                        >
                            Vehicle
                        </vs-button>
                    </vs-col>
                    <vs-col w="3">
                        <vs-button
                            flat
                            type="submit"
                            :active="true"
                            @click="print"
                        >
                            Print
                        </vs-button>
                    </vs-col>
                </vs-row>
            </vs-col>
        </vs-row>

        <vs-row>
            <vs-col w="6">
                <div class="box view" :style="{
                    minHeight: hasManifestNumber ? '240px' : null,
                    display: 'flex',
                    flexDirection: 'column'
                }">
                    <h3 class="title">SCAN MANIFEST</h3>
                    <div class="input">
                        <vs-input 
                            border 
                            type="text"
                            v-model="manifestNumber"
                            label-placeholder="Masukkan SM"
                            icon-after
                            v-uppercase
                            ref="formManifestNumber"
                            :disabled="hasManifestNumber"
                            @keyup.enter.native="processInput()"
                            @input="sanitizeAlphanumeric('manifestNumber')"
                            @click-icon="handleIconClick"
                            style="width: 100%;"
                        >
                            <template #icon v-if="!hasManifestNumber">
                                <i class="bx bx-barcode-reader"></i>
                            </template>
                            <template #icon v-else>
                                <i class='bx bxs-x-circle'></i>
                            </template>
                        </vs-input>
                    </div>
                </div>
            </vs-col>
            <vs-col w="6" v-if="hasManifestNumber">
                <card-info
                    title="ROUTE INFORMATION"
                    :dataLabel="routeInfo"
                    :dataItem="dataRouteInfo"
                />
            </vs-col>
        </vs-row>

        <vs-row v-if="hasManifestNumber">
            <vs-col w="6">
                <card-info
                    title="MANIFEST INFORMATION"
                    :dataLabel="manifestInfo"
                    :dataItem="dataManifestInfo"
                />
            </vs-col>
            <vs-col w="6">
                <card-info
                    title="ITEM INFORMATION"
                    :dataLabel="itemInfo"
                    :dataItem="dataItemInfo"
                    :width="6"
                />
            </vs-col>
        </vs-row>

        <dialog-manage-vehicle-manifest
            v-if="hasManifestNumber"
            title="Manifest Vehicle"
            :manifest_number="manifestNumber"
            :manifest_method="manifestMethod"
            :active="dialogActive"
            :closeDialog="closeDialog"
        />
        <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />
    </div>
</template>
  
<script>

import axios from "axios";
import master from "@/mixins/master";

import Breadcrumb from "@/components/breadcrumb/index";
import CameraScanner from "@/components/scanner/camera";
import CardInfo from '@/components/card/cardInfo';

import DialogManageVehicleManifest from "@/views/transport/manifestVehicle/dialogCreateManage";

export default {
    name: "transport-manifest-vehicle",
    mixins: [master],
    components: {
        "breadcrumb": Breadcrumb,
        "card-info": CardInfo,
        "camera-scanner": CameraScanner,
        "dialog-manage-vehicle-manifest": DialogManageVehicleManifest,
    },
    data() {
        return {
            manifestNumber: "",
            manifestMethod: 0,

            hasManifestNumber: false,
            dialogActive: false,

            dataRouteInfo: {},
            dataItemInfo: {},
            dataManifestInfo: {},

            routeInfo: [
                { 
                    label: 'Origin',
                    key: 'origin',
                    width: 4
                },
                { 
                    label: 'Destination', 
                    key: 'destination',
                    width: 4
                },
                { 
                    label: 'Flight Number', 
                    key: 'flight_number',
                    width: 4
                },
                { 
                    label: 'Vehicle', 
                    key: 'vehicle',
                    width: 4
                },
                { 
                    label: 'ETD',
                    key: 'etd',
                    width: 4
                },
                { 
                    label: 'ETA',
                    key: 'eta',
                    width: 4
                }
            ],
            manifestInfo: [
                { 
                    label: 'Manifest Number',
                    key: 'manifest_number',
                    width: 4
                },
                { 
                    label: 'Status', 
                    key: 'status',
                    width: 4
                },
                { 
                    label: 'Type SM', 
                    key: 'sm_type',
                    width: 4
                },
            ],
            itemInfo: [
                { 
                    label: 'Total Masterbag',
                    key: 'total_masterbag',
                    width: 4
                },
                { 
                    label: 'Total Bag', 
                    key: 'total_bag',
                    width: 4
                },
                { 
                    label: 'Total Connote', 
                    key: 'total_connote',
                    width: 4
                },
            ]
        };
    },
    methods: {
        openDialog() {
            this.dialogActive = true;
        },
        closeDialog() {
            this.dialogActive = false;
        },
        handleIconClick() {
            if (this.hasManifestNumber) {
                this.clearInput();
            } else {
                this.$refs.cameraScanner.open('formManifestNumber');
            }
        },
        async processInput() {
            if (!this.manifestNumber?.trim()) return;

            const encoded = encodeURIComponent(this.manifestNumber);
            const currentPath = this.$route.path;
            const newPath = `/transport/manifest-vehicle/${encoded}`;

            if (currentPath !== newPath) {
                this.$router.push(newPath);
                this.setRoutePageHistory(this.$route.meta, false);
            }

            await this.getManifest();
        },
        async getManifest() {
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.surat_muatan}?n=${this.listenNodeId}&search_by=manifest_number&s=${this.manifestNumber}`, this.Helper.header());

                if (res.data.data.length === 0) {
                    this.openNotification("warn", null, "Failed", 'Data Not Found');
                    this.clearInput();
                    return
                } else {
                    let data = res.data.data[0];

                    this.hasManifestNumber = true;

                    this.manifestMethod = parseInt(data?.manifest_method_id);

                    this.dataRouteInfo = {
                        origin: data?.origin_branch_code + " - " + data?.origin_branch_name,
                        destination: data?.destination_branch_code + " - " + data?.destination_branch_name,
                        flight_number: data?.flight_number,
                        vehicle: data?.vehicle?.vehicle_name,
                        etd: data?.etd,
                        eta: data?.eta,
                    };

                    this.dataManifestInfo = {
                        manifest_number: data?.manifest_number,
                        status: data?.status,
                        sm_type: data?.manifest_method?.vehicle_mode_name
                    };

                    this.dataItemInfo = {
                        total_masterbag: data?.total_masterbag || "0",
                        total_bag: data?.total_bag || "0",
                        total_connote: data?.total_item || "0"
                    };
                }
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        print() {
            let routeData = this.$router.resolve({
                name: "printGeneral", 
                params: {
                    id: this.manifestNumber,
                    type: "manifest", 
                    node_id: this.listenNodeId,
                },
            });

            const printWindow = window.open(routeData.href, "_blank", "noopener");

            if (printWindow) {
                    printWindow.onload = function () {
                    printWindow.print();
                    printWindow.onafterprint = () => printWindow.close();
                };
            }
        },
        clearInput() {
            this.hasManifestNumber = false;
            this.manifestNumber = "";

            if (this.$route.path !== "/transport/manifest-vehicle") {
                this.$router.push("/transport/manifest-vehicle");
                this.setRoutePageHistory(this.$route.meta, false);
            }

            this.$nextTick(() => {
                this.$refs.formManifestNumber?.$el?.querySelector("input")?.focus();
            });
        },
        onCameraScannerGetData(data) {
            if (data?.event === "result" && data?.data?.text) {
                const { namespace, data: { text } } = data;

                if (namespace === "formManifestNumber") {
                    this.manifestNumber = text;
                    this.processInput('manifestNumber');
                }
            }
        },
    },
    mounted() {
        this.clearInput();
    }
};
</script>

<style scoped>
.title {
    margin-bottom: 15px;
    text-transform: capitalize;
    font-size: 0.8em;
    font-weight: bold;
    color: #333;
    text-align: left;
}

.input {
    padding: 10px;
    flex: 1;
    display: flex;
}
</style>

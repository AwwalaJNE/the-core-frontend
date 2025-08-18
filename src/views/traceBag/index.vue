<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>Trace Bag / Masterbag</h2>
                </div>
            </vs-col>
        </vs-row>
        
        <section>
            <vs-row justify="space-around">
                <vs-col>
                    <div class="box view">
                        <form @submit.prevent="processBagNumber" style="display: flex; margin-top: 2em;">
                            <vs-col xs="4" sm="4" lg="4">
                                <vs-input 
                                    ref="formInputBag"
                                    id="traceBag"
                                    border 
                                    label-placeholder="Masukkan Nomor Bag / Masterbag"
                                    icon-after
                                    type="text"
                                    v-model="bagNumber"
                                    v-uppercase
                                    :autofocus="true"
                                    :disabled="hasBagNumber"
                                    @click-icon="$refs.cameraScanner.open('formInputBag')"
                                >
                                    <template #icon v-if="!hasBagNumber">
                                        <i class="bx bx-barcode-reader" />
                                    </template>
                                </vs-input>
                                <template v-if="hasBagNumber">
                                    <div style="position:absolute;right:20px; top:15px;">
                                        <span class="vs-select__chips__chip__close" @click="removeBagNumber">
                                            <i class="vs-icon-close vs-icon-hover-less"></i>
                                        </span>
                                    </div>
                                </template>
                            </vs-col>
                            <vs-col>
                                <vs-button type="submit" :disabled="hasBagNumber">Search</vs-button>
                            </vs-col>
                        </form>
                    </div>
                </vs-col> 
            </vs-row>
        </section>

        <section>
            <vs-row justify="space-around">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" style="margin-bottom: 2em;">
                    <div class="box view" v-if="bag_number && bag_found && !loading">
                        <vs-row justify="space-between">
                            <vs-col xs="6" sm="9" lg="9">
                                <nav-item 
                                    :navItem="navItem" 
                                    @activeTab="activeTab" 
                                />
                            </vs-col>
                        </vs-row>
                        <template v-if="navActive === 'k-INFO'">
                            <vs-row>
                                <vs-col vs-align="center" xs="3" sm="3" lg="12">
                                    <bag-info
                                        :bagNumber="bag_number"
                                    />
                                </vs-col>
                            </vs-row>
                        </template>
                        <template v-if="navActive === 'k-ACTIVITY'">
                            <vs-row>
                                <vs-col vs-align="center" xs="3" sm="3" lg="12">
                                    <bag-activity
                                        :bagNumber="bag_number"
                                    />
                                </vs-col>
                            </vs-row>
                        </template>
                    </div>
                    <div class="box view" v-else-if="(bag_number && !bag_found && !loading) || (bag_number !== '' && !bag_found && !loading)">
                        <div style="margin-top: 2.5em;">
                            Bag tidak ditemukan
                        </div>
                    </div>
                </vs-col>
            </vs-row>
        </section>

        <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />
    </div>
</template>

<script>
import axios from "axios";
import master from "@/mixins/master";

import Breadcrumb from "@/components/breadcrumb/index";
import CameraScanner from "@/components/scanner/camera";
import NavItem from "@/components/navbar/navTab";

import BagActivity from "@/views/traceBag/bagActivity";
import BagInfo from "@/views/traceBag/bagInfo";

export default {
    name: "trace-bag",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "bag-activity": BagActivity,
        "bag-info": BagInfo,
        CameraScanner
    },
    data() {
        return {
            bagNumber: "",
            hasBagNumber: false,
            navItem: [
                { 
                    label: "INFO", 
                    key: "k-INFO", 
                    title: "Bag Info" 
                },
                { 
                    label: "ACTIVITY", 
                    key: "k-ACTIVITY", 
                    title: "Bag Activity" 
                }
            ],
            navActive: "k-INFO",
            loading: false,
            bag_number: "",
            bag_found: false,
            dataItem: {},
        };
    },
    methods: {
        removeBagNumber() {
            this.bagNumber = "";
            this.bag_number = "";
            this.hasBagNumber = false;
            this.bag_found = false;
            this.loading = false;
            this.$router.push("/trace-bag");
            this.setRoutePageHistory(this.$route.meta, false);
        },
        async processBagNumber() {         
            this.bag_number = this.bagNumber.replace(/\//g, '~'); 
            try {
                await this.$router.push(`/trace-bag/${this.bag_number}`);
                this.setRoutePageHistory(this.$route.meta, false);
                this.hasBagNumber = true;
                await this.getBag();
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
            }
        },
        activeTab(val) {
            this.navActive = val;
            const item = this.navItem.find(item => item.key === val);
            if (item) {
                this.title = item.title;
            }
        },
        async getBag() {
            this.loading = true;
            try {
                const bagNumberFromRoute = this.$route.params.bag_number;
                if (bagNumberFromRoute) {
                    const res = await axios.get(`${this.URL.bag}/${bagNumberFromRoute}?n=${this.listenNodeId}`, this.Helper.header());
                    this.bag_found = res.data.data && Object.keys(res.data.data).length > 0;
                }
            } catch (err) {
                this.bag_found = false;
                this.openNotification('danger', err.response?.data.code ?? '', 'Failed', err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        onCameraScannerGetData({ event, data, namespace }) {
            if (event === "result" && namespace === "formInputBag") {
                this.bag_number = data.text;
                this.processBagNumber();
            }
        },
    },
    mounted() {
        this.removeBagNumber();
        this.getBag();
        this.$refs.formInputBag.$el.querySelector("input").focus();
    }
};
</script>

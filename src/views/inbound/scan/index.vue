<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
        </vs-row>

        <section>
            <vs-row>
                <vs-col lg="6" sm="6" xs="12">
                    <template v-if="is_prealert">
                        <div class="box information">
                            <h4 align="left">List of Bags</h4>
                            <div class="nav-box">
                                <vs-row>
                                    <vs-col xs="12" sm="12" lg="6">
                                        <template>
                                            <div class="center">
                                                <vs-input 
                                                    border 
                                                    type="text"
                                                    v-model="item_no"
                                                    label-placeholder="Masukkan code BAG / Koli / SM"
                                                    autofocus
                                                    icon-after
                                                    v-uppercase
                                                    ref="formInputInbound"
                                                    @keyup.enter.native="updateValue('item_no')"
                                                    @click-icon="$refs.cameraScanner.open('formInputInbound')"
                                                >
                                                    <template #icon>
                                                        <i class="bx bx-barcode-reader"></i>
                                                    </template>
                                                </vs-input>
                                            </div>
                                        </template>
                                    </vs-col>
                                </vs-row>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="!is_prealert">
                        <div class="box information" style="align-content: space-around">
                            <vs-row>
                                <vs-col xs="12" sm="12" lg="6">
                                    <vs-input 
                                        border 
                                        type="text"
                                        v-model="parent_no"
                                        label-placeholder="Masukkan SM / SJ / Pickup"
                                        icon-after
                                        v-uppercase
                                        ref="formInputParentInbound"
                                        @keyup.enter.native="updateValue('parent_no')"
                                        @click-icon="$refs.cameraScanner.open('formInputParentInbound')"
                                    >
                                        <template #icon>
                                            <i class="bx bx-barcode-reader"></i>
                                        </template>
                                    </vs-input>
                                </vs-col>
                                <vs-col xs="12" sm="12" lg="6">
                                    <vs-input 
                                        border 
                                        type="text"
                                        v-model="child_no"
                                        label-placeholder="Masukkan Item"
                                        icon-after
                                        v-uppercase
                                        ref="formInputChildInbound"
                                        @keyup.enter.native="updateValue('child_no')"
                                        @click-icon="$refs.cameraScanner.open('formInputChildInbound')"
                                    >
                                        <template #icon>
                                            <i class="bx bx-barcode-reader"></i>
                                        </template>
                                    </vs-input>
                                </vs-col>
                            </vs-row>
                        </div>
                    </template>
                </vs-col>

                <vs-col lg="6" sm="6" xs="12">
                    <div class="box information" style="padding-top: 1px !important;">
                        <h4 align="left">Information SM/SJ/Pickup Number</h4>
                        <div class="nav-box">
                            <template>
                                <transition name="slide-fade">
                                    <template v-if="loading == false">
                                        <InboundInformation :ref="'inboundInformation'" :dataTableProp="dataTable" :loading="loading"/>
                                    </template>
                                </transition>
                            </template>
                        </div>
                    </div>
                    <div class="box information" style="padding-top: 1px !important;margin-top: 10px !important;">
                        <h4 align="left">Inbound Detail</h4>
                        <div class="nav-box">
                            <template>
                                <transition name="slide-fade">
                                    <InboundDetail 
                                        ref="inboundDetail" 
                                        :dataTableProp="dataTableProp" 
                                        :loading="loading" 
                                        :pageSize="page_size" 
                                        :page="page" 
                                        :limit="limit" 
                                        :actionLimit="actionLimit" 
                                        :actionPagination="actionPagination"
                                    />
                                </transition>
                            </template>
                        </div>
                    </div>
                    <vs-button class="mt-1" style="float: right"
                        square
                        active
                        @click="back"
                    >
                        <i class="bx bxs-chevron-left"> </i>  BACK
                    </vs-button>
                </vs-col>
            </vs-row>
        </section>
        <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"

import InboundInformation from "@/views/inbound/scan/inboundInformation"
import InboundDetail from "@/views/inbound/scan/inboundDetail"
import CameraScanner from "@/components/scanner/camera.vue";


export default {
    name:"inbound-scan",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "InboundInformation": InboundInformation,
        "InboundDetail": InboundDetail,
        CameraScanner,
    },
    computed: {
        is_prealert() {
            const pattern = /\/scan\/[\w-]+$/;
            return pattern.test(this.$route.fullPath);
        }
    },
    watch: {
        is_prealert(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.refresh();
            }
        }
    },
    data() {
        return {
            title: "Receiving",
            item_no:'',
            form: {},
            inbound_number: '',
            loading: false,
            dataTable: [],
            dataTableProp: [],
            limit: 20,
            page_size: 1,
            page: 1,
            parent_no: '',
            child_no: '',
        }
    },
    methods: {
        refresh(){
            this.getTableData();
        },
        updateValue(type) {
            switch (type) {
                case 'item_no':
                    this.item_no = this.item_no.replaceAll(/\s+/g, "");
                    this.form = {
                        item_no: this.item_no,
                        inbound_number: this.inbound_number
                    }
                    this.processInbond();
                    this.$refs.formInputInbound.$el.querySelector("input").focus();
                    break;

                case 'parent_no':
                    this.inbound_number = this.parent_no;
                    this.refresh();
                    break;

                case 'child_no':
                    this.child_no = this.child_no.replaceAll(/\s+/g, "");
                    this.form.item_no = this.child_no
                    this.processInbond();
                    this.$refs.formInputChildInbound.$el.querySelector("input").focus();
                    break;
            }
        },
        getParamRoute(){
            if(this.is_prealert){
                this.inbound_number = this.$route.params.inbound_number.toString()
                this.refresh()
            }
        },
        async processInbond() {
            this.openProgress(null, "Processing", `${this.form.item_no ? this.form.item_no : 'Item' } is in process`);

            try {
                const res = await axios.post(`${this.URL.receiving}?n=${this.listenNodeId}`, JSON.stringify(this.form), this.Helper.header());

                this.openNotification('success', null, "Success", res?.data?.message ?? "Receiving success");
                this.inbound_number = res?.data?.data?.inbound_number ?? this.inbound_number;

                this.loading = false;
                this.closeProgress();
                this.handlerClearForm();
                this.refresh();
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
                this.inbound_number = err?.response?.data?.reference ?? this.inbound_number;

                this.loading = false;
                this.closeProgress();
                this.handlerClearForm();
                this.dataTable = [];
                this.dataTableProp = [];
                this.inbound_number = "";
            }
        },
        async getTableData() {
            if (this.inbound_number) {
                this.loading = true;
                this.dataTable = []
                try {
                    const res = await axios.get(`${this.URL.inbound}/${this.inbound_number}/inbound-status?n=${this.listenNodeId}&page=${this.page}&limit=${this.limit}`, this.Helper.header());

                    let arr = [res.data.data];

                    arr = arr.map(item => ({
                        ...item,
                        total_received: item.total_received.toString(),
                        total_unreceived: item.total_unreceived.toString()
                    }));

                    this.dataTable = arr;
                    this.dataTableProp = res.data.detail
                    this.page = res.data.meta.current_page
                    this.limit = parseInt(res.data.meta.per_page)
                    this.page_size = res.data.meta.last_page

                    if (!this.is_prealert) {
                        this.handlerClearForm();
                        this.$refs.formInputChildInbound.$el.querySelector("input").focus();
                    }
                } catch (err) {
                    this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');

                    if (!this.is_prealert) {
                        this.$refs.formInputParentInbound.$el.querySelector("input").focus();
                        this.handlerClearForm();
                    }
                    this.dataTable = [];
                    this.dataTableProp = [];
                    this.inbound_number = "";
                } finally {
                    this.loading = false;
                }
            }
        },
        back(){
            this.$router.push('/inbound/prealert')
            this.setRoutePageHistory(this.$route.meta, false);
        },
        handlerClearForm(){
            this.item_no = "";

            // NEW, TODO: RECHECK
            this.child_no = "";
            this.parent_no = "";
            // this.dataTable = [];
            // this.dataTableProp = [];
            // this.inbound_number = "";
        },
        onCameraScannerGetData(data) {
            if (data?.event === "result" && data?.data?.text) {
                const { namespace, data: { text } } = data;

                if (namespace === "formInputInbound") {
                    this.item_no = text;
                    this.updateValue('item_no');
                } else if (namespace === "formInputParentInbound") {
                    this.parent_no = text;
                    this.updateValue('parent_no');
                } else if (namespace === "formInputChildInbound") {
                    this.child_no = text;
                    this.updateValue('child_no');
                }
            }
        },
        actionLimit(val){
            this.limit = val
            this.page = 1
            this.refresh()
        },
        actionPagination(val) {
            this.page = val
            this.refresh()
        },
    },
    mounted() {
        this.getParamRoute();

        if (this.is_prealert) {
            this.$refs.formInputInbound.$el.querySelector("input").focus();
        }
    }
}
</script>
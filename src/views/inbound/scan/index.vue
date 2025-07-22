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
                        <div class="box information" >
                            <h4 align="left">List of Bags</h4>
                            <div class="nav-box">
                                <vs-row style="padding-bottom: 5px;">
                                    <vs-col xs="12" sm="12" lg="12" style="padding: 30px 0;">
                                        <template>
                                            <div class="center">
                                                <vs-input 
                                                    border 
                                                    type="text"
                                                    v-model="item_no"
                                                    label-placeholder="Masukkan code BAG / Connote"
                                                    autofocus
                                                    icon-after
                                                    v-uppercase
                                                    ref="formInputInbound"
                                                    :disabled="processing"
                                                    @keyup.enter.native="updateValue('item_no')"
                                                    @click-icon="$refs.cameraScanner.open('formInputInbound')"
                                                    @input="sanitizeAlphanumeric('item_no')"
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
                        <div class="box information" style="padding-top: 1px !important;">
                            <h4 align="left">Scan Item</h4>
                            <vs-row style="padding-bottom: 5px;">
                                <vs-col xs="12" sm="12" lg="12" style="padding: 15px 0;">
                                    <vs-input 
                                        border 
                                        type="text"
                                        v-model="parent_no"
                                        label-placeholder="Masukkan SM / SJ / Pickup"
                                        icon-after
                                        v-uppercase
                                        ref="formInputParentInbound"
                                        :disabled="hasInboundNumber"
                                        @keyup.enter.native="updateValue('parent_no')"
                                        @click-icon="$refs.cameraScanner.open('formInputParentInbound')"
                                        @input="sanitizeAlphanumeric('parent_no')"
                                    >
                                        <template #icon v-if="!hasInboundNumber">
                                            <i class="bx bx-barcode-reader"></i>
                                        </template>
                                    </vs-input>
                                    <template v-if="hasInboundNumber">
                                        <div style="position:absolute;right:20px; top:15px;">
                                            <span class="vs-select__chips__chip__close" @click="removeInboundNumber">
                                                <i class="vs-icon-close vs-icon-hover-less"></i>
                                            </span>
                                        </div>
                                    </template>
                                </vs-col>
                                <vs-col xs="12" sm="12" lg="12" style="padding: 15px 0 ;">
                                    <vs-input 
                                        border 
                                        type="text"
                                        v-model="child_no"
                                        label-placeholder="Master Bag / Bag / Connote"
                                        icon-after
                                        v-uppercase
                                        ref="formInputChildInbound"
                                        :disabled="processing"
                                        @keyup.enter.native="updateValue('child_no')"
                                        @click-icon="$refs.cameraScanner.open('formInputChildInbound')"
                                        @input="sanitizeAlphanumeric('child_no')"
                                    >
                                        <template #icon>
                                            <i class="bx bx-barcode-reader"></i>
                                        </template>
                                    </vs-input>
                                </vs-col>
                            </vs-row>
                        </div>
                    </template>
                    <div class="box information" style="padding-top: 1px !important;margin-top: 10px !important;">
                        <h4 align="left">Receiving Log</h4>
                        <div class="nav-box">
                            <template>
                                <transition name="slide-fade">
                                    <ReceivingLog 
                                        ref="ReceivingLog" 
                                        :dataTableProp="dataTableReceivingLog" 
                                        :loading="loading" 
                                        :pageSize="pagination.page_size"
                                        :page="pagination.page"
                                        :limit="pagination.limit"
                                        :actionLimit="actionLimit" 
                                        :actionPagination="actionPagination"
                                        @refresh="getTableDataReceivingLog"
                                    />
                                </transition>
                            </template>
                        </div>
                    </div>
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
                        <div class="header-remark-bar mb-3">
                            <h4 class="title">Inbound Detail</h4>
                            <template v-if="dataTableProp.length > 0">
                                 <vs-button class="insert-remark-btn" @click="openDialog">
                                    <i class="bx bx-pencil mr-1"></i> Insert Remark
                                 </vs-button>

                                <dialog-insert-remark
                                :actived="showDialog"
                                :loading="false"
                                :closeDialog="closeDialog"
                                :inbound_number="inbound_number"
                                />
                            </template>
                        </div>
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
                                        :receivingLogs="receivingLogs"
                                        :inboundNumber="inboundNumber"
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
import InboundReceivingLog from "@/views/inbound/scan/inboundReceivingLog"
import CameraScanner from "@/components/scanner/camera.vue";
import dialogInsertRemark from "@/views/inbound/scan/dialogInsertRemark.vue";


export default {
    name:"inbound-scan",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "InboundInformation": InboundInformation,
        "InboundDetail": InboundDetail,
        "ReceivingLog": InboundReceivingLog,
        CameraScanner,
        dialogInsertRemark
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
            dataTableReceivingLog: [],
            limit: 20,
            page_size: 1,
            page: 1,
            parent_no: '',
            child_no: '',
            hasInboundNumber: false,
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            receivingLogs: [],
            inboundNumber: '',
            processing: false,
            showDialog: false,
            is_missroute: false,
            is_plain: false
        }
    },
    methods: {
        saveInboundToStorage() {
            const inboundData = {
                parent_no: this.parent_no,
                inbound_number: this.inbound_number,
                hasInboundNumber: this.hasInboundNumber
            };
            localStorage.setItem('inboundScanData', JSON.stringify(inboundData));
        },

        async loadInboundFromStorage() {
            const storedData = localStorage.getItem('inboundScanData');
            if (storedData) {
                const inboundData = JSON.parse(storedData);
                this.parent_no = inboundData.parent_no;
                this.inbound_number = inboundData.inbound_number;
                this.hasInboundNumber = inboundData.hasInboundNumber;

                if (this.inbound_number) {
                    await this.getTableData();
                }
            }
        },

        clearInboundFromStorage() {
            localStorage.removeItem('inboundScanData');
        },
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
                    this.hasInboundNumber = true;
                    this.saveInboundToStorage();
                    this.refresh();
                    break;

                case 'child_no':
                    this.child_no = this.child_no.replaceAll(/\s+/g, "");
                    this.form = this.parent_no
                        ? { item_no: this.child_no, inbound_number: this.parent_no }
                        : { item_no: this.child_no };

                    this.processInbond();
                    this.$refs.formInputChildInbound.$el.querySelector("input").focus();
                    break;
            }
        },
        getParamRoute(){
            if (this.is_prealert){
                this.inbound_number = this.$route.params.inbound_number.toString()
                this.refresh()
            }
        },
        async processInbond() {
            this.processing = true;
            this.openProgress(null, "Processing", `${this.form.item_no ? this.form.item_no : 'Item' } is in process`);
            

            try {
                const res = await axios.post(`${this.URL.receiving}?n=${this.listenNodeId}`, JSON.stringify(this.form), this.Helper.header());

                this.openNotification('success', null, "Success", res?.data?.message ?? "Receiving success");
                this.inbound_number = res?.data?.data?.inbound_number ?? this.inbound_number;
                
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code ?? '', "Failed", err?.response?.data?.message ?? 'Something went wrong');
                this.inbound_number = err?.response?.data?.reference ?? this.inbound_number;
                
                if (!this.is_prealert && !this.parent_no) {
                    this.handleClearTableInfo();
                }
                this.processing = false;
            } finally {
                this.refresh();
                this.closeProgress();
                this.handlerClearForm();
                this.processing = false;
            }
        },
        async getTableData() {
            if (this.inbound_number) {
                this.loading = true;
                try {
                    const res = await axios.get(
                        `${this.URL.inbound}/${this.inbound_number}/inbound-status?n=${this.listenNodeId}&page=${this.page}&limit=${this.limit}`, 
                        this.Helper.header()
                    );

                    let arr = [res.data.data];
                    this.receivingLogs = res.data.data.receiving_log;
                    this.inboundNumber = res.data.data.inbound_number;
                    if (res.data.data.inbound_type === 'RECEIVING CONNOTE' || res.data.data.inbound_type === 'RECEIVING BAG') {
                        this.is_plain = true
                    }

                    arr = arr.map(item => ({
                        ...item,
                        total_received: item.total_received.toString(),
                        total_unreceived: item.total_unreceived.toString(),
                        is_missroute: item.is_missroute == true ? 1 : 0
                    }));
                    if (!this.is_plain) {
                        this.dataTable = arr;
                    } else {
                        this.dataTable = [];
                    }
                    this.dataTableProp = res.data.detail;
                    this.dataTableProp.forEach(item => {
                        if (item.is_masterbag === '1') {
                            item.item_type = 'MASTERBAG';
                        }
                        item.is_missroute = item.is_missroute == true ? 1 : 0
                    });
                    this.dataTableProp.map(item => {
                      item,
                      item['button_status'] = {entry_status: item.is_received == '0'};
                    });
                    this.page = res.data.meta.current_page;
                    this.limit = parseInt(res.data.meta.per_page);
                    this.page_size = res.data.meta.last_page;

                    if (!this.is_prealert) {
                        this.$refs.formInputChildInbound.$el.querySelector("input").focus();
                    }

                    this.getTableDataReceivingLog();
                } catch (err) {
                    this.openNotification(
                        "danger", 
                        err?.response?.data?.code ?? '', 
                        "Failed", 
                        err?.response?.data?.message ?? 'Something went wrong'
                    );

                    if (!this.is_prealert) {
                        this.removeInboundNumber();
                    }
                } finally {
                    this.loading = false;
                }
            }
        },
        async getTableDataReceivingLog() {
            this.loading = true;
            try {
                let search_by = '';
                let s = '';

                if (this.inbound_number) {
                    search_by = 'inbound_number'
                    s = this.inbound_number
                } else if (this.item_no || this.child_no) {
                    search_by = 'item_number'
                    s = this.item_no || this.child_no
                }

                const res = await axios.get(`${this.URL.receiving_log}?n=${this.listenNodeId}&page=${this.page}&limit=${this.limit}&search_by=${search_by}&s=${s}&pov=receiver`, this.Helper.header());
                this.dataTableReceivingLog = res.data.data;
                this.dataTableReceivingLog.forEach(item => {
                    item.button_status = { edit: (item.status == null || item.status == undefined || item.status == '') };
                });
            } catch (err) {
                this.dataTableReceivingLog = []
                // this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        back(){
            this.$router.push('/inbound/prealert')
            this.setRoutePageHistory(this.$route.meta, false);
        },
        handlerClearForm() {
            if (this.is_prealert) {
                this.item_no = "";
                this.$refs.formInputInbound.$el.querySelector("input").focus();
            } else {
                this.child_no = "";
                this.$refs.formInputChildInbound.$el.querySelector("input").focus();
            }
        },
        handleClearTableInfo() {
            this.dataTable = [];
            this.dataTableProp = [];
            this.inbound_number = "";
        },
        removeInboundNumber() {
            this.parent_no = '';
            this.inbound_number = '';
            this.hasInboundNumber = false;
            this.dataTable = [];
            this.dataTableProp = [];
            this.dataTableReceivingLog = [];
            
            this.clearInboundFromStorage();

            this.$nextTick(() => {
                this.$refs.formInputParentInbound.$el.querySelector("input").focus();
            });
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
        openDialog() {
        this.showDialog = true;
        },
        closeDialog() {
        this.showDialog = false;
        }
    },
    async mounted() {
        await this.loadInboundFromStorage();

        this.getParamRoute();

        if (!this.hasInboundNumber && !this.is_prealert && this.$refs.formInputParentInbound) {
            this.$refs.formInputParentInbound.$el.querySelector("input").focus();
        } else if (this.is_prealert && this.$refs.formInputInbound) {
            this.$refs.formInputInbound.$el.querySelector("input").focus();
        }
    }
}
</script>

<style scoped>
    .header-remark-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.header-remark-bar .title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}
.insert-remark-btn {
  margin-top: 5px; /* ✅ Turunkan tombol sedikit */
}
</style>
<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>Trace Connote</h2>
                </div>
            </vs-col>
        </vs-row>
        <section>
            <vs-row justify="space-around">
                <vs-col>
                    <div class="box view">
                        <form @submit.prevent="processConnoteNumber" style="display: flex; margin-top: 2em;">
                            <vs-col xs="4" sm="4" lg="4">
                                <vs-input 
                                    id="traceConnote"
                                    border 
                                    type="text"
                                    v-model="connoteNumber"
                                    label-placeholder="Masukkan Nomor Connote"
                                    :autofocus="true"
                                    :disabled="hasConnoteNumber"
                                    icon-after
                                    v-uppercase
                                    ref="formInputConnoteOrion"
                                    @keyup.enter="updateValueOrion"
                                    @click-icon="$refs.cameraScanner.open('formInputConnoteOrion')"
                                >
                                    <template #icon v-if="!hasConnoteNumber">
                                        <i class="bx bx-barcode-reader" />
                                    </template>
                                </vs-input>
                                <template v-if="hasConnoteNumber">
                                    <div style="position:absolute;right:20px; top:15px;">
                                        <span class="vs-select__chips__chip__close" @click="removeConnoteNumber">
                                            <i class="vs-icon-close vs-icon-hover-less"></i>
                                        </span>
                                    </div>
                                </template>
                            </vs-col>
                            <vs-col lg="1" sm="2" xs="1">
                            <vs-button type="submit">Search</vs-button>
                        </vs-col>
                        <vs-col lg="3" v-if="multiKolis.length > 0" class="multi-koli-col">
                            <template v-if="multiKolis.length > 0">
                                <div class="multi-koli-section">
                                    <selector 
                                    :name="'Multi Koli'"
                                    ref="trace_connote"
                                    :valueData="multiKolis"
                                    :selectedValue="selectedConnote"
                                    :isMultiple="false"
                                    :border="true"
                                    :tabindex="-1"
                                    @updateValue="updateMultiKoliValues" />
                                </div>
                            </template>
                        </vs-col>
                        </form>
                    </div>
                </vs-col> 
            </vs-row>
        </section>

        <section>
            <vs-row justify="space-around">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" style="margin-bottom: 2em;">
                    <div class="box view" v-if="koli_number !== '' && connote_found && !loading">
                        <vs-row justify="space-between">
                            <vs-col xs="6" sm="9" lg="9">
                                <nav-item :navItem="navItem" @activeTab="activeTab" />
                            </vs-col>
                            <vs-col xs="12" sm="3" lg="3" >
                                <template v-if="filterStatus.length > 1 && navActive === 'k-ACTIVITY'">
                                    <vs-select
                                        class="m-select"
                                        filter
                                        v-model="filterStatusBy"
                                        :border="true"
                                        :multiple="false"
                                        @change="updateFilterStatus"
                                    >
                                    <template v-if="filterStatus.length > 1">
                                        <vs-option
                                            v-for="(item,key) in filterStatus"
                                            :key="key"
                                            :label="item.label"
                                            :value="item.value">
                                        {{item.label}}
                                        </vs-option>
                                    </template>

                                    </vs-select>
                                </template>
                            </vs-col>
                        </vs-row>
                        <template v-if="navActive === 'k-INFO'">
                            <vs-row justify="space-between">
                                <vs-col xs="4" sm="4" lg="4">
                                    <selector-origin 
                                        :title="'From'"
                                        :valueData="originData"
                                        :tlc="originTlc"
                                        @updateInfo="updateInfo" 
                                    />
                                </vs-col>
                                <vs-col xs="4" sm="4" lg="4">
                                    <selector-detail 
                                        :title="'To'"
                                        :valueData="destinationData"
                                        :tlc="destinationTlc"
                                        @updateInfo="updateInfo" 
                                    />
                                </vs-col>
                                <vs-col xs="4" sm="4" lg="4">
                                    <selector-detail 
                                        :title="'Information'"
                                        :valueData="informationData"
                                        @updateInfo="updateInfo" 
                                    />
                                </vs-col>
                            </vs-row>
                        </template>
                        <template v-if="navActive === 'k-ACTIVITY'">
                            <vs-row>
                                <vs-col vs-align="center" xs="3" sm="3" lg="12">
                                    <select-status-inventory 
                                        ref="activityInventory"
                                        :isMultiple="false"
                                        :border="true"
                                        :filterStatusBy="filterStatusBy"
                                        @updateStatusinventory="updateStatusinventory" 
                                    />
                                </vs-col>
                            </vs-row>
                        </template>
                        <template v-if="navActive === 'k-BAG-HISTORY'">
                          <vs-row >
                            <vs-col vs-align="center" xs="12" sm="3" lg="12">
                              <select-bag-history />
                            </vs-col>
                          </vs-row>
                        </template>
                        <template v-if="navActive === 'k-CUSTOMER-VIEW'">
                          <vs-row >
                            <vs-col vs-align="center" xs="12" sm="3" lg="12">
                                <connote-customer-view 
                                    :connoteNumber="connote_number"
                                    :koliNumber="koli_number"
                                />
                            </vs-col>
                          </vs-row>
                        </template>
                        <template v-if="navActive === 'k-CALIM-BURDEN'">
                          <vs-row >
                            <vs-col vs-align="center" xs="12" sm="3" lg="12">
                                <claim-and-burden 
                                    :connoteNumber="connote_number"
                                    :koliNumber="koli_number"
                                />
                            </vs-col>
                          </vs-row>
                        </template>
                    </div>
                    <div class="box view" v-else-if="(koli_number && !connote_found && !loading) || (koli_number !== '' && !connote_found && !loading)">
                        <div style="margin-top: 2.5em;">
                            connote tidak ditemukan
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
import master from "@/mixins/master"
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import CameraScanner from "@/components/scanner/camera";
import SearchInput from "@/components/search/searchInput"
import selectorDetailVue from "@/views/inventory/connote-detail/connote/selectorDetail"
import SelectInventoryVue from "@/views/inventory/connote-detail/connote/selectInventoryStatus"
import SelectBagHistory from "@/views/inventory/connote-detail/connote/selectBagHistory"
import connoteCustomerView from "@/views/inventory/connote-detail/connote/connoteCustomerView.vue";
import claimAndBurden from "@/views/inventory/connote-detail/connote/claimBurden.vue";
import Selector from "@/components/input/select";

export default {
    name: "trace-connote",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "connote-customer-view": connoteCustomerView,
        "claim-and-burden": claimAndBurden,
        "search-input": SearchInput,
        "selector-origin": selectorDetailVue,
        "selector-detail": selectorDetailVue,
        "select-status-inventory": SelectInventoryVue,
        "select-bag-history": SelectBagHistory,
        CameraScanner,
        "selector": Selector
    },
    computed: {
    },
    data() {
      return {
        connoteNumber: "",
        hasConnoteNumber: false,
        navItem: [
          {
            label: "INFO",
            key: "k-INFO",
            title: "Connote Info"
          },
          {
            label: "ACTIVITY",
            key: "k-ACTIVITY",
            title: "Connote Activity"
          },
          {
            label: "BAG HISTORY",
            key: "k-BAG-HISTORY",
            title: "Connote's Bag History"
          },
          {
            label: "CUSTOMER VIEW",
            key: "k-CUSTOMER-VIEW",
            title: "Connote's Customer View"
          },
          {
            label: "CLAIM BURDEN",
            key: "k-CALIM-BURDEN",
            title: "Claim and Burden"
          }
        ],
        navActive: "k-INFO",
        title: "Connote Info",
        loading: false,
        originData: [],
        destinationData: [],
        originTlc: "",
        destinationTlc: "",
        informationData: [],
        statusinventory: "",
        koli_number: "",
        connote_number: "",
        connote_found: false,
        filterStatusBy: "All",
        filterStatus: [
            {
                label: 'All Connote Type',
                value: 'All'
            },
            {
                label: 'Connote Forward',
                value: 'FW'
            },
            {
                label: 'Connote Return',
                value: 'RT'
            },
            {
                label: 'Connote Return Failed',
                value: 'RF'
            }
        ],
        multiKolis: [],
        selectedConnote: ""
      };
    },
    methods: {
        updateInfo(key,val) {
            
        },
        removeConnoteNumber() {
            this.hasConnoteNumber = false;
            this.connoteNumber = "";
            this.koli_number = "";
            this.originData = [];
            this.destinationData = [];
            this.originTlc = "";
            this.destinationTlc = "";
            this.informationData = [];
            this.statusinventory = "";
            this.connote_found = false;
            this.loading = false;
            this.multiKolis = [];
            this.selectedConnote = "";
            this.activeTab("k-INFO");
            this.$router.push("/trace-connote");
            this.setRoutePageHistory(this.$route.meta, false);
        },

        async processConnoteNumber() {
            this.connote_number = this.connoteNumber;
            this.koli_number = this.connoteNumber;
            const url = `/trace-connote/${encodeURIComponent(this.koli_number)}`;
            await this.$router.push(url); 
            this.setRoutePageHistory(this.$route.meta, false);
            this.hasConnoteNumber = true
            this.getConnote();
        },
        updateStatusinventory(val) {
            this.statusinventory = val;
        },
        activeTab(val) {
            this.filterStatusBy = 'All';
            this.navActive = val;
            let item = this.navItem.filter(item => {
                return item.key == val;
            });
            this.title = item[0].title;
        },
        async getConnote() {
            this.loading = true;
            await axios
                .get(this.URL.connote +`/${this.koli_number}?n=${this.listenNodeId}`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data && Object.keys(res.data.data).length > 0) {
                        this.connote_found = true;
                        let response = res.data.data;
                        let multiKolis = response?.multi_kolis ?? [];
                        multiKolis.length > 0 && multiKolis.map(item => {
                            let obj = {};
                            obj["label"] = item.connote_number;
                            obj["value"] = item.connote_number;
                            this.multiKolis.push(obj);
                        });
                        const filteredConnote = this.findConnoteByNumber(multiKolis, this.koli_number);
                        if (filteredConnote == undefined) {
                            const koliTrimed = this.koli_number.slice(0, -2);
                            const filteredConnoteAfterTrimed = this.findConnoteByNumber(multiKolis, koliTrimed);
                            this.selectedConnote = filteredConnoteAfterTrimed == undefined ? null : filteredConnoteAfterTrimed.connote_number;
                        } else {
                            this.selectedConnote = filteredConnote;
                        }
                        let dataorigin={};
                        let dataDestination={}; 
                        let dataInformation={}; 
                        dataorigin = [
                            {
                                key : 'Nama',
                                value: response.connote_shipper_name
                            },
                            {
                                key : 'Phone',
                                value: response.connote_shipper_phone_number
                            },
                            {
                                key : 'Alamat',
                                value: response.connote_shipper_street_address
                            },
                            {
                                key : 'Kode Pos',
                                value: response.connote_shipper_zip_code,
                                width: 6
                            },
                            {
                                key : 'Kode Asal',
                                value: response.connote_shipper_tariff_code,
                                width: 6
                            }
                        ]
                        this.originData = dataorigin  
                        this.originTlc = response.connote_shipper_tlc  
                        this.destinationTlc = response.connote_receiver_tlc  
    
                        dataDestination = [
                            {
                                key : 'Nama',
                                value: response.connote_receiver_name
                            },
                            {
                                key : 'Phone',
                                value: response.connote_receiver_phone_number
                            },
                            {
                                key : 'Alamat',
                                value: response.connote_receiver_street_address
                            },
                            {
                                key : 'Kode Pos',
                                value: response.connote_receiver_zip_code,
                                width: 6
                            },
                            {
                                key : 'Kode Asal',
                                value: response.connote_receiver_tariff_code,
                                width: 6
                            }
                        ];
                        this.destinationData = dataDestination
                        let total =parseInt(response.amount_total_price)
                        let packing=[
                            {
                                key:'Packing Kayu',
                                value:response.is_packing_kayu,
                            },
                            {
                                key:'Insurance Admin',
                                value:this.moneyformat(response.amount_adm_insurance),
                            },
                            {
                                key:'Insurance',
                                value:this.moneyformat(response.amount_insurance),
                            },
                            {
                                key:'Surcharges',
                                value:this.moneyformat(response.amount_surcharge),
                            },
                            
                            {
                                key:'Subtotal',
                                value:this.moneyformat(response.amount_tariff),
                            },
                            {
                                key:'Special Tariff Discount',
                                value:this.moneyformat(response.amount_discount),
                            },
                            {
                                key:'Total',
                                value:this.moneyformat(total),
                            }
                        ];
                        dataInformation = [
                            {
                                key : 'Deskripsi barang',
                                value: response.description,
                                width: 6
                            },
                            {
                                key : 'Insured Value',
                                value: response.amount_insurance ? 'Rp '+ response.amount_insurance : 'Rp 0,00',
                                width: 6
                            },
                            {
                                key : 'kategori Barang',
                                value: response.connote_category,
                                width: 6
                            },
                            {
                                key : 'Service',
                                value: response.connote_service_code,
                                width: 6
                            },
                            {
                                key : 'Remark',
                                value: response.remarks ? response.remarks : 'N/A',
                                width: 6
                            },
                            {
                                key : 'Actual Weight',
                                value: response.connote_actual_weight + ' Kg',
                                width: 6
                            },
                        
                            {
                                key : 'Charged Weight',
                                value: response.connote_chargeable_weight + ' Kg',
                                width: 6
                            },
                            {
                                key : 'Jumlah',
                                value: response.koli_qty + ' Pcs',
                                width: 6
                            },
                            {
                                key : 'Amount COD',
                                value: 'Rp '+ Intl.NumberFormat('en-GB').format(response.amount_cod),
                                width: 6
                            },
                            {
                                key : 'Packing Kayu',
                                value: packing,
                            },
                            
                        
                        ]  
                        this.informationData = dataInformation
                    } else {
                        this.connote_found = false;
                    }
                    
                    this.loading = false

                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate list', err)
                })
        },

        // Scan Koli
        onCameraScannerGetData(data) {
            if (data && data.event === "result") {
                const result = data.data;

                switch (data.namespace) {
                    case "formInputConnoteOrion":
                        this.connoteNumber = result.text;
                        this.updateValueOrion();
                        break;
                    default:
                        break;
                }
            }
        },

        updateValueOrion() {
            this.connote_number = this.connoteNumber;
            this.koli_number = `${this.connoteNumber}`;
            const url = `/trace-connote/${encodeURIComponent(this.koli_number)}`;
            this.$router.push(url); 
            this.setRoutePageHistory(this.$route.meta, false);
            this.hasConnoteNumber = true
            this.getConnote();
        },

        updateFilterStatus(key) {
            this.filterStatusBy = key;
            this.$refs.activityInventory.refresh();
        },

        async updateMultiKoliValues(key, val) {
            this.multiKolis = [];
            this.koli_number = val;
            this.connote_number = val;
            this.connoteNumber = val;
            this.updateValueOrion();
        },

        findConnoteByNumber(data, targetConnoteNumber) {
            return data.find(item => item.connote_number === targetConnoteNumber);
        }
    },
    mounted() {
      this.getConnote();
      this.$refs.formInputConnoteOrion.$el.querySelector("input").focus();
    }
};
</script>
  
<style scoped>
.outline:focus {
    background-color: #153478;
}
.outline:hover {
    background-color: #153478;
}
.multi-koli-col {
    width: 210px;
}
.multi-koli-section {
    margin-top: -22px !important;
}
</style>
  
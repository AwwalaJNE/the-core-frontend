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
                <vs-col vs-type="flex" vs-justify="center" vs-align="center">
                    <div class="trace-connote-form">
                        <form @submit.prevent="processBookingCode">
                            <vs-input 
                                border 
                                type="text"
                                v-model="connoteNumber"
                                label-placeholder="Masukkan Nomor Connote"
                                autofocus
                                :disabled="hasConnoteNumber"
                            />
                            <vs-button type="submit">Submit</vs-button>
                        </form>
                    </div>
                </vs-col>  
                <vs-col xs="2" sm="2" lg="2">
                    <template v-if="hasCodeBooking">
                        <div style="position:absolute;left:-10px; top:15px;">
                            <span class="vs-select__chips__chip__close" @click="removeBookingCode">
                                <i class="vs-icon-close vs-icon-hover-less"></i>
                            </span>
                        </div>
                    </template>
                </vs-col>  
            </vs-row>
        </section>
        <section v-if="connote_number">
            <vs-row justify="space-around">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center">
                    <div class="box view">
                        <vs-row justify="space-between">
                            <vs-col xs="6" sm="9" lg="9">
                                <nav-item :navItem="navItem" @activeTab="activeTab" />
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
                                        :isMultiple="false"
                                        :border="true"
                                        @updateStatusinventory="updateStatusinventory" 
                                    />
                                </vs-col>
                            </vs-row>
                        </template>
                    </div>
                </vs-col>
            </vs-row>
        </section>
    </div>
  </template>
  
<script>

import axios from "axios";
import master from "@/mixins/master"
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
import selectorDetailVue from "@/views/inventory/connote-detail/connote/selectorDetail"
import SelectInventoryVue from "@/views/inventory/connote-detail/connote/selectInventoryStatus"


  export default {
    name: "trace-connote",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "selector-origin": selectorDetailVue,
        "selector-detail": selectorDetailVue,
        "select-status-inventory": SelectInventoryVue
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
        connote_number: ""
      };
    },
    methods: {
        async processBookingCode() {
            this.connote_number = this.connoteNumber;
            const url = `/trace-connote/${encodeURIComponent(this.connote_number)}`;
            await this.$router.push(url); 
            this.getConnote();
        },
        updateStatusinventory(val) {
            this.statusinventory = val;
        },
        activeTab(val) {
            this.navActive = val;
            let item = this.navItem.filter(item => {
                return item.key == val;
            });
            this.title = item[0].title;
        },
        async getConnote() {
            await axios
                .get(this.URL.connote +`/${this.connote_number}?n=${this.listenNodeId}`,
                this.Helper.header())
                .then(res => {
                    let response = res.data.data;
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
                            key : 'Packing Kayu',
                            value: packing,
                        },
                        
                       
                    ]  
                    this.informationData = dataInformation

                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate list', err)
                })
        },
    },
    mounted() {
      this.getConnote();
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
  .trace-connote-form {
    margin-top: 3em;
  }
  .trace-connote-form form {
    display: flex;
  }
  </style>
  
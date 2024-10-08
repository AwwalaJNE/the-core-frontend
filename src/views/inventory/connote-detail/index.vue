<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="6" lg="9">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
            <vs-col xs="4" sm="1" lg="1" align="right">
                <vs-button 
                square
                block
                @click="actionPrint"
                >PRINT BPIK</vs-button>
            </vs-col>
        </vs-row>
        <section>
            <vs-row justify="space-around">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" :w="`${navActive === 'k-PERMISSIONS'?'4':'12'}`">
                    <div class="box view">
                        <vs-row justify="space-between">
                            <vs-col xs="6" sm="9" lg="9">
                                <nav-item :navItem="navItemm" @activeTab="activeTab" />
                            </vs-col>
                            
                        </vs-row>
                        <template v-if="navActive === 'k-INFO'">
                          <vs-row justify="space-between">
                            <vs-col xs="12" sm="6" lg="4">
                              <selector-origin
                                  :title="'From'"
                                  :valueData="originData"
                                  :tlc="originTlc"
                                  @updateInfo="updateInfo" />
                            </vs-col>

                            <vs-col xs="12" sm="6" lg="4">
                              <selector-detail
                                  :title="'To'"
                                  :valueData="destinationData"
                                  :tlc="destinationTlc"
                                  @updateInfo="updateInfo" />
                            </vs-col>
                            <vs-col xs="12" sm="4" lg="4">
                              <selector-detail
                                  :title="'Information'"
                                  :valueData="informationData"
                                  @updateInfo="updateInfo" />
                            </vs-col>
                          </vs-row>

                        </template>
                        <template v-if="navActive === 'k-ACTIVITY'">
                          <vs-row >
                            <vs-col vs-align="center" xs="12" sm="3" lg="12">
                              <select-status-inventory :isMultiple="false" :border="true" @updateStatusinventory="updateStatusinventory" />
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
import SelectBagHistory from "@/views/inventory/connote-detail/connote/selectBagHistory"
import connoteCustomerView from "@/views/inventory/connote-detail/connote/connoteCustomerView.vue";


export default {
    name:"ConnoteDetail",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "connote-customer-view": connoteCustomerView,
        "search-input": SearchInput,
        "selector-origin": selectorDetailVue,
        "selector-detail": selectorDetailVue,
        "select-status-inventory": SelectInventoryVue,
        "select-bag-history": SelectBagHistory,
    },
    data() {
        return {
            navItemm: [
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
                }
            ],
            navActive: "k-INFO",
            dialogUser: false,
            dialogRole: false,
            title: "Connote List",
            dataRole: [],
            loadingDataRole: false,
            loading: false,
            dataItem: {},
            tempSearch: "",
            dialogRole: false,
            refreshInject:"",
            originData:[],
            destinationData:[],
            originTlc:'',
            destinationTlc:'',
            informationData:[],
            statusinventory:"",
            koli_number:'',
            connote_number:''
        }
    },
    methods: {
        updateStatusBag(key,val) {
          this.status_bag = val;
        },
        updateStatusinventory(key,val) {
          this.statusinventory = val;
        },
        updateInfo(key,val) {

        },
        refresh(){
            let el = this.refreshInject
            this.$refs[el].refresh() // trigger function refresh form dari luar component list
        },

        activeTab(val) {
            this.navActive = val
            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title


        },
        openDialog(){
            switch(this.navActive) {
                case "k-INFO":
                    this.dialogUser = true
                    break;
                case "k-ACTIVITY":
                    this.dialogRole = true
                    break;
                default:
                    // code block
            }
            this.refreshInject = this.navActive
        },
        closeDialogUser() {
            this.dialogUser = false
        },
        closeDialogRole() {
            this.dialogRole = false
        },
        getParamRoute(){
          if(this.$route.params.id){
            this.koli_number = this.$route.params.id
          }
        },
        async getConnote() {
            await axios
                .get(this.URL.connote +`/${this.koli_number}?n=${this.listenNodeId}`,
                this.Helper.header())
                .then(res => {
                    let response = res.data.data;
                    this.connote_number = response.connote_number
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
                    let special_tariff = response.special_tariff ? response.special_tariff : 0;
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

                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate list', err)
                })
        },
        actionPrint(){
            let routeData = this.$router.resolve({ 
                name: 'printGeneral', 
                params: { 
                    'id': this.connote_number, 
                    'type': 'bpik',
                    'node_id': this.listenNodeId
                } 
            });
            
            const printWindow = window.open(routeData.href, '_blank', 'noopener');
      
            if (printWindow) {
                printWindow.onload = function() {
                    printWindow.print();
                    printWindow.onafterprint = () => printWindow.close();
                };
            }
        },
    },
    mounted(){
        this.getParamRoute();
        this.getConnote();
        this.handlePrintShortcut(this.actionPrint)
    }
}
</script>
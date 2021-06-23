<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>New Transactions</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3">
            </vs-col>
        </vs-row>
        <section class="new-transaction mt-1">
            <vs-row justify="flex-start">
                        <vs-col xs="6" sm="2" lg="2">
                            <form @submit.prevent="processBookingCode">
                                <!-- <input-general 
                                name="Masukan Kode Booking"
                                rules=""
                                formKey="bookingCode"
                                :valueData="''"
                                typeInput="text"
                                :disabled="hasCodeBooking"
                                @updateValue="updateValue" /> -->
                                <vs-input border type="text"
                                    v-model="bookingCode"
                                    label-placeholder="Masukkan Code Booking"
                                    :autofocus="true"
                                    :disabled="hasCodeBooking"
                                    ref="inputCodeBooking">
                                </vs-input>
                            </form>
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
            <vs-row justify="space-between">
                <vs-col xs="12" sm="9" lg="9">
                    <div>
                        <template>
                            <form-master ref="formTransaction" @onSubmit="onSubmit">
                                <template v-slot:inputValidator>
                                    <div>
                                        <vs-row justify="space-between">
                                            <vs-col xs="12" sm="6" lg="6">
                                                <div ref="test" tabindex="1"></div>
                                                <origin ref="originComponent"/>
                                            </vs-col>
                                            <vs-col xs="12" sm="6" lg="6">
                                                <div ref="test2" tabindex="2"></div>
                                                <destination ref="destinationComponent"/>
                                            </vs-col>
                                        </vs-row>
                                        <vs-row justify="space-between" class="mb-2" style="margin-top:10px">
                                            <vs-col xs="12" sm="12" lg="12">
                                                <div ref="test3" tabindex="11"></div>
                                                <package ref="packageComponent"/>
                                            </vs-col>
                                        </vs-row>
                                    </div>
                                </template>
                            </form-master>
                        </template>
                        

                        <vs-row justify="flex-end" style="top:-13px">
                            <vs-col xs="6" sm="2" lg="2">
                                <vs-button
                                transparent
                                block
                                flat
                                :active="true"
                                :disabled="disabledAddmore"
                                type="submit"
                                @click="addMoreConnote()"
                                >
                                <i class='bx bx-plus' style="margin-right: 5px" ></i> ADD MORE
                                </vs-button>
                            </vs-col>
                            <vs-col xs="6" sm="2" lg="2">
                                <vs-button
                                transparent
                                block
                                flat
                                :active="true"
                                type="submit"
                                @click="createTransaction()"
                                >
                                    FINISH
                                </vs-button>
                            </vs-col>
                        </vs-row>
                    </div>
                </vs-col>
                <vs-col xs="12" sm="3" lg="3">
                    <calc />
                </vs-col>
            </vs-row>
        </section>
        <payment
            :active="dialogPayment" 
            :closeDialog="closePaymentDialog"
            />
        
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TransactionMixin from "@/mixins/transaction.js"
import InputGeneral from "@/components/input/general"
import FormMaster from "@/components/form/formMaster"
import Breadcrumb from "@/components/breadcrumb/index"
import Origin from "@/views/transaction/origin"
import Destination from "@/views/transaction/destination"
import Package from "@/views/transaction/package"
import Calc from "@/views/transaction/calc"
import Payment from "@/views/transaction/payment"
export default {
    name: "new-transaction",
    mixins: [master, TransactionMixin],
    components: {
        "form-master": FormMaster,
        "origin" : Origin,
        "destination" : Destination,
        "breadcrumb": Breadcrumb,
        "package": Package,
        "calc": Calc,
        "payment": Payment,
        "input-general": InputGeneral,
    },
    computed: {
        listenOrigin () {
            return this.$store.getters.getTransaction.origin
        },
        listenConnoteActive () {
            return this.$store.getters.getTransaction.connote_index_active
        },
        listenDestination () {
            return this.$store.getters.getTransaction.destination
        },
        listenPackage () {
            return this.$store.getters.getTransaction.package
        },
        listenTransaction () {
            return this.$store.getters.getTransaction.transaction
        },
        listenConnoteIndexActive () {
            return this.$store.getters.getTransaction.connote_index_active
        },
    },
    data() {
        return {
            typeAction: '',
            dataTransaction: {},
            dialogPayment: false,
            printTransactionBarcodeShow: false,
            koli_number: '',
            legacySystemHTML: '',
            bookingCode: '',
            hasCodeBooking: false,
            disabledAddmore: false,

            prosesConnote: {},
            tempConnote: {},
            prosesDataTransaction: {},

            rerender: false
        }
    },
    methods: {
        openPaymentDialog(){
            this.dialogPayment = true
        },
        closePaymentDialog() {
            this.dialogPayment = false
        },
        onSubmit(refs){
            // console.log('onsubmit form controller', refs)
                refs.form.validate().then(success => {
                    if (!success) {
                        console.log('err niih')
                        return;
                    }
                    
                    this.collectData()

                    let needValidation = false
                    let indexKoli = 0
                    let inputan = ''
                    // quick fix required koli input dalem dialog multikoli
                    let dataConnote = this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive]
                    for(let i=0; i<= dataConnote['connote_koli_item'].length-1;i++) {
                        // console.log('koli curr', dataConnote['connote_koli_item'][i])
                        if(dataConnote['connote_koli_item'][i]['description'] == '') {
                                    needValidation = true
                                    indexKoli = i
                                    inputan = 'Description'
                                    break;
                        } else if(dataConnote['connote_koli_item'][i]['actual_weight'] == '') {
                            needValidation = true
                            indexKoli = i
                            inputan = 'Weight'
                            break;
                        }
                    }

                    if(needValidation == true) {
                        // this.openNotification('warn', `${inputan} koli ke ${indexKoli + 1} kosong`, `${inputan} tidak boleh kosong`)
                    } else {
                        this.createConnote2()
                    }

                    // Wait until the models are updated in the UI
                    this.$nextTick(() => {
                        refs.form.reset();
                    });
                });
        },
        updateValue(key,val){
            switch(key) {
                case "bookingCode":
                    this.bookingCode = val
                    break;
                default:
                    console.log('meong')
                    // code block
            }
        },

        removeBookingCode() {
            if(this.hasCodeBooking == true) {
                this.refreshTransactionStore()
                this.$store.dispatch(`SET_PACKAGE_PACKAGE_COD_Visible`, false)
                this.$store.dispatch(`SET_PACKAGE_PACKAGE_COD`, 0)
            }
            this.hasCodeBooking = false
            this.bookingCode = ""
        },
        
        async processBookingCode(){
          await axios
              .get(this.URL.booking_connote +
                  `/${this.bookingCode}?n=${this.listenNodeId}`,
                  this.Helper.header())
              .then(res => {
                // console.log('res processBookingCode', res.data.data)
                if(res.data.data) {
                    let data = res.data.data

                    
                    this.hasCodeBooking = true
                    
                
                    this.$store.dispatch(`FILL_CONNOTE_NUMBER`, data.booking_connote_number)

                    // Origin
                    this.$store.dispatch(`SET_ORIGIN_ORIGIN_NAME`, data.booking_connote_shipper_name)
                    this.$store.dispatch(`SET_ORIGIN_ORIGIN_PHONE`, data.booking_connote_shipper_phone_number)
                    this.$store.dispatch(`SET_ORIGIN_ORIGIN_ADDRESS`, data.booking_connote_shipper_street_address)
                    this.$store.dispatch(`SET_ORIGIN_ORIGIN_SUBDISTRICT_ID`, data.booking_connote_shipper_geolocation_subdistrict_id)
                    this.$store.dispatch(`SET_ORIGIN_ORIGIN_ONCHANGE_ADDRESS`, data.booking_connote_shipper_administrative_address)
                    this.$store.dispatch(`SET_ORIGIN_ORIGIN_ZIP_CODE`, data.booking_connote_shipper_zip_code)
                    this.$store.dispatch(`SET_PACKAGE_PACKAGE_COD_Visible`, true)

                    // destination
                    let destinationObj = {}
                    destinationObj['customer_address_type'] = data.booking_connote_receiver_address_type
                    destinationObj['geolocation_subdistrict_zip_code'] = data.booking_connote_receiver_zip_code
                    destinationObj['geolocation_subdistrict_tarif_code'] = data.booking_connote_receiver_tariff_code
                    destinationObj['customer_name'] = data.booking_connote_receiver_name
                    destinationObj['customer_phone'] = data.booking_connote_receiver_phone_number
                    
                    destinationObj['customer_subdistrict_id'] = data.booking_connote_receiver_geolocation_subdistrict_id
                    destinationObj['geolocation_location_name'] = data.booking_connote_receiver_administrative_address
                    destinationObj['booking_connote_service_code'] = data.booking_connote_service_code
                    this.$refs.destinationComponent.updateValue('detination', destinationObj, true)
                    this.$store.dispatch(`SET_DESTINATION_DESTINATION_ADDRESS`, data.booking_connote_receiver_street_address)
                } else {
                    this.openNotification('danger', 'Booking code not found', err.response ? err.response.data.message : 'something went wrong')
                }
              }).catch(err => {
                  this.openNotification('danger', 'Booking code not found', err.response ? err.response.data.message : 'something went wrong')
                // this.openNotification('danger', 'Failed to collect role list', err)
              })
        },

        addMoreConnote() {
            this.typeAction = 'addconnote'
            this.$refs.formTransaction.formSubmit()
        },
        createTransaction() {
          let dataTransaction = this.$store.getters.getTransaction.transaction
          // if(this.dataTransaction.hasOwnProperty("transaction_id") && this.dataTransaction.hasOwnProperty("transaction_finished")) {
          console.log("click finish",dataTransaction)
            if(dataTransaction["transaction_id"] !== "" && dataTransaction["transaction_finished"] == true) {
              this.openPaymentDialog()
            } else {
              this.typeAction = 'finish'
              
              this.$refs.formTransaction.formSubmit()
            }
          // }
            
        },
        collectData() {
            this.tempConnote = {}
            let dataTransaction = JSON.parse(JSON.stringify(this.$store.getters.getTransaction.transaction))
            this.prosesDataTransaction = dataTransaction
            this.prosesDataTransaction['transaction_finished'] = this.typeAction == 'finish' ? true : false

            // hanya kirim connote yg belom/mau dibuat
            let dataConnote = JSON.parse(JSON.stringify(this.$store.getters.getTransaction.transaction.connote[this.listenConnoteIndexActive]))
            let arr = []
            arr.push(dataConnote)
            this.prosesDataTransaction['connote'] = arr
            this.prosesDataTransaction['node_code'] = this.listenNodeCode

            // console.log('==== transaction collectData ====', this.prosesDataTransaction)
        },

        async createConnote2() {
            // this.rerender = true
            this.openLoading()
            await axios
                .post(
                    this.URL.connote + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.prosesDataTransaction), 
                    this.Helper.header()
                ).then(res => {
                    if(res.status == 200){
                        this.prosesDataTransaction = {}
                        // console.log('res connote ========>', res)
                        this.tempConnote = res.data.data
                        this.handleDataTransaction()
                        this.wrapKoliNumber()

                        if(this.typeAction == 'addconnote') {
                            // this.refreshTransactionFields()
                            // this.$refs.originComponent.setFocus()
                        } else {
                            
                            this.getDataKoli()
                            this.$nextTick(() => {
                                this.openPaymentDialog()
                            });
                        }
                        // this.rerender = false
                    } else {
                        this.openNotification('danger', 'Transaction failed', err.response ? err.response.data.message : 'something went wrong')
                    }
                    this.closeLoading()
                }).catch(err => {
                    // this.rerender = false
                    this.openNotification('danger', 'Transaction failed', err.response ? err.response.data.message : 'something went wrong')
                    this.closeLoading()
                })
        },

        handleDataTransaction() {
            // console.log('ADMORE CONNOTE ===> ', this.tempConnote)
            let current_connote = {}
            Object.keys(this.tempConnote).length > 0 && Object.keys(this.tempConnote).map(item => {
                if(item !== 'shipper_geolocation' && 
                item !== 'receiver_geolocation' &&
                item !== 'tariff' &&
                item !== 'koli' &&
                item !== 'transaction_id') {
                    if(item == 'connote_number' ||
                    item == 'connote_booking_number' ||
                    item == 'connote_reference_number') {
                        current_connote[item] = this.tempConnote[item].toString()
                    } else {
                        current_connote[item] = this.tempConnote[item]
                    }
                    
                }

                if(item == 'amount_total_price') {
                    current_connote['total_biaya'] = this.tempConnote[item]
                }

                if(item == 'koli') {
                    let koliList = this.tempConnote[item]

                    // fix karena key yg didapet dari respond endpoint create connote gak konsisten 
                    // dengan key yg dibutuhkan untuk create data connote

                    koliList.map(item => {
                        if(item.hasOwnProperty('koli_actual_weight')) {
                            item['actual_weight'] = item['koli_actual_weight']
                        } 
                        if(item.hasOwnProperty('koli_height')) {
                            item['height'] = item['koli_height']
                        } 
                        if(item.hasOwnProperty('koli_length')) {
                            item['length'] = item['koli_length']
                        } 
                        if(item.hasOwnProperty('koli_width')) {
                            item['width'] = item['koli_width']
                        } 
                        if(item.hasOwnProperty('koli_volume_weight')) {
                            item['volume_weight'] = item['koli_volume_weight']
                        }
                        if(item.hasOwnProperty('surcharge_id')) {
                            item['surcharge_id'] = item['surcharge_id']
                        } else {
                            item['surcharge_id'] = []
                        }
                    })

                    current_connote['connote_koli_item'] = koliList
                }
            })

            let test = JSON.parse(JSON.stringify(this.$store.getters.getTransaction.transaction.connote))
            test[this.listenConnoteActive] = current_connote

            // console.log('handleDataTransaction ++++=? ', test)


            this.$store.dispatch(`FILL_TRANSACTION_DATA`, {'key':'transaction_id', 'value':this.tempConnote['transaction_id']})
            this.$store.dispatch(`FILL_TRANSACTION_DATA`, {'key':'connote', 'value':test})
            this.$store.dispatch(`FILL_TRANSACTION_DATA`, {'key':'transaction_finished', 'value': this.typeAction == 'finish' ? true : false }) // this.tempConnote['transaction_finished']
            this.$store.dispatch(`FILL_TRANSACTION_DATA`, {'key':'node_code', 'value':this.listenNodeCode})


            // // setelah proses ngisi transaction data connote dari respond post connote selesai,
            // // - add obj data connote template
            // // - connote index active + 1.
            if(this.typeAction == 'addconnote') {
                this.$store.dispatch(`ADD_MORE_CONNOTE`, true)
                this.$store.dispatch(`SET_CONNOTE_INDEX_ACTIVE`, this.listenConnoteActive + 1)

                let self = this
                setTimeout(function(){ 
                    self.refreshTransactionFields()
                    self.$refs.originComponent.setFocus()

                    self.$store.dispatch(`SET_PACKAGE_PACKAGE_DESCRIPTION`, "")
                    self.$store.dispatch(`SET_PACKAGE_PACKAGE_DESCRIPTION_ValueData`, "")
                }, 1000);
                
            } else if(this.typeAction == 'finish') {
              this.disabledAddmore = true
            }

            
        },

        wrapKoliNumber() {
            let connote = this.$store.getters.getTransaction.transaction.connote
            // console.log('+++++++++WRAP KOLI+++++++++',connote)
            this.koli_number = ''
            let str = []
            connote.map(conot => {
                if(conot.hasOwnProperty('connote_koli_item')) {
                    let temp = []
                    conot.connote_koli_item.map(koli => {
                        if(koli.hasOwnProperty('koli_number')) {
                            temp.push(koli.koli_number)
                        }
                    })
                    str = [...str, ...temp]
                }
            })
            this.koli_number = str.toString()
            // console.log('this.koli_number', this.koli_number)
        },

        fillTransactionData(data){
            
            this.dataTransaction['transaction_id'] = data.transaction_id || ''
            let res_connote = {}
            Object.keys(data).length > 0 && Object.keys(data).map(item => {
                if(item !== 'shipper_geolocation' && 
                item !== 'receiver_geolocation' &&
                item !== 'tariff' &&
                item !== 'koli' &&
                item !== 'transaction_id') {
                    if(item == 'connote_number' ||
                    item == 'connote_booking_number' ||
                    item == 'connote_reference_number') {
                        res_connote[item] = data[item].toString()
                    } else {
                        res_connote[item] = data[item]
                    }
                    
                }

                if(item == 'amount_total_price') {
                    res_connote['total_biaya'] = data[item]
                }

                if(item == 'koli') {
                    let koliList = data[item]

                    // fix karena key yg didapet dari respond endpoint create connote gak konsisten 
                    // dengan key yg dibutuhkan untuk create data connote

                    koliList.map(item => {
                        if(item.hasOwnProperty('koli_actual_weight')) {
                            item['actual_weight'] = item['koli_actual_weight']
                        } 
                        if(item.hasOwnProperty('koli_height')) {
                            item['height'] = item['koli_height']
                        } 
                        if(item.hasOwnProperty('koli_length')) {
                            item['length'] = item['koli_length']
                        } 
                        if(item.hasOwnProperty('koli_width')) {
                            item['width'] = item['koli_width']
                        } 
                        if(item.hasOwnProperty('koli_volume_weight')) {
                            item['volume_weight'] = item['koli_volume_weight']
                        }
                        if(item.hasOwnProperty('surcharge_id')) {
                            item['surcharge_id'] = item['surcharge_id']
                        } else {
                            item['surcharge_id'] = []
                        }
                    })

                    res_connote['connote_koli_item'] = koliList
                }
            })

            

            // connote yg terakhir dibuat / connote dengan connote_number yg sebelumnya kosong 
            let lastIndex = this.dataTransaction['connote'].length - 1
            this.dataTransaction['connote'][lastIndex] = res_connote

            // console.log('CCCConote', this.dataTransaction, res_connote)

            this.$store.dispatch(`FILL_TRANSACTION_DATA`, {'key':'transaction_id', 'value':this.dataTransaction['transaction_id']})
            this.$store.dispatch(`FILL_TRANSACTION_DATA`, {'key':'connote', 'value':this.dataTransaction['connote']})
            this.$store.dispatch(`FILL_TRANSACTION_DATA`, {'key':'transaction_finished', 'value':this.dataTransaction['transaction_finished']})
            this.$store.dispatch(`FILL_TRANSACTION_DATA`, {'key':'node_code', 'value':this.dataTransaction['node_code']})


            // setelah proses ngisi transaction data connote dari respond post connote selesai,
            // - add obj data connote template
            // - connote index active + 1.
            if(this.typeAction == 'addconnote') {
                this.$store.dispatch(`ADD_MORE_CONNOTE`, true)
                this.$store.dispatch(`SET_CONNOTE_INDEX_ACTIVE`, this.listenConnoteActive + 1)
            }
        },

        async getDataKoli() {
			let self = this
			await axios
                .get(this.URL.print + 
                `/${this.koli_number}/koli?n=${this.listenNodeId}`, 
                this.Helper.header())
                .then(res => {
					// console.log('getDataKoli', res.data.html)
                    this.legacySystemHTML = res.data.html

                    this.$nextTick(() => {
                        var myWindow = window.open("", "MsgWindow", "width=600,height=400");
                        myWindow.document.write(`${this.legacySystemHTML}`);
                        myWindow.document.close();
                        myWindow.focus();
                        // window action print setelah 3s
                        setTimeout(function(){ myWindow.print(); }, 3000);
                    });
                    
					
					// document.appendChild(div)
					
                    // this.res = res.data.data
                }).catch(err => {
                    // this.loading = false
                    // this.checkAuth(err.response)
					// this.openNotification('danger', 'Print koli failed', err.response ? err.response.data.message : 'something went wrong')
                    // this.openNotification('danger', 'Failed to populate country list', err)
                })
		},

        keyHandler(e) {
            /**
             * 112 - f1
             * 113 - f2
             * 114 - f3
             
             * 117 - f6
             * 118 - f7
             */
            const key = e.which || e.keyCode;
            switch(true) {
                case key === 112 || (e.altKey && key === 112) || (e.shiftKey && key === 112):
                    this.$refs.originComponent.openGetCustomer()
                    break;
                case key === 113 || (e.altKey && key === 113) || (e.shiftKey && key === 113):
                    this.$refs.destinationComponent.openGetCustomer()
                    break;
                case key === 114 || (e.altKey && key === 114) || (e.shiftKey && key === 114):
                    this.$refs.packageComponent.openBpikComponent()
                    break;
                case key === 117 || (e.altKey && key === 117) || (e.shiftKey && key === 117):
                    this.$refs.packageComponent.connoteNumberDialog('pra')
                    break;
                case key === 118 || (e.altKey && key === 118) || (e.shiftKey && key === 118):
                    this.$refs.packageComponent.connoteNumberDialog('single')
                    break;
                case 117:
                    
                    break;
                default:
            }
        },
        addKeyHandler() {
            window.addEventListener("keydown", this.keyHandler);
            console.log('inject transaction key handler add')
        },
        removeKeyHandler() {
            // window.removeEventListener("keydown", this.keyHandler);
            console.log('transaction key handler destroyyy')
        }

        
    },
    mounted() {
        this.addKeyHandler()

        // mixin->transaction
        this.getDefaultState()
        

        this.$nextTick(() => {
            let inputCodeBooking = this.$refs.inputCodeBooking
            setTimeout(function(){ inputCodeBooking.$el.querySelector('input').focus() }, 100);
        })
    },
    beforeRouteLeave (to, from, next) {
        console.log("beforeRouteEnter", to, from)
        this.refreshTransactionStore()
        next();
    },
    // beforeRouteUpdate(to, from, next) {
    //     console.log("beforeRouteUpdate", to, from)
    //     this.refreshTransactionStore()
    //     next();
    // },
    destroyed() {
        // this.removeKeyHandler();
    }
}
</script>
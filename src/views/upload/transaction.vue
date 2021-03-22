<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <h2 class="uploadTitle">Upload Transaction</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3">
                <div style="position:relative;display:flex;justify-content: flex-end;">
                    
                </div>
            </vs-col>
        </vs-row>
        <div class="box view">
            <div class="nav-box mb-2">
                <vs-row justify="space-between">
                    <vs-col xs="12" sm="3" lg="3">
                        <template v-if="inputType.length > 0 && dataTable.length == 0">
                            <!-- <selector 
                            ref="uploadType"
                            name="Upload type"
                            formKey="selectedInputType"
                            :selectedValue="selectedInputType"
                            :valueData="inputType"
                            :isMultiple="false"
                            @updateValue="handleChangeInputType" /> -->
                        </template>
                    </vs-col>
                    <vs-col xs="12" sm="4" lg="4">
                        <vs-row justify="flex-end">
                            <vs-col xs="4" sm="4" lg="4">
                                <template v-if="dataTable.length > 0">
                                    <vs-button
                                    transparent
                                    block
                                    flat
                                    danger
                                    :active="true"
                                    @click="handleClear"
                                    >
                                        Clear
                                    </vs-button>
                                </template>
                            </vs-col>
                            <vs-col xs="4" sm="4" lg="4">
                                <template v-if="dataTable.length > 0">
                                    <vs-button
                                    transparent
                                    block
                                    flat
                                    :active="true"
                                    @click="handleProcess"
                                    >
                                        Process
                                    </vs-button>
                                </template>
                            </vs-col>
                        </vs-row>
                    </vs-col>
                </vs-row>
            </div>
            
            <template v-if="dataTable.length == 0">
                    <transition name="slide-fade">
                        <vs-row justify="center">
                            <vs-col xs="12" sm="12" lg="12">
                                <el-upload
                                    class="upload-demo"
                                    drag
                                    action=""
                                    :before-upload="beforeUpload"
                                    multiple>
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                                    <div class="el-upload__tip" slot="tip">
                                        <vs-button
                                            style="margin:.5em auto"
                                            dark
                                            shadow
                                            @click="handleDownload"
                                            >
                                            {{'download template ' + listenUpload}}
                                        </vs-button>
                                    </div>
                                    
                                </el-upload>
                            </vs-col>
                        </vs-row>
                    </transition>
            </template>

            <template v-if="dataTable.length > 0">
                <transition name="slide-fade">
                    <table-master 
                    :dataTable="dataTable" 
                    :dataColumn="datacolumn" 
                    :hasAction="false"
                    :hasPagination="false"
                    />
                </transition>
            </template>
            
        </div>
    </div>
</template>
<script>
import XLSX from "xlsx"
import axios from "axios";
import master from "@/mixins/master"
import Breadcrumb from "@/components/breadcrumb/index"
import TableMaster from "@/components/table/tableMaster.vue"
import Selector from "@/components/input/select"
import { messages } from 'vee-validate/dist/locale/en.json';
import { required, email, min } from 'vee-validate/dist/rules'
export default {
    name:"upload-transaction",
    mixins: [master],
    components: {
        "breadcrumb": Breadcrumb,
        "table-master" : TableMaster,
        "selector": Selector,
    },
    data() {
        return {
            fileList: [],
            typed: [],
            inputType: [],
            selectedInputType: "",
            InputObject: {},
            InputKeys: [],
            datacolumn: [],
            dataTable: [],
            progress: 0,
            keys: [],
            template: {
                "Connote ID":{
                    "label":"Connote ID",
                    "key":"connote_id",
                    "width":"xs",
                    "type": "",
                    "rule": "required|string"
                },
                "Nama Penerima":{
                    "label":"Nama Penerima",
                    "key":"connote_receiver_name",
                    "width":"xs",
                    "type": "",
                    "rule": "required|string"
                },
                "Alamat Penerima":{
                    "label":"Alamat Penerima",
                    "key":"connote_receiver_street_address",
                    "width":"xs",
                    "type": "",
                    "rule": "required|string"
                },
                "Kodepos Penerima":{
                    "label":"Kodepos Penerima",
                    "key":"connote_receiver_zip_code",
                    "width":"xs",
                    "type": "",
                    "rule": "required|number"
                },
                "Telepon Penerima":{
                    "label":"Telepon Penerima",
                    "key":"connote_receiver_phone_number",
                    "width":"xs",
                    "type": "",
                    "rule": "required|phone"
                },

                "Nama Pengirim":{
                    "label":"Nama Pengirim",
                    "key":"connote_shipper_name",
                    "width":"xs",
                    "type": "",
                    "rule": "required|string"
                },
                
                "Alamat Pengirim":{
                    "label":"Alamat Pengirim",
                    "key":"connote_shipper_street_address",
                    "width":"xs",
                    "type": "",
                    "rule": "required|string"
                },
                "Kodepos Pengirim":{
                    "label":"Kodepos Pengirim",
                    "key":"connote_shipper_zip_code",
                    "width":"xs",
                    "type": "",
                    "rule": "required|number"
                },
                "Telepon Pengirim":{
                    "label":"Telepon Pengirim",
                    "key":"connote_shipper_phone_number",
                    "width":"xs",
                    "type": "",
                    "rule": "required|phone"
                },

                "Service":{
                    "label":"Service",
                    "key":"connote_service_code",
                    "width":"xs",
                    "type": "",
                    "rule": "required|string"
                },

                "Deskripsi Barang":{
                    "label":"Deskripsi Barang",
                    "key":"connote_description",
                    "width":"xs",
                    "type": "",
                    "rule": "required|string"
                },

                "Remarks":{
                    "label":"Remarks",
                    "key":"remarks",
                    "width":"xs",
                    "type": "",
                    "rule": "string"
                },

                "Berat":{
                    "label":"Berat",
                    "key":"weight",
                    "width":"xs",
                    "type": "",
                    "rule": "required|decimal"
                },
                "Panjang":{
                    "label":"Panjang",
                    "key":"length",
                    "width":"xs",
                    "type": "",
                    "rule": "decimal"
                },
                "Lebar":{
                    "label":"Lebar",
                    "key":"width",
                    "width":"xs",
                    "type": "",
                    "rule": "decimal"
                },
                "Tinggi":{
                    "label":"Tinggi",
                    "key":"height",
                    "width":"xs",
                    "type": "",
                    "rule": "decimal"
                },

                "Asuransi":{
                    "label":"Asuransi",
                    "key":"is_insured",
                    "width":"xs",
                    "type": "",
                    "rule": "boolean"
                },

                "Amount Cod":{
                    "label":"Amount Cod",
                    "key":"amount_cod",
                    "width":"xs",
                    "type": "",
                    "rule": "number"
                },

                "Nilai Barang":{
                    "label":"Nilai Barang",
                    "key":"insured_goods_value",
                    "width":"xs",
                    "type": "",
                    "rule": "number"
                },

                "Reference Number":{
                    "label":"Reference Number",
                    "key":"reference_number",
                    "width":"xs",
                    "type": "",
                    "rule": "string"
                },
            },
            tempStatus: true,
            tempMsg: '',
            dataConnote: []
        }
    },
    computed: {
        listenUpload(){
            return this.selectedInputType.replace(/[&\/\\#,+()$~%._'":*?<>{}]/g, " ")
        }
    },
    methods: {
        async handleProcess(){
            const loading = this.$vs.loading({
                progress: 0
            })

            const interval = setInterval(() => {
                if (this.progress <= 100) {
                loading.changeProgress(this.progress++)
                }
            }, 40)

            
            // let wrapTransaction = this.$store.getters.getTransaction.transaction
            // wrapTransaction['connote'] = this.dataConnote
            // wrapTransaction['transaction_finished'] = true
            // wrapTransaction['node_code'] = this.listenNodeCode
            let filterData = this.dataConnote.filter(item => {
                return item.status == true
            })
            await axios
                .post(
                    this.URL.upload_connote + `?n=${this.listenNodeId}`,
                    JSON.stringify(filterData), 
                    this.Helper.header()
                ).then(res => {
                    if(res.status == 200){
                        console.log('res connote ========>', res)
                        if (this.progress <= 100) {
                                loading.changeProgress(this.progress++)
                        }
                        // this.tempConnote = res.data.data
                        // this.handleDataTransaction()
                        // if(this.typeAction == 'addconnote') {
                            // this.refreshTransactionStore()
                            // this.$refs.originComponent.setFocus()
                        // } else {
                            // this.getDataKoli()
                            // this.$nextTick(() => {
                            //     this.openPaymentDialog()
                            // });
                        // }
                    }
                }).catch(err => {
                    console.log('err', err.response)
                    // let index = err.response.data.message.split('.')[0] || 0
                    // let obj = {}
                    // this.dataTable[index]['status'] = false
                    // this.dataTable[index]['message'] = err.response.data.message || 'something went wrong'
            
                })
            
            
            setTimeout(() => {
                loading.close()
                clearInterval(interval)
                this.progress = 0
            }, 4100)
            
            
        },
        handleDownload(){

            var ws_name = "SheetJS";
            /* make worksheet */
            var ws_data = [];
            ws_data.push(this.InputKeys)
            var ws = XLSX.utils.aoa_to_sheet(ws_data);

            var wb = XLSX.utils.book_new();

            /* Add the worksheet to the workbook */
            XLSX.utils.book_append_sheet(wb, ws, ws_name);

            XLSX.writeFile(wb, `${this.selectedInputType}_template.xlsx`);
            
        },
        handleClear(){
            this.$router.go();
        },
        initializeInputType() {
            this.InputKeys = Object.keys(this.template)
            this.InputKeys.map(item => {
                let obj = {}    
                obj["label"] = this.template[item].label
                obj["key"] = this.template[item].label
                obj["width"] = "auto"
                this.datacolumn.push(obj)     
            })

            let statusColumn = [
                    {
                        "label": 'status',
                        "key": 'status',
                        "type": 'status',
                        "width": "xxs"
                    },
                    {
                        "label": 'message',
                        "key": 'message',
                        "width": "sm"
                    }
                ]
            this.datacolumn = [...this.datacolumn, ...statusColumn]
            console.log('this.datacolumn',this.datacolumn)
        },
        handleChangeInputType(type, val) {
            // console.log('handleChangeInputType', val)
            
        },
        async beforeUpload(file) {
            await this.validateExcel(file)
        // console.log(bool)
            this.typed = []
            let files =
            file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            let size = file.size / 1024 / 1024 < 5;

            console.log('info file', file)
            console.log('info fileList', this.fileList)
        },
        validateExcel(file){
            this.processFile(file)
        },
        readFileAsync(file) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();

                reader.onload = () => {
                resolve(reader.result);
                };

                reader.onerror = reject;

                reader.readAsArrayBuffer(file);
            })
        },
        async processFile(file) {
            let arrayBuffer = await this.readFileAsync(file);
            let data = new Uint8Array(arrayBuffer);
            let arr = [];
            for(let i = 0; i <= data.length; i++){
                arr[i] = String.fromCharCode(data[i]);
            }
            let bstr = arr.join("");
            let workbook = XLSX.read(bstr, {type: 'binary'});
            let first_sheet_name = workbook.SheetNames[0];
            let worksheet = workbook.Sheets[first_sheet_name];
            let jsonExcel = XLSX.utils.sheet_to_json(worksheet);
            let tempData = jsonExcel

            let dataConnote = []
            this.dataConnote = []

            tempData.map(item => {
                this.tempStatus = true
                this.tempMsg = 'valid'
                dataConnote.push(this.processConnote(item))
            })
            this.dataConnote = dataConnote
            this.dataTable = tempData

             
        },
        rowValidation2(key, value){
            let obj = {
                "status": true,
                "message": 'valid'
            }
            let dataInput = this.template[key] || {}
            let rule = dataInput.rule || null

            if(rule != null) {
                // console.log('rule', rule, value[dataInput.label])
                if(rule.includes("required")) {
                    if(value.hasOwnProperty(dataInput.label) == false) {
                            this.tempStatus = false
                            this.tempMsg = this.tempMsg.replace(/valid/g, " ") + `${this.tempMsg.length > 0 ? ' \n ': ''} -${dataInput.label} required`
                            // obj["status"] = false
                            // obj["message"] = `${obj["message"].replace(/valid/g, " ")} ${dataInput.label} required,`
                    }
                }

                if(rule.includes("number")) {
                    if(value.hasOwnProperty(dataInput.label)) {
                            const REGEX = /^[0-9]*$/
                            let testlah = REGEX.test(value[dataInput.label]);

                            if(testlah == false) {
                                this.tempStatus = false
                                this.tempMsg = this.tempMsg.replace(/valid/g, " ") + `${this.tempMsg.length > 0 ? ' \n ': ''} -${dataInput.label} should be numeric`
                                // obj["status"] = testlah
                                // obj["message"] = `${obj["message"].replace(/valid/g, " ")} ${dataInput.label} should be numeric,`
                            }
                        } 
                }

                if(rule.includes("decimal")){
                    if(value.hasOwnProperty(dataInput.label)) {
                            const REGEX = /^[\d\.?\,]{0,5}([\.?\,]\d{3})?$/
                            let testlah = REGEX.test(value[dataInput.label]);

                            if(testlah == false) {
                                this.tempStatus = false
                                this.tempMsg = this.tempMsg.replace(/valid/g, " ") + `${this.tempMsg.length > 0 ? ' \n ': ''} -${dataInput.label} should be numeric/decimal`
                                // obj["status"] = testlah
                                // obj["message"] = `${obj["message"].replace(/valid/g, " ")} ${dataInput.label} should be numeric/decimal,`
                            }
                        } 
                }

                if(rule.includes("phone")) {
                    if(value.hasOwnProperty(dataInput.label)) {
                            const REGEX = /^[\+]?(\d{7,16})$/
                            let testlah = REGEX.test(value[dataInput.label]);

                            if(testlah == false) {
                                this.tempStatus = false
                                this.tempMsg = this.tempMsg.replace(/valid/g, " ") + `${this.tempMsg.length > 0 ? ' \n ': ''} -${dataInput.label} not valid`
                                // obj["status"] = testlah
                                // obj["message"] = `${obj["message"].replace(/valid/g, " ")} ${dataInput.label} not valid,`
                            }
                        } 
                }
            }

            obj["status"] = this.tempStatus
            obj["message"] = this.tempMsg
            // console.log('last obj', obj)

            return obj
        },
        processConnote(item) {
            let obj = {}
            if(Object.keys(item).length > 0) {
                Object.keys(this.template).map(itemlabel => {
                        
                        let checkValid = this.rowValidation2(itemlabel,item)
                        item["status"] = checkValid.status
                        item["message"] = checkValid.message

                        if(checkValid.status) {
                            if(this.template.hasOwnProperty(itemlabel)) {
                                if(this.template[itemlabel].rule.includes('string')) {
                                    obj[this.template[itemlabel].key] = item[itemlabel].toString()
                                } else {
                                    obj[this.template[itemlabel].key] = item[itemlabel]
                                }
                            }
                            
                        }
                        obj["status"] = checkValid.status
                })
            }


            return obj

        },
        
    },
    mounted() {
        this.initializeInputType()
        // let em = email
        // let req = required
        // console.log('email', em.validate('ekel', 'ooh'), req.validate(''), min.validate('12345', 'min:5'))
    },
}
</script>
<style lang="scss">
    .uploadTitle{
        text-transform: capitalize;
    }
</style>
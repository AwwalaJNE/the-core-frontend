<template>
    <div>
        <div class="box view">
            <div class="nav-box mb-2">
                <vs-row justify="space-between">
                    <template v-if="dataTable.length > 0">
                        <vs-col xs="12" sm="8" lg="8">
                            <p style="text-align: start;"><b>Displayed date format: DD/MM/YYYY</b></p>
                        </vs-col>
                    </template>
                    <vs-col xs="12" sm="4" lg="4">
                        <vs-row justify="end">
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
                                    @click="handleUpload"
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
                                    accept=".xls,.xlsx"
                                    >
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
import axios from "axios";
import master from "@/mixins/master"
import XLSX from "xlsx"
import Breadcrumb from "@/components/breadcrumb/index"
import TableMaster from "@/components/table/tableMaster.vue"
import Selector from "@/components/input/select"
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
            theFile: null,
            typed: [],
            inputType: [],
            selectedInputType: "SLA",
            InputObject: {},
            InputKeys: [],
            datacolumn: [],
            dataTable: [],
            progress: 0,
            keys: [],
            template: {
                "Group Name":{
                    "label":"Group Name",
                    "key":"group_name",
                    "width":"auto",
                    "type": "",
                    "rule": "required|string"
                },
                "Start Date":{
                    "label":"Start Date",
                    "key":"start_date",
                    "width":"auto",
                    "type": "",
                    "rule": "required|date"
                },
                "End Date":{
                    "label":"End Date",
                    "key":"end_date",
                    "width":"auto",
                    "type": "",
                    "rule": "required|date"
                },
                "Origin":{
                    "label":"Origin",
                    "key":"origin",
                    "width":"auto",
                    "type": "",
                    "rule": "required|string"
                },
                "Destination":{
                    "label":"Destination",
                    "key":"destination",
                    "width":"auto",
                    "type": "",
                    "rule": "required|string"
                },

                "Service Name":{
                    "label":"Service Name",
                    "key":"service_name",
                    "width":"auto",
                    "type": "",
                    "rule": "required|string"
                },
                
                "Customer Name":{
                    "label":"Customer Name",
                    "key":"customer_name",
                    "width":"auto",
                    "type": "",
                    "rule": "string"
                },
                "Customer ID":{
                    "label":"Customer ID",
                    "key":"customer_code",
                    "width":"auto",
                    "type": "",
                    "rule": "string"
                },
                "Node Code":{
                    "label":"Node Code",
                    "key":"node_code",
                    "width":"auto",
                    "type": "",
                    "rule": "required|string"
                },

                "Activity Name":{
                    "label":"Activity Name",
                    "key":"activity_name",
                    "width":"auto",
                    "type": "",
                    "rule": "required|string"
                },

                "SLA Koli":{
                    "label":"SLA Koli",
                    "key":"sla_koli",
                    "width":"auto",
                    "type": "",
                    "rule": "number"
                },

                "SLA Node":{
                    "label":"SLA Node",
                    "key":"sla_node",
                    "width":"auto",
                    "type": "",
                    "rule": "number"
                },

                "SLA Activity":{
                    "label":"SLA Activity",
                    "key":"sla_activity",
                    "width":"auto",
                    "type": "",
                    "rule": "required|number"
                },
                "Is Active":{
                    "label":"Is Active",
                    "key":"is_active",
                    "width":"auto",
                    "type": "",
                    "rule": "required|boolean"
                },
            },
            tempStatus: true,
            tempMsg: '',
            dataSLA: []
        }
    },
    computed: {
        listenUpload(){
            return this.selectedInputType.replace(/[&\/\\#,+()$~%._'":*?<>{}]/g, " ")
        }
    },
    methods: {
        async handleUpload() {
            if (!this.validateData()) {
                return
            }

            const loading = this.$vs.loading({
                progress: 0
            })

            const interval = setInterval(() => {
                if (this.progress <= 100) {
                loading.changeProgress(this.progress++)
                }
            }, 40)


            const formData = new FormData();
            formData.append('file', this.theFile);

            await axios
                .post(this.URL.upload_sla + `?n=${this.listenNodeId}`,
                    formData,
                    this.Helper.headerFormData()
                ).then(res => {
                    if(res.status == 201){
                        if (this.progress <= 100) {
                                loading.changeProgress(this.progress++)
                        }
                      this.openNotification('success', 'Success', res.data.message)
                      this.handleClear()
                    }
                }).catch(err => {
                   let message = err.response ? err.response.data.message : 'Upload SLA failed'
                  this.openNotification('danger', 'Fail', message)
                })
            
            setTimeout(() => {
                loading.close()
                clearInterval(interval)
                this.progress = 0
            }, 4100)
        },
        handleDownload(){

            var ws_name = "SLA";
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
            this.theFile = null;
            this.dataSLA = [];
            this.tempStatus = true;
            this.tempMsg = '';
            this.dataTable = [];
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
                        "width": "auto"
                    },
                    {
                        "label": 'message',
                        "key": 'message',
                        "width": "auto"
                    }
                ]
            this.datacolumn = [...this.datacolumn, ...statusColumn]
        },
        async beforeUpload(file) {
            if (!file.type.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") && !file.type.includes("application/vnd.ms-excel")) {
                this.openNotification('danger', 'Invalid File Type', 'Only excel files allowed')
                return false
            }
            await this.validateExcel(file)
            this.typed = []
            file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            let size = file.size / 1024 / 1024 < 5;
        },
        validateExcel(file){
            this.processFile(file)
        },
        validateData() {
            let valid = true
            for (const item of this.dataSLA)  {
                if (!item.status) {
                  this.openNotification('danger', 'Invalid Data Detected', 'Please review your data')
                  valid = false
                  break
                }
            }
            return valid
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
            if (!this.theFile) {
                this.theFile = file
            }
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
            let headerList = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];

            if (!headerList?.includes("Group Name")) {
                this.openNotification('danger', 'Invalid Header', "Please use the template provided")
                return
            }

            if (jsonExcel.length === 0) {
                this.openNotification('danger', 'Empty Worksheet', "Please provide the data")
                return
            }

            let tempData = jsonExcel.map((el) => {
                const REGEX = /^[0-9]*$/
                let startTest = REGEX.test(el['Start Date']);
                let endTest = REGEX.test(el['End Date']);

                if (startTest) {
                    el['Start Date'] = new Date(Math.round((el['Start Date'] - 25569)*86400*1000)).toLocaleDateString('en-GB')
                }
                if (endTest) {
                    el['End Date'] = new Date(Math.round((el['End Date'] - 25569)*86400*1000)).toLocaleDateString('en-GB')                    
                }
                
                el['Start Date'] = el['Start Date'].replaceAll("-", "/")
                el['End Date'] = el['End Date'].replaceAll("-", "/")
                return el
            })


            let dataSLA = []
            this.dataSLA = []

            tempData.map(item => {
                this.tempStatus = true
                this.tempMsg = 'Valid Data'
                dataSLA.push(this.processSLA(item))
            })
            this.dataSLA = dataSLA
            this.dataTable = tempData
        },
        rowValidation(key, value){
            let obj = {
                "status": true,
                "message": 'Valid Data'
            }
            let dataInput = this.template[key] || {}
            let rule = dataInput.rule || null

            if(rule != null) {
                if(rule.includes("required")) {
                    if(value.hasOwnProperty(dataInput.label) == false) {
                            this.tempStatus = false
                            this.tempMsg = this.tempMsg.replace(/Valid Data/g, " ") + `${this.tempMsg.length > 0 ? ' \n ': ''} -${dataInput.label} required`
                    }
                }

                if(rule.includes("number")) {
                    if(value.hasOwnProperty(dataInput.label)) {
                            const REGEX = /^[0-9]*$/
                            let testlah = REGEX.test(value[dataInput.label]);

                            if(testlah == false) {
                                this.tempStatus = false
                                this.tempMsg = this.tempMsg.replace(/Valid Data/g, " ") + `${this.tempMsg.length > 0 ? ' \n ': ''} -${dataInput.label} should be numeric`
                            }
                        } 
                }

                if(rule.includes("date")) {
                    if(value.hasOwnProperty(dataInput.label)) {
                            const REGEX = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
                            let testlah = REGEX.test(value[dataInput.label]);

                            if(testlah == false) {
                                this.tempStatus = false
                                this.tempMsg = this.tempMsg.replace(/Valid Data/g, " ") + `${this.tempMsg.length > 0 ? ' \n ': ''} -${dataInput.label} invalid (Accept: DD/MM/YYYY / DD-MM-YYYY)`
                            }
                        } 
                }
            }

            obj["status"] = this.tempStatus
            obj["message"] = this.tempMsg

            return obj
        },
        processSLA(item) {
            let obj = {}
            if(Object.keys(item).length > 0) {
                Object.keys(this.template).map(itemlabel => {
                        
                        let checkValid = this.rowValidation(itemlabel,item)
                        item["status"] = checkValid.status
                        item["message"] = checkValid.message

                        if(checkValid.status) {
                            if(this.template.hasOwnProperty(itemlabel)) {
                                if(this.template[itemlabel].rule.includes('string')) {
                                    obj[this.template[itemlabel].key] = item[itemlabel] ? item[itemlabel].toString() : ''
                                } else {
                                    obj[this.template[itemlabel].key] = (item[itemlabel] == null) ? 0 : item[itemlabel]
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
    },
}
</script>
<style lang="scss">
    .uploadTitle{
        text-transform: capitalize;
    }
</style>
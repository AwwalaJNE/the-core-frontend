<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2 class="uploadTitle">{{`Upload ${listenUpload}`}}</h2>
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
                            <selector 
                            ref="uploadType"
                            name="Upload type"
                            formKey="selectedInputType"
                            :selectedValue="selectedInputType"
                            :valueData="inputType"
                            :isMultiple="false"
                            @updateValue="handleChangeInputType" />
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
                    hideColumnKey="upload" 
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
    name:"upload",
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
            keys:[]
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

            const data = this.dataTable


            // let filterData = this.dataTable.filter(item => {
            //     return item.status == true
            // })
            const addData = async () => {
                this.dataTable = []
                for(let item of data) {
                    if(item.status == true) {
                        await axios
                        .post(
                            this.URL[this.selectedInputType] +`?n=${this.listenNodeId}`, 
                            JSON.stringify(item),
                            this.Helper.header())
                        .then(res => {

                            item["status"] = true
                            item["message"] = 'success'
                            if (this.progress <= 100) {
                                loading.changeProgress(this.progress++)
                            }
                        }).catch(err => {

                            item["status"] = false
                            item["message"] = err.response.data.message || 'something went wrong'
                            // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to collect role list', err)
                        })
                    }
                    
                }

                this.dataTable = data

            }

            addData()
            
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
            ws_data.push(this.keys)
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
            this.inputType = []
            let obj = this.$store.getters.getInputs
            Object.keys(obj).map(item => {
                let keys = {}
                keys["label"] = item.replace(/[&\/\\#,+()$~%._'":*?<>{}]/g, " ")
                keys["value"] = item 
                this.inputType.push(keys)
            })
        },
        handleChangeInputType(type, val) {

            this.selectedInputType = val
            this.datacolumn = []
            this.InputObject = this.$store.getters.getInputs[val] || {}
            let objkeys = []
            Object.keys(this.InputObject).map(item => {
                if(this.InputObject[item].hasOwnProperty('uploadInput') && this.InputObject[item].uploadInput == false) {

                } else {
                    objkeys.push(item)
                }
            })

            this.keys = objkeys //Object.keys(this.InputObject)
            if (this.keys.length > 0) {
                this.keys.map(item => {
                    let obj = {}
                    
                        obj["label"] = this.InputObject[item].label !== undefined ? this.InputObject[item].label.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, " ") : ''
                        obj["key"] = this.InputObject[item].key
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
            }
        },
        async beforeUpload(file) {
            await this.validateExcel(file)
 
            this.typed = []
            let files =
            file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            let size = file.size / 1024 / 1024 < 5;



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
            this.dataTable = jsonExcel

            this.dataTable.map(item => {
                
                let checkValid = this.rowValidation(item)
                item["status"] = checkValid.status
                item["message"] = checkValid.message

            })

        },
        rowValidation(item) {
            let obj = {
                "status": true,
                "message": 'valid'
            }
            let keys = Object.keys(this.InputObject)
            let rule = ''

            for(let inp of keys) {
                rule = this.InputObject[inp].rule || ''
                switch(true) {
                    case rule.includes("required"):
                        if(item.hasOwnProperty(inp) == false) {
                            obj["status"] = false
                            obj["message"] = `${obj["message"].replace(/valid/g, " ")} ${inp} required,`
                        }
                    case rule.includes("email"):
                        if(item.hasOwnProperty(inp)) {
                            // let emailValidate = email.validate(item["email"])
                            // obj["status"] = emailValidate || false
                            // obj["message"] = emailValidate == false ? `${inp} is not valid` : 'valid' 
                            
 
                        } 
                        // break;
                    case rule.includes("min_value"):
                        
                        // break;
                    default:

                        // code block
                }
            }



            return obj
            
        }
    },
    mounted() {
        this.initializeInputType()
        // let em = email
        // let req = required
 
    },
}
</script>
<style lang="scss">
    .uploadTitle{
        text-transform: capitalize;
    }
</style>
<template>
    <dialog-master 
        :actived="listenActive" 
        :closeDialog="cancel"
        width="md"
    >

        <template v-slot:header>
            Entry Status
        </template>

        <template v-slot:content>
            <vs-row justify="space-between">
                <vs-col xs="12" sm="12" lg="12">
                    <template v-if="loading == false && status_code_arr.length > 0">
                        <selector 
                            name="Status Code" 
                            :rules="''" 
                            formKey="status_code"
                            :valueData="status_code_arr"
                            :selectedValue="irregularity_status_code"
                            :isMultiple="false"
                            @updateValue="updateValue" />
                    </template>
                </vs-col>
                <vs-col xs="12" sm="12" lg="12">
                    <el-upload
                        ref="upload"
                        action="#"
                        list-type="picture-card"
                        :auto-upload="false"
                        :file-list="fileList"
                        @remove="handleRemove"
                        @preview="handlePictureCardPreview"
                        @update:value="updateValue('files', $event)"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>

                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </vs-col>
                <vs-col xs="12" sm="12" lg="12">
                    <input-general
                        name="Remark"
                        :rules="''"
                        formKey="remark"
                        :valueData="remark"
                        typeInput="text"
                        @updateValue="updateValue" 
                    />
                </vs-col>
            </vs-row>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="3">
                    <vs-button
                        transparent
                        block
                        danger
                        flat
                        :active="true"
                        @click="cancel"
                    >
                        Cancel
                    </vs-button>
                </vs-col>
                <vs-col w="3">
                    <vs-button
                        transparent
                        block
                        flat
                        :active="true"
                        type="submit"
                        @click="handleSubmit"
                    >
                       Submit
                    </vs-button>
                </vs-col>
            </vs-row>
                
                
        </template>

    </dialog-master>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import InputGeneral from "@/components/input/general"
import Selector from "@/components/input/select"
import DialogMaster from "@/components/dialog/dialogMaster"
import { Dialog } from 'element-ui';
export default {
    name:"irreguralities-cancel-dialog",
    mixins:[master],
    components: {
        "input-general": InputGeneral,
        "selector": Selector,
        "dialog-master": DialogMaster,
        'el-dialog': Dialog
    },
    props: {
        closeDialog: Function, 
        active: Boolean,
        title: String,
        dataItem: Object
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenDataItem() {
            return this.dataItem || {}
        }
    },
    watch: {
        active: function (val) {
            if (val == true) {
                this.getDataStatus()
                this.initDataItem()
            }
        }
    },
    data() {
        return {
            form: {},
            status_code_arr: [],
            irregularity_id: '',
            irregularity_type: '',
            irregularity_status_code: '',            
            remark: '',
            loading: true,
            inputType: {
                type: 'text',
                label: '',
                key: null,
                value: ''
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            fileList: [],
            isRemoving: false,
            uploadedFile: '',
            files: null
        }
    },
    methods: {
        initDataItem() {
            if(Object.keys(this.listenDataItem).length > 0) {
                this.irregularity_id = this.listenDataItem.irregularity_id || ''
                this.irregularity_type = this.listenDataItem.irregularity_type || ''
                this.irregularity_status_code = this.listenDataItem.irregularity_status_code || ''
                this.remark = this.listenDataItem.remark || ''

                // if(this.listenDataItem.irregularity_status_description.toLowerCase().includes('criscross')) {
                //     this.inputType['label'] = 'Nomer Bag / Connote'
                //     this.inputType['key'] = 'item_number'
                //     this.inputType['value'] = this.listenDataItem.koli_number || ''
                // } else if(this.listenDataItem.irregularity_status_description.toLowerCase().includes('misroute')){
                //     this.inputType['label'] = 'Zip Code'
                //     this.inputType['key'] = 'kode_pos'
                //     this.inputType['value'] = this.listenDataItem.zip_code || ''
                // } else if(this.listenDataItem.irregularity_status_description.toLowerCase().includes('bag rusak')){
                //     this.inputType['label'] = 'Masukan Bag'
                //     this.inputType['key'] = 'bag_number'
                //     this.inputType['value'] = this.listenDataItem.zip_code || ''
                // }

                // Object.keys(this.listenDataItem).forEach(key => {
                //     if (key.startsWith('image_')) {
                //         this.imageUrls[key] = this.listenDataItem[key];
                //     }
                // });
                // const imageKeys = Object.keys(this.listenDataItem).filter(key => key.startsWith('image'));

                // if (imageKeys.length > 0) {
                //     imageKeys.forEach(key => {
                //         console.log(key)
                //         this.imageUrls[key] = this.listenDataItem[key];
                //     });
                // }

                if (this.listenDataItem.attachment && this.listenDataItem.attachment.length > 0) {
                    this.fileList = this.listenDataItem.attachment.map(item => ({
                        name: '',
                        url: item.url.toLowerCase()
                    }));
                } else {
                    this.fileList = []; 
                }

                console.log("IINI", this.fileList)
            }
        },
        updateValue(key, val, info){
            switch(key) {
                case "status_code":
                    let obj = this.status_code_arr.filter(item => item.value == val)[0]

                    if(Object.keys(obj).length > 0) {
                        if(obj.hasOwnProperty('item')) {
                            this.irregularity_type = obj.item.status_subtype || ''
                            this.irregularity_status_code = obj.item.status_code || ''
                        }

                        // if(obj['label'].toLowerCase().includes('criscross')) {
                        //     this.inputType['label'] = 'Nomer Bag / Connote'
                        //     this.inputType['key'] = 'item_number'
                        // } else if(obj['label'].toLowerCase().includes('misroute')){
                        //     this.inputType['label'] = 'Zip Code'
                        //     this.inputType['key'] = 'kode_pos'
                        // } else if(obj['label'].toLowerCase().includes('bag rusak')){
                        //     this.inputType['label'] = 'Masukan Bag'
                        //     this.inputType['key'] = 'bag_number'
                        // }
                    }
                    break;
                case "remark":
                    this.remark= val
                    break;
                case "inputType":
                    this.inputType['value'] = val
                    break;
                default:
            }
        },
        generateRandomString(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters.charAt(randomIndex);
            }
            return result;
        },
        async getDataStatus(){
            this.loading = true
            await axios
                .get(this.URL.status + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            if(item.hasOwnProperty('status_subtype')) {
                                // if(item['status_subtype'].toLowerCase().includes('problem')) {
                                if(item['status_subtype'].toLowerCase() == ('problem')) {
                                    let obj = {}
                                    obj["label"] = item.status_description
                                    obj["value"] = item.status_code
                                    obj["item"] = item

                                    arr.push(obj)
                                }
                            }
                        })

                        if(arr.length == 0) {
                            arr = [{'label': null, 'value': null}]
                        }

                        this.status_code_arr = arr
                        
                    } else {
                        // this.openNotification('warn', 'Roles data is empty!', ' Please create a new role data')
                    }
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async handleSubmit() {
            const uploadComponent = this.$refs.upload;

            if (uploadComponent) {
                const uploadedFiles = uploadComponent.uploadFiles;

                if (uploadedFiles.length > 0) {
                    let form = {
                        irregularity_type: this.irregularity_type,
                        irregularity_status_code: this.irregularity_status_code,
                        remark: this.remark,
                    };
                    uploadedFiles.forEach((file, index) => {
                        if (file.raw && file.raw instanceof Blob) {
                            form[`file_${this.generateRandomString(5)}`] = file.raw;
                        } else {
                            console.error('File is not valid or not in the expected format:', file);
                        }
                    });

                    // form[this.inputType.key] = this.inputType.value;

                    this.$emit("updateValue", 'DIALOG_ENTRY_STATUS', form);
                } else {
                    let form = {
                        irregularity_type: this.irregularity_type,
                        irregularity_status_code: this.irregularity_status_code,
                        remark: this.remark,
                    };

                    this.$emit("updateValue", 'DIALOG_ENTRY_STATUS', form);
                }
            }
        },
        handleClearForm(){
            this.form = {};
            this.irregularity_type = '';
            this.irregularity_status_code = '';
            this.remark = '';
            this.fileList = [];
            
            // this.inputType['key'] = null
            // this.inputType['value'] = ''
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        },
        async handleRemove(file) {
            const index = this.fileList.findIndex(item => item.url === file.url);
            
            if (index !== -1) {
                this.fileList.splice(index, 1);
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    },
}
</script>
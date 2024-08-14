<template>
    <dialog-master 
        :actived="listenActive"
        :loading="listenLoading" 
        :closeDialog="cancel"
        width="md"
    >

        <template v-slot:header>
            Entry Status
        </template>

        <template v-slot:content>
            <vs-row justify="space-between">
                <vs-col xs="12" sm="12" lg="12">
                    <template v-if="loadingStatus == false && status_code_arr.length > 0">
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
                    >
                        <i slot="default" class="el-icon-plus"></i>
                        <template slot="file" slot-scope="{file}">
                            <template v-if="isImage(file)">
                                <img
                                    class="el-upload-list__item-thumbnail"
                                    :src="file.url" 
                                    alt="preview" 
                                >
                                <span class="el-upload-list__item-actions">
                                    <span
                                        v-if="!disabled"
                                        class="el-upload-list__item-preview"
                                        @click="handlePictureCardPreview(file)"
                                    >
                                        <i class="el-icon-zoom-in"></i>
                                    </span>
                                    <span
                                        v-if="!disabled"
                                        class="el-upload-list__item-delete"
                                        @click="handleRemove(file)"
                                    >
                                        <i class="el-icon-delete"></i>
                                    </span>
                                </span>
                            </template>
                            <template v-else-if="isPDF(file)">
                                <div class="file-display">
                                    <i class="el-icon-document large-icon"></i>
                                    <span class="small-text">{{ file.name || file.uid }}</span>
                                </div>
                                <span class="el-upload-list__item-actions">
                                    <span
                                        v-if="!disabled"
                                        class="el-upload-list__item-preview"
                                        @click="handleFilePreview(file)"
                                    >
                                        <i class="el-icon-zoom-in"></i>
                                    </span>
                                    <span
                                        v-if="!disabled"
                                        class="el-upload-list__item-delete"
                                        @click="handleRemove(file)"
                                    >
                                        <i class="el-icon-delete"></i>
                                    </span>
                                </span>
                            </template>
                            <template v-else>
                                <div class="file-display">
                                    <i class="el-icon-document large-icon"></i>
                                    <span class="small-text">{{ file.name || file.uid }}</span>
                                </div>
                                <span class="el-upload-list__item-actions">
                                    <span
                                        v-if="!disabled"
                                        class="el-upload-list__item-preview"
                                    >
                                        <a :href="file.url">
                                            <i class="el-icon-download"></i>
                                        </a>
                                    </span>
                                    <span
                                        v-if="!disabled"
                                        class="el-upload-list__item-delete"
                                        @click="handleRemove(file)"
                                    >
                                        <i class="el-icon-delete"></i>
                                    </span>
                                </span>
                            </template>
                        </template>
                    </el-upload>
                    <el-dialog :visible.sync="dialogImageVisible" title="Image Preview">
                        <img width="100%" :src="dialogImageUrl" alt="PreviewImage">
                    </el-dialog>
                    <el-dialog :visible.sync="dialogFileVisible" width="80%" title="File Preview">
                        <embed :src="dialogFileUrl" type="application/pdf" width="100%" height="500px" />
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
                <vs-row>
                    <vs-col xs="12" sm="12" lg="6">
                        <input-text-area 
                            id="valid_item"
                            label="Valid Bag / Connote"
                            v-model="validItemNumber"
                            :disabled="true"
                        />
                    </vs-col>
                    <vs-col xs="12" sm="12" lg="6">
                        <input-text-area 
                            id="invalid_item"
                            label="Invalid Bag / Connote"
                            v-model="invalidItemNumber"
                            :disabled="true"
                        />
                    </vs-col>
                </vs-row>
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
import InputTextArea from "@/components/input/textArea";
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
        'el-dialog': Dialog,
        "input-text-area": InputTextArea,
    },
    props: {
        closeDialog: Function, 
        active: Boolean,
        title: String,
        dataItem: Object,
        loadingSubmit: Boolean,
        validItem: Array,
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenDataItem() {
            return this.dataItem || {}
        },
        listenLoading(){
            return this.loadingSubmit || this.loadingStatus
        },
        listenValidItem() {
            return this.validItem || []
        },
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
            loadingStatus: false,
            inputType: {
                type: 'text',
                label: '',
                key: null,
                value: ''
            },
            dialogImageUrl: '',
            dialogImageVisible: false,
            dialogFileUrl: '',
            dialogFileVisible: false,
            disabled: false,
            fileList: [],
            validItemNumber: [],
            invalidItemNumber: []
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
                        attachment_id: item.attachment_id,
                        url: item.url
                    }));
                } else {
                    this.fileList = []; 
                }
            }

            if (this.listenValidItem.length > 0) {
                this.validItemNumber = this.listenValidItem
                    .filter(item => item.status === 'SUCCESS')
                    .map(item => item.item_number);
                this.invalidItemNumber = this.listenValidItem
                    .filter(item => item.status !== 'SUCCESS')
                    .map(item => item.item_number);
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
        isImage(file) {
            if (file.name !== "") {
                return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file.name);
            } else {
                return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file.url);
            }  
        },
        isPDF(file) {
            if (file.name !== "") {
                return /\.(pdf)$/i.test(file.name);
            } else {
                return /\.(pdf)$/i.test(file.url);
            }
        },
        async getDataStatus(){
            this.loadingStatus = true
            await axios
                .get(this.URL.status + 
                `?n=${this.listenNodeId}&sort_order=desc&limit=2000&page=1`, 
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        let arr = []
                        res.data.data.map(item => {
                            if(item.hasOwnProperty('status_type')) {
                                // if(item['status_type'].toLowerCase().includes('problem')) {
                                if(item['status_type'].toLowerCase() == ('irregularity')) {
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
                    this.loadingStatus = false
                }).catch(err => {
                    this.loadingStatus = false
                    // this.openNotification('danger', 'Failed to collect role list', err)
                })
        },
        async handleSubmit() {
            const uploadComponent = this.$refs.upload;
            if (this.irregularity_id) {
                if (uploadComponent) {
                    const uploadedFiles = uploadComponent.uploadFiles;

                    if (uploadedFiles.length > 0) {
                        let form = {
                            irregularity_id: this.irregularity_id,
                            irregularity_type: this.irregularity_type,
                            irregularity_status_code: this.irregularity_status_code,
                            remark: this.remark,
                        };
                        uploadedFiles.forEach((file, index) => {
                            if (file.raw && file.raw instanceof Blob) {
                                form[`file_${this.generateRandomString(5)}`] = file.raw;
                            } else if (file?.uid) {
                                form[`file_${file.uid}`] = this.fileList[index].attachment_id;
                            } else {
                                this.openNotification('warn', 'File is not valid', ' Please put in the expected format')
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
            } else {
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
                                this.openNotification('warn', 'File is not valid', ' Please put in the expected format');
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
            const uploadedFiles = this.$refs.upload.uploadFiles;
            const index = uploadedFiles.findIndex(item => item.url === file.url);
            if (index !== -1) {
                uploadedFiles.splice(index, 1);
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogImageVisible = true;
        },
        handleFilePreview(file) {
            this.dialogFileUrl = file.url;
            this.dialogFileVisible = true;
        }
    },
}
</script>
<style scoped>
.file-display {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.large-icon {
    font-size: 80px;
}

.small-text {
    font-size: 10px;
    margin-top: 8px;
}
</style>
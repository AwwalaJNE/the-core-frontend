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
                    <input-general
                        name="InboundNumber"
                        formKey="inbound_number"
                        typeInput="text"
                        :disabled="true"
                        :rules="''"
                        :valueData="inbound_number"
                    />
                </vs-col>
                <vs-col xs="12" sm="12" lg="12">
                    <input-general
                        name="ItemNumber"
                        formKey="item_number"
                        typeInput="text"
                        :disabled="true"
                        :rules="''"
                        :valueData="item_number"
                    />
                </vs-col>
                <vs-col xs="12" sm="12" lg="12">
                    <template v-if="loadingStatus == false && status_arr.length > 0">
                        <selector 
                            name="Status Code" 
                            :rules="''" 
                            formKey="status"
                            :valueData="status_arr"
                            :selectedValue="status"
                            :isMultiple="false"
                            :disabled="disableStatus"
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
                        :on-change="handleFileChange"
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
    name:"Inboun-Dialog-Edit-Receiving-Log",
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
        inboundDetail: Object,
        flag: String
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenReceivingLogId() {
            return this.receivingLogId || {}
        },
        listenLoading(){
            return this.loadingStatus || this.loading
        },
    },
    watch: {
        active: function (val) {
            if (val == true) {
                this.getDataStatus()
                this.setValue()
            }
        }
    },
    data() {
        return {
            status_arr: [{
                label: "NOT FOUND",
                value: "NF1"
            }],

            loading: false,

            inbound_number: '',  
            item_number: '',  
            status: 'NF1', 
            remark: '',

            loadingStatus: false,
            dialogImageUrl: '',
            dialogImageVisible: false,
            dialogFileUrl: '',
            dialogFileVisible: false,
            disabled: false,
            disableStatus: true,

            fileList: [],
            maxFiles: 5
        }
    },
    methods: {
        setValue() {
            this.inbound_number = this.inboundDetail?.inbound_number || ''
            this.item_number = this.inboundDetail?.item_number || ''
        },
        async getDataStatus() {},
        updateValue(key, val, info){},
        async handleSubmit() {
            const uploadComponent = this.$refs.upload;
            if (!uploadComponent) return;

            const uploadedFiles = uploadComponent.uploadFiles;
            const formData = new FormData();            

            formData.append('status', this.status);
            formData.append('remark', this.remark);

            if (uploadedFiles.length > 0) {
                uploadedFiles.forEach((file, index) => {
                    if (file.raw instanceof Blob) {
                        formData.append(`file_${this.generateRandomString(5)}`, file.raw);
                    } 
                    else if (file?.uid) {
                        formData.append(`file_${file.uid}`, this.fileList[index].attachment_id);
                    } 
                    else {
                        this.openNotification('warn', null, 'File is not valid', ' Please put in the expected format');
                    }
                });
            }

            this.handleSubmitData(formData);
        },
        async handleSubmitData(formData) {
            this.loading = true;
            try {
                const res = await axios.post(`${this.URL.receiving_log}?n=${this.listenNodeId}`, formData, this.Helper.header());
                this.openNotification('success', null, "Success", res?.data?.message ||  "Success Update Data");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
                this.cancel();
            }
        },
        handleClearForm(){
            this.inbound_number = '',  
            this.item_number = '',  
            this.status = '', 
            this.remark = '',
            this.fileList = [];
        },
        cancel() {
            this.handleClearForm()
            this.$emit('closeDialog')
        },
        handleFileChange(file, fileList) {
        if (fileList.length > this.maxFiles) {
            this.openNotification('warn', null, 'File limit exceeded', 'You can upload up to 5 files only.');
            this.fileList = fileList.slice(0, this.maxFiles);
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
        },
        
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    }
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
<template>
    <dialog-master 
    :actived="listenActive" 
    :closeDialog="cancel"
    width="md">

        <template v-slot:header>
            Problem Connote
        </template>

        <template v-slot:content>
            <vs-row justify="space-between">
                <vs-col xs="12" sm="12" lg="12">
                    <template v-if="loading == false && status_code_arr.length > 0">
                        <selector 
                            :ref="''"
                            name="Status Code" 
                            :rules="''" 
                            formKey="status_code"
                            :valueData="status_code_arr"
                            :selectedValue="irregularity_status_code"
                            :isMultiple="false"
                            @updateValue="updateValue" />
                    </template>
                </vs-col>
                <template v-if="inputType.key !== null">
                    <vs-col xs="12" sm="12" lg="12">
                        <input-general
                        :name="inputType.label"
                        :rules="''"
                        formKey="inputType"
                        :valueData="inputType.value"
                        typeInput="text"
                        @updateValue="updateValue" />
                        <el-upload
                        ref="upload"
                        action="#"
                        list-type="picture-card"
                        :auto-upload="false"
                        @updateValue="updateValue">
                            <i slot="default" class="el-icon-plus"></i>
                            <div slot="file" slot-scope="{file}">
                            <img
                                class="el-upload-list__item-thumbnail"
                                :src="file.url" alt="" 
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
                                slot="file"
                                    v-if="!disabled"
                                    class="el-upload-list__item-delete"
                                    @click="handleRemove(file)"
                                >
                                <i class="el-icon-delete"></i>
                                </span>
                            </span>
                            </div>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </vs-col>
                </template>
                <vs-col xs="12" sm="12" lg="12">
                    <input-general
                    name="Remark"
                    :rules="''"
                    formKey="remark"
                    :valueData="remark"
                    typeInput="text"
                    @updateValue="updateValue" />
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

                if(this.listenDataItem.irregularity_status_description.toLowerCase().includes('criscross')) {
                    this.inputType['label'] = 'Nomer Bag / Connote'
                    this.inputType['key'] = 'nomor_connotes'
                    this.inputType['value'] = this.listenDataItem.koli_number || ''
                    // console.log('field nomer connote');
                } else if(this.listenDataItem.irregularity_status_description.toLowerCase().includes('misroute')){
                    this.inputType['label'] = 'Zip Code'
                    this.inputType['key'] = 'kode_pos'
                    this.inputType['value'] = this.listenDataItem.zip_code || ''
                    // console.log('field zip code');
                } else if(this.listenDataItem.irregularity_status_description.toLowerCase().includes('bag rusak')){
                    this.inputType['label'] = 'Masukan Bag'
                    this.inputType['key'] = 'bag_number'
                    this.inputType['value'] = this.listenDataItem.zip_code || ''
                    // console.log('field zip code');
                }
            }
        },
        updateValue(key, val, info){
            switch(key) {
                case "status_code":
                    let obj = this.status_code_arr.filter(item => item.value == val)[0]
                    console.log('status_code', val, obj)
                    if(Object.keys(obj).length > 0) {
                        if(obj.hasOwnProperty('item')) {
                            this.irregularity_type = obj.item.status_subtype || ''
                            this.irregularity_status_code = obj.item.status_code || ''
                        }

                        if(obj['label'].toLowerCase().includes('criscross')) {
                            this.inputType['label'] = 'Nomer Bag / Connote'
                            this.inputType['key'] = 'nomor_connotes'
                            console.log('muncul field connote');
                        } else if(obj['label'].toLowerCase().includes('misroute')){
                            this.inputType['label'] = 'Zip Code'
                            this.inputType['key'] = 'kode_pos'
                            console.log('muncul field zip code');
                        } else if(obj['label'].toLowerCase().includes('bag rusak')){
                            this.inputType['label'] = 'Masukan Bag'
                            this.inputType['key'] = 'bag_number'
                            console.log('muncul masukan bag');
                        }
                    }
                    break;
                case "remark":
                    this.remark= val
                    break;
                case "inputType":
                    this.inputType['value'] = val
                    break;
                default:
                    console.log('meong')
                    // code block
            }
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
                                if(item['status_subtype'].toLowerCase().includes('problem')) {
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
        async handleSubmit() {
            const uploadComponent = this.$refs.upload;
            const uploadedFiles = uploadComponent.uploadFiles;
            // console.log(uploadComponent, uploadedFiles, 'upload compts');
            if (uploadedFiles.length > 0) {
                const file = uploadedFiles[0];
                if (file.raw && file.raw instanceof Blob) {
                    // File dalam format Blob (binary)
                    const formData = new FormData();
                    formData.append('image', file.raw, file.name);

                    // console.log(file.raw, 'uploads');
                    let form = {}
                    form['irregularity_type'] = this.irregularity_type
                    form['irregularity_status_code'] = this.irregularity_status_code
                    form['remark'] = this.remark
                    form['image'] = file.raw
                    form[this.inputType['key']] = this.inputType['value']
                    this.$emit("updateValue", 'DIALOG_CANCEL', form)
                    // console.log(form['image'], 'uploads');
                } else {
                    console.error('File tidak valid atau tidak dalam format yang diharapkan');
                }
            } else {
                console.error('Tidak ada file yang diunggah');
            }
        },
        handleClearForm(){
            this.form = {}
            this.irregularity_type = ''
            this.irregularity_status_code = ''
            this.remark= ''
            
            this.inputType['key'] = null
            this.inputType['value'] = ''
        },
        cancel() {
            this.handleClearForm()
            this.closeDialog()
        },
        async handleRemove(file) {
            console.log(this.fileList.length,'length');
            const index = this.fileList.findIndex(item => item.uid === file.uid);
            if (index !== -1) {
                this.fileList[index].isRemoving = true;

                if (this.dialogImageUrl === file.url) {
                this.dialogImageUrl = '';
                this.dialogVisible = false;
                }

                this.fileList.splice(index, 1);
            }
            
            console.log(file, this.fileList.splice(index, 1),'ini removes');
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    },
}
</script>
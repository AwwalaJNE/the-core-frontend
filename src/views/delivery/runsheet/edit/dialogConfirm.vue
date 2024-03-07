<template>
    <dialog-master 
    :actived="listenActive" 
    :closeDialog="cancel"
    width="md">

        <template v-slot:header>
            Peringatan !!
        </template>

        <template v-slot:content>
            <vs-row justify="space-between">
                <vs-col xs="12" sm="12" lg="12" class="mb-2">
                    Nomor bag runsheet yang Anda scan tidak sesuai dengan Kurir yang telah ditentukan
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
                        Batal
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
                       Lanjutkan
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
            }
        }
    },
    data() {
        return {
            loading: true,
        }
    },
    methods: {
        async handleSubmit() {
            this.validation_employee = false;
            this.$emit("updateValue",this.validation_employee );
        },
        cancel() {
            this.closeDialog()
        },
    },
}
</script>
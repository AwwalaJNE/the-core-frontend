<template>
    <dialog-master 
        width="md"
        :actived="listenActive" 
        :closeDialog="closeDialog"
    >
        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <vs-row justify="space-between">
                <vs-col xs="12" sm="12" lg="12" class="my-2">
                    <template v-if="type === 'KOLI'">
                        <p class="recheck-text">
                            Nomor connote yang Anda scan berstatus <b>{{ status }}</b>.
                            <span v-if="status === 'BREACH'">
                                Apakah Anda masih ingin melanjutkan pengiriman?
                            </span>
                            <span v-else>
                                Waktu pengiriman tersisa <b>{{ remaining_time }}</b> menit. 
                                Batas akhir SLA <b>{{ sla_date }}</b>. 
                                Apakah Anda masih ingin melanjutkan pengiriman?
                            </span>
                        </p>
                    </template>
                    <template v-if="type === 'BAG'">
                        <p class="recheck-text">
                            Nomor connote yang Anda scan tidak sesuai dengan area kurir pengiriman. Apakah Anda tetap ingin memasukkannya ke dalam runsheet?
                        </p>
                    </template>
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
                        @click="closeDialog"
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

import DialogMaster from "@/components/dialog/dialogMaster"
import InputGeneral from "@/components/input/general"
import Selector from "@/components/input/select"

export default {
    name:"dialog-recheck-connote-sla",
    mixins:[master],
    components: {
        "input-general": InputGeneral,
        "selector": Selector,
        "dialog-master": DialogMaster,
    },
    props: {
        active: Boolean,
        checkZoneDelivery: Function,
        scanBagPraRunsheet: Function,
        closeDialog: Function, 
        dataItemCheckSla: Object,
        dataItemCheckZone: Object,
        title: String,
        type: String,
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenTitle(){
            return this.title
        }
    },
    data() {
        return {
            status: "",
            sla_date: "",
            remaining_time: 0
        }
    },
    watch: {
        dataItemCheckSla: function (val) {
            if(val !== undefined) {
                this.status = val.status;
                this.sla_date = val.sla_date;
                this.remaining_time = val.remaining_time;
            }
        }
    },
    methods: {
        async handleSubmit() {
            if (this.type == 'KOLI') {
                this.$emit("checkZoneDelivery", this.dataItemCheckZone);
            } else if (this.type == 'BAG') {
                this.$emit("scanBagPraRunsheet", this.dataItemCheckZone);
            }
        },
    },
}
</script>
<style scoped>
.my-2 {
    margin: 0 20px;
}
.recheck-text {
    text-align: start;
}
</style>
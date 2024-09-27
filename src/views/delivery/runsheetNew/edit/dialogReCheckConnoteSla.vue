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
                    <template v-else>
                        <p class="recheck-text">
                            Terdapat connote dari bag yang Anda scan berstatus <b>{{ uniqueStatus.join(' dan ') }}</b>
                            <br>
                            Apakah Anda masih ingin melanjutkan pengiriman untuk connote berikut ?
                        </p>
                        
                        <div class="table-container">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>Koli Number</th>
                                        <th>SLA Date</th>
                                        <th>Remaining Time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr 
                                        v-for="item in filteredListDataItem" 
                                        :key="item.koli_number"
                                    >
                                        <td>{{ item.koli_number }}</td>
                                        <td>{{ item.sla_date }}</td>
                                        <td>{{ item.status === "BREACH" ? 'Late' : item.remaining_time + ' minutes' }} </td>
                                        <td>{{ item.status }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

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
        closeDialog: Function, 
        dataItemCheckSla: [Object, Array],
        scanBagPraRunsheet: Function,
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
            remaining_time: 0,
            listDataItem: [],
            uniqueStatus: [],
            filteredListDataItem: []
        }
    },
    watch: {
        dataItemCheckSla: function (val) {
            if(val !== undefined) {
                if (this.type === "KOLI") {
                    this.status = val.status;
                    this.sla_date = val.sla_date;
                    this.remaining_time = val.remaining_time;
                } else {
                    this.listDataItem = val;
                    this.filteredListDataItem = this.listDataItem.filter(item => item.status !== 'SAFE');
                    this.uniqueStatus = [...new Set(this.filteredListDataItem.map(item => item.status))];
                }
            }
        }
    },
    methods: {
        async handleSubmit() {
            this.$emit("checkZoneDelivery");
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

.table-container {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 2em 0px;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
}

.data-table th, 
.data-table td {
    padding: 10px;
    text-align: left;
}

.data-table th {
    background-color: #f1f1f1;
    font-weight: bold;
}

</style>
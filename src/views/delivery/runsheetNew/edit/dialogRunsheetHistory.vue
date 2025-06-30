<template>
    <dialog-master 
        width="lg"
        :actived="listenActive" 
        :loading="listenLoading"
        :closeDialog="cancel"
    >
        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <table-master 
                hideColumnKey="dialog-runsheet-history"
                :dataTable="dataTable" 
                :dataColumn="datacolumn" 
                :tableLoading="loading"
                :hasAction="false"
                :hasPagination="false"
            />
        </template>
    </dialog-master>
</template>
<script>
import axios from "axios";

import master from "@/mixins/master"

import DialogMaster from "@/components/dialog/dialogMaster"
import TableMaster from "@/components/table/tableMaster.vue";

export default {
    name:"dialog-runsheet-history",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "table-master": TableMaster,
    },
    props: {
        title: String,
        koli_number: String,
        active: Boolean,
        closeDialog: Function
    },
    data() {
        return {
            loading: false,
            dataTable: [],
            datacolumn: [
                {
                  label: "Runsheet Number",
                  key: "delivery_runsheet_number",
                  width: "md",
                },
                {
                    label: "Courier Code",
                    key: "courier_code",
                    width: "xxs"
                },
                {
                    label: "Courier Name",
                    key: "courier_name",
                    width: "xxs"
                },
                {
                    label: "POD Date",
                    key: "pod_at",
                    width: "sm"
                },
                {
                    label: "Elapsed Time",
                    key: "elapsed_time",
                    width: "md"
                },
                {
                    label: "POD",
                    key: "status",
                    width: "xxxxs"
                },
            ]
        }
    },
    computed: {
        listenActive(){
            if(this.active){
                this.refresh();
            }
            return this.active
        },
        listenTitle(){
            return this.title
        },
        listenKoliNumber(){
            return this.koli_number
        },
        listenLoading(){
            return this.loading
        },
    },
    methods: {
        refresh(){
            this.getTableData();
        },
        async getTableData() {
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.delivery}/history/${this.listenKoliNumber}?n=${this.listenNodeId}`, this.Helper.header());

                let arr = res.data.data;
                arr.map(item => {
                    item['elapsed_time'] = this.formatElapsedTime(item.elapsed_time_minutes)
                });

                this.dataTable = arr;
            } catch (err) {
                this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate activity list', err)
            } finally {
                this.loading = false;
            }
        },
        cancel() {
            this.closeDialog()
        },
    },
}
</script>
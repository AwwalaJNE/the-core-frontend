<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="2" lg="2">
                <div class="titlePage my-1">
                    <breadcrumb />
                    <vs-input class="mt-05" 
                        v-model="koli_number" 
                        placeholder="Masukkan Kode Koli"
                        v-on:keyup.enter="updateValue"
                        autofocus
                    />
                    <!-- <h2>New Transactions</h2> -->
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3">
            </vs-col>
        </vs-row>

        <div class="box">
            <table-master 
            :dataTable="dataTable" 
            :dataColumn="datacolumn" 
            :tableLoading="loading"
            :pageSize="pagination.page_size"
            :page="pagination.page"
            :limit="pagination.limit"
            :hasAction="false"
            :hasPagination="false"
            :customBtn="true"
            customBtn_label="UPDATE"
            @actionUpdate="actionUpdate"
            />
        </div>
        

        <!--Create User Dialog end-->
        <dialog-create-edit-packingkayu 
            :active="dialogPackingKayu" 
            :closeDialog="closeDialogPackingKayu"
            @refresh="refresh"
            title="Edit Koli"
            :dataItem="dataItem"
            btnBlue="Edit"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import Breadcrumb from "@/components/breadcrumb/index"
import DialogCreateEditPackingKayu from "@/views/transport/transportPackingKayu/dialogCreateEditPackingKayu"

export default {
    name:"transport-packing-kayu",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        "breadcrumb": Breadcrumb,
        "dialog-create-edit-packingkayu":DialogCreateEditPackingKayu
    },
    data() {
        return {
            dialogPackingKayu:false,
            dataTable: [],
            datacolumn: [
                {
                    label: "Connote Number",
                    key: "koli_number",
                    width: "xs"
                },
                {
                    label: "Kg Before",
                    key: "koli_actual_weight",
                    width: "auto"
                },
                {
                    label: "Kg After",
                    key: "koli_packing_kayu_weight",
                    width: "auto"
                },
                {
                    label: "Height",
                    key: "koli_height",
                    width: "auto"
                },
                {
                    label: "Width",
                    key: "koli_width",
                    width: "auto"
                },
                {
                    label: "Lenght",
                    key: "koli_length",
                    width: "auto"
                },
                {
                    label: "PK Type",
                    key: "packing_kayu_type",
                    width: "auto"
                },
                {
                    label: "Agent/KP/Cust",
                    key: "node_name",
                    width: "auto"
                },
            ],
            loading: false,
            dataItem: {},
            tempSearch: "",
            dialogGeolocation: false,
            pagination: {
                limit:5,
                page_size: 1,
                page: 1
            },
            koli_number: '',
            form:{}
        }
    },
    methods: {
        closeDialogPackingKayu() {
            this.dialogPackingKayu = false
        },
        
        async getPackingKayu() {
            this.loading = true
            await axios
                .post(this.URL.packing_kayu +
                `?n=${this.listenNodeId}`,
                JSON.stringify(this.form),
                this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    if (Object.keys(arr).length > 0) {
                        this.dataTable = [arr];
                    }
                    
                    this.loading = false
                    this.koli_number='';
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate Packingkayu list', err)
                })
        },
        updateValue(){
            this.form.koli_number = this.koli_number;
            this.getPackingKayu();

        },
        actionUpdate(val){
            if(this.dataTable.length > 0) {
                let obj = this.dataTable.filter(item => {
                    return item.koli_actual_before = val.koli_actual_weight
                })
                this.dataItem = obj[0]
                this.$nextTick(() => {
                    this.dialogPackingKayu = true
                });
            }
        },
        async refresh(){
            await this.getPackingKayu()
            // this.dataTable = [];
        },
        actionRemove(){

        },
        actionLimit(){

        },
        actionPagination(){

        },
    },
    mounted() {
        
    }
}
</script>
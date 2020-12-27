<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="2" lg="2">
                <div class="titlePage my-1">
                    <breadcrumb />
                    <vs-input class="mt-05" v-model="value" placeholder="Masukkan Kode Koli" />
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
            @actionUpdate="actionUpdate"
            />
        </div>
        

        <!--Create User Dialog end-->
            <!-- <dialog-create-edit-role 
            :active="dialogRole" 
            :closeDialogRole="closeDialogRole"
            :refresh="refresh"
            title="Edit role"
            :dataItem="dataItem"
            /> -->
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import Breadcrumb from "@/components/breadcrumb/index"
export default {
    name:"transport-packing-kayu",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        "breadcrumb": Breadcrumb,
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "Connote / Koli Number",
                    key: "connote_number",
                    width: "xs"
                },
                {
                    label: "Kg Before",
                    key: "base_tariff_origin",
                    width: "auto"
                },
                {
                    label: "Kg After",
                    key: "base_tariff_destination",
                    width: "auto"
                },
                {
                    label: "Height",
                    key: "base_tariff_service",
                    width: "auto"
                },
                {
                    label: "Width",
                    key: "base_tariff_tariff",
                    width: "auto"
                },
                {
                    label: "Lenght",
                    key: "base_tariff_tariff",
                    width: "auto"
                },
                {
                    label: "PK Type",
                    key: "base_tariff_tariff",
                    width: "auto"
                },
                {
                    label: "Agent/KP/Cust",
                    key: "base_tariff_tariff",
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
            value: ''
        }
    },
    methods: {
        actionUpdate(){

        },
        actionRemove(){

        },
        actionLimit(){

        },
        actionPagination(){

        },
    },
}
</script>
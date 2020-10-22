<template>
    <div>
        <table-master 
        :dataTable="dataTable" 
        :dataColumn="datacolumn" 
        :tableLoading="loading"
        :pageSize="pagination.page_size"
        :page="pagination.page"
        :limit="pagination.limit"
        :hasAction="true"
        :hasPagination="true"
        @actionUpdate="actionUpdate"
        @actionRemove="actionRemove"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        />

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
export default {
    name:"base-tariff-list",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        // "dialog-create-edit-role": DialogCreateEditRole
    },
    data() {
        return {
            dataTable: [],
            datacolumn: [
                {
                    label: "ID",
                    key: "base_tariff_id",
                    width: "xs"
                },
                {
                    label: "Origin",
                    key: "base_tariff_origin",
                    width: "auto"
                },
                {
                    label: "Destination",
                    key: "base_tariff_destination",
                    width: "auto"
                },
                {
                    label: "Service",
                    key: "base_tariff_service",
                    width: "auto"
                },
                {
                    label: "Tariff",
                    key: "base_tariff_tariff",
                    width: "auto"
                },
                {
                    label: "Min Weight",
                    key: "base_tariff_min_weight",
                    width: "auto"
                },
                {
                    label: "Max Weight",
                    key: "base_tariff_max_weight",
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
            }
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
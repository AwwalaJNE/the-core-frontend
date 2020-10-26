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
    name:"vehicle-list",
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
                    label: "Type",
                    key: "base_tariff_id",
                    width: "xs"
                },
                {
                    label: "Owned By",
                    key: "base_tariff_origin",
                    width: "auto"
                },
                {
                    label: "Name",
                    key: "base_tariff_destination",
                    width: "auto"
                },
                {
                    label: "Registration No.",
                    key: "base_tariff_service",
                    width: "auto"
                },
                {
                    label: "Max Weight",
                    key: "base_tariff_tariff",
                    width: "auto"
                },
                {
                    label: "Max Volume",
                    key: "base_tariff_min_weight",
                    width: "auto"
                },
                {
                    label: "Expire Date",
                    key: "base_tariff_max_weight",
                    width: "auto"
                },
                {
                    label: "Current Location",
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
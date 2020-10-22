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
    name:"zipcode-list",
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
                    label: "Zip Code",
                    key: "zipcode_id",
                    width: "xs"
                },
                {
                    label: "Subdistrict",
                    key: "zipcode_subdistrict",
                    width: "auto"
                },
                {
                    label: "District",
                    key: "zipcode_district",
                    width: "auto"
                },
                {
                    label: "City",
                    key: "zipcode_city",
                    width: "auto"
                },
                {
                    label: "Province",
                    key: "zipcode_province",
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
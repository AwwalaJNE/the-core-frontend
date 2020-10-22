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
    name:"geolocation-list",
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
                    key: "user_role_id",
                    width: "xs"
                },
                {
                    label: "Geolocation",
                    key: "user_role_name1",
                    width: "auto"
                },
                {
                    label: "Province",
                    key: "user_role_name2",
                    width: "auto"
                },
                {
                    label: "City",
                    key: "user_role_name3",
                    width: "auto"
                },
                {
                    label: "District",
                    key: "user_role_name4",
                    width: "auto"
                },
                {
                    label: "SubDistrict",
                    key: "user_role_name5",
                    width: "auto"
                },
                {
                    label: "Zip Code",
                    key: "user_role_name6",
                    width: "auto"
                },
                {
                    label: "Tariff Code",
                    key: "user_role_name7",
                    width: "auto"
                },
                {
                    label: "Timezone",
                    key: "user_role_name8",
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
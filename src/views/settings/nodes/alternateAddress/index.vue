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
    name:"alternate-address-list",
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
                    label: "Node Name",
                    key: "alternate_address_name",
                    width: "xs"
                },
                {
                    label: "Name",
                    key: "alternate_address_label",
                    width: "auto"
                },
                {
                    label: "Phone",
                    key: "alternate_address_phone",
                    width: "auto"
                },
                {
                    label: "Address",
                    key: "alternate_address_address",
                    width: "auto"
                },
                {
                    label: "Detail",
                    key: "alternate_address_detail",
                    width: "auto"
                },
                {
                    label: "Zip Code",
                    key: "alternate_address_zip_code",
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
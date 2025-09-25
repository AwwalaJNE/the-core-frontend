<template>
    <dialog-master
        width="xl"
        :actived="listenActive"
        :loading="loading"
        :closeDialog="cancel"
        class="trace-bag-dialog"
    >
        <template v-slot:header>
            <div class="button-helper">
                <div class="title-helper">
                    {{ listenTitle }}
                </div>
            </div>
        </template>

        <template v-slot:content>
            <vs-row>
                <vs-col>
                    <table-master 
                        hideColumnKey="trace-bag-activity"
                        :dataTable="dataTable" 
                        :dataColumn="datacolumn" 
                        :tableLoading="loading"
                        :pageSize="pagination.page_size"
                        :page="pagination.page"
                        :limit="pagination.limit"
                        :hasAction="false"
                        :hasLinked="['bag_number']"
                        :hasPagination="true"
                        @actionLimit="actionLimit"
                        @actionPagination="actionPagination"
                    />
                </vs-col>
            </vs-row>
        </template>
    </dialog-master>
</template>

<script>
import axios from "axios";
import master from "@/mixins/master";
import DialogMaster from "@/components/dialog/dialogMaster";
import TableMaster from "@/components/table/tableMaster.vue";

export default {
    name: "dialog-trace-bag",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "table-master": TableMaster
    },
    props: {
        active: Boolean,
        closeDialog: Function,
        title: String,
        bag_number: String
    },
    data() {
        return {
            loading: false,
            dataTable: [],
            datacolumn: [{
                    label: "Date/Time",
                    key: "created_at",
                    width: "sm"
                },
                {
                  label: "Bag Number",
                  key: "bag_number",
                  width: "xs",
                },
                {
                    label: "PIC",
                    key: "user_login",
                    width: "xs"
                },
                {
                    label: "Node",
                    key: "node_name",
                    width: "md"
                },
                {
                    label: "Activity",
                    key: "activity_name",
                    width: "xs"
                },
                {
                    label: "Value",
                    key: "value",
                    width: "xs"
                },
                {
                    label: "Description",
                    key: "description",
                    width: "auto"
                },
                
            ],
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            }
        };
    },
    computed: {
        listenActive() {
            return this.active;
        },
        listenTitle() {
            return this.title;
        }
    },
    watch: {
        active: function(val) {
            if (val === true) {
                this.getBagActivity();
            }
        }
    },
    methods: {
        async getBagActivity() {
            this.loading = true;
            try {
                const limit = this.pagination.limit;
                const page = this.pagination.page;
                const response = await axios.get(`${this.URL.bag}/${this.bag_number}/history?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}`, this.Helper.header());

                let arr = response.data.data;
                arr.map(item => {
                    item["created_at"] = this.formatTimezone(item?.created_at);
                });
                this.dataTable = response.data.data;
            } catch (error) {
                this.openNotification(
                    "danger",
                    error.response?.data?.code || "",
                    "Failed to load bag activity data",
                    error
                );
            } finally {
                this.loading = false;
            }
        },
        actionLimit(val) {
            this.pagination.limit = val;
            this.pagination.page = 1;
            this.getBagActivity();
        },
        actionPagination(val) {
            this.pagination.page = val;
            this.getBagActivity();
        },
        cancel() {
            this.closeDialog();
        }
    }
};
</script>

<style scoped>
.title-helper {
    width: 100%;
}

.button-helper {
    display: flex; 
    justify-content: flex-end;
}

button {
    width: 6em;
}

.trace-bag-dialog .vs-dialog-content {
    width: 95vw !important;
    max-width: 95vw !important;
}

.trace-bag-dialog .vs-dialog {
    width: 95vw !important;
    max-width: 95vw !important;
}

.trace-bag-dialog table {
    width: 100%;
    min-width: 1200px;
}
</style> 
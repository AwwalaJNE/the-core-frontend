<template>
    <div>
        <vs-row>
            <vs-col xs="12" sm="6" lg="6">
                <select-search-by 
                    :border="true" 
                    :isMultiple="false" 
                    :selectedValue="searchBy" 
                    :valueData="searchParams" 
                    @updateSearchBy="updateSearchBy" 
                />
            </vs-col>
            <vs-col xs="12" sm="6" lg="6">
                <search-input 
                    ref="searchInput" 
                    :placeholder="searchPlaceholder" 
                    :isNumeric="searchByDataType"
                    @searchValue="searchValue" 
                />
            </vs-col>
        </vs-row>
        <div class="roles-container">
            <div v-for="(item, index) in dataTable" :key="index">
                <div class="app-header">
                    {{ item.app }}
                </div>
                <div class="roles">
                    <div
                        v-for="(role) in item.role"
                        :key="role.app_role_id"
                        class="role"
                        :class="{ selected: selectedRoleId === role.app_role_id }"
                        @click="selectRole(role, item.app)"
                    >
                        {{ role.app_role_name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import axios from "axios";
import master from "@/mixins/master";
import moment from "moment";

import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";

export default {
    name:"role-list",
    mixins: [master],
    props: {
        getRoleInfo: Function
    },
    components: {
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy
    },
    data() {
        return {
            refLoading: null,
            dataTable: [],
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1
            },
            tempSearch: '',
            searchPlaceholder: "Search All Application",
            searchBy: "ALL_APPLICATION",
            searchByDataType: false,
            searchParams: [
                {
                    label: "All Application",
                    value: "ALL_APPLICATION"
                },
                {
                    label: "Dashboard Ticketing",
                    value: "DASHBOARD_TICKETING"
                },
                {
                    label: "Core",
                    value: "CORE"
                }
            ],
            searchQuery: "",
            selectedRoleId: null,
        }
    },
    methods: {
        toggleLoading(show) {
            if (show) {
                if (!this.refLoading && this.$el) {
                    this.refLoading = this.$vs.loading({
                        target: this.$el,
                        type: "scale",
                        text: "Loading...",
                        background: "#EAEAEA",
                    });
                }
            } else if (this.refLoading) {
                this.refLoading.close();
                this.refLoading = null;
            }
        },
        refresh(){
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.searchBy)
        },
        async getTableData(limit, page, q, searchBy) {
            this.toggleLoading(true);

            let query = q || '';
            
            try {
                const res = await axios.get(`${this.URL.application_role_list}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&search_by=${searchBy}`, this.Helper.header());

                if(res.data.data.length > 0) {
                    this.dataTable = res.data.data;
                    this.pagination = {
                        page: res.data.meta.current_page,
                        limit: parseInt(res.data.meta.per_page, 10),
                        page_size: res.data.meta.last_page,
                    };
                } else {
                    this.dataTable = [];
                }
            } catch (err) {
                this.redirectError(err)
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.toggleLoading(false);
            }
        },
        selectRole(role, app) {
            this.selectedRoleId = role.app_role_id;
            this.$emit('getRoleInfo', role.app_role_id, app)
        },
        searchValue (val) {
            this.tempSearch = val
            this.refresh();
        },
        updateSearchBy(key, val, dataType) {
            this.searchBy = val;
            this.searchPlaceholder = key;
            this.searchByDataType = dataType;
        },
    },
    mounted() {
        this.refresh()
    },
}
</script>
<style lang="scss" scoped>
.roles-container {
    max-height: 600px;
    overflow-y: auto;
    text-align: left;

    /* Hide scrollbar for Chrome, Safari, and Edge */
    &::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for Firefox */
    scrollbar-width: none;

    .app-header {
        position: sticky;
        top: 0;
        background-color: white;
        padding: 20px;
        font-weight: bolder;
        border-bottom: 1px solid #ddd;
    }

    .roles {
        .role {
            padding: 20px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
            transition: background 0.3s ease-in-out;

            &:hover {
                background: #f1f1f1;
            }
        }

        .selected {
            background: #f1f1f1;
        }
    }
}

</style>

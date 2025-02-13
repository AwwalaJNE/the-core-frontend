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
                        @click="selectRole(role)"
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
        getAppRoleId: Function
    },
    components: {
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy
    },
    data() {
        return {
            loading: false,
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
        refresh(){
            this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch, this.searchBy)
        },
        async getTableData(limit, page, q, searchBy) {
            this.loading = true

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
                // TODO: REMOVE BELOW LATER
                this.dataTable = [
                    {
                        "app": "DASHBOARD_TICKETING",
                        "role": [
                            {
                                "app_role_id": "a48111b9-f747-4a96-b930-c0ba61264acb",
                                "app_role_name": "SALES COUNTER OFFICER",
                                "app_role_code": "SCO"
                            },
                            {
                                "app_role_id": "a48111b9-f747-4a96-b930-c0ba61264acd",
                                "app_role_name": "CUSTOMER SERVICE",
                                "app_role_code": "CS"
                            }
                        ]
                    },
                    {
                        "app": "TICKETING",
                        "role": [
                            {
                                "app_role_id": "a48111b9-f747-4a96-b930-c0ba61264acc",
                                "app_role_name": "CUSTOMER SERVICE",
                                "app_role_code": "CS"
                            }
                        ]
                    }
                ]
                // TODO: UNCOMMENT BELOW LATER
                // this.redirectError(err)
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        selectRole(role) {
            this.selectedRoleId = role.app_role_id;
            this.$emit('getAppRoleId', role.app_role_id)
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
    padding: 20px 0;
    max-height: 600px;
    overflow-y: auto;
    text-align: left;

    .app-header {
        position: sticky;
        top: 0;
        background-color: white;
        z-index: 1000;
        padding: 10px;
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

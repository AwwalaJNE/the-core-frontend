<!--
    - @desc component table yg reusable
    - @param -
    - @emit {
        - getTableData | trigger get data lagi setelah melakukan filter atau searching | payload = query searching/filter
        - handleEdit | trigger put action  | payload = data
        - handleDelete | trigger delete action  | payload = data
        - actionLimit | trigger get data lagi setelah mengubah limit pada pagination
        - actionPagination | trigger get data lagi setelah ganti page pada pagination
    }
    - @props {
        - width: String | 'md','sm','xs','xxs','auto'
        - dataTable: Array,
        - dataColumn: Array,
        - tableLoading: Boolean,
        - pageSize: [Number, String],
        - page: [Number, String],
    }
-->
<template>
    <div>
        <vs-table ref="tablee">
            <template #thead>
                <vs-tr>
                    <template v-if="listenColumn.length > 0">
                        <vs-th v-for="(item, key) of listenColumn" :key="key" :class="item.width ? item.width : ''">
                            {{ item.label }}
                        </vs-th>
                        <template v-if="hasAction == true">
                            <vs-th class="sm action">
                                Action
                            </vs-th>
                        </template>
                    </template>
                </vs-tr>
            </template>
            <template #tbody>
                <template v-if="listenDataTable.length > 0">
                    <vs-tr
                        :key="key"
                        v-for="(item, key) in listenDataTable"
                        :data="item"
                    >
                        <template v-for="(column, key) of listenColumn">
                            <vs-td :key="key" :class="column.width ? column.width : ''">
                                {{ item[column.key] ? item[column.key] : '' }}
                            </vs-td>
                        </template>
                        <template v-if="hasAction == true">
                            <vs-td class="sm">
                                <vs-row justify="center">
                                    <vs-col w="4">
                                        <vs-button
                                            block
                                            flat
                                            :active="true"
                                            @click="actionUpdate(item.user_role_id)"
                                        >
                                            Edit
                                        </vs-button>
                                    </vs-col>
                                    <vs-col w="4">
                                        <vs-button
                                            block
                                            flat
                                            :active="true"
                                            type="submit"
                                            @click="actionRemove(item.user_role_id)"
                                        >
                                            Remove
                                        </vs-button>
                                    </vs-col>
                                </vs-row>
                            </vs-td>
                        </template>
                    </vs-tr>
                </template>
            </template>
        </vs-table>
    
        <vs-row class="mt-2" justify="flex-end">
            <vs-col w="8">
                <pagination 
                :page ="pagination.current_page" 
                :limit="pagination.limit" 
                :pageSize="pagination.page_size"
                @actionLimit="actionLimit"
                @actionPagination="actionPagination"/>
            </vs-col>
        </vs-row>
    </div>
</template>
<script>
import Pagination from "@/components/pagination/pagination.vue"
export default {
    name:"tabelMaster",
    components: {
        "pagination" : Pagination
    },
    props: {
        dataTable: Array,
        dataColumn: Array,
        tableLoading: Boolean,
        pageSize: Number,
        page: Number,
        limit: Number,
        hasAction: Boolean
    },
    data() {
        return {
            tableHeader: [],
            tableBody: [],
            pagination: {
                limit: 5,
                page_size: 1,
                current_page: 1
            },
            loading: false,
            refloading: null
        }
    },
    computed: {
        listenColumn() {
            return this.dataColumn
        },
        listenDataTable() {
            return this.dataTable
        },
        listenTableLoading() {
            return this.tableLoading
        }
    },
    watch: {
        tableLoading: function(val) {
            if(val !== undefined){
                this.loading = val
                if(val == true) {
                    this.loadingHandler()
                } else {
                    this.closeLoading()
                }
                
            }
        },
        pageSize: function(val) {
            if(val !== undefined) {
                this.pagination.page_size = val
            }
        },
        page: function(val) {
            if(val !== undefined) {
                this.pagination.current_page = val
            }
        },
        limit: function(val) {
            if(val !== undefined) {
                this.pagination.limits = val
            }
        }
    },
    methods: {
        loadingHandler(){
            this.refloading = this.$vs.loading({
                target: this.$refs.tablee,
                color: '#333'
            })
        },
        closeLoading(){
            this.refloading !== null ? this.refloading.close() : ''
        },
        handleColumnsOrder(){
            this.tableHeader = this.dataColumn ? this.dataColumn : []
        },
        actionLimit(val){
            this.$emit("actionLimit", val)
        },
        actionPagination(val) {
            this.$emit("actionPagination", val)
        },
        actionUpdate(val) {
            this.$emit("actionUpdate", val)
        },
        actionRemove(val) {
            this.$emit("actionRemove", val)
        }
    },
    mounted() {
        this.handleColumnsOrder()
    },
}
</script>
<style lang="scss">
    .vs-table{
        table{
            text-align: left;
            .md{
                width: calc(100% / 3);
            }
            .sm{
                width: calc(100% / 4);
            }
            .xs{
                width: calc(100% / 7);
            }
            .xxs{
                width: calc(100% / 10);
            }
            .auto{
                width: auto;
            }
            .action{
                .vs-table__th__content{
                    text-align: center;
                    justify-content: center;
                }
            }
        }
    }
</style>
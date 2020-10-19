<!--
    - @desc component table yg reusable
    - @param -
    - @emit {
        - getTableData | trigger get data lagi setelah melakukan filter atau searching | payload = query searching/filter
        - handleEdit | trigger put action  | payload = data
        - handleDelete | trigger delete action  | payload = data
    }
    - @props -
-->
<template>
    <div>
        <vs-table ref="tablee">
            <template #thead>
                <vs-tr>
                    <template v-if="listenColumn.length > 0">
                        <vs-th v-for="(item, key) of listenColumn" :key="key">
                            {{ item.label }}
                        </vs-th>
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
                            <vs-td :key="key">
                                {{ item[column.key] ? item[column.key] : '' }}
                            </vs-td>
                        </template>
                    </vs-tr>
                </template>
            </template>
        </vs-table>
    
        <vs-row justify="flex-end">
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
        pageSize: [Number, String],
        page: [Number, String],
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
        }
    },
    mounted() {
        this.handleColumnsOrder()
    },
}
</script>
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
                            <vs-th class="action">
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
                            <template v-if="column.type !== undefined && column.type.toLowerCase() === 'text'">
                                <vs-td :key="key" :class="column.width ? column.width : ''">
                                    <template v-if="split(column.key).length == 2 && item.hasOwnProperty(split(column.key)[0])">
                                        {{ item.hasOwnProperty(split(column.key)[0]) ? item[split(column.key)[0]][split(column.key)[1]] : '' }}
                                    </template>
                                    <template v-else>
                                        {{ item[column.key] ? item[column.key] : '' }}
                                    </template>
                                </vs-td>
                            </template>
                            <template v-else-if="column.type !== undefined && column.type.toLowerCase() === 'boolean'">
                                <vs-td :key="key" :class="column.width ? column.width : ''">
                                    <checkbox :isChecked="item['selected']"/>
                                </vs-td>
                            </template>
                            <template v-else-if="column.type !== undefined && column.type.toLowerCase() === 'status'">
                                <vs-td :key="key" :class="column.width ? column.width : ''">
                                    <template v-if="item[column.key] !== undefined">
                                        <vs-button
                                            circle
                                            icon
                                            border
                                            disabled
                                            :danger="item[column.key] == false ? true : false"
                                            :active="false"
                                        >
                                            <i :class="`bx bx-${item[column.key] == false ? 'x' : 'check'}`"></i>
                                        </vs-button>
                                    </template>
                                </vs-td>
                            </template>
                            <template v-else>
                                <vs-td :key="key" :class="column.width ? column.width : ''">
                                    <template v-if="split(column.key).length == 2 && item.hasOwnProperty(split(column.key)[0])">
                                        {{ item.hasOwnProperty(split(column.key)[0]) ? item[split(column.key)[0]][split(column.key)[1]] : '' }}
                                    </template>
                                    <template v-else>
                                        {{ item[column.key] ? item[column.key] : '' }}
                                    </template>
                                </vs-td>
                            </template>
                        </template>
                        <template v-if="hasAction == true">
                            <vs-td class="action">
                                <vs-row justify="center" class="btn_action">
                                    <vs-col w="4">
                                        <vs-button
                                            block
                                            flat
                                            :active="true"
                                            @click="actionUpdate(item)"
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
                                            @click="actionRemove(item)"
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
    
        <template v-if="hasPagination == true">
            <vs-row class="mt-2" justify="flex-end">
                <vs-col w="8">
                    <pagination-master
                    :page ="pagination.page" 
                    :limit="pagination.limit" 
                    :pageSize="pagination.page_size"
                    @actionLimit="actionLimit"
                    @actionPagination="actionPagination"/>
                </vs-col>
            </vs-row>
        </template>
        
    </div>
</template>
<script>
import Pagination from "@/components/pagination/pagination.vue"
import Checkbox from "@/components/input/checkbox.vue"
export default {
    name:"tabelMaster",
    components: {
        "pagination-master" : Pagination,
        "checkbox" : Checkbox
    },
    props: {
        dataTable: Array,
        dataColumn: Array,
        tableLoading: Boolean,
        pageSize: Number,
        page: Number,
        limit: Number,
        hasAction: Boolean,
        hasPagination: Boolean
    },
    data() {
        return {
            tableHeader: [],
            tableBody: this.dataTable ? this.dataTable : [],
            pagination: {
                limit: 5,
                page_size: 1,
                page: 1
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
            console.log('computed master table data', this.dataTable)
            console.log("-----------------")
            return this.dataTable
        },
        listenTableLoading() {
            return this.tableLoading
        },
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
                this.pagination.page = val
            }
        },
        limit: function(val) {
            if(val !== undefined) {
                this.pagination.limits = val
            }
        }
    },
    methods: {
        split(arr){
            return arr.split(".")
        },
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
                &.vs-table__th{
                    position: relative;
                    width: 280px !important;
                    min-width: 280px;
                    max-width: 300px;
                    .vs-table__th__content{
                        float: right;
                        width: 280px;
                        position: relative;
                        // max-width: 280px !important;
                    }
                }
                &.vs-table__td{
                    position: relative;
                    display: flex;
                    justify-content: flex-end;
                    .btn_action{
                        max-width: 280px;
                        position: relative;
                        justify-content: flex-end;
                    }
                }
                .vs-table__th__content{
                    text-align: center;
                    justify-content: center;
                }
            }
            .checkbox-inp .vs-icon-check span {
                width: 8px;
                margin-left: 0px;
            }
        }
    }
</style>
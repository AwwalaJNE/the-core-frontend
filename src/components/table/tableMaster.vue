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
    <vs-table>
        <template #thead>
        <vs-tr>
            <template v-if="listenColumn.length > 0" v-for="(item, key) of listenColumn">
                <vs-th :key="key">
                    {{ item.label }}
                </vs-th>
            </template>
        </vs-tr>
        </template>
        <template #tbody>
        <vs-tr
            v-if="listenDataTable.length > 0"
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
    </vs-table>
</template>
<script>
export default {
    name:"tabelMaster",
    props: {
        dataTable: Array,
        dataColumn: Array,
        tableLoading: Boolean
    },
    data() {
        return {
            tableHeader: [],
            tableBody: [],
        }
    },
    computed: {
        listenColumn() {
            return this.dataColumn
        },
        listenDataTable() {
            return this.dataTable
        }
    },
    methods: {
        handleColumnsOrder(){
            this.tableHeader = this.dataColumn ? this.dataColumn : []
        },
        
    },
    mounted() {
        this.handleColumnsOrder()
    },
}
</script>
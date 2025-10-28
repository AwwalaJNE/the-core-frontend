<template>
    <div>
        <vs-row justify="end">
            <vs-col>
                <search-input
                    ref="searchInput"
                    :placeholder="searchPlaceholder"
                    @searchValue="searchValue"
                />
            </vs-col>
        </vs-row>

        <table-master
            hideColumnKey="error-dictionary"
            :dataTable="dataTable"
            :dataColumn="dataColumn"
            :tableLoading="loading"
            :hasAction="false"
            :hasPagination="false"
        />
    </div>
</template>

<script>
import axios from 'axios'
import master from '@/mixins/master'
import TableMaster from '@/components/table/tableMaster.vue'
import SearchInput from '@/components/search/searchInput.vue'

export default {
    name: 'error-dictionary',
    mixins: [master],
    components: {
        'table-master': TableMaster,
        'search-input': SearchInput,
    },
    data() {
        return {
            dataTable: [],
            dataColumn: [
                {
                    label: 'Error Code',
                    key: 'code',
                    width: 'xs',
                },
                {
                    label: 'Section',
                    key: 'section',
                    width: 'xs',
                },
                {
                    label: 'Message',
                    key: 'message',
                    width: 'auto',
                },
                {
                    label: 'Description',
                    key: 'description',
                    width: 'auto',
                },
            ],
            loading: false,
            tempSearch: '',
            searchPlaceholder: 'Search...',
        }
    },
    watch: {
        tempSearch: function (val, old) {
            if (val !== undefined) {
                this.getTableData(val)
            }
        },
    },
    methods: {
        async getTableData(q = '') {
            this.loading = true
            try {
                const res = await axios.get(
                    `${this.URL.documentation}/error?n=${this.listenNodeId}&s=${q}`,
                    this.Helper.header()
                )
                this.dataTable = Object.entries(res.data.data).map(([code, details]) => ({
                    code,
                    ...details,
                }))
            } catch (err) {
                this.openNotification(
                    'danger',
                    err.response?.data?.code || '',
                    err.response?.data?.message ?? 'Failed to load error dictionary',
                    err
                )
            } finally {
                this.loading = false
            }
        },
        searchValue(val) {
            this.tempSearch = val
        },
        refresh() {
            this.getTableData(this.tempSearch)
        },
    },
    mounted() {
        this.refresh()
    },
}
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem">
        <vs-row>
            <vs-col xs="6" sm="6" lg="3">
                <selector
                    formKey="filter_type"
                    :valueData="filterType"
                    :selectedValue="filterTypeBy"
                    :loading="loading"
                    @updateValue="updateValue"
                />
            </vs-col>
            <vs-col xs="6" sm="6" lg="9">
                <auto-complete
                    formKey="destination"
                    ref="destination"
                    :querySearch="querySearch"
                    @inputFocus="inputFocus"
                    @updateValue="updateValue"
                />
            </vs-col>
        </vs-row>
        <vs-row>
            <vs-col w="12">
                <table-master
                    hideColumnKey="receiving-misroute-bag"
                    :dataTable="dataTable"
                    :dataColumn="dataColumn"
                    :tableLoading="loading"
                    :hasAction="false"
                    :hasPagination="true"
                    :pageSize="pagination.page_size"
                    :page="pagination.page"
                    :limit="pagination.limit"
                    :isHideFilterColumn="true"
                    :isHideTotalPerPage="false"
                    :isMultipleSelectWithIndex="true"
                    :isShowCheckboxAll="true"
                    :onRowClickCallback="onRowClickCallback"
                    :isAllCheckedCheckCallback="onAllCheckCallback"
                    :isAllChecked="isAllChecked"
                    :selectedData="selectedData"
                    @actionLimit="actionLimit"
                    @actionPagination="actionPagination"
                    @updateSelected2="updateSelected"
                />
            </vs-col>
        </vs-row>
    </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'

import TableMaster from '@/components/table/tableMaster'
import AutoComplete from '@/components/input/autoComplete'
import Selector from '@/components/input/select'

export default {
    name: 'Misroute-Bag',
    mixins: [master],
    props: {},
    components: {
        'auto-complete': AutoComplete,
        'table-master': TableMaster,
        selector: Selector,
    },
    data() {
        return {
            changes_form: [],
            selectedData: [],

            dataTable: [],
            dataColumn: [
                {
                    label: 'Bag Number',
                    key: 'bag_number',
                    width: 'sm',
                },
                {
                    label: 'Destination',
                    key: 'bag_destination_node_code',
                    width: 'sm',
                },
                {
                    label: 'Type',
                    key: 'bag_type',
                    width: 'sm',
                },
            ],
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1,
            },
            loading: false,

            autoCompleteUrl: '',
            destination_node_code: '',

            filterTypeBy: 'all',
            filterType: [
                {
                    label: 'ALL TYPE',
                    value: 'all',
                },
                {
                    label: 'REGULAR',
                    value: 'normal',
                },
                {
                    label: 'MASTERBAG',
                    value: 'masterbag',
                },
                {
                    label: 'PRA RUNSHEET',
                    value: 'pra runsheet',
                },
                {
                    label: 'HVO',
                    value: 'hvo',
                },
                {
                    label: 'HACB',
                    value: 'hacb',
                },
                {
                    label: 'OM',
                    value: 'om',
                },
            ],

            isAllChecked: false,
        }
    },
    methods: {
        refresh() {
            this.resetCheckbox()
            this.getTableData(
                this.pagination.limit,
                this.pagination.page,
                this.destination_node_code,
                this.filterTypeBy
            )
        },
        async getTableData(limit, page, destination_node_code, type) {
            this.loading = true
            try {
                const res = await axios.get(
                    `${this.URL.bag_misroute}?n=${this.listenNodeId}&page=${page}&limit=${limit}&destination_node_code=${destination_node_code}&type=${type}`,
                    this.Helper.header()
                )
                this.dataTable = res.data.data
                this.pagination = {
                    page: res.data.meta.current_page,
                    limit: parseInt(res.data.meta.per_page),
                    page_size: res.data.meta.last_page,
                }
            } catch (err) {
                this.dataTable = []
            } finally {
                this.loading = false

                // TODO: REMOVE LATER
                let res = {
                    data: [
                        {
                            bag_number: '1',
                            bag_destination_node_id: 2301,
                            bag_destination_node_code: 'CGK750',
                            bag_type: 'OM',
                        },
                        {
                            bag_number: '2',
                            bag_destination_node_id: 2301,
                            bag_destination_node_code: 'CGK750',
                            bag_type: 'OM',
                        },
                        {
                            bag_number: '3',
                            bag_destination_node_id: 2301,
                            bag_destination_node_code: 'CGK750',
                            bag_type: 'OM',
                        },
                        {
                            bag_number: '4',
                            bag_destination_node_id: 2301,
                            bag_destination_node_code: 'CGK750',
                            bag_type: 'OM',
                        },
                    ],
                    links: {
                        first: 'url',
                        last: 'url',
                        prev: null,
                        next: null,
                    },
                    meta: {
                        current_page: 1,
                        from: 1,
                        last_page: 1,
                        path: 'url',
                        per_page: '20',
                        to: 10,
                        total: 10,
                    },
                }
                this.dataTable = res.data
                this.pagination = {
                    page: res.meta.current_page,
                    limit: parseInt(res.meta.per_page),
                    page_size: res.meta.last_page,
                }
            }
        },
        actionLimit(val) {
            this.pagination.limit = val
            this.pagination.page = 1
            this.refresh()
        },
        actionPagination(val) {
            this.pagination.page = val
            this.refresh()
        },
        updateValue(key, val, info) {
            if (key === 'filter_type') {
                this.filterTypeBy = val
                this.refresh()
            } else if (key === 'destination') {
                this.destination_node_code = info?.data?.node_code

                if (
                    (info && Object.keys(info).length > 0) ||
                    (info && Object.keys(info).length === 0 && val === '')
                ) {
                    this.refresh()
                }
            }
        },
        inputFocus() {
            this.autoCompleteUrl = `${this.URL.node_list}?n=${this.listenNodeId}&sort_order=desc&limit=10&page=1`
        },
        async querySearch(queryString, cb) {
            try {
                const res = await axios.get(
                    this.autoCompleteUrl + `&s=${queryString}`,
                    this.Helper.header()
                )
                const result = res.data.data || []
                const suggestions = result.map((item) => {
                    const value = item.node_name || ''
                    return { value, data: item }
                })
                cb(suggestions)
            } catch (error) {
                console.error('error', error)
            }
        },
        updateSelection(itemsToSelect, selectAll = false) {
            const selectedSet = new Set(itemsToSelect.map((i) => i.bag_number))
            this.dataTable = this.dataTable.map((item) => ({
                ...item,
                selected: selectAll ? true : selectedSet.has(item.bag_number),
                status: false,
            }))

            this.selectedData = this.dataTable.filter((item) => item.selected)

            const changesMap = new Map(this.changes_form.map((i) => [i.bag_number, i]))
            this.dataTable.forEach((item) => {
                if (changesMap.has(item.bag_number)) {
                    changesMap.get(item.bag_number).selected = item.selected
                } else if (item.selected) {
                    changesMap.set(item.bag_number, { ...item, selected: true })
                }
            })
            this.changes_form = [...changesMap.values()]

            this.$emit('update-selected', this.changes_form)
        },
        onAllCheckCallback(val) {
            // NOTES: THIS FUNCTION USED FOR CHECKED BY CLICKING ALL CHECKBOX
            this.updateSelection(this.dataTable, val)
        },
        updateSelected(val, checkedItem) {
            // NOTES: THIS FUNCTION USED FOR CHECKED BY CLICKING CHECKBOX
            this.updateSelection(checkedItem)
        },
        onRowClickCallback(event, val, checkedItem) {
            // NOTES: THIS FUNCTION USED FOR CHECKED BY CLICKING ROW
            this.updateSelection(checkedItem)
        },
        resetCheckbox() {
            this.dataTable = this.dataTable.map((item) => ({ ...item, selected: false }))
            this.selectedData = []
            this.changes_form = []
            this.$emit('update-selected', [])
        },
    },
    mounted() {
        this.refresh()
    },
}
</script>

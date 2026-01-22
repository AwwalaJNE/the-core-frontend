<template>
    <div :class="{ 'box-v1': boxed }">
        <vs-row justify="space-between" align="center">
            <h4 v-if="title">{{ title }}</h4>

            <div style="display: flex" v-if="dataTable.length > 0">
                <core-button
                    icon="bx bx-plus"
                    name="surat-jalan"
                    :customStyle="{ width: 'auto' }"
                    @click="openDialog('surat_jalan')"
                >
                    Surat Jalan
                </core-button>

                <core-button
                    icon="bx bx-plus"
                    name="surat-muatan"
                    :customStyle="{ width: 'auto' }"
                    @click="openDialog('surat_muatan')"
                >
                    Surat Muatan
                </core-button>
            </div>
        </vs-row>

        <vs-row v-if="dataTable.length > 0">
            <vs-col xs="6" sm="6" lg="3">
                <selector
                    formKey="filter_type"
                    :valueData="filterType"
                    :selectedValue="filterTypeBy"
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

        <vs-row class="section-padding">
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

        <dialog-bulk-surat-jalan
            title="Create Penerusan"
            :active="dialogSuratJalan"
            :dataItem="selectedData"
            @closeDialog="closeDialog('surat_jalan')"
        />
        <dialog-bulk-surat-muatan
            title="Create Surat Muatan"
            :active="dialogSuratMuatan"
            :dataItem="selectedData"
            @closeDialog="closeDialog('surat_muatan')"
        />
    </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'

import TableMaster from '@/components/table/tableMaster'
import Button from '@/components/button'
import AutoComplete from '@/components/input/autoComplete'
import Selector from '@/components/input/select'

import DialogBulkSuratJalan from '@/views/inbound/scan/dialogBulkSuratJalan'
import DialogBulkSuratMuatan from '@/views/inbound/scan/dialogBulkSuratMuatan'

export default {
    name: 'Misroute-Bag',
    mixins: [master],
    props: {
        boxed: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
    },
    components: {
        'auto-complete': AutoComplete,
        'table-master': TableMaster,
        selector: Selector,
        'core-button': Button,
        'dialog-bulk-surat-jalan': DialogBulkSuratJalan,
        'dialog-bulk-surat-muatan': DialogBulkSuratMuatan,
    },
    watch: {
        dataTable: {
            handler(newVal) {
                this.$emit('misroute-length-changed', newVal.length)
            },
            deep: true,
            immediate: true,
        },
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
                    value: 'REGULAR',
                },
                {
                    label: 'MASTERBAG',
                    value: 'MASTERBAG',
                },
                {
                    label: 'PRA RUNSHEET',
                    value: 'PRA',
                },
                {
                    label: 'HVO',
                    value: 'HVO',
                },
                {
                    label: 'HACB',
                    value: 'HACB',
                },
                {
                    label: 'OM',
                    value: 'OM',
                },
            ],

            isAllChecked: false,

            dialogSuratJalan: false,
            dialogSuratMuatan: false,
        }
    },
    methods: {
        async refresh() {
            this.resetCheckbox()
            await this.getTableData(
                this.pagination.limit,
                this.pagination.page,
                this.destination_node_code,
                this.filterTypeBy
            )
            this.$emit('autoFocusInput')
        },
        async getTableData(limit, page, destination_node_code, type) {
            this.loading = true
            try {
                const res = await axios.get(
                    `${this.URL.revamp_bag}/bag-missroute?n=${
                        this.listenNodeId
                    }&page=${page}&limit=${limit}&destination_node_code=${
                        destination_node_code || ''
                    }&type=${type}`,
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
            }
        },
        async actionLimit(val) {
            this.pagination.limit = val
            this.pagination.page = 1
            await this.refresh()
        },
        async actionPagination(val) {
            this.pagination.page = val
            await this.refresh()
        },
        async updateValue(key, val, info) {
            if (key === 'filter_type') {
                this.filterTypeBy = val
                this.refresh()
            } else if (key === 'destination') {
                this.destination_node_code = info?.data?.node_code

                if (
                    (info && Object.keys(info).length > 0) ||
                    (info && Object.keys(info).length === 0 && val === '')
                ) {
                    await this.refresh()
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
            this.$emit('autoFocusInput')
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
        openDialog(type) {
            this.setUnfocusInput()

            const dialogMap = {
                surat_jalan: () => {
                    if (this.selectedData.length > 0) {
                        this.dialogSuratJalan = true
                    } else {
                        this.openNotification(
                            'danger',
                            '',
                            'Failed',
                            'Please select at least one bag'
                        )
                    }
                },

                surat_muatan: () => {
                    if (this.selectedData.length > 0) {
                        this.dialogSuratMuatan = true
                    } else {
                        this.openNotification(
                            'danger',
                            '',
                            'Failed',
                            'Please select at least one bag'
                        )
                    }
                },
            }

            dialogMap[type]?.()
        },
        async closeDialog(type) {
            const closeMap = {
                surat_jalan: () => (this.dialogSuratJalan = false),
                surat_muatan: () => (this.dialogSuratMuatan = false),
            }

            closeMap[type]?.()
            await this.refresh()
            this.$emit('autoFocusInput')
        },
    },
}
</script>

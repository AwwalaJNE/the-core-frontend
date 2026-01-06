<template>
    <div>
        <table-master
            hideColumnKey="setting-application-role-detail"
            ref="tableMaster"
            :key="key"
            :dataTable="dataTable"
            :dataColumn="dataColumn"
            :tableLoading="loading"
            :hasAction="false"
            :isSearchAble="true"
            :isMultipleSelectWithIndex="true"
            :selectedData="dataTableSelected"
            :onRowClickCallback="onRowClickCallback"
            :isAllCheckedCheckCallback="onAllCheckCallback"
            :isAllChecked="isAllChecked"
            :isShowCheckboxAll="true"
            :isHideFilterColumn="true"
            :isHideTotalPerPage="true"
            @updateSelected2="updateSelected"
            @updateValue="updateValue"
            @handleAddData="handleAddData"
            @handleRemoveData="handleRemoveData"
            @inputFocus="inputFocus"
        />
    </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'

import TableMaster from '@/components/table/tableMaster'

export default {
    name: 'role-permission-data-table',
    mixins: [master],
    props: {
        app: String,
        app_role_id: String,
    },
    components: {
        'table-master': TableMaster,
    },
    data() {
        return {
            dataTableSelected: [],
            dataTable: [],
            dataColumn: [],
            loading: false,
            pagination: {
                limit: 1000,
                page_size: 1,
                page: 1,
            },
            tempSearch: '',
            autoCompleteUrl: '',
            input_value: '',
            input_label: '',
            isAllChecked: false,
            changes_form: [],
            key: '',
        }
    },
    watch: {
        app_role_id: function (val) {
            if (val !== undefined) {
                this.refresh()
            }
        },
    },
    methods: {
        resetChangesForm() {
            this.changes_form = []
        },
        handleAddData(val) {
            val.filter = Array.isArray(val.filter)
                ? [...val.filter, { reference_entity: '', reference_value: [] }]
                : [{ reference_entity: '', reference_value: [] }]
            val.selected = true

            const changesMap = new Map(
                this.changes_form.map((item) => [item.feature_permission_id, item])
            )
            changesMap.set(val.feature_permission_id, val)

            this.$emit('update-selected', (this.changes_form = Array.from(changesMap.values())))
        },
        handleRemoveData(val, key) {
            val.filter.splice(key, 1)
            if (!val.filter.length) val.filter = null

            const changesMap = new Map(
                this.changes_form.map((item) => [item.feature_permission_id, item])
            )
            changesMap.set(val.feature_permission_id, val)

            this.$emit('update-selected', (this.changes_form = Array.from(changesMap.values())))
        },
        updateSelected(val, checkedItem) {
            // NOTES: THIS FUNCTION USED FOR CHECKED BY CLICKING CHECKBOX

            const selectedSet = new Set(checkedItem.map((item) => item.feature_permission_id))
            const changesMap = new Map(
                this.changes_form.map((item) => [item.feature_permission_id, item])
            )

            const isSelected = selectedSet.has(val.feature_permission_id)

            if (changesMap.has(val.feature_permission_id)) {
                changesMap.get(val.feature_permission_id).selected !== isSelected
                    ? changesMap.delete(val.feature_permission_id)
                    : changesMap.set(val.feature_permission_id, { ...val, selected: isSelected })
            } else {
                changesMap.set(val.feature_permission_id, { ...val, selected: isSelected })
            }

            this.$emit('update-selected', (this.changes_form = [...changesMap.values()]))
        },
        onAllCheckCallback(val) {
            // NOTES: THIS FUNCTION USED FOR CHECKED BY CLICKING ALL CHECKBOX

            const changesMap = new Map(
                this.changes_form.map((item) => [item.feature_permission_id, item])
            )

            this.dataTable.forEach((item) => {
                if (changesMap.has(item.feature_permission_id)) {
                    changesMap.get(item.feature_permission_id).selected = val
                } else {
                    changesMap.set(item.feature_permission_id, { ...item, selected: val })
                }
            })

            this.changes_form = [...changesMap.values()]
            this.$emit('update-selected', this.changes_form)
        },
        onRowClickCallback(event, val, checkedItem) {
            // NOTES: THIS FUNCTION USED FOR CHECKED BY CLICKING ROW

            const selectedSet = new Set(checkedItem.map((item) => item.feature_permission_id))
            const changesMap = new Map(
                this.changes_form.map((item) => [item.feature_permission_id, item])
            )

            const isSelected = selectedSet.has(val.feature_permission_id)

            if (changesMap.has(val.feature_permission_id)) {
                changesMap.get(val.feature_permission_id).selected !== isSelected
                    ? changesMap.delete(val.feature_permission_id)
                    : changesMap.set(val.feature_permission_id, { ...val, selected: isSelected })
            } else {
                changesMap.set(val.feature_permission_id, { ...val, selected: isSelected })
            }

            this.$emit('update-selected', (this.changes_form = [...changesMap.values()]))
        },
        refresh() {
            if (!this.app_role_id) return

            if (this.app.toLowerCase().includes('data table')) {
                this.getTableData2()
            } else if (this.app.toLowerCase().includes('metric')) {
                this.getTableData3()
            } else {
                this.getTableData(this.pagination.limit, this.pagination.page, this.tempSearch)
            }
        },
        getReference(entity) {
            const referenceMap = {
                REGION: {
                    url: this.URL.regional_list,
                    value: 'regional_code',
                    label: 'regional_code',
                },
                BRANCH: { url: this.URL.branch_list, value: 'branch_code', label: 'branch_code' },
                ORIGIN: { url: this.URL.origin_list, value: 'origin_code', label: 'origin_code' },
                NODE: { url: this.URL.node_list, value: 'node_code', label: 'node_code' },
                USER: { url: this.URL.user_list, value: 'user_login', label: 'user_name' },
                EMPLOYEE: {
                    url: this.URL.employee_list,
                    value: 'employee_nik',
                    label: 'employee_name',
                },
                CUSTOMER: {
                    url: this.URL.customer_list,
                    value: 'customer_code',
                    label: 'customer_name',
                },
                SUBDISTRICT: {
                    url: this.URL.subdistrict_list,
                    value: 'geolocation_subdistrict_name',
                    label: 'geolocation_subdistrict_name',
                },
                DELIVERY_ZONE: { url: this.URL.tlc_zone, value: 'tlc_zone', label: 'tlc_zone' },
                ZIP_CODE: { url: this.URL.zip_code_list, value: 'zip_code', label: 'zip_code' },
                SERVICE: { url: this.URL.service, value: 'service_code', label: 'service_code' },
                HIDDEN_COLUMN: {
                    url: this.URL.column_list,
                    value: 'reference_value',
                    label: 'reference_value',
                },
                HIDDEN_METRIC: {
                    url: this.URL.column_list,
                    value: 'reference_value',
                    label: 'reference_value',
                },
            }
            return referenceMap[entity] || null
        },
        setAutoCompleteData(reference, entity, val) {
            if (!reference || reference === null) {
                this.autoCompleteUrl = ''
                this.input_value = ''
                this.input_label = ''
            } else {
                if (entity === 'HIDDEN_COLUMN' || entity === 'HIDDEN_METRIC') {
                    this.autoCompleteUrl = `${reference.url}?n=${this.listenNodeId}&feature=${val.feature_code}`
                    this.input_value = reference.value
                    this.input_label = reference.label
                } else {
                    this.autoCompleteUrl = `${reference.url}?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`
                    this.input_value = reference.value
                    this.input_label = reference.label
                }
            }

            const col = this.dataColumn.find((col) => col.key === 'access_data')
            if (col) {
                col.selector.value = val
                col.multipleSelector.value = []
                col.multipleSelector.autoCompleteUrl = this.autoCompleteUrl
                col.multipleSelector.selectValue = this.input_value
                col.multipleSelector.selectLabel = this.input_label
            }
        },
        inputFocus(index, val, info) {
            const entity = val?.filter[index]?.reference_entity
            this.setAutoCompleteData(this.getReference(entity), entity, val)
        },
        updateValue(index, key, val, info, dataObj) {
            dataObj.filter[index][key] = val

            if (key === 'reference_entity') {
                this.setAutoCompleteData(this.getReference(val), val, dataObj)
                dataObj.filter[index].reference_value = []
            }

            const changesMap = new Map(
                this.changes_form.map((item) => [item.feature_permission_id, item])
            )
            changesMap.set(dataObj.feature_permission_id, { ...dataObj, selected: true })
            this.changes_form = Array.from(changesMap.values())
        },
        async loadDataTable({ url, columnKey, usePagination = false, limit, page, q }) {
            this.loading = true

            const query = q || ''

            try {
                const res = await axios.get(url, this.Helper.header())

                const data = res.data?.data || []

                if (!data.length) {
                    this.dataTable = []
                    return
                }

                this.dataTable = data.map((item) => ({
                    ...item,
                    selected: !!item.feature_scope_id,
                }))

                this.dataColumn = JSON.parse(JSON.stringify(this.getColumnDefinition(columnKey)))
                this.key = columnKey

                if (usePagination && res.data.meta) {
                    this.pagination = {
                        page: res.data.meta.current_page,
                        limit: Number(res.data.meta.per_page),
                        page_size: res.data.meta.last_page,
                    }
                }

                this.dataTableSelected = this.dataTable.filter((i) => i.selected)
                this.isAllChecked = this.dataTable.every((i) => i.selected)
            } catch (err) {
                this.redirectError?.(err)
                this.openNotification(
                    'danger',
                    err?.response?.data?.code || '',
                    'Failed',
                    err?.response?.data?.message || 'Something went wrong'
                )
            } finally {
                this.loading = false
            }
        },
        getTableData(limit, page, q) {
            return this.loadDataTable({
                url: `${this.URL.application_role}/${this.app_role_id}/permission?n=${
                    this.listenNodeId
                }&sort_order=desc&limit=${limit}&page=${page}&s=${q || ''}`,
                columnKey: 'others',
                usePagination: true,
                limit,
                page,
                q,
            })
        },

        getTableData2() {
            return this.loadDataTable({
                url: `${this.URL.feature_list}/${this.app_role_id}?n=${this.listenNodeId}&sort_order=desc`,
                columnKey: 'data_table',
            })
        },

        getTableData3() {
            return this.loadDataTable({
                url: `${this.URL.feature_list}/${this.app_role_id}?n=${this.listenNodeId}&sort_order=desc`,
                columnKey: 'metric',
            })
        },

        getColumnDefinition(typeInputDetail) {
            let referenceEntities
            switch (typeInputDetail) {
                case 'others':
                    referenceEntities = [
                        { label: 'REGION', value: 'REGION' },
                        { label: 'BRANCH', value: 'BRANCH' },
                        { label: 'ORIGIN', value: 'ORIGIN' },
                        { label: 'NODE', value: 'NODE' },
                        { label: 'USER', value: 'USER' },
                        { label: 'EMPLOYEE', value: 'EMPLOYEE' },
                        { label: 'CUSTOMER', value: 'CUSTOMER' },
                        { label: 'SUBDISTRICT', value: 'SUBDISTRICT' },
                        { label: 'DELIVERY ZONE', value: 'DELIVERY_ZONE' },
                        { label: 'ZIP_CODE', value: 'ZIP_CODE' },
                        { label: 'SERVICE', value: 'SERVICE' },
                    ]
                    break

                case 'data_table':
                    referenceEntities = [{ label: 'HIDDEN_COLUMN', value: 'HIDDEN_COLUMN' }]
                    break
                case 'metric':
                    referenceEntities = [{ label: 'HIDDEN_METRIC', value: 'HIDDEN_METRIC' }]
                    break
            }

            if (
                this.app.toLowerCase().includes('dashboard') ||
                this.app.toLowerCase().includes('data table')
            ) {
                return [
                    {
                        label: 'Menu',
                        key: 'feature_name',
                        type: 'text',
                        width: 'sm',
                    },
                    {
                        label: 'Access Data',
                        key: 'access_data',
                        type: 'inputan',
                        typeInput: 'multi-select-by',
                        typeInputDetail,
                        selector: {
                            label: 'Reference Entity',
                            key: 'reference_entity',
                            rules: 'required',
                            typeInput: 'selector',
                            value: '',
                            data: referenceEntities,
                        },
                        multipleSelector: {
                            label: 'Reference Value',
                            key: 'reference_value',
                            rules: 'required',
                            typeInput: 'multipleSelector',
                            value: '',
                            autoCompleteUrl: '',
                            selectLabel: '',
                            selectValue: '',
                            minSearchLength: 0,
                        },
                        width: 'auto',
                    },
                ]
            } else {
                return [
                    {
                        label: 'Menu',
                        key: 'feature_name',
                        type: 'text',
                        width: 'auto',
                    },
                ]
            }
        },
    },
    mounted() {
        this.refresh()
    },
}
</script>

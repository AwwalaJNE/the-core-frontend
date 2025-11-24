<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>Hold Connote</h2>
                </div>
                <div class="mt-2">
                    <vs-row justify="space-between">
                        <vs-col xs="9" sm="9" lg="9">
                            <form @submit.prevent="openDialog">
                                <vs-input
                                    border
                                    type="text"
                                    v-model="koliCode"
                                    label-placeholder="Masukkan Nomer Connote"
                                    :autofocus="true"
                                    v-uppercase
                                    ref="formInputUnbagging"
                                >
                                </vs-input>
                            </form>
                        </vs-col>
                        <vs-col xs="3" sm="3" lg="3">
                            <vs-button @click="openDialog"> Submit </vs-button>
                        </vs-col>
                    </vs-row>
                </div>
            </vs-col>
        </vs-row>

        <section class="nodes">
            <div class="box view">
                <div class="nav-box">
                    <vs-row justify="space-between">
                        <vs-col xs="12" sm="12" lg="6">
                            <vs-row>
                                <vs-col w="4">
                                    <select-search-by
                                        :isMultiple="false"
                                        :border="true"
                                        @updateSearchBy="updateFilterDateBy"
                                        :valueData="dateParams"
                                        :selectedValue="filterDateBy"
                                    />
                                </vs-col>
                                <vs-col w="8">
                                    <date-time
                                        :name="''"
                                        :rules="''"
                                        :formKey="'TRIGGER_DATE'"
                                        :valueData="dateRange"
                                        typeInput="datetimerange"
                                        @updateValue="updateValue"
                                    />
                                </vs-col>
                            </vs-row>
                        </vs-col>
                        <vs-col xs="12" sm="12" lg="6">
                            <vs-row justify="end">
                                <vs-col xs="6" sm="8" lg="4">
                                    <select-search-by
                                        :isMultiple="false"
                                        :border="true"
                                        @updateSearchBy="updateSearchBy"
                                        :valueData="searchParams"
                                        :selectedValue="searchBy"
                                    />
                                </vs-col>
                                <vs-col xs="6" sm="4" lg="4">
                                    <search-input
                                        ref="searchInput"
                                        @searchValue="searchValue"
                                        :placeholder="searchPlaceholder"
                                    />
                                </vs-col>
                            </vs-row>
                        </vs-col>
                    </vs-row>
                </div>

                <div class="mt-05">
                    <table-master
                        hideColumnKey="irregularity-hold"
                        :dataTable="dataTable"
                        :dataColumn="datacolumn"
                        :tableLoading="loading"
                        :pageSize="pagination.page_size"
                        :page="pagination.page"
                        :limit="pagination.limit"
                        :customBtn="true"
                        customBtn_label="Unhold"
                        @actionUpdate="editIrreg"
                        :hasPagination="true"
                        @actionLimit="actionLimit"
                        @actionPagination="actionPagination"
                    />
                </div>
            </div>
        </section>

        <dialog-hold
            :active="dialogCancelActive"
            :closeDialog="closeDialog"
            @updateValue="updateValue"
        />
        <dialog-confirm
            :active="dialogConfirmCancelActive"
            :loading="dialogLoadingCancelActive"
            :closeDialog="closeDialogConfirmRemove"
            title="Unhold Irregularity ?"
            message="Are you sure you want to Unhold Irregularity ?"
            @confirm="confirmRemove"
            @cancel="closeDialogConfirmRemove"
        />
    </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'
import moment from 'moment'
import TableMaster from '@/components/table/tableMaster.vue'
import NavItem from '@/components/navbar/navTab'
import Breadcrumb from '@/components/breadcrumb/index'
import SearchInput from '@/components/search/searchInput'
import DateTime from '@/components/input/dateTime'
import SelectSearchBy from '@/components/search/selectSearchBy'

import DialogHold from '@/views/irreguralities/hold/dialogHold'
import DialogConfirm from '@/components/dialog/dialogConfirm'
export default {
    name: 'irregularities-hold',
    mixins: [master],
    components: {
        'nav-item': NavItem,
        breadcrumb: Breadcrumb,
        'search-input': SearchInput,
        'date-time': DateTime,
        'table-master': TableMaster,
        'dialog-hold': DialogHold,
        'dialog-confirm': DialogConfirm,
        'select-search-by': SelectSearchBy,
    },
    data() {
        return {
            koliCode: '',
            dialogConfirmCancelActive: false,
            dialogLoadingCancelActive: false,
            dateRange: [],
            tempSearch: '',
            dataTable: [],
            datacolumn: [
                {
                    label: 'Date',
                    key: 'created_at',
                    width: 'md',
                },
                {
                    label: 'Connote',
                    key: 'koli_number',
                    width: 'auto',
                },
                {
                    label: 'Status Code',
                    key: 'irregularity_status_code',
                    width: 'auto',
                },
                {
                    label: 'User',
                    key: 'user_name',
                    width: 'auto',
                },
            ],
            loading: false,
            pagination: {
                limit: 5,
                page_size: 1,
                page: 1,
            },
            form: {},
            dialogCancelActive: false,
            searchBy: 'koli number',
            filterDateBy: 'create',
            searchPlaceholder: 'Search Connote Number',
            searchParams: [
                {
                    label: 'Connote number',
                    value: 'koli number',
                },
                {
                    label: 'Status Code',
                    value: 'irregularity_status_code',
                },
                {
                    label: 'User',
                    value: 'user_name',
                },
            ],
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'create',
                },
            ],
        }
    },
    methods: {
        confirmRemove() {
            this.dialogLoadingCancelActive = true
            this.UnholdIrregularity()
        },
        refresh() {
            let from = ''
            let to = ''

            if (this.dateRange.length > 0) {
                from = this.dateRange[0]
                to = this.dateRange[1]
            } else {
                let d = new Date()

                from = moment(d).startOf('day').format('YYYY-MM-DD HH:mm:ss')
                to = moment(d).endOf('day').format('YYYY-MM-DD HH:mm:ss')
            }

            this.getTableData(
                this.pagination.limit,
                this.pagination.page,
                this.tempSearch,
                from,
                to
            )
        },
        async getTableData(limit, page, q, from, to, node) {
            this.loading = true
            let query = ''
            let startDate = ''
            let endDate = ''
            if (q !== undefined) {
                query = q
            }
            if (from !== undefined && to !== undefined) {
                startDate = this.formatToWIB(from)
                endDate = this.formatToWIB(to)
            }
            await axios
                .get(
                    this.URL.irregularities +
                        `?n=${this.listenNodeId}&irregularity_type=HOLD&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${this.filterDateBy}`,
                    this.Helper.header()
                )
                .then((res) => {
                    // this.dataTable = res.data.data
                    let arr = res.data.data

                    arr.map((item) => {
                        item['created_at'] = this.formatTimezone(item?.created_at)
                    })

                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if (res.data.data.length > 0) {
                    } else {
                        // this.openNotification('warn', null, 'Irreguralities Hold data is empty!', ' Please create Irreguralities Hold data')
                    }

                    this.loading = false
                })
                .catch((err) => {
                    this.loading = false
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'Failed to populate Irreguralities Hold',
                        err
                    )
                })
        },
        async editIrreg(val) {
            if (this.dataTable.length > 0) {
                //dibuat untuk approve saja jadi gapake switch case
                this.dataItem = val

                this.$nextTick(() => {
                    this.dialogConfirmCancelActive = true
                })
            }
        },
        async handleSubmit() {
            await axios
                .post(
                    this.URL.irregularities + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form),
                    this.Helper.header()
                )
                .then((res) => {
                    this.refresh()
                    this.dialogCancelActive = false
                    this.openNotification(null, 'Success', 'Create new cancel connote is success')
                })
                .catch((err) => {
                    this.loading = false
                    this.refresh()
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'Create new cancel connote failed',
                        err.response ? err.response.data.message : 'something went wrong'
                    )
                })
        },
        searchValue(val) {
            this.tempSearch = val
            this.refresh()
        },
        actionUpdate(val, key) {
            switch (key) {
                case 'edit':
                    if (this.dataTable.length > 0) {
                        this.dataItem = val

                        this.$nextTick(() => {
                            this.dialogEntryStatus = true
                        })
                    }
                    break
                default:
            }
        },
        updateValue(key, val) {
            switch (key) {
                case 'DATE_TIME_WITHOUT_SECONDS':
                    this.dateRange = val
                    this.refresh()

                    break
                case 'DIALOG_CANCEL':
                    this.form = val
                    this.form['connote_number'] = this.koliCode
                    this.handleSubmit()
                    break
                default:

                // code block
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
        closeDialog() {
            this.dialogCancelActive = false
        },
        closeDialog() {
            this.dialogCancelActive = false
        },
        closeDialogConfirmRemove() {
            this.dialogConfirmCancelActive = false
            this.dialogLoadingCancelActive = false
        },
        openDialog() {
            if (this.koliCode !== '') {
                this.dialogCancelActive = true
            }
        },

        async UnholdIrregularity() {
            let form = {}
            let iregularity_id = this.dataItem.irregularity_id
                ? this.dataItem.irregularity_id
                : null
            this.dataItem.irregularity_type = 'UNHOLD'
            form = this.dataItem
            await axios
                .post(
                    this.URL.irregularities + `/${iregularity_id}/unhold?n=${this.listenNodeId}`,
                    JSON.stringify(form),
                    this.Helper.header()
                )
                .then((res) => {
                    this.refresh()
                    this.dialogConfirmCancelActive = false
                    this.dialogLoadingCancelActive = false
                    this.openNotification(null, 'Success', 'Unhold irregularity is success')
                })
                .catch((err) => {
                    this.dialogLoadingCancelActive = false
                    this.refresh()
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'Unhold irregularity failed',
                        err.response ? err.response.data.message : 'something went wrong'
                    )
                })
        },
        updateSearchBy(key, val) {
            val = val.replaceAll(' ', '_')
            this.searchBy = val
            this.searchPlaceholder = key
        },
        updateFilterDateBy(key, val) {
            this.filterDateBy = val
        },
    },
    beforeDestroy() {
        window.removeEventListener('timezone-changed', this.refresh)
    },
    mounted() {
        window.addEventListener('timezone-changed', this.refresh)
        this.setActiveInput('formInputUnbagging', null)
        this.refresh()
    },
}
</script>

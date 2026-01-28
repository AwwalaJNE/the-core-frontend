<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <div style="display: flex; align-items: center">
                        <h2 style="margin-right: 10px">{{ title }}</h2>

                        <vs-tooltip right>
                            <i class="bx bx-info-circle"></i>
                            <template #tooltip>
                                Deposit & COD history only for cash payment type
                            </template>
                        </vs-tooltip>
                    </div>
                </div>
            </vs-col>
        </vs-row>

        <div class="mt-2" style="display: flex; justify-content: space-between">
            <vs-row>
                <vs-col xs="6" sm="6" lg="6">
                    <form @submit.prevent="openDialog">
                        <multi-input
                            ref="hrsNumber"
                            placeholder="Masukkan Nomor HRS"
                            rules=""
                            formKey="HRS_NUMBER"
                            :loading="loading"
                            :selectedValue="hrsNumber"
                            :isMultiple="false"
                            :disabled="false"
                            :isAllowCreate="true"
                            :autofocus="true"
                            @updateValue="updateValue"
                        />
                    </form>
                </vs-col>
                <vs-col xs="2" sm="2" lg="2">
                    <vs-button :active="true" @click="openDialog"> Paid </vs-button>
                </vs-col>
            </vs-row>
        </div>

        <section class="nodes">
            <div class="box view">
                <div class="nav-box">
                    <vs-row justify="end">
                        <vs-col xs="12" sm="12" lg="7" style="margin-bottom: 0.5rem">
                            <daterange-filter
                                :formKey="'DATE_TIME_WITHOUT_SECONDS'"
                                typeInput="datetimerange"
                                @searchDate="searchDate"
                                size="small"
                            />
                        </vs-col>
                        <vs-col xs="6" sm="8" lg="3">
                            <select-search-by
                                :valueData="filterValues"
                                :isMultiple="false"
                                :border="true"
                                :selectedValue="searchBy"
                                @updateSearchBy="updateSearchBy"
                            />
                        </vs-col>
                        <vs-col xs="6" sm="4" lg="2">
                            <search-input
                                ref="searchInput"
                                @searchValue="searchValue"
                                :placeholder="searchPlaceholder"
                                @handleSearch="handleSearch"
                            />
                        </vs-col>
                    </vs-row>
                </div>
                <template>
                    
                        <DeliveryCodTable
                            :ref="'DeliveryCodTable'"
                            :dateFilter="tempDate"
                            :query="tempSearch"
                            :searchBy="searchBy"
                            @openDialog="openDialog"
                        />
                    
                </template>
            </div>
        </section>

        <dialog-validation
            :active="dialogEntryStatusActive"
            :closeDialog="closeDialog"
            :validItem="successItem"
            :invalidItem="failedItem"
            :loadingValidation="loadingValidation"
            :totalAmountCOD="totalAmountCOD"
            @updateValue="updateValue"
            @refresh="refresh"
            ref="dialogEntryStatus"
        />
    </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'
import NavItem from '@/components/navbar/navTab'
import Breadcrumb from '@/components/breadcrumb/index'
import SearchInput from '@/components/search/searchInput'
import SelectSearchBy from '@/components/search/selectSearchBy'
import DateRange from '@/components/daterange/index'

import DeliveryCodTable from '@/views/delivery/cod/codTable'
import DialogValidation from '@/views/delivery/cod/dialogValidation'
import MultiInput from '@/components/input/multiInput'

export default {
    name: 'Inbound-List',
    mixins: [master],
    components: {
        'nav-item': NavItem,
        breadcrumb: Breadcrumb,
        'search-input': SearchInput,
        DeliveryCodTable: DeliveryCodTable,
        'select-search-by': SelectSearchBy,
        'daterange-filter': DateRange,
        'multi-input': MultiInput,
        'dialog-validation': DialogValidation,
    },
    data() {
        return {
            title: 'Deposit COD',
            tempSearch: '',
            tempDate: [],
            searchBy: 'hrs_number',
            searchPlaceholder: 'Search HRS Number',
            filterValues: [
                {
                    label: 'HRS Number',
                    value: 'hrs_number',
                },
                {
                    label: 'Courier Name',
                    value: 'courier_name',
                },
                {
                    label: 'Courier Code',
                    value: 'courier_code',
                },
                {
                    label: 'ID',
                    value: 'delivery_runsheet_number',
                },
                {
                    label: 'DRI Number',
                    value: 'dri_number',
                },
            ],

            dataItem: {},
            hrsNumber: [],
            dialogEntryStatusActive: false,
            loading: false,
            loadingValidation: false,
            successItem: [],
            failedItem: [],
            validSuccessItem: [],
            validFailedItem: [],
            totalAmountCOD: 0,
        }
    },
    methods: {
        refresh() {
            this.$refs.DeliveryCodTable.refresh() // trigger function refresh form dari luar component list
        },
        searchValue(val) {
            this.tempSearch = val
        },
        searchDate(val) {
            this.tempDate = val
        },
        clearSearch() {
            this.$refs.searchInput.clear()
        },
        updateSearchBy(key, val) {
            this.searchBy = val
            this.searchPlaceholder = key
        },
        openDialog() {
            const hrsNumbers = [
                ...(this.hrsNumber ?? []),
                ...(this.$refs.DeliveryCodTable.is_all_selected
                    ? this.$refs.DeliveryCodTable.filtered_all_item ?? []
                    : []),
                ...(this.$refs.DeliveryCodTable.filtered_item ?? []),
            ]

            if (hrsNumbers.length > 0) {
                this.validationCreateItem({ hrs_numbers: hrsNumbers })
            }
        },
        closeDialog() {
            this.dialogEntryStatusActive = false
        },
        async validationCreateItem(validationHrsNumber) {
            this.loadingValidation = true
            await axios
                .post(
                    this.URL.validation + `/deposit-cod?n=${this.listenNodeId}`,
                    JSON.stringify(validationHrsNumber),
                    this.Helper.header()
                )
                .then((res) => {
                    this.dataItem = res.data.data
                    this.successItem = this.dataItem.success_list
                    this.failedItem = this.dataItem.failed_list
                    this.totalAmountCOD = this.dataItem.total_amount_cod

                    if (this.successItem.length > 0) {
                        this.dialogEntryStatusActive = true
                    } else {
                        this.openNotification(
                            'danger',
                            err.response ? err.response.data.code : '',
                            'Error',
                            this.dataItem?.message ? this.dataItem.message : 'something went wrong'
                        )
                        this.handleClearForm()
                        this.refresh()
                    }
                })
                .catch((err) => {
                    this.openNotification(
                        'danger',
                        err.response ? err.response.data.code : '',
                        'Input Validation Failed',
                        err.response ? err.response.data.message : 'something went wrong'
                    )
                    this.handleClearForm()
                    this.refresh()
                })

            this.loadingValidation = false
        },
        handleClearForm() {
            this.hrsNumber = []
            this.$refs.hrsNumber.value = []
        },
        updateValue(key, val) {
            switch (key) {
                case 'HRS_NUMBER':
                    this.hrsNumber = this.$refs.hrsNumber.value
                    break
                default:
            }
        },
        handleSearch() {
            this.$nextTick(() => {
                this.refresh()
                this.$refs.searchInput.clear()
            })
        },
    },
    mounted() {
        this.setActiveInput('hrsNumber')
    },
}
</script>

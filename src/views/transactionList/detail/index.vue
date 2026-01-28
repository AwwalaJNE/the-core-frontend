<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2 v-copy="title">{{ title }}</h2>
                </div>
            </vs-col>
            <vs-col xs="4" sm="1" lg="1" align="right">
                <div class="btn-print-all">
                    <vs-button ref="btnPrintAll" square block @click="printAll">
                        PRINT ALL
                    </vs-button>
                </div>
            </vs-col>
        </vs-row>

        <section class="nodes">
            <div class="box view">
                <div class="nav-box">
                    <vs-row justify="space-between">
                        <vs-col xs="12" sm="12" lg="6" class="mb-15">
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
                                    <daterange-filter @searchDate="searchDate" size="small" />
                                </vs-col>
                            </vs-row>
                        </vs-col>
                        <vs-col xs="12" sm="12" lg="6" class="mb-15">
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
                <template>
                    
                        <transactionDetailList
                            :ref="'transactionList'"
                            :query="tempSearch"
                            @handleSelectedRow="handleSelectedRow"
                            @printAllData="printAllDataResolver"
                            :dateFilter="tempDate"
                            :searchBy="searchBy"
                            :filterDateBy="filterDateBy"
                        />
                    
                </template>
            </div>
        </section>
    </div>
</template>
<script>
import NavItem from '@/components/navbar/navTab'
import Breadcrumb from '@/components/breadcrumb/index'
import SearchInput from '@/components/search/searchInput'
import dateRange from '@/components/daterange/index'
import master from '@/mixins/master'
import TransactionDetailList from '@/views/transactionList/detail/transactionDetailList'
import SelectSearchBy from '@/components/search/selectSearchBy'

export default {
    name: 'transaction-index',
    mixins: [master],
    components: {
        'nav-item': NavItem,
        breadcrumb: Breadcrumb,
        'search-input': SearchInput,
        'daterange-filter': dateRange,
        transactionDetailList: TransactionDetailList,
        'select-search-by': SelectSearchBy,
    },
    data() {
        return {
            title: 'Connote Detail',
            tempSearch: '',
            tempDate: [],
            koli_number: '',
            searchBy: 'connote number',
            filterDateBy: 'create',
            searchPlaceholder: 'Search Connote Number',
            searchParams: [
                {
                    label: 'Connote Number',
                    value: 'connote number',
                },
                {
                    label: 'Koli Qty',
                    value: 'koli_qty',
                },
                {
                    label: 'Shipper Name',
                    value: 'connote_shipper_name',
                },
                {
                    label: 'Receiver Name',
                    value: 'connote_receiver_name',
                },
                {
                    label: 'Service',
                    value: 'connote_service_code',
                },
                {
                    label: 'Origin',
                    value: 'connote_shipper_tlc',
                },
                {
                    label: 'Destination',
                    value: 'connote_receiver_tlc',
                },
                {
                    label: 'Amount',
                    value: 'amount_price',
                },
                {
                    label: 'Surcharges',
                    value: 'amount_surcharge',
                },
                {
                    label: 'Insurance',
                    value: 'amount_insurance',
                },
                {
                    label: 'Adm. Fee',
                    value: 'amount_adm_insurance',
                },
                {
                    label: 'Discount',
                    value: 'amount_discount',
                },
                {
                    label: 'Total',
                    value: 'amount_total_price',
                },
                {
                    label: 'Cancel',
                    value: 'is_void_status',
                },
            ],
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'create',
                },
                {
                    label: 'Due Date',
                    value: 'connote_sla_date',
                },
            ],
            selectedRow: [],
        }
    },
    methods: {
        refresh() {
            this.$refs.transactionList.refresh() // trigger function refresh form dari luar component list
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

        openDialog() {
            this.$router.push('/new-transactions')
            this.setRoutePageHistory(this.$route.meta, false)
        },

        printAllDataResolver(arr) {
            if (arr.length > 0) {
                this.koli_number = ''
                let str = []
                arr.map((conot) => {
                    if (conot.hasOwnProperty('koli')) {
                        let temp = []
                        conot.koli.map((koli) => {
                            if (koli.hasOwnProperty('koli_number')) {
                                temp.push(koli.koli_number)
                            }
                        })
                        str = [...str, ...temp]
                    }
                })
                this.koli_number = str.toString()
            }
        },
        printAll() {
            if (this.koli_number.length > 0) {
                let routeData = this.$router.resolve({
                    name: 'printGeneral',
                    params: {
                        id: this.koli_number,
                        type: 'koli-reprint',
                        node_id: this.listenNodeId,
                    },
                })

                const printWindow = window.open(routeData.href, '_blank', 'noopener')

                if (printWindow) {
                    printWindow.onload = function () {
                        printWindow.print()
                        printWindow.onafterprint = () => printWindow.close()
                    }
                }
            }
        },

        updateSearchBy(key, val) {
            val = val.replaceAll(' ', '_')
            this.searchBy = val
            this.searchPlaceholder = key
        },

        updateFilterDateBy(key, val) {
            this.filterDateBy = val
        },

        searchDate(val) {
            this.tempDate = val
        },

        handleSelectedRow(val) {
            this.selectedRow = val
        },

        handleShortcutPrint() {
            if (this.selectedRow.length > 0) {
                this.$refs.transactionList.actionPrintSelected()
            } else {
                this.$refs.transactionList.actionPrintSelected(this.koli_number)
            }
        },
    },
    mounted() {
        this.handlePrintShortcut(this.handleShortcutPrint)
    },
}
</script>
<style lang="scss">
.mb-15 {
    margin-bottom: 1.5em;
}

.custom-title {
    padding: 0.6em;
    text-align: right;
    font-weight: 600;
}

.btn-print-all {
    padding-top: 0.7em;
}
</style>

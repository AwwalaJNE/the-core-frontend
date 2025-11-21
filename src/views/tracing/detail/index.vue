<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2 v-copy="title">{{ title }}</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3" v-if="navActive != 'k-RUNSHEET'">
                <div
                    style="position: relative; display: flex; justify-content: flex-end"
                    v-if="!is_history"
                >
                    <div style="width: 100px; padding-right: 5px">
                        <vs-button
                            flat
                            block
                            :active="true"
                            :data-testid="`create-button-${navActive}`"
                            @click="openDialogNewButton"
                        >
                            <i class="bx bx-plus"></i> New
                        </vs-button>
                    </div>
                </div>
            </vs-col>
        </vs-row>

        <section class="users">
            <vs-row justify="space-around">
                <vs-col
                    vs-type="flex"
                    vs-justify="center"
                    vs-align="center"
                    :w="`${navActive === 'k-PERMISSIONS' ? '4' : '12'}`"
                >
                    <div class="box view">
                        <vs-row justify="space-between">
                            <vs-col xs="12" sm="9" lg="9">
                                <nav-item :navItem="navItemm" @activeTab="activeTab" />
                            </vs-col>
                        </vs-row>

                        <template v-if="navActive === 'k-REMARK'">
                            <vs-row>
                                <vs-col xs="12" sm="12" lg="6">
                                    <vs-row>
                                        <vs-col w="4">
                                            <select-search-by
                                                :formKey="'date'"
                                                :border="true"
                                                :isMultiple="false"
                                                :selectedValue="filterDateByRemark"
                                                :valueData="dateParamsRemark"
                                                @updateSearchBy="updateFilterDateBy"
                                            />
                                        </vs-col>
                                        <vs-col w="8">
                                            <date-time
                                                typeInput="daterange"
                                                :name="''"
                                                :formKey="'TRIGGER_DATE'"
                                                :rules="''"
                                                :valueData="dateRange"
                                                @updateValue="updateValue"
                                            />
                                        </vs-col>
                                    </vs-row>
                                </vs-col>
                                <vs-col xs="12" sm="12" lg="6">
                                    <vs-row justify="end">
                                        <vs-col xs="6" sm="8" lg="4">
                                            <select-search-by
                                                :key="navActive"
                                                :border="true"
                                                :isMultiple="false"
                                                :valueData="searchParamsRemark"
                                                :selectedValue="searchByRemark"
                                                @updateSearchBy="updateSearchBy"
                                            />
                                        </vs-col>
                                        <vs-col xs="6" sm="4" lg="4">
                                            <search-input
                                                ref="searchInput"
                                                @searchValue="searchValue"
                                                :placeholder="searchPlaceholderRemark"
                                            />
                                        </vs-col>
                                    </vs-row>
                                </vs-col>
                            </vs-row>
                            <transition name="slide-fade">
                                <remark-list
                                    ref="refreshRemark"
                                    :dateFilter="dateRange"
                                    :filterDateBy="filterDateByRemark"
                                    :query="tempSearch"
                                    :searchBy="searchByRemark"
                                />
                            </transition>
                        </template>

                        <template v-if="navActive === 'k-RUNSHEET'">
                            <vs-row>
                                <vs-col xs="12" sm="12" lg="6">
                                    <vs-row>
                                        <vs-col w="4">
                                            <select-search-by
                                                :formKey="'date'"
                                                :border="true"
                                                :isMultiple="false"
                                                :selectedValue="filterDateByRunsheet"
                                                :valueData="dateParamsRunsheet"
                                                @updateSearchBy="updateFilterDateBy"
                                            />
                                        </vs-col>
                                        <vs-col w="8">
                                            <date-time
                                                typeInput="daterange"
                                                :rules="''"
                                                :name="''"
                                                :formKey="'TRIGGER_DATE'"
                                                :valueData="dateRange"
                                                @updateValue="updateValue"
                                            />
                                        </vs-col>
                                    </vs-row>
                                </vs-col>
                                <vs-col xs="12" sm="12" lg="6">
                                    <vs-row justify="end">
                                        <vs-col xs="6" sm="8" lg="4">
                                            <select-search-by
                                                :key="navActive"
                                                :border="true"
                                                :isMultiple="false"
                                                :selectedValue="searchByRunsheet"
                                                :valueData="searchParamsRunsheet"
                                                @updateSearchBy="updateSearchBy"
                                            />
                                        </vs-col>
                                        <vs-col xs="6" sm="4" lg="4">
                                            <search-input
                                                ref="searchInput"
                                                :placeholder="searchPlaceholderRunsheet"
                                                @searchValue="searchValue"
                                            />
                                        </vs-col>
                                    </vs-row>
                                </vs-col>
                            </vs-row>
                            <transition name="slide-fade">
                                <runsheet-list
                                    :dateFilter="dateRange"
                                    :filterDateBy="filterDateByRunsheet"
                                    :query="tempSearch"
                                    :ref="navActive"
                                    :searchBy="searchByRunsheet"
                                />
                            </transition>
                        </template>

                        <template v-if="navActive === 'k-MESSAGE'">
                            <vs-row>
                                <vs-col xs="12" sm="12" lg="6">
                                    <vs-row>
                                        <vs-col w="4">
                                            <select-search-by
                                                :formKey="'date'"
                                                :border="true"
                                                :isMultiple="false"
                                                :selectedValue="filterDateByMessage"
                                                :valueData="dateParamsMessage"
                                                @updateSearchBy="updateFilterDateBy"
                                            />
                                        </vs-col>
                                        <vs-col w="8">
                                            <date-time
                                                typeInput="daterange"
                                                :rules="''"
                                                :name="''"
                                                :formKey="'TRIGGER_DATE'"
                                                :valueData="dateRange"
                                                @updateValue="updateValue"
                                            />
                                        </vs-col>
                                    </vs-row>
                                </vs-col>
                                <vs-col xs="12" sm="12" lg="6">
                                    <vs-row justify="end">
                                        <vs-col xs="6" sm="8" lg="4">
                                            <select-search-by
                                                :ref="navActive"
                                                :border="true"
                                                :isMultiple="false"
                                                :selectedValue="searchByMessage"
                                                :valueData="searchParamsMessage"
                                                @updateSearchBy="updateSearchBy"
                                            />
                                        </vs-col>
                                        <vs-col xs="6" sm="4" lg="4">
                                            <search-input
                                                ref="searchInput"
                                                :placeholder="searchPlaceholderMessage"
                                                @searchValue="searchValue"
                                            />
                                        </vs-col>
                                    </vs-row>
                                </vs-col>
                            </vs-row>
                            <transition name="slide-fade">
                                <message-list
                                    ref="refreshMessage"
                                    :dateFilter="dateRange"
                                    :filterDateBy="filterDateByMessage"
                                    :query="tempSearch"
                                    :searchBy="searchByMessage"
                                />
                            </transition>
                        </template>
                    </div>
                </vs-col>
            </vs-row>
            <vs-row justify="flex-end">
                <vs-button class="mt-1" style="float: right" square active @click="print">
                    <i class="bx bxs-printer" /> PRINT
                </vs-button>
                <vs-button class="mt-1" style="float: right" square active @click="back">
                    <i class="bx bx-left-arrow" /> BACK
                </vs-button>
            </vs-row>
        </section>

        <dialog-remark
            :active="dialogRemarkActive"
            :closeDialog="closeDialogRemark"
            :callRefreshRemarkFunction="callRefreshRemarkFunction"
            :itemNumber="koli_number"
        />

        <dialog-messages
            :active="dialogMessageActive"
            :closeDialog="closeDialogMessage"
            :callRefreshMessageFunction="callRefreshMessageFunction"
        />
    </div>
</template>

<script>
import axios from 'axios'
import master from '@/mixins/master'

import Breadcrumb from '@/components/breadcrumb/index'
import DateTime from '@/components/input/dateTime'
import DialogMessages from '@/views/tracing/detail/message/dialogMessages'
import DialogRemark from '@/views/tracing/detail/remark/dialogRemark'
import NavItem from '@/components/navbar/navTab'
import MessageList from '@/views/tracing/detail/message/index'
import RemarkList from '@/views/tracing/detail/remark/index'
import RunsheetList from '@/views/tracing/detail/runsheet/index'
import SearchInput from '@/components/search/searchInput'
import Selector from '@/components/input/select'
import TableMaster from '@/components/table/tableMaster.vue'
import SelectSearchBy from '@/components/search/selectSearchBy'

export default {
    name: 'tracing-history',
    mixins: [master],
    components: {
        'table-master': TableMaster,
        'nav-item': NavItem,
        breadcrumb: Breadcrumb,
        'search-input': SearchInput,
        selector: Selector,
        'date-time': DateTime,
        'select-search-by': SelectSearchBy,
        'remark-list': RemarkList,
        'dialog-remark': DialogRemark,
        'runsheet-list': RunsheetList,
        'message-list': MessageList,
        'dialog-messages': DialogMessages,
    },
    computed: {
        is_history() {
            return this.$route.fullPath.includes('history')
        },
    },
    watch: {
        is_history(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.refresh()
            }
        },
    },
    data() {
        return {
            koli_number: this.$route.params.id,
            navItemm: [
                {
                    label: 'REMARK',
                    key: 'k-REMARK',
                    title: 'Remark List',
                },
                {
                    label: 'RUNSHEET',
                    key: 'k-RUNSHEET',
                    title: 'Runsheet List',
                },
                {
                    label: 'MESSAGE',
                    key: 'k-MESSAGE',
                    title: 'Message List',
                },
            ],
            navActive: 'k-REMARK',
            title: 'Remark List',
            datacolumn: [
                {
                    label: 'Menu',
                    key: 'user_permission_name',
                    type: 'text',
                    width: 'sm',
                },
                {
                    label: 'Select',
                    key: 'selected',
                    type: 'boolean',
                    width: 'xs',
                },
                {
                    label: 'Access Data',
                    key: 'permission_access_data',
                    type: 'selector',
                    width: 'auto',
                },
            ],
            tempSearch: '',
            tempFrom: '',
            tempTo: '',
            pagination: {
                limit: 20,
                page_size: 1,
                page: 1,
            },
            dialogRemarkActive: false,
            dialogMessageActive: false,
            dateRange: [],
            searchByRemark: 'user login',
            filterDateByRemark: 'create',
            searchPlaceholderRemark: 'Search User',
            searchParamsRemark: [
                {
                    label: 'User',
                    value: 'user login',
                },
                {
                    label: 'Status',
                    value: 'lov_value',
                },
                {
                    label: 'Remarks',
                    value: 'remarks',
                },
            ],
            dateParamsRemark: [
                {
                    label: 'Created Date',
                    value: 'create',
                },
            ],
            searchByRunsheet: 'runsheet',
            filterDateByRunsheet: 'create',
            searchPlaceholderRunsheet: 'Search Runsheet Number',
            searchParamsRunsheet: [
                {
                    label: 'Runsheet number',
                    value: 'runsheet',
                },
                {
                    label: 'Status',
                    value: 'status',
                },
                {
                    label: 'keterangan',
                    value: 'remarks',
                },
            ],
            dateParamsRunsheet: [
                {
                    label: 'Created Date',
                    value: 'create',
                },
            ],
            searchByMessage: 'user',
            filterDateByMessage: 'create',
            searchPlaceholderMessage: 'Search User',
            searchParamsMessage: [
                {
                    label: 'User',
                    value: 'user',
                },
                {
                    label: 'Receiver Phone',
                    value: 'receiver_phone',
                },
                {
                    label: 'Message',
                    value: 'message',
                },
            ],
            dateParamsMessage: [
                {
                    label: 'Created Date',
                    value: 'create',
                },
            ],
        }
    },
    methods: {
        callRefreshRemarkFunction() {
            this.$refs.refreshRemark.refreshRemark()
        },
        callRefreshMessageFunction() {
            this.$refs.refreshMessage.refreshMessage()
        },
        openDialogNewButton() {
            switch (this.navActive) {
                case 'k-REMARK':
                    this.dialogRemarkActive = true
                    break
                case 'k-MESSAGE':
                    this.dialogMessageActive = true
                    break
                default:
            }
        },

        updateValue(key, val) {
            this.dateRange = val || undefined
        },

        closeDialogRemark() {
            this.dialogRemarkActive = false
        },
        closeDialogMessage() {
            this.dialogMessageActive = false
        },
        print() {
            const routeData = this.$router.resolve({
                name: 'printGeneral',
                params: {
                    id: this.koli_number,
                    type: 'tracing',
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
        },

        back() {
            const baseRoute = this.is_history ? 'history' : 'outstanding'
            this.$router.push(`/tracing-${baseRoute}`)
            this.setRoutePageHistory(this.$route.meta, false)
        },
        searchValue(val) {
            this.tempSearch = val
        },
        clearSearch() {
            this.$refs.searchInput.clear()
            this.dateRange = []
        },
        activeTab(val) {
            this.navActive = val
            this.clearSearch()
            let item = this.navItemm.filter((item) => {
                return item.key == val
            })
            this.title = item[0].title
        },
        updateSearchBy(key, val) {
            switch (this.navActive) {
                case 'k-REMARK':
                    this.searchByRemark = val
                    this.searchPlaceholderRemark = key
                    break
                case 'k-RUNSHEET':
                    this.searchByRunsheet = val
                    this.searchPlaceholderRunsheet = key
                    break
                case 'k-MESSAGE':
                    this.searchByMessage = val
                    this.searchPlaceholderMessage = key
                    break
                default:
            }
        },
        updateFilterDateBy(key, val) {
            switch (this.navActive) {
                case 'k-REMARK':
                    this.filterDateByRemark = val
                    break
                case 'k-RUNSHEET':
                    this.filterDateByRunsheet = val
                    break
                case 'k-MESSAGE':
                    this.filterDateByMessage = val
                    break
                default:
            }
        },
    },
}
</script>

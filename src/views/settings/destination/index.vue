<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{ title }}</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3">
                <div style="position: relative; display: flex; justify-content: flex-end">
                    <div style="width: 100px; padding-right: 5px">
                        <vs-button
                            flat
                            block
                            :active="true"
                            :data-testid="`create-button-${navActive}`"
                            @click="openDialog"
                        >
                            <i class="bx bx-plus"></i> New
                        </vs-button>
                    </div>
                </div>
            </vs-col>
        </vs-row>
        <section class="nodes">
            <div class="box view">
                <div class="nav-box">
                    <vs-row justify="space-between">
                        <vs-col xs="12" sm="6" lg="8">
                            <nav-item :navItem="navItemm" @activeTab="activeTab" />
                        </vs-col>
                        <vs-col xs="12" sm="6" lg="4">
                            <template v-if="navActive === 'DestinationZipCode'">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by
                                            key="searchByDestinationZipCode"
                                            :border="true"
                                            :isMultiple="false"
                                            :selectedValue="searchByDestinationZipCode"
                                            :valueData="searchParamsDestinationZipCode"
                                            @updateSearchBy="updateSearchBy"
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input
                                            class="search-input"
                                            key="searchInput"
                                            ref="searchInput"
                                            :placeholder="searchPlaceholderDestinationZipCode"
                                            @searchValue="searchValue"
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                            <template v-if="navActive === 'DestinationSortingLov'">
                                <vs-row>
                                    <vs-col vs-align="center" w="6">
                                        <select-search-by
                                            key="searchByDestinationSortingLov"
                                            :border="true"
                                            :isMultiple="false"
                                            :selectedValue="searchByDestinationSortingLov"
                                            :valueData="searchParamsDestinationSortingLov"
                                            @updateSearchBy="updateSearchBy"
                                        />
                                    </vs-col>
                                    <vs-col vs-align="center" w="6">
                                        <search-input
                                            class="search-input"
                                            key="searchInput"
                                            ref="searchInput"
                                            :placeholder="searchPlaceholderDestinationSortingLov"
                                            @searchValue="searchValue"
                                        />
                                    </vs-col>
                                </vs-row>
                            </template>
                        </vs-col>
                    </vs-row>
                </div>
                <template v-if="navActive === 'DestinationZipCode'">
                    <destination-zip-code
                        :ref="navActive"
                        :query="tempSearch"
                        :searchBy="searchByDestinationZipCode"
                    />
                </template>
                <template v-else-if="navActive === 'DestinationSortingLov'">
                    <destination-sorting-lov
                        :ref="navActive"
                        :query="tempSearch"
                        :searchBy="searchByDestinationSortingLov"
                    />
                </template>
            </div>
        </section>
        <dialog-create-edit-zip-code
            title="Create Destination Zip Code Mapping"
            :active="dialogActiveDestinationZipCode"
            :closeDialog="closeDialog"
            @refresh="refresh"
        />
        <dialog-create-edit-sorting-lov
            title="Create Destination Sorting LOV"
            :active="dialogActiveDestinationSortingLov"
            :closeDialog="closeDialog"
            @refresh="refresh"
        />
    </div>
</template>
<script>
import Breadcrumb from '@/components/breadcrumb/index'
import NavItem from '@/components/navbar/navTab'
import SearchInput from '@/components/search/searchInput'
import SelectSearchBy from '@/components/search/selectSearchBy'

import DialogCreateEditZipCode from '@/views/settings/destination/destinationZipCode/dialogCreateEdit'
import DialogCreateEditSortingLov from '@/views/settings/destination/destinationSortingLov/dialogCreateEdit'
import ZipCodeTable from '@/views/settings/destination/destinationZipCode/index'
import SortingLovTable from '@/views/settings/destination/destinationSortingLov/index'

export default {
    name: 'destination-zip-code-index',
    components: {
        'nav-item': NavItem,
        breadcrumb: Breadcrumb,
        'search-input': SearchInput,
        'destination-zip-code': ZipCodeTable,
        'dialog-create-edit-zip-code': DialogCreateEditZipCode,
        'destination-sorting-lov': SortingLovTable,
        'dialog-create-edit-sorting-lov': DialogCreateEditSortingLov,
        'select-search-by': SelectSearchBy,
    },
    data() {
        return {
            navItemm: [
                {
                    label: 'Destination Zip Code',
                    key: 'DestinationZipCode',
                    title: 'Destination Zip Code',
                },
                {
                    label: 'Destination Sorting LOV',
                    key: 'DestinationSortingLov',
                    title: 'Destination Sorting LOV',
                },
            ],
            title: 'Destination Zip Code',
            navActive: 'DestinationZipCode',
            tempSearch: '',
            dialogActiveDestinationZipCode: false,
            searchPlaceholderDestinationZipCode: 'Search Reference Value',
            searchByDestinationZipCode: 'reference_value',
            searchParamsDestinationZipCode: [
                {
                    label: 'Reference Value',
                    value: 'reference_value',
                },
                {
                    label: 'Reference Entity',
                    value: 'reference_entity',
                },
                {
                    label: 'Zip Code',
                    value: 'zip_code',
                },
            ],
            dialogActiveDestinationSortingLov: false,
            searchPlaceholderDestinationSortingLov: 'Search Reference Value',
            searchByDestinationSortingLov: 'reference_to',
            searchParamsDestinationSortingLov: [
                {
                    label: 'Reference To',
                    value: 'reference_to',
                },
                {
                    label: 'Reference Entity',
                    value: 'reference_entity',
                },
                {
                    label: 'Reference Value',
                    value: 'reference_value',
                },
                {
                    label: 'Item Type',
                    value: 'item_type',
                },
                {
                    label: 'Destination Node Code',
                    value: 'destination_node_code',
                },
                {
                    label: 'Created By',
                    value: 'created_by',
                },
            ],
        }
    },
    methods: {
        refresh() {
            let el = this.refreshInject
            this.$refs[el].refresh()
        },
        searchValue(val) {
            this.tempSearch = val
        },
        clearSearch() {
            this.$refs.searchInput.clear()
        },
        activeTab(val) {
            this.navActive = val
            this.clearSearch()

            let item = this.navItemm.filter((item) => {
                return item.key == val
            })
            this.title = item[0].title
        },
        openDialog() {
            switch (this.navActive) {
                case 'DestinationZipCode':
                    this.dialogActiveDestinationZipCode = true
                    break
                case 'DestinationSortingLov':
                    this.dialogActiveDestinationSortingLov = true
                    break
                default:
            }
            this.refreshInject = this.navActive
        },
        closeDialog() {
            switch (this.navActive) {
                case 'DestinationZipCode':
                    this.dialogActiveDestinationZipCode = false
                    break
                case 'DestinationSortingLov':
                    this.dialogActiveDestinationSortingLov = false
                    break
                default:
            }
        },
        updateSearchBy(key, val) {
            switch (this.navActive) {
                case 'DestinationZipCode':
                    this.searchByDestinationZipCode = val
                    this.searchPlaceholderDestinationZipCode = key
                    this.clearSearch()
                    break
                case 'DestinationSortingLov':
                    this.searchByDestinationSortingLov = val
                    this.searchPlaceholderDestinationSortingLov = key
                    this.clearSearch()
                    break
                default:
            }
        },
    },
}
</script>

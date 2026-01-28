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
                        <vs-button flat square block :active="true" @click="openDialog">
                            NEW
                        </vs-button>
                    </div>
                </div>
            </vs-col>
        </vs-row>

        <section class="nodes">
            <div class="box view">
                <div class="nav-box">
                    <vs-row justify>
                        <vs-col xs="6" sm="3" lg="3" offset="9" class="mb-15">
                            <search-input ref="searchInput" @searchValue="searchValue" />
                        </vs-col>
                    </vs-row>
                </div>
                <template>
                    
                        <CostToCostList :ref="'sostToCostList'" :query="tempSearch" />
                    
                </template>
            </div>
        </section>

        <!-- dialog new edit costing Report-->
        <dialogCreateEditCostingReport
            :active="dialogNewEditCostingReport"
            @refresh="refresh"
            :withSchedule="false"
            :closeDialog="closeDialogCostingReport"
            title="Create Cost To Cost Report"
        />
    </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'
import NavItem from '@/components/navbar/navTab'
import Breadcrumb from '@/components/breadcrumb/index'
import SearchInput from '@/components/search/searchInput'

import CostToCostList from '@/views/costToCost/report/costToCostReportList'

import DialogCreateEditCostingReport from '@/views/costToCost/report/dialogCreateEditCostingReport'

export default {
    name: 'CostToCost-Report',
    mixins: [master],
    components: {
        'nav-item': NavItem,
        breadcrumb: Breadcrumb,
        'search-input': SearchInput,
        CostToCostList: CostToCostList,
        dialogCreateEditCostingReport: DialogCreateEditCostingReport,
    },
    data() {
        return {
            title: 'Report',
            tempSearch: '',
            dialogNewEditCostingReport: false,
        }
    },
    methods: {
        refresh() {
            this.$refs.costToCostList.refresh() // trigger function refresh form dari luar component list
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
            this.dialogNewEditCostingReport = true
        },
        closeDialogCostingReport() {
            this.dialogNewEditCostingReport = false
        },

        updateNode(val) {},
    },
    mounted() {},
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
</style>

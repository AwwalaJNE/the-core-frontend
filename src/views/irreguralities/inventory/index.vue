<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
        </vs-row>

        
        <section class="users">
            <vs-row justify="space-around">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" :w="`${navActive === 'k-PERMISSIONS'?'4':'12'}`">
                    <div class="box view">

                        <vs-row justify="space-between">
                            <vs-col xs="12" sm="6" lg="8">
                                <nav-item :navItem="navItemm" @activeTab="activeTab" />
                            </vs-col>
                            <vs-col xs="12" sm="6" lg="4">
                                <template v-if="navActive === 'k-ACTIVE'">
                                    <vs-row>
                                        <vs-col vs-align="center" w="6">
                                            <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy"  :selectedValue="searchBy" :valueData="searchParams"/>
                                        </vs-col>
                                        <vs-col vs-align="center" w="6">
                                            <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholder" class="search-input"/>
                                        </vs-col>
                                    </vs-row>
                                </template>
                                <template v-if="navActive === 'k-HISTORY'" >
                                    <vs-row>
                                        <vs-col vs-align="center" w="6">
                                            <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy"  :selectedValue="searchByBag" :valueData="searchParamsBag"/>
                                        </vs-col>
                                        <vs-col vs-align="center" w="6">
                                            <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholderBag" class="search-input"/>
                                        </vs-col>
                                    </vs-row>
                                </template>
                            </vs-col>
                        </vs-row>


                        <template v-if="navActive === 'k-ACTIVE'">
                            <vs-row >
                                <vs-col vs-align="center" xs="4" sm="3" lg="2">
                                    <select-search-by ref="" :isMultiple="false" :border="true" @updateFilterDateBy="updateFilterDateBy" :valueData="dateParams" :selectedValue="filterDateBy"/>
                                </vs-col>
                                <vs-col xs="8" sm="5" lg="6">
                                    <date-time
                                        :name="''"
                                        :rules="''"
                                        :formKey="'TRIGGER_DATE'"
                                        :valueData="tempDate"
                                        typeInput="daterange"
                                        @updateValue="searchDate" 
                                    />
                                </vs-col>
                            </vs-row>
                            <transition name="slide-fade">
                                <active-list :ref="navActive" :dateFilter="tempDate" :query="tempSearch" querySearch="searchBy" :queryDate="filterDateBy" />
                            </transition>
                        </template>
                        <template v-if="navActive === 'k-HISTORY'">
                            <vs-row >
                                <vs-col vs-align="center" xs="4" sm="3" lg="2">
                                    <select-search-by :isMultiple="false" :border="true" @updateFilterDateBy="updateFilterDateBy" :valueData="dateParamsBag" :selectedValue="filterDateByBag"/>
                                </vs-col>
                                <vs-col xs="8" sm="5" lg="6">
                                    <date-time
                                        :name="''"
                                        :rules="''"
                                        :formKey="'TRIGGER_DATE'"
                                        :valueData="tempDate"
                                        typeInput="daterange"
                                        @updateValue="searchDate" 
                                    />
                                </vs-col>
                            </vs-row>
                            <transition name="slide-fade">
                                <history-list :ref="navActive" :query="tempSearch" :dateFilter="tempDate" :searchDateBy="filterDateBy" :searchBy="searchByBag"/>
                            </transition>
                        </template>
                        
                    </div>
                </vs-col>
                
            </vs-row>
        </section>

    </div>
</template>
<script>
import master from "@/mixins/master"
import TableMaster from "@/components/table/tableMaster.vue"
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
import Selector from "@/components/input/select"
import SelectSearchBy from "@/components/search/selectSearchBy"
import DateTime from "@/components/input/dateTime"

// Active List
import ActiveList from "@/views/irreguralities/inventory/activeList/index"

// History List
import HistoryList from "@/views/irreguralities/inventory/historyList/index"

export default {
    name:"Users",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "active-list":ActiveList ,
        "history-list": HistoryList,
        "selector": Selector,
        "select-search-by": SelectSearchBy,
        "date-time": DateTime,
    },
    data() {
        return {
            navItemm: [
                {
                    label: "ACTIVE",
                    key: "k-ACTIVE",
                    title: "Irregularity Active List"
                },
                {
                    label: "HISTORY",
                    key: "k-HISTORY",
                    title: "Irregularity History List"
                }
            ],
            navActive: "k-ACTIVE",
            title: "Irregularity Active List",
            tempSearch: "",
            tempDate: [],
            refreshInject:"",
            searchBy:"koli_number",
            searchPlaceholder: "Search Koli",
            searchParams: [
                {
                    label: "Koli Number",
                    value: "koli_number",

                },
                {
                    label: "Bag Number",
                    value: "bag_number",

                },
                {
                    label: "Status Code",
                    value: "status_code",

                },
                {
                    label: "Type",
                    value: "type",
                },
            ],
            searchByBag:"koli_number",
            searchPlaceholderBag: "Search Koli",
            searchParamsBag: [
                {
                    label: "Koli Number",
                    value: "koli_number",

                },
                {
                    label: "Bag Number",
                    value: "bag_number",

                },
                {
                    label: "Status Code",
                    value: "status_code",

                },
                {
                    label: "Type",
                    value: "type",
                },
            ],
            filterDateBy: "create",
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'create'
                },
                {
                    label: 'Approved Date',
                    value: 'approve'
                }
            ],
            filterDateByBag: "create",
            dateParamsBag: [
                {
                    label: 'Created Date',
                    value: 'create'
                },
                {
                    label: 'Approved Date',
                    value: 'approve'
                }
            ],
        }
    },
    methods: {
        updateSearchBy(key, val) {
            switch (this.navActive) {
                case "k-ACTIVE":
                    this.searchBy = val;
                    this.searchPlaceholder = key;
                    break;
                case "k-HISTORY":
                    this.searchByBag = val;
                    this.searchPlaceholderBag = key;
                    break;
                default:
            }
        },
        updateFilterDateBy(key, val) {
            switch (this.navActive) {
                case "k-ACTIVE":
                    this.filterDateBy = val;
                    break;
                case "k-HISTORY":
                    this.filterDateByBag = val;
                    break;
                default:
            }
        },
        refresh(){
            let el = this.refreshInject
            this.$refs[el].refresh()
        },
        searchValue (val) {
            this.tempSearch = val
        },
        searchDate(key, val) {
            this.tempDate = val;
        },
        clearSearch() {
            this.$refs.searchInput.clear()
            this.tempDate = [];
        },
        activeTab(val) {
            this.navActive = val
            this.clearSearch()
            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title
        },
    },
}
</script>
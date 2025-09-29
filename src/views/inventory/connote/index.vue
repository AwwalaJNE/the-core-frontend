<template>
    <div>
        <section class="users">
            <vs-row justify="space-around">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" :w="`${navActive === 'k-PERMISSIONS'?'4':'12'}`">
                    <div class="box view">

                        <vs-row justify="space-between">
                            <vs-col xs="12" sm="6" lg="8">
                                <nav-item :navItem="navItemm" @activeTab="activeTab" />
                            </vs-col>
                            <vs-col xs="12" sm="6" lg="4">
                                <template v-if="navActive === 'k-CONNOTE'">
                                    <vs-row>
                                        <vs-col vs-align="center" w="6">
                                            <select-search-by-cnote :isMultiple="false" :border="true" @updateSearchBy="updateSearchByCnote"  :selectedValue="searchByCnote" />
                                        </vs-col>
                                        <vs-col vs-align="center" w="6">
                                            <search-input ref="searchInput" @handleSearch="handleSearch" @searchValue="searchValue" :placeholder="searchPlaceholderCnote" class="search-input" :isNumeric="searchByDataTypeCnote"/>
                                        </vs-col>
                                    </vs-row>
                                </template>
                                <template v-if="navActive === 'k-KOLI'">
                                    <vs-row>
                                        <vs-col vs-align="center" w="6">
                                            <select-search-by-connote :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy"  :selectedValue="searchBy"/>
                                        </vs-col>
                                        <vs-col vs-align="center" w="6">
                                            <search-input ref="searchInput" @handleSearch="handleSearch" @searchValue="searchValue" :placeholder="searchPlaceholder" class="search-input" :isNumeric="searchByDataType"/>
                                        </vs-col>
                                    </vs-row>
                                </template>
                            </vs-col>
                        </vs-row>


                        <template v-if="navActive === 'k-CONNOTE'">
                          <vs-row >
                            <vs-col vs-align="center" xs="6" sm="2" lg="2">
                                <select-status-bag-cnote ref="is_in_bag" :isMultiple="false" :border="true" @updateStatusBag="updateStatusBagCnote" />
                            </vs-col>
                            <vs-col vs-align="center" xs="6" sm="2" lg="2">
                                <select-status-inventory-cnote :isMultiple="false" :border="true" @updateStatusinventory="updateStatusinventoryCnote" />
                            </vs-col>
                            <vs-col vs-align="center" xs="6" sm="3" lg="2">
                                <select-filter-date-by-cnote :isMultiple="false" :border="true" @updateFilterDateBy="updateFilterDateBy" />
                            </vs-col>
                            <vs-col xs="6" sm="5" lg="6">
                                <date-time
                                    :name="''"
                                    :rules="''"
                                    :formKey="'DATE_TIME_WITHOUT_SECONDS'"
                                    :valueData="tempDate"
                                    typeInput="datetimerange"
                                    @updateValue="searchDate" 
                                />
                            </vs-col>
                          </vs-row>
                            <transition name="slide-fade">
                                <connote-list :ref="navActive" :dateFilter="tempDate" :query="tempSearch" :queryInventory="statusinventorycnote" :queryBag="status_bag_cnote" :querySearch="searchByCnote" :queryDate="filterDateBy" />
                            </transition>
                        </template>
                        <template v-if="navActive === 'k-KOLI'">
                          <vs-row >
                            <vs-col vs-align="center" xs="6" sm="2" lg="2">
                                <select-status-bag ref="is_in_bag" :isMultiple="false" :border="true" @updateStatusBag="updateStatusBag" />
                            </vs-col>
                            <vs-col vs-align="center" xs="6" sm="2" lg="2">
                                <select-status-inventory :isMultiple="false" :border="true" @updateStatusinventory="updateStatusinventory" />
                            </vs-col>
                            <vs-col vs-align="center" xs="6" sm="3" lg="2">
                                <select-filter-date-by :isMultiple="false" :border="true" @updateFilterDateBy="updateFilterDateBy" />
                            </vs-col>
                            <vs-col xs="6" sm="5" lg="6">
                                <date-time
                                    :name="''"
                                    :rules="''"
                                    :formKey="'DATE_TIME_WITHOUT_SECONDS'"
                                    :valueData="tempDate"
                                    typeInput="datetimerange"
                                    @updateValue="searchDate" 
                                />
                            </vs-col>
                          </vs-row>
                            <transition name="slide-fade">
                                <koli-list :ref="navActive" :dateFilter="tempDate" :query="tempSearch" :queryInventory="statusinventory" :queryBag="status_bag" :querySearch="searchBy" :queryDate="filterDateBy" />
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
import SelectBagStatusVue from "@/views/inventory/connote/item/selectBagStatus"
import SelectInventoryVue from "@/views/inventory/connote/item/selectInventoryStatus"
import SelectSearchByConnote from "@/views/inventory/connote/item/selectSearchBy"
import SelectSearchBy from "@/components/search/selectSearchBy"
import SelectFilterDateBy from "@/views/inventory/connote/item/selectFilterDateBy"
import DateTime from "@/components/input/dateTime"
import SelectBagStatusConnote from "@/views/inventory/connote/connote/selectBagStatus"
import SelectInventoryConnote from "@/views/inventory/connote/connote/selectInventoryStatus"
import SelectSearchByCnote from "@/views/inventory/connote/connote/selectSearchBy"
import SelectFilterDateByConnote from "@/views/inventory/connote/connote/selectFilterDateBy"


// Connote
import ConnoteList from "@/views/inventory/connote/connote/cnoteList"
// Koli
import KoliList from "@/views/inventory/connote/item/connoteList"


export default {
    name:"Inventory Item",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "connote-list": ConnoteList,
        "koli-list": KoliList,
        "selector": Selector,
        "select-status-bag": SelectBagStatusVue,
        "select-status-inventory": SelectInventoryVue,
        "select-search-by-connote": SelectSearchByConnote,
        "select-search-by": SelectSearchBy,
        "select-filter-date-by": SelectFilterDateBy,
        "date-time": DateTime,
        "select-status-bag-cnote": SelectBagStatusConnote,
        "select-status-inventory-cnote": SelectInventoryConnote,
        "select-search-by-cnote": SelectSearchByCnote,
        "select-filter-date-by-cnote": SelectFilterDateByConnote,
    },
    data() {
        return {
            navItemm: [
                {
                    label: "KOLI",
                    key: "k-KOLI",
                    title: "Koli List"
                },
                {
                    label: "CONNOTE",
                    key: "k-CONNOTE",
                    title: "Connote List"
                },
            ],
            navActive: "k-KOLI",
            title: "Connote List",
            loading: false,
            dataItem: {},
            tempSearch: "",
            tempDate: [],
            pagination: {
                limit:5,
                page_size: 1,
                page: 1
            },
            refreshInject:"k-KOLI",
            status_bag:"",
            statusinventory:"",
            status_bag_cnote:"",
            statusinventorycnote:"",
            searchBy:"connote",
            searchByCnote:"connote",
            searchPlaceholder: "Search Koli",
            searchPlaceholderCnote: "Search Connote",
            filterDateBy: "create",
            dateParams: [
                {
                    label: 'Created Date',
                    value: 'create'
                },
                {
                    label: 'Opened Date',
                    value: 'opened'
                },
                {
                    label: 'Received Date',
                    value: 'received'
                }
            ],
            searchByDataType: false,
            searchByDataTypeCnote: false,
        }
    },
    methods: {
        updateStatusBag(key,val) {
          this.status_bag = val;
        },
        updateStatusBagCnote(key,val) {
          this.status_bag_cnote = val;
        },
        updateStatusinventory(key,val) {
          this.statusinventory = val;
        },
        updateStatusinventoryCnote(key,val) {
          this.statusinventorycnote = val;
        },
        updateSearchBy(key,val, dataType) {
            this.searchBy = val;
            this.searchPlaceholder = key;
            this.searchByDataType = dataType;
        },
        updateSearchByCnote(key,val, dataType) {
            this.searchByCnote = val;
            this.searchPlaceholderCnote = key;
            this.searchByDataTypeCnote = dataType
        },
        updateFilterDateBy(key,val) {
          this.filterDateBy = val;

          if (this.tempDate.length !== 0) {
                this.tempDate = [];
            }
        },
        refresh(){
            let el = this.refreshInject
            this.$refs[el].refresh() // trigger function refresh form dari luar component list
        },
        searchValue (val) {
            this.tempSearch = val
        },
        searchDate(key, val) {
            this.tempDate = val;
        },
        clearSearch() {
            this.tempSearch = ""
            this.$refs.searchInput.clear()
            this.tempDate = []
        },
        activeTab(val) {
            this.navActive = val
            this.clearSearch()
            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title
            this.refreshInject = this.navActive
        },
        actionLimit(val){
            this.pagination.limit = val
        },
        actionPagination(val) {
            this.pagination.page = val
        },
        handleSearch() {
            this.$nextTick(() => {
                this.refresh();
                this.$refs.searchInput.clear();
            });
        }
    },
}
</script>
<style lang="scss">
    .users{
        min-height: 50vh;
        .view{
            min-height: 400px;
        }
        .nav-box{
            position: relative;
            top: 0;
            left: 0;
            width: auto;
            max-width: 350px;
        }
        .search-input{
            @include for-phone-only{
                margin-bottom: 1rem;
            }
        }
    }
</style>
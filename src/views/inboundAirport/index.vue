<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
            <template v-if="navActive === 'k-PREALERT'">
                <vs-col xs="6" sm="3" lg="3">
                    <div style="position:relative;display:flex;justify-content: flex-end;">
                        <div style="width: 100px;padding-right: 5px;">
                            <vs-button
                            flat
                            square
                            block
                            :active="true"
                            @click="openDialog"
                            > RECEIVING
                            </vs-button>
                        </div>
                    </div>
                </vs-col>
            </template>
        </vs-row>
        <section class="users">
            <vs-row justify="space-around">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" :w="`${navActive === 'k-PERMISSIONS'?'4':'12'}`">
                    <div class="box view">
                        <vs-row justify="space-between">
                            <vs-col xs="12" sm="6" lg="8">
                                <nav-item ref="navItemParent" :navItem="navItemm" @activeTab="activeTab" />
                            </vs-col>
                            <vs-col xs="12" sm="6" lg="4">
                                <template v-if="navActive === 'k-PREALERT'">
                                    <vs-row justify="end">
                                        <vs-col xs="12" sm="4" lg="5">
                                            <select-search-by-prealert @updateSearchBy="updateSearchBy" />
                                        </vs-col>
                                        <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholderPrealert" />
                                    </vs-row>
                                </template>
                                <template v-if="navActive === 'k-SURATJALAN'" >
                                    <vs-row justify="end">
                                        <vs-col xs="6" sm="8" lg="5">
                                            <select-search-by-sj @updateSearchBy="updateSearchBy" />
                                        </vs-col>
                                        <search-input ref="searchInputSJ" @searchValue="searchValue" :placeholder="searchPlaceholderSJ" />
                                    </vs-row>
                                </template>
                            </vs-col>
                        </vs-row>
                        <template v-if="navActive === 'k-PREALERT'">
                            <transition name="slide-fade">
                                <inbound-incoming 
                                    :ref="navActive"
                                    :query="tempSearch"
                                    :searchBy="searchByPrealert"
                                    @redirectSJ="redirectSJ"
                                />
                            </transition>
                        </template>
                        <template v-if="navActive === 'k-SURATJALAN'">
                            <transition name="slide-fade">
                                <sj-list
                                    :ref="navActive"
                                    :query="tempSearch"
                                    :searchBy="searchBySJ"
                                />
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
import SelectSearchByPrealert from "@/views/inboundAirport/selectSearchByPrealert"
import SelectSearchBySJ from "@/views/inboundAirport/selectSearchBySJ"

import InboundIncoming from "@/views/inboundAirport/prealert/"
import SuratJalan from "@/views/inboundAirport/suratJalan"

export default {
    name:"Receiving Bandara",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "select-search-by-prealert": SelectSearchByPrealert,
        "select-search-by-sj": SelectSearchBySJ,
        "inbound-incoming": InboundIncoming,
        "sj-list": SuratJalan,
    },
    data() {
        return {
            navItemm: [
                {
                    label: "PREALERT",
                    key: "k-PREALERT",
                    title: "Receiving Bandara"
                },
                {
                    label: "SURAT JALAN",
                    key: "k-SURATJALAN",
                    title: "Surat Jalan"
                }
            ],
            navActive: "k-PREALERT",
            title: "Receiving Bandara",
            searchBySJ: "manifest_do_number",
            searchByPrealert: "inbound_number",
            searchPlaceholderPrealert: "Search Inbound Number",
            searchPlaceholderSJ: "Search Manifest DO Number",
            tempSearch: ""
        }
    },
    watch: {
        navActive(val) {
            if (val) {
                switch(val) {
                    case 'k-PREALERT':
                        this.searchPlaceholderPrealert = "Search Inbound Number"
                        break
                    case 'k-SURATJALAN':
                        this.searchPlaceholderSJ = "Search Manifest DO Number"
                        break
                    default:
                }
            }
        }
    },
    methods: {
        updateSearchBy(id,key,val) {
            switch(id) {
                case "PREALERT":
                    this.searchPlaceholderPrealert = key
                    this.searchByPrealert = val
                    break
                case "SJ":
                    this.searchPlaceholderSJ = key
                    this.searchBySJ = val
                    break
                default:
            }
        },
        searchValue (val) {
            this.tempSearch = val
        },
        clearSearch() {
            this.$refs.searchInput.clear()
        },
        activeTab(val) {
            this.navActive = val
            this.clearSearch()
        },
        openDialog(){
            this.$refs['k-PREALERT'].dialogSuratJalan = true
        },
        redirectSJ(val){
            const newActiveButton = document.querySelector(`.vs-navbar__item.k-SURATJALAN`);
            if (newActiveButton) {
                newActiveButton.click()
            }
            this.clearSearch()
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
        .search-input{
            @include for-phone-only{
                margin-bottom: 1rem;
            }
        }
    }
</style>
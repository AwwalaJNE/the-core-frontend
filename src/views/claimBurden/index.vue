<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{ title }}</h2>
                </div>
            </vs-col>
        </vs-row>
        <section class="nodes">
            <div class="box view">
                <div class="nav-box">
                    <vs-row justify="space-between">
                        
                    </vs-row>
                </div>
                    <transition name="slide-fade">
                        <claim-table
                            ref="Stock"
                            :query="tempSearch"
                            :searchBy="searchByClaimAndBurden"
                        />
                    </transition>
            </div>
        </section>
       
    </div>
</template>

<script>
import Breadcrumb from "@/components/breadcrumb/index";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";
// import StockTable from "@/views/settings/suratMuatan/stock/index";
import claimTable from "@/views/claimBurden/claim/index";

export default {
    name: "Claim and Charge",
    components: {
        "search-input": SearchInput,
        "breadcrumb": Breadcrumb,
        "claim-table": claimTable,
        "select-search-by": SelectSearchBy,
    },
    data() {
        return {
            title: "Claim and Charge",
            tempSearch: "",
            dialogActiveStock: false,
            searchPlaceholderCalimAndBurden: "Connote",
            searchByClaimAndBurden: "connote",
            searchParamsClaimAndBurden: [
                {
                    label: "Connote",
                    value: "connote"
                },
                {
                    label: "Status",
                    value: "status"
                },
                {
                    label: "Reason",
                    value: "reason"
                }
            ]
        };
    },
    methods: {
        refresh() {
            this.$refs.Stock.refresh();
        },
        searchValue(val) {
            this.tempSearch = val;
        },
        clearSearch() {
            this.$refs.searchInput.clear();
        },
        openDialog() {
            this.dialogActiveStock = true;
        },
        closeDialog() {
            this.dialogActiveStock = false;
        },
        // updateSearchBy(key, val) {
        //     this.searchByClaimAndBurden = val;
        //     this.searchPlaceholderCalimAndBurden = key;
        //     this.clearSearch();
        // },
    },
};
</script>

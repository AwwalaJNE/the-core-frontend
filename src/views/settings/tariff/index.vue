<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3">
                <div style="position:relative;display:flex;justify-content: flex-end;">
                    <div style="width: 100px;padding-right: 5px;">
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
                        <vs-col xs="6" sm="9" lg="7">
                            <nav-item :navItem="navItemm" @activeTab="activeTab" />
                        </vs-col>
                        <vs-col xs="2" sm="2" lg="2" >
                    <template v-if="arrFilterTariffGroup">
                      <vs-select
                          class="m-select"
                          filter
                          :multiple="false"
                          placeholder="Tariff Group"
                          v-model="filterTariffGroup"
                          :border="true"
                          @change="(asas) =>{

                          }"
                      >
                        <template>
                          <vs-option
                              v-for="(item,key) in arrFilterTariffGroup"
                              :key="key"
                              :label="item.label"
                              :value="item.value">
                            {{item.label}}
                          </vs-option>
                        </template>

                      </vs-select>

                    </template>
                  </vs-col>
                    </vs-row>
                </div>
                <template v-if="navActive === 'k-BASE-TARIFF'">
                    
                        <base-tariff :ref="navActive" :query="tempSearch"/>
                    
                </template>
                <!-- <template v-else-if="navActive === 'k-SPECIAL-TARIFF'">
                    
                        <special-tariff :ref="navActive" :query="tempSearch"/>
                    
                </template> -->
                <template v-if="navActive === 'k-DISCOUNT'">
                    
                        <discount-tariff :ref="navActive" :query="tempSearch"/>
                    
                </template>

            </div>
        </section>

        <!--Create Tariff-->
            <dialog-create-edit-Tariff
            :active="dialogTariff" 
            @refresh="refresh"
            :closeDialog="closeDialogTariff"
            title="Create Tariff"
            />
        <!--Create SpecialTariff-->
            <dialog-create-edit-SpecialTariff
            :active="dialogTariffSpecial" 
            @refresh="refresh"
            :closeDialog="closeDialogTariffSpecial"
            title="Create Tariff Special"
            />
        <!--Create SpecialTariff-->
            <dialog-create-edit-Discounttariff
            :active="dialogDiscount" 
            @refresh="refresh"
            :closeDialog="closeDialogDiscount"
            title="Create Discount"
            />
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"

import BaseTariff from "@/views/settings/tariff/baseTariff"
import SpecialTariff from "@/views/settings/tariff/specialTariff"
import DiscountTariff from "@/views/settings/tariff/discountTariff"

import dialogCreateEditTariff from "@/views/settings/tariff/baseTariff/dialogCreateEditTariff"
import dialogCreateEditSpecialTariff from "@/views/settings/tariff/specialTariff/dialogCreateEditSpecialTariff"
import dialogCreateEditDiscountTariff from "@/views/settings/tariff/discountTariff/dialogCreateEditDiscountTariff"

export default {
    name:"tariff-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "base-tariff": BaseTariff,
        "special-tariff": SpecialTariff,
        "discount-tariff": DiscountTariff,
        // "role-list": RoleList,
        "dialog-create-edit-Tariff": dialogCreateEditTariff,
        "dialog-create-edit-SpecialTariff": dialogCreateEditSpecialTariff,
        "dialog-create-edit-Discounttariff": dialogCreateEditDiscountTariff,
    },
    data() {
        return {
            navItemm: [
                {
                    label: "BASE TARIFF",
                    key: "k-BASE-TARIFF",
                    title: "Base Tariff List"
                },
                // {
                //     label: "SPECIAL TARIFF",
                //     key: "k-SPECIAL-TARIFF",
                //     title: "Special Tariff List"
                // },
                {
                    label: "DISCOUNT",
                    key: "k-DISCOUNT",
                    title: "Discount List"
                }
            ],
            title:"Tariff",
            navActive: "k-BASE-TARIFF",
            tempSearch: "",
            dialogTariff: false,
            dialogTariffSpecial: false,
            dialogDiscount: false,
            arrFilterTariffGroup:null,
            filterTariffGroup:null,
        }
    },
    methods: {
        refresh(){
            let el = this.refreshInject
            this.getTariffGroup()
            this.$refs[el].refresh() // trigger function refresh form dari luar component list
        },
        async getTariffGroup(){

            await axios.get(this.URL.tariff_group +`?n=${this.listenNodeId}`,this.Helper.header())
            .then(res => {
                this.arrFilterTariffGroup = res.data.data.map(function(value){
                    return {
                        label:value.tariff_group,
                        value:value.tariff_group
                    };
                });

            });
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

            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title
        },
        openDialog(){
            switch(this.navActive) {
                case "k-BASE-TARIFF":
                    this.dialogTariff = true
                    break;
                case "k-SPECIAL-TARIFF":
                    this.dialogTariffSpecial = true
                    break;
                case "k-DISCOUNT":
                    this.dialogDiscount = true
                default:

                    // code block
            }
            this.refreshInject = this.navActive
        },
        closeDialogTariff() {
            this.dialogTariff = false
        },
        closeDialogTariffSpecial() {
            this.dialogTariffSpecial = false
        },
        closeDialogDiscount(){
            this.dialogDiscount = false
        }
    },
}
</script>
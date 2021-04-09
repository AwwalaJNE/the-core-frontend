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
                        square
                        block
                        :active="true"
                        @click="openDialog"
                        > NEW
                        </vs-button>
                    </div>
                </div>
            </vs-col>
        </vs-row>

        <section class="nodes">
            <div class="box view">
              <div class="nav-box">
                <vs-row justify>
                  <vs-col xs="6" sm="3" lg="3" offset="9"  class="mb-15">
                    <search-input ref="searchInput" @searchValue="searchValue"/>
                  </vs-col>
                </vs-row>
              </div>
                <template>
                    <transition name="slide-fade">
                        <CostToCostList :ref="'sostToCostList'"  :query="tempSearch"/>
                    </transition>
                </template>

            </div>
        </section>

        <!-- dialog new edit costing setting-->
        <dialogCreateEditCostingSetting
            :active="dialogNewEditCostingSetting"
            @refresh="refresh"
            :withSchedule="false"
            :closeDialog="closeDialogPickupList"
            title="Create Cost To Cost Setting"
        />
    </div>
</template>
<script>

import axios from "axios";
import master from "@/mixins/master";
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"

import CostToCostList from "@/views/costToCost/setting/costToCostSettingList"

import DialogCreateEditCostingSetting from "@/views/costToCost/setting/dialogCreateEditCostingSetting"



export default {
    name:"CostToCost-List",
    mixins:[master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "CostToCostList": CostToCostList,
        "dialogCreateEditCostingSetting":DialogCreateEditCostingSetting
    },
    data() {
        return {
            title:"List",
            tempSearch: "",
            dialogNewEditCostingSetting:false,

        }
    },
    methods: {
        refresh(){
            this.$refs.costToCostList.refresh() // trigger function refresh form dari luar component list
        },
        searchValue (val) {
            this.tempSearch = val
        },
        searchDate (val) {
          this.tempDate = val
        },
        clearSearch() {
            this.$refs.searchInput.clear()
        },

        openDialog(){
           this.dialogNewEditCostingSetting = true
        },
        closeDialogPickupList() {
          this.dialogNewEditCostingSetting = false
        },

       
        updateNode(val){

        },

    },
    mounted() {
       
    }
}
</script>
<style lang="scss">
  .mb-15{
   margin-bottom: 1.5em;
  }
  .custom-title{
    padding: 0.6em;
    text-align: right;
    font-weight: 600;
  }
</style>
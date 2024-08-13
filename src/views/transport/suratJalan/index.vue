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
        <div style="position:relative;display:flex;justify-content: flex-end;">
          <div style="width: 100px;padding-right: 5px;">
            <vs-button flat block :active="true" @click="openDialog">
              <i class="bx bx-plus"></i> New
            </vs-button>
          </div>
        </div>
      </vs-col>
    </vs-row>

    <section class="nodes">
      <div class="box view">
        <div class="nav-box">
          <vs-row justify="end">
            <vs-col xs="12" sm="12" lg="6">
              <vs-row justify="end">
                <vs-col xs="6" sm="8" lg="4">
                  <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy" :valueData="searchParams" :selectedValue="searchBy" />
                </vs-col>
                <vs-col xs="6" sm="4" lg="4">
                  <search-input ref="searchInput" @searchValue="searchValue" :placeholder="searchPlaceholder" />
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
          <vs-row justify="flex-start">
            <vs-col xs="6" sm="4" lg="3">
              <template>
                <vs-select
                  class="m-select"
                  filter
                  v-model="filterStatusBy"
                  placeholder="Select status"
                  :border="true"
                  :multiple="true"
                  @change="updateFilterStatus"
                >
                  <template>
                    <vs-option
                      v-for="(item,key) in filterStatus"
                      :key="key"
                      :label="item.label"
                      :value="item.value"
                    >
                      {{item.label}}
                    </vs-option>
                  </template>
                </vs-select>
              </template>
            </vs-col>
            <vs-col xs="12" sm="12" lg="6" >
              <vs-row>
                <vs-col w="4">
                  <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateFilterDateBy" :valueData="dateParams" :selectedValue="filterDateBy" />
                </vs-col>
                <vs-col w="8">
                  <daterange-filter @searchDate="searchDate" size="small" />
                </vs-col>
              </vs-row>
            </vs-col>            
          </vs-row>
        </div>
        <template>
          <transition name="slide-fade">
            <SuratJalan
              :ref="'SuratJalan'"
              :dateFilter="tempDate"
              :query="tempSearch"
              :searchBy="searchBy"
              :filterDateBy="filterDateBy"
              :status="filterStatusBy"
            />
          </transition>
        </template>
      </div>
    </section>

    <!--Create pickup Request-->
    <dialogCreateSuratJalan
      :active="dialogSuratJalan"
      @refresh="refresh"
      :closeDialog="closeDialogSuratJalan"
      title="Transport Surat Jalan"
      btnBlue="Approve"
    />
  </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab";
import Breadcrumb from "@/components/breadcrumb/index";
import SearchInput from "@/components/search/searchInput";
import dateRange from "@/components/daterange/index";
import SelectSearchBy from "@/components/search/selectSearchBy";

import SuratJalan from "@/views/transport/suratJalan/suratJalan";

import DialogCreateSuratJalan from "@/views/transport/suratJalan/dialogCreateSuratJalan";

export default {
  name: "transport-surat-jalan",
  components: {
    "nav-item": NavItem,
    breadcrumb: Breadcrumb,
    "search-input": SearchInput,
    "daterange-filter": dateRange,
    "select-search-by": SelectSearchBy,
    SuratJalan: SuratJalan,
    dialogCreateSuratJalan: DialogCreateSuratJalan,
  },
  data() {
    return {
      title: "Surat Jalan",
      tempSearch: "",
      tempDate: [],
      dialogSuratJalan: false,
      searchBy:"manifest do number",
      filterDateBy:"create",
      searchPlaceholder: "Search Manifest DO Number",
      searchParams: [
        {
          label: 'Manifest DO Number',
          value: 'manifest do number'
        },
        {
          label: 'DO Number',
          value: 'do_number'
        },
        {
          label: 'Vehicle Type',
          value: 'vehicle_type'
        },
        {
          label: 'Driver',
          value: 'pic'
        },
        {
          label: 'Mode',
          value: 'mode'
        },
        {
          label: 'Origin',
          value: 'origin'
        },
        {
          label: 'Destination',
          value: 'destination'
        },
        {
          label: 'Weight',
          value: 'weight'
        },
        {
          label: 'Status',
          value: 'status'
        }
      ],
      dateParams: [
        {
          label: 'Created Date',
          value: 'create'
        },
        {
          label: 'Departed Time',
          value: 'departed_time'
        },
        {
          label: 'ETD',
          value: 'etd'
        },
        {
          label: 'ETA',
          value: 'eta'
        }
      ],
      filterStatusBy: "",
      filterStatus: [
        {
          label: 'READY',
          value: 'READY'
        },
        {
          label: 'CANCELED',
          value: 'CANCELED'
        },
        {
          label: 'DEPARTED',
          value: 'DEPARTED'
        },
        {
          label: 'RECEIVED',
          value: 'RECEIVED'
        },
        {
          label: 'INFO',
          value: 'INFO'
        }
      ],
    };
  },
  methods: {
    refresh() {
      this.$refs.SuratJalan.refresh(); // trigger function refresh form dari luar component list
    },
    searchValue(val) {
      this.tempSearch = val;
    },
    searchDate(val) {
      this.tempDate = val;
    },
    clearSearch() {
      this.$refs.searchInput.clear();
    },
    closeDialogSuratJalan() {
      this.dialogSuratJalan = false;
    },
    openDialog() {
      this.dialogSuratJalan = true;
    },
    updateSearchBy(key, val) {
      val = val.replaceAll(" ", "_");
      this.searchBy = val;
      this.searchPlaceholder = key;
    },
    updateFilterDateBy(key,val) {
      this.filterDateBy = val;
    },
    updateFilterStatus(key){
      this.refresh()
    },  
  },
};
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

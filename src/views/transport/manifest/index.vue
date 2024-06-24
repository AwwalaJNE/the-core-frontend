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
            <vs-button flat square block :active="true" @click="openDialog">
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
            <vs-col xs="12" sm="12" lg="6" class="mb-15">
              <vs-row>
                <vs-col w="4">
                  <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateFilterDateBy" :valueData="dateParams" :selectedValue="filterDateBy" />
                </vs-col>
                <vs-col w="8">
                  <daterange-filter @searchDate="searchDate" size="small" />
                </vs-col>
              </vs-row>
            </vs-col>
            <vs-col xs="12" sm="12" lg="6" class="mb-15">
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
        </div>
        <template>
          <transition name="slide-fade">
            <suratMuatantable
              :ref="'suratMuatantable'"
              :dateFilter="tempDate"
              :query="tempSearch"
              :searchBy="searchBy"
              :filterDateBy="filterDateBy"
            />
          </transition>
        </template>
      </div>
    </section>

    <!--Create surat muatan-->
    <SuratMuatanDialog
      :active="dialogSuratMuatan"
      @refresh="refresh"
      :closeDialog="closeDialogPickupList"
      title="Create Surat Muatan"
    />
  </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";
import Breadcrumb from "@/components/breadcrumb/index";
import SearchInput from "@/components/search/searchInput";
import dateRange from "@/components/daterange/index";
import SelectSearchBy from "@/components/search/selectSearchBy";

import SuratMuatantable from "@/views/transport/manifest/manifest";
import SuratMuatanDialog from "@/views/transport/manifest/dialogCreateEditManifest";

export default {
  name: "transport-manifest",
  mixins: [master],
  components: {
    breadcrumb: Breadcrumb,
    "search-input": SearchInput,
    "daterange-filter": dateRange,
    "select-search-by" : SelectSearchBy,
    suratMuatantable: SuratMuatantable,
    SuratMuatanDialog: SuratMuatanDialog,
  },
  data() {
    return {
      title: "Surat Muatan",
      tempSearch: "",
      tempDate: [],
      dialogSuratMuatan: false,
      DataNode: [],
      DataStatus: [
        {
          label: "Confirm",
          value: "Confirm",
        },
      ],
      node_request: "",
      status_pickup: "",
      searchBy:"manifest_number",
      filterDateBy:"create",
      searchPlaceholder: "Search Manifest Number",
      searchParams: [
        {
          label: 'Manifest Number',
          value: 'manifest_number'
        },
        {
          label: 'Type SM',
          value: 'manifestMethod'
        },
        {
          label: 'Jenis Kiriman',
          value: 'vehicleType'
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
          label: 'ETD',
          value: 'etd'
        },
        {
          label: 'ETA',
          value: 'eta'
        }
      ]
    };
  },
  methods: {
    refresh() {
      this.$refs.suratMuatantable.refresh(); // trigger function refresh form dari luar component list
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
    closeDialogPickupList() {
      this.dialogSuratMuatan = false;
    },
    openDialog() {
      this.dialogSuratMuatan = true;
      this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_NUMBER_visible", false);
      this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_SCHEDULE_visible", false);
    },
    updateNode(val) {},
    async getTableData() {
      this.loading = true;
      await axios
        .get(
          this.URL.node +
            `?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&s=`,
          this.Helper.header()
        )
        .then((res) => {

          if (res.data.data.length > 0) {
            res.data.data.map((item) => {
              let obj = {};
              obj["label"] = item.node_code;
              obj["value"] = item.node_code;

              this.DataNode.push(obj);
            });
          }

          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.openNotification("danger", "Failed to populate node list", err);
        });
    },
    updateSearchBy(key, val) {
      val = val.replaceAll(" ", "_");
      this.searchBy = val;
      this.searchPlaceholder = key;
    },
    updateFilterDateBy(key,val) {
      this.filterDateBy = val;
    },
  },
  mounted() {
    this.getTableData();
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
.m-select.vs-select-content {
  margin-top: 0px;
}
</style>

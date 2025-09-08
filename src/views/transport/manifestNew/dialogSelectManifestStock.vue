<template>
  <dialog-master :actived="active" :closeDialog="close" width="lg" :loading="listenLoading">
    <template v-slot:header>Select Manifest Stock</template>
    <template v-slot:content>
      <vs-row class="mb-4" align="center">
        <vs-col w="10">
          <vs-input
            v-model="tempSearch"
            placeholder="Manifest Number"
            block
            @keyup.enter="handleSearch"
          />
        </vs-col>
        <vs-col w="2">
          <vs-button block @click="handleSearch">
            <i class="bx bx-search"></i> Search
          </vs-button>
        </vs-col>
      </vs-row>

      <table-master
        :dataTable="dataTable"
        :dataColumn="datacolumn"
        :tableLoading="loading"
        :hasAction="false"
        :hasPagination="true"
        :pageSize="pagination.page_size"
        :page="pagination.page"
        :limit="pagination.limit"
        :isActionFirst="true"
        @actionLimit="actionLimit"
        @actionPagination="actionPagination"
        @actionSelect="actionSelect"
      />
    </template>
  </dialog-master>
</template>

<script>
import axios from "axios";
import moment from "moment";
import master from "@/mixins/master";
import TableMaster from "@/components/table/tableMaster.vue";
import DialogMaster from "@/components/dialog/dialogMaster.vue";

export default {
  name: 'dialogSelectManifestStock',
  mixins: [master],
  components: {
    "dialog-master": DialogMaster,
    "table-master": TableMaster
  },
  props: {
    active: Boolean,
    close: Function,
    mode: Number,
    onSelect: Function
  },
  data() {
    return {
      tempSearch: this.query ? this.query : "",
      dataTable: [],
      loading: false,
      pagination: {
        page: 1,
        limit: 5,
        page_size: 1
      },
      datacolumn: [
        { label: "Vehicle Mode", key: "vehicle_mode_name", width: 'xs' },
        { label: "Vehicle Name", key: "vehicle_name", width: 'xs' },
        { label: "Manifest Number", key: "manifest_number", width: 'sm' },
        { label: "Shipment Number", key: "shipment_number", width: 'xxs' },
        { label: "Origin", key: "node_code_origin", width: 'xxs' },
        { label: "Destination", key: "node_code_destination", width: 'xxs' },
        { label: "ETD", key: "etd_formatted", width: 'sm' },
        { label: "ETA", key: "eta_formatted", width: 'sm' },
      ]
    }
  },
  computed: {
    listenActive() {
      return this.active
    },
    listenLoading() {
      return this.loading;
    },
    listenManifestMethod() {
      return this.mode
    }
  },
  methods: {
    async getTableData(limit,page,q) {
      this.loading = true
      let query = "";
      if(q !== undefined) {
          query = q
      }

      if (this.mode === null || this.mode === undefined || this.mode === '' || this.mode == 0) {
        this.mode = 'ALL'
      }

      try {
        const res = await axios.get(`${this.URL.sm_stock}?n=${this.listenNodeId}&vehicle_mode=${this.listenManifestMethod}&sort_order=desc&limit=${this.pagination.limit}&page=${this.pagination.page}&s=${this.tempSearch}&search_by=manifest_number&node_origin=${this.listenCurrentNode.branch_code}`, this.Helper.header())

        const arr = res.data.data.map(item => ({
          ...item,
          is_active: item.is_active === '1',
          schedule_id_value: !!item.schedule_id,
          etd_formatted: `${item?.etd} ${item?.etd_timezone}`,
          eta_formatted: `${item?.eta} ${item?.eta_timezone}`,
        }))

        this.dataTable = arr
        this.pagination.page = res.data.meta.current_page
        this.pagination.limit = parseInt(res.data.meta.per_page)
        this.pagination.page_size = res.data.meta.last_page
      } catch (err) {
        this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong')
      } finally {
        this.loading = false
      }
    },
    handleSearch() {
      this.pagination.page = 1
      this.getTableData()
    },
    actionLimit(val){
        this.pagination.limit = val
        this.pagination.page = 1
        this.refresh()
    },
    actionPagination(val) {
        this.pagination.page = val
        this.refresh()
    },
    refresh(){
        this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch)
    },
    actionSelect(item) {
      this.$emit('selectManifest', item)
      this.close()
    }
  },
  watch: {
    listenActive(val) {
      if (val) {
        // reset semua state di sini
        this.tempSearch = "";
        this.dataTable = [];
        this.pagination = {
          page: 1,
          limit: this.pagination.limit,
          page_size: 1
        };
        this.getTableData();
      }
    },
    query: function(val, old) {
        if(val !== undefined) {
            this.tempSearch = val
            if(this.tempSearch !== old) {
                this.pagination.page = 1
                this.getTableData(this.pagination.limit, this.pagination.page, val)
            }
        }
    }
  },
}
</script>
<template>
  <dialog-master
    width="xl"
    :actived="listenActive"
    :closeDialog="closeDialog"
  >
    <template v-slot:header>
      Data Preview
    </template>

   <template v-slot:content>
    <div v-if="!listenLoading">
      <table-master
        ref="tableMaster"
        :dataTable="resultData"
        :dataColumn="dataColumn"
        :tableLoading="loading"
        :hasAction="false"
        :hasPagination="false"
        :isSearchAble="false"
        :isMultipleSelectWithIndex="true"
        :selectedData="dataTableSelected"
        :isAllChecked="isAllChecked"
        :onRowClickCallback="() => {}"
        :isAllCheckedCheckCallback="onAllCheckedCallback"
        @updateSelected2="updateSelected"
      />
    </div>

    <!-- Kondisi jika loading -->
    <div v-else class="custom-spinner">
      Memuat...
    </div>
  </template>


    <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="3">
                    <vs-button
                        block
                        danger
                        flat
                        transparent
                        :active="true"
                        @click="cancel"
                    >
                        Cancel
                    </vs-button>
                </vs-col>
                <vs-col w="3">
                    <vs-button
                        block
                        flat
                        transparent
                        type="submit"
                        :active="true"
                        @click="submit"
                    >
                        {{btnBlue || 'Submit'}}
                    </vs-button>
                </vs-col>
            </vs-row>                
        </template>
  </dialog-master>
</template>

<script>
import master from "@/mixins/master";
import axios from "axios";
import DialogMaster from "@/components/dialog/dialogMaster";
import TableMaster from "@/components/table/tableMaster";

export default {
  name: "dialog-sync-result",
  mixins: [master],
  components: {
    "dialog-master": DialogMaster,
    "table-master": TableMaster,
  },
  props: {
    actived: Boolean,
    btnRed: String,
    btnBlue: String,
    closeDialog: Function,
    form: Object,
  },
  data() {
    return {
      resultData: [],
      dataTableSelected: [],
      isAllChecked: false,
      loading: false,
      dataColumn: [
        { label: "Vehicle", key: "vehicle_name", width: "sm" },
        { label: "Type", key: "vehicle_type_name", width: "sm" },
        { label: "SHP No", key: "shipment_number", width: "sm" },
        { label: "Origin", key: "origin_name", width: "sm" },
        { label: "Destination", key: "destination_name", width: "sm" },
        { label: "ETD", key: "etd", width: "sm" },
        { label: "ETA", key: "eta", width: "sm" },
        { label: "Vehicle Info", key: "vehicle_information", width: "sm" },
        { label: "Reg No", key: "registration_number", width: "sm" },
      ],
    };
  },
  computed: {
    listenActive() {
      return this.actived;
    },
    listenLoading() {
      return this.loading;
    },
  },
  watch: {
    actived(val) {
      if (val) this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const res = await axios.get(`${this.URL.sync_flight}`, {
          params: { ...this.form, n: this.listenNodeId },
          headers: this.Helper.header().headers,
        });
        this.resultData = res.data.data || [];
        this.dataTableSelected = [...this.resultData];
        this.isAllChecked = true;
        this.openNotification("success", "", "Berhasil", "Data berhasil diambil");
      } catch (err) {
        this.openNotification("danger", "", "Gagal", err?.response?.data?.message || "Gagal mengambil data");
      } finally {
        this.loading = false;
      }
    },
    updateSelected(val) {
      this.dataTableSelected = Array.isArray(val) ? val : [];
    },
    onAllCheckedCallback(val) {
      this.isAllChecked = val;
    },
    cancel() {
          this.closeDialog();
      },
    async submit() {
      if (!Array.isArray(this.dataTableSelected) || this.dataTableSelected.length === 0) {
        this.openNotification("danger", "", "Validasi", "Pilih minimal 1 data untuk disubmit");
        return;
      }

      const payload = {
        data: this.dataTableSelected.map((item) => ({
          vehicle_id: item.vehicle_id,
          vehicle_type_id: item.vehicle_type_id,
          shipment_number: item.shipment_number,
          origin_name: item.origin_name,
          origin_identifier: item.origin_identifier || null,
          origin_point: item.origin_point || null,
          destination_name: item.destination_name,
          destination_identifier: item.destination_identifier || null,
          destination_point: item.destination_point || null,
          etd: item.etd || "2025-06-17 17:30:00",
          etd_timezone: item.etd_timezone || "WIB",
          eta: item.eta || "2025-06-17 19:30:00",
          eta_timezone: item.eta_timezone || "WIB",
          vehicle_information: item.vehicle_information || "null",
          registration_number: item.registration_number || "null",
          is_external_source: item.is_external_source || "N",
        }),
        ),
      };

      try {
        const res = await axios.post(`${this.URL.schedule}?n=${this.listenNodeId}`, payload, this.Helper.header());
        this.openNotification("success", "", "Berhasil", res?.data?.message || "Data berhasil disimpan");
        this.closeDialog();
      } catch (err) {
        this.openNotification(
          "danger",
          err?.response?.data?.code || "",
          "Gagal",
          err?.response?.data?.message || "Gagal menyimpan data"
        );
      }
    },
  },
};
</script>
<style scoped>
.custom-spinner {
  text-align: center;
  padding: 2rem;
  font-weight: bold;
  font-size: 1.2rem;
  color: #3eaf7c;
}
</style>

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
          :hasPagination="true"
          :isSearchAble="false"
          :isMultipleSelectWithIndex="true"
          :selectedData="selected"
          :isAllChecked="isAllChecked"
          :onRowClickCallback="() => {}"
          :isAllCheckedCheckCallback="onAllCheckedCallback"
          @updateSelected2="updateSelected2"
          
          :pageSize="pagination.page_size"
          :page="pagination.page"
          :limit="pagination.limit"
          @actionLimit="actionLimit"
          @actionPagination="actionPagination"
        />
      </div>

      <div v-else class="custom-spinner">
        Loading...
      </div>
    </template>

    <template v-slot:footer>
      <vs-row justify="flex-end" style="margin-top: 20px;">
        <vs-col w="3">
          <vs-button
            block
            danger
            flat
            transparent
            :active="true"
            :data-testid="`cancel-button`"
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
            :data-testid="`submit-button`"
            @click="submit"
          >
            {{ btnBlue || 'Submit' }}
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
      resultData: [], // Ini akan menyimpan data yang diambil per halaman
      loading: false,
      dataColumn: [
        { label: "Vehicle", key: "vehicle_name", width: "sm" },
        { label: "Mode", key: "vehicle_mode_name", width: "sm" },
        { label: "SHP No", key: "shipment_number", width: "sm" },
        { label: "Origin", key: "origin_name", width: "sm" },
        { label: "Destination", key: "destination_name", width: "sm" },
        { label: "ETD", key: "etd", width: "sm" },
        { label: "ETA", key: "eta", width: "sm" },
        { label: "Vehicle Info", key: "vehicle_information", width: "sm" },
        { label: "Reg No", key: "registration_number", width: "sm" },
      ],
      pagination: {
        limit: 20, 
        page_size: 1,
        page: 1, 
      },
      selected: [],
      isAllChecked: false,
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
      if (val) {
        this.pagination.page = 1;
        this.pagination.limit = 20;
        this.pagination.page_size = 1;
        this.resultData = [];
        this.selected = []; 
        this.isAllChecked = false;
        this.fetchData();
      } else {
        this.resultData = [];
        this.selected = [];
        this.isAllChecked = false;
      }
    },
  },
  methods: {
    actionLimit(val) {
      this.pagination.limit = val;
      this.pagination.page = 1; // Reset ke halaman 1 ketika limit berubah
      this.fetchData(); // Ambil data baru
    },
    // Metode yang dipanggil ketika halaman berubah
    actionPagination(val) {
      this.pagination.page = val;
      this.fetchData(); // Ambil data baru
    },
    async fetchData() {
      this.loading = true;
      try {
        console.log("📤 Sending request to sync flight:");
        const res = await axios.get(`${this.URL.sync_flight}`, {
          params: {
            ...this.form,
            n: this.listenNodeId,
            limit: this.pagination.limit, 
            page: this.pagination.page,   
          },
          headers: this.Helper.header().headers,
        });
        if (res.data && res.data.data) {
          // Ensure vehicle_mode_id is properly set for each item
          this.resultData = res.data.data.map(item => {
            // Convert vehicle_type_id to vehicle_mode_id if needed
            if (!item.vehicle_mode_id && item.vehicle_type_id) {
              item.vehicle_mode_id = parseInt(item.vehicle_type_id);
            }
            // Convert vehicle_type_name to vehicle_mode_name if needed
            if (!item.vehicle_mode_name && item.vehicle_type_name) {
              item.vehicle_mode_name = item.vehicle_type_name;
            }
            return item;
          });
          
          this.pagination = {
            page: res.data.meta.current_page || 1,
            limit: parseInt(res.data.meta.per_page, 10) || 20,
            page_size: res.data.meta.last_page || 1, // total pages
          };
        } else {
          this.resultData = [];
          this.pagination = { limit: 20, page_size: 1, page: 1 };
        }
        this.openNotification("success", "", "Berhasil", "Data berhasil diambil");
      } catch (err) {
        this.openNotification("danger", "", "Gagal", err?.response?.data?.message || "Gagal mengambil data");
        this.resultData = [];
        this.pagination = { limit: 20, page_size: 1, page: 1 };
      } finally {
        this.loading = false;
      }
    },
    updateSelected2(item) {
      console.log("Selected item:", item);
    },
    onAllCheckedCallback(val) {
      console.log("All checked:", val);
      this.isAllChecked = val;
    },
    cancel() {
      this.closeDialog();
    },
    async submit() {
      if (!Array.isArray(this.selected) || this.selected.length === 0) {
        this.openNotification("danger", "", "Validasi", "Pilih minimal 1 data untuk disubmit");
        return;
      }

      try {
        const payload = {
          data: this.selected.map((item) => {
            let vehicle_mode_id = null;
            if (item.vehicle_mode_id) {
              vehicle_mode_id = parseInt(item.vehicle_mode_id);
            } else if (item.vehicle_type_id) {
              vehicle_mode_id = parseInt(item.vehicle_type_id);
            }
            
            if (isNaN(vehicle_mode_id)) {
              vehicle_mode_id = null;
            }
            
            let vehicle_id = null;
            if (item.vehicle_id) {
              vehicle_id = parseInt(item.vehicle_id);
              if (isNaN(vehicle_id)) {
                vehicle_id = null;
              }
            }
            
            return {
              vehicle_id: vehicle_id,
              vehicle_mode_id: vehicle_mode_id,
              vehicle_mode_name: item.vehicle_mode_name || item.vehicle_type_name || "",
              shipment_number: item.shipment_number || "",
              origin_name: item.origin_name || "",
              origin_identifier: item.origin_identifier || "",
              origin_point: item.origin_point || "",
              destination_name: item.destination_name || "",
              destination_identifier: item.destination_identifier || "",
              destination_point: item.destination_point || "",
              etd: item.etd || "",
              etd_timezone: item.etd_timezone || "",
              eta: item.eta || "",
              eta_timezone: item.eta_timezone || "",
              vehicle_information: item.vehicle_information || "",
              registration_number: item.registration_number || "",
              is_external_source: "Y",
            };
          }),
        };

        const res = await axios.post(`${this.URL.schedule}?n=${this.listenNodeId}`, payload, this.Helper.header());
        this.openNotification("success", "", "Berhasil", res?.data?.message || "Data berhasil disimpan");
        this.$emit('dataSubmitted'); 
        
        this.closeDialog();
      } catch (err) {
        console.error("Submit error:", err);
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
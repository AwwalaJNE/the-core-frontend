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
          :hasPagination="true" :isSearchAble="false"
          :isMultipleSelectWithIndex="true"
          :selectedData="dataTableSelected"
          :isAllChecked="isAllChecked"
          :onRowClickCallback="() => {}"
          :isAllCheckedCheckCallback="onAllCheckedCallback"
          @updateSelected2="updateSelected"
          
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
        { label: "Type", key: "vehicle_type_name", width: "sm" },
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
      dataTableSelected: [], // Mempertahankan seleksi global
    };
  },
  computed: {
    listenActive() {
      return this.actived;
    },
    listenLoading() {
      return this.loading;
    },
    // Computed property untuk isAllChecked
    // Ini akan mengindikasikan apakah semua item di halaman SAAT INI terpilih
    isAllChecked() {
      if (this.resultData.length === 0) return false;
      // Memastikan setiap item di `resultData` (data halaman saat ini) ada di `dataTableSelected` (data terpilih global)
      // Asumsi ada properti unik seperti `shipment_number` atau `id` untuk membandingkan item
      return this.resultData.every(item =>
        this.dataTableSelected.some(selectedItem => selectedItem.shipment_number === item.shipment_number)
      );
    },
  },
  watch: {
    actived(val) {
      if (val) {
        this.pagination.page = 1;
        this.pagination.limit = 20;
        this.pagination.page_size = 1;
        this.resultData = [];
        this.dataTableSelected = []; 
        this.fetchData();
      } else {
        this.resultData = [];
        this.dataTableSelected = [];
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
          this.resultData = res.data.data; 
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
    updateSelected(val) {
      const currentSelectedSet = new Set(this.dataTableSelected.map(item => item.shipment_number)); 

      this.resultData.forEach(item => {
        if (currentSelectedSet.has(item.shipment_number)) {
          currentSelectedSet.delete(item.shipment_number);
        }
      });

      val.forEach(item => {
        currentSelectedSet.add(item.shipment_number);
      });

      
      this.dataTableSelected = [];
      
      const allPossibleItems = new Map();
      this.resultData.forEach(item => allPossibleItems.set(item.shipment_number, item));
      this.dataTableSelected.forEach(item => allPossibleItems.set(item.shipment_number, item)); // Tambahkan juga yang sudah terpilih sebelumnya

      this.dataTableSelected = Array.from(currentSelectedSet).map(shipment_number => {
        const foundInVal = val.find(item => item.shipment_number === shipment_number);
        if (foundInVal) return foundInVal;

        const foundInResultData = this.resultData.find(item => item.shipment_number === shipment_number);
        if (foundInResultData) return foundInResultData;

        const foundInOldSelected = this.dataTableSelected.find(item => item.shipment_number === shipment_number);
        if (foundInOldSelected) return foundInOldSelected;
        
        
        return { shipment_number: shipment_number }; 
      }).filter(item => item.shipment_number !== undefined); // Hapus placeholder jika ada
      
     
      const selectedShipmentNumbers = new Set(this.dataTableSelected.map(item => item.shipment_number));

     
      this.resultData.forEach(item => {
          if (selectedShipmentNumbers.has(item.shipment_number)) {
              selectedShipmentNumbers.delete(item.shipment_number);
          }
      });

      val.forEach(item => {
          selectedShipmentNumbers.add(item.shipment_number);
      });

  
      const allKnownItemsMap = new Map(); 
      this.resultData.forEach(item => allKnownItemsMap.set(item.shipment_number, item));
      this.dataTableSelected.forEach(item => allKnownItemsMap.set(item.shipment_number, item));

      this.dataTableSelected = Array.from(selectedShipmentNumbers).map(shipment_number => {
          return allKnownItemsMap.get(shipment_number);
      }).filter(item => item !== undefined); 

    },
    onAllCheckedCallback(val) {
      if (val) {
        // Jika "Select All" dicentang, tambahkan semua item dari `resultData` (halaman ini) ke `dataTableSelected`
        // Gunakan Set sementara untuk menghindari duplikasi dan efisiensi
        const currentSelectedSet = new Set(this.dataTableSelected.map(item => item.shipment_number));
        this.resultData.forEach(item => {
          currentSelectedSet.add(item.shipment_number);
        });
        // Konversi kembali Set ke Array, mengambil objek penuh dari map jika perlu
        this.dataTableSelected = Array.from(currentSelectedSet).map(shipment_number => {
            return this.resultData.find(item => item.shipment_number === shipment_number) || // Dari halaman saat ini
                   this.dataTableSelected.find(item => item.shipment_number === shipment_number); // Atau dari selection lama
        }).filter(item => item !== undefined); 

      } else {
        // Jika "Select All" di-uncheck, hapus semua item dari `resultData` (halaman ini) dari `dataTableSelected`
        const newSelected = this.dataTableSelected.filter(selectedItem =>
          !this.resultData.some(pageItem => pageItem.shipment_number === selectedItem.shipment_number)
        );
        this.dataTableSelected = newSelected;
      }
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
          vehicle_id: item.vehicle_id,                                        //Mandatory
          vehicle_type_id: item.vehicle_type_id,                              //Mandatory
          shipment_number: item.shipment_number,                              //Mandatory
          origin_name: item.origin_name,                                      //Mandatory
          origin_identifier: item.origin_identifier || "null",                  //--Optional--
          origin_point: item.origin_point || "null",                            //--Optional--
          destination_name: item.destination_name,                            //Mandatory
          destination_identifier: item.destination_identifier || "null",        //--Optional--  
          destination_point: item.destination_point || "null",                  //--Optional--
          etd: item.etd || "2025-06-17 17:30:00",                             //Mandatory
          etd_timezone: item.etd_timezone || "WIB",                           //Mandatory
          eta: item.eta || "2025-06-17 19:30:00",                             //Mandatory
          eta_timezone: item.eta_timezone || "WIB",                           //Mandatory
          vehicle_information: item.vehicle_information || "null",            //--Optional--
          registration_number: item.registration_number || "null",            //--Optional--
          is_external_source: item.is_external_source || "Y",
        }),
        ),
      };

      try {
        const res = await axios.post(`${this.URL.schedule}?n=${this.listenNodeId}`, payload, this.Helper.header());
        this.openNotification("success", "", "Berhasil", res?.data?.message || "Data berhasil disimpan");
         // PENTING: Emit event sebelum menutup dialog
        this.$emit('dataSubmitted'); 
        
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
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
      // dataTableSelected: [], // Ini akan melacak semua item yang terpilih dari semua halaman
      // isAllChecked: false, // Akan menjadi computed property
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
      // Mengikuti pola pagination dari module lain
      pagination: {
        limit: 10, // items per page
        page_size: 1, // total pages (last_page)
        page: 1, // current page
      },
      dataTableSelected: [], // Mempertahankan seleksi global
      // Note: isAllChecked akan menjadi computed property untuk menghindari mutasi prop
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
        // Reset state pagination dan selection saat dialog dibuka
        this.pagination.page = 1;
        this.pagination.limit = 20; // Atur default limit jika perlu
        this.pagination.page_size = 1;
        this.resultData = [];
        this.dataTableSelected = []; // Reset juga selection saat buka dialog baru
        this.fetchData();
      } else {
        // Reset data dan selection saat dialog ditutup
        this.resultData = [];
        this.dataTableSelected = [];
      }
    },
  },
  methods: {
    // Metode yang dipanggil ketika pagination limit (items per page) berubah
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
        const res = await axios.get(`${this.URL.sync_flight}`, {
          params: {
            ...this.form,
            n: this.listenNodeId,
            limit: this.pagination.limit, // Gunakan limit dari pagination state
            page: this.pagination.page,   // Gunakan page dari pagination state
            // Anda bisa menambahkan parameter sort, search, filter lainnya di sini
            // jika API Anda mendukungnya, seperti di pola module lain
            // s: this.searchValue,
            // search_by: this.searchBy,
            // filter_date_by: this.filterDateBy,
            // start_date: this.dateRange[0],
            // end_date: this.dateRange[1],
            // vehicle_type_id: this.filterVehicleTypeBy !== "ALL" ? this.filterVehicleTypeBy : undefined
          },
          headers: this.Helper.header().headers,
        });

        // Asumsi API mengembalikan data per halaman dan meta pagination
        if (res.data && res.data.data) {
          this.resultData = res.data.data; // Data untuk halaman saat ini
          // Perbarui state pagination dari meta API response
          this.pagination = {
            page: res.data.meta.current_page || 1,
            limit: parseInt(res.data.meta.per_page, 10) || 20,
            page_size: res.data.meta.last_page || 1, // total pages
          };
        } else {
          this.resultData = [];
          this.pagination = { limit: 20, page_size: 1, page: 1 };
        }

        // Opsional: Jika Anda ingin semua data di halaman pertama terpilih secara default saat dimuat
        // Anda bisa menambahkan logika di sini, tetapi itu akan mempengaruhi `isAllChecked`
        // dan `dataTableSelected` perlu diupdate dengan hati-hati.
        // Untuk saat ini, `dataTableSelected` hanya akan diupdate oleh interaksi user (checkbox).
        // this.dataTableSelected = [...this.resultData]; // Ini akan SALAH jika `dataTableSelected` melacak semua halaman
        // this.isAllChecked = true; // Ini juga akan SALAH

        this.openNotification("success", "", "Berhasil", "Data berhasil diambil");
      } catch (err) {
        this.openNotification("danger", "", "Gagal", err?.response?.data?.message || "Gagal mengambil data");
        this.resultData = [];
        this.pagination = { limit: 20, page_size: 1, page: 1 };
      } finally {
        this.loading = false;
      }
    },
    // Metode ini dipanggil oleh `table-master` ketika seleksi berubah
    updateSelected(val) {
      // `val` dari `table-master` diharapkan adalah array item yang terpilih di halaman saat ini.
      // Kita perlu memperbarui `dataTableSelected` yang global dengan mempertimbangkan halaman yang berbeda.

      // 1. Buat Set dari `dataTableSelected` yang ada untuk efisiensi penambahan/penghapusan.
      const currentSelectedSet = new Set(this.dataTableSelected.map(item => item.shipment_number)); // Asumsi shipment_number unik

      // 2. Hapus semua item dari `resultData` (halaman saat ini) dari `currentSelectedSet`.
      // Ini dilakukan karena kita akan menambahkan kembali hanya item yang saat ini dipilih di `val`.
      this.resultData.forEach(item => {
        if (currentSelectedSet.has(item.shipment_number)) {
          currentSelectedSet.delete(item.shipment_number);
        }
      });

      // 3. Tambahkan kembali item yang benar-benar terpilih di halaman saat ini (`val`).
      val.forEach(item => {
        currentSelectedSet.add(item.shipment_number);
      });

      // 4. Konversi kembali Set ke Array, dan cari objek lengkapnya dari `resultData` atau dari cache jika ada
      // Agar dataTableSelected menyimpan objek penuh, bukan hanya ID
      this.dataTableSelected = [];
      // Iterasi seluruh data yang mungkin terpilih (bisa dari cache global jika ada, atau dari resultData saat ini)
      // Untuk implementasi ini, kita akan asumsikan data yang terpilih dari halaman lain tetap ada di dataTableSelected
      // dan hanya data di halaman saat ini yang diupdate.
      const allPossibleItems = new Map();
      this.resultData.forEach(item => allPossibleItems.set(item.shipment_number, item));
      this.dataTableSelected.forEach(item => allPossibleItems.set(item.shipment_number, item)); // Tambahkan juga yang sudah terpilih sebelumnya

      // Bangun ulang dataTableSelected dengan objek lengkap
      this.dataTableSelected = Array.from(currentSelectedSet).map(shipment_number => {
        // Cari objek lengkapnya. Pertama di `val` (yang baru terpilih di halaman ini)
        const foundInVal = val.find(item => item.shipment_number === shipment_number);
        if (foundInVal) return foundInVal;
        // Jika tidak ditemukan di `val`, cari di `resultData` (data halaman saat ini yang mungkin tidak diubah)
        const foundInResultData = this.resultData.find(item => item.shipment_number === shipment_number);
        if (foundInResultData) return foundInResultData;
        // Terakhir, cari di `dataTableSelected` yang lama (jika ada item terpilih dari halaman lain)
        const foundInOldSelected = this.dataTableSelected.find(item => item.shipment_number === shipment_number);
        if (foundInOldSelected) return foundInOldSelected;
        
        // Ini adalah fallback. Idealnya, semua objek lengkap sudah ada di salah satu sumber.
        // Jika tidak ditemukan, artinya ada inkonsistensi. Anda bisa return objek placeholder atau log error.
        return { shipment_number: shipment_number }; // Placeholder jika objek lengkap tidak ditemukan
      }).filter(item => item.shipment_number !== undefined); // Hapus placeholder jika ada
      
      // REVISI LOGIC updateSelected agar lebih jelas dan robust:
      // 1. Buat set dari `shipment_number` yang sudah terpilih secara global
      const selectedShipmentNumbers = new Set(this.dataTableSelected.map(item => item.shipment_number));

      // 2. Hapus `shipment_number` dari item-item yang ada di halaman saat ini (resultData) dari set tersebut.
      // Ini karena kita akan mengganti status seleksi untuk item di halaman ini.
      this.resultData.forEach(item => {
          if (selectedShipmentNumbers.has(item.shipment_number)) {
              selectedShipmentNumbers.delete(item.shipment_number);
          }
      });

      // 3. Tambahkan `shipment_number` dari item-item yang BARU terpilih di halaman saat ini (val) ke set.
      val.forEach(item => {
          selectedShipmentNumbers.add(item.shipment_number);
      });

      // 4. Rekonstruksi dataTableSelected dengan objek penuh.
      // Ini adalah bagian krusial. Anda perlu cara untuk mendapatkan objek penuh dari shipment_number.
      // Cara paling aman adalah menggabungkan semua item yang mungkin terpilih
      // (dari `resultData` saat ini dan `dataTableSelected` yang lama) dan kemudian memfilter.
      const allKnownItemsMap = new Map(); // Map dari shipment_number ke objek item penuh
      this.resultData.forEach(item => allKnownItemsMap.set(item.shipment_number, item));
      // Tambahkan juga item yang sebelumnya terpilih (dari halaman lain) ke map
      this.dataTableSelected.forEach(item => allKnownItemsMap.set(item.shipment_number, item));

      this.dataTableSelected = Array.from(selectedShipmentNumbers).map(shipment_number => {
          return allKnownItemsMap.get(shipment_number);
      }).filter(item => item !== undefined); // Pastikan tidak ada undefined jika shipment_number tidak ditemukan

    },
    onAllCheckedCallback(val) {
      // Dipanggil ketika checkbox "Select All" di `table-master` di halaman ini diklik
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
        }).filter(item => item !== undefined); // Filter out undefined if item not found (shouldn't happen if logic is correct)

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
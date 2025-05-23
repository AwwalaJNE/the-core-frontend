<template>
  <div>
    <table-master 
      hideColumnKey="surat-muatan"
      :dataTable="dataTable" 
      :dataColumn="datacolumn" 
      :tableLoading="loading"
      :pageSize="pagination.page_size"
      :page="pagination.page"
      :limit="pagination.limit"
      :hasPagination="true"
      :hasLinked="['manifest_number']"
      :customAction="true"
      :customActionList="customActionList"
      @actionLimit="actionLimit"
      @actionPagination="actionPagination"
      @actionUpdate="actionUpdate"
      @handleEdit="handleEdit"
    />

    <dialogCreateManifest
      title="Edit Manifest"
      :active="dialogManifestList"
      :closeDialog="closeDialog"
      :dataItem="dataItem"
      @refresh="refresh"
    />

    <dialog-confirm
      title="Cancel Surat Muatan"
      :message="`Anda yakin ingin membatalkan Surat Muatan dengan nomor ${manifest_number} ini?`"
      :active="activeDialogCancel"
      :loading="activeLoadingCancel"
      :closeDialog="closeDialogCancel"
      @confirm="confirmCancel"
      @cancel="closeDialogCancel"
    />

    <dialog-confirm
      title="Depart Surat Muatan"
      :message="`Anda yakin ingin memberangkatkan Surat Muatan dengan nomor ${manifest_number} ini?`"
      :active="activeDialogConfirmDepart"
      :loading="loadingConfirmDepart"
      :closeDialog="closeDialogConfirmDepart"
      @confirm="confirmDepart"
      @cancel="closeDialogConfirmDepart"
    />
  </div>
</template>

<script>
import axios from "axios";
import master from "@/mixins/master";

import DialogConfirm from "@/components/dialog/dialogConfirm";
import TableMaster from "@/components/table/tableMaster.vue";

import DialogCreateManifest from "@/views/transport/manifestNew/dialogCreateEditManifest";

export default {
  name: "transport-surat-muatan-table-new",
  mixins: [master],
  props: {
    dateFilter: Array,
    filterDateBy: String,
    query: String,
    searchBy: String,
    status: [Array, String],
  },
  components: {
    "table-master": TableMaster,
    dialogCreateManifest: DialogCreateManifest,
    "dialog-confirm": DialogConfirm,
  },
  data() {
    return {
      activeDialogCancel: false,
      activeLoadingCancel: false,
      dataTable: [],
      dialogManifestList: false,
      datacolumn: [
        {
          label: "No Surat Muatan",
          key: "manifest_number",
          width: "xs",
        },
        {
          label: "Date#",
          key: "created_at",
          width: "sm",
        },
        {
          label: "Type SM",
          key: "manifest_type_name",
          width: "xs",
        },
        {
          label: "Vehicle",
          key: "formatted_vehicle",
          width: "xs",
        },
        {
          label: "Jenis Kiriman",
          key: "jenis_kiriman",
          width: "xs",
        },
        {
          label: "Origin",
          key: "origin_name",
          width: "sm",
        },
        {
          label: "Destination",
          key: "destination_name",
          width: "sm",
        },
        {
          label: "Fix Cost Weight",
          key: "fix_cost_weight",
          width: "auto",
        },
        {
          label: "Live Cost Weight",
          key: "live_cost_weight",
          width: "auto",
        },
        {
          label: "Fix Actual Weight",
          key: "fix_actual_weight",
          width: "auto",
        },
        {
          label: "Live Actual Weight",
          key: "live_actual_weight",
          width: "auto",
        },
        {
          label: "ETD",
          key: "etd",
          width: "sm",
        },
        {
          label: "ETA",
          key: "eta",
          width: "sm",
        },
        {
          label: "Approved",
          key: "approved",
          type: "status",
          width: "xs",
        },
        {
          label: "Status",
          key: "status",
          width: "xs",
        },
        {
          label: "Received At",
          key: "latest_node_receiver",
          width: "xs",
        },
        {
          label: "Total Irregularity",
          key: "total_irregularity",
          width: "xs",
          textAlign: "center",
          textColor: "red",
        },
        {
          label: "Total Master Bag",
          key: "total_masterbag",
          width: "xs",
        },
        {
          label: "Total Bag",
          key: "total_bag",
          width: "xs",
        },
        {
          label: "Total Connote",
          key: "total_connote",
          width: "xs",
        },
      ],
      customActionList: [
        {
          label: "Print",
          key: "print",
          attribute: "",
        },
        {
          label: "Depart",
          key: "depart",
          attribute: "",
        },
        {
          label: "Cancel",
          key: "cancel",
          attribute: "danger",
        },
      ],
      loading: false,
      dataItem: {},
      tempSearch: "",
      tempDate: [],
      startDate: "",
      endDate: "",
      pagination: {
        limit: 20,
        page_size: 1,
        page: 1,
      },
      manifest_number: "", // Untuk menyimpan nomor manifes yang sedang dioperasikan
      activeDialogConfirmDepart: false,
      loadingConfirmDepart: false,
    };
  },
  watch: {
    query: function (val, old) {
      if (val !== undefined) {
        this.tempSearch = val;
        if (this.tempSearch !== old) {
          this.pagination.page = 1;
          this.getTableData(
            this.pagination.limit,
            this.pagination.page,
            val,
            this.startDate,
            this.endDate,
            this.filterDateBy
          );
        }
      }
    },
    filterDateBy: function (val, old) {
      if (val !== undefined) {
        if (val !== old) {
          this.getTableData(
            this.pagination.limit,
            this.pagination.page,
            this.tempSearch,
            this.startDate,
            this.endDate,
            val
          );
        }
      }
    },
    dateFilter: function (val, old) {
      if (val !== undefined) {
        this.tempDate = val;
        if (this.tempDate !== old) {
          this.startDate = this.tempDate !== null ? this.tempDate[0] : "";
          this.endDate = this.tempDate !== null ? this.tempDate[1] : "";
        }
        this.getTableData(
          this.pagination.limit,
          this.pagination.page,
          this.tempSearch,
          this.startDate,
          this.endDate,
          this.filterDateBy
        );
      }
    },
  },
  methods: {
    async getTableData(limit, page, q, from, to, qDate) {
      this.loading = true;
      const query = q || "";
      const startDate = from || "";
      const endDate = to || "";
      const queryDate = qDate || "";

      try {
        const res = await axios.get(
          `${this.URL.surat_muatan}?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}&search_by=${this.searchBy}&filter_date_by=${queryDate}&status=${this.status}`,
          this.Helper.header()
        );

        const arr = res.data.data.map((item) => {
          const buttonStatus = {
            print: false,
            depart: false,
            cancel: false,
          };

          // Logic penentuan status tombol berdasarkan status dan persetujuan
          if (item.hasOwnProperty("status") && item["status"] !== null) {
            let strStatus = item["status"].toLowerCase();
            if (item.is_approve === 1) { // Jika sudah di-approve
              if (strStatus.includes("unapproved")) {
                buttonStatus.print = true; // Bisa print
                buttonStatus.depart = true; // Bisa depart
                buttonStatus.cancel = true; // Bisa cancel
              } else if (
                strStatus.includes("depart") ||
                strStatus.includes("transit") || // Menambahkan 'transit'
                strStatus.includes("receive") ||
                strStatus.includes("complete")
              ) {
                buttonStatus.print = true; // Bisa print
                // Depart tidak bisa dilakukan jika sudah depart/receive/complete
              } else if (strStatus.includes("cancel")) {
                // Semua aksi dinonaktifkan jika status cancel
              }
            } else { // Jika belum di-approve
              if (strStatus.includes("unapproved") || strStatus.includes("unreceived")) {
                buttonStatus.print = true; // Bisa print
                // Depart tidak bisa jika belum di-approve
                buttonStatus.cancel = true; // Bisa cancel
              } else if (
                strStatus.includes("depart") ||
                strStatus.includes("transit") || // Menambahkan 'transit'
                strStatus.includes("receive") ||
                strStatus.includes("complete")
              ) {
                buttonStatus.print = true; // Bisa print
              } else if (strStatus.includes("cancel")) {
                // Semua aksi dinonaktifkan jika status cancel
              }
            }
          }

          return {
            ...item,
            pickup_courier_employee_name: item.employee_courier?.employee_name || null,
            manifest_type_name: item.manifest_method?.vehicle_mode_name || null,
            jenis_kiriman: item.vehicle_type?.vehicle_type_name || "-",
            origin_name: `${item.origin?.node_code || "null"} - ${item.origin?.node_name || "-"}`,
            destination_name: `${item.destination?.node_code || "null"} - ${item.destination?.node_name || "-"}`,
            eta: this.dateConvert(item.eta),
            etd: this.dateConvert(item.etd),
            total_masterbag: item.total_masterbag === 0 ? "0" : item.total_masterbag,
            total_bag: item.total_bag === 0 ? "0" : item.total_bag,
            total_connote: item.koli_count === 0 ? "0" : item.koli_count,
            created_at: this.dateConvert(item.created_at),
            approved: item.is_approve === 1 ? true : false,
            // `isDisabled` tidak lagi diperlukan karena `button_status` menangani ini
            latest_node_receiver:
              item.latest_node_name_receiver && item.latest_node_code_receiver
                ? `${item.latest_node_name_receiver} (${item.latest_node_code_receiver})`
                : "-",
            total_irregularity: item.total_irregularity == 0 ? "" : item.total_irregularity,
            button_status: buttonStatus, // Tambahkan status tombol kustom
          };
        });

        this.dataTable = arr;
        this.pagination = {
          page: res.data.meta.current_page,
          limit: parseInt(res.data.meta.per_page),
          page_size: res.data.meta.last_page,
        };

        if (!arr.length) {
          // this.openNotification('warn', null, 'Data Surat Muatan kosong!', ' Silakan buat data Surat Muatan baru.');
        }
      } catch (err) {
        this.openNotification(
          "danger",
          err.response?.data.code || "",
          "Gagal memuat data Surat Muatan",
          err
        );
      } finally {
        this.loading = false;
      }
    },
    closeDialog() {
      this.dialogManifestList = false;
      this.refresh();
    },
    actionLimit(val) {
      this.pagination.limit = val;
      this.pagination.page = 1;
      this.refresh();
    },
    actionPagination(val) {
      this.pagination.page = val;
      this.refresh();
    },
    refresh() {
      this.getTableData(
        this.pagination.limit,
        this.pagination.page,
        this.tempSearch,
        this.startDate,
        this.endDate,
        this.filterDateBy
      );
    },
    actionUpdate(val, key) {
      // `val` adalah data item, `key` adalah kunci tindakan (print, depart, cancel)
      switch (key) {
        case "print":
          this.manifest_number = val.manifest_number;
          this.print();
          break;
        case "depart":
          this.manifest_number = val.manifest_number;
          this.activeDialogConfirmDepart = true;
          break;
        case "cancel":
          this.manifest_number = val.manifest_number;
          this.activeDialogCancel = true;
          break;
        case "edit": // Untuk handleEdit yang sekarang dipanggil oleh @actionUpdate
          this.handleEdit(val);
          break;
        default:
          break;
      }
    },
    handleEdit(val) { // Mengubah nama agar lebih eksplisit untuk pengeditan
      if (this.dataTable.length > 0) {
        // Pemetaan data yang diperlukan untuk dialogCreateManifest
        val["node_id_origin"] = val["origin_name"];
        val["node_id_destination"] = val["destination_name"];
        val["manifest_method_id"] = parseInt(val["manifest_method_id"]);
        val["vehicle_id"] = parseInt(val["vehicle_id"]);
        val["pic_employee_id"] = parseInt(val["pic_employee_id"]);
        val["vehicle_type_id"] = parseInt(val["vehicle_type_id"]);
        val["flight_number"] = val["flight_number"];
        val["flight_schedule"] = val["flight_schedule"];

        this.dataItem = val;

        // Logika untuk menampilkan/menyembunyikan flight number/schedule
        if (parseInt(val["manifest_method_id"]) === 1) { 
          this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_NUMBER_visible", true);
          this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_SCHEDULE_visible", true);
          this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_NUMBER_ValueData", val["origin"]);
        } else {
          this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_NUMBER_visible", false);
          this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_SCHEDULE_visible", false);
          this.$store.dispatch("SET_SURAT_MUATAN_FLIGHT_NUMBER_ValueData", val["origin"]);
        }
        this.$store.dispatch(`SET_SURAT_MUATAN_NODE_ID_ORIGIN_ValueData`, val["origin"]);
        this.$store.dispatch(`SET_SURAT_MUATAN_NODE_ID_DESTINATION_ValueData`, val["destination"]);

        this.$nextTick(() => {
          this.dialogManifestList = true;
        });
      }
    },
    // Metode untuk Print Surat Muatan
    print() {
      let routeData = this.$router.resolve({
        name: "printGeneral", 
        params: {
          id: this.manifest_number,
          type: "manifest", 
          node_id: this.listenNodeId,
        },
      });

      const printWindow = window.open(routeData.href, "_blank", "noopener");

      if (printWindow) {
        printWindow.onload = function () {
          printWindow.print();
          printWindow.onafterprint = () => printWindow.close();
        };
      }
    },
    // Metode untuk konfirmasi depart
    confirmDepart() {
      this.loadingConfirmDepart = true;
      this.depart();
    },
    // Metode untuk Depart Surat Muatan
    async depart() {
      this.loadingConfirmDepart = true; // Menggunakan loading untuk dialog confirm
      try {
        const res = await axios.patch(
          `${this.URL.depart_surat_muatan}/${this.manifest_number}/depart?n=${this.listenNodeId}`,
          {},
          this.Helper.header()
        );
        this.print(); // Cetak setelah berhasil depart
        this.openNotification(
          "success",
          null,
          "Berhasil",
          "Surat Muatan berhasil diberangkatkan"
        );
      } catch (err) {
        this.openNotification(
          "danger",
          err?.response?.data?.code ?? "",
          "Gagal memberangkatkan Surat Muatan",
          err?.response?.data?.message ?? "Terjadi kesalahan"
        );
      } finally {
        this.closeDialogConfirmDepart();
        this.refresh();
      }
    },
    closeDialogConfirmDepart() {
      this.activeDialogConfirmDepart = false;
      this.loadingConfirmDepart = false;
    },
    // Metode untuk konfirmasi cancel
    confirmCancel() {
      this.activeLoadingCancel = true; // Menggunakan loading untuk dialog cancel
      this.cancel();
    },
    async cancel() {
      try {
        const res = await axios.delete(
          `${this.URL.revamp_surat_muatan}/${this.manifest_number}?n=${this.listenNodeId}`, 
          this.Helper.header()
        );
        this.openNotification(
          "success",
          null,
          "Berhasil",
          "Surat Muatan berhasil dibatalkan"
        );
      } catch (err) {
        this.openNotification(
          "danger",
          err?.response?.data?.code ?? "",
          "Gagal",
          err?.response?.data?.message ?? "Terjadi kesalahan"
        );
      } finally {
        this.closeDialogCancel();
        this.refresh();
      }
    },
    closeDialogCancel() {
      this.activeDialogCancel = false;
      this.activeLoadingCancel = false;
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>
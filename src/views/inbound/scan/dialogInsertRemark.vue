<template>
  <dialog-master
    :actived="actived"
    :loading="loading"
    :closeDialog="closeDialog"
    width="md"
  >
    <template v-slot:header>
      Insert / Edit Remark
    </template>

    <template v-slot:content>
      <div class="input-button-row">
            <vs-input
                v-model="remarkText"
                placeholder="Masukkan remark"
                class="remark-input"
            />
            <vs-button color="primary" @click="submitRemark" class="submit-button">
                Submit
            </vs-button>
      </div>

      <vs-row>
        <vs-col xs="12" class="mt-4">
          <vs-table :data="remarkList">
            <template v-slot:thead>
                <vs-th style="width: 50px; text-align: center;">No</vs-th>
                <vs-th>Remark</vs-th>
                <vs-th>User</vs-th>
                <vs-th>Node Code</vs-th>
                <vs-th>Created At</vs-th>
            </template>

            <template v-slot:tbody>
                <vs-tr v-for="(item, index) in remarkList" :key="index">
                    <vs-td style="text-align: center;">{{ index + 1 }}</vs-td>
                    <vs-td>{{ item.remark }}</vs-td>
                    <vs-td>{{ item.user }}</vs-td>
                    <vs-td>{{ item.node_code }}</vs-td>
                    <vs-td>{{ item.created_at }}</vs-td>
                </vs-tr>
            </template>
          </vs-table>
        </vs-col>
      </vs-row>
    </template>
  </dialog-master>
</template>

<script>
import axios from "axios";
import master from "@/mixins/master";
import FormInputController from "@/components/form/formInputController";
import dialogMaster from "@/components/dialog/dialogMaster";

export default {
  name: "dialog-insert-remark",
  mixins: [master],
  components: {
    dialogMaster,
    "form-input-controller": FormInputController,
  },
  props: {
    actived: Boolean,
    loading: Boolean,
    closeDialog: Function,
    inbound_number: [String, Number],
  },
  data() {
    return {
      remarkText: "",
      remarkList: [],
      isSubmitting: false,
    };
  },
  watch: {
    actived(val) {
      if (val && this.inbound_number) {
        this.loadRemarks();
      }
    },
  },
  methods: {
    async submitRemark() {
      if (!this.remarkText || !this.inbound_number) return;

      this.isSubmitting = true;

      try {
        await axios.put(
          `${this.URL.insert_remark}/${this.inbound_number}?n=${this.listenNodeId}`,
          {
            remark_inbound_confirm: this.remarkText,
          },
          this.Helper.header()
        );

        this.$vs.notification({
          title: "Success",
          text: "Remark berhasil ditambahkan",
          color: "success",
          position: "top-right",
        });

        await this.loadRemarks();
        this.remarkText = "";
      } catch (err) {
        this.$vs.notification({
          title: "Error",
          text: "Gagal mengirim remark.",
          color: "danger",
          position: "top-right",
        });
      } finally {
        this.isSubmitting = false;
      }
    },

    async loadRemarks() {
      if (!this.inbound_number) return;

      try {
        const res = await axios.get(
          `${this.URL.inbound_remark}/${this.inbound_number}?n=${this.listenNodeId}`,
          this.Helper.header()
        );

        this.remarkList = (res.data.data || []).map((item) => ({
          remark: item.remarks,
          user: item.user_login,
          node_code: item.node_code,
          created_at: item.created_at,
        }));
      } catch (err) {
        this.remarkList = [];
        this.$vs.notification({
          title: "Error",
          text: "Gagal mengambil remark.",
          color: "warning",
          position: "top-right",
        });
      }
    },
  },
};
</script>

<style scoped>
.input-button-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.remark-input {
  flex: 3; /* Lebih besar dari tombol */
}

.submit-button {
  flex: 1;
  white-space: nowrap; /* agar tidak kepotong */
}
.mt-4 {
  margin-top: 16px;
}
.mt-6 {
  margin-top: 24px;
}
</style>

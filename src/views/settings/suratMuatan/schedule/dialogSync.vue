<template>
  <div>

    <dialog-master
      width="lg"
      :actived="listenActive"
      :closeDialog="cancel"
      :loading="listenLoading"
    >
      <template v-slot:header>
        {{ listenTitle || 'Sync Filter' }}
      </template>

      <template v-slot:content>
        <form-input-controller
          ref="formDataController"
          typeForm="sync_surat_muatan"
          :dataItem="dataItem"
          @formData="formData"
          @onChangeCustom="onChangeCustom"
        />
      </template>

      <template v-slot:footer>
        <vs-row justify="flex-end">
          <vs-col w="3">
            <vs-button block danger flat transparent :active="true" @click="cancel">
              Cancel
            </vs-button>
          </vs-col>
          <vs-col w="3">
            <vs-button
              block flat transparent type="submit" :active="true"
              @click="submitAndOpenDialogSyncResult"
            >
              Sync
            </vs-button>
          </vs-col>
        </vs-row>
      </template>
    </dialog-master>

    <dialog-sync-result
      :actived="dialogSyncResultActive"
      :form="form"
      :closeDialog="closeDialogResult"
    />

  </div> 
</template>


<script>
import axios from "axios";
import master from "@/mixins/master";

import DialogMaster from "@/components/dialog/dialogMaster";
import FormInputController from "@/components/form/formInputController";
import Selector from "@/components/input/select";
import dialogSyncResult from "@/views/settings/suratMuatan/schedule/dialogSyncResult";

export default {
  name: "sync-dialog-surat-muatan",
  mixins: [master],
  components: {
        "dialog-master": DialogMaster,
        "form-input-controller": FormInputController,
        "selector": Selector,
        "dialog-sync-result":dialogSyncResult
    },
  props: {
    actived: Boolean,
    title: String,
    closeDialog: Function,
    dataItem: Object,
  },
  data() {
    return {
      form: {},
      loading: false,
      dialogSyncResultActive: false
    };
  },
  computed: {
    listenActive() {
      return this.actived;
    },
    listenTitle() {
      return this.title;
    },
    listenLoading() {
      return this.loading;
    }
  },
  methods: {
    cancel() {
      this.form = {};
      this.closeDialog();
    },
    closeDialogResult(){
        this.dialogSyncResultActive = false;
    },
    formData(form) {
      this.form = form;

      this.handleSubmit();
    },
     handleSubmit(){
        this.$refs.formDataController.handleSubmit();
    },
    onChangeCustom(key, value, object) {
      this.form[key] = value;
    },
   submitAndOpenDialogSyncResult() {
        if (Object.keys(this.form).length === 0) {
        this.openNotification("danger", "", "Gagal", "Form filter kosong");
        return;
        }
        this.dialogSyncResultActive = true;
    }
  }
};
</script>

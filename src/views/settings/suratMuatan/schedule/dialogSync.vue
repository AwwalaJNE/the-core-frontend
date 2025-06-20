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
          @inputFocus="inputFocus"
          :querySearch="querySearch"
        />
        <p class="notes">Notes : Singel or multiple filters can be used</p>
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
              @click="handleSubmit"
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
      @dataSubmitted="handleSyncResultDataSubmitted"
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
      this.submitAndOpenDialogSyncResult();
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
    },
    handleSyncResultDataSubmitted() {

        this.closeDialogResult();
        this.closeDialog();
        this.$nextTick(() => { // Gunakan nextTick untuk memastikan DOM diperbarui sebelum memicu penyegaran
            this.$emit('dataSyncCompleted');
        });

  },   
  inputFocus(obj) {
        if (['dep_iata', 'arr_iata', 'airline_iata'].includes(obj.key)) {
            switch (obj.key) {
                case 'dep_iata':
                case 'arr_iata':
                    this.autoCompleteUrl = this.URL.schedule + '/airport-lov';
                    this.input_value = "iata";
                    this.input_label = "label";
                    break;
                case 'airline_iata':
                    this.autoCompleteUrl = this.URL.schedule + '/airlines-lov-name';
                    this.input_value = "iata";
                    this.input_label = "label";
                    break;
                default:
            }
        }
    },
    querySearch(queryString, cb) {
        clearTimeout(this.airportSearchTimeout);
            this.airportSearchTimeout = setTimeout(() => {
                if (!queryString || queryString.length < 2 || !this.autoCompleteUrl) {
                cb([]);
                return;
                }
                axios
                .get(`${this.autoCompleteUrl}?n=${this.listenNodeId}&s=${queryString}`, this.Helper.header())
                .then(res => {
                    let result = res.data.data || [];
                    let suggestions = [];

                    result.length > 0 && result.map(item => {
                    suggestions.push({
                        value: item.label,     // akan ditampilkan ke user
                        data: item.value       // akan disimpan ke form (misalnya "DPS")
                    });
                    });

                    cb(suggestions);
                })
                .catch(error => {
                    console.error("Error searching airports:", error);
                    this.$vs.notification({
                    title: 'Error',
                    text: 'Gagal memuat data bandara.',
                    color: 'danger'
                    });
                    cb([]);
                });
            }, 500);
    }


}

};
</script>
<style scoped>

.notes{
  text-align: left; 
  font-size: 0.8em; 
  margin-left: 10px; 
  margin-top: 0px;
}

</style>
<template>
  <div>
    <vs-row justify="space-between">
      <vs-col xs="6" sm="4" lg="4">
        <div class="titlePage">
          <breadcrumb />
          <h2>{{ title }}</h2>
        </div>
      </vs-col>
    </vs-row>
    <section class="bagging">
      <vs-row align="flex-end">
        <vs-col xs="8" sm="4" lg="3">
          <template>
            <!-- <p style="text-align: left">Parent:</p> -->
            <div class="center in-get-bag">
              <vs-input
                border
                type="text"
                v-model="item_code"
                :label-placeholder="inputLabelPlaceholder"
                :autofocus="true"
                ref="formInputUnbagging"
                icon-after
                @keyup.enter.native="updateValue"
                @click-icon="$refs.cameraScanner.open('formInputUnbagging')"
              >
                <template #icon>
                  <i class="bx bx-barcode-reader"></i>
                </template>
              </vs-input>
            </div>
          </template>
        </vs-col>
      </vs-row>
      <vs-row justify="space-between" class=" mt-2">
        <unbagDetail ref="unbagDetail" :itemNumber="item_number" @resetInput="resetInput" @saveBagNumber="saveBagNumber"></unbagDetail>
      </vs-row>
    </section>

    <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />
  </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";
import Breadcrumb from "@/components/breadcrumb/index";
import unbagDetail from "@/views/inventory/unbag/unbagDetailList";
import CameraScanner from "@/components/scanner/camera.vue";

export default {
  name: "InventoryUnbagging",
  mixins: [master],
  components: {
    breadcrumb: Breadcrumb,
    unbagDetail: unbagDetail,
    CameraScanner,
  },
  data() {
    return {
      title: "Open Bag",
      item_code: "",
      item_number: "",
      bag_number: "",
      form: {},
      inputLabelPlaceholder: "Please enter item code",
      radio_option: "connote",
    };
  },
  computed: {
    isInputDisabled() {
      return this.bag_number !== '';
    }
  },
  methods: {
    updateValue() {
      this.form.item_number = this.item_code;
      if (this.item_code !== null) {
        this.item_number = this.item_code;
      }
      this.$nextTick(() => {
        this.handleClearForm();
      });
    },

    handleClearForm() {
      this.form = {};
      this.item_code = "";
    },

    onCameraScannerGetData(data) {
      if (
        // eslint-disable-next-line operator-linebreak
        data &&
        // eslint-disable-next-line operator-linebreak
        data.event === "result" &&
        data.namespace === "formInputUnbagging"
      ) {
        this.item_code = data.data.text;
        this.updateValue();
      }
    },
    resetInput(val) {
      this.inputLabelPlaceholder = "Please enter item code";
      this.bag_number = "";
    },
    saveBagNumber(val) {
      this.bag_number = val;
    }
  },
};
</script>
<style lang="scss">
.bagging {
  min-height: 50vh;
  margin-top: 2em;
}

.in-get-bag {
  font-size: 16px;
}
.logo {
}
.mt-2 {
  margin-top: 20px;
}
</style>

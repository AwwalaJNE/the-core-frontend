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
    <!-- <template>
      <div class="center in-get-bag">
        <vs-row style="margin-top:1em">
          <vs-col xs="12" sm="3" lg="2" style="margin-bottom: 10px; text-align: left;" justify="start">
            <span>Item Type:</span>
          </vs-col>
        </vs-row>
        <vs-row  align="center">
          <vs-col xs="12" sm="3" lg="2" style="margin-bottom: 10px;">
            <vs-radio v-model="radio_option" val="connote" :disabled="isInputDisabled">
              Connote (Orion)
            </vs-radio>
          </vs-col>
          <vs-col xs="12" sm="3" lg="2" style="margin-bottom: 10px;">
            <vs-radio v-model="radio_option" val="koli" :disabled="isInputDisabled">
              Koli
            </vs-radio>
          </vs-col>
          <vs-col xs="12" sm="3" lg="2">
            <vs-radio v-model="radio_option" val="bag" :disabled="isInputDisabled">
              Masterbag
            </vs-radio>
          </vs-col>
        </vs-row>
      </div>
    </template> -->
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
        <!-- <vs-col xs="4" sm="2" lg="1">
          <template>
            <div class="center in-get-bag">
              <vs-button @click="updateValue">Submit</vs-button>
            </div>
          </template>
        </vs-col> -->
        <!-- <vs-col xs="8" sm="4" lg="3">
          <template>
            <p style="text-align: left">Item:</p>
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
        </vs-col> -->
        <!-- <vs-col xs="4" sm="2" lg="1">
          <template>
            <div class="center in-get-bag">
              <vs-button @click="updateValue">Submit</vs-button>
            </div>
          </template>
        </vs-col> -->
      </vs-row>

      <!-- <vs-row align="flex-end">
        <vs-col xs="4" sm="2" lg="1">
          <p style="text-align: left">Parent:</p>
        </vs-col>
        <vs-col xs="4" sm="2" lg="3">
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
        </vs-col>
        <vs-col xs="4" sm="2" lg="1">
          <template>
            <div class="center in-get-bag">
              <vs-button @click="updateValue">Submit</vs-button>
            </div>
          </template>
        </vs-col>
      </vs-row>
      <vs-row align="flex-end">
        <vs-col xs="4" sm="2" lg="1">
          <p style="text-align: left">Parent:</p>
        </vs-col>
        <vs-col xs="4" sm="2" lg="3">
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
        </vs-col>
        <vs-col xs="4" sm="2" lg="1">
          <template>
            <div class="center in-get-bag">
              <vs-button @click="updateValue">Submit</vs-button>
            </div>
          </template>
        </vs-col>
      </vs-row> -->
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
      inputLabelPlaceholder: "Masukan code BAG",
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
        if (this.inputLabelPlaceholder.includes("CONNOTE")) {
          this.item_number = this.item_code + "00";
        }

        if (this.radio_option === "connote") {
          this.inputLabelPlaceholder = "Masukan code CONNOTE (ORION)";
        } else if (this.radio_option === "koli") {
          this.inputLabelPlaceholder = "Masukan code KOLI";
        } else if (this.radio_option === "bag") {
          this.inputLabelPlaceholder = "Masukan code BAG ITEM";
        }
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
      this.inputLabelPlaceholder = "Masukan code BAG";
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

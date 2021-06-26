<template>
  <dialog-master :actived="listenActive" :closeDialog="closeDialog">
    <template v-slot:header>
      {{ listenTitle }}
    </template>

    <template v-slot:content>
      <vs-col xs="12" sm="12" lg="12">
        <vs-input
          border
          v-model="scan_bag"
          v-on:keyup.enter="scanBag"
          :autofocus="true"
          placeholder="Input / scan item number"
        />
      </vs-col>
      <div class="dialog-content-row center">
        <vs-row class="dialog-content">
          <template v-if="bagNumberList.length > 0">
            <vs-row v-for="(item, key) in bagNumberList" :key="key">
              <vs-checkbox
                style="margin-top: 0.5em"
                v-model="item_picked"
                :val="item.value"
                :key="key"
              >
                {{ item.label }}
              </vs-checkbox>
            </vs-row>
          </template>
        </vs-row>
      </div>
    </template>

    <template v-slot:footer>
      <vs-row justify="flex-end">
        <vs-col w="3">
          <vs-button
            transparent
            block
            danger
            flat
            :active="true"
            @click="cancel"
          >
            Cancel
          </vs-button>
        </vs-col>
        <vs-col w="3">
          <vs-button
            transparent
            block
            flat
            :active="true"
            type="submit"
            :loading="btnLoading"
            @click="handleSubmit"
            >Submit
          </vs-button>
        </vs-col>
      </vs-row>
    </template>
  </dialog-master>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";
import DialogMaster from "@/components/dialog/dialogMaster";
export default {
  name: "void-transactoin",
  mixins: [master],
  components: {
    "dialog-master": DialogMaster,
  },
  props: {
    closeDialog: Function,
    refresh: Function,
    active: Boolean,
    title: String,
    pickupData: Object,
  },
  computed: {
    listenActive() {
      return this.active;
    },
    listenTitle() {
      return this.title;
    },
  },
  data() {
    return {
      btnLoading: false,
      form: {},
      dataitem: {},
      bagNumberList: [],
      item_picked: [],
      scan_bag: "",
      pickup_number: "",
    };
  },
  watch: {
    pickupData: function (val) {
      if (val !== undefined) {
        if (this.dataitem !== val) {
          let arr = [];
          val.pickup_detail.map((item) => {
            let obj = {};
            obj["label"] = item.item_number;
            obj["value"] = item.item_number;
            arr.push(obj);
          });
          this.bagNumberList = arr;
          this.pickup_number = val.pickup_number;
        }
      }
    },
  },
  methods: {
    handleSubmit() {
      this.btnLoading = true
      this.form = {
        pickup_number: this.pickup_number,
        item_number: this.item_picked,
      };
      // console.log(this.item_picked);
      if (this.item_picked.length > 0) {
        this.updateData() // trigger function submit form dari luar component formMaster
      } else {
        this.openNotification(
          "danger",
          "Scan Item!",
          "List item cannot be empty"
        );
      }
      this.btnLoading = false;      
          this.loading = false;

    },

    async updateData() {
      await axios
        .post(
          this.URL.pickup +
            `/${this.pickup_number}/picking-up?n=${this.listenNodeId}`,
          JSON.stringify(this.form),
          this.Helper.header()
        )
        .then((res) => {
          this.closeDialog();
          this.cancel();
          this.$emit("refresh");
          this.openNotification(null, "Success", "Update Pickup is success");
        })
        .catch((err) => {
          this.loading = false;
          this.closeDialog();
          this.cancel();
          this.$emit("refresh");
          this.openNotification("danger", "Update Pickup is failed", err);
        });
    },
    activeLoading() {
      return this.btnLoading;
    },
    cancel() {
      this.btnLoading = false;
      this.closeDialog();
      this.item_picked = [];
    },
    updateValue(val) {},
    scanBag() {
      let dataFoundFromList = this.bagNumberList.some(
        (item) => item.value == this.scan_bag
      );
      if (dataFoundFromList) {
        let dataFoundFromPicked = this.item_picked.includes(this.scan_bag);
        if (!dataFoundFromPicked) {
          this.item_picked.push(this.scan_bag);
        }
      }
      this.scan_bag=null;
    },
  },
};
</script>
<style lang="scss">
.dialog-content {
  max-width: 20em;
  max-height: 15em;
  width: 20em;
}
.dialog-content-row {
  max-height: 15em;
  overflow: auto;
}
</style>
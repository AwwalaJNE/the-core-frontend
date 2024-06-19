<template>
  <dialog-master 
    :actived="listenActive"
    :closeDialog="closeDialog"
  >
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
        <table-master 
          :dataTable="bagNumberList" 
          :dataColumn="datacolumn" 
          :tableLoading="loadingSelectedData"
          :hasAction="false"
          :hasPagination="false"
          :expandable="true"
          :isMultipleSelect="true"
          :selectedData="item_picked"
        />
      </div>
    </template>
  </dialog-master>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";
import DialogMaster from "@/components/dialog/dialogMaster";
import TableMaster from "@/components/table/tableMaster.vue";

export default {
  name: "void-transactoin",
  mixins: [master],
  components: {
    "dialog-master": DialogMaster,
    "table-master" : TableMaster,
  },
  props: {
    closeDialog: Function,
    refresh: Function,
    active: Boolean,
    title: String,
    // pickupData: Object,
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

      tempSearch: this.query ? this.query : "",
      bag_id:"",

      dataTable: [],
      datacolumn: [
        {
          label: "Bag",
          key: "value",
          width: "auto"
        },
      ],
      loading: false,
      dataItem: {},
      pagination: {
        limit:20,
        page_size: 1,
        page: 1
      },
      loadingSelectedData:true,
    };
  },
  watch: {
    // pickupData: {
    //   async handler(val) {
    //     try {
    //       await this.handlePickupData(val);
    //       console.log("this.item_picked", this.item_picked);
    //     } catch (error) {
    //       console.error('Error handling pickupData:', error);
    //     }
    //   },
    // },
  },
  methods: {
    async handlePickupData(val) {
      if (val !== null && val !== undefined && val.pickup_detail !== null && val.pickup_detail !== undefined) {
        this.bagNumberList = this.createBagNumberList(val.pickup_detail);

        if (this.bagNumberList.length > 0) {
          await Promise.all(this.bagNumberList.map(async item => {
            this.bag_id = item.value;
            await this.getDataBagDetail(this.bag_id);
            this.populateItemChildren(item);
          }));

          this.item_picked = this.bagNumberList.map(item => ({
            children: item.children,
            label: item.label,
            value: item.value,
            is_picked: item.is_picked,
            item_type: item.item_type,
          }));
        }
      }
    },
    createBagNumberList(pickupDetail) {
      return pickupDetail
        .filter(item => item?.item_type === 'BAG')
        .map(item => ({
          label: item.item_number,
          value: item.item_number,
          is_picked: item.is_picked,
          item_type: item.item_type,
          children: {
            No: [],
            Connote: [],
            Koli: ["loading"],
            Origin: [],
            Destination: [],
          },
        }));
    },
    populateItemChildren(item) {
      const objchild = {
        No: [],
        Connote: [],
        Koli: [],
        Origin: [],
        Destination: [],
      };

      if (this.dataTable !== null && this.dataTable !== undefined) {
        this.dataTable.forEach(dataTableItem => {
          objchild.No.push(dataTableItem.no || "");
          objchild.Connote.push(dataTableItem.item_number || "");
          objchild.Koli.push(dataTableItem.koli_qty || "");
          objchild.Origin.push(dataTableItem.origin_code || "");
          objchild.Destination.push(dataTableItem.destination_code || "");
        });

        item.children = objchild;
      }
    },
    async getDataBagDetail(bagId) {
      this.loading = true;

      try {
        const res = await axios.get(
          this.URL.bag + '/' + bagId.replace('/', '-') + `?n=${this.listenNodeId}`,
          this.Helper.header()
        );

        let data = res.data;
        let bag_des = data.data && data.data.destination ? data.data.destination.node_code : '-';
        let arr = data.detail;

        arr.forEach((item, index) => {
          item["no"] = index + 1;
          item['destination_code'] = item.destination_code ? item.destination_code : bag_des;
          item['origin_code'] = item.origin_code ? item.origin_code : '-' ;
          item['bag_detail_qty'] = data.data.bag_detail_qty;
          item["isDisabled"] = item.is_confirmed == 0 ? true : false;
        });

        this.dataTable = arr;

        this.loading = false;
        this.$emit("getResponse", data, this.loading);

      } catch (err) {
        let errMessage = err.response ? err.response.data.message : 'Failed to populate bag';
        this.loading = false;
        this.$emit("getResponse", {}, this.loading);
        this.openNotification('danger', 'Failed to populate bag', errMessage);
      }
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
    scanBag() {
      let dataFoundFromList = this.bagNumberList.some(
        (item) => item.value == this.scan_bag
      );
    
      if (dataFoundFromList) {
        let dataFoundFromPicked = this.item_picked.includes(this.scan_bag);

        if (!dataFoundFromPicked) {
          let bagRow = this.bagNumberList.find(x => x.value === this.scan_bag)
          this.item_picked.push(bagRow);
        }
      } else {
        this.openNotification("danger", "Select item is failed", "Bag or Connote not found!");
      }
      this.scan_bag=null;
    },
  },
};
</script>
<style lang="scss">
.vs-dialog {
  min-width: 800px;
}
.dialog-content {
  max-width: 20em;
  max-height: 15em;
  width: 20em;
}
.dialog-content-row {
  max-height: 15em;
  overflow: auto;
  padding: 0 10px;
}
</style>
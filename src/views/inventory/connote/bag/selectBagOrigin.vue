<template>
  <inputan :name="name" :rules="rules">
    <template v-slot:inputan="props">
      <el-select
        class="m-select"
        :multiple="true"
        :label="name"
        :border="border"
        @change="handleChange"
        :state="props.err !== undefined && props.err !== '' ? 'danger' : 'gray'"
        v-model="value"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="Code Origin"
        :remote-method="fetchData"
        :loading="loading"
        :data-testid="`select-code_origin`"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          {{ item.label }}
        </el-option>
      </el-select>
    </template>
  </inputan>
</template>

<script>
import axios from "axios";
import master from "@/mixins/master";
import Inputan from "@/components/input/inputan";

export default {
  name: "All-Origin",
  mixins: [master],
  components: {
    "inputan": Inputan
  },
  props: {
    name: String,
    rules: String,
    valueData: Array,
    selectedValue: [Array, String, Number],
    formKey: String,
    isMultiple: Boolean,
    border: Boolean,
  },
  data() {
    return {
      value: this.selectedValue ?? "-",
      options: this.valueData ?? [],
      loading: false,
      limit: 0,
      query: "",
    };
  },
  computed: {
    listenFormKey() {
      return this.formKey || "";
    },
    listenIsMultiple() {
      return this.isMultiple || false;
    },
  },
  watch: {
    valueData(val) {
      if (val !== undefined) {
        this.options = val;
      }
    },
    selectedValue(val) {
      if (val !== undefined) {
        this.value = val;
      }
    },
  },
  methods: {
    handleChange(val) {
      this.$emit("updateBagOrigin", this.listenFormKey, val);
    },
    async fetchData(query = "") {
      this.loading = true;
      if (query !== "scroll") this.query = query;
      this.limit += 15;

      try {
        const res = await axios.get(
          `${this.URL.node_list}?n=${this.listenNodeId}&s=${this.query}&limit=${this.limit}`,
          this.Helper.header()
        );

        if (res.data.data.length > 0) {
          this.options = res.data.data.map(item => ({
            label: item.node_name,
            value: item.node_id
          }));
        }
      } catch (err) {
        this.openNotification("danger", err.response?.data.code || "", "Failed to fetch data", err);
      }


      this.loading = false;
    },
  },
  mounted() {
    const dropdown = document.querySelector('.el-select-dropdown__wrap.el-scrollbar__wrap');
    if (dropdown) {
      dropdown.addEventListener("scroll", () => {
        if (dropdown.scrollHeight - (dropdown.scrollTop + dropdown.clientHeight) < 1) {
          this.fetchData("scroll");
        }
      });
    }
  },
};
</script>

<style lang="scss">
.m-select {
  &.vs-select-content {
    max-width: unset;
    margin: 10px 0;
  }
  .vs-select__label--label {
    transform: translate(-3px, -28px) !important;
  }
  .vs-select.activeOptions .vs-select__input:focus ~ .vs-select__label--label {
    transform: translate(-3%, -28px) !important;
  }
}
</style>

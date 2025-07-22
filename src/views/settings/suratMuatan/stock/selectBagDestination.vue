<template>
    <inputan :name="name" :rules="rules">
      <template v-slot:inputan="props">
        <el-select
          class="m-select"
          :label="name"
          :border="border"
          @change="handleChange"
          :state="props.err !== undefined && props.err !== '' ? 'danger' : 'gray'"
          v-model="value"
          filterable
          remote
          reserve-keyword
          placeholder="Code Destination"
          :remote-method="fetchData"
          :loading="loading"
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
  import master from "@/mixins/master"
  import Inputan from "@/components/input/inputan"
  
  export default {
    name: "All-Destination",
    mixins: [master],
    components: {
      "inputan": Inputan
    },
    props: {
      name: String,
      rules: String,
      valueData: Array,
      selectedValue: [String, Number], // Remove Array
      formKey: String,
      border: Boolean,
    },
    data() {
      return {
        value: this.selectedValue ?? "", // Default to empty string
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
        this.$emit("updateBagDestination", this.listenFormKey, val); // val is now a string
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
  }
  </script>
  
  <style lang="scss" scoped>
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
  
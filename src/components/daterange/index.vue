<template>
  <div class="searchbox">
    <vs-input
      icon-after
      v-model="value"
      placeholder="Search"
      @change="searchValue"
    >
      <template #icon>
        <i class="bx bx-search" @click="clear"></i>
      </template>
    </vs-input>
  </div>
</template>
<template>
  <div :class="`vs-input-content vs-input-content--has-label custom_datePicker`">
    <el-date-picker
      v-model="value"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="-"
      start-placeholder="Start date"
      end-placeholder="End date"
      value-format="yyyy-MM-dd"
      @change="searchDate"
      :picker-options="pickerOptions"
      class="date-range-picker"
      :size="size"
    >
    </el-date-picker>
  </div>
</template>
<script>
export default {
  name: "search-date",
  props: {
    size: {
      type: String,
      default: () => "default",
    },
    valueData: Array
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "Last week",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "Last month",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "Last 3 months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value: this.valueData || [],
    };
  },
  methods: {
    searchDate() {
      this.$emit("searchDate", this.value);
    },
    clear() {
      this.value = [];
      this.$emit("searchDate", this.value);
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 570px) {
  .date-range-picker {
    max-width: 280px;
  }
}
</style>

<style>
@media screen and (max-width: 570px) {
  div.el-picker-panel.el-date-range-picker.el-popper {
    z-index: 2003;
    padding: 10px;
    max-width: 290px;
    overflow: scroll;
    position: absolute;
    top: 287px;
    left: 19px;
    margin-left: 60px;
  }
}
</style>

<style lang="scss">
    .custom_datePicker{
        .el-date-editor.el-input {
            width: 100% !important;
        }
        .el-input__inner {
            background-color: rgba(var(--vs-gray-2), 1) !important;
            border-radius: 12px !important;
            border: 0 !important;
            height: 38px !important;
            line-height: 38px !important;
        }
        .el-range-input{
            background-color: transparent !important;
        }
        &.danger{
            .el-input__inner {
                background: rgba(var(--vs-danger), 0.1) !important;
                color: rgba(var(--vs-danger), 1);
            }
            
            label{
                color: rgba(var(--vs-danger), 1);
            }
        }
    }
    .el-picker-panel{
        z-index: 999999 !important;
    }
</style>
<template>
  <div class="center con-selects">
    <vs-select 
    filter 
    placeholder="Filter" 
    v-model="value">
      <vs-option
        v-for="item in dataItem"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        {{ item.label }}
      </vs-option>
    </vs-select>
  </div>
</template>
<script>
export default {
  name: "select-custom",
  components: {},
  props: {
    dataItem: Array,
  },
  data: () => ({
    value: null,
  }),
  methods: {
    // async dataItem() {
    //   return [
    //     { value: 1, label: "Vuesax" },
    //     { value: 2, label: "Vue" },
    //     { value: 3, label: "Javascript" },
    //     { value: 4, label: "Sass" },
    //     { value: 5, label: "Typescript" },
    //     { value: 6, label: "Webpack" },
    //     { value: 7, label: "Nodejs" },
    //   ];
    // },
  },
  mounted() {},
};
</script>

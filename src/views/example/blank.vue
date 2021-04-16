<template>
  <vs-row>
    <vs-col xs="12" sm="12" lg="12">
      <div class="titlePage">
        <breadcrumb />
        <h2>{{ title }}</h2>
      </div>
    </vs-col>
    <vs-col xs="12" sm="12" lg="12">
      <div class="box" style="text-align: left">
        <vs-row>
          <vs-col xs="12" sm="12" lg="12">
              <select-custom :dataItem="dataItem"
              />
          </vs-col>
        </vs-row>
      </div>
    </vs-col>
  </vs-row>
</template>

<script>
import axios from "axios";
import master from "@/mixins/master";
import FormInputController from "@/components/form/formInputController";
import { Skeleton } from "vue-loading-skeleton";
import Breadcrumb from "@/components/breadcrumb/index";
import SelectCustom from "@/components/input/selectCustom";

export default {
  name: "profile",
  mixins: [master],
  components: {
    "form-input-controller": FormInputController,
    skeleton: Skeleton,
    breadcrumb: Breadcrumb,
    'select-custom': SelectCustom,    
    
  },
  computed: {
  },
  data() {
    return {
      title: "Canvas Page",
      dataItem: [
        { value: 1, label: "Vuesax" },
        { value: 2, label: "Vue" },
        { value: 3, label: "Javascript" },
        { value: 4, label: "Sass" },
        { value: 5, label: "Typescript" },
        { value: 6, label: "Webpack" },
        { value: 7, label: "Nodejs" },
      ]
    };
  },
  methods: {
  },
  mounted() {
  },
};
</script>
<style scoped>
</style>
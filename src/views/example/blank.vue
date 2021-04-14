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
              <select-custom
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
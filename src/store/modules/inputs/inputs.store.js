// Note: Alasan input key dibikin global varible dan disimpan di store.
// Karena input key ini selain dipake di form dialog input juga dipake saat skenario import data 

import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import state from "./state";

Vue.use(Vuex);

const labaStore = {
  actions,
  mutations,
  getters,
  state,
};

export default labaStore;

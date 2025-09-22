export default {
  updateTimezone({ commit }, timezone) {
    commit('SET_TIMEZONE', timezone);
  }
}
export default {
  // [SET_NAME]({ commit }, payload) {
  //   commit(ADD_NAME, payload)
  // },
  // setLabaLabaName({ commit }, payload) {
  //   commit('SET_NAME', payload)
  // },
  // setUmurLabaLaba({ commit }, payload) {
  //   commit('SET_AGE', payload)
  // },

  // user
  SET_USER_USER_NAME({ commit }, payload) {
      commit('SET_USER_USER_NAME', payload)
  },
  SET_USER_USER_LOGIN({ commit }, payload) {
      commit('SET_USER_USER_LOGIN', payload)
  },
  SET_USER_USER_EMAIL({ commit }, payload) {
      commit('SET_USER_USER_EMAIL', payload)
  },
  SET_USER_PASSWORD({ commit }, payload) {
      commit('SET_USER_PASSWORD', payload)
  },
  SET_USER_USER_ROLE_ID({ commit }, payload) {
      commit('SET_USER_USER_ROLE_ID', payload)
  },
  SET_USER_USER_NAME_ValueData({ commit }, payload) {
    commit('SET_USER_USER_NAME_ValueData', payload)
  },
  SET_USER_USER_LOGIN_ValueData({ commit }, payload) {
      commit('SET_USER_USER_LOGIN_ValueData', payload)
  },
  SET_USER_USER_EMAIL_ValueData({ commit }, payload) {
      commit('SET_USER_USER_EMAIL_ValueData', payload)
  },
  SET_USER_PASSWORD_ValueData({ commit }, payload) {
      commit('SET_USER_PASSWORD_ValueData', payload)
  },
  SET_USER_USER_ROLE_ID_ValueData({ commit }, payload) {
      commit('SET_USER_USER_ROLE_ID_ValueData', payload)
  },
  // type select perlu data array
  SET_USER_USER_ROLE_ID_ArrData({ commit }, payload) {
      commit('SET_USER_USER_ROLE_ID_ArrData', payload)
  },
}

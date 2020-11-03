import { SET_NAME } from '../../actions-type'
import { ADD_NAME } from '../../mutations-type'

export default {
  // [SET_NAME]({ commit }, payload) {
  //   commit(ADD_NAME, payload)
  // },
  setLabaLabaName({ commit }, payload) {
    commit('SET_NAME', payload)
  },
  setUmurLabaLaba({ commit }, payload) {
    commit('SET_AGE', payload)
  },
}

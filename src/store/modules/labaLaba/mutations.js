import { ADD_NAME } from '../../mutations-type'

export default {
  SET_NAME(state, payload) {
    state.name = payload
  },
  SET_AGE(state, payload) {
    state.age = payload
  },
}

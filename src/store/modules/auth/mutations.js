import { ADD_NAME } from '../../mutations-type'

export default {
  SET_LOGIN_USER_LOGIN(state, payload) {
    state.login.user_login.value = payload
  },
  SET_LOGIN_USER_LOGIN_ValueData(state, payload) {
    state.login.user_login.valueData = payload
  },

  SET_LOGIN_PASSWORD(state, payload) {
    state.login.password.value = payload
  },
  SET_LOGIN_PASSWORD_ValueData(state, payload) {
    state.login.password.valueData = payload
  },
}

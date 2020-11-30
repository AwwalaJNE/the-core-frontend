export default {
  SET_USER_DATA(state, payload) {
    let Keys = Object.keys(payload)
    Keys.map(key => {
      if(state.user_data.hasOwnProperty(key)) {
        state.user_data = payload
      }
    })
  },
  SET_USER_N(state, payload) {
    state.node_id = payload
  },
}

export default {
  SET_TIMEZONE(state, timezone) {
    state.selectedTimezone = timezone;
    localStorage.setItem('selected_timezone', timezone); // 👈 simpan ke localStorage
  }
}
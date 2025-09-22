export default {
  selectedTimezone: state => state.selectedTimezone,
  timezoneOffset: state => ({
    WIB: 7,
    WITA: 8,
    WIT: 9
  })[state.selectedTimezone] || 7
}
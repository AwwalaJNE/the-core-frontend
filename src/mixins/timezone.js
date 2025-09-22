// @/mixins/timezoneMixin.js
export default {
  computed: {
    selectedTimezone() {
      return this.$store.getters['timezone/selectedTimezone'];
    }
  },
  methods: {
    formatTimestamp(timestamp) {
      if (!timestamp) return '-';
      
      const date = new Date(timestamp);
      let adjustedDate = date;

      if (this.selectedTimezone === 'Asia/Makassar') {
        adjustedDate = new Date(date.getTime() + (1 * 60 * 60 * 1000));
      } else if (this.selectedTimezone === 'Asia/Jayapura') {
        adjustedDate = new Date(date.getTime() + (2 * 60 * 60 * 1000));
      }

      // Format manual tanpa konversi UTC
      const year = adjustedDate.getFullYear();
      const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
      const day = String(adjustedDate.getDate()).padStart(2, '0');
      const hours = String(adjustedDate.getHours()).padStart(2, '0');
      const minutes = String(adjustedDate.getMinutes()).padStart(2, '0');
      const seconds = String(adjustedDate.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },

    formatTime(timestamp) {
      if (!timestamp) return '-';
      
      const date = new Date(timestamp);
      let adjustedDate = date;

      if (this.selectedTimezone === 'Asia/Makassar') {
        adjustedDate = new Date(date.getTime() + (1 * 60 * 60 * 1000));
      } else if (this.selectedTimezone === 'Asia/Jayapura') {
        adjustedDate = new Date(date.getTime() + (2 * 60 * 60 * 1000));
      }

      return adjustedDate.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    },

    formatDate(timestamp) {
      if (!timestamp) return '-';
      
      const date = new Date(timestamp);
      let adjustedDate = date;

      if (this.selectedTimezone === 'Asia/Makassar') {
        adjustedDate = new Date(date.getTime() + (1 * 60 * 60 * 1000));
      } else if (this.selectedTimezone === 'Asia/Jayapura') {
        adjustedDate = new Date(date.getTime() + (2 * 60 * 60 * 1000));
      }

      return adjustedDate.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    }
  }
}
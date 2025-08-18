export default {
  header() {
    return {
      headers: {
        // 'X-Auth-Key'  : Vue.ls.get('token'),
        // Authorization: "Bearer " + Vue.ls.storage.tokenBearer,
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('vuejs__tokenBearer'))?.value}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }
  },
  headerFormData() {
    return {
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('vuejs__tokenBearer'))?.value}`,
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
    }
  },
  headerLogin() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }
  },
  headerFlight() {
    return {
      headers: {
        'X-API-Token': '4W1qvtta6YeCcVaWtnbjTanAPgaWog'
      },
    }
  },
}

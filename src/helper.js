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
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36',
        'X-API-Token': '4W1qvtta6YeCcVaWtnbjTanAPgaWog'
      },
    }
  },
}

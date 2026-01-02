const api_flight_token = import.meta.env.VITE_APP_API_FLIGHT_TOKEN

export default {
    header() {
        return {
            headers: {
                // 'X-Auth-Key'  : Vue.ls.get('token'),
                // Authorization: "Bearer " + Vue.ls.storage.tokenBearer,
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem('vuejs__tokenBearer'))?.value
                }`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    },
    headerFormData() {
        return {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem('vuejs__tokenBearer'))?.value
                }`,
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            },
        }
    },
    headerLogin() {
        return {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    },
    headerFlight() {
        return {
            headers: {
                'X-API-Token': api_flight_token,
            },
        }
    },
    convertTimezone(dateTime, fromTimezone, toTimezone) {
        if (!dateTime) return dateTime

        try {
            let date
            if (typeof dateTime === 'string') {
                if (dateTime.includes('T')) {
                    date = new Date(dateTime)
                } else if (dateTime.includes(' ')) {
                    date = new Date(dateTime)
                } else {
                    date = new Date(dateTime + ' 00:00:00')
                }
            } else {
                date = new Date(dateTime)
            }

            if (isNaN(date.getTime())) {
                console.error('Invalid date input:', dateTime)
                return dateTime
            }

            const tempDate = new Date(date.toLocaleString('sv-SE'))

            const fromOffset = this.getTimezoneOffset(tempDate, fromTimezone)
            const toOffset = this.getTimezoneOffset(tempDate, toTimezone)

            const offsetDiff = fromOffset - toOffset
            const adjustedDate = new Date(tempDate.getTime() + offsetDiff * 60 * 1000)

            const year = adjustedDate.getFullYear()
            const month = String(adjustedDate.getMonth() + 1).padStart(2, '0')
            const day = String(adjustedDate.getDate()).padStart(2, '0')
            const hour = String(adjustedDate.getHours()).padStart(2, '0')
            const minute = String(adjustedDate.getMinutes()).padStart(2, '0')
            const second = String(adjustedDate.getSeconds()).padStart(2, '0')

            return `${year}-${month}-${day} ${hour}:${minute}:${second}`
        } catch (error) {
            console.error('Error converting timezone:', error)
            return dateTime
        }
    },
    getTimezoneOffset(date, timezone) {
        const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }))
        const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }))
        return (utcDate.getTime() - tzDate.getTime()) / (1000 * 60)
    },
}

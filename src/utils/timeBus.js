import Vue from 'vue'

export const TimeBus = new Vue({
    data() {
        return {
            now: Date.now(),
        }
    },
})

setInterval(() => {
    TimeBus.now = Date.now()
}, 1000)

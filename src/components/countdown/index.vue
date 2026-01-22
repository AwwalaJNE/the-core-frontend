<template>
    <span class="text-style">{{ formatted }}</span>
</template>

<script>
import master from '@/mixins/master'

import { TimeBus } from '@/utils/timeBus'

export default {
    name: 'Countdown',
    mixins: [master],
    props: {
        target_time: {
            type: String,
            required: true,
        },
        end_time: {
            type: String,
        },
    },
    computed: {
        formatted() {
            return this.formatTime(this.target_time, this.end_time, TimeBus.now)
        },
    },
    methods: {
        formatTime(slaDate, endDate, now) {
            if (!slaDate) return '-'

            const slaTime = new Date(slaDate.replace(' ', 'T'))
            const actualTime = endDate ? new Date(endDate.replace(' ', 'T')) : new Date(now)

            if (isNaN(slaTime.getTime()) || isNaN(actualTime.getTime())) return '-'

            const diffMs = actualTime - slaTime
            const isOverdue = diffMs > 0
            const absDiff = Math.abs(diffMs)

            const days = Math.floor(absDiff / (1000 * 60 * 60 * 24))
            const hours = Math.floor((absDiff / (1000 * 60 * 60)) % 24)
            const minutes = Math.floor((absDiff / (1000 * 60)) % 60)
            const seconds = Math.floor((absDiff / 1000) % 60)

            const timeString = `${days} day(s) ${hours} hour(s) ${minutes} minute(s) ${seconds} second(s)`

            if (endDate) {
                const completedText = `Completed at ${this.formatTimezone(
                    actualTime.toLocaleString()
                )}`

                return isOverdue ? `${completedText}\nOverdue: ${timeString}` : completedText
            }

            return isOverdue ? `Overdue: ${timeString}` : `Remaining: ${timeString}`
        },
    },
}
</script>

<style scoped>
.text-style {
    white-space: pre;
}
</style>

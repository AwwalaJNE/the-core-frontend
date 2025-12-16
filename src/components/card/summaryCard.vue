<template>
    <vs-row>
        <vs-col v-for="(item, index) in dataLabel" :key="index" :w="item.width || 4">
            <div class="summary-card">
                <p class="value" v-copy="getValue(item.key)">
                    {{ formatValue(item.key) }}
                </p>
                <p class="label" v-copy="item.label">
                    {{ item.label }}
                </p>
            </div>
        </vs-col>
    </vs-row>
</template>

<script>
import master from '@/mixins/master'

export default {
    name: 'CardInfo',
    mixins: [master],
    props: {
        dataLabel: {
            type: Array,
            required: true,
        },
        dataValue: {
            type: Object,
            required: true,
        },
    },
    methods: {
        getValue(key) {
            return this.dataValue?.[key] ?? 0
        },
        formatValue(key) {
            const value = this.getValue(key)
            return typeof value === 'number' ? value.toLocaleString('id-ID') : value
        },
    },
}
</script>

<style scoped>
.summary-card {
    background: #fff;
    border-radius: 5px;
    padding: 12px;
    margin: 8px auto;
    height: 100%;
    text-align: center;
    -webkit-box-shadow: 0px 2px 7px -3px rgba(0, 0, 0, 0.37);
    -moz-box-shadow: 0px 2px 7px -3px rgba(0, 0, 0, 0.37);
    box-shadow: 0px 2px 7px -3px rgba(0, 0, 0, 0.37);
}

.label {
    font-size: 14px;
    color: #6b7280;
}

.value {
    font-size: 20px;
    font-weight: 600;
}
</style>

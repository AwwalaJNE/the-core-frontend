<template>
    <vs-row>
        <vs-col v-for="(item, index) in dataLabel" :key="index" :w="item.width || 4">
            <div class="summary-card">
                <template v-if="loading">
                    <div class="skeleton value-skeleton"></div>
                    <div class="skeleton label-skeleton"></div>
                </template>

                <template v-else>
                    <p class="value" v-copy="getValue(item.key)">
                        {{ formatValue(item.key) }}
                    </p>
                    <p class="label" v-copy="item.label">
                        {{ item.label?.toUpperCase() }}
                    </p>
                </template>
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
        loading: {
            type: Boolean,
            default: false,
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

.skeleton {
    background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 37%, #e5e7eb 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
    border-radius: 4px;
    margin: 6px auto;
}

.value-skeleton {
    height: 22px;
    width: 60%;
}

.label-skeleton {
    height: 14px;
    width: 40%;
}

@keyframes shimmer {
    0% {
        background-position: 100% 0;
    }
    100% {
        background-position: 0 0;
    }
}
</style>

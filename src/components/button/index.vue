<template>
    <vs-button
        :flat="flat"
        :square="square"
        :block="block"
        :active="active"
        :disabled="disabled"
        :color="color"
        :style="customStyle"
        :data-testid="computedTestId"
        @click="handleClick"
    >
        <i v-if="icon" :class="icon" style="margin-right: 0.5em"></i>
        <slot />
    </vs-button>
</template>

<script>
export default {
    name: 'BaseActionButton',
    props: {
        name: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        flat: {
            type: Boolean,
            default: true,
        },
        square: {
            type: Boolean,
            default: false,
        },
        block: {
            type: Boolean,
            default: true,
        },
        variant: {
            type: String,
            default: 'default',
        },
        customStyle: {
            type: Object,
            default: () => ({}),
        },
        icon: {
            type: String,
            default: '',
        },
    },
    computed: {
        color() {
            return this.variant === 'danger' ? 'danger' : 'primary'
        },
        computedTestId() {
            return `action-button-${this.name}`
        },
    },
    methods: {
        handleClick(evt) {
            if (this.disabled) return
            this.$emit('click', evt)
        },
    },
}
</script>

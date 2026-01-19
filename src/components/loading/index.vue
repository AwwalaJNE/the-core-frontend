<template>
    <div />
</template>

<script>
export default {
    name: 'Loading',
    props: {
        active: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: 'Loading...',
        },
        type: {
            type: String,
            default: 'scale',
        },
        background: {
            type: String,
            default: '#EAEAEA',
        },
        target: {
            type: [HTMLElement, Object],
            default: null,
        },
    },
    data() {
        return {
            loader: null,
            retryTimer: null,
        }
    },
    watch: {
        active: {
            immediate: true,
            handler() {
                this.handle()
            },
        },
        target() {
            this.handle(true)
        },
    },
    methods: {
        handle(force = false) {
            if (!this.active) {
                this.close()
                return
            }

            if (this.loader && !force) return

            if (this.target && !this.isValidTarget(this.target)) {
                this.waitTarget()
                return
            }

            this.close()
            this.open()
        },

        isValidTarget(target) {
            return target instanceof HTMLElement || target?.$el instanceof HTMLElement
        },

        waitTarget() {
            if (this.retryTimer) return

            this.retryTimer = setTimeout(() => {
                this.retryTimer = null
                this.handle(true)
            }, 50)
        },

        open() {
            const options = {
                type: this.type,
                text: this.text,
                background: this.background,
            }

            if (this.target) {
                options.target = this.target.$el || this.target
            }

            this.loader = this.$vs.loading(options)
        },

        close() {
            if (this.loader) {
                this.loader.close()
                this.loader = null
            }
        },
    },
    beforeDestroy() {
        clearTimeout(this.retryTimer)
        this.close()
    },
}
</script>

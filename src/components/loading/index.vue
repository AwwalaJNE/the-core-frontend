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
    },
    data() {
        return {
            loader: null,
        }
    },
    watch: {
        active: {
            immediate: true,
            handler(val) {
                val ? this.open() : this.close()
            },
        },
    },
    methods: {
        open() {
            if (this.loader) return

            this.loader = this.$vs.loading({
                type: this.type,
                text: this.text,
                background: this.background,
            })
        },
        close() {
            if (this.loader) {
                this.loader.close()
                this.loader = null
            }
        },
    },
    beforeDestroy() {
        this.close()
    },
}
</script>

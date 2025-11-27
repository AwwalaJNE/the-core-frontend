<template>
    <div class="print-general-do">
        <template v-if="err !== ''">
            <vs-row justify="center" class="mt-2">
                <vs-col xs="12" sm="12" lg="12">
                    <vs-card
                        @click="$router.go(-1)"
                        class="mt-2"
                        style="display: flex; justify-content: center"
                    >
                        <template #title>
                            <div style="position: relative; margin-bottom: 1em">
                                <h2 style="padding-top: 0.6em">Invalid Print</h2>
                                <div style="position: absolute; left: 0; top: 0">
                                    <vs-button circle icon dark flat :active="true">
                                        <i class="bx bx-arrow-back"></i>
                                    </vs-button>
                                </div>
                            </div>
                        </template>
                        <template #text>
                            <div style="text-align: left">
                                <hr />
                                <p>Something went wrong</p>
                                <p>Reason: {{ err }}</p>
                                <br />
                            </div>
                        </template>
                    </vs-card>
                </vs-col>
            </vs-row>
        </template>
    </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'
export default {
    name: 'print-general-do',
    mixins: [master],
    data() {
        return {
            html: '',
            loading: false,
            val: '',
            type: '',
            err: '',
            node_id: '',
            sj_type: '',
            dom: null,
        }
    },
    methods: {
        getParamRoute() {
            if (this.$route.params.id && this.$route.params.type) {
                this.val = this.$route.params.id
                this.type = this.$route.params.type
                this.node_id = this.$route.params.node_id
                this.sj_type = this.$route.params.sj_type
                this.getDataPrint()
            }
        },
        async getDataPrint() {
            let url_print = null
            if (this.type == 'manifest-delivery-order') {
                url_print = this.URL.print + `/${this.val}/${this.type}?n=${this.node_id}&sj_type=${this.sj_type}`
            } else {
                url_print = this.URL.print + `/${this.val}/${this.type}?n=${this.node_id}`
            }
            let self = this
            this.loading = true
            await axios
                .get(url_print, this.Helper.header())
                .then((res) => {
                    this.html = res.data.html

                    var printIFrame = document.createElement('iframe')
                    document.body.appendChild(printIFrame)
                    printIFrame.style.position = 'absolute'
                    printIFrame.style.top = 0
                    printIFrame.style.left = 0
                    printIFrame.style.marginTop = 0
                    printIFrame.style.marginBottom = 0
                    printIFrame.style.border = 0
                    printIFrame.style.height = '100%'
                    printIFrame.style.width = '100%'
                    printIFrame.style.overflow = 'auto'

                    var frameWindow =
                        printIFrame.contentWindow || printIFrame.contentDocument || printIFrame
                    var wdoc = frameWindow.document || frameWindow.contentDocument || frameWindow
                    wdoc.write(this.html)
                    wdoc.close()
                    frameWindow.focus()

                    this.dom = frameWindow
                    this.dom.addEventListener('keydown', this.keyHandler)
                    try {
                        // Auto print functionality can be enabled here if needed
                        // document.body.focus()
                        // setTimeout(function () {
                        //     frameWindow.print()
                        // }, 3000)
                    } catch (e) {
                        // Handle print errors
                    }

                    this.loading = false
                })
                .then(() => {
                    // Additional post-print logic if needed
                })
                .catch((err) => {
                    this.loading = false
                    this.err = err.response?.data?.message || 'Invalid'
                })
        },
        keyHandler(e) {
            // 17 - ctrl, 80 - p
            const key = e.which || e.keyCode
            if (e.ctrlKey && key === 17 && key === 80) {
                this.dom.print()
            }
        },
        removeKeyHandler() {
            if (this.dom !== null) {
                this.dom.removeEventListener('keydown', this.keyHandler)
            }
        },
    },
    mounted() {
        this.getParamRoute()
    },
    destroyed() {
        this.removeKeyHandler()
    },
}
</script>
<style lang="scss">
/* Print-specific styles */
</style>

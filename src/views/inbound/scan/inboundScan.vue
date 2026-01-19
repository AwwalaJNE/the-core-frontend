<template>
    <div :class="{ 'box-v1': boxed }" style="justify-content: center">
        <vs-row style="gap: 3em" class="section-padding">
            <vs-col w="12">
                <vs-input
                    border
                    ref="formInputParentInbound"
                    v-model="parent_no"
                    label-placeholder="Masukkan SM / SJ / Pickup"
                    icon-after
                    v-uppercase
                    :disabled="hasInboundNumber || loading"
                    @keyup.enter="submit('parent_no')"
                    @click-icon="$refs.cameraScanner.open('formInputParentInbound')"
                    @input="sanitizeAlphanumeric('parent_no')"
                    @keydown.native="
                        handleTabNavigation($event, 'formInputParentInbound', [
                            'formInputParentInbound',
                            'formInputChildInbound',
                        ])
                    "
                >
                    <template #icon v-if="!hasInboundNumber">
                        <i class="bx bx-barcode-reader"></i>
                    </template>
                </vs-input>
                <div style="position: absolute; right: 20px; top: 10px" v-if="hasInboundNumber">
                    <span
                        class="vs-select__chips__chip__close"
                        :data-testid="`close-button-parent_no`"
                        @click="removeParentNumber"
                    >
                        <i class="vs-icon-close vs-icon-hover-less"></i>
                    </span>
                </div>
            </vs-col>

            <vs-col w="12">
                <vs-input
                    border
                    v-model="child_no"
                    label-placeholder="Masukkan Masterbag / Bag / Connote"
                    icon-after
                    v-uppercase
                    ref="formInputChildInbound"
                    :disabled="loading"
                    @keyup.enter="submit('child_no')"
                    @click-icon="$refs.cameraScanner.open('formInputChildInbound')"
                    @input="sanitizeAlphanumeric('child_no')"
                    @keydown.native="
                        handleTabNavigation($event, 'formInputChildInbound', [
                            'formInputParentInbound',
                            'formInputChildInbound',
                        ])
                    "
                >
                    <template #icon>
                        <i class="bx bx-barcode-reader"></i>
                    </template>
                </vs-input>
            </vs-col>
        </vs-row>

        <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />
    </div>
</template>

<script>
import master from '@/mixins/master'
import CameraScanner from '@/components/scanner/camera.vue'

export default {
    name: 'Inbound-Scan',
    mixins: [master],
    components: { CameraScanner },

    props: {
        boxed: {
            type: Boolean,
            default: false,
        },
        inbound_number: {
            type: String,
            default: '',
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },

    watch: {
        inbound_number: {
            immediate: true,
            handler(newVal) {
                this.parent_no = newVal || ''
                this.hasInboundNumber = !!newVal
                this.autoFocusInput()
            },
        },

        hasInboundNumber: {
            handler(newVal) {
                if (!newVal) {
                    this.autoFocusInput()
                }
            },
        },
    },

    data() {
        return {
            parent_no: '',
            child_no: '',
            hasInboundNumber: false,
        }
    },

    methods: {
        /* ======================================================
         * SCAN INPUT
         * ====================================================== */

        removeParentNumber() {
            this.parent_no = ''
            this.hasInboundNumber = false
            this.$emit('removeInboundNumber')
        },

        submit(type) {
            let payload = null

            if (type === 'parent_no' && this.parent_no) {
                payload = { type, value: this.parent_no }
                this.hasInboundNumber = true
            }

            if (type === 'child_no' && this.child_no) {
                payload = { type, value: this.child_no }
                this.child_no = ''
            }

            if (payload) {
                this.$emit('submit', payload)
            }
        },

        /* ======================================================
         * SCAN CAMERA
         * ====================================================== */

        onCameraScannerGetData(data) {
            if (data?.event !== 'result') return

            const text = data.data.text
            const ns = data.namespace

            if (ns === 'formInputParentInbound') {
                this.parent_no = text
                this.submit('parent_no')
            }
            if (ns === 'formInputChildInbound') {
                this.child_no = text
                this.submit('child_no')
            }
        },

        /* ======================================================
         * AUTO FOCUS INPUT
         * ====================================================== */

        autoFocusInput() {
            if (!this.parent_no) {
                this.setActiveInput('formInputParentInbound')
            } else {
                this.setActiveInput('formInputChildInbound')
            }
        },
    },
}
</script>

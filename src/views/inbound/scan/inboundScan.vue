<template>
    <div :class="{ 'box-v1': boxed }">
        <vs-row style="gap: 2em; margin-top: 2em">
            <vs-col xs="12">
                <vs-input
                    border
                    ref="formInputParentInbound"
                    v-model="parent_no"
                    label-placeholder="Masukkan SM / SJ / Pickup"
                    icon-after
                    v-uppercase
                    :disabled="loading"
                    @keyup.enter.native="submit('parent_no')"
                    @click-icon="$refs.cameraScanner.open('formInputParentInbound')"
                    @input="sanitizeAlphanumeric('parent_no')"
                    @keydown.native="
                        handleTabNavigation($event, 'formInputParentInbound', [
                            'formInputParentInbound',
                            'formInputChildInbound',
                        ])
                    "
                >
                    <template #icon v-if="!parent_no">
                        <i class="bx bx-barcode-reader"></i>
                    </template>
                </vs-input>
                <div style="position: absolute; right: 20px; top: 10px" v-if="parent_no">
                    <span
                        class="vs-select__chips__chip__close"
                        :data-testid="`close-button-parent_no`"
                        @click="removeInboundNumber"
                    >
                        <i class="vs-icon-close vs-icon-hover-less"></i>
                    </span>
                </div>
            </vs-col>

            <vs-col xs="12">
                <vs-input
                    border
                    v-model="child_no"
                    label-placeholder="Masukkan Masterbag / Bag / Connote"
                    icon-after
                    v-uppercase
                    ref="formInputChildInbound"
                    :disabled="disabled"
                    @keyup.enter.native="submit('child_no')"
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
        disabled: {
            type: Boolean,
            default: false,
        },
        is_prealert: {
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
                if (newVal) {
                    this.parent_no = newVal
                } else {
                    this.parent_no = ''
                }
            },
        },
    },

    computed: {
        isParentDisabled() {
            return !!this.parent_no
        },
    },

    data() {
        return {
            parent_no: '',
            child_no: '',
        }
    },

    methods: {
        /* ======================================================
         * SCAN INPUT
         * ====================================================== */

        removeInboundNumber() {
            this.parent_no = ''
            this.$emit('removeInboundNumber')
        },

        submit(type) {
            let payload = null

            if (type === 'parent_no' && this.parent_no) {
                payload = { type, value: this.parent_no }
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
            console.log('CEK', this.is_prealert, this.parent_no, this.inbound_number)
            if (!this.is_prealert && !this.isParentDisabled) {
                this.setActiveInput('formInputParentInbound')
            } else {
                this.setActiveInput('formInputChildInbound')
            }
        },
    },
}
</script>

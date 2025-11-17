<template>
    <vs-dialog
        v-model="modalActive"
        prevent-close
        :loading="loadingActive"
        @close="handleClose"
        :class="[width, className, hideCloseIcon ? 'hide-close-x' : '']"
        :not-close="preventAllClose"
    >
        <template>
            <h4 class="not-margin" style="font-size: 18px">
                <slot name="header"></slot>
            </h4>
        </template>

        <div class="con-form">
            <slot name="content"></slot>
        </div>

        <template>
            <div class="footer-dialog">
                <slot name="footer"></slot>
            </div>
        </template>
    </vs-dialog>
</template>
<script>
export default {
    name: 'dialog-master',
    props: {
        actived: Boolean,
        closeDialog: Function,
        width: String,
        className: String,
        fullScreen: Boolean,
        loading: Boolean,
        not_close_option: Boolean,
        // === PARAM BARU: default false ===
        hideCloseIcon: { type: Boolean, default: false },
    },
    data() {
        return {
            modalActive: false,
            loadingActive: false,
            not_close: false,
        }
    },
    computed: {
        // Jika hideCloseIcon true -> cegah semua cara menutup (ESC/overlay)
        preventAllClose() {
            return this.hideCloseIcon || this.not_close
        },
    },
    watch: {
        actived(val) {
            if (val !== undefined) {
                this.modalActive = !!val
                this.$nextTick(() => {
                    // ESC aktif hanya jika ikon tidak disembunyikan
                    if (this.modalActive && !this.hideCloseIcon) this.addKeyHandler()
                    else this.removeKeyHandler()
                })
            }
        },
        loading(val) {
            if (val !== undefined) this.loadingActive = !!val
        },
        not_close_option(val) {
            if (val !== undefined) this.not_close = !!val
        },
        hideCloseIcon() {
            if (this.modalActive && !this.hideCloseIcon) this.addKeyHandler()
            else this.removeKeyHandler()
        },
    },
    methods: {
        handleClose() {
            // Saat hide = true, abaikan event close dari vs-dialog
            if (this.hideCloseIcon) return
            this.closeDialog && this.closeDialog()
        },
        keyHandler(e) {
            const key = e.which || e.keyCode
            if (key === 27) this.handleClose()
        },
        addKeyHandler() {
            window.addEventListener('keydown', this.keyHandler)
        },
        removeKeyHandler() {
            window.removeEventListener('keydown', this.keyHandler)
        },
    },
}
</script>
<style lang="scss">
.con-form {
    margin-bottom: 1em;
}

.not-margin {
    margin: 0px;
    font-weight: normal;
    padding: 10px;
}

.vs-dialog-content {
    &.md {
        @include for-phone-only {
            .vs-dialog {
                min-width: 90%;
            }
        }
        @include for-desktop-up {
            .vs-dialog {
                min-width: 600px;
            }
        }
    }
    &.lg {
        @include for-phone-only {
            .vs-dialog {
                min-width: 90%;
            }
        }
        @include for-desktop-up {
            .vs-dialog {
                min-width: 880px;
            }
        }
    }
    &.xl {
        @include for-phone-only {
            .vs-dialog {
                min-width: 90%;
            }
        }
        @include for-desktop-up {
            .vs-dialog {
                min-width: 90%;
            }
        }
    }
}

.footer-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: calc(100%);
    .new {
        margin: 0px;
        margin-top: 20px;
        padding: 0px;
        font-size: 0.7rem;
        a {
            color: getColor('primary') !important;
            margin-left: 6px;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    .vs-button {
        margin: 0px;
    }
}
/* Tidak discope atau gunakan :deep/::v-deep jika style Anda scoped */
.hide-close-x {
    /* Cover berbagai versi class tombol close Vuesax */
    :deep(.vs-dialog__close),
    :deep(.vs-dialog-close),
    :deep(.vs-dialog__button-close),
    :deep(button[aria-label='close']),
    :deep([aria-label='close']) {
        display: none !important;
        pointer-events: none !important;
    }
}
</style>

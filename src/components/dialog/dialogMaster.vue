<template>
    <vs-dialog
    v-model="modalActive" 
    prevent-close
    :loading="loadingActive"
    :not-close="not_close"
    @close="closeDialog"
    :class="width">
        <template>
          <h4 class="not-margin" style="font-size:18px">
            <slot name='header'></slot>
          </h4>
        </template>


        <div class="con-form">
          <slot name='content'></slot>
        </div>

        <template>
          <div class="footer-dialog">
            <slot name='footer'></slot>
          </div>
        </template>
    </vs-dialog>
</template>
<script>
export default {
    name:"dialog-master",
    props: {
        actived: Boolean,
        closeDialog: Function,
        width: String,
        fullScreen: Boolean,
        loading:Boolean,
        not_close_option: Boolean
    },
    data() {
        return {
            modalActive: false,
            loadingActive: false,
            not_close: false
        }
    },
    watch: {
        actived: function(val) {
            if(val !== undefined) {
                this.modalActive = val || false
                this.$nextTick(() => {
                    if(val == true) {
                        this.addKeyHandler()
                    } else {
                        this.removeKeyHandler()
                    }
                });
            }
        },
        loading: function(val) {
          if(val !== undefined) {
            this.loadingActive = val || false
          }
        },
        not_close_option: function(val) {
            if(val !== undefined) {
                this.not_close = val || false
            }
        }
    },
    methods: {
        handleClose(){
            this.closeDialog()
        },
        keyHandler(e){
            /**
             * 27 - Esc
             */
            const key = e.which || e.keyCode;
            if(key === 27) {
                this.handleClose()
            }
        },
        addKeyHandler() {
            window.addEventListener("keydown", this.keyHandler);
            console.log('inject dialog key handler add')
        },
        removeKeyHandler() {
            window.removeEventListener("keydown", this.keyHandler);
            console.log('dialog key handler destroy')
        }

    },
}
</script>
<style lang="scss">
    .not-margin {
        margin: 0px;
        font-weight: normal;
        padding: 10px;
    }

    .vs-dialog-content{
        &.md{
            @include for-phone-only{
                // .vs-dialog {
                //     min-width: 100%;
                // }
            }
            @include for-desktop-up{
                .vs-dialog {
                    min-width: 600px;
                }
            }
        }
        &.lg{
            @include for-phone-only{
                // .vs-dialog {
                //     min-width: 100%;
                // }
            }
            @include for-desktop-up{
                .vs-dialog {
                    min-width: 880px;
                }
            }
        }
        &.xl{
            @include for-phone-only{
                // .vs-dialog {
                //     min-width: 100%;
                // }
            }
            @include for-desktop-up{
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
</style>
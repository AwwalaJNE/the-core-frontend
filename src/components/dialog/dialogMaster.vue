<template>
    <vs-dialog 
    v-model="modalActive" 
    prevent-close 
    @close="closeDialog"
    :class="width">
        <template>
          <h4 class="not-margin">
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
        width: String
    },
    data() {
        return {
            modalActive: false
        }
    },
    watch: {
        actived: function(val) {
            if(val !== undefined) {
                this.modalActive = val || false
            }
        }
    },
    methods: {
        handleClose(){
            this.closeDialog()
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
        &.lg{
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
        &.xl{
            @include for-phone-only{
                // .vs-dialog {
                //     min-width: 100%;
                // }
            }
            @include for-desktop-up{
                .vs-dialog {
                    min-width: 85%;
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
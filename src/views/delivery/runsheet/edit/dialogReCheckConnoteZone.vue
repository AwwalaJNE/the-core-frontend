<template>
    <dialog-master width="md" :actived="listenActive" :closeDialog="cancel">
        <template v-slot:header>
            {{ listenTitle }}
        </template>

        <template v-slot:content>
            <vs-row justify="space-between">
                <vs-col xs="12" sm="12" lg="12" class="my-2">
                    <template v-if="type === 'KOLI'">
                        <p class="recheck-text">
                            Nomor connote yang Anda scan tidak sesuai dengan area kurir pengiriman.
                            Apakah Anda tetap ingin memasukkannya ke dalam runsheet?
                        </p>
                    </template>
                    <template v-if="type === 'BAG'">
                        <span>
                            <p class="recheck-text">
                                Terdapat connote dari bag yang Anda scan tidak sesuai dengan area
                                kurir pengiriman. Nomor Connote:
                            </p>
                            <div v-for="item in listConnote" :key="item.connote_number">
                                <vs-col xs="12" sm="12" lg="12">
                                    <div style="margin-top: 10px">
                                        <vs-tooltip
                                            :success="tokenCopied"
                                            :danger="tokenCopied === false"
                                            circle
                                        >
                                            <vs-input
                                                v-model="item.connote_number"
                                                readonly
                                                id="tokenField"
                                                v-clipboard:copy="item.connote_number"
                                                v-clipboard:success="onCopy"
                                                v-clipboard:error="onError"
                                            />
                                            <template #tooltip>
                                                {{ 'Click to copy' }}
                                            </template>
                                        </vs-tooltip>
                                    </div>
                                </vs-col>
                            </div>
                            <p class="recheck-text">
                                Apakah Anda tetap ingin memasukkannya ke dalam runsheet?
                            </p>
                        </span>
                    </template>
                </vs-col>
            </vs-row>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="3">
                    <vs-button transparent block danger flat :active="true" @click="cancel">
                        Batal
                    </vs-button>
                </vs-col>
                <vs-col w="3">
                    <vs-button
                        transparent
                        block
                        flat
                        :active="true"
                        type="submit"
                        @click="handleSubmit"
                    >
                        Lanjutkan
                    </vs-button>
                </vs-col>
            </vs-row>
        </template>
    </dialog-master>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'
import InputGeneral from '@/components/input/general'
import Selector from '@/components/input/select'
import DialogMaster from '@/components/dialog/dialogMaster'
export default {
    name: 'irreguralities-cancel-dialog',
    mixins: [master],
    components: {
        'input-general': InputGeneral,
        selector: Selector,
        'dialog-master': DialogMaster,
    },
    props: {
        closeDialog: Function,
        active: Boolean,
        title: String,
        dataItem: Object,
        type: String,
        addConnoteToRunsheet: Function,
        addBagPraRunsheetToRunsheet: Function,
        listConnote: Array,
    },
    computed: {
        listenActive() {
            return this.active
        },
        listenDataItem() {
            return this.dataItem || {}
        },
        listenDataType() {
            return this.type || ''
        },
        listenTitle() {
            return this.title
        },
        listenListConnote() {
            return this.listConnote || []
        },
    },
    watch: {
        active: function (val) {
            if (val == true) {
            }
        },
    },
    data() {
        return {
            tokenCopied: null,
            confirmModalActive: false,
        }
    },
    methods: {
        async handleSubmit() {
            if (this.type == 'KOLI') {
                this.$emit('addConnoteToRunsheet', this.dataItem)
            } else if (this.type == 'BAG') {
                this.$emit('addBagPraRunsheetToRunsheet', this.dataItem)
            }
        },
        cancel() {
            this.closeDialog()
        },
        onCopy: function (e) {
            this.toolTipMessage = 'Token Copied To Clipboard!'
            this.tokenCopied = true
            setTimeout(() => {
                this.tokenCopied = null
                this.toolTipMessage = null
            }, 1000)
        },
        onError: function (e) {
            this.tokenCopied = false
            this.toolTipMessage = 'Failed to copy token!'
        },
    },
}
</script>
<style scoped>
.my-2 {
    margin: 0 20px;
}
.recheck-text {
    text-align: start;
}
</style>

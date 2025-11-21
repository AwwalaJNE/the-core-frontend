<template>
    <dialog-master
        width="md"
        :actived="listenActive"
        :loading="listenLoading"
        :closeDialog="cancel"
    >
        <template v-slot:header>
            <span v-copy="listenTitle">{{ listenTitle }}</span>
        </template>

        <template v-slot:content>
            <vs-row justify="space-between">
                <vs-row>
                    <vs-col
                        v-if="validItemNumber.length > 0"
                        xs="12"
                        sm="12"
                        :lg="`${invalidItemNumber.length > 0 ? '6' : '12'}`"
                    >
                        <input-text-area
                            id="valid_item"
                            label="Valid Bag / Connote"
                            v-model="validItemNumber"
                            :disabled="true"
                        />
                    </vs-col>
                    <vs-col xs="12" sm="12" lg="6" v-if="invalidItemNumber.length > 0">
                        <input-text-area
                            id="invalid_item"
                            label="Invalid Bag / Connote"
                            v-model="invalidItemNumber"
                            :disabled="true"
                        />
                    </vs-col>
                </vs-row>
            </vs-row>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="3">
                    <vs-button
                        block
                        danger
                        flat
                        transparent
                        :active="true"
                        :data-testid="`cancel-button`"
                        @click="cancel"
                    >
                        Cancel
                    </vs-button>
                </vs-col>
                <vs-col w="3">
                    <vs-button
                        block
                        flat
                        transparent
                        type="submit"
                        :active="true"
                        :data-testid="`submit-button`"
                        @click="handleSubmit"
                    >
                        Submit
                    </vs-button>
                </vs-col>
            </vs-row>
        </template>
    </dialog-master>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'

import InputTextArea from '@/components/input/textArea'
import DialogMaster from '@/components/dialog/dialogMaster'

export default {
    name: 'dialog-validate-tracing',
    mixins: [master],
    components: {
        'dialog-master': DialogMaster,
        'input-text-area': InputTextArea,
    },
    props: {
        active: Boolean,
        closeDialog: Function,
        loadingSubmit: Boolean,
        title: String,
        validItem: [Array, Object],
        validateType: String,
    },
    computed: {
        listenActive() {
            return this.active
        },
        listenLoading() {
            return this.loadingSubmit
        },
        listenValidItem() {
            return this.validItem || []
        },
        listenTitle() {
            return this.title || []
        },
        listenValidateType() {
            return this.validateType
        },
    },
    watch: {
        active: function (val) {
            if (val == true) {
                this.initDataItem()
            }
        },
    },
    data() {
        return {
            form: {},
            validItemNumber: [],
            invalidItemNumber: [],
        }
    },
    methods: {
        initDataItem() {
            if (this.listenValidItem.length > 0) {
                this.validItemNumber = this.listenValidItem
                    .filter((item) => item.status === 'SUCCESS')
                    .map((item) => item.item_number)
                this.invalidItemNumber = this.listenValidItem
                    .filter((item) => item.status !== 'SUCCESS')
                    .map((item) => item.item_number)
            }
        },
        async handleSubmit() {
            if (this.listenValidateType === 'create') {
                this.$emit('updateValue', 'SUBMIT_DIALOG_CREATE_VALIDATE_TRACING', {
                    item_number: this.validItemNumber,
                })
            } else {
                this.$emit('updateValue', 'SUBMIT_DIALOG_REMOVE_VALIDATE_TRACING', {
                    item_number: this.validItemNumber,
                })
            }
        },
        cancel() {
            this.closeDialog()
        },
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>

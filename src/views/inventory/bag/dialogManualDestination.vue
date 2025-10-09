<template>
    <dialog-master
        width="md"
        :actived="listenActive"
        :closeDialog="cancel"
        :loading="listenLoading"
    >
        <template v-slot:header>
            <img :src="mascot" alt="mascor-jne-sad" width="183" align="center" />
        </template>

        <template v-slot:content>
            <div style="padding: 1em 1em">
                <h2>We Are Sorry...</h2>
                <p>We couldn’t find any destination recommendations.</p>
                <p>Please choose one manually</p>
            </div>

            <div>
                <auto-complete
                    name="Bag Destination"
                    formKey="destination"
                    rules="required"
                    :querySearch="querySearch"
                    :selectedValue="destinationLabel"
                    @inputFocus="inputFocus"
                    @updateValue="updateValue"
                />
            </div>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="3">
                    <vs-button
                        transparent
                        block
                        danger
                        flat
                        :active="true"
                        :data-testid="`cancel-button`"
                        @click="cancel"
                    >
                        Cancel
                    </vs-button>
                </vs-col>
                <vs-col w="3">
                    <vs-button
                        transparent
                        block
                        flat
                        :active="true"
                        type="submit"
                        :data-testid="`submit-button`"
                        @click="handleSubmit"
                    >
                        Proceed
                    </vs-button>
                </vs-col>
            </vs-row>
        </template>
    </dialog-master>
</template>

<script>
import axios from 'axios'
import master from '@/mixins/master'

import DialogMaster from '@/components/dialog/dialogMaster'

import mascot from '@/assets/svg/mascot-sad.svg'
import AutoComplete from '@/components/input/autoComplete'

export default {
    name: 'dialog-manual-destination',
    mixins: [master],
    components: {
        'dialog-master': DialogMaster,
        'auto-complete': AutoComplete,
    },
    props: {
        active: Boolean,
        closeDialog: Function,
    },
    data() {
        return {
            mascot,
            loading: false,
            autoCompleteUrl: '',
            destinationLabel: '',
            destinationValue: '',
        }
    },
    computed: {
        listenActive() {
            return this.active
        },
        listenDataItem() {
            return this.dataItem
        },
        listenLoading() {
            return this.loading
        },
    },
    methods: {
        cancel() {
            this.closeDialog()
        },
        handleSubmit() {
            this.cancel()
            this.$emit('createBag', this.destinationValue)
        },
        updateValue(key, val, info) {
            this.destinationValue = info?.data?.node_id
        },

        inputFocus() {
            this.autoCompleteUrl = `${this.URL.node}/${this.listenNodeId}/destination-link?n=${this.listenNodeId}`
        },
        async querySearch(queryString, cb) {
            try {
                const res = await axios.get(
                    this.autoCompleteUrl + `&s=${queryString}`,
                    this.Helper.header()
                )
                const result = res.data.data || []
                const suggestions = result.map((item) => {
                    const value = item.node_name || ''
                    return { value, data: item }
                })
                cb(suggestions)
            } catch (error) {
                console.error('error', error)
            }
        },
    },
}
</script>

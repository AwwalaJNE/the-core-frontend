<template>
    <dialog-master
        :actived="listenActive"
        :loading="listenLoading"
        :closeDialog="cancel"
        width="md"
    >
        <template v-slot:header>
            {{ listenTitle }}
        </template>

        <template v-slot:content>
            <vs-row>
                <vs-col w="12">
                    <div>
                        <div class="text-left">
                            <h2>Choose Type</h2>
                            <p>
                                Please select your surat jalan type, bear in mind that each type has
                                its own purpose
                            </p>
                        </div>

                        <div class="surat-jalan-container">
                            <div
                                v-for="(item, index) in suratJalanTypeArray"
                                :key="index"
                                :class="[
                                    'surat-jalan-box',
                                    { active: surat_jalan_type === item.value },
                                ]"
                                :data-testid="`bag-${item.label}`"
                                @click="selectTipeSuratJalan(item)"
                            >
                                <i
                                    v-if="surat_jalan_type === item.value"
                                    class="bx bx-check check-icon"
                                ></i>
                                <i :class="item.icon" class="bag-icon"></i>
                                <div class="bag-label">{{ item.label }}</div>
                            </div>
                        </div>
                    </div>
                </vs-col>
            </vs-row>
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

import DialogMaster from '@/components/dialog/dialogMaster'

export default {
    name: 'Inbound-Dialog-Bulk-Surat-Jalan',
    mixins: [master],
    components: {
        'dialog-master': DialogMaster,
    },
    props: {
        active: Boolean,
        closeDialog: Function,
        title: String,
    },
    computed: {
        listenActive() {
            return this.active
        },
        listenLoading() {
            return this.loadingStatus || this.loading
        },
        listenTitle() {
            return this.title
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
            status_arr: [],

            loading: false,

            isDisabled: false,
            selected_surat_jalan_type: '',
            surat_jalan_type: '',
            suratJalanTypeArray: [
                {
                    label: 'SURAT JALAN',
                    value: 'SJ',
                    icon: 'bx bx-archive',
                    enableItem: 'Connote',
                    enableItemPlaceholder: 'Insert Connote Number',
                },
                {
                    label: 'DO',
                    value: 'DO',
                    icon: 'bx bx-archive',
                    enableItem: 'Bag',
                    enableItemPlaceholder: 'Insert Bag Number',
                },
                {
                    label: 'MTS',
                    value: 'MTS',
                    icon: 'bx bx-archive',
                    enableItem: 'Connote',
                    enableItemPlaceholder: 'Insert Connote Number',
                },
                {
                    label: 'HBAG',
                    value: 'HBAG',
                    icon: 'bx bx-archive',
                    enableItem: 'Connote',
                    enableItemPlaceholder: 'Insert Connote Number',
                },
            ],
        }
    },
    methods: {
        selectTipeSuratJalan(item) {
            this.selected_surat_jalan_type = item
            this.surat_jalan_type = item.value
            this.isDisabled = false
            // this.setActiveInput('scanItem')
        },
        handleClearForm() {
            ;(this.receiving_log_id = ''),
                (this.inbound_number = ''),
                (this.item_number = ''),
                (this.status = ''),
                (this.remark = ''),
                (this.fileList = [])
        },
        cancel() {
            this.handleClearForm()
            this.$emit('closeDialog')
        },
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>
<style lang="scss" scoped>
.surat-jalan-container {
    display: grid;
    gap: 16px;

    grid-template-columns: repeat(4, 1fr);

    .surat-jalan-box {
        border-radius: 16px;
        text-align: center;
        padding: 16px;
        height: 120px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.2s ease;
        cursor: pointer;
        position: relative;

        i {
            font-size: 40px;
            color: #333;
        }

        span,
        div {
            font-size: 14px;
            font-weight: 500;
        }

        .check-icon {
            position: absolute;
            top: -10px;
            right: -10px;
            background: $coreBlue;
            color: white !important;
            border-radius: 50%;
            font-size: 25px;
        }

        &.active {
            box-shadow: 0 1px 4px $coreBlue;
            color: $coreBlue;

            i {
                color: $coreBlue;
            }
        }
    }

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
}
</style>

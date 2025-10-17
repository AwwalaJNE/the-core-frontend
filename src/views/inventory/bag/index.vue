<template>
    <div>
        <vs-row justify="space-between" align="stretch" style="padding: 1em 0" ref="baggingSection">
            <vs-col w="6">
                <div :class="['box-v2', { 'with-glow-border': isDisabled }]">
                    <div class="text-left">
                        <h3>1. Choose Bag Type</h3>
                        <p>
                            Please select your bag category type, bear in mind that each type has
                            its own purpose
                        </p>
                    </div>

                    <div class="bag-container">
                        <div
                            v-for="(item, index) in bagTypeArray"
                            :key="index"
                            :class="['bag-box', { active: bag_type === item.value }]"
                            :data-testid="`bag-${item.label}`"
                            @click="selectTipeBag(item)"
                        >
                            <i v-if="bag_type === item.value" class="bx bx-check check-icon"></i>
                            <i :class="item.icon" class="bag-icon"></i>
                            <div class="bag-label">{{ item.label }}</div>
                        </div>
                    </div>
                </div>
            </vs-col>
            <vs-col w="6" :class="{ 'disabled-section': isDisabled }">
                <div class="box-v2" :class="{ 'with-glow-border': !isDisabled }">
                    <div class="text-left">
                        <h3>2. Scan First Item Here</h3>
                        <p v-if="selected_bag_type?.enableItem && selected_bag_type?.label">
                            You can only insert
                            {{ selected_bag_type?.enableItem?.toLowerCase() }}
                            for
                            {{ selected_bag_type?.label?.toLowerCase() }}
                            type
                        </p>
                    </div>

                    <div style="padding: 0.5em">
                        <img
                            :src="bagPlaceholder"
                            alt="bag-placeholder"
                            width="183"
                            align="center"
                        />
                    </div>

                    <div>
                        <vs-row>
                            <vs-col xs="12" sm="12" lg="6">
                                <vs-checkbox
                                    v-model="is_auto_open_bag"
                                    @change="handleAutoOpenBag"
                                    :data-testid="`checkbox-is_auto_open_bag`"
                                >
                                    Auto Open Bag
                                </vs-checkbox>
                            </vs-col>

                            <vs-col v-if="['normal'].includes(bag_type)" xs="12" sm="12" lg="6">
                                <vs-checkbox
                                    v-model="is_hub_delivery_validation"
                                    @change="handleValidateHubDelivery"
                                    :data-testid="`checkbox-validate_hub_delivery`"
                                >
                                    Validate Hub Delivery
                                </vs-checkbox>
                            </vs-col>
                        </vs-row>

                        <vs-row>
                            <vs-col w="12">
                                <input-general
                                    ref="scanItem"
                                    formKey="scanItem"
                                    :name="selected_bag_type?.enableItem || 'Item Number'"
                                    :placeholder="
                                        selected_bag_type?.enableItemPlaceholder ||
                                        'Insert Item Number'
                                    "
                                    typeInput="text"
                                    :valueData="item_number"
                                    :hasBarcode="true"
                                    :enter_to_update="true"
                                    @click-icon="handleIconClick"
                                    @updateValue="updateValue"
                                    @enterUpdate="processItem"
                                />
                            </vs-col>
                        </vs-row>
                    </div>
                </div>
            </vs-col>
        </vs-row>

        <dialog-manual-destination
            :active="dialogActiveManualDestination"
            :closeDialog="closeDialog"
            @createBag="createBag"
        />
    </div>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'

import Breadcrumb from '@/components/breadcrumb/index'
import Selector from '@/components/input/select'
import AutoComplete from '@/components/input/autoComplete'
import CameraScanner from '@/components/scanner/camera.vue'
import asynchronousSelect from '@/components/input/asynchronousSelect'
import InputGeneral from '@/components/input/general'

import bagPlaceholder from '@/assets/img/bagging-placeholder.png'

import DialogManualDestination from '@/views/inventory/bag/dialogManualDestination'

export default {
    name: 'InventoryBagging',
    mixins: [master],
    components: {
        breadcrumb: Breadcrumb,
        selector: Selector,
        'auto-complete': AutoComplete,
        'input-general': InputGeneral,
        asynchronousSelect: asynchronousSelect,
        CameraScanner,
        'dialog-manual-destination': DialogManualDestination,
    },
    data() {
        return {
            isDisabled: true,
            bagPlaceholder,
            form: {},
            selected_bag_type: '',
            bag_type: '',
            bagTypeArray: [
                {
                    label: 'REGULAR',
                    value: 'normal',
                    icon: 'bx bx-archive',
                    enableItem: 'Connote',
                    enableItemPlaceholder: 'Insert Connote Number',
                },
                {
                    label: 'MASTERBAG',
                    value: 'masterbag',
                    icon: 'bx bx-archive',
                    enableItem: 'Bag',
                    enableItemPlaceholder: 'Insert Bag Number',
                },
                {
                    label: 'PRA RUNSHEET',
                    value: 'pra runsheet',
                    icon: 'bx bx-archive',
                    enableItem: 'Connote',
                    enableItemPlaceholder: 'Insert Connote Number',
                },
                {
                    label: 'HVO',
                    value: 'hvo',
                    icon: 'bx bx-archive',
                    enableItem: 'Connote',
                    enableItemPlaceholder: 'Insert Connote Number',
                },
                {
                    label: 'HACB',
                    value: 'hacb',
                    icon: 'bx bx-archive',
                    enableItem: 'Connote',
                    enableItemPlaceholder: 'Insert Connote Number',
                },
                {
                    label: 'OM',
                    value: 'om',
                    icon: 'bx bx-archive',
                    enableItem: 'Connote',
                    enableItemPlaceholder: 'Insert Connote Number',
                },
            ],
            is_auto_open_bag: true,
            is_hub_delivery_validation: false,
            refloading: null,

            item_number: '',
            dialogActiveManualDestination: false,
        }
    },
    methods: {
        handleIconClick() {
            if (!this.isDisabled) {
                this.$refs.cameraScanner.open('item_number')
            }
        },
        selectTipeBag(item) {
            this.selected_bag_type = item
            this.bag_type = item.value
            this.isDisabled = false
            this.is_auto_open_bag = true
            this.setInputFocus()
        },
        handleAutoOpenBag(val) {
            this.is_auto_open_bag = val.target.checked
        },
        handleValidateHubDelivery(val) {
            this.is_hub_delivery_validation = val.target.checked
        },
        updateValue(key, val) {
            if (key === 'scanItem') this.item_number = val
        },
        async processItem() {
            this.form = {
                item_number: this.item_number,
                destination_scope: 'HUB_DELIVERY',
                auto_open_bag: this.is_auto_open_bag,
            }

            if (this.bag_type === 'pra runsheet') {
                this.createBag()
            } else {
                await this.processSorting()
            }
        },
        async processSorting() {
            this.startLoading(this.$refs.baggingSection)
            try {
                const res = await axios.post(
                    `${this.URL.sorting_zip_code_validation}?n=${this.listenNodeId}`,
                    this.form,
                    this.Helper.header()
                )

                if (res?.data?.information?.destination_node_id) {
                    this.createBag(res?.data?.information?.destination_node_id)
                } else {
                    this.openDialog()
                }

                this.openNotification('success', null, 'Success', res?.data?.message || 'Success')
            } catch (err) {
                // TODO: HIDE & RECHECK LATER
                // this.openNotification(
                //     'danger',
                //     err?.response?.data?.code || '',
                //     'Failed',
                //     err?.response?.data?.message || 'Something went wrong'
                // )

                // TODO: RECHECK LATER
                this.openDialog()
            } finally {
                this.stopLoading()
            }
        },
        async createBag(destination_node_id = '') {
            this.startLoading(this.$refs.baggingSection)
            try {
                const res = await axios.post(
                    `${this.URL.revamp_bag}?n=${this.listenNodeId}`,
                    {
                        item_number: this.item_number,
                        type: this.bag_type,
                        auto_open_bag: this.is_auto_open_bag,
                        is_hub_delivery_validation: this.is_hub_delivery_validation,
                        destination: this.bag_type === 'pra runsheet' ? '' : 'all_routing',
                        service: this.bag_type === 'pra runsheet' ? '' : ['ALL_SERVICE'],
                        validation: '',
                        validation_reference: '',
                        destination_node_id: destination_node_id,
                    },
                    this.Helper.header()
                )

                let bagNumber = res.data.data.bag_number
                let bagNumberForRoute = bagNumber
                this.handleClearForm()

                this.$store.dispatch('SET_BAG_IS_AUTO_OPEN_BAG', this.is_auto_open_bag)
                this.$store.dispatch('SET_BAG_IS_AUTO_OPEN_BAG_ValueData', this.is_auto_open_bag)

                this.$store.dispatch(
                    'SET_IS_HUB_DELIVERY_VALIDATION',
                    this.is_hub_delivery_validation
                )
                this.$store.dispatch(
                    'SET_IS_HUB_DELIVERY_VALIDATION_ValueData',
                    this.is_hub_delivery_validation
                )

                this.$router.push('/bagging-detail/' + encodeURIComponent(bagNumberForRoute))
                this.setRoutePageHistory(this.$route.meta, false)

                this.openNotification('success', null, 'Success', 'Bagging is success')
            } catch (err) {
                const errorCode = err?.response?.data?.code ?? ''
                const errorMessage = err?.response?.data?.message ?? 'Something went wrong'

                if (errorCode === 'CORE-1135') {
                    this.openNotificationCenter('danger', errorCode, 'Failed', errorMessage)
                } else {
                    this.openNotification('danger', errorCode, 'Failed', errorMessage)
                }
            } finally {
                this.stopLoading()
                this.handleClearForm()
            }
        },
        handleClearForm() {
            this.form = {}
            this.item_number = ''
        },

        setInputFocus() {
            this.$nextTick(() => {
                let inputElement = this.$refs.scanItem?.$el.querySelector('input')
                if (inputElement) {
                    inputElement.focus()
                }
            })
        },

        openDialog() {
            this.dialogActiveManualDestination = true
        },
        closeDialog() {
            this.dialogActiveManualDestination = false
        },
    },
    created() {
        this.$store.dispatch('SET_BAG_IS_AUTO_OPEN_BAG', false)
        this.$store.dispatch('SET_BAG_IS_AUTO_OPEN_BAG_ValueData', false)

        this.$store.dispatch('SET_IS_HUB_DELIVERY_VALIDATION', false)
        this.$store.dispatch('SET_IS_HUB_DELIVERY_VALIDATION_ValueData', false)
    },
}
</script>
<style lang="scss">
.bag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: flex-start;

    .bag-box {
        flex: 0 0 calc((100% - 32px) / 3);
        height: 120px;
        border-radius: 16px;
        text-align: center;
        padding: 16px;
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

    @include for-phone-only {
        .bag-box {
            flex: 1 1 100%;
            height: 100px;

            i {
                font-size: 28px;
            }

            span,
            div {
                font-size: 12px;
            }
        }
    }

    @include for-tablet-portrait-down {
        .bag-box {
            flex: 1 1 calc((100% - 16px) / 2);
            height: 110px;

            i {
                font-size: 32px;
            }

            span,
            div {
                font-size: 13px;
            }
        }
    }

    @include for-big-desktop-up {
        .bag-box {
            flex: 0 0 calc((100% - 32px) / 3);
            height: 150px;

            i {
                font-size: 50px;
            }

            span,
            div {
                font-size: 16px;
            }
        }
    }
}
</style>

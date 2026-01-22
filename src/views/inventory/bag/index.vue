<template>
    <div>
        <vs-loading :active="listenLoading" text="Loading..." :target="$refs.baggingSection" />
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
                        <template v-for="(item, index) in bagTypeArray">
                            <div
                                v-if="hasPermission(item.permission)"
                                :key="`allowed-${index}`"
                                class="bag-box"
                                :class="{ active: bag_type === item.value }"
                                :data-testid="`bag-${item.label}`"
                                @click="selectTipeBag(item)"
                            >
                                <i
                                    v-if="bag_type === item.value"
                                    class="bx bx-check check-icon"
                                ></i>
                                <i :class="item.icon" class="bag-icon"></i>
                                <div class="bag-label">{{ item.label }}</div>
                            </div>

                            <vs-tooltip
                                v-else
                                :key="`denied-${index}`"
                                class="bag-box disabled"
                                :data-testid="`bag-${item.label}`"
                            >
                                <i :class="item.icon" class="bag-icon"></i>
                                <div class="bag-label">{{ item.label }}</div>

                                <template #tooltip>
                                    you don't have {{ item.permission }} permission
                                </template>
                            </vs-tooltip>
                        </template>
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
                                    class="checkbox-core"
                                >
                                    Auto Open Bag
                                </vs-checkbox>
                            </vs-col>

                            <!-- TODO: UNCOMMENT IF STILL NEED THIS -->
                            <!-- <vs-col v-if="['normal'].includes(bag_type)" xs="12" sm="12" lg="6">
                                <vs-checkbox
                                    v-model="is_hub_delivery_validation"
                                    @change="handleValidateHubDelivery"
                                    :data-testid="`checkbox-validate_hub_delivery`"
                                >
                                    Validate Hub Delivery
                                </vs-checkbox>
                            </vs-col> -->
                        </vs-row>

                        <vs-row>
                            <vs-col
                                xs="12"
                                sm="12"
                                :lg="['normal', 'hacb', 'hvo', 'om'].includes(bag_type) ? 8 : 12"
                            >
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
                                    :disabled="dialogActiveManualDestination || loading"
                                    @click-icon="handleIconClick"
                                    @updateValue="updateValue"
                                    @enterUpdate="validateItem"
                                />
                            </vs-col>
                            <vs-col
                                v-if="['normal', 'hacb', 'hvo', 'om'].includes(bag_type)"
                                xs="12"
                                sm="12"
                                lg="4"
                            >
                                <selector
                                    ref="destination"
                                    name="Destination"
                                    rules=""
                                    placeholder="Select Destination"
                                    formKey="destination"
                                    :valueData="destinationArr"
                                    :selectedValue="destination"
                                    :isMultiple="false"
                                    :customBind="'data-kt-bag-type'"
                                    @updateValue="updateValue"
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

import Loading from '@/components/loading'

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
        'vs-loading': Loading,
    },
    computed: {
        listenLoading() {
            return this.loading
        },
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
                    permission: 'create-bag-regular',
                },
                {
                    label: 'MASTERBAG',
                    value: 'masterbag',
                    icon: 'bx bx-archive',
                    enableItem: 'Bag',
                    enableItemPlaceholder: 'Insert Bag Number',
                    permission: 'create-bag-masterbag',
                },
                {
                    label: 'PRA RUNSHEET',
                    value: 'pra runsheet',
                    icon: 'bx bx-archive',
                    enableItem: 'Connote',
                    enableItemPlaceholder: 'Insert Connote Number',
                    permission: 'create-bag-pra-runsheet',
                },
                {
                    label: 'HVO',
                    value: 'hvo',
                    icon: 'bx bx-archive',
                    enableItem: 'Connote',
                    enableItemPlaceholder: 'Insert Connote Number',
                    permission: 'create-bag-hvo',
                },
                {
                    label: 'HACB',
                    value: 'hacb',
                    icon: 'bx bx-archive',
                    enableItem: 'Connote',
                    enableItemPlaceholder: 'Insert Connote Number',
                    permission: 'create-bag-hacb',
                },
                {
                    label: 'OM',
                    value: 'om',
                    icon: 'bx bx-archive',
                    enableItem: 'Connote',
                    enableItemPlaceholder: 'Insert Connote Number',
                    permission: 'create-bag-om',
                },
            ],
            is_auto_open_bag: true,
            is_hub_delivery_validation: false,

            item_number: '',
            loading: false,

            dialogActiveManualDestination: false,

            destination: 'HUB_DELIVERY',
            destinationArr: [
                {
                    label: 'Smart Point Center',
                    value: 'HUB_DELIVERY',
                },
                {
                    label: 'Delivery Area',
                    value: 'DELIVERY_AREA',
                },
                {
                    label: 'Smart Point',
                    value: 'SMARTPOINT',
                },
            ],
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
            this.setActiveInput('scanItem')
        },
        handleAutoOpenBag(val) {
            this.is_auto_open_bag = val.target.checked
        },
        handleValidateHubDelivery(val) {
            this.is_hub_delivery_validation = val.target.checked
        },
        updateValue(key, val) {
            if (key === 'scanItem') this.item_number = val
            else if (key === 'destination') {
                this.destination = val
                this.setActiveInput('scanItem')
            }
        },
        async validateItem() {
            if (!this.item_number) return

            this.loading = true

            try {
                const res = await axios.post(
                    `${this.URL.validation_item}?n=${this.listenNodeId}`,
                    { item_number: this.item_number },
                    this.Helper.header()
                )

                await this.processItem()

                this.openNotification('success', null, 'Success', res?.data?.message || 'Success')
            } catch (err) {
                await this.openNotification(
                    'danger',
                    err?.response?.data?.code || '',
                    'Failed',
                    err?.response?.data?.message || 'Something went wrong'
                )
            } finally {
                this.loading = false
            }
        },
        async processItem() {
            this.form = {
                item_number: this.item_number,
                destination_scope: this.destination,
                auto_open_bag: this.is_auto_open_bag,
            }

            if (this.bag_type === 'pra runsheet') {
                await this.createBag()
            } else {
                await this.processSorting()
            }
        },
        async processSorting() {
            let destinationNodeId
            try {
                const res = await axios.post(
                    `${this.URL.sorting_zip_code_validation}?n=${this.listenNodeId}`,
                    this.form,
                    this.Helper.header()
                )

                destinationNodeId = res?.data?.information?.destination_node_id

                if (!destinationNodeId) {
                    this.openDialog()
                    return
                }

                this.openNotification('success', null, 'Success', res?.data?.message || 'Success')
            } catch (err) {
                this.openDialog()
                return
            }

            await this.createBag(destinationNodeId)
        },
        async createBag(destination_node_id = '') {
            try {
                const res = await axios.post(
                    `${this.URL.revamp_bag}?n=${this.listenNodeId}`,
                    {
                        item_number: this.item_number,
                        type: this.bag_type,
                        auto_open_bag: this.is_auto_open_bag,
                        is_hub_delivery_validation: false,
                        destination: this.bag_type === 'pra runsheet' ? '' : 'all_routing',
                        service: this.bag_type === 'pra runsheet' ? '' : ['ALL_SERVICE'],
                        validation: '',
                        validation_reference: '',
                        destination_node_id,
                    },
                    this.Helper.header()
                )

                const bagNumber = res?.data?.data?.bag_number

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

                this.handleClearForm()

                this.$router.push('/bagging-detail/' + encodeURIComponent(bagNumber))

                this.openNotification('success', null, 'Success', 'Bagging is success')
            } catch (err) {
                await this.openNotification(
                    'danger',
                    err?.response?.data?.code || '',
                    'Failed',
                    err?.response?.data?.message || 'Something went wrong'
                )

                return
            }
        },
        handleClearForm() {
            this.form = {}
            this.item_number = ''
            this.setActiveInput('scanItem')
        },

        openDialog() {
            this.dialogActiveManualDestination = true
            this.autoFocusInput(this.dialogActiveManualDestination)
        },
        closeDialog() {
            this.dialogActiveManualDestination = false
            this.autoFocusInput(this.dialogActiveManualDestination)
        },
        autoFocusInput(value) {
            this.setActiveInput('scanItem', null, () => value)
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
<style lang="scss" scoped>
.bag-container {
    display: grid;
    gap: 16px;

    grid-template-columns: repeat(3, 1fr);

    .bag-box {
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

        &.disabled {
            opacity: 0.4;
            cursor: not-allowed;
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

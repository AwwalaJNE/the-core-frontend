<template>
    <inputan :name="name" :rules="rules">
        <template v-slot:inputan="props">
            <vs-col v-for="(item, key) in valueData" :key="item.key || key" class="radio-wrapper">
                <div
                    :class="{ 'is-selected': tempValue === item.key }"
                    :data-testid="`${tempValue === item.key ? 'selected-' : ''}card`"
                    @click="handleSelect(item.key)"
                >
                    <div
                        v-if="listenRemoveButton && DataArr.length > 1 && tempValue !== item.key"
                        class="overlay-button"
                        :data-testid="`remove-button-${item.key}`"
                        @click.stop="removeRow(item.key)"
                    >
                        <i class="bx bx-trash"></i>
                    </div>

                    <vehicle-card
                        :data="item.state"
                        :isActive="tempValue === item.key"
                        :data-testid="`vehicle-card-${item.key}`"
                    />
                </div>
            </vs-col>
        </template>
    </inputan>
</template>

<script>
import Inputan from '@/components/input/inputan'
import InputGeneral from '@/components/input/general'
import VehicleCard from '@/views/transport/manifestNew/vehicleCard'

export default {
    name: 'radio-with-form',
    components: {
        inputan: Inputan,
        'input-general': InputGeneral,
        'vehicle-card': VehicleCard,
    },
    props: {
        name: String,
        valueData: Array,
        selectedValue: [String, Number],
        rules: String,
        radioType: String,
        disabled: Boolean,
        isRemoveButton: Boolean,
    },
    data() {
        return {
            DataArr: this.valueData || [],
            tempValue: this.selectedValue || 0,
        }
    },
    watch: {
        selectedValue(newVal) {
            this.tempValue = newVal
        },
        valueData: {
            handler(newVal) {
                this.DataArr = newVal
            },
            deep: true,
        },
    },
    computed: {
        listenIsDisabled() {
            return this.disabled || false
        },
        listenRadioType() {
            return this.radioType
        },
        listenRemoveButton() {
            return this.isRemoveButton || false
        },
    },
    methods: {
        handleSelect(newKey) {
            const oldVal = this.tempValue
            this.$emit('updateValue', newKey, (isOk) => {
                if (isOk) {
                    this.tempValue = newKey
                } else {
                    this.tempValue = oldVal
                }
            })
        },
        removeRow(row_id) {
            this.$emit('removeRow', row_id)
        },
    },
}
</script>

<style lang="scss" scoped>
::v-deep .radio-with-form-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5em;
}

::v-deep .vs-radio-content {
    border: none !important;
}

::v-deep .vs-radio__label {
    width: 100% !important;
}

::v-deep .radio-with-form {
    padding: 1.5em;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    background-color: white;
    width: 100% !important;
}

::v-deep .radio-wrapper {
    position: relative;
}

::v-deep .overlay-button {
    color: red;
    position: absolute;
    top: 6px;
    right: 6px;
    font-size: 20px;
    z-index: 20;
    cursor: pointer;
    transition: color 0.2s ease;
    padding: 0 10px;
}

::v-deep .overlay-button:hover {
    color: darkred;
}
</style>

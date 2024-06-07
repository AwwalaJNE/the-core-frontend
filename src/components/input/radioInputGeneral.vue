<template>
    <div>
        <label class="radio-input-label">{{ name }}</label>
        <div class="radio-input-group">
            <inputan :name="name" :rules="rules">
                <template v-slot:inputan="props">
                    <vs-row style="flex-direction: column">
                        <template v-if="DataArr.length > 0">
                            <vs-col xs="12" md="6">
                                <div class="radio-container" v-for="(item, key) in DataArr" :key="key">
                                    <vs-radio
                                        v-model="selectedRadio"
                                        :val="item.value"
                                        :state="props.err ? 'danger' : 'gray'"
                                        :key="key"
                                    />
                                    <label :for="`radio-${key}`" class="radio-label">{{ item.label }}</label>
                                </div>
                            </vs-col>
                        </template>
                    </vs-row>
                </template>
            </inputan>

            <inputan :name="name" :rules="rules">
                <template v-slot:inputan="props">
                    <vs-row style="flex-direction: column">
                        <template v-if="DataArr.length > 0">
                            <vs-col xs="12" md="6">
                                <vs-input
                                    v-model="inputValue"
                                    class="mt-input"
                                    type="number"
                                    :placeholder="`Masukkan ${name} dalam satuan ${selectedRadio.toLowerCase()}`"
                                    :autofocus="isFocusToInput"
                                    :disabled="isDisabled"
                                    :min="listenMinValue"
                                    :state="props.err ? 'danger' : 'gray'"
                                    @input="updateValue"
                                    @click-icon="$emit('click-icon')"
                                />
                            </vs-col>
                        </template>
                    </vs-row>
                </template>
            </inputan>
        </div>
    </div>
</template>
<script>
import Inputan from "@/components/input/inputan";
export default {
    name: "input-general",
    props: {
        name: String,
        rules: String,
        valueData: [String, Number],
        arrValueData: [String, Number],
        formKey: String,
        typeInput: String,
        minValue: Number,
        focusToInput: Boolean,
        tabindex: [Number, String],
        onlyNumber: Boolean,
        disabled: Boolean,
        arrData: Array,
    },
    components: {
        inputan: Inputan,
    },
    data() {
        return {
            selectedRadio: this.arrData[0].value || '',
            inputValue: this.valueData || '',
            DataArr: this.arrData ? this.arrData : []
        };
    },
    computed: {
        listenFormKey() {
            return this.formKey;
        },
        listenMinValue() {
            return this.minValue;
        },
        listenTypeInput() {
            return this.typeInput;
        },
        isDisabled() {
            return this.typeInput.includes("disabled") || this.disabled;
        },
        isHidden() {
            return this.typeInput.includes("hidden");
        },
        isFocusToInput() {
            return this.focusToInput || false;
        },
        listenTabIndex() {
            return this.tabindex;
        },
        isBorder() {
            return this.border || false;
        },
    },
    watch: {
        arrData: function (val) {
            if (val != undefined) {
                this.DataArr = val
            }
        },
        selectedRadio: function(n, o) {
            if (n !== o) {
                let info = {};
                info["name"] = this.name;
                info["key"] = this.listenFormKey;
                info["typeInput"] = this.listenTypeInput;
                info["statusRad"] = this.selectedRadio;
                this.$emit("updateValue", this.listenFormKey, n, info)
            }
        },
        valueData: function(val) {
            if (['menit', 'jam', 'hari'].includes(val)) {
                this.inputValue = '';
            } else {
                this.inputValue = val ? val :  '';
            }
        },
    },
    methods: {
        updateValue() {
            let info = {};
            info["name"] = this.name;
            info["key"] = this.listenFormKey;
            info["typeInput"] = this.listenTypeInput;
            info["statusRad"] = this.selectedRadio;

            
            this.$emit("updateValue", this.listenFormKey, this.inputValue, info);
        },
    },
    mounted() {
    },
};
</script>
  
<style lang="scss">
.radio-input-label {
    font-size: 0.8rem;
    transition: all 0.25s ease;
    cursor: text;
    user-select: none;
    pointer-events: none;
    display: flex;
    justify-content: flex-start;
    padding: 0px 0px 5px 10px;
}

.radio-container {
    display: inline-flex;
    align-items: center;
    margin-right: 5em;
}

.radio-label {
    font-size: 0.8rem;
}

.mt-input {
    margin-top: 1em;
    width: 100%;
}
.radio-input-group {
    margin-bottom: 1em;
    padding: 1em;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    background-color: white;
    display: inline-block; /* Add to keep the group inline */
    width: 100%;
}
</style>
  
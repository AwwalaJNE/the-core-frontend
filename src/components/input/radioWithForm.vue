<template>
    <inputan :name="name" :rules="rules">
        <template v-slot:inputan="props">
            <div class="radio-with-form-container">
                <vs-col
                    v-for="(item, key) in DataArr" 
                    :key="key"
                >
                    <vs-radio 
                        v-model="value" 
                        :key="key"
                        :val="item.key" 
                        :disabled="listenIsDisabled"
                        :state="props.err !== undefined && props.err !== '' ?'danger':'gray'"
                    >
                        <div class="radio-with-form overlay-wrapper">
                            <vs-row>
                                <vs-col
                                    v-for="(stateItem, stateIndex) in item.state"
                                    :key="stateIndex"
                                    :w="stateItem.width"
                                >
                                    <input-general
                                        :disabled="true"
                                        :formKey="stateItem.key"
                                        :name="stateItem.label"
                                        :readonly="true"
                                        :typeInput="stateItem.typeInput"
                                        :valueData="stateItem.value"
                                    />
                                </vs-col>
                            </vs-row>

                            <div 
                                v-if="DataArr.length > 1 && value !== item.key"
                                class="overlay-button" 
                                @click="removeRow(item.key)"
                            >
                                <i class='bx bx-trash'></i>
                            </div>

                            <div class="radio-overlay"></div>
                        </div>
                    </vs-radio>
                </vs-col>
            </div>
        </template>
    </inputan>
</template>

<script>
import Inputan from "@/components/input/inputan";
import InputGeneral from "@/components/input/general";

export default {
    name:"radio-with-form",
    components: {
        "inputan": Inputan,
        "input-general": InputGeneral,
    }, 
    props: {
        name: String,
        rules: String,
        valueData: Array,
        selectedValue: [String, Number],
        formKey: String,
        typeInput: String,
        border: Boolean,
        vertical: Boolean,
        width: [String, Number],
        disabled: Boolean
    },
    data() {
        return {
            DataArr: this.valueData || [],
            value: this.selectedValue || "",
        }
    },
    computed: {
        listenFormKey(){
            return this.formKey || ''
        },
        listenIsMultiple(){
            return this.isMultiple ? this.isMultiple : false
        },
        listenIsDisabled(){
            return this.disabled || false
        },
    },
    watch: {
        valueData: function (val) {
            if (val != undefined) {
                this.DataArr = val
            }
        },
        selectedValue: function (val) {
            if (val != undefined) {
                this.value = val
            }
        },
        value: function(n, o) {
            if (n !== o) {
                let data = this.DataArr.filter(item => item.value == n)
                this.$emit("updateValue", this.listenFormKey, n, data[0])
            }
        }
    },
    methods: {
        removeRow(row_id) {
            this.$emit("removeRow", row_id);
        }
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

::v-deep .overlay-wrapper {
    position: relative;
}

::v-deep .radio-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
    z-index: 10;
}

::v-deep .overlay-button {
    color: red;
    position: absolute;
    top: 6px;
    right: 6px;
    font-size: 20px;
    z-index: 11;
    cursor: pointer;
    transition: color 0.2s ease;
}

::v-deep .overlay-button:hover {
    color: darkred;
}


</style>
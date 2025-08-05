<template>
    <inputan :name="name" :rules="rules">
        <template v-slot:inputan="props">
            <div class="radio-with-form-container">
                <vs-col
                    v-for="(item, key) in DataArr" 
                    :key="key"
                    class="radio-wrapper"
                >
                    <div class="overlay-wrapper">

                        <div 
                            v-if="DataArr.length > 1 && value !== item.key"
                            class="overlay-button" 
                            @click.stop="removeRow(item.key)"
                        >
                            <i class='bx bx-trash'></i>
                        </div>

                        <vs-radio 
                            v-model="value"
                            :val="item.key"
                            :disabled="listenIsDisabled"
                            :state="props.err !== undefined && props.err !== '' ? 'danger' : 'gray'"
                        >
                            <div class="radio-with-form">
                                <vs-row>
                                    <vs-col
                                        v-for="(stateItem, stateIndex) in item.state"
                                        :key="stateIndex"
                                        :w="stateItem.width"
                                    >
                                        <template v-if="stateItem.typeInput === 'text'">
                                            <input-general
                                                :disabled="true"
                                                :formKey="stateItem.key"
                                                :name="stateItem.label"
                                                :readonly="true"
                                                :typeInput="stateItem.typeInput"
                                                :valueData="stateItem.value"
                                            />
                                        </template>
                                        <template v-else-if="stateItem.typeInput === 'badge'">
                                            <div v-if="stateItem.value" style="height: 3em;">
                                                <h4 :style="getRoutingStyle(stateItem.value)">
                                                    {{ stateItem.value }}
                                                </h4>
                                            </div>
                                        </template>
                                    </vs-col>
                                </vs-row>
                                <div class="radio-overlay"></div>
                            </div>
                        </vs-radio>
                    </div>
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
        valueData: Array,
        selectedValue: [String, Number],
        rules: String,
        disabled: Boolean
    },
    data() {
        return {
            DataArr: this.valueData || [],
        }
    },
    computed: {
        listenIsDisabled(){
            return this.disabled || false
        },
        value: {
            get() {
                return this.selectedValue;
            },
            set(newVal) {
                this.$emit('updateValue', newVal);
            }
        }
    },
    methods: {
        removeRow(row_id) {
            this.$emit("removeRow", row_id);
        },
        getRoutingStyle(type) {
            if (!type) return {};

            const colorMap = {
                CANCELLED: '#f44336',   // Red
                DIVERTED: '#ff9800',    // Orange
                ARRIVED: '#4caf50',     // Green
                IN_FLIGHT: '#2196f3',   // Blue
                SCHEDULED: '#673ab7',   // Purple
            };

            const bgColor = colorMap[type.toUpperCase()] || '#9E9E9E'; // Default gray

           return {
                color: '#fff',
                backgroundColor: bgColor,
                padding: '4px 10px',
                borderRadius: '999px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '12px',
                minWidth: '100px',
                textAlign: 'center',
                position: 'absolute',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                zIndex: 1,
                margin: 0
            };
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
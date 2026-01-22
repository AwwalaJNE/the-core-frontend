<template>
    <inputan :name="name" :rules="rules">
        <template v-slot:inputan="props">
            <template v-if="isHidden == false">
                <div
                    class="flex items-center text-left"
                    style="justify-content: flex-start"
                    v-if="listenHiddenTitle == false"
                >
                    <span class="c-label"
                        >{{ name }}<span v-if="rules && rules.includes('required')"> *</span></span
                    >

                    <vs-tooltip v-if="tooltipMessage" right>
                        <template #tooltip>
                            {{ tooltipMessage }}
                        </template>
                        <i class="bx bx-info-circle"></i>
                    </vs-tooltip>
                </div>
                <template v-if="isPlaceholderGabung">
                    <!-- <vs-input
                        
                        :type="listenTypeInput.includes('password') == true ? 'password' : 'text'"
                        :placeholder="name"
                        :border="isBorder"
                        v-model="value"
                        :min="listenMinValue"
                        :disabled="isDisabled"
                        :autofocus="isFocusToInput"
                        :tabindex="listenTabIndex == -1 ? listenTabIndex : ''"
                        @input="updateValue"
                        @focus="focus(true)"
                        @blur="focus(false)"
                        ref="generalInput"
                        :data-testid="`input-${formKey}`"
                        :state="props.err !== undefined && props.err !== '' ?'danger':'gray'"
                    /> -->
                    <vs-input
                        border
                        :type="listenTypeInput.includes('password') == true ? 'password' : 'text'"
                        v-model="value"
                        :min="listenMinValue"
                        :disabled="isDisabled"
                        :tabindex="listenTabIndex == -1 ? listenTabIndex : ''"
                        @input="updateValue"
                        @focus="focus(true)"
                        @blur="focus(false)"
                        ref="generalInput"
                        :placeholder="name"
                        :state="props.err !== undefined && props.err !== '' ? 'danger' : 'gray'"
                        :data-testid="`input-${formKey}`"
                    />
                </template>
                <template v-else-if="listenCurrencyMasking">
                    <!-- v-currency -->
                    <vs-input
                        :type="'text'"
                        v-currency
                        v-model="value"
                        :disabled="isDisabled"
                        :autofocus="isFocusToInput"
                        :tabindex="listenTabIndex == -1 ? listenTabIndex : ''"
                        @input="updateValue"
                        @focus="focus(true)"
                        @blur="focus(false)"
                        ref="generalInput"
                        :min="listenMinValue"
                        :data-testid="`input-${formKey}`"
                        :state="props.err !== undefined && props.err !== '' ? 'danger' : 'gray'"
                    />
                </template>
                <template v-else-if="listenTypeInput.includes('date') == true">
                    <vs-input
                        :type="listenTypeInput.includes('date') == true ? 'date' : 'text'"
                        v-model="value"
                        format="yyyy-mm-dd HH:i"
                        :disabled="isDisabled"
                        :tabindex="listenTabIndex == -1 ? listenTabIndex : ''"
                        @input="updateValue"
                        @focus="focus(true)"
                        @blur="focus(false)"
                        ref="generalInput"
                        :data-testid="`input-${formKey}`"
                        :state="props.err !== undefined && props.err !== '' ? 'danger' : 'gray'"
                    />
                </template>
                <template v-else-if="isOnlyNumber == true">
                    <!-- .replace(/^0+/, '') -->
                    <vs-input
                        :type="
                            listenTypeInput
                                ? listenTypeInput.includes('password') == true
                                    ? 'password'
                                    : listenTypeInput
                                : 'text'
                        "
                        placeholder="0"
                        v-model="value"
                        :autofocus="isFocusToInput"
                        :tabindex="listenTabIndex == -1 ? listenTabIndex : ''"
                        :disabled="isDisabled"
                        @input="updateValue"
                        @focus="focus(true)"
                        @blur="focus(false)"
                        ref="generalInput"
                        @keydown="onlyNumberValidate"
                        @keyup="handlerZero(value)"
                        @keypress="checkOnlyNumber"
                        :min="listenMinValue"
                        :data-testid="`input-${formKey}`"
                        :state="props.err !== undefined && props.err !== '' ? 'danger' : 'gray'"
                    />
                </template>
                <template v-else-if="withDebounce == true">
                    <vs-input
                        :type="
                            listenTypeInput
                                ? listenTypeInput.includes('password') == true
                                    ? 'password'
                                    : listenTypeInput
                                : 'text'
                        "
                        v-model="value"
                        :autofocus="isFocusToInput"
                        :tabindex="listenTabIndex == -1 ? listenTabIndex : ''"
                        :disabled="isDisabled"
                        @input="updateValueDebounced"
                        @focus="focus(true)"
                        @blur="focus(false)"
                        ref="generalInput"
                        :min="listenMinValue"
                        :data-testid="`input-${formKey}`"
                        :state="props.err !== undefined && props.err !== '' ? 'danger' : 'gray'"
                    />
                </template>
                <template v-else-if="isenter_to_update == true">
                    <div style="display: flex; width: 100%; gap: 1rem">
                        <div style="flex: 1">
                            <vs-input
                                :type="
                                    listenTypeInput
                                        ? listenTypeInput.includes('password') == true
                                            ? 'password'
                                            : listenTypeInput
                                        : 'text'
                                "
                                :placeholder="placeholder"
                                :border="isBorder"
                                v-model="value"
                                :autofocus="isFocusToInput"
                                :tabindex="listenTabIndex == -1 ? listenTabIndex : ''"
                                :disabled="isDisabled"
                                @focus="focus(true)"
                                @blur="focus(false)"
                                @input="updateValue"
                                @keydown.enter="enterUpdate"
                                ref="generalInput"
                                :min="listenMinValue"
                                :data-testid="`input-${formKey}`"
                                :state="
                                    props.err !== undefined && props.err !== '' ? 'danger' : 'gray'
                                "
                            />
                        </div>
                        <div
                            v-if="hasBarcode"
                            style="
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                            "
                        >
                            <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />
                            <i class="bx bx-barcode-reader" @click="$emit('click-icon')"></i>
                        </div>
                    </div>
                </template>
                <template v-else-if="listenIsPasswordValidation">
                    <div>
                        <vs-input
                            :type="!isVisible ? 'text' : 'password'"
                            :placeholder="placeholder"
                            :border="isBorder"
                            v-model="value"
                            :autofocus="isFocusToInput"
                            :tabindex="listenTabIndex == -1 ? listenTabIndex : ''"
                            :disabled="isDisabled"
                            @input="updateValue"
                            @focus="focus(true)"
                            @blur="focus(false)"
                            ref="generalInput"
                            :min="listenMinValue"
                            :data-testid="`input-${formKey}`"
                            :state="props.err !== undefined && props.err !== '' ? 'danger' : 'gray'"
                            icon-after
                            @click-icon="toggleVisibility"
                        >
                            <template #icon>
                                <i :class="!isVisible ? 'bx bx-show-alt' : 'bx bx-hide'" />
                            </template>
                        </vs-input>

                        <div v-if="value" class="progress-container">
                            <div
                                class="progress-bar"
                                :style="{
                                    width: progressValue + '%',
                                    backgroundColor: progressColor,
                                }"
                            ></div>
                        </div>

                        <ul v-if="value && !allRequirementsMet" class="requirements">
                            <li
                                v-for="(req, i) in passwordRequirements"
                                :key="i"
                                :class="{ valid: req.valid }"
                            >
                                <i :class="req.valid ? 'bx bx-check-circle' : 'bx bx-x-circle'"></i>
                                {{ req.text }}
                            </li>
                        </ul>
                    </div>
                </template>

                <template v-else>
                    <vs-input
                        :type="
                            listenTypeInput
                                ? listenTypeInput.includes('password') == true
                                    ? 'password'
                                    : listenTypeInput
                                : 'text'
                        "
                        :placeholder="placeholder"
                        :border="isBorder"
                        v-model="value"
                        :autofocus="isFocusToInput"
                        :tabindex="listenTabIndex == -1 ? listenTabIndex : ''"
                        :disabled="isDisabled"
                        @input="updateValue"
                        @focus="focus(true)"
                        @blur="focus(false)"
                        @keydown.native="lockPrefix"
                        @keypress="checkOnlyNumber"
                        ref="generalInput"
                        :min="listenMinValue"
                        :data-testid="`input-${formKey}`"
                        :state="props.err !== undefined && props.err !== '' ? 'danger' : 'gray'"
                        :icon-after="iconAfter"
                        @click-icon="$emit('click-icon')"
                    >
                        <template #icon>
                            <slot name="icon" />
                        </template>
                    </vs-input>
                </template>
            </template>
        </template>
    </inputan>
</template>
<script>
import CameraScanner from '@/components/scanner/camera'
import Inputan from '@/components/input/inputan'
export default {
    name: 'input-general',
    props: {
        name: String,
        rules: String,
        valueData: [String, Number],
        formKey: String,
        typeInput: String,
        prefix: String,
        minValue: Number,
        maxValue: Number,
        placeholderGabung: Boolean,
        focusToInput: Boolean,
        tabindex: [Number, String],
        currencyMasking: Boolean,
        onlyNumber: Boolean,
        dataObj: [Object, Array],
        isdebounce: Boolean,
        enter_to_update: Boolean,
        border: Boolean,
        placeholder: String,
        hasBarcode: Boolean,
        iconAfter: {
            type: Boolean,
            default: () => false,
        },
        disabled: Boolean,
        tooltipMessage: String,
        hiddenTitle: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        inputan: Inputan,
        'camera-scanner': CameraScanner,
    },
    data() {
        return {
            value: this.valueData,
            debouncedInput: this.valueData,
            isVisible: false,
        }
    },
    computed: {
        listenHiddenTitle() {
            return this.hiddenTitle ? this.hiddenTitle : false
        },
        listenFormKey() {
            return this.formKey
        },
        listenMinValue() {
            return this.minValue
        },
        listenTypeInput() {
            return this.typeInput
        },
        isOnlyNumber() {
            return this.onlyNumber
        },
        isDisabled() {
            return this.typeInput.includes('disabled') || this.disabled
        },
        isHidden() {
            return this.typeInput.includes('hidden')
        },
        isPlaceholderGabung() {
            return this.placeholderGabung || false
        },
        isFocusToInput() {
            return this.focusToInput || false
        },
        listenTabIndex() {
            return this.tabindex
        },
        listenCurrencyMasking() {
            return this.currencyMasking
        },
        listenDataObj() {
            return this.dataObj || {}
        },
        withDebounce() {
            return this.isdebounce
        },
        isenter_to_update() {
            return this.enter_to_update
        },
        isBorder() {
            return this.border || false
        },
        listenPlaceholder() {
            return this.placeholder
        },
        listenIsPasswordValidation() {
            return this.typeInput?.includes('password-validation') || false
        },

        passwordRequirements() {
            const pwd = this.value || ''
            return [
                { text: 'At least 8 characters', valid: pwd.length >= 8 },
                { text: 'At least one uppercase letter (A-Z)', valid: /[A-Z]/.test(pwd) },
                { text: 'At least one lowercase letter (a-z)', valid: /[a-z]/.test(pwd) },
                { text: 'At least one number (0-9)', valid: /\d/.test(pwd) },
                {
                    text: 'At least one special character (!@#$%^&*)',
                    valid: /[^A-Za-z0-9]/.test(pwd),
                },
            ]
        },
        allRequirementsMet() {
            return this.passwordRequirements.every((r) => r.valid)
        },
        progressValue() {
            const validCount = this.passwordRequirements.filter((r) => r.valid).length
            return validCount === 5 ? 100 : validCount * 20
        },
        progressColor() {
            if (this.progressValue < 40) return '#ff4d4f'
            if (this.progressValue < 80) return '#faad14'
            return '#52c41a'
        },
    },
    watch: {
        valueData: function (val) {
            if (val !== undefined) {
                if (
                    this.listenTypeInput.includes('password') ||
                    this.listenTypeInput.includes('number') ||
                    this.listenTypeInput.includes('email')
                ) {
                    this.value = val
                } else {
                    this.value = val.toUpperCase()
                }
                this.updateValue()
            }
        },
    },
    methods: {
        toggleVisibility() {
            this.isVisible = !this.isVisible
            this.$emit('click-icon')
        },
        debounce(delay = 5000, cb) {
            var timeoutID = null
            return function () {
                clearTimeout(timeoutID)
                // var args = arguments
                // var that = this
                timeoutID = setTimeout(function () {
                    // fn.apply(that, args)
                    cb(delay)
                }, delay)
            }
        },
        handlerZero(val) {
            if (val) {
                if (val.match(/^0+\d/)) {
                    this.value = parseFloat(val)
                }
            }
        },
        onlyNumberValidate(evt) {
            let theEvent = evt || window.event

            // backspace	8
            // tab	9
            // enter	13
            // shift	16
            // delete	46
            // titik	190
            // left 37
            // right 39
            if (
                evt.keyCode != '9' &&
                evt.keyCode != '8' &&
                evt.keyCode != '190' &&
                evt.keyCode != '16' &&
                evt.keyCode != '37' &&
                evt.keyCode != '39'
            ) {
                let key = null
                // Handle paste
                // if (theEvent.type === 'paste') {
                //     key = event.clipboardData.getData('text/plain');
                // } else {
                // // Handle key press
                //     key = theEvent.keyCode || theEvent.which;
                //     key = String.fromCharCode(key);
                // }

                // Handle key press
                key = theEvent.keyCode || theEvent.which
                key = String.fromCharCode(key)
                let regex = /[0-9]|\./
                if (!regex.test(key)) {
                    theEvent.returnValue = false
                    if (theEvent.preventDefault) theEvent.preventDefault()
                }
            }
        },
        checkOnlyNumber(e) {
            if (
                (this.isOnlyNumber && !this.rules.includes('decimal')) ||
                this.rules?.includes('phone')
            ) {
                if (!/[0-9]/.test(e.key)) {
                    e.preventDefault()
                }
            }
        },
        lockPrefix(e) {
            if (this.rules?.includes('phone')) {
                // NOTES: PREFIX MUST BE 62 FOR PHONE NUMBER
                const prefix = '62'
                const input = e.target
                const pos = input.selectionStart
                const end = input.selectionEnd

                // block deleting or typing inside prefix
                if (
                    (e.key === 'Backspace' && pos <= prefix.length) ||
                    (e.key === 'Delete' && pos < prefix.length) ||
                    // typing while selection overlaps the prefix
                    (pos < prefix.length && end > 0 && e.key.length === 1)
                ) {
                    e.preventDefault()
                    this.$nextTick(() => {
                        input.setSelectionRange(prefix.length, prefix.length)
                    })
                }
            }
        },
        focus(status) {
            let info = {}
            info['name'] = this.name
            info['key'] = this.listenFormKey
            info['typeInput'] = this.listenTypeInput
            info['status'] = status
            info['placeholder'] = this.placeholder
            let self = this
            setTimeout(function () {
                self.$emit('inputFocus', info)
            }, 200)
        },
        updateValue(event) {
            // let prevdata = this.valueData != undefined && this.valueData != null ? this.valueData.toString() : ""
            // let currentValue = this.value.toString()

            if (event && typeof event === 'string') {
                if (this.listenFormKey.toLowerCase().includes('email')) {
                    this.value = event.replace(/[^a-zA-Z0-9@._\-+!#$%&'*\/=?^`{|}~]/g, '')
                } else if (this.listenFormKey.toLowerCase().includes('password')) {
                    this.value = event.replace(/[^\x20-\x7E]/g, '')
                } else {
                    if (this.isOnlyNumber) {
                        if (this.rules.includes('decimal')) {
                            this.value = event.replace(/[^0-9.]/g, '')
                        } else {
                            this.value = event.replace(/[^0-9]/g, '')
                        }

                        if (this.minValue && this.maxValue) {
                            let num = +event.replace(/\D/g, '')
                            if (!isNaN(num)) {
                                num = Math.max(
                                    this.minValue ?? num,
                                    Math.min(num, this.maxValue ?? num)
                                )
                                this.value = num
                            }
                        }
                    } else {
                        this.value = event.replace(/[^a-zA-Z0-9_\/-\s]/g, '')
                    }
                }
            }

            let info = {}
            info['name'] = this.name
            info['key'] = this.listenFormKey
            info['typeInput'] = this.listenTypeInput
            info['status'] = status

            // if(prevdata.toLowerCase() !== currentValue.toLowerCase()) {
            //   this.$emit("updateValue", this.listenFormKey, this.value, info, this.listenDataObj)
            // }
            this.$emit(
                'updateValue',
                this.listenFormKey,
                this.value,
                info,
                this.listenDataObj,
                this.listenIsPasswordValidation ? this.allRequirementsMet : null
            )
        },
        enterUpdate() {
            this.$emit('enterUpdate')
        },
        updateValueDebounced(val) {
            let timeoutID = null
            let self = this

            clearTimeout(timeoutID)
            // var args = arguments
            // var that = this
            timeoutID = setTimeout(function () {
                // fn.apply(that, args)
                self.updateValue()
            }, 1500)
        },
        onCameraScannerGetData(data) {
            if (
                !this.listenIsDisabled &&
                data?.event === 'result' &&
                data.namespace === this.listenFormKey
            ) {
                let dataValue =
                    this.listenIsMultiple == false && this.isMultipleTag === false
                        ? this.value
                        : this.arrValue
                let obj = this.DataArr.filter((item) => item.value == data.data.text)[0]

                // NOTES: Possible change, based on the qr data (current code expectation is: qr scanned value = id)
                this.$emit('updateValue', this.listenFormKey, data.data.text, obj, this.dataObj)
            }
        },
    },
}
</script>

<style scoped>
.progress-container {
    height: 6px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 8px;
}

.progress-bar {
    height: 100%;
    transition: width 0.3s ease, background-color 0.3s ease;
}

.requirements {
    list-style: none;
    padding: 0.3rem 0 0;
    margin: 0;
    font-size: 0.85rem;
}

.requirements li {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #777;
    transition: color 0.3s;
}

.requirements li.valid {
    color: #52c41a;
}
</style>

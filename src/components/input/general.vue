<template>
  <inputan :name="name" :rules="rules">
    <template v-slot:inputan="props">
      <template v-if="isHidden == false">
        <template v-if="isPlaceholderGabung">
          <!-- <vs-input
                        :class="`mt-input`"
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
            :type="
              listenTypeInput.includes('password') == true ? 'password' : 'text'
            "
            v-model="value"
            :min="listenMinValue"
            :disabled="isDisabled"
            :tabindex="listenTabIndex == -1 ? listenTabIndex : ''"
            @input="updateValue"
            @focus="focus(true)"
            @blur="focus(false)"
            ref="generalInput"
            :placeholder="name"
            :state="
              props.err !== undefined && props.err !== '' ? 'danger' : 'gray'
            "
            :data-testid="`input-${formKey}`"
          />
        </template>
        <template v-else-if="listenCurrencyMasking">
          <!-- v-currency -->
          <vs-input
            :class="`mt-input`"
            :type="'text'"
            :label="name"
            :label-placeholder="name"
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
            :state="
              props.err !== undefined && props.err !== '' ? 'danger' : 'gray'
            "
          />
        </template>
        <template v-else-if="listenTypeInput.includes('date') == true">
          <vs-input
            :class="`mt-input`"
            :type="listenTypeInput.includes('date') == true ? 'date' : 'text'"
            :label="name"
            :label-placeholder="name"
            v-model="value"
            format="yyyy-mm-dd HH:i"
            :disabled="isDisabled"
            :tabindex="listenTabIndex == -1 ? listenTabIndex : ''"
            @input="updateValue"
            @focus="focus(true)"
            @blur="focus(false)"
            ref="generalInput"
            :data-testid="`input-${formKey}`"
            :state="
              props.err !== undefined && props.err !== '' ? 'danger' : 'gray'
            "
          />
        </template>
        <template v-else-if="isOnlyNumber == true">
          <!-- .replace(/^0+/, '') -->
          <vs-input
            :class="`mt-input`"
            :type="
              listenTypeInput
                ? listenTypeInput.includes('password') == true
                  ? 'password'
                  : listenTypeInput
                : 'text'
            "
            :label="name"
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
            :min="listenMinValue"
            :data-testid="`input-${formKey}`"
            :state="
              props.err !== undefined && props.err !== '' ? 'danger' : 'gray'
            "
          />
        </template>
        <template v-else-if="withDebounce == true">
          <vs-input
            :class="`mt-input`"
            :type="
              listenTypeInput
                ? listenTypeInput.includes('password') == true
                  ? 'password'
                  : listenTypeInput
                : 'text'
            "
            :label="name"
            :label-placeholder="name"
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
            :state="
              props.err !== undefined && props.err !== '' ? 'danger' : 'gray'
            "
          />
        </template>
        <template v-else-if="isenter_to_update == true">
          <form @submit.prevent="enterUpdate">
            <vs-input
              :class="`mt-input`"
              :type="
                listenTypeInput
                  ? listenTypeInput.includes('password') == true
                    ? 'password'
                    : listenTypeInput
                  : 'text'
              "
              :label="name"
              :label-placeholder="name"
              v-model="value"
              :autofocus="isFocusToInput"
              :tabindex="listenTabIndex == -1 ? listenTabIndex : ''"
              :disabled="isDisabled"
              @focus="focus(true)"
              @blur="focus(false)"
              ref="generalInput"
              :min="listenMinValue"
              :data-testid="`input-${formKey}`"
              :state="
                props.err !== undefined && props.err !== '' ? 'danger' : 'gray'
              "
            />
          </form>
        </template>
        <template v-else>
          <vs-input
            :class="`mt-input`"
            :type="
              listenTypeInput
                ? listenTypeInput.includes('password') == true
                  ? 'password'
                  : listenTypeInput
                : 'text'
            "
            :label="name"
            :label-placeholder="name"
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
            :state="
              props.err !== undefined && props.err !== '' ? 'danger' : 'gray'
            "
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
import Inputan from "@/components/input/inputan";
export default {
  name: "input-general",
  props: {
    name: String,
    rules: String,
    valueData: [String, Number],
    formKey: String,
    typeInput: String,
    prefix: String,
    minValue: Number,
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
    iconAfter: {
      type: Boolean,
      default: () => false,
    },
    disabled: Boolean
  },
  components: {
    inputan: Inputan,
  },
  data() {
    return {
      value: this.valueData,
      debouncedInput: this.valueData,
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
    isOnlyNumber() {
      return this.onlyNumber;
    },
    isDisabled() {
      return this.typeInput.includes("disabled") || this.disabled;
    },
    isHidden() {
      return this.typeInput.includes("hidden");
    },
    isPlaceholderGabung() {
      return this.placeholderGabung || false;
    },
    isFocusToInput() {
      return this.focusToInput || false;
    },
    listenTabIndex() {
      return this.tabindex;
    },
    listenCurrencyMasking() {
      return this.currencyMasking;
    },
    listenDataObj() {
      return this.dataObj || {};
    },
    withDebounce() {
      return this.isdebounce;
    },
    isenter_to_update() {
      return this.enter_to_update;
    },
    isBorder() {
      return this.border || false;
    },
    listenPlaceholder() {
      return this.placeholder;
    },
  },
  watch: {
    valueData: function(val) {
      if (val !== undefined) {
        if (this.listenTypeInput.includes("password") || this.listenTypeInput.includes("number")) {
          this.value = val;
        }
        else {
          this.value = val.toUpperCase();
        }
        this.updateValue();
      }
    },
  },
  methods: {
    debounce(delay = 5000, cb) {
      var timeoutID = null;
      return function() {
        clearTimeout(timeoutID);
        // var args = arguments
        // var that = this
        timeoutID = setTimeout(function() {
          // fn.apply(that, args)
          cb(delay);
        }, delay);
      };
    },
    handlerZero(val) {
 
      if (val) {
        if (val.match(/^0+\d/)) {
          this.value = parseFloat(val);
        }
      }
    },
    onlyNumberValidate(evt) {
      let theEvent = evt || window.event;


      // backspace	8
      // tab	9
      // enter	13
      // shift	16
      // delete	46
      // titik	190
      // left 37
      // right 39
      if (
        evt.keyCode != "9" &&
        evt.keyCode != "8" &&
        evt.keyCode != "190" &&
        evt.keyCode != "16" &&
        evt.keyCode != "37" &&
        evt.keyCode != "39"
      ) {
        let key = null;
        // Handle paste
        // if (theEvent.type === 'paste') {
        //     key = event.clipboardData.getData('text/plain');
        // } else {
        // // Handle key press
        //     key = theEvent.keyCode || theEvent.which;
        //     key = String.fromCharCode(key);
        // }

        // Handle key press
        key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        let regex = /[0-9]|\./;
        if (!regex.test(key)) {
          theEvent.returnValue = false;
          if (theEvent.preventDefault) theEvent.preventDefault();
        }
      }
    },
    focus(status) {
      let info = {};
      info["name"] = this.name;
      info["key"] = this.listenFormKey;
      info["typeInput"] = this.listenTypeInput;
      info["status"] = status;
      info["placeholder"] = this.placeholder;
      let self = this;
      setTimeout(function() {
        self.$emit("inputFocus", info);
      }, 200);
    },
    updateValue(event) {
      // let prevdata = this.valueData != undefined && this.valueData != null ? this.valueData.toString() : ""
      // let currentValue = this.value.toString()

      if (event && typeof event === 'string') {
        if (this.listenFormKey.toLowerCase().includes('email')) {
          this.value = event.replace(/[^a-zA-Z0-9@._\-+!#$%&'*\/=?^`{|}~]/g, '');
        } else if (this.listenFormKey.toLowerCase().includes('password')) {
          this.value = event.replace(/[^\x20-\x7E]/g, '');
        } else {
          if (this.isOnlyNumber) {
            if (this.rules.includes('decimal')) {
              this.value = event.replace(/[^0-9.]/g, '');
            } else {
              this.value = event.replace(/[^0-9]/g, '');
            }
          } else {
            this.value = event.replace(/[^a-zA-Z0-9_\/-\s]/g, '');
          }
          
        }
      }

      let info = {};
      info["name"] = this.name;
      info["key"] = this.listenFormKey;
      info["typeInput"] = this.listenTypeInput;
      info["status"] = status;

      // if(prevdata.toLowerCase() !== currentValue.toLowerCase()) {
      //   this.$emit("updateValue", this.listenFormKey, this.value, info, this.listenDataObj)
      // }
      this.$emit(
        "updateValue",
        this.listenFormKey,
        this.value,
        info,
        this.listenDataObj
      );
    },
    enterUpdate() {
      this.updateValue();
    },
    updateValueDebounced(val) {
      let timeoutID = null;
      let self = this;

      clearTimeout(timeoutID);
      // var args = arguments
      // var that = this
      timeoutID = setTimeout(function() {
        // fn.apply(that, args)
        self.updateValue();
      }, 1500);
    },
  },
};
</script>

<template>
    <div class="text-area-style">
        <label class="text-area-label">{{ label }}</label>
        <textarea
            :id="id"
            v-model="inputValue"
            :rows="rows"
            :cols="cols"
            :placeholder="placeholder"
            class="text-area-input vs-input vs-input--control"
            :disabled="disabled"
            @input="handleInput"
        ></textarea>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      value: {
        type: String,
        default: ''
      },
      rows: {
        type: Number,
        default: 3
      },
      cols: {
        type: Number,
        default: 40
      },
      placeholder: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        inputValue: this.value
      };
    },
    watch: {
      value(newValue) {
        this.inputValue = newValue;
      },
      inputValue(newInputValue) {
        this.$emit('input', newInputValue);
      }
    },
    methods: {
      handleInput(event) {
        this.inputValue = event.target.value;
      }
    }
  };
  </script>
  
<style scoped>

.text-area-style {
    padding: 10px 0px;
}

.text-area-label {
  font-size: 0.8rem;
  transition: all 0.25s ease;
  cursor: text;
  user-select: none;
  pointer-events: none;
  display: flex;
  justify-content: flex-start;
  padding: 0px 0px 5px 10px;
}

.text-area-input {
    resize: none;
}

.vs-input {
    display: inline-block;
    width: 100%;
}

.vs-input--control {
    width: 100%;
    padding: 8px;
    border-radius: 8px;
    line-height: 1.5;
}

.vs-input--control:focus {
    outline: none;
}
</style>
  
<template>
  <inputan :name="name" :rules="rules">
    <template v-slot:inputan="props">
      <vs-select
          class="m-select search-by"
          filter
          :multiple="listenIsMultiple"
          :placeholder="name"
          :label="name"
          v-model="value"
          :border="border"
          @change="updateSearchBy"
          :data-testid="formKey ? `select-search-by-${formKey}` : 'select-search-by'"
          :state="props.err !== undefined && props.err !== '' ?'danger':'gray'"
      >
        <template v-if="DataArr.length > 0">
          <vs-option
              v-for="(item,key) in DataArr"
              :key="key"
              :label="item.label"
              :value="item.value">
            {{item.label}}
          </vs-option>
        </template>

      </vs-select>
    </template>
  </inputan>

</template>
<script>
import Inputan from "@/components/input/inputan"
export default {
  name:"search-by",
  components: {
    "inputan": Inputan
  },
  props: {
    name: String,
    rules: String,
    valueData: Array,
    // loadingData: Boolean,
    selectedValue: [Array, String, Number],
    formKey: String,
    isMultiple: Boolean,
    border: Boolean
  },
  data() {
    return {
      DataArr: this.valueData ? this.valueData : [],
      value: this.selectedValue ? this.selectedValue : "",
      arrValue: this.selectedValue ? this.selectedValue : [],
    }
  },
  computed: {
    listenFormKey(){
      return this.formKey || ''
    },
    listenIsMultiple(){
      return this.isMultiple ? this.isMultiple : false
    }
  },
  watch: {
    valueData: function (val) {
      if (val != undefined) {
        this.DataArr = val
      }
    },
    selectedValue: function (val) {
      if (val != undefined) {
        if(this.isMultiple == false) {
          this.value = val
        } else {
          this.arrValue = val
        }
      }
    },
  },
  methods: {
    updateSearchBy(val){
      const selectedOption = this.DataArr.find(item => item.value === val);
      const isNumeric = selectedOption?.isNumeric || false;
      this.$emit("updateSearchBy", `Search ${selectedOption.label}`, val, isNumeric)
    }
  },

}
</script>
<style lang="scss">
.m-select.search-by {
  &.vs-select-content{
    max-width: unset;
  }
  .vs-select__label--label{
    transform: translate(-3px, -28px) !important;
  }
  .vs-select.activeOptions .vs-select__input:focus ~ .vs-select__label--label {
    transform: translate(-3%, -28px) !important;
  }
}
</style>
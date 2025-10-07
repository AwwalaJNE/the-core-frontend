<template>
  <inputan :name="name" :rules="rules">
    <template v-slot:inputan="props">
      <vs-select
          class="m-select"
          filter
          :multiple="listenIsMultiple"
          :placeholder="name"
          :label="name"
          v-model="value"
          :border="border"
          @change="updateBagStatus"
          :state="props.err !== undefined && props.err !== '' ?'danger':'gray'"
          :data-testid="`select-bag_irreg`"
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
  name:"All-Irregularity-Bag",
  components: {
    "inputan": Inputan
  },
  props: {
    name: String,
    rules: String,
    valueData: Array,
    selectedValue: [Array, String, Number],
    formKey: String,
    isMultiple: Boolean,
    border: Boolean
  },
  data() {
    return {
      DataArr: this.valueData ? this.valueData : [
        {
          label: 'All Status Bag',
          value: '-'
        },
        {
          label: 'Irregularity Bag',
          value: '1'
        },
        {
          label: 'Non Irregularity Bag',
          value: '0'
        }
      ],
      value: this.selectedValue ? this.selectedValue :"-",
      arrValue: this.selectedValue ? this.selectedValue : [{
        label: 'All Status Bag',
        value: '-'
      }],
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
    updateBagStatus(val){
      this.$emit("updateBagIrreg", this.listenFormKey, val)
    }
  },

}
</script>
<style lang="scss">
.m-select{
  &.vs-select-content{
    max-width: unset;
    margin: 10px 0;
  }
  .vs-select__label--label{
    transform: translate(-3px, -28px) !important;
  }
  .vs-select.activeOptions .vs-select__input:focus ~ .vs-select__label--label {
    transform: translate(-3%, -28px) !important;
  }
}
</style>
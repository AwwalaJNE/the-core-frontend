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
          @change="updateSearchBy"
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
      DataArr: this.valueData ? this.valueData : [
        {
          label: 'Koli',
          value: 'connote'
        },
        {
          label: 'Bag',
          value: 'bag'
        },
        {
          label: 'Origin',
          value: 'origin'
        },
        {
          label: 'Destination',
          value: 'destination'
        },
        {
          label: 'Cost Weight',
          value: 'cost_weight',
          isNumeric: true
        },
        {
          label: 'Service',
          value: 'service'
        },
        {
          label: 'Amount COD',
          value: 'amount_cod',
          isNumeric: true
        }
      ],
      value: this.selectedValue ? this.selectedValue :"connote",
      arrValue: this.selectedValue ? this.selectedValue : [ {
        value: "connote",
        label: "Connote"
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
    updateSearchBy(val){
      const selectedItem = this.DataArr.find(item => item.value === val);
      const isNumeric = selectedItem ? (selectedItem?.isNumeric !== undefined ? selectedItem.isNumeric : false) : false;
      this.$emit("updateSearchBy", `Search ${val.charAt(0).toUpperCase() + val.slice(1)}`, val, isNumeric)
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
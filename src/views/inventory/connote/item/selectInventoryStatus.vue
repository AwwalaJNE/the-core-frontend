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
          @change="updateStatusinventory"
          :data-testid="`select-inventory-status-by`"
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
  name:"all-status",
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
          label: 'All Status',
          value: '-'
        },
        {
          label: 'Confirmed',
          value: '1'
        },
        {
          label: 'Unconfirmed',
          value: '0'
        }
      ],
      value: this.selectedValue ? this.selectedValue :"-",
      arrValue: this.selectedValue ? this.selectedValue : [ {
        value: "-",
        label: "All Status"
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
        // this.DataArr.length > 0 ? this.loading = false : this.loading = true
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
    updateStatusinventory(val){
      this.$emit("updateStatusinventory", this.listenFormKey, val)
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
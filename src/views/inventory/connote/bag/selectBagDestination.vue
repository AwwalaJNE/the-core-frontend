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
          @change="updateBagDestination"
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
import axios from "axios";
import master from "@/mixins/master"
import Inputan from "@/components/input/inputan"
export default {
  name:"All-Bag",
  mixins: [master],
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
          label: 'All Destination',
          value: '-'
        }
      ],
      value: this.selectedValue ? this.selectedValue :"-",
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
    updateBagDestination(val){
      this.$emit("updateBagDestination", this.listenFormKey, val)
    },
    async getDataDestination(){
      await axios
          .get(this.URL.node +
              `?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1`,
              this.Helper.header())
          .then(res => {
            if(res.data.data.length > 0) {
              let data = res.data.data
              data.map(item => {
                let obj = {}
                obj["label"] = item.node_code
                obj["value"] = item.node_code


                this.DataArr.push(obj)
              })
            } else {
              this.openNotification('warn', 'Permission data is empty!', ' Failed to populate permission data')
            }

          }).catch(err => {
            this.openNotification('danger', 'Failed to populate permission data', err)
          })
    },
  },
  mounted(){
    this.getDataDestination()
  }

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
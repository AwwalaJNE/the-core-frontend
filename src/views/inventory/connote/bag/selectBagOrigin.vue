<template>
  <inputan :name="name" :rules="rules">
    <template v-slot:inputan="props">
      <el-select
          class="m-select"
          :multiple="true"
          :label="name"
          :border="border"
          @change="updateBagOrigin"
          :state="props.err !== undefined && props.err !== '' ? 'danger' : 'gray'"
          v-model="value"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="Code Origin"
          :remote-method="getDataOrigin"
          :loading="loading"
      >
        <template v-if="DataArr.length > 0">
          <el-option
              v-for="item in options"
              :key="item.key"
              :label="item.label"
              :value="item.value"
          >
            {{ item.label }}
          </el-option>
        </template>

      </el-select>
    </template>
  </inputan>

</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import Inputan from "@/components/input/inputan"
export default {
  name:"All-Origin",
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
          label: 'All Origin',
          value: ''
        }
      ],
      value: this.selectedValue ? this.selectedValue :"-",
      arrValue: this.selectedValue ? this.selectedValue : [ {
        value: "-",
        label: "All Origin"
      }],
      loading: false,
      options:  this.valueData ? this.valueData : [
        {
          label: 'All Origin',
          value: ''
        }
      ],
      limit: 0,
      query: ''
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
        this.options = val
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
    updateBagOrigin(val){
      this.$emit("updateBagOrigin", this.listenFormKey, val)
    },
    async getDataOrigin(query = ""){
      if (query !== "scroll") {
        this.query = query
      }
      this.limit += 15
      await axios
          .get(this.URL.node_list +
              `?n=${this.listenNodeId}&s=${this.query}&limit=${this.limit}`,
              this.Helper.header())
          .then(res => {
            if(res.data.data.length > 0) {
              let arr = []
              let data = res.data.data
              data.map(item => {
                let obj = {}
                obj["label"] = item.node_name
                obj["value"] = item.node_id


                arr.push(obj)
              })
              this.DataArr = arr
              this.options = arr
            } else {
              // this.openNotification('warn', null, 'Permission data is empty!', ' Failed to populate permission data')
            }

          }).catch(err => {
            this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate permission data', err)
          })
    },
  },
  mounted() {
    this.getDataOrigin();

    const masonry = document.querySelector('.el-select-dropdown__wrap.el-scrollbar__wrap');
    masonry.addEventListener('scroll', e => {
      if (masonry.scrollHeight - (masonry.scrollTop + masonry.clientHeight) < 1) {
        this.getDataOrigin("scroll");
      }
    });
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
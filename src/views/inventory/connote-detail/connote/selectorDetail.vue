<template>
  <div class="box view">

    <vs-row>
      <vs-col align="left" xs="6" sm="9" lg="9"><h4>{{ infoTitle }}</h4></vs-col>
      <vs-col xs="6" sm="3" lg="3"><h5>CGK</h5></vs-col>
    </vs-row>
    <vs-row justify="space-between">
      <template v-if="DataArr.length > 0" v-for="datas in DataArr">
        <template v-if="datas.key !== undefined && datas.key === 'kodeasal' || datas.key === 'kodepos'">
          <vs-col align="left" xs="2" sm="6" lg="6">
            <ul class="pull-left-0">
              <li>
                <p align="left" class="detail-header">{{ datas.label }}</p>
                <span class="detail-sub-header">{{ datas.value.toUpperCase() }}</span>
              </li>
            </ul>
          </vs-col>
        </template>
        <template v-else>
          <vs-col align="left" xs="7" sm="7" lg="7">
            <ul class="pull-left-0">
              <li>
                <p align="left" class="detail-header">{{ datas.label }}</p>
                <span class="detail-sub-header">{{ datas.value.toUpperCase() }}</span>
              </li>
            </ul>
          </vs-col>
        </template>
      </template>
    </vs-row>
  </div>
</template>
<script>
import Inputan from "@/components/input/inputan"

export default {
  name: "All-Bag",
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
    border: Boolean,
    title: String
  },
  data() {
    return {
      infoTitle: this.title ? this.title : 'TITLE',
      DataArr: this.valueData ? this.valueData : [
        {
          label: 'Nama',
          value: 'Bagus Setiawan',
          key: ''
        },
        {
          label: 'Alamat',
          value: 'Jakarta Barat',
          key: ''
        },
        {
          label: 'Kode Pos',
          value: '67828',
          key: 'kodepos'
        },
        {
          label: 'Kode Asal',
          value: 'CGKH678',
          key: 'kodeasal'
        }

      ],
      value: this.selectedValue ? this.selectedValue : "-",
      arrValue: this.selectedValue ? this.selectedValue : [],
    }
  },
  computed: {
    listenFormKey() {
      return this.formKey || ''
    },

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
        if (this.isMultiple == false) {
          this.value = val
        } else {
          this.arrValue = val
        }
      }
    },
  },
  methods: {
    updateInfo(val) {
      this.$emit("updateInfo", this.listenFormKey, val)
    }
  },

}
</script>
<style lang="scss">
.pull-left-0 {
  padding-left: 0;
}

.detail-header {
  font-size: 12px;
  margin-bottom: 0px;
}

.detail-sub-header {
  font-size: 14px;
}
</style>
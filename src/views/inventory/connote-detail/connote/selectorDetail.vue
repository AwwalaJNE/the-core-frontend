<template>
  <div class="box view connote-info" style="padding-top: 0px; font-size:11px">

    <vs-row>
      <vs-col align="left" xs="6" sm="9" lg="9"><h2>{{ infoTitle }}</h2></vs-col>
      <vs-col xs="6" sm="3" lg="3"><h2>{{tlc}}</h2></vs-col>
    </vs-row>
    <vs-row justify="space-between">
        <template v-for="(item, index) in dataOrigin">
             <template v-if="item.width !== undefined && item.width === 6">
               <vs-col align="left" xs="2" sm="6" lg="6">
                <ul class="pull-left-0 connote-info">
                  <li>
                    <p align="left" class="detail-header">{{ item.key }}</p>
                    <span class="detail-sub-header">{{ item.value }}</span>
                  </li>
                </ul>
              </vs-col>
             </template>
             <template v-else-if="item.key !== undefined && item.key === 'Packing Kayu'">
               <vs-col align="left" xs="12" sm="12" lg="12" class="surcharge">
                <vs-row :key="i"
                          v-for="(tr, i) in item.value"
                          :data="tr">
                  <template v-if="tr.key === 'Total'">
                      <hr class="hr">
                     <vs-row>
                        <vs-col xs="11" sm="11" lg="9" class="surcharge line"><strong>{{tr.key}}</strong></vs-col>
                        <vs-col xs="1" sm="1" lg="3" class="surcharge"><strong>{{tr.value}}</strong></vs-col>
                       </vs-row>
                     
                  </template>
                  <template v-else>
                      <vs-col xs="11" sm="11" lg="9" class="surcharge">{{tr.key}}</vs-col>
                      <vs-col xs="1" sm="1" lg="3" class="surcharge">{{tr.value}}</vs-col>
                  </template>
                </vs-row>

              </vs-col>
             </template>
             <template v-else>
              <vs-col align="left" xs="7" sm="7" lg="7">
                <ul class="pull-left-0 connote-info">
                  <li>
                    <p align="left" class="detail-header">{{ item.key }}</p>
                    <span class="detail-sub-header">{{ item.value }}</span>
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
import master from "@/mixins/master"
export default {
  name: "All-Bag",
  components: {
    "inputan": Inputan
  },
  props: {
    tlc:String,
    valueData: [Object, Array],
    // loadingData: Boolean,
    selectedValue: [Array, String, Number],
    formKey: String,
    border: Boolean,
    title: String
  },
  data() {
    return {
      infoTitle: this.title ? this.title : 'TITLE',
      dataOrigin: this.valueData ? this.valueData :{},
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
        this.dataOrigin = val

        // this.dataOrigin.length > 0 ? this.loading = false : this.loading = true
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
.connote-info{
  margin-bottom: 0px;
}
.view > h4, h5{
  margin-top: 15px;
  margin-bottom: 10px;
}
.view > h5, h4{
  margin-top: 15px;
  margin-bottom:10px;
}
.surcharge{
  font-size: 13px;
  margin-top: 5px;
  margin-left: -2px;
}
.surcharge > strong{
  font-weight: bold;
}
.surcharge > hr{
    border: 1px solid black;
    width: 95%;
    margin: 0px;
}
.hr{
    border: 0,7px solid rgb(83, 83, 83);
    width: 95%;
    margin: 0px 0px 0px 2px;
}
</style>
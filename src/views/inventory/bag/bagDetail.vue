<template>
  <div>
    <vs-row justify="space-between">
      <vs-col xs="6" sm="4" lg="4">
        <div class="titlePage">
          <breadcrumb/>
          <h2>{{ title }}</h2>
        </div>
      </vs-col>
    </vs-row>
    <section class="bagging">
      <vs-row>
        <vs-col xs="12" sm="3" lg="3">
          <template>
            <div class="center in-get-bag">
              <vs-col lg="8">
                <vs-input border type="text"
                          v-model="item_code"
                          label-placeholder="Masukkan code BAG / Connote"
                          v-on:keyup.enter="updateItemOnBag"
                          ref="formInputBagging">

                </vs-input>
              </vs-col>
            </div>
          </template>
        </vs-col>

        <!--input update location -->
        <vs-col xs="12" sm="3" lg="3">
          <template>
            <div class="center in-get-bag">
              <vs-col lg="8">
                <vs-input border type="text"
                          v-model="location_id"
                          label-placeholder="select location"
                          @change="updateValue"
                          ref="formInputBagging">
                </vs-input>
              </vs-col>

            </div>
          </template>
        </vs-col>

        <!--input update weight -->
        <vs-col xs="12" sm="3" lg="3">
          <template>
            <div class="center in-get-bag">
             <vs-col lg="8">
               <vs-input border type="text"
                         v-model="weight"
                         label-placeholder="Weight"
                         @change="updateValue"
                         ref="formInputBagging" icon-after>
                 <template #icon>Kg</template>
               </vs-input>
             </vs-col>
            </div>
          </template>
        </vs-col>

        <vs-col xs="12" sm="3" lg="3" >
          <template>
            <div class="center in-get-bag" style="float: right; width: 100%">
              <vs-row>
                <vs-col lg="6" align="">
                  <vs-button>Print</vs-button>
                </vs-col>
                <vs-col lg="6" align="right">
                  <vs-button @click="$router.go(-1)">Back</vs-button>
                </vs-col>
              </vs-row>
            </div>
          </template>
        </vs-col>
      </vs-row>

      <div class="box view">
        <vs-row justify="space-between">
          <vs-col xs="12" sm="12" lg="12">
            <detailbagList ref="detailbagList"  :bagId="bag_id"/>
          </vs-col>
        </vs-row>

      </div>

    </section>

  </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import Breadcrumb from "@/components/breadcrumb/index"
import detailBagList from "@/views/inventory/bag/bagDetailList"


export default {
  name: "InventoryBaggingList",
  mixins: [master],
  components: {
    "breadcrumb": Breadcrumb,
    "detailbagList": detailBagList,
  },
  data() {
    return {
      title: "Bagging List",
      item_code:'',
      bag_id:'',
      weight:'',
      form:{},
      location_id:''
    }
  },
  methods: {
    getBagIdParam(){
      this.bag_id = this.$route.params.id
    },
    updateItemOnBag() {
      this.form.item_number = this.item_code
      this.ProccessAddBagItem()
    },
    updateValue(){

    },

    handleClearForm(){
      this.form = {}
      this.item_code=''
    },
    async ProccessAddBagItem(){
      await axios
          .post(this.URL.bag+'/'+this.bag_id+`/detail?n=1`, JSON.stringify(this.form), this.Helper.header())
          .then(res => {
            console.log('res',res)
            this.handleClearForm()
            this.openNotification('Success', 'Success', 'Add Bagging is success')
            this.$refs.detailbagList.refresh()
          }).catch(err => {
            console.log(err)
            this.loading = false
            this.handleClearForm()
            this.openNotification('danger', err.response ? err.response.data.message : 'something went wrong')
          })
    }

  },
  mounted() {
    this.getBagIdParam()
  }
}
</script>
<style lang="scss">
.bagging {
  min-height: 50vh;
  margin-top: 2em;
}

.in-get-bag {
  font-size: 16px;
}

.logo {

}

.box{
  margin-top: 20px !important;
}

</style>
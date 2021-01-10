<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
        </vs-row>
        <section class="bagging">
            <vs-row>
              <vs-col xs="12" sm="6" lg="2">
                <template>
                  <div class="center in-get-bag">
                    <vs-input border type="text"
                              v-model="item_code"
                              label-placeholder="Masukkan code BAG / Connote"
                              v-on:keyup.enter="updateValue"
                              :autofocus="true"
                              ref="formInputBagging">

                    </vs-input>
                  </div>
                </template>
              </vs-col>
            </vs-row>

            <vs-row justify="space-between" class="mt-2">
              <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
                <p>Bag Number: BAGXXXX</p>
                <p>Generate & Print</p>
                <template>
                  <img class="logo" :src="require('../../../assets/img/bagging-placeholder.png')" alt="jne" width="300" align="center">
                </template>
                <h3>Scan barcode untuk melakukan bagging</h3>
              </vs-col>
            </vs-row>
        </section>

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import Breadcrumb from "@/components/breadcrumb/index"


export default {
    name:"InventoryBagging",
    mixins: [master],
    components: {
        "breadcrumb": Breadcrumb,
    },
    data() {
        return {
            title: "Bagging",
            item_code:'',
            form:{}


        }
    },
    methods: {
      updateValue(){
        this.form.item_number = this.item_code
        this.ProccessBagging()
      },
      handleClearForm(){
        this.form = {}
        this.item_code=''
      },
      async ProccessBagging(){
        await axios
            .post(this.URL.bag+`?n=${this.listenNodeId}`, JSON.stringify(this.form), this.Helper.header())
            .then(res => {
              let bagNumber = res.data.data.bag_number;
              this.handleClearForm()
              this.openNotification(null, 'Success', 'Bagging is success')
              this.$router.push('/bagging-detail/'+bagNumber)
            }).catch(err => {
              this.loading = false
              this.handleClearForm()
              this.openNotification('danger', err.response ? err.response.data.message : 'something went wrong')
            })
      }
    }
}
</script>
<style lang="scss">
    .bagging{
        min-height: 50vh;
        margin-top: 2em;
    }

    .in-get-bag{
      font-size: 16px;
    }
    .logo{

    }
    .mt-2{
      margin-top: 20px;
    }

</style>
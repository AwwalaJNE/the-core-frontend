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
        <template>
          <div class="center in-get-bag">
            <vs-row style="margin-top:1em">
              <vs-col xs="12" sm="4" lg="2">
                <vs-radio
                  v-model="radio_option"
                  val="connote">
                  Connote (Orion)
                </vs-radio>
              </vs-col>
              <vs-col xs="12" sm="4" lg="2">
                <vs-radio
                  v-model="radio_option"
                  val="koli">
                  Koli
                </vs-radio>
              </vs-col>
            </vs-row>
          </div>
        </template>
        <section class="bagging">
            <vs-row>
              <vs-col xs="2" sm="2" lg="2">
                <template>
                  <div class="center in-get-bag">
                    <vs-input border type="text"
                              v-model="item_code"
                              :label-placeholder="inputLabelPlaceholder"
                              :autofocus="true"
                              @keyup.enter.native="updateValue"
                              ref="formInputUnbagging">

                    </vs-input>
                  </div>
                </template>
              </vs-col>
              <vs-col xs="1" sm="1" lg="1">
                <template>
                  <div class="center in-get-bag">
                    <vs-button
                        @click="updateValue"
                    >Submit</vs-button>
                  </div>
                </template>
              </vs-col>
            </vs-row>

            <vs-row justify="space-between" class=" mt-2">
              <unbagDetail ref="unbagDetail" :itemNumber="item_number" ></unbagDetail>
            </vs-row>
        </section>

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import Breadcrumb from "@/components/breadcrumb/index"
import unbagDetail from "@/views/inventory/unbag/unbagDetailList"


export default {
    name:"InventoryUnbagging",
    mixins: [master],
    components: {
        "breadcrumb": Breadcrumb,
        "unbagDetail":unbagDetail
    },
    data() {
        return {
            title: "Unbagging",
            item_code:'',
            item_number:'',
            form:{},
            inputLabelPlaceholder: "Masukan code BAG",
            radio_option: 'connote'

        }
    },
    methods: {
      updateValue(){
        this.form.item_number = this.item_code
        if(this.item_code !== null){
          if (this.inputLabelPlaceholder.includes("CONNOTE")) {
            this.item_number = this.item_code + "00"
          }
          else if (this.inputLabelPlaceholder.includes("KOLI")) {
            this.item_number = this.item_code
          }

          if (this.radio_option === "connote") {
            this.inputLabelPlaceholder = "Masukan code CONNOTE (ORION)"
          }
          else if (this.radio_option === "koli") {
            this.inputLabelPlaceholder = "Masukan code KOLI"
          }
        }
        this.$nextTick(() => {
          this.handleClearForm()
        });
      },

      handleClearForm(){
        this.form = {}
        this.item_code=''
      },
      
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
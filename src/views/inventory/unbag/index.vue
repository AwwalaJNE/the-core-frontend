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
              <vs-col xs="2" sm="2" lg="2">
                <template>
                  <div class="center in-get-bag">
                    <vs-input border type="text"
                              v-model="item_code"
                              label-placeholder="Masukkan code BAG / Connote"
                              :autofocus="true"
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
            form:{}


        }
    },
    methods: {
      updateValue(){
        this.form.item_number = this.item_code
        if(this.item_code !== null){
          this.item_number = this.item_code
        }
       
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
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
              
              <!--input destination -->
              <vs-col xs="12" sm="2" lg="2">
                <template>
                  <div class="center in-get-bag">
                   <vs-col lg="12">
                     <selector 
                     ref="destination"
                     name="Regional" 
                     rules="" 
                     placeholder="Select regional"
                     formKey="regional"
                     :valueData="regionalArray"
                     :selectedValue="regional"
                     
                     @updateValue="updateFilter" />
                   </vs-col>
                  </div>
                </template>
              </vs-col>
              
              <vs-col xs="12" sm="2" lg="2">
                <template>
                  <div class="center in-get-bag">
                   <vs-col lg="12">
                     <selector 
                     ref="service"
                     name="Service" 
                     rules="" 
                     placeholder="Select service"
                     formKey="service"
                     :valueData="serviceArray"
                     :selectedValue="service"
                     :isMultiple="true"
                     
                     @updateValue="updateFilter" />
                   </vs-col>
                  </div>
                </template>
              </vs-col>
              
              <vs-col xs="12" sm="2" lg="2">
                <template>
                  <div class="center in-get-bag">
                   <vs-col lg="12">
                     <selector 
                     ref="destination"
                     name="Destination" 
                     rules="" 
                     placeholder="Select destination"
                     formKey="destination"
                     :valueData="destinationArray"
                     :selectedValue="destination"
                     
                     @updateValue="updateFilter" />
                   </vs-col>
                  </div>
                </template>
              </vs-col>
              
              <vs-col xs="12" sm="2" lg="2">
                <template>
                  <div class="center in-get-bag">
                    <span class="c-label">Weight</span>
                    <vs-input border type="text"
                              v-model="weight"
                              placeholder="Weight"
                              v-on:keyup.enter="updateValue"
                              ref="formInputBagging" icon-after>
                      <template #icon>Kg</template>
                    </vs-input>
                  </div>
                </template>
              </vs-col>
              
              
            </vs-row>
            
            <vs-row style="margin-top:1em">
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
              
              <!--input service type -->
              
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
import Selector from "@/components/input/select"


export default {
    name:"InventoryBagging",
    mixins: [master],
    components: {
        "breadcrumb": Breadcrumb,
        "selector": Selector,
    },
    data() {
        return {
            title: "Bagging",
            item_code:'',
            form:{},
            loading: false,
            is_disabled: false,
            
            regional: "",
            regionalArray: [
              {
                "label":"Jabodetabek",
                "value":"Jabodetabek"
              },
              {
                "label":"Domestik",
                "value":"Domestik"
              }
            ],
            
            service: [],
            serviceArray: [
              {
                "label":"REG",
                "value":"reg"
              },
              {
                "label":"YES",
                "value":"yes"
              },
              {
                "label":"OKE",
                "value":"oke"
              },
              {
                "label":"JTR",
                "value":"jtr"
              }
            ],
            
            destinationArray: [
              {
                "label": null,
                "value": null
              },
            ],
            destination: "",
            weight: null,
            loading: false
            
        }
    },
    methods: {
      async getNodeLink() {
        this.loading = true
        
        await axios
            .get(this.URL.node +
                `/${this.listenNodeId}/destination-link?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&s=`,
                this.Helper.header())
            .then(res => {
                let arr = []
                res.data.data.map(item => {
                  let obj = {}
                  obj["label"] = item.node_name
                  obj["value"] = Number(item.node_id)
      
                  arr.push(obj)
                })
                this.destinationArray = arr
      
              this.loading = false
            }).catch(err => {
              this.loading = false
              this.openNotification('danger', 'Failed to populate node list', err)
            })
      },
      updateValue(){
        this.form={
            item_number: this.item_code,
            destination : this.regional,
            service: this.service
        }
        if(this.weight !== null) {
          this.form["bag_weight"] = parseInt(this.weight)
        }
        if(this.destination !== "") {
          this.form["destination_node_id"] = this.destination
        }
        this.ProccessBagging()
      },
      handleClearForm(){
        this.form = {}
        this.item_code=''
      },
      updateFilter(key, value) {
        console.log("regional", this.regional, key, value)
        
        switch(true) {
            case key.toLowerCase().includes("regional"):
                this.regional = value
                // this.$store.dispatch("SET_BAGGING_destination_selected", this.regional )
                break;
            case key.toLowerCase().includes("service"):
                this.service = value
                // this.$store.dispatch("SET_BAGGING_service_selected", this.service )
                break;
            case key.toLowerCase().includes('destination'):
                this.destination = value
                break;
            default:
        }
        
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
    },
    mounted() {
      this.getNodeLink()
      // this.$store.dispatch("SET_BAGGING_destination_dataArray", this.regionalArray )
      // this.$store.dispatch("SET_BAGGING_service_dataArray", this.serviceArray )
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
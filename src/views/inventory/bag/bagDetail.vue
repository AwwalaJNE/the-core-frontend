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
      <vs-row justify="space-between">
        <vs-col xs="12" sm="2" lg="2">
          <template>
            <div class="center in-get-bag">
              <vs-col lg="12">
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
      </vs-row>
      
      <vs-row style="margin-top:1em">
        
        <!--input destination -->
        <vs-col xs="12" sm="2" lg="2">
          <template>
            <div class="center in-get-bag">
             <vs-col lg="12">
               <selector 
               ref="destination"
               name="Regional" 
               rules="" 
               placeholder="Select Location"
               formKey="destination"
               :valueData="regionalArray"
               :selectedValue="regional"
               :isMultiple="true"
               :disabled="is_disabled"
               @updateValue="updateValue" />
             </vs-col>
            </div>
          </template>
        </vs-col>
        
        <!--input service type -->
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
               :disabled="is_disabled"
               @updateValue="updateValue" />
             </vs-col>
            </div>
          </template>
        </vs-col>
        
        <!--input update location -->
        <vs-col xs="12" sm="2" lg="2">
          <template v-if="loading == false">
            <div class="center in-get-bag">
              <vs-col lg="12">
                      <span class="c-label">Destination</span>
                      <vs-select
                          class="m-select"
                          filter
                          :multiple="false"
                          placeholder="Select Location"
                          v-model="selected_data_node"
                          :border="true"
                          disabled
                          autocomplete="off"
                          
                      >
                        <template>
                          
                            <vs-option
                                v-for="(item,key) in listenDataNOde"
                                :key="key"
                                :label="item.label"
                                :value="item.value">
                              {{item.label}}
                            </vs-option>
                          
                        </template>

                      </vs-select>

                    
              </vs-col>

            </div>
          </template>
        </vs-col>
        
        <!--input update weight -->
        <vs-col xs="12" sm="2" lg="2">
          <template>
            <div class="center in-get-bag">
             <vs-col lg="8">
               <span class="c-label">Weight</span>
               <vs-input border type="text"
                         v-model="weight"
                         placeholder="Weight"
                         v-on:keyup.enter="updateValue"
                         ref="formInputBagging" icon-after>
                 <template #icon>Kg</template>
               </vs-input>
             </vs-col>
            </div>
          </template>
        </vs-col>

        <vs-col xs="12" sm="3" lg="3" >
          <template>
            <vs-button @click="actionDetail">Print</vs-button>
            <!-- <div class="center in-get-bag">
              <vs-row>
                <vs-col lg="6" align="">
                </vs-col>
                <vs-col lg="6" align="right">
                  <vs-button @click="actionDetail">Print</vs-button>
                </vs-col>
              </vs-row>
            </div> -->
          </template>
        </vs-col>
      </vs-row>

      <div class="box view">
        <vs-row justify="space-between">
          <vs-col xs="12" sm="12" lg="12">
            <detailbagList ref="detailbagList"  :bagId="bag_id" @getResponse="getResponse"/>
          </vs-col>
        </vs-row>

      </div>
      <vs-col xs="12" sm="12" lg="12" align="right" style="padding:20px 5px;">
        <vs-button @click="$router.go(-1)">Back</vs-button>
      </vs-col>

    </section>

  </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import Breadcrumb from "@/components/breadcrumb/index"
import detailBagList from "@/views/inventory/bag/bagDetailList"
import Selector from "@/components/input/select"

export default {
  name: "InventoryBaggingList",
  mixins: [master],
  components: {
    "breadcrumb": Breadcrumb,
    "detailbagList": detailBagList,
    "selector": Selector,
  },
  data() {
    return {
      title: "Bagging Detail",
      item_code:'',
      bag_id:'',
      weight:'',
      form:{},
      location_id:'',
      selected_data_node: "",
      DataNode:[
        {
          "label": "All",
          "value": "all"
        }
      ],
      node_request:'',
      
      is_disabled: true,
      
      regional: "",
      regionalArray: [{
        "label":null,
        "value":null
      }],
      
      service: [],
      serviceArray: [{
        "label":null,
        "value":null
      }],
      
      loading: true
      
      
    }
  },
  computed: {
    listenDataNOde(){
      return this.DataNode
    },
    listenSelected_data_node() {
      return this.selected_data_node
    },
    listenServiceTypeArr() {
      return this.$store.getters["getInputs"]["bagging"]["service"]["dataArray"] || []
    },
    listenDestination() {
      return this.$store.getters["getInputs"]["bagging"]["destination"]["selected"] || []
    },
    listenDestinationArr() {
      return this.$store.getters["getInputs"]["bagging"]["destination"]["dataArray"] || []
    }
  },
  methods: {
    getResponse(data, loading) {
      
      console.log("dapet nih kedepan", data, loading)
      let arr = data.detail
      let bag_des = data.data.destination ? data.data.destination.node_code  : null
      
      
      // this.DataNode
      // this.selected_data_node
      if(bag_des != null) {
        let obj = {}
        obj["label"] = bag_des
        obj["value"] = bag_des
        this.DataNode.push(obj)
        
        this.selected_data_node = bag_des
      } else {
        this.selected_data_node = "all"
      }
      
      
      // this.regional
      // this.regionalArray
      
      // this.service
      // this.serviceArray
      this.loading = loading
    },
    getBagIdParam(){
      // console.log("listenDestination", this.listenDestination)
      this.bag_id = this.$route.params.id
      this.form={
          bag_number : this.bag_id,
          destination : this.listenDestination,
          service: this.listenServiceType
      }
    },
    updateItemOnBag() {
      this.form.item_number = this.item_code
      this.ProccessAddBagItem()
    },
    updateValue(){
      this.form={
          bag_number : this.bag_id,
          bag_weight : this.weight
      }
      this.loading = true
      this.putBag();
    },

    handleClearForm(){
      this.form = {}
      this.item_code='',
      this.weight =''
    },
    async ProccessAddBagItem(){
      await axios
          .post(this.URL.bag+'/'+this.bag_id+`/detail?n=${this.listenNodeId}`, JSON.stringify(this.form), this.Helper.header())
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
    },

    // async getNodeLink() {
    //   this.loading = true
    //   await axios
    //       .get(this.URL.node +
    //           `/${this.listenNodeId}/destination-link?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&s=`,
    //           this.Helper.header())
    //       .then(res => {
    //           res.data.data.map(item => {
    //             let obj = {}
    //             obj["label"] = item.node_name
    //             obj["value"] = Number(item.node_id)
    // 
    //             this.DataNode.push(obj)
    //           })
    // 
    // 
    //         this.loading = false
    //       }).catch(err => {
    //         this.loading = false
    //         this.openNotification('danger', 'Failed to populate node list', err)
    //       })
    // },
    // updateNode(){
    //   this.form={
    //       bag_number : this.bag_id,
    //       destination_node_id : this.node_request
    //   }
    //   this.loading = true
    //   this.putBag();
    // },
    async putBag(){
      await axios
          .put(this.URL.bag+'/'+this.bag_id+`?n=${this.listenNodeId}`, 
            JSON.stringify(this.form), 
            this.Helper.header())
          .then(res => {
            console.log('res',res)
            this.handleClearForm()
            this.loading = false
            this.openNotification('success', 'Update Bagging is success')
            this.$refs.detailbagList.refresh()
          }).catch(err => {
            console.log(err)
            this.loading = false
            this.handleClearForm()
            this.openNotification('danger', err.response ? err.response.data.message : 'something went wrong')
          })
    },
    actionDetail(){
        let routeData = this.$router.resolve({ 
            name: 'printGeneral', 
            params: { 
                'id': this.bag_id, 
                'type': 'bag',
                'node_id': this.listenNodeId,
            } 
        });
        window.open(routeData.href, '_blank');
    }
  },
  mounted() {
    this.getBagIdParam()
    // this.getNodeLink()
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
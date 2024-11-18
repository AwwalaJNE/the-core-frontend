<template>
  <div>
      <vs-row justify="space-between">
          <vs-col xs="6" sm="4" lg="4">
              <div class="titlePage">
                  <breadcrumb />
                  <h2>{{ listenTitle }}</h2>
              </div>
          </vs-col>
      </vs-row>
      <section class="bagging">
          <vs-row>            
            <vs-col xs="12" sm="3" lg="2">
              <selector 
                ref="bag_type"
                name="Bag Type" 
                rules="" 
                placeholder="Select bag type"
                formKey="bag_type"
                :loading="loading"
                :valueData="bagTypeArray"
                :selectedValue="bag_type"
                :isMultiple="false"
                :customBind="'data-kt-bag-type'"
                @updateValue="updateFilter" />
            </vs-col>
            <vs-col xs="12" sm="3" lg="2">
              <template>
                <div class="center in-get-bag">
                 <vs-col lg="12">
                   <selector 
                   ref="destination"
                   name="Routing" 
                   rules="" 
                   placeholder="Select routing"
                   formKey="regional"
                   :valueData="filteredRegionalArray"
                   :selectedValue="regional"
                   :disabled="listenDisabled"
                   :customBind="'data-kt-routing'"
                   @updateValue="updateFilter" />
                 </vs-col>
                </div>
              </template>
            </vs-col>
            <vs-col xs="12" sm="3" lg="3">
              <template  v-if="this.regional !== 'all_routing'">
                <div class="center in-get-bag">
                 <vs-col lg="12">
                   <selector 
                   ref="destination"
                   name="Destination" 
                   rules="" 
                   placeholder="Select destination"
                   formKey="destination"
                   :loading="loading"
                   :valueData="destinationArray"
                   :selectedValue="destination"
                   :disabled="listenDisabled"
                   :customBind="'data-kt-destination'"
                   @updateValue="updateFilter" />
                 </vs-col>
                </div>
              </template>
              <template v-else>
                <div class=" in-get-bag">
                 <vs-col lg="12">
                  <div class="title my-5 text-lg font-semibold text-gray-700" style="text-transform: lowercase; font-size: 14px; text-align: left;  padding-top: 10px;">Destination All</div>
                  <el-autocomplete
                    name="Destination"
                    v-model="searchTerm"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="Search Destination"
                    :disabled="listenDisabled"
                    @select="handleSelect"
                  >
                    <template v-slot="{ item }">
                        <div
                            v-bind:data-kt-destination="item.value"
                        >
                            {{ item.value }}
                        </div>
                    </template>
                  </el-autocomplete>
                 </vs-col>
                </div>
              </template>
            </vs-col>
            <vs-col xs="12" sm="3" lg="2">
              <template>
                <div class="center in-get-bag">
                 <vs-col lg="12">
                   <selector 
                   ref="service"
                   name="Service" 
                   rules="" 
                   placeholder="Select service"
                   formKey="service"
                   :loading="loading"
                   :valueData="filteredServiceArray"
                   :selectedValue="service"
                   :isMultiple="true"
                   :disabled="listenDisabled"
                   :customBind="'data-kt-service'"
                   @updateValue="updateFilter" />
                 </vs-col>
                </div>
              </template>
            </vs-col>
            <!-- <vs-col xs="6" sm="3" lg="2" class="mt-2">
              <vs-checkbox  v-model="is_auto_open_bag" @change="handleAutoOpenBag" v-if="!disable_auto_open_bag">
                Auto Open Bag
              </vs-checkbox>
            </vs-col> -->
          </vs-row>

          <vs-row style="margin-top:1em">
            <vs-col xs="12" sm="6" lg="2">
              <div class="center in-get-bag">
                <vs-input border type="text"
                  v-model="item_code"
                  :label-placeholder="placeholder"
                  v-on:keyup.enter="updateValue"
                  :autofocus="true"
                  ref="formInputBagging"
                  icon-after
                  v-uppercase
                  @click-icon="$refs.cameraScanner.open('formInputBagging')"
                  v-bind:data-kt="'scan_input'"
                  >
                  <template #icon>
                    <i class="bx bx-barcode-reader"></i>
                  </template>
                </vs-input>
              </div>
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
      <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />
  </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import Breadcrumb from "@/components/breadcrumb/index"
import Selector from "@/components/input/select"
import AutoComplete from "@/components/input/autoComplete"
import CameraScanner from "@/components/scanner/camera.vue";

export default {
  name:"InventoryBagging",
  mixins: [master],
  components: {
      "breadcrumb": Breadcrumb,
      "selector": Selector,
      "auto-complete": AutoComplete,
      CameraScanner,
  },
  watch: {
    regional(newRegional, oldRegional) {
      if (newRegional !== oldRegional) {
        this.getNodeLink()
        this.getNodeIntracity()
      }
    },
    radio_option(old, val) {
      if (old !== val) {
        this.setInputFocus();
      }
    },
    bag_type: function(val) {
      if (val !== undefined) {
        switch (val) {
          case "normal":
            this.title = 'Create Bag'
            this.placeholder = 'Masukkan Connote'
            this.is_disabled = false
            this.disable_auto_open_bag = false
            break;
          case "masterbag":
            this.title = 'Create Masterbag'
            this.placeholder = 'Masukkan Bag'
            this.is_disabled = false
            this.is_auto_open_bag = false
            this.disable_auto_open_bag = true
            break;
          case "pra runsheet":
            this.title = 'Create Bag Prarunsheet'
            this.placeholder = 'Masukkan Connote'
            this.is_disabled = true
            this.disable_auto_open_bag = false
            this.handlePraRunsheet()
            break;
          case "return":
            this.title = 'Create Bag Return'
            this.placeholder = 'Masukkan Connote Return'
            this.is_disabled = false
            this.disable_auto_open_bag = false
            break;
          case "pickup":
            this.title = 'Create Bag Pickup'
            this.placeholder = 'Masukkan Connote Pickup'
            this.is_disabled = false
            this.disable_auto_open_bag = false
            break;
          default:
        }
      }
    },
  },
  data() {
      return {
          title: 'Create Bag',
          item_code:'',
          item_code_orion:  '',
          form:{},
          loading: false,
          loadingData: false,
          is_disabled: false,
          radio_option: "connote",
          regional: "",
          regionalArray: [
            {
              "label":"All Routing",
              "value":"all_routing"
            },
            {
              "label":"Intracity",
              "value":"intracity"
            },
            {
              "label":"Intercity",
              "value":"intercity"
            },
            {
              "label":"Domestik",
              "value":"domestik"
            },
            {
              "label":"International",
              "value":"international"
            }
          ],
          service: "",
          serviceArray: [
            {
              "label":"REG",
              "value":"REG23"
            },
            {
              "label":"YES",
              "value":"YES23"
            },
            {
              "label":"OKE",
              "value":"OKE23"
            },
            {
              "label":"JTR",
              "value":"jTR"
            },
            {
              "label":"SPS",
              "value":"SPS23"
            },
            {
              "label":"JTR23",
              "value":"JTR23"
            },
            {
              "label":"JTR250",
              "value":"JTR250"
            },
            {
              "label":"JTR<150",
              "value":"JTR<150"
            },
            {
              "label":"JTR>250",
              "value":"JTR>250"
            },
            {
              "label":"@BOX3KG",
              "value":"@BOX3KG"
            },
            {
              "label":"@BOX5KG",
              "value":"@BOX5KG"
            },
            {
              "label":"CML",
              "value":"CML"
            },
            {
              "label":"CML_CTC",
              "value":"CML_CTC"
            },
            {
              "label":"CTC",
              "value":"CTC15"
            },
            {
              "label":"CTCJTR",
              "value":"CTCJTR23"
            },
            {
              "label":"CTCSPS",
              "value":"CTCSPS23"
            },
            {
              "label":"CTCTRC11",
              "value":"CTCTRC11"
            },
            {
              "label":"CTCTRC15",
              "value":"CTCTRC15"
            },
            {
              "label":"CTCYES",
              "value":"CTCYES23"
            },
            {
              "label":"DIP",
              "value":"DIP"
            },
            {
              "label":"INTL10",
              "value":"INTL10"
            },
            {
              "label":"INTL15",
              "value":"INTL15"
            },
            {
              "label":"INTL20",
              "value":"INTL20"
            },
            {
              "label":"P2P",
              "value":"P2P"
            },
            {
              "label":"PARCEL",
              "value":"PARCEL"
            },
            {
              "label":"QR-INST",
              "value":"QR-INST"
            },
            {
              "label":"QR-SMDKP",
              "value":"QR-SMDKP"
            },
            {
              "label":"QR-SMDY",
              "value":"QR-SMDY"
            },
            {
              "label":"TRC11",
              "value":"TRC11"
            },
            {
              "label":"TRC13",
              "value":"TRC13"
            },

          ],
          serviceArrayNew : [
            {
              "label":"All Service",
              "value":"ALL_SERVICE"
            },
          ],
          destinationArray: [
            {
              "label": "",
              "value": ""
            },
          ],
          destination: "",
          // weight: null,
          searchTerm: '',
          timeout: null,
          links: [],
          routing_type: '',
          bag_type: '',
          bagTypeArray: [
            {
              "label": "Regular Bag",
              "value": "normal"
            },
            {
              "label": "Masterbag",
              "value": "masterbag"
            },
            {
              "label": "Bag Pra Runsheet",
              "value": "pra runsheet"
            },
            {
              "label": "Bag Return",
              "value": "return"
            },
            {
              "label": "Bag Pickup",
              "value": "pickup"
            },
          ],
          placeholder: 'Masukkan Connote',
          is_auto_open_bag: true,
          disable_auto_open_bag: false,
      }
  },
  computed: {
    filteredRegionalArray() {
      // value 'All Routing' ditampilkan  berdasarkan permission role
      const permissions = this.$ls.get('permissions') || [];
      const isPermissions = permissions.includes('read-all-routing');
      return isPermissions ? this.regionalArray : this.regionalArray.filter(item => item.value !== 'all_routing');
    },
    filteredServiceArray() {
      // value 'All Service' ditampilkan  berdasarkan permission role
      const permissions = this.$ls.get('permissions') || [];
      const isPermissions = permissions.includes('read-all-service');
      return isPermissions ? this.serviceArrayNew : this.serviceArrayNew.filter(item => item.value !== 'ALL_SERVICE');
    },
    listenTitle() {
      return this.title
    },
    listenDisabled() {
      return this.is_disabled
    },
  },
  methods: {
    checkPermission(permission) {
      const permissions = this.$ls.get('permissions') || [];
      return permissions.includes(permission);
    },
    async getNodeLink() {
      if (this.regional !== 'intracity' && this.regional !== '') {
      this.loading = true

      if (this.regional == "all_routing") {
        this.routing_type = ""
      } else {
        this.routing_type = (this.regional).toUpperCase()
      }
      
      await axios
          .get(this.URL.node +
              `/${this.listenNodeId}/destination-link?n=${this.listenNodeId}&routing_type=${this.routing_type}&sort_order=desc&&limit=1000&page=1&s=`,
              this.Helper.header())
          .then(res => {
              let arr = []
              res.data.data.map(item => {
                let obj = {}
                obj["label"] = `${item.node_name} (${item.node_code})`
                obj["value"] = Number(item.node_id)
    
                arr.push(obj)
              })
              if (this.regional !== 'intracity' && this.regional !== '') {
                this.destinationArray = arr
              }
    
            this.loading = false
          }).catch(err => {
            this.loading = false
            this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate node list', err)
          })
    }
    },
    async getNodeIntracity() {
      if (this.regional === 'intracity') {
      this.loading = true
      await axios
          .get(this.URL.node +
              `/${this.listenNodeId}/destination-intracity?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&s=`,
              this.Helper.header())
          .then(res => {
              let arr = []
              res.data.data.map(item => {
                let obj = {}
                obj["label"] = `${item.node_name} (${item.node_code})`
                obj["value"] = Number(item.node_id)
    
                arr.push(obj)
              })
              if (this.regional === 'intracity') {
                this.destinationArray = arr
              }
    
            this.loading = false
          }).catch(err => {
            this.loading = false
            this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate node Intracity list', err)
          })
      }
    },
      async getService(){
        
      this.loading = true
        await axios
              .get(this.URL.service +
              `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
              this.Helper.header())
              .then(res => {
              let arr = []
                      res.data.data.map(item => {
                          let obj = {}
                          obj["label"] = item.service_code
                          obj["value"] = item.service_code

                          this.serviceArrayNew.push(obj)
                      })

                      this.loading = false
          }).catch(err => {
            this.loading = false
            this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate service list', err)
          })
      },
    handleAutoOpenBag(val) {
      this.is_auto_open_bag = val.target.checked;
    },
    handlePraRunsheet() {
      this.regional = ''
      this.service = ''
      this.destination = ''
    },
    updateRadio(){
      this.form={
          item_number: this.item_code,
          destination : this.regional,
          service: this.service,
      }
      // if(this.weight !== null) {
      //   this.form["bag_weight"] = parseInt(this.weight)
      // }
      if(this.destination !== "") {
        this.form["destination_node_id"] = this.destination
      }
      this.ProccessBagging()
    },
    updateValue(){

      this.form={
          item_number: this.item_code,
          destination : this.regional,
          service: this.service,
          type: this.bag_type,
          auto_open_bag: this.is_auto_open_bag
      }
      // if(this.weight !== null) {
      //   this.form["bag_weight"] = parseInt(this.weight)
      // }
      if(this.destination !== "") {
        this.form["destination_node_id"] = this.destination
      }
      this.ProccessBagging()
    },
    handleClearForm(){
      this.form = {}
      this.item_code=''
      this.item_code_orion = "";
    },
    updateFilter(key, value) {

      
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
          case key.toLowerCase().includes('bag_type'):
              this.bag_type = value
              break;
          default:
      }
      
    },
    async ProccessBagging(){
      await axios
          .post(this.URL.revamp_bag+`?n=${this.listenNodeId}`, JSON.stringify(this.form), this.Helper.header())
          .then(res => {
            let bagNumber = res.data.data.bag_number;
            this.handleClearForm()
            this.openNotification("success", null, 'Success', 'Bagging is success')

            this.$store.dispatch("SET_BAG_IS_AUTO_OPEN_BAG", this.is_auto_open_bag);
            this.$store.dispatch("SET_BAG_IS_AUTO_OPEN_BAG_ValueData", this.is_auto_open_bag);

            this.$router.push('/bagging-detail/'+bagNumber)
            this.setRoutePageHistory(this.$route.meta, false);
          }).catch(err => {
            this.loading = false
            this.handleClearForm()
            this.openNotification('danger', err?.response?.data?.code ?? '', "FAILED", err?.response?.data?.message ?? 'Something went wrong')
          })
    },
    querySearchAsync(queryString, cb) {
      const url = this.URL.node +
              `?n=${this.listenNodeId}&sort_order=desc&&limit=10&page=1&s=${queryString}`;

      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        axios.get(url, this.Helper.header())
          .then((response) => {
            const results = response.data.data;
            this.suggestions = results.map(item => ({
              value: `${item.node_name} (${item.node_code})`,
              node_id: item.node_id,
            }));
            cb(this.suggestions);
          })
          .catch((error) => { 
            console.error('Error fetching suggestions:', error);
          });
      }, 300); // Adjust the delay as needed
    },
    createFilter(queryString) {
      return (item) => {
        return item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    handleSelect(item) {
      this.destination = item.node_id;
    },
    onCameraScannerGetData(data) {
      if (
        // eslint-disable-next-line operator-linebreak
        data &&
        // eslint-disable-next-line operator-linebreak
        data.event === "result" &&
        data.namespace === "formInputBagging"
      ) {
        this.item_code = data.data.text;
        this.updateValue();
      }
    },
    setInputFocus() {
      this.$nextTick(() => {
        let inputElement = this.$refs.formInputBagging?.$el.querySelector('input');
        if (inputElement) {
          inputElement.focus();
        }
      });
    },
  },
  created() {
    this.$store.dispatch("SET_BAG_IS_AUTO_OPEN_BAG", false);
    this.$store.dispatch("SET_BAG_IS_AUTO_OPEN_BAG_ValueData", false);
  },
  mounted() {
    this.getNodeLink()
    this.getNodeIntracity()
    this.getService()
    this.setInputFocus();
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
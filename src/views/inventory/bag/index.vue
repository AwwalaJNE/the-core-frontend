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
            <!--input destination -->
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
                   :disabled="is_pra_runsheet"
                   
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
                   :disabled="is_pra_runsheet"
                   
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
                    @select="handleSelect"
                  />
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
                   :disabled="is_pra_runsheet"
                   
                   @updateValue="updateFilter" />
                 </vs-col>
                </div>
              </template>
            </vs-col>
            <vs-col xs="12" sm="3" lg="2" v-if="checkPermission('read-courier-pra-runsheet') && is_pra_runsheet">
              <template >
              <!-- <template> -->
                <div class="center in-get-bag">
                 <vs-col lg="12">
                   <selector 
                   ref="employee"
                   name="Courier Delivery" 
                   rules="" 
                   placeholder="Select Courier Delivery"
                   formKey="employee"
                   :valueData="employeeArray"
                   :selectedValue="employee"
                   
                   @updateValue="updateFilter" />
                 </vs-col>
                </div>
              </template>
            </vs-col>
            <vs-col xs="6" sm="3" lg="2" class="mt-2">
              <vs-checkbox  v-model="is_pra_runsheet" @change="handlePraRunsheet">
                Pra Runsheet
              </vs-checkbox>
            </vs-col>
            
            
            
            <!-- <vs-col xs="12" sm="2" lg="2">
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
            </vs-col> -->
            
            
          </vs-row>

          <template>
            <div class="center in-get-bag mb-2">
              <vs-row style="margin-top:1em">
                <vs-col xs="4" sm="3" lg="2">
                  <vs-radio
                    v-model="radio_option"
                    val="connote">
                    Connote (Orion)
                  </vs-radio>
                </vs-col>
                <vs-col xs="4" sm="3" lg="2">
                  <vs-radio
                    v-model="radio_option"
                    val="koli">
                    Koli
                  </vs-radio>
                </vs-col>
                <vs-col xs="4" sm="3" lg="2">
                  <vs-radio
                    v-model="radio_option"
                    val="bag">
                    Bag
                  </vs-radio>
                </vs-col>
              </vs-row>
            </div>
          </template>

          <vs-row style="margin-top:1em">
            <vs-col xs="12" sm="6" lg="2">
              <template>
                <div v-if="radio_option === 'connote'" class="center in-get-bag">
                  <vs-input border type="text"
                            v-model="item_code_orion"
                            label-placeholder="Masukkan Connote (Orion)"
                            :autofocus="true"
                            ref="formInputBagging"
                            icon-after
                            v-on:keyup.enter="updateValueOrion"
                            @click-icon="$refs.cameraScanner.open('formInputBagging')"
                            >
                            <template #icon>
                              <i class="bx bx-barcode-reader"></i>
                            </template>

                  </vs-input>
                </div>
                <div v-else class="center in-get-bag">
                  <vs-input border type="text"
                            v-model="item_code"
                            label-placeholder="Masukkan code Koli / Bag"
                            v-on:keyup.enter="updateValue"
                            :autofocus="true"
                            ref="formInputBagging"
                            icon-after
                            @click-icon="$refs.cameraScanner.open('formInputBagging')"
                            >
                            <template #icon>
                              <i class="bx bx-barcode-reader"></i>
                            </template>

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
      <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />
  </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import Breadcrumb from "@/components/breadcrumb/index"
import Selector from "@/components/input/select"
import FormInputController from "@/components/form/formInputController"
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
  },
  data() {
      return {
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
          employee: "",
          employeeArray: [],
          searchTerm: '',
          timeout: null,
          links: [],
          is_pra_runsheet: false,
          routing_type: '',
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
      if (this.is_pra_runsheet) {
        return "Create Bag Prarunsheet"
      }
      else {
        if (this.radio_option === "connote" || this.radio_option === "koli") {
          return "Create Bag"
        }
        else if (this.radio_option === "bag") {
          return "Create Masterbag"
        }
      }
    }
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
            this.openNotification('danger', 'Failed to populate node list', err)
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
            this.openNotification('danger', 'Failed to populate node Intracity list', err)
          })
      }
    },
    async getemployee(){
        await axios
              .get(this.URL.employee +
              `?n=${this.listenNodeId}&sort_order=desc&limit=1000&page=1`,
              this.Helper.header())
              .then(res => {
                      res.data.data.filter(item => item.employee_type_id == 5).map(item => {
                          let obj = {}
                          obj["label"] = item.employee_name + ' (' + item.employee_nik + ' ) '
                          obj["value"] = item.employee_id

                          this.employeeArray.push(obj)
                      })

              }).catch(err => {
                  this.loading = false
                  this.openNotification('danger', 'Failed to populate employee list', err)
              })
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
            this.openNotification('danger', 'Failed to populate service list', err)
          })
      },
    handlePraRunsheet(val) {
      if (val.target.checked) {
        this.regional = ''
        this.service = ''
        this.destination = ''
      }
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
      // jika user type inbound, kirim payload employee_id(kurir delivery) 
      if (this.listenActiveUser['user_role_id'] == 4){
        this.form["employee_id"] = this.employee
      }
      this.ProccessBagging()
    },
    updateValue(){

      this.form={
          item_number: this.item_code,
          destination : this.regional,
          service: this.service,
          is_pra_runsheet: this.is_pra_runsheet
      }
      // if(this.weight !== null) {
      //   this.form["bag_weight"] = parseInt(this.weight)
      // }
      if(this.destination !== "") {
        this.form["destination_node_id"] = this.destination
      }
      if (this.checkPermission('read-courier-pra-runsheet')){
        this.form["employee_id"] = this.employee
      }
      this.ProccessBagging()
    },
    updateValueOrion(){

      this.form={
          item_number: this.item_code_orion + "00",
          destination : this.regional,
          service: this.service,
          is_pra_runsheet: this.is_pra_runsheet
      }
      // if(this.weight !== null) {
      //   this.form["bag_weight"] = parseInt(this.weight)
      // }
      if(this.destination !== "") {
        this.form["destination_node_id"] = this.destination
      }
      if (this.checkPermission('read-courier-pra-runsheet')){
        this.form["employee_id"] = this.employee
      }
      this.ProccessBagging()
    },
    handleClearForm(){
      this.form = {}
      this.item_code=''
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
          case key.toLowerCase().includes('employee'):
              this.employee = value
              break;
          default:
      }
      
    },
    async ProccessBagging(){
      await axios
          .post(this.URL.bag+`?n=${this.listenNodeId}`, JSON.stringify(this.form), this.Helper.header())
          .then(res => {
            let bagNumber = res.data.data.bag_number;
            let is_pra_runsheet = res.data.data.is_pra_runsheet
            this.handleClearForm()
            this.$store.dispatch("SET_IS_PRA_RUNSHEET_ValueData", is_pra_runsheet)
            this.openNotification(null, 'Success', 'Bagging is success')
            this.$router.push('/bagging-detail/'+bagNumber)
          }).catch(err => {
            this.loading = false
            this.handleClearForm()
            this.openNotification('danger', err.response ? err.response.data.message : 'something went wrong')
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
              value: item.node_name,
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

        if (this.radio_option === "connote") {
          this.item_code_orion = this.item_code;
          this.updateValueOrion();
        } else {
          this.updateValue();
        }
      }
    },
  },
  mounted() {
    this.getNodeLink()
    this.getNodeIntracity()
    this.getemployee()
    this.getService()
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
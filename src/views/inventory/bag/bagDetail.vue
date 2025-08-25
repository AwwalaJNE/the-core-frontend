<template>
  <div>
    <vs-row justify="space-between" style="display: flex">
      <div class="titlePage">
        <breadcrumb/>
        <div style="display: flex; align-items: center;">
          <h2 style="margin-right: 10px;">{{ title }}</h2> 
          
          <vs-tooltip bottom v-if="!isAllowed && !loading">
            <i class="bx bx-info-circle"></i>
            <template #tooltip>
              {{ messageIsAllowed }}
            </template>
          </vs-tooltip>
        </div>
      </div>
      <div style="display: flex;" class="buttonPage" v-if="!loading">
        <vs-button v-if="listenUserRoleName !== 'HELPDESK'"  @click="openDialogTransit">
          <i class="bx bx-plus"></i> Add Transit
        </vs-button>
        <template v-if="listenUserRoleName === 'HELPDESK'">
          <vs-button
            @click="approveAction(true)"
            :disabled="!isAllowed"
            style="width: 6rem;"
            v-if="!disabledApprove"
          >
            <span>
              Approve
            </span>
          </vs-button>
          <vs-button
            @click="approveAction(false)"
            danger
            :disabled="!isAllowed"
            style="width: 6rem;"
            v-if="disabledApprove"
          >
            <span>
              Unapprove
            </span>
          </vs-button>
        </template>
        <template v-else>
          <vs-button
            @click="approveAction(true)"
            :disabled="disabledApprove"
            style="width: 6rem;"
          >
            <span>
              {{ disabledApprove ? "Approved" : "Approve" }}
            </span>
          </vs-button>
        </template>
        <vs-button v-if="listenUserRoleName !== 'HELPDESK'" style="width: 6rem;" @click="newBag">
          <i class="bx bx-plus"></i> New
        </vs-button>
        <vs-button v-if="listenUserRoleName !== 'HELPDESK' && is_approve" style="width: 6rem;" @click="print">Print</vs-button>
        <vs-button v-if="listenUserRoleName === 'HELPDESK'" style="width: 6rem;" @click="editBag">
          Edit
        </vs-button>
      </div>
    </vs-row>

    <template v-if="!disabledApprove && !loading && !is_masterbag">
      <div class="center in-get-bag">
        <vs-row class="mb-2 mt-2" align="center">
          <vs-checkbox v-model="is_auto_open_bag" @change="handleAutoOpenBag">
            Auto Open Bag
          </vs-checkbox>
          <!-- Validate hub delivery -->
           <!-- Enabled -->
          <vs-checkbox v-if="!disable_hub_delivery" style="margin-left: 20px;" v-model="is_hub_delivery_validation" @change="handleValidateHubDelivery">
            Validate Hub Delivery
          </vs-checkbox>

          <!-- Disabled -->
          <vs-checkbox v-if="disable_hub_delivery" style="margin-left: 20px;" v-model="is_hub_delivery_validation" @change="handleValidateHubDelivery" disabled>
            Validate Hub Delivery
          </vs-checkbox>

          <!-- COURIER -->
          <template v-if="is_pra_runsheet">
            <vs-col xs="12" sm="2" lg="2">
              <template>
                <div class="center in-get-bag">
                  <vs-col lg="12">
                    <selector 
                      ref="validation"
                      name="" 
                      rules="" 
                      placeholder="Select Validation"
                      formKey="validation"
                      :loading="loading"
                      :selectedValue="validation"
                      :disabled="true"
                      :customBind="'data-kt-routing'" 
                    />
                  </vs-col>
                </div>
              </template>
            </vs-col>
            <vs-col xs="12" sm="6" lg="6">
              <template>
                <div class="center in-get-bag">
                  <vs-col lg="12">
                    <asynchronousSelect 
                      ref="validation_reference"
                      name=""
                      rules="" 
                      formKey="validation_reference"
                      typeInput="multipleselector"
                      :selectedValue="validation_reference"
                      :disabled="true"
                    />
                  </vs-col>
                </div>
              </template>
            </vs-col>
          </template>
          
        </vs-row>
        <!-- <vs-row style="margin-top:2em">
          <vs-col xs="4" sm="4" lg="2">
            <vs-radio
              v-model="radio_option"
              val="connote">
              Connote (Orion)
            </vs-radio>
          </vs-col>
          <vs-col xs="4" sm="4" lg="2">
            <vs-radio
              v-model="radio_option"
              val="koli">
              Koli
            </vs-radio>
          </vs-col>
        </vs-row> -->
      </div>
    </template>

    <section class="bagging">
      <vs-row justify="space-between">
        <vs-col xs="12" sm="2" lg="2">
          <template v-if="!disabledApprove && !loading">
            <!-- <div v-if="radio_option === 'connote'" class="center in-get-bag">
              <vs-input 
                border 
                type="text" 
                v-model="item_code_orion" 
                label-placeholder="Masukkan Connote (Orion)"
                v-on:keyup.enter="updateItemOnBagOrion" 
                icon-after 
                :autofocus="true" 
                v-uppercase
                ref="formInputBaggingConnote"
                @click-icon="$refs.cameraScanner.open('formInputBaggingConnote')"
                v-bind:data-kt="'scan_input'"
              >
                <template #icon>
                  <i class="bx bx-barcode-reader"></i>
                </template>

              </vs-input>
            </div> -->
            <div v-if="radio_option === 'koli'" class="center in-get-bag">
              <vs-input 
                border 
                type="text" 
                v-model="item_code" 
                label-placeholder="Masukkan Koli/Connote"
                v-on:keyup.enter="updateItemOnBag" 
                icon-after 
                :autofocus="true" 
                v-uppercase
                ref="formInputBaggingKoli"
                @click-icon="$refs.cameraScanner.open('formInputBaggingKoli')"
                v-bind:data-kt="'scan_input'"
                @input="sanitizeAlphanumeric('item_code')"
              >
                <template #icon>
                  <i class="bx bx-barcode-reader"></i>
                </template>
              </vs-input>
            </div>
            <div v-if="radio_option === 'bag'" class="center in-get-bag">
              <vs-input 
                border 
                type="text" 
                v-model="item_code" 
                label-placeholder="Masukkan code Bag"
                v-on:keyup.enter="updateItemOnBag" 
                icon-after 
                :autofocus="true" 
                v-uppercase
                ref="formInputBaggingBag"
                @click-icon="$refs.cameraScanner.open('formInputBaggingBag')"
                v-bind:data-kt="'scan_input'"
                @input="sanitizeAlphanumeric('item_code')"
              >
                <template #icon>
                  <i class="bx bx-barcode-reader"></i>
                </template>
              </vs-input>
            </div>
          </template>
        </vs-col>
      </vs-row>
      
      <vs-row style="margin-top:1em" v-if="!is_pra_runsheet && !loading">
        
        <!--input destination -->
        <vs-col xs="6" sm="3" lg="2">
          <template>
            <div class="center in-get-bag">
             <vs-col lg="12">
               <selector 
               ref="destination"
               name="Routing" 
               rules="" 
               placeholder="Select Location"
               formKey="destination"
               :valueData="regionalArray"
               :selectedValue="regional"
               :disabled="true"
               @updateValue="updateValue" />
             </vs-col>
            </div>
          </template>
        </vs-col>
        <!--input update location -->
        <vs-col xs="6" sm="2" lg="2">
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
               :disabled="true"
               :collapseTags="false"
               @updateValue="updateValue" />
             </vs-col>
            </div>
          </template>
        </vs-col>
        
        
        <!--input update weight -->
        <vs-col xs="8" sm="3" lg="2">
          <template>
            <div class="center in-get-bag">
             <vs-col lg="8">
               <span class="c-label">Weight</span>
               <vs-input border type="text"
                         v-model="weight"
                         placeholder="Weight"
                         v-on:keyup.enter="updateValue"
                         ref="formInputBagging" icon-after
                         :disabled="(disabledApprove) && !loading"
                         >
                 <template #icon>Kg</template>
               </vs-input>
             </vs-col>
            </div>
          </template>
        </vs-col>
      </vs-row>

      <div class="box view">
        <vs-row justify="space-between">
          <vs-col xs="12" sm="12" lg="12">
            <detailbagList ref="detailbagList"  :bagId="bag_id" @getResponse="getResponse" />
          </vs-col>
        </vs-row>
      </div>
      
      <vs-col xs="12" sm="12" lg="12" align="right" style="padding:20px 5px;">
        <vs-button @click="back">Back</vs-button>
      </vs-col>

    </section>
    <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />
    <dialog-confirm
      title="Unapprove Bag"
      :message="`Are you sure you want to unapprove this bag?`"
      :active="activeDialogConfirmUnpproveBag"
      :loading="loadingConfirmUnpproveBag"
      :closeDialog="closeDialogConfirmUnpproveBag"
      @confirm="confirmUnpproveBag"
      @cancel="closeDialogConfirmUnpproveBag"
    />
    <dialog-helpdesk-edit-bag
      title="Edit Bag"
      :active="dialogHelpdeskEditBag"
      :bagNumber="bag_id"
      :closeDialog="closeDialog"
    />

    <dialog-create-edit-transit
      title="Add Transit Route"
      :active="dialogTransitActive"
      :bagNumber="bag_id"
      :closeDialog="closeDialogTransit"
    />
  </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import Breadcrumb from "@/components/breadcrumb/index"
import detailBagList from "@/views/inventory/bag/bagDetailList"
import Selector from "@/components/input/select"
import CameraScanner from "@/components/scanner/camera.vue";
import DialogConfirm from "@/components/dialog/dialogConfirm"
import DialogHelpdeskEditBag from "@/views/helpdesk/bag/dialogHelpdeskEditBag";
import DialogCreateEditTransit from "@/views/inventory/bag/transit/dialogCreateEdit.vue";

import asynchronousSelect from "@/components/input/asynchronousSelect"

export default {
  name: "InventoryBaggingList",
  mixins: [master],
  components: {
    "breadcrumb": Breadcrumb,
    "detailbagList": detailBagList,
    "selector": Selector,
    CameraScanner,
    "dialog-confirm": DialogConfirm,
    "dialog-helpdesk-edit-bag": DialogHelpdeskEditBag,
    "dialog-create-edit-transit": DialogCreateEditTransit,
    "asynchronousSelect": asynchronousSelect,
  },
  data() {
    return {
      radio_option: "koli",
      title: "Bagging Detail",
      item_code_orion: '',
      item_code:'',
      bag_id:'',
      weight:'',
      actual_weight:'',
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
        "label": "All",
        "value": "all"
      }],
      
      service: [],
      serviceArray: [{
        "label":"All",
        "value":"all"
      }],
      
      loading: true,
      isAllowed: true,
      messageIsAllowed: "",
      employee: "",
      is_pra_runsheet: false,
      is_orion: false,
      toggle_approve: {},
      disabledApprove: false,
      activeDialogConfirmUnpproveBag: false,
      loadingConfirmUnpproveBag: false,
      dialogHelpdeskEditBag: false,
      is_approve: false,
      is_actual_weight_mandatory: false,
      is_auto_open_bag: this.$store.getters.getInputs.bag_is_auto_open_bag.bag_is_auto_open_bag.value,
      is_hub_delivery_validation: this.$store.getters.getInputs.is_hub_delivery_validation.value,
      disable_hub_delivery: false,
      validation: '',
      validation_reference: [], 
      courierArr: [],
      dialogTransitActive: false,
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
    },
    listenDataBag(){
      return this.$ls.get('getDataBag')
    }
  },
  watch: {
    radio_option(old, val) {
      if (old !== val) {
        this.setInputFocus();
      }
    },
    loading(newValue) {
      if (!newValue) {
        this.setInputFocus();
      }
    }
  },
  methods: {
    refresh() {
      this.$refs.detailbagList.refresh()
    },
    handleAutoOpenBag(val) {
      this.is_auto_open_bag = val.target.checked;
    },
    handleValidateHubDelivery(val) {
      this.is_hub_delivery_validation = val.target.checked || false;
    },
    async getResponse(data, loading) {
      

      this.is_orion = data.data.is_orion === '1' ? true : false;
      let bag_des = data.data ? data?.data?.destination?.node_code  : null
      this.is_pra_runsheet = data.data.is_pra_runsheet === "1" ? true : false
      this.is_actual_weight_mandatory = data.data.is_actual_weight_mandatory === "0" ? false : true;

      this.is_masterbag = data.data.is_consolidated === "1" ? true : false
      if (data.data.is_consolidated === "1") {
        this.radio_option = "bag"
      }

      if (this.is_pra_runsheet || this.is_masterbag) {
        this.disable_hub_delivery = true
      }

      this.isAllowed = data.status.is_allowed
      this.messageIsAllowed = data.status.message
      
      
      // this.DataNode
      // this.selected_data_node
      if (bag_des != null) {
        this.DataNode = [{ label: bag_des, value: bag_des }];
        this.selected_data_node = bag_des;
      } else {
        this.DataNode = []
        this.selected_data_node = "all";
      }
      
      
      // this.regional
      // this.regionalArray
      let regional = data.validation ? data.validation : []
      if(regional.length > 0) {
        let obj = {}
        obj["label"] = regional[0].destination ? regional[0].destination : '-' 
        obj["value"] = regional[0].destination ? regional[0].destination : '-' 
        this.regionalArray.push(obj)
        
        this.regional = regional[0].destination ? regional[0].destination : '-' 
      } else {
        this.regional = "all"
      }
      
      // this.service
      // this.serviceArray
      let service = data.validation_service ? data.validation_service : []
      if(service.length > 0) {
        let arr = []
        service.map(item => {
          let obj = {}
          obj["label"] = item
          obj["value"] = item
          arr.push(obj)
        })
        this.serviceArray = [...this.serviceArray, ...arr]
        this.service = service
      } else {
        this.service = ["all"]
      }

      this.employee = data.employee_name ? data.employee_name : ""
      this.disabledApprove = data.data.is_approve === 0 ? false : true
      this.is_approve = data.data.is_approve === 0 ? false : true
      this.actual_weight = data.data.bag_actual_weight

      this.validation = data.data.validation;

      
      this.validation_reference = String(data.data.validation_reference || "").split(",");

      if (this.validation === 'COURIER') {
        await this.getDataCourier()
        this.validation_reference =  this.courierArr
          .filter(item => this.validation_reference.includes(String(item.value)))
          .map(item => item.label);
      }
      

      this.loading = loading
    },
    async getDataCourier() {
      this.loading = true;
      try {
        const res = await axios.get(`${this.URL.courier_delivery}/list?n=${this.listenNodeId}`, this.Helper.header());
        if (res.data.data.length > 0) {
          let arr = res.data.data;
          arr = arr.map(item => ({
            label: item.employee_name + ' ( ' + item.employee_code + ' ) ',
            value: item.employee_id,
          }));
          this.courierArr = arr
        } else {
          this.courierArr = [];
          this.openNotification('warn', null, 'Courier data is empty!', ' Please create a new courier delivery')
        }
      } catch (err) {
        this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
      } finally {
        this.loading = false;
      }
    },
    getIsPraRunsheet(){
      this.is_pra_runsheet = this.$store.getters.getInputs.is_pra_runsheet
      if (this.is_pra_runsheet == undefined) {
        this.is_pra_runsheet = this.listenDataBag.is_pra_runsheet
      }
    },
    getBagIdParam(){
      this.bag_id = this.$route.params.id
      this.form={
          bag_number : this.bag_id,
          destination : this.listenDestination,
          service: this.listenServiceType,
          is_pra_runsheet: this.is_pra_runsheet,
          auto_open_bag: this.is_auto_open_bag,
          is_hub_delivery_validation: this.is_hub_delivery_validation || false
      }
    },
    updateItemOnBag() {
      this.form.item_number = this.item_code.replace(/\s+/g, '');
      this.form.is_pra_runsheet = this.is_pra_runsheet
      this.form.auto_open_bag = this.is_auto_open_bag,
      this.form.is_hub_delivery_validation = this.is_hub_delivery_validation || false
      this.ProccessAddBagItem()
    },
    updateItemOnBagOrion() {
      this.form.item_number = (this.item_code_orion + "00").replace(/\s+/g, '');
      this.form.is_pra_runsheet = this.is_pra_runsheet
      this.form.auto_open_bag = this.is_auto_open_bag
      this.form.is_hub_delivery_validation = this.is_hub_delivery_validation || false
      this.ProccessAddBagItem()
    },
    updateValue(){
      if ((this.weight === '' || this.weight == 0) && this.is_actual_weight_mandatory) {
        this.openNotification('warning', null, 'Empty Weight!', 'Bag Actual Weight must not be 0!')
      }
      else {
        this.form={
            bag_number : this.bag_id,
            bag_actual_weight : this.weight
        }
        this.loading = true
        this.putBag();
      }
    },
    handleClearForm(){
      this.form = {}
      this.item_code='',
      this.item_code_orion = ''
      this.weight =''
    },
    async ProccessAddBagItem(){
      await axios
          .post(this.URL.bag+'/'+this.bag_id+`/detail?n=${this.listenNodeId}`,
              // JSON.stringify(this.form),
              this.form,
              this.Helper.header())
          .then(res => {
            this.handleClearForm()
            this.openNotification('success', null, 'Success', 'Add Bagging is success')
            this.refresh()
          }).catch(err => {
              this.loading = false;
              this.handleClearForm();

              const errorCode = err.response ? err.response.data.code : '';
              const errorMessage = err.response ? err.response.data.message : 'something went wrong';

              if (errorCode === 'CORE-1135') {
                  this.openNotificationCenter('danger', errorCode, "FAILED", errorMessage);
              } else {
                  this.openNotification('danger', errorCode, "FAILED", errorMessage);
              }
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
    //         this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate node list', err)
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
    async putBag(hideNotification){
      await axios
          .put(this.URL.bag+'/'+this.bag_id+`?n=${this.listenNodeId}`, 
            JSON.stringify(this.form), 
            this.Helper.header())
          .then(res => {

            this.handleClearForm()
            this.loading = false
            if (hideNotification === undefined) {
              this.openNotification('success', null, 'Update Bagging is success')
              this.refresh()
            }
          }).catch(err => {

            this.loading = false
            this.handleClearForm()
            this.openNotification('danger', err.response ? err.response.data.code : '', err.response ? err.response.data.message : 'something went wrong')
          })
    },
    print(){
        let routeData = this.$router.resolve({ 
            name: 'printGeneral', 
            params: { 
                'id': this.bag_id, 
                'type': 'bag',
                'node_id': this.listenNodeId,
            } 
        });
        
        const printWindow = window.open(routeData.href, '_blank', 'noopener');
      
        if (printWindow) {
            printWindow.onload = function() {
                printWindow.print();
                printWindow.onafterprint = () => printWindow.close();
            };
        }
    },
    back() {
      this.$router.push('/inventory/bag')
      this.setRoutePageHistory(this.$route.meta, false);
    },
    onCameraScannerGetData(data) {
      if (data && data.event === "result" && (data.namespace === "formInputBagging" || data.namespace === "formInputBaggingConnote" || data.namespace === "formInputBaggingKoli" || data.namespace === "formInputBaggingBag")) {
        this.item_code = data.data.text;
        if (this.radio_option === "connote") {
          this.item_code_orion = this.item_code;
          this.updateItemOnBagOrion();
        } else {
          this.updateItemOnBag();
        }
      }
    },
    newBag() {
      this.$router.push('/outgoing/bag')
      this.setRoutePageHistory(this.$route.meta, false);
      
    },
    openDialogTransit() {
      this.dialogTransitActive = true;
    },
    closeDialogTransit() {
      this.dialogTransitActive = false;
    },
    editBag() {
      this.dialogHelpdeskEditBag = true;
    },
    setInputFocus() {
      this.$nextTick(() => {
        let inputElement = null
        // if (this.radio_option === "connote") {
        //   inputElement = this.$refs.formInputBaggingConnote?.$el.querySelector('input');
        // }
        if (this.radio_option === "koli") {
          inputElement = this.$refs.formInputBaggingKoli?.$el.querySelector('input');
        }
        else if (this.radio_option === "bag") {
          inputElement = this.$refs.formInputBaggingBag?.$el.querySelector('input');
        }
        if (inputElement) {
          inputElement.focus();
        }

        if (inputElement) {
          inputElement.focus();
        }
      });
    },
    approveAction(val){
      if (this.isAllowed && !this.is_pra_runsheet && (this.actual_weight == 0 && this.is_actual_weight_mandatory)) {
        this.openNotification('warning', null, 'Empty Weight!', 'Bag Actual Weight must not be 0!')
      }
      else {
        this.updateApprove(val)
      }
    },
    updateApprove(val){
      this.toggle_approve = {
        is_approve: val ? 1 : 0
      };
      if (val) {
        this.confirmationApprove(val)
      } else {
        this.activeDialogConfirmUnpproveBag = true
      }
    },
    confirmUnpproveBag() {
      this.confirmationApprove(false)
      this.activeDialogConfirmUnpproveBag = false
      this.refresh()
    },
    closeDialog() {
      this.dialogHelpdeskEditBag = false;
      this.refresh();
    },
    closeDialogConfirmUnpproveBag(){
      this.activeDialogConfirmUnpproveBag = false
    }, 
    async confirmationApprove(val) {
      this.loadingConfirmUnpproveBag=true
      await axios
        .put(
          `${this.URL.approval}-bag/${this.bag_id}?n=${this.listenNodeId}`,
          JSON.stringify(this.toggle_approve),
          this.Helper.header()
        )
        .then((res) => {
          this.toggle_approve = {};
          this.disabledApprove = val;
          this.openNotification("success", null, "Success", res?.data?.message);
          this.refresh()
        })
        .catch((err) => {
          this.openNotification("danger", err?.response?.data?.code ?? '', "Approve FAILED!", err?.response?.data?.message ?? `Approve Bag ${this.bag_id} Failed`);
        });
        this.loadingConfirmUnpproveBag=false
    },
  },
  mounted() {
    this.getBagIdParam()
    this.getIsPraRunsheet()
    this.setInputFocus()
    this.handlePrintShortcut(this.print)
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

.box{
  margin-top: 20px !important;
}
</style>
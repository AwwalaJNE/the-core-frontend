<template>
    <div>
        <vs-row justify="space-between">
            <vs-col w="12">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>

        </vs-row>

        <section>
          <vs-row>
            <vs-col lg="6" sm="12" xs="12">
              <div class="box information scan-box">
                <h4 align="left">Scan Item</h4>
                <vs-row style="padding-bottom: 10px; padding: 0 20px;">
                  <vs-col xs="12" sm="12" lg="12" style="padding: 10px 0;">
                    <template>
                      <div class="center">
                        <form @submit.prevent>
                          <vs-input border type="text"
                                    v-model="sm_no"
                                    :disabled="isSmFilled"
                                    label-placeholder="Scan SM Here"
                                    autofocus
                                    icon-after
                                    v-uppercase
                                    ref="formInputParentSm"
                                    @keyup.enter.native="scanSm"
                                    @click-icon="$refs.cameraScanner.open('formInputParentSm')">
                            <template #icon>
                              <i class="bx bx-barcode-reader" v-if="!isSmFilled"></i>
                            </template>
                          </vs-input>
                          <template v-if="isSmFilled">
                              <div style="position:absolute;right:20px; top:15px;">
                                  <span class="vs-select__chips__chip__close" @click="removeSmNumber">
                                      <i class="vs-icon-close vs-icon-hover-less"></i>
                                  </span>
                              </div>
                          </template>
                        </form>
                      </div>
                    </template>
                  </vs-col>
                  <vs-col xs="12" sm="12" lg="12" style="padding: 10px 0;">
                    <template>
                      <div class="center">
                        <form @submit.prevent>
                          <vs-input border type="text"
                                    v-model="item_no"
                                    label-placeholder="Scan Bag Here"
                                    autofocus
                                    icon-after
                                    v-uppercase
                                    ref="formInputInbound"
                                    @keyup.enter.native="updateValue"
                                    @click-icon="$refs.cameraScanner.open('formInputInbound')">
                            <template #icon>
                              <i class="bx bx-barcode-reader"></i>
                            </template>
                          </vs-input>
                        </form>
                      </div>
                    </template>
                  </vs-col>
                  <vs-col xs="12" sm="12" lg="12" style="padding: 10px 0;">
                    <template>
                      <div class="center">
                        <form @submit.prevent>
                          <vs-input border type="text"
                                    v-model="item_no_remove"
                                    label-placeholder="Remove Bag Here"
                                    autofocus
                                    icon-after
                                    v-uppercase
                                    ref="formRemoveInbound"
                                    @keyup.enter.native="updateValueRemove"
                                    @click-icon="$refs.cameraScanner.open('formRemoveInbound')">
                            <template #icon>
                              <i class="bx bx-barcode-reader"></i>
                            </template>
                          </vs-input>
                        </form>
                      </div>
                    </template>
                  </vs-col>
                </vs-row>
              </div>
              <div class="box information" style="padding-top: 1px !important;margin-top: 10px !important;">
                <h4 align="left">Receiving Log</h4>
                <div class="nav-box">
                  <template>
                    <transition name="slide-fade">
                      <ReceivingLog 
                        ref="ReceivingLog" 
                        :dataTableProp="dataTableReceivingLog" 
                        :loading="loading" 
                        :pageSize="page_size" 
                        :page="page" 
                        :limit="limit" 
                        :actionLimit="actionLimit" 
                        :actionPagination="actionPagination"
                        @refresh="getTableDataReceivingLog"
                      />
                    </transition>
                  </template>
                </div>
              </div>
            </vs-col>

            <!-- col for detail unreceive item-->
            <vs-col lg="6" sm="12" xs="12">
              <div class="box information" style="padding-top: 0px;">
                <vs-row class="py-05">
                  <vs-col lg="8" sm="6" xs="6">
                    <h4 align="left">Scanned Items</h4>
                  </vs-col>
                  <vs-col lg="2" sm="3" xs="3">
                    <switchNih
                      name="Auto SJ|Manual" 
                      formKey="is_auto_sj"
                      :valueData="is_auto_sj"
                      @updateValue="updateValueSwitch"
                    />
                  </vs-col>
                  <vs-col lg="2" sm="3" xs="3">
                    <vs-button
                      @click="confirmInbound"
                      :disabled="listenEmpty"
                      style="margin: 0.5em;"
                    >
                      <span>
                        Confirm
                      </span>
                    </vs-button>
                  </vs-col>
                </vs-row>
                <div class="nav-box">
                  <template>
                    <transition name="slide-fade">
                      <InboundDetail 
                        ref="inboundDetail" 
                        :dataTable="dataTable" 
                        :loading="loading" 
                        :pageSize="page_size" 
                        :page="page" 
                        :limit="limit" 
                        :actionLimit="actionLimit" 
                        :actionPagination="actionPagination"
                        @actionRemove="actionRemove"
                      />
                    </transition>
                  </template>
                </div>
              </div>
              <div class="box information" style="padding-top: 1px !important;margin-top: 10px !important;">
                  <h4 align="left">Inbound Detail</h4>
                  <div class="nav-box">
                      <template>
                          <transition name="slide-fade">
                              <smDetail 
                                  ref="smDetail" 
                                  :dataTable="itemDataTableProp" 
                                  :loading="itemLoading" 
                                  :pageSize="page_size" 
                                  :page="page" 
                                  :limit="limit" 
                                  :actionLimit="actionLimit" 
                                  :actionPagination="actionPagination"
                              />
                          </transition>
                      </template>
                  </div>
              </div>
              <vs-button class="mt-1" style="float: right"
                 square
                 active
                 @click="back"
              >
                <i class="bx bxs-chevron-left"> </i>  BACK
              </vs-button>
            </vs-col>
          </vs-row>

        </section>
        <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" :handleSubmit="handleUpload" :handleUpload="handleUpload" />
        <floating-action-button v-if="isMobile" :customIcon="true" :icon="'bx bx-plus'" :handleClick="handleClickFAB" />
        <dialog-confirm
            title="Remove Receive Item"
            :message="`Are you sure you want to remove this?`"
            :active="activeDialogConfirmRemove"
            :loading="loadingConfirmRemove"
            :closeDialog="closeDialogConfirmRemove"
            @confirm="confirmRemove"
            @cancel="closeDialogConfirmRemove"
        />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import Switch from "@/components/input/switch"

import InboundDetail from "@/views/inboundAirport/scan/inboundDetail"
import InboundReceivingLog from "@/views/inbound/scan/inboundReceivingLog"
import smDetail from "@/views/inboundAirport/scan/smDetail"
import CameraScanner from "@/components/scanner/camera.vue";
import FloatingActionButton from "@/components/buttonCustom/floatingActionButton"
import DialogConfirm from "@/components/dialog/dialogConfirm"

export default {
    name:"inbound-airport-scan",
    mixins: [master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "InboundDetail": InboundDetail,
        "smDetail": smDetail,
        CameraScanner,
        "floating-action-button": FloatingActionButton,
        "dialog-confirm": DialogConfirm,
        "ReceivingLog": InboundReceivingLog,
        "switchNih": Switch
    },
    data() {
        return {
            title:"Airport Receiving",
            item_no:'',
            item_no_remove: '',
            sm_no: '',
            form:{},
            inbound_staging_id:'',
            loading: false,
            dataTable: [],
            dataTableReceivingLog: [],
            limit:20,
            page_size: 1,
            page: 1,
            progress: 0,
            activeDialogConfirmRemove: false,
            loadingConfirmRemove:false,
            isSmFilled: false,
            itemDataTable: [],
            itemDataTableProp: [],
            itemLoading: false,
            is_auto_sj: false,
            list_receiving_log: []
        }
    },
    computed: {
        listenEmpty(){
            return this.dataTable.length === 0
        },
    },
    methods: {
        refresh(){
          this.getTableData()
        },
        async getTableData() {
          this.loading = true
          await axios
            .get(
              this.URL.inbound_staging + `?n=${this.listenNodeId}`,
              this.Helper.header())
            .then(res => {
              this.dataTable = res.data.data
              this.page = res.data.meta.current_page
              this.limit = parseInt(res.data.meta.per_page)
              this.page_size = res.data.meta.last_page

              this.dataTable.forEach(item => {
                if (!this.list_receiving_log.some(list => list.item_number === item.item_number)) {
                  this.list_receiving_log.push({
                    item_number: item.item_number,
                    sm_no: ''
                  });
                }
              });
              
              this.loading = false
            }).catch(err => {
              this.loading = false
              this.openNotification('danger', err?.response?.data?.code ?? '', 'Failed to Get Inbound Staging', err?.response?.data?.message ?? err)
            })
        },
        updateValue(){
          this.item_no = this.item_no.replaceAll(/\s+/g, "");
          this.form.item_number = this.item_no
          this.processInbound();
          this.$refs.formInputInbound.$el.querySelector("input").focus();
          this.handlerClearForm()
        },
        updateValueSwitch(formKey, value) {
            this[formKey] = value
        },
        saveSmToStorage() {
            const smData = {
                sm_no: this.sm_no,
                form_sm_number: this.form.sm_number,
                isSmFilled: this.isSmFilled,
                itemDataTable: this.itemDataTable,
                itemDataTableProp: this.itemDataTableProp
            };
            localStorage.setItem('inboundAirportSmData', JSON.stringify(smData));
            
            if (!this.list_receiving_log.some(item => item.sm_no === this.sm_no)) {
              this.list_receiving_log.push({
                item_number: '',
                sm_no: this.sm_no,
              });
              this.getTableDataReceivingLog();
            }
        },

        async loadSmFromStorage() {
            const storedData = localStorage.getItem('inboundAirportSmData');
            if (storedData) {
                const smData = JSON.parse(storedData);
                this.sm_no = smData.sm_no;
                this.form.sm_number = smData.form_sm_number;
                this.isSmFilled = smData.isSmFilled;

                if (!this.list_receiving_log.some(item => item.sm_no === this.sm_no)) {
                  this.list_receiving_log.push({
                    item_number: '',
                    sm_no: this.sm_no,
                  });

                  this.getTableDataReceivingLog();
                }
                
                if (this.sm_no) {
                  await this.getSmDetails();
                }
            }
        },

        clearSmFromStorage() {
            localStorage.removeItem('inboundAirportSmData');
        },
        scanSm() {
            this.sm_no = this.sm_no.replaceAll(/\s+/g, "");
            this.form.sm_number = this.sm_no;
            this.isSmFilled = true;
            
            this.saveSmToStorage();
            this.getSmDetails();
        },
        removeSmNumber() {
            this.list_receiving_log = this.list_receiving_log.filter(item => item.sm_no !== this.sm_no);
            this.sm_no = '';
            this.form.sm_number = '';
            this.isSmFilled = false;
            this.itemDataTable = [];
            this.itemDataTableProp = [];
            this.dataTableReceivingLog = [];
            
            this.clearSmFromStorage();

            this.$nextTick(() => {
                this.$refs.formInputParentSm.$el.querySelector("input").focus();
            });
        },
         async getSmDetails() {
            if (this.sm_no) {
                this.itemLoading = true;
                try {
                    const res = await axios.get(
                        `${this.URL.inbound}/${this.sm_no}/inbound-status?n=${this.listenNodeId}&page=${this.page}&limit=${this.limit}`, 
                        this.Helper.header()
                    );

                    let arr = [res.data.data];

                    arr = arr.map(item => ({
                        ...item,
                        total_received: item.total_received.toString(),
                        total_unreceived: item.total_unreceived.toString()
                    }));

                    this.itemDataTable = arr;
                    let detail = res.data.detail
                    detail.map(item => {
                        if (item.is_masterbag === '1') {
                            item.item_type = 'MASTERBAG';
                        } else {
                            item.item_type = 'BAG';
                        }
                    })
                    this.itemDataTableProp = detail;

                    this.saveSmToStorage();

                    this.$nextTick(() => {
                        if (this.$refs.formInputInbound) {
                            this.$refs.formInputInbound.$el.querySelector("input").focus();
                        }
                    })
                } catch (err) {
                    this.openNotification(
                        "danger", 
                        err?.response?.data?.code ?? '', 
                        "Failed", 
                        err?.response?.data?.message ?? 'Something went wrong'
                    );
                } finally {
                    this.itemLoading = false;
                }
            }
        },
        async getTableDataReceivingLog() {
          this.loading = true;
          this.dataTableReceivingLog = [];

          try {
            const existingRecords = new Set(
              this.dataTableReceivingLog.map(item => JSON.stringify(item))
            );

            for (const { sm_no, item_number } of this.list_receiving_log) {
              if (!sm_no && !item_number) continue;

              const search_by = sm_no ? 'inbound_number' : 'item_number';
              const s = sm_no || item_number;

              const res = await axios.get(`${this.URL.receiving_log}?n=${this.listenNodeId}&page=${this.page}&limit=${this.limit}&search_by=${search_by}&s=${s}&pov=receiver`, this.Helper.header());

              res.data.data.forEach(newItem => {
                const serializedItem = JSON.stringify(newItem);

                if (!existingRecords.has(serializedItem)) {
                  newItem.button_status = { edit: (newItem.status == null || newItem.status == undefined || newItem.status == '') };
                  this.dataTableReceivingLog.push(newItem);
                  existingRecords.add(serializedItem);
                }
              });
            }
          } catch (err) {
            this.dataTableReceivingLog = [];
            // this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
          } finally {
            this.loading = false;
          }
        },
        updateValueRemove(){
          this.item_no_remove = this.item_no_remove.replaceAll(/\s+/g, "");
          this.removeData();
          this.$refs.formInputInbound.$el.querySelector("input").focus();
          this.handlerClearForm()
        },
        async processInbound() {
          this.openProgress(null, "Processing", `${this?.form?.item_no ?? 'Item' } is in process`);
          try {
              const res = await axios
                .post(this.URL.inbound_staging + `?n=${this.listenNodeId}`,
                JSON.stringify(this.form),
                this.Helper.header())
              this.openNotification('success', null, "Success", res?.data?.message ?? "Success Receive Item");
          } catch (err) {
              this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
          } finally {
              this.closeProgress();
              this.handlerClearForm();
              this.refresh();
          }
        },
        async confirmInbound() {
          this.openProgress(null, "Processing", `Confirming Inbound`);
          this.loading = true
          try {
              const res = await axios
                .post(this.URL.inbound_staging_confirm + `?n=${this.listenNodeId}`,
                {
                  is_auto_sj: this.is_auto_sj
                },
                this.Helper.header())
              this.getTableDataReceivingLog();
              this.openNotification('success', null, "Success", res?.data?.message ?? "Success Confirm Inbound");
          } catch (err) {
              this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
          } finally {
              this.loading = false
              this.is_auto_sj = false
              this.closeProgress();
              this.handlerClearForm();
              this.handleClearSm();
              this.refresh();
          }
        },
        async handleUpload(files) {
          const loading = this.$vs.loading({
              progress: 0
          })

          const interval = setInterval(() => {
              if (this.progress <= 100) {
              loading.changeProgress(this.progress++)
              }
          }, 40)

          const formData = new FormData();
            formData.append('files', files);

          await axios
                .post(this.URL.inbound_staging_bulk + `?n=${this.listenNodeId}`,
                    formData,
                    this.Helper.headerFormData()
                ).then(res => {
                    if(res.status == 201){
                        if (this.progress <= 100) {
                          loading.changeProgress(this.progress++)
                        }
                      this.openNotification('success', null, 'Success', res.data.message)
                      this.handleClear()
                    }
                }).catch(err => {
                  let message = err.response ? err.response.data.message : 'Upload Receiving failed'
                  this.openNotification('danger', err?.response?.data?.code ?? '', 'Fail', message)
                })
            
          setTimeout(() => {
              loading.close()
              clearInterval(interval)
              this.progress = 0
          }, 4100)
        },
        actionRemove(val){
          this.item_no_remove = val.item_number;
          this.activeDialogConfirmRemove = true
        },
        closeDialogConfirmRemove(){
            this.activeDialogConfirmRemove = false
            this.loadingConfirmRemove = false
        },
        confirmRemove() {
            this.loadingConfirmRemove = true
            this.removeData()
            this.handlerClearForm()
        },
        async removeData(){
            await axios
                .delete(
                    this.URL.inbound_staging + `/${this.item_no_remove}?n=${this.listenNodeId}`,
                    this.Helper.header())
                .then(res => {
                    this.list_receiving_log = this.list_receiving_log.filter(log => log.item_number !== res.data.reference);
                    this.closeDialogConfirmRemove()
                    this.loadingConfirmRemove = false
                    this.refresh()
                    this.openNotification("success", null, 'Success', 'Delete Receive Item is success')
                }).catch(err => {
                    this.loadingConfirmRemove = false
                    this.closeDialogConfirmRemove()
                    this.loading = false
                    this.openNotification('danger', err?.response?.data?.code ?? '', 'Delete Receive Item is failed', err?.response?.data?.message ?? '')
                })
        },
        back(){
          this.$router.push('/inbound-airport')
          this.setRoutePageHistory(this.$route.meta, false);
        },
        handlerClearForm(){
          this.item_no = ''
          this.item_no_remove = ''
        },
        handleClearSm() {
            this.list_receiving_log = this.list_receiving_log.filter(item => item.sm_no !== this.sm_no);
            this.sm_no = '';
            this.form.sm_number = '';
            this.itemDataTable = [];
            this.itemDataTableProp = [];
            this.isSmFilled = false;
            
            this.clearSmFromStorage();
            
            this.$refs.formInputParentSm.$el.querySelector("input").focus();
            this.handlerClearForm();
        },
        onCameraScannerGetData(data) {
          if (data && data.event === "result" && data.namespace === "formInputInbound") {
            this.item_no = data.data.text;
            this.updateValue();
          }
          else if (data && data.event === "result" && data.namespace === "formInputInbound") {
            this.item_no_remove = data.data.text;
            this.updateValueRemove();
          }
        },
        actionLimit(val){
            this.limit = val
            this.page = 1
            this.refresh()
        },
        actionPagination(val) {
            this.page = val
            this.refresh()
        },
        handleClickFAB() {
          this.$refs.cameraScanner.open('formInputInbound')
        },
        listenDisabled() {
          return this.disabledSwitch || false
        }
    },
    async mounted() {
      await this.loadSmFromStorage();
      this.refresh();
        
      if (!this.isSmFilled && this.$refs.formInputParentSm) {
          this.$refs.formInputParentSm.$el.querySelector("input").focus();
      }
    }
}
</script>
<style lang="scss">
  .mb-15{
   margin-bottom: 1.5em;
  }
  .custom-title{
    padding: 0.6em;
    text-align: right;
    font-weight: 600;
  }
  .information{
    min-height: 190px;
  }
</style>
<style scoped>
  .nav-box {
    margin-top: 0;
  }
  .scan-box {
    padding: 1em;
  }
</style>
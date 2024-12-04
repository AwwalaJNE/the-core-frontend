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
                <vs-row>
                  <vs-col xs="12" sm="12" lg="6" class="my-1">
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
                  <vs-col xs="12" sm="12" lg="6" class="my-1">
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
            </vs-col>

            <!-- col for detail unreceive item-->
            <vs-col lg="6" sm="12" xs="12">
              <div class="box information" style="padding-top: 0px;">
                <vs-row class="py-05" align="center">
                  <vs-col w="6">
                    <h4 align="left">Scanned Items</h4>
                  </vs-col>
                  <vs-col w="6" style="display: flex; align-items: center; justify-content: end;" >
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

import InboundDetail from "@/views/inboundAirport/scan/inboundDetail"
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
        CameraScanner,
        "floating-action-button": FloatingActionButton,
        "dialog-confirm": DialogConfirm,
    },
    data() {
        return {
            title:"Airport Receiving",
            item_no:'',
            item_no_remove: '',
            form:{},
            inbound_staging_id:'',
            loading: false,
            dataTable: [],
            limit:20,
            page_size: 1,
            page: 1,
            progress: 0,
            activeDialogConfirmRemove: false,
            loadingConfirmRemove:false,
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
          try {
              const res = await axios
                .post(this.URL.inbound_staging_confirm + `?n=${this.listenNodeId}`,
                null,
                this.Helper.header())
              this.openNotification('success', null, "Success", res?.data?.message ?? "Success Confirm Inbound");
          } catch (err) {
              this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
          } finally {
              this.closeProgress();
              this.handlerClearForm();
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
    },
    mounted() {
      this.refresh()
      this.$refs.formInputInbound.$el.querySelector("input").focus();
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
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
</style>
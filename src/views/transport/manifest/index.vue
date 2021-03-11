<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3">
                <div style="position:relative;display:flex;justify-content: flex-end;">
                    <div style="width: 100px;padding-right: 5px;">
                        <vs-button
                        flat
                        square
                        block
                        :active="true"
                        @click="openDialog"
                        > 
                            <i class="bx bx-plus"></i> New
                        </vs-button>
                    </div>
                </div>
            </vs-col>
        </vs-row>

        <section class="nodes">
            <div class="box view">
              <div class="nav-box">
                <vs-row justify="">
                  <vs-col xs="3" sm="3" lg="3">
                    <daterange-filter @searchDate="searchDate"/>
                  </vs-col>


                  <vs-col offset="6" xs="6" sm="3" lg="3" class="mb-15" align="right">
                    <search-input ref="searchInput" @searchValue="searchValue"/>
                  </vs-col>
                </vs-row>
              </div>
                <template>
                    <transition name="slide-fade">
                        <suratMuatantable :ref="'suratMuatantable'" :dateFilter="tempDate" :query="tempSearch"/>
                    </transition>
                </template>
            </div>
        </section>

        <!--Create surat muatan-->
        <SuratMuatanDialog
            :active="dialogSuratMuatan"
            @refresh="refresh"
            :closeDialog="closeDialogPickupList"
            title="Create Surat Muatan"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
import dateRange from "@/components/daterange/index"

import SuratMuatantable from "@/views/transport/manifest/manifest"
import SuratMuatanDialog from "@/views/transport/manifest/dialogCreateEditManifest"


export default {
    name:"transport-manifest",
    mixins:[master],
    components: {
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "daterange-filter": dateRange,
        "suratMuatantable": SuratMuatantable,
        "SuratMuatanDialog": SuratMuatanDialog,
    },
    data() {
        return {
            title:"Surat Muatan",
            tempSearch: "",
            tempDate: [],
            dialogSuratMuatan:false,
            DataNode:[],
            DataStatus:[{
              'label':'Confirm',
              'value':'Confirm'
            }],
            node_request:'',
            status_pickup:'',
        }
    },
    methods: {
        refresh(){
            this.$refs.suratMuatantable.refresh() // trigger function refresh form dari luar component list
        },
        searchValue (val) {
            this.tempSearch = val
        },
        searchDate (val) {
          this.tempDate = val
        },
        clearSearch() {
            this.$refs.searchInput.clear()
        },
        closeDialogPickupList() {
          this.dialogSuratMuatan = false
        },
        openDialog(){
            this.dialogSuratMuatan = true
        },
        updateNode(val){

        },
        async getTableData() {
          this.loading = true
          await axios
              .get(this.URL.node +
                  `?n=${this.listenNodeId}&sort_order=desc&&limit=1000&page=1&s=`,
                  this.Helper.header())
              .then(res => {
                console.log('link', res)
                if(res.data.data.length > 0) {
                  res.data.data.map(item => {
                    let obj = {}
                    obj["label"] = item.node_code
                    obj["value"] = item.node_code

                    this.DataNode.push(obj)
                  })
                }

                this.loading = false
              }).catch(err => {
                this.loading = false
                this.openNotification('danger', 'Failed to populate node list', err)
              })
        },
    },
  mounted() {
      this.getTableData()
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
  .m-select.vs-select-content{
    margin-top: 0px;
  }
</style>
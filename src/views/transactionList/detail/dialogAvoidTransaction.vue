<template>
  <dialog-master
      :actived="listenActive"
      :closeDialog="closeDialog">

    <template v-slot:header>
      {{listenTitle}}
    </template>

    <template v-slot:content>
      <vs-col xs="12" sm="12" lg="12"><span align="center">The reason you to void this transaction?</span></vs-col>
      <div  class="dialog-content-row">
          <vs-row class="dialog-content">
            <template v-if="voidList.length > 0">
              <vs-row v-for="(item,key) in voidList" :key="key">
                <vs-radio
                    style="margin-top:.5em"
                    v-model="selectedData"
                    :val="item.key"
                    :key="key">
                  {{item.label}}
                </vs-radio>
              </vs-row>
            </template>
          </vs-row>
        </div>
    </template>

    <template v-slot:footer>
      <vs-row justify="flex-end">
        <vs-col w="3">
          <vs-button
              transparent
              block
              danger
              flat
              :active="true"
              @click="cancel"
          >
            Cancel
          </vs-button>
        </vs-col>
        <vs-col w="3">
          <vs-button
              transparent
              block
              flat
              :active="true"
              type="submit"
              :loading="btnLoading"
              @click="handleSubmit"
          >
            Submit
          </vs-button>
        </vs-col>
      </vs-row>


    </template>

  </dialog-master>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import DialogMaster from "@/components/dialog/dialogMaster"
export default {
  name:"void-transactoin",
  mixins: [master],
  components: {
    "dialog-master": DialogMaster,
  },
  props: {
    closeDialog: Function,
    refresh: Function,
    active: Boolean,
    title: String,
    dataItem: Object,
    transactionId:String,
    connoteNumber:String
  },
  computed: {
    listenActive(){
      return this.active
    },
    listenTitle(){
      return this.title
    }
  },
  data() {
    return {
      tempTransactionId:'',
      tempConnoteNumber:'',
      selectedData:'',
      btnLoading:false,
      form:{},
      voidList:[
        {
          'label':'Ganti AWB Baru',
          'key':'Ganti AWB Baru'
        },
        {
          'label':'Batal Kirim',
          'key':'Batal Kirim'
        },
        {
          'label':'Tidak Lolos X-Ray',
          'key':'Tidak Lolos X-Ray'
        },
        {
          'label':'Salah Alamat',
          'key':'Salah Alamat'
        },
        {
          'label':'Salah Berat',
          'key':'Salah Berat'
        },
        {
          'label':'Salah Kilo',
          'key':'Salah Kilo'
        },

        {
          'label':'Salah Service',
          'key':'Salah Service'
        },
        {
          'label':'Salah Pengirim',
          'key':'Salah Pengirim'
        },
        {
          'label':'Salah Penerima',
          'key':'Salah Penerima'
        },
        {
          'label':'Salah Surcharge',
          'key':'Salah Surcharge'
        },
        {
          'label':'Salah Input Isi Kiriman',
          'key':'Salah Input Isi Kiriman'
        },
        {
          'label':'Salah Input Harga Asuransi',
          'key':'Salah Input Harga Asuransi'
        },
        {
          'label':'Double Transaksi / Input',
          'key':'Double Transaksi / Input'
        }
      ]
    }
  },
  watch: {
    connoteNumber: function (val) {
      if(val !== undefined) {
          if(this.tempConnoteNumber !== val){
            this.tempConnoteNumber = val
          }
      }
    }
  },
  methods: {
    handleSubmit(){
        this.btnLoading = true
        this.form = {
          'void':1,
          'void_reason':this.selectedData
        }
        console.log(this.form)
        this.updateData() // trigger function submit form dari luar component formMaster
    },

    async updateData(){
      await axios
          .post(
              this.URL.connote +'/'+this.connoteNumber+ `/void?n=${this.listenNodeId}`,
              JSON.stringify(this.form),
              this.Helper.header())
          .then(res => {
            this.closeDialog()
            this.btnLoading = false
            this.openNotification(null, 'Success', 'Update Connote is success')
          }).catch(err => {
            this.loading = false
            this.btnLoading = false
            this.closeDialog()
            this.openNotification('danger', 'Update Connote is failed', err)
          })
    },
    activeLoading(){
      return this.btnLoading
    },
    cancel() {
      this.btnLoading=false
      this.closeDialog()
    }
  },
}
</script>
<style lang="scss">
    .dialog-content{
      max-width: 20em;
      max-height: 15em;
      width: 20em;
    }
    .dialog-content-row{
      max-height: 15em;
      overflow: auto;
    }
</style>
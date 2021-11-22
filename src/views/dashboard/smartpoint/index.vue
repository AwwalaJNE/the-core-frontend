<template>
    <div>
      <vs-row justify>
        <vs-col xs="6" sm="4" lg="4">
          <div class="titlePage">
            <breadcrumb />
            <h2>{{title}}</h2>
          </div>
        </vs-col>
        <vs-col justify="flex-end" offset="4" xs="6" sm="4" lg="4" >
            <daterange-filter @searchDate="searchDate"/>
        </vs-col>
      </vs-row>
        <section class="bagging">
            <vs-row>
                <template>
                  <iframe id="dashboard_iframe" :src="this.url_dashboard" height="900" width="100%"></iframe>
                </template>
            </vs-row>
        </section>

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import Breadcrumb from "@/components/breadcrumb/index"
import dateRange from "@/components/daterange/index"
import moment from "moment";

export default {
    name:"DashboardSmartPoint",
    mixins: [master],
    components: {
        "breadcrumb": Breadcrumb,
      "daterange-filter": dateRange,
    },
    data() {
        return {
            title: "Dashboard SmartPoint",
            item_code:'',
            item_number:'',
            form:{},
            loaded: false,
            tempSearch: "",
            tempDate: [
                moment(this.resetDateTime(new Date())).format("YYYY-MM-DDTHH:mm:ss"),
                moment(this.defaultDateTime(new Date())).format("YYYY-MM-DDTHH:mm:ss")
            ],
            url_dashboard :""

        }
    },
    methods: {
      searchDate (val) {
        this.tempDate = val

        let startDate = moment(this.tempDate[0]).format("YYYY-MM-DDTHH:mm:ss")
        let endDate = moment(this.defaultDateTime(this.tempDate[1])).format("YYYY-MM-DDTHH:mm:ss")
        this.updateUrl(startDate, endDate);
      },
      updateUrl(startDate, endDate){
        this.url_dashboard = "https://kibananoauth.jne.app/app/kibana#/dashboard/3d9ff930-468d-11ec-82a4-67317a14521b?embed=true&_g=(refreshInterval:(pause:!t,value:0),time:(from:'"+startDate+"Z',to:'"+endDate+"Z'))"
      },
      updateValue(){
        this.form.item_number = this.item_code
        if(this.item_code !== null){
          this.item_number = this.item_code
        }
        this.$nextTick(() => {
          this.handleClearForm()
        });
      },

      handleClearForm(){
        this.form = {}
        this.item_code=''
      },
      
    },
    created() {
      this.updateUrl(this.tempDate[0], this.tempDate[1]);
    }
}
</script>
<style lang="scss">


    .in-get-bag{
      font-size: 16px;
    }
    .logo{

    }
    .mt-2{
      margin-top: 20px;
    }
    .mr-10{
      margin-right: 30px;
    }
    iframe{
      border: none;
    }

</style>
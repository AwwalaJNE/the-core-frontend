<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                </div>
            </vs-col>
        </vs-row>
        <section class="bagging">
            <vs-row>
                <template>

                  <iframe src="http://149.129.235.228:5601/app/kibana#/dashboard/3d9ff930-468d-11ec-82a4-67317a14521b?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-30d%2Cto%3Anow))" height="1000" width="100%"></iframe>
                </template>
            </vs-row>
        </section>

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import Breadcrumb from "@/components/breadcrumb/index"


export default {
    name:"DashboardSmartPoint",
    mixins: [master],
    components: {
        "breadcrumb": Breadcrumb
    },
    data() {
        return {
            title: "Dashboard SmartPoint",
            item_code:'',
            item_number:'',
            form:{},
            loaded: false,


        }
    },
    methods: {
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
    iframe{
      border: none;
    }

</style>
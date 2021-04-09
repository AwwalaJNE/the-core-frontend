<template>
    <div class="print-general">
        <template v-if="err !== ''">
            <vs-row justify="center" class="mt-2">
                  <vs-col xs="12" sm="12" lg="12">
                    <vs-card @click="$router.go(-1)" class="mt-2" style="display:flex;justify-content:center">
                        <template #title>
                            <div style="position:relative;margin-bottom:1em">
                                <h2 style="padding-top:.6em">Invalid Print</h2>
                                <div style="position:absolute;left:0; top:0">
                                    <vs-button
                                        circle
                                        icon
                                        dark
                                        flat
                                        :active="true"
                                    >
                                        <i class='bx bx-arrow-back'></i>
                                    </vs-button>
                                </div>
                            </div>
                        </template>
                        <!-- <template #img>
                        <img src="/foto5.png" alt="">
                        </template> -->
                        <template #text>
                            <div style="text-align:left">
                                <hr>
                                <p>Something went wrong</p>
                                <p>
                                    Reason: {{err}}
                                </p>
                                <br>
                            </div>
                        </template>
                    </vs-card>
                      

                  </vs-col>
            </vs-row>
        </template>
        <iframe id="iframe"></iframe>
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
export default {
    name:"print-general",
    mixins: [master],
    data() {
        return {
            html: '',
            loading: false,
            val: '',
            type: '',
            err: '',
            node_id: ''
        }
    },
    methods: {
        getParamRoute(){
          if(this.$route.params.id && this.$route.params.type){
            this.val = this.$route.params.id
            this.type = this.$route.params.type
            this.node_id = this.$route.params.node_id
            console.log(this.$route.params.node_id,'node')
            this.getDataPrint()
          }
        },
        async getDataPrint() {
			let self = this
            this.loading = true
			await axios
                .get(this.URL.print + 
                `/${this.val}/${this.type}?n=${this.node_id}`,
                this.Helper.header())
                .then(res => {
					console.log('getDataPrint', res.data)
                    this.html = res.data.html 

                    let iframe = document.getElementById('iframe')
                    iframe.contentWindow.document.write(this.html);
                    
                    
                    this.loading = false
                }).then(() => { setTimeout(function(){ window.print(); }, 1000); }).catch(err => {
                    this.loading = false
                    this.err = err.response.data.message || 'Invalid'
                    // this.loading = false
                    // this.checkAuth(err.response)
					// this.openNotification('danger', 'Print koli failed', err.response ? err.response.data.message : 'something went wrong')
                    // this.openNotification('danger', 'Failed to populate country list', err)
                })
		}
    },
    mounted() {
        this.getParamRoute()
    },
}
</script>
<style lang="scss">
    .print-general{
        iframe{
            border: 0;
            position: relative;
            width: 100%;
            height: 100%;
            min-height: 100vh;
            display: block;
        }
    }
</style>
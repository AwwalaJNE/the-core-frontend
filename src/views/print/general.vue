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
        <!-- <iframe id="iframe"></iframe> -->
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
            node_id: '',
            employee_id:'',
            dom: null
        }
    },
    methods: {
        getParamRoute(){
          if(this.$route.params.id && this.$route.params.type){
            this.val = this.$route.params.id
            this.type = this.$route.params.type
            this.node_id = this.$route.params.node_id
            this.employee_id = this.$route.params.employee_id
            this.getDataPrint()
          }
        },
        async getDataPrint() {
          let url_print = null;
          if(this.type =='delivery'){
            url_print = this.URL.print +
                `/${this.val}/${this.employee_id}/${this.type}?n=${this.node_id}`
          }else{
            url_print= this.URL.print +
            `/${this.val}/${this.type}?n=${this.node_id}`
          }
    			let self = this
                this.loading = true
    			await axios
                    .get(url_print,
                    this.Helper.header())
                    .then(res => {
                        this.html = res.data.html 

                        // let iframe = document.getElementById('iframe')
                        // iframe.contentWindow.document.write(this.html);
                        
                        var printIFrame = document.createElement('iframe');
                        document.body.appendChild(printIFrame);
                        printIFrame.style.position = 'absolute';
                        printIFrame.style.top = 0;
                        printIFrame.style.left = 0;
                        printIFrame.style.marginTop = 0;
                        printIFrame.style.marginBottom = 0;
                        printIFrame.style.border = 0;
                        printIFrame.style.height = '100%';
                        printIFrame.style.width = '100%';
                        printIFrame.style.overflow = 'auto';
                        
                        // let test = printIFrame.getElementsByClassName("sheet");
                        // let doc = test.contentDocument;
                        // doc.style.background = '#f00';
                        // printIFrame.getElementsByClassName('sheet').style.background = '#f00';
                        
                        var frameWindow = printIFrame.contentWindow || printIFrame.contentDocument || printIFrame;
                        var wdoc = frameWindow.document || frameWindow.contentDocument || frameWindow;
                        wdoc.write(this.html);
                        wdoc.close();
                        frameWindow.focus();
                        
                        // this.addKeyHandler()
                        
                        this.dom = frameWindow
                        this.dom.addEventListener("keydown", this.keyHandler);
                        try {
                            // Fix for IE11 - printng the whole page instead of the iframe content
                            // if (!frameWindow.document.execCommand('print', false, null)) {
                            //     // document.execCommand returns false if it failed -http://stackoverflow.com/a/21336448/937891
                            // 
                            //     setTimeout(function(){ frameWindow.print(); }, 5000);
                            // }
                            // focus body as it is losing focus in iPad and content not getting printed
                            document.body.focus();
                            setTimeout(function(){ frameWindow.print(); }, 3000);
                            
                        }
                        catch (e) {
                            
                            // setTimeout(function(){ frameWindow.print(); }, 1000);
                        }
                        // frameWindow.close();
                        // setTimeout(function() {
                        //     printIFrame.parentElement.removeChild(printIFrame);
                        // }, 3000); 
                        
                        
                        this.loading = false
                    }).then(() => { 
                      // setTimeout(function(){ window.print(); }, 1000);
                    }).catch(err => {
                        this.loading = false
                        this.err = err.response.data.message || 'Invalid'
                        // this.loading = false
                        // this.checkAuth(err.response)
    					          // this.openNotification('danger', 'Print koli failed', err.response ? err.response.data.message : 'something went wrong')
                        // this.openNotification('danger', 'Failed to populate country list', err)
                    })
    		},
        // addKeyHandler() {
        //   if(this.dom !== null) {
        //     this.dom.addEventListener("keydown", this.keyHandler);
        //   }
        // },
        keyHandler(e) {
          // 17 - ctrl
          // 80 - p
          const key = e.which || e.keyCode;
          if(e.ctrlKey && key === 17 && key === 80) {
            this.dom.print();
          }
          // if(key === 17)
        },
        removeKeyHandler() {
          if(this.dom !== null) {
            this.dom.removeEventListener("keydown", this.keyHandler);
          }
        }
    },
    mounted() {
        
        this.getParamRoute()
    },
    destroyed() {
        this.removeKeyHandler();
    }
}
</script>
<style lang="scss">
    .print-general{
        // iframe{
        //     border: 0;
        //     position: static;
        //     width: 100%;
        //     height: 100%;
        //     min-height: 100vh;
        //     overflow: auto;
        //     display: block;
        //     // -webkit-transform:scale(0.5)
        // }
    }
</style>
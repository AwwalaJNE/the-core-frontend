<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>Kurs</h2>
                </div>
            </vs-col>
            <!-- <vs-col xs="6" sm="3" lg="3">
                <div style="position:relative;display:flex;justify-content: flex-end;">
                    <div style="width: 100px;padding-right: 5px;">
                        <vs-button
                        flat
                        block
                        :active="true"
                        @click="openDialog"
                        > 
                            <i class="bx bx-plus"></i> New
                        </vs-button>
                    </div>
                </div>
            </vs-col> -->
        </vs-row>
        <vs-row justify="space-between">
            
            <vs-col xs="12" sm="12" lg="12">
                <div class="box">
                    <vs-row justify="flex-start">
                        <vs-col xs="6" sm="6" lg="6" class="">
                            <vs-input  label="Kurs Sebelumnya"  color="#7d33ff" border type="text" disabled v-model="kurs_usd" placeholder="Kurs Sebelumnya">
                                <template #icon>
                                $1 = 
                                </template>
                            </vs-input>
                        </vs-col>
                        
                    </vs-row>
                    <vs-row justify="flex-start">
                        <vs-col xs="6" sm="6" lg="6" class="mt-50 ">
                             <vs-input dark   label="Kurs Terbaru"  ref="kursUsd" border type="text" v-model="kurs_usd_new" >
                                <template #icon>
                                Rp
                                </template>
                            </vs-input>
                        </vs-col>
                    </vs-row>
                </div>
                <vs-row>
                    <vs-col offset="11" lg="1" sm="1" xs="1"   style="margin-top:5px">
                        <vs-button
                            block
                            active
                            square
                            @click="updateValue"
                        >
                            Save
                        </vs-button>
                    </vs-col>
                </vs-row>
            </vs-col>
        </vs-row>
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import Breadcrumb from "@/components/breadcrumb/index"

export default {
    name: "cashless",
    mixins: [master],
    components: {
        "breadcrumb": Breadcrumb,
    },
    data() {
        return {
            kurs_usd : '',
            kurs_usd_new:'', 
            form: {},
            ObjData: {},
            inputCode: ''
        }
    },
    methods : {

        async getConfig() {
            this.loading = true
            await axios
                .get(this.URL.config + 
                `/kurs_usd?n=${this.listenNodeId}`, 
                this.Helper.header())
                .then(res => {
                    if(Object.keys(res.data.data).length > 0) {
                        this.kurs_usd = this.moneyformat(res.data.data.value)
                       

                    } else {
                        // this.openNotification('warn', null, 'node config is empty!', ' Please create a new config')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate config list', err)
                })
        },
        updateValue(){
            this.form.value = this.kurs_usd_new
            this.UpdateConfig()
        },
        async UpdateConfig() {
            this.loading = true
            await axios
                .put(this.URL.config + 
                `/kurs_usd?n=${this.listenNodeId}`, 
                JSON.stringify(this.form),
                this.Helper.header())
                .then(res => {
                    if(Object.keys(res.data.data).length > 0) {
                         this.kurs_usd_new = ''
                        this.kurs_usd = this.moneyformat(res.data.data.value)
                        this.getConfig()
                       
                        this.openNotification('success', null, 'config is update!', ' Thanks')
                    } else {
                        // this.openNotification('warn', null, 'config is empty!', ' Please create a new config')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate config list', err)
                })
        },
       
    },
    mounted() {
        this.getConfig()
    },
    
}
</script>
<style lang="scss">
    .kurs{
        border-bottom: 1px dotted rgb(0, 0, 0);
    }
    .mt-50{
        margin-top:50px;
    }
    .box  .vs-input__label {
        left: 4px;
    }
</style>
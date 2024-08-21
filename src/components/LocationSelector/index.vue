<template>
    <div>
        <template v-if="isShow == true">
            <transition name="slide-fade">
                <div> 
                    <table class="tariff_selector">
                        <thead>
                            <tr>
                                <th>Place</th>
                                <th>Zip</th>
                                <th>Tariff Code</th>
                            </tr>
                        </thead>

                        <tbody>
                            
                            <with-keyboard-control ref="keyboardControll" :listLength="arrData.length" @selected="selectedHandler">
                                <template v-slot:listcontent="props">
                                    <template v-if="arrData.length > 0">
                                        <template v-for="(item, key) in arrData">
                                            <tr class="lin" :class="{'selected': key === props.selectedIndex}" :key="key" @click="clickdulu(item)">
                                                <td style="width: 50%;">
                                                   <!-- <small>{{item.geolocation_subdistrict_name}}</small> <br>
                                                    <small>{{item.geolocation_district_name}}</small> <br> -->
                                                    <small>{{item.geolocation_location_name}}</small>
                                                </td>
                                                <td>
                                                    <small>{{item.geolocation_subdistrict_zip_code}}</small>
                                                </td>
                                                <td>
                                                    <small>{{item.geolocation_subdistrict_tarif_code}}</small>
                                                </td>
                                            </tr>
                                        </template>
                                    </template>

                                    <template v-else>
                                        <tr>Data not found</tr>
                                    </template>
                                </template>
                            </with-keyboard-control>
                            
                        </tbody>
                        
                        
                    </table>
                </div>
            </transition>
        </template> 
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import WithKeyBoardControll from "@/components/withkeyboardcontrol"
export default {
    name: "location-selector",
    mixins: [master],
    props:{
        closeDialog: Function, 
        active: Boolean,
        q: String
    },
    components: {
        "with-keyboard-control": WithKeyBoardControll
    },
    data() {
        return {
            arrData: [],
            isShow: false
        }
    },
    watch: {
        active: function (val) {
            if(val !== undefined){
                this.isShow = val
                if(val == true) {
                    let self = this
                    setTimeout(function(){ self.$refs.keyboardControll.addKeyHandler() }, 100);
                } else {
                    this.$refs.keyboardControll.removeKeyHandler()
                }
            }
        },
        q: function (oldval, newval) {
            if(oldval !== newval){
                if(newval.length > 2) {
                    this.getTableData(newval)
                }
            }
        }
    },
    
    methods: {
        selectedHandler(index){
            let data = this.arrData.filter(item => item.index == index)
            this.clickdulu(data[0])
            this.clearNClose()
        },
        clickdulu(item) {
            this.$emit("selectedData", item)
        },
        clearNClose(){
            this.arrData = []
            this.closeDialog()
        },
        async getTableData(q) {
            await axios
                .get(this.URL.geolocation_search + 
                `?n=${this.listenNodeId}&s=${q}`, 
                this.Helper.header())
                .then(res => {
                    let arr = res.data.data
                    if(res.status == 200 && arr.length > 0) {
                        arr.map((item, key) => {
                            item['index'] = key
                        })

                        this.arrData = arr
                    }
                    // this.loading = false
                }).catch(err => {

                    this.checkAuth(err.response)
                    // this.loading = false
                    // this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed to populate country list', err)
                })
        },
    },
}
</script>
<style lang="scss">
    .tariff_selector{
            position: relative;
            widows: 100%;
            thead{
                th{
                    // text-align: center;
                }
            }
            tr{
                td{
                    padding: .5em 0;
                    border-top: 1px solid #333;
                }
            }
            
            .selected{
                background-color: #eaeaea;
            }
        }
</style>
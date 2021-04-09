<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>Cashless</h2>
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
        <vs-row  justify="space-between" style="margin-top:2em">
            <vs-col xs="12" sm="6" lg="4">
                <template>
                    <div class="center in-get-bag mt-25">
                    <vs-input border type="text"
                                v-model="item_code"
                                label-placeholder="Masukkan Code Connote"
                                v-on:keyup.enter="updateValue"
                                :autofocus="true"
                                ref="formInputCashless">

                    </vs-input>
                    </div>
                </template>
            </vs-col>
        </vs-row>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="6" lg="6">
                <div class="box">
                    <vs-table  ref="tablee">
                        <template #thead>
                        <vs-tr>
                            <vs-th>No</vs-th>
                            <vs-th>Connote</vs-th>
                            <vs-th>Valid</vs-th>
                        </vs-tr>
                        </template>
                        <template #tbody>
                        <vs-tr
                            :key="i"
                            v-for="(tr, i) in keysData"
                            :data="tr"
                            @click="listenActiveRow(i)"
                            v-bind:class="[activeRow == i ? 'row-active' : '']"
                        >
                            <vs-td  @click="selectRow(tr)">
                             {{ i+1 }}
                            </vs-td>
                            <vs-td  @click="selectRow(tr)">
                            {{tr.connote_number}}
                            </vs-td>
                            <template v-if="tr.is_cashless == true">
                                <vs-td>
                                     <vs-button
                                        transparent
                                        success
                                        active
                                        size="mini"
                                    ><i class='bx bx-check' ></i>
                                    </vs-button>
                                </vs-td>
                            </template>
                            <template v-else>
                                <vs-td>
                                     <vs-button
                                        warn
                                        flat
                                        size="mini"
                                        @click="updateRow(i)"
                                    >CLEAR
                                    </vs-button>
                                </vs-td>
                            </template>
                        </vs-tr>
                        <vs-tr>
                        </vs-tr>

                        </template>
                    </vs-table>
                </div>
            </vs-col>
            <vs-col xs="12" sm="6" lg="6">
                <div class="box">
                    <vs-row justify="flex-end">
                        <vs-col xs="4" sm="4" lg="4">
                            <h4>Information</h4>
                        </vs-col>
                    </vs-row>
                    <div style="text-align:left">
                        <vs-row justify="flex-start">
                            <vs-col xs="4" sm="2" lg="1">
                                <h4>From</h4>
                            </vs-col>
                            <vs-col xs="8" sm="8" lg="8">
                                <ul>
                                    <li>{{this.shipper_name}}</li>
                                    <li>{{this.shipper_address}}</li>
                                </ul>
                            </vs-col>
                        </vs-row>
                    </div>
                    <div style="text-align:left">
                        <vs-row justify="flex-start">
                            <vs-col xs="4" sm="2" lg="1">
                                <h4>To</h4>
                            </vs-col>
                            <vs-col xs="8" sm="8" lg="8">
                                <ul>
                                    <li>{{this.receiver_name}}</li>
                                    <li>{{this.receiver_address}}</li>
                                </ul>
                            </vs-col>
                        </vs-row>
                    </div>
                </div>
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
            keysData: [],
            item_code: '',
            form : {},
            receiver_name:'',
            receiver_address:'',
            shipper_name:'',
            shipper_address:'',
            loading:false,
            refloading:null,
            activeRow:null
        }
    },
    methods:{
        listenActiveRow(val){
            this.activeRow = val
        },
        updateValue(){
            this.form.no_cashless = this.item_code
            this.updateData()
        },
        selectRow(row){
            this.initInformation(row)
        },
        updateRow(row){
             this.keysData.splice(row,1);
             this.handleClearForm()
        },
        async updateData(){
            this.loadingHandler()
            await axios
                .post(
                    this.URL.cashless + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.handleClearForm()
                    this.keysData.push(res.data.data)    
                    this.closeLoading()
                }).catch(err => {
                    let obj = {
                         connote_number:this.item_code,
                         isvalid:false   
                    }
                    this.keysData.push(obj)
                    this.handleClearForm()
                    this.closeLoading()
                    this.openNotification('danger', 'Failed!', (err.response.data.message ?? 'System Err').toUpperCase())
                })
        },
        handleClearForm(){
            this.item_code =''
            this.form = {}
            this.receiver_name=''
            this.receiver_address=''
            this.shipper_name=''
            this.shipper_address=''
        },
        initInformation(data){
            this.receiver_name = data.connote_receiver_name
            this.receiver_address = data.connote_receiver_street_address
            this.shipper_name = data.connote_shipper_name
            this.shipper_address = data.connote_shipper_street_address       
        },
        loadingHandler(){
            this.refloading = this.$vs.loading({
                target: this.$refs.tablee,
                color: '#333'
            })
        },
        closeLoading(){
            this.refloading !== null ? this.refloading.close() : ''
        },
    }
}
</script>
<style lang="scss">
    .row-active{
        font-weight: bold;
        background: #fbfbfb;
    }
</style>
<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{ listenTitle }}</h2>
                </div>
            </vs-col>
        </vs-row>
        <section class="bagging">
                <vs-row>
                    <vs-col xs="12" sm="6" lg="3">
                        <auto-complete
                            formKey="destination"
                            name="Destination"
                            rules="required"
                            typeInput="autocomplete"
                            :url="autoCompleteUrl"
                            :querySearch="querySearch"
                            :selectedValue="destinationLabel"
                            :valueData="destination" 
                            @inputFocus="inputFocus"
                            @updateValue="updateValue" 
                        />
                    </vs-col>
                </vs-row>

                <vs-row style="margin-top:1em">
                    <vs-col xs="12" sm="6" lg="2">
                        <div class="center in-get-bag">
                            <vs-input 
                                border 
                                icon-after
                                ref="formInputSorting"
                                type="text"
                                v-model="item_number"
                                v-on:keyup.enter="processSorting"
                                v-uppercase
                                :autofocus="true"
                                :label-placeholder="'Masukkan Connote'"
                                @click-icon="$refs.cameraScanner.open('formInputSorting')"
                            >
                                <template #icon>
                                    <i class="bx bx-barcode-reader"></i>
                                </template>
                            </vs-input>
                        </div>
                    </vs-col>
                </vs-row>
                
                <vs-row justify="space-between" class="mt-2">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
                        <template>
                            <img class="logo" :src="require('../../../assets/img/bagging-placeholder.png')" alt="jne" width="300" align="center">
                        </template>
                        <h3>Scan barcode untuk melakukan sorting</h3>
                    </vs-col>
                </vs-row>
        </section>
        <camera-scanner 
            ref="cameraScanner" 
            @data="onCameraScannerGetData" 
        />
    </div>
</template>

<script>
import axios from "axios";
import master from "@/mixins/master";

import AutoComplete from "@/components/input/autoComplete";
import Breadcrumb from "@/components/breadcrumb/index";
import CameraScanner from "@/components/scanner/camera";
import Selector from "@/components/input/select";

export default {
    name:"inventory-sorting",
    mixins: [master],
    components: {
        "auto-complete": AutoComplete,
        "breadcrumb": Breadcrumb,
        "camera-scanner": CameraScanner,
        "selector": Selector,
    },
    data() {
        return {
            title: 'Sorting',
            item_number:'',
            form:{},
            loading: false,
            destination: "",
            destinationLabel: "",
            autoCompleteUrl: null,
            input_value: "",
        }
    },
    computed: {
        listenTitle() {
            return this.title
        },
    },
    methods: {
        updateValue(key, val, info){
            switch(key) {
                case "destination":
                    this.destinationLabel = val;
                    this.destination = info.data;
            }
        },
        handleClearForm(){
            this.form = {};
            this.item_number = '';
            this.destination = '';
            this.destinationLabel = '';
        },
        async processSorting() {
            if (this.destination && this.item_number) {
                this.form = {
                    connote_number: this.item_number,
                    destination_node_id : this.destination,
                }

                this.loading = true;
                try {
                    const res = await axios.post(`${this.URL.sorting_zip_code_validation}?n=${this.listenNodeId}`, JSON.stringify(this.form), this.Helper.header());                

                    this.openNotification('success-with-notif', null, "Success", res?.data?.message || "Update Success");
                } catch (err) {
                    this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
                } finally {
                    this.loading = false;
                    this.handleClearForm();
                }
            } else {
                this.openNotification("danger", '', "Failed", 'Destination is mandatory');
            }
        },
        
        inputFocus(obj){
            this.autoCompleteUrl = this.URL.node_list +'?n='+ this.listenNodeId +'&sort_order=desc&limit=10&page=1';
            this.input_label = "node_name";
            this.input_value = "node_id";
        },
        querySearch(queryString, cb){
            axios.get(this.autoCompleteUrl +`?n=${this.listenNodeId}&s=${queryString}`,
                this.Helper.header()
            )
            .then(res => {
                let result = res.data.data
                let suggestions = [];
                result.length > 0 && result.map(item => {
                    suggestions.push({
                        value: item[this.input_label],
                        data: String(item[this.input_value])
                    });
                });
                cb(suggestions);
                })
            .catch();
        },
        onCameraScannerGetData(data) {
            if (data && data.event === "result" && data.namespace === "formInputSorting") {
                this.item_number = data.data.text;
                this.updateValue();
            }
        },
    }
}
</script>
<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>Tracing</h2>
                </div>

                <!-- <div class="mt-2">
                    <vs-row justify="space-between">
                        <vs-col xs="9" sm="9" lg="9">
                            <form @submit.prevent="openDialog">
                                <vs-input border type="text"
                                    v-model="item_no"
                                    label-placeholder="Scan Koli Here"
                                    :autofocus="true"
                                    ref="formInputUnbagging">
                                </vs-input>
                            </form>
                        </vs-col>
                    </vs-row>
                </div> -->

                
            </vs-col>
        </vs-row>

        <template>
            <div>
                <vs-row style="margin-top:1em">
                    <vs-col xs="12" sm="6" lg="2" style="margin-bottom: 10px;">
                        <vs-radio v-model="radio_option" val="connote">
                            Connote (orion)
                        </vs-radio>
                    </vs-col>
                    <vs-col xs="12" sm="6" lg="2">
                        <vs-radio v-model="radio_option" val="koli">
                            Koli
                        </vs-radio>
                    </vs-col>
                </vs-row>
            </div>
        </template>

        <vs-row>
            <vs-col xs="12" sm="3" lg="3" style="margin-top: 2em">
                <div v-if="radio_option === 'koli'" class="center">
                    <vs-input
                        ref="formInputConnote"
                        v-model="item_no"
                        border
                        type="text"
                        label-placeholder="Scan Koli here"
                        autofocus
                        icon-after
                        @keyup.enter="updateValue"
                        @click-icon="$refs.cameraScanner.open('formInputConnote')"
                    >
                        <template #icon>
                            <i class="bx bx-barcode-reader" />
                        </template>
                    </vs-input>
                </div>
                <div v-else class="center">
                    <vs-input
                        ref="formInputConnoteOrion"
                        v-model="item_no_orion"
                        border
                        type="text"
                        label-placeholder="Scan Connote here (orion)"
                        autofocus
                        icon-after
                        @keyup.enter="updateValueOrion"
                        @click-icon="$refs.cameraScanner.open('formInputConnoteOrion')"
                    >
                        <template #icon>
                            <i class="bx bx-barcode-reader" />
                        </template>
                    </vs-input>
                </div>
            </vs-col>
            
            <vs-col xs="12" sm="3" lg="3" style="margin-top: 2em">
                <div v-if="radio_option === 'koli'" class="center">
                    <vs-input
                        ref="formRemoveConnote"
                        v-model="item_no_remove"
                        border
                        type="text"
                        label-placeholder="Remove Koli here"
                        autofocus
                        icon-after
                        @keyup.enter="removeValue"
                        @click-icon="$refs.cameraScanner.open('formRemoveConnote')"
                    >
                        <template #icon>
                            <i class="bx bx-barcode-reader" />
                        </template>
                    </vs-input>
                </div>
                <div v-else class="center">
                    <vs-input
                        ref="formRemoveConnoteOrion"
                        v-model="item_no_orion_remove"
                        border
                        type="text"
                        label-placeholder="Remove Connote here (orion)"
                        autofocus
                        icon-after
                        @keyup.enter="removeValueOrion"
                        @click-icon="$refs.cameraScanner.open('formRemoveConnoteOrion')"
                    >
                        <template #icon>
                            <i class="bx bx-barcode-reader" />
                        </template>
                    </vs-input>
                </div>
            </vs-col>
        </vs-row>

        <section class="nodes">
            <div class="box view">
                <div class="nav-box">
                    <vs-row justify="space-between">
                        <vs-col xs="6" sm="6" lg="6">
                            <date-time
                                :name="''"
                                :rules="''"
                                :formKey="'TRIGGER_DATE'"
                                :valueData="dateRange"
                                typeInput="daterange"
                                @updateValue="updateValueDate" 
                            />
                        </vs-col>
                        <vs-col xs="6" sm="3" lg="3">
                            <search-input ref="searchInput" @searchValue="searchValue"/>
                        </vs-col>
                    </vs-row>
                </div>

                <div class="mt-05">
                    <table-master 
                        :dataTable="dataTable" 
                        :dataColumn="datacolumn" 
                        :tableLoading="loading"
                        :pageSize="pagination.page_size"
                        :page="pagination.page"
                        :limit="pagination.limit"
                        :hasPagination="true"
                        :hasLinked="['koli_number']"
                        @handleEdit="showData"
                    />
                </div>
            </div>
        </section>

        <camera-scanner ref="cameraScanner" @data="onCameraScannerGetData" />
    </div>
</template>

<script>
import axios from "axios";
import master from "@/mixins/master";
import moment from "moment"

import Breadcrumb from "@/components/breadcrumb/index"
import CameraScanner from "@/components/scanner/camera";
import DateTime from "@/components/input/dateTime"
import NavItem from "@/components/navbar/navTab"
import SearchInput from "@/components/search/searchInput"
import TableMaster from "@/components/table/tableMaster.vue"


export default {
    name:"irregularities-tracing",
    mixins:[master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "date-time": DateTime,
        "table-master" : TableMaster,
        CameraScanner,
    },
    data() {
        return {
            item_no: "",
            item_no_remove: "",
            item_no_orion: "",
            item_no_orion_remove: "",
            tempSearch: "",
            radio_option: "connote",
            loading:false,
            dateRange: [],
            dataTable: [],
            datacolumn: [
                {
                    label: "Koli",
                    key: "koli_number",
                    width: "auto"
                },
                {
                    label: "HRS",
                    key: "hrs_sequence",
                    width: "auto"
                },
                {
                    label: "HRI",
                    key: "hri_sequence",
                    width: "auto"
                },
                {
                    label: "Shipper Name",
                    key: "shipper_name",
                    width: "auto"
                },
                {
                    label: "Shipper Phone",
                    key: "shipper_phone_number",
                    width: "auto"
                },
                {
                    label: "Receiver Name",
                    key: "receiver_name",
                    width: "auto"
                },
                {
                    label: "Receiver Phone",
                    key: "receiver_phone_number",
                    width: "auto"
                },
                {
                    label: "Origin",
                    key: "origin",
                    width: "auto"
                },
                {
                    label: "Destination",
                    key: "destination",
                    width: "auto"
                },
            ],    
            form: {},
            pagination: {
                limit:10,
                page_size: 1,
                page: 1
            },
        }
    },
    methods: {
        async getTableData(limit,page,q, from, to) {
            this.loading = true
            let query = "";
            let startDate = "";
            let endDate = "";

            if(q !== undefined) {
                query = q
            }

            if(from !== undefined && to !== undefined) {
              startDate = from
              endDate = to
            }

            await axios
                .get(this.URL.tracing +
                `?n=${this.listenNodeId}&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        this.dataTable = res.data.data

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    } else {
                        this.dataTable = []
                        
                        if (query != "") {
                            this.openNotification('danger', 'Irreguralities Tracing data is empty!', ' data is empty or not found, please check your keyword in the input search')
                        }
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate Irreguralities Tracing', err)
                })
        },
        async handleSubmit() {
            await axios
                .post(
                    this.URL.irregularities + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    this.refresh()

                    this.dialogRemarkActive = false
                    this.openNotification(null, 'Success', 'Create new cancel connote is success')
                }).catch(err => {
                    this.loading = false
                    this.refresh()
                    this.openNotification('danger', 'Create new cancel connote failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        showData(row) {
            this.$router.push(`/irreguralities/tracing/${row.koli_number}/`);
            this.refresh();
        },
        refresh(){
            let d = new Date()
            let from = ''
            let to = ''
            
            if(this.dateRange.length > 0) {
                from = moment(this.dateRange[0]).format("YYYY-MM-DD")
                to = moment(this.dateRange[1]).format("YYYY-MM-DD")
            } else {
                from = moment(d).format("YYYY-MM-DD")
                to = moment(d).format("YYYY-MM-DD")
            }

            
            // this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, from, to)
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, "", "")

        },
        searchValue (val) {
            this.tempSearch = val;
            this.refresh()
        },
        updateValueDate(key, val) {
            switch(key) {
                case "TRIGGER_DATE":
                    this.dateRange = val;
                    this.refresh();
                    break;
                default:
                    break;
            }
        },
        actionLimit(val){
            this.pagination.limit = val
            this.pagination.page = 1
            this.refresh()
        },
        actionPagination(val) {
            this.pagination.page = val
            this.refresh()
        },


        // Scan Koli
        onCameraScannerGetData(data) {
            if (data && data.event === "result") {
                const result = data.data;

                switch (data.namespace) {
                    case "formInputConnoteOrion":
                        this.item_no_orion = result.text;
                        this.updateValueOrion();
                        break;
                    case "formInputConnote":
                        this.item_no = result.text;
                        this.updateValue();
                        break;
                    case "formRemoveConnote":
                        this.item_no_remove = result.text;
                        this.removeValue();
                        break;
                    case "formRemoveConnoteOrion":
                        this.item_no_orion_remove = result.text;
                        this.removeValueOrion();
                        break;
                    default:
                        break;
                }
            }
        },
        async scanConnote() {
            this.loadingScanConnote = true;

            await axios
                .post(
                    `${this.URL.tracing}?n=${this.listenNodeId}`,
                    JSON.stringify(this.form),
                    this.Helper.header()
                )
                .then((res) => {
                    if (res.data.hasOwnProperty("summary")) {
                        this.openNotification(null, "Success", "Remove koli success");
                        this.loadingScanConnote = false;
                    } else {
                        this.openNotification(null, "Success", res.data.message);
                        this.loadingScanConnote = false;
                    }
                    this.refresh();
                })
                .catch((err) => {
                    this.loadingScanConnote = false;
                    this.openNotification("danger", "", err.response.data.message);
                });
        },
        async removeConnote() {
            this.loadingScanConnote = true;

            await axios
                .delete(
                    `${this.URL.tracing}/${this.form.item_number}?n=${this.listenNodeId}`,
                    this.Helper.header()
                )
                .then((res) => {
                    if (res.data.hasOwnProperty("summary")) {
                        this.openNotification(null, "Success", "Remove koli success");
                        this.loadingScanConnote = false;
                    } else {
                        this.openNotification(null, "Success", res.data.message);
                        this.loadingScanConnote = false;
                    }

                    this.refresh();
                })
                .catch((err) => {
                    this.loadingScanConnote = false;
                    this.openNotification("danger", "", err.response.data.message);
                });
        },

        updateValue() {
            this.form.item_number = this.item_no;
            this.scanConnote();
            this.item_no = null;
        },
        removeValue() {
            this.form.item_number = this.item_no_remove;
            this.removeConnote();
            this.item_no_remove = null;
        },
        updateValueOrion() {
            this.form.item_number = `${this.item_no_orion}`;
            this.scanConnote();
            this.item_no_orion = null;
        },
        removeValueOrion() {
            this.form.item_number = this.item_no_orion_remove;
            this.removeConnote();
            this.item_no_orion_remove = null;
        },
        
    },
    mounted() {
        this.refresh()   
    }
}
</script>
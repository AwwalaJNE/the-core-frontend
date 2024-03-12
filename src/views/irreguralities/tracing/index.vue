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
                            @updateValue="updateValueDate" />
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
                    key: "hrs",
                    width: "auto"
                },
                {
                    label: "HRI",
                    key: "hri",
                    width: "auto"
                },
                {
                    label: "Shipper Name",
                    key: "shipper_name",
                    width: "auto"
                },
                {
                    label: "Shipper Phone",
                    key: "shipper_phone",
                    width: "auto"
                },
                {
                    label: "Receiver Name",
                    key: "receiver_name",
                    width: "auto"
                },
                {
                    label: "Receiver Phone",
                    key: "receiver_phone",
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
        async getTableData(limit,page,q, from, to, node) {
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
                .get(this.URL.irregularities +
                `?n=${this.listenNodeId}&irregularity_type=CANCELED&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`,
                this.Helper.header())
                .then(res => {
                    if(res.data.data.length > 0) {
                        // TODO: change arr value
                        let arr = res.data.data
                        // let arr = [
                        //     {
                        //         created_at: "2024-03-08 12:52:35",
                        //         koli_number: "050023010460000500",
                        //         hrs: "DPK/DRI/12345678",
                        //         hri: "DPK/HRI/12345678",
                        //         shipper_name: "shipper_name",
                        //         shipper_phone: "081208120812",
                        //         receiver_name: "receiver_name",
                        //         receiver_phone: "081208120812",
                        //         origin: "CGK10000",
                        //         destination: "DPK10000",



                        //         // "irregularity_id": "8354cb5a-b2ae-45e5-9564-2811be6f5db2",
                        //         // "user_name": "CORESUPERADMIN",
                        //         // "irregularity_type": "CANCELED",
                        //         // "koli_number": "050023010460000500",
                        //         // "irregularity_status_code": "CR1",
                        //         // "irregularity_status_description": "CANCEL RETURN (CR1)",
                        //         // "remark": "D",
                        //         // "node_id": "2301",
                        //         // "user_id": "1241",
                        //         // "created_at": "2024-03-08 12:52:35",
                        //         // "approved_at": null,
                        //         // "approved_by": null,
                        //         // "unhold_at": null,
                        //         // "bag_number": null,
                        //         // "image": "",
                        //         // "user_approve": null,
                        //         // "isDisabled": false,
                        //         // "approve": "-"
                        //     }
                        // ]
                        arr.map(item => {
                            item["isDisabled"] = item.approved_by != null && item.approved_by != '' ? true : false;
                            item["approve"] = item.approved_by != null && item.approved_by != '' ? item.user_approve.user_name : '-';
                        })

                        this.dataTable = arr

                        this.pagination.page = res.data.meta.current_page
                        this.pagination.limit = parseInt(res.data.meta.per_page)
                        this.pagination.page_size = res.data.meta.last_page
                    } else {
                        // this.openNotification('warn', 'Irreguralities Cancel data is empty!', ' Please create Irreguralities Cancel data')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate Irreguralities Cancel', err)
                })
        },
        async handleSubmit() {
            console.log('this.form', this.form)
            await axios
                .post(
                    this.URL.irregularities + `?n=${this.listenNodeId}`,
                    JSON.stringify(this.form), 
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
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
            // TODO: Change row.koli_number
          this.$router.push(`/irreguralities/tracing/tracing-history/${row.koli_number}`);
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

            
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, from, to)
        },
        searchValue (val) {
            this.tempSearch = val
            this.refresh()
        },
        updateValueDate(key, val) {
            switch(key) {
                case "TRIGGER_DATE":
                    this.dateRange = val
                    this.refresh()
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
                        console.log("Unhandled event.", data);
                        break;
                }
            }
        },
        async scanConnote() {
            this.loadingRunsheet = true;
            console.log("123", this.form);

            // TODO: CHANGE THIS API
            await axios
                .post(
                    `${this.URL.employee}/${this.employee_id}/delivery?n=${this.listenNodeId}&delivery_runsheet_number=${this.delivery_runsheet_number}`,
                    JSON.stringify(this.form),
                    this.Helper.header()
                )
                .then((res) => {
                    if (res.data.hasOwnProperty("summary")) {
                        this.dataDelivery.employee_name = res.data.data.employee_name ? res.data.data.employee_name : null;
                        this.dataDelivery.employee_code = res.data.data.employee_code ? res.data.data.employee_code : null;
                        this.dataDeliverySummary = res.data.summary;
                        this.delivery_runsheet_number = this.dataDeliverySummary.delivery_runsheet_number.toString();
                        this.getDataDelivery();
                        this.openNotification(null, "Success", "Update success");
                        this.loadingRunsheet = false;
                    } else {
                        this.getDataDelivery();
                        this.openNotification(null, "Success", res.data.message);
                        this.loadingRunsheet = false;
                    }
                })
                .catch((err) => {
                    this.loadingRunsheet = false;
                    this.openNotification("danger", "", err.response.data.message);
                });
        },
        async removeConnote() {
            console.log("remove", this.form.koli_number);
            this.loadingRunsheet = true;

            // TODO: CHANGE THIS API
            await axios
                .delete(
                    `${this.URL.employee}/${this.employee_id}/delivery/cancel?n=${this.listenNodeId}&delivery_runsheet_number=${this.delivery_runsheet_number}&koli_number=${this.form.koli_number}`,
                    this.Helper.header()
                )
                .then((res) => {
                    if (res.data.hasOwnProperty("summary")) {
                        this.dataDelivery.employee_name = res.data.data.employee_name ? res.data.data.employee_name : null;
                        this.dataDelivery.employee_code = res.data.data.employee_code ? res.data.data.employee_code : null;
                        this.dataDeliverySummary = res.data.summary;
                        this.delivery_runsheet_number = this.dataDeliverySummary.delivery_runsheet_number.toString();
                        this.getDataDelivery();
                        this.openNotification(null, "Success", "Remove koli success");
                        this.loadingRunsheet = false;
                    } else {
                        this.getDataDelivery();
                        this.openNotification(null, "Success", res.data.message);
                        this.loadingRunsheet = false;
                    }
                })
                .catch((err) => {
                    this.loadingRunsheet = false;
                    this.openNotification("danger", "", err.response.data.message);
                });
        },

        updateValue() {
            this.form.koli_number = this.item_no;
            this.scanConnote();
            this.item_no = null;
        },
        updateValueOrion() {
            this.form.koli_number = `${this.item_no_orion}00`;
            this.scanConnote();
            this.item_no = null;
        },
    },
    mounted() {
        this.refresh()   
    }
}
</script>
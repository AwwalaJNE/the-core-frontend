<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>Cancel Connote</h2>
                </div>
                <div class="mt-2">
                    <vs-row justify="space-between">
                        <vs-col xs="9" sm="9" lg="9">
                            <form @submit.prevent="openDialog">
                                <vs-input border type="text"
                                    v-model="koliCode"
                                    label-placeholder="Masukkan Nomer Connote"
                                    :autofocus="true"
                                    ref="formInputUnbagging">
                                </vs-input>
                            </form>
                        </vs-col>
                        <vs-col xs="3" sm="3" lg="3">
                            <vs-button
                                @click="openDialog"
                            >
                                Submit
                            </vs-button>
                        </vs-col>
                    </vs-row>
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
                            @updateValue="updateValue" />
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
                    :customBtn="true"
                    customBtn_label="APPROVE"
                    @actionUpdate="actionUpdate"
                    :hasPagination="true"
                    @actionLimit="actionLimit"
                    @actionPagination="actionPagination"
                    />
                </div>
            </div>
            
        </section>

        <dialog-cancel
            :active="dialogCancelActive" 
            :closeDialog="closeDialog"
            @updateValue="updateValue"
        />
        <!-- dialog confirm approve cancel irregularity-->
        <dialog-confirm
            :active="dialogApproveActive"
            :loading="loadingApproveActive"
            :closeDialog="closeDialogApproveCancel"
            title="Approve Cancel Irregularity"
            message="Are you sure you want to approve cancel Irregularity ?"
            @confirm="confirmApprove"
            @cancel="closeDialogApproveCancel"
        />
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";
import moment from "moment"
import TableMaster from "@/components/table/tableMaster.vue"
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"
import DateTime from "@/components/input/dateTime"

import DialogConfirm from "@/components/dialog/dialogConfirm"
import DialogCancel from "@/views/irreguralities/cancel/dialogCancel"
export default {
    name:"irregularities-cancel",
    mixins:[master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "date-time": DateTime,
        "table-master" : TableMaster,
        "dialog-cancel": DialogCancel,
        "dialog-confirm": DialogConfirm
    },
    data() {
        return {
            koliCode: "",
            dateRange: [],
            tempSearch: "",
            dataTable: [],
            dataItem: {},
            datacolumn: [
                {
                    label: "Canceled Date",
                    key: "created_at",
                    width: "md"
                },
                {
                    label: "Koli",
                    key: "koli_number",
                    width: "auto"
                },
                {
                    label: "Status Code",
                    key: "irregularity_status_code",
                    width: "auto"
                },
                {
                    label: "User",
                    key: "user_name",
                    width: "auto"
                },
                {
                    label: "Approved at",
                    key: "approved_at",
                    width: "auto"
                },
                {
                    label: "Approved By",
                    key: "approve",
                    width: "auto"
                },
            ],
            loading:false,
            pagination: {
                limit:5,
                page_size: 1,
                page: 1
            },
            form: {},
            dialogCancelActive: false,
            dialogApproveActive: false,
            loadingApproveActive: false
        }
    },
    methods: {
        refresh(){
            console.log("refresh")
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
                        let arr = res.data.data
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

                    this.dialogCancelActive = false
                    this.openNotification(null, 'Success', 'Create new cancel connote is success')
                }).catch(err => {
                    this.loading = false
                    this.refresh()
                    this.openNotification('danger', 'Create new cancel connote failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        searchValue (val) {
            this.tempSearch = val
            this.refresh()
        },
        updateValue(key, val) {
            switch(key) {
                case "TRIGGER_DATE":
                    this.dateRange = val
                    this.refresh()
                    console.log('dateRange',this.dateRange)
                    break;
                case "DIALOG_CANCEL":
                    this.form = val
                    this.form['connote_number'] = this.koliCode
                    this.handleSubmit()
                    break;
                default:
                    console.log('meong')
                    // code block
            }
        },
        actionUpdate(val){
          if(this.dataTable.length > 0) {
              //dibuat untuk approve saja jadi gapake switch case
            this.dataItem = val;
            this.$nextTick(() => {
                this.dialogApproveActive = true;
            });
          }
        },
        confirmApprove(val) {
          if(val) {
            let formUpdate = {}
            let irregularity_id = this.dataItem.irregularity_id.toString()
            this.loadingApproveActive = true;
            this.approveIrreg(formUpdate, irregularity_id)
          }
        },
        async approveIrreg(formUpdate, irregularity_id) {
            this.loading = true
            await axios
            .post(
                this.URL.irregularities + `/${irregularity_id}/approve?n=${this.listenNodeId}`,
                JSON.stringify(formUpdate), 
                this.Helper.header())
            .then(res => {
                this.closeDialogApproveCancel()
                this.refresh()
                this.openNotification(null, 'Success', 'Cancel approved')
            }).catch(err => {
                this.closeDialogApproveCancel()
                this.refresh()
                this.openNotification('danger', 'Cannot approve cancel irregularity', err.response ? err.response.data.message : 'something went wrong')
            })
            this.loading = false
            return true;
        },
        closeDialogApproveCancel(){
            this.dataItem = {};
            this.loadingApproveActive = false
            this.dialogApproveActive = false
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
        closeDialog() {
            this.dialogCancelActive = false
        },
        openDialog() {
            if(this.koliCode !== '') {
                this.dialogCancelActive = true
            }
        }
    },
    mounted() {
        this.refresh()   
    }
}
</script>
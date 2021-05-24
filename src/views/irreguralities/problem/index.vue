<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>Problem Connote</h2>
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
<<<<<<< HEAD
                    :customBtn="true"
                    customBtn_label="Edit"
                    @actionUpdate="editIrreg"
=======
>>>>>>> ced2db04429c7e08c441340daac549e7cc492569
                    :hasPagination="true"
                    @actionLimit="actionLimit"
                    @actionPagination="actionPagination"

                    :customAction="true"
                    :customActionList="customActionList"
                    @actionUpdate="actionUpdate"
                    />
                </div>
            </div>
            
        </section>

<<<<<<< HEAD
        <dialog-problem
            :active="dialogProblemActive" 
=======
        <dialog-return
            :active="dialogProblem" 
>>>>>>> ced2db04429c7e08c441340daac549e7cc492569
            :closeDialog="closeDialog"
            :dataItem="dataItem"
            @updateValue="updateValue"
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

import DialogProblem from "@/views/irreguralities/problem/dialogProblem"
export default {
    name:"irregularities-problem",
    mixins:[master],
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "date-time": DateTime,
        "table-master" : TableMaster,
        "dialog-problem": DialogProblem,
    },
    data() {
        return {
            koliCode: "",
            dateRange: [],
            tempSearch: "",
            dataTable: [],
            datacolumn: [
                {
                    label: "Date",
                    key: "created_at",
                    width: "md"
                },
                {
                    label: "Connote",
                    key: "koli_number",
                    width: "auto"
                },
                {
                    label: "Status Code",
                    key: "irregularity_status_code",
                    width: "auto"
                },
                {
                    label: "Status Description",
                    key: "irregularity_status_description",
                    width: "auto"
                },
                {
                    label: "Remark",
                    key: "remark",
                    width: "auto"
                },
                {
                    label: "User",
                    key: "user_name",
                    width: "auto"
                },
            ],
            dataItem: {},
            customActionList: [
              {
                label: 'Edit',
                key: 'edit',
                attribute: '',
              },
            ],
            loading:false,
            pagination: {
                limit:5,
                page_size: 1,
                page: 1
            },
            form: {},
<<<<<<< HEAD
            dialogProblemActive: false,
=======
            dialogProblem: false,
>>>>>>> ced2db04429c7e08c441340daac549e7cc492569
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
        async editIrreg(val){
            
            if(this.dataTable.length > 0) {
              //dibuat untuk approve saja jadi gapake switch case
            this.dataItem = val;
            console.log(this.dataItem);
            this.$nextTick(() => {
                this.dialogProblemActive = true;
            });
          }
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
                `?n=${this.listenNodeId}&irregularity_type=PROBLEM&sort_order=desc&limit=${limit}&page=${page}&s=${query}&start_date=${startDate}&end_date=${endDate}`,
                this.Helper.header())
                .then(res => {
                    // this.dataTable = res.data.data
                    let arr = res.data.data
                    
                    this.dataTable = arr
                    this.pagination.page = res.data.meta.current_page
                    this.pagination.limit = parseInt(res.data.meta.per_page)
                    this.pagination.page_size = res.data.meta.last_page
                    if(res.data.data.length > 0) {
                        
                    } else {
                        this.openNotification('warn', 'Irreguralities Problem data is empty!', '')
                    }
                    
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.openNotification('danger', 'Failed to populate Irreguralities Problem', err)
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
<<<<<<< HEAD
                    this.dialogProblemActive = false
=======
                    this.dialogProblem = false
>>>>>>> ced2db04429c7e08c441340daac549e7cc492569
                    this.openNotification(null, 'Success', 'Create new cancel connote is success')
                }).catch(err => {
                    this.loading = false
                    this.dialogProblem = false
                    this.refresh()

                    this.openNotification('danger', 'Create new cancel connote failed', err.response ? err.response.data.message : 'something went wrong')
                })
        },
        searchValue (val) {
            this.tempSearch = val
            this.refresh()
        },
        actionUpdate(val, key) {
            switch(key) {
                case "edit":
                    if(this.dataTable.length > 0) {
                        this.dataItem = val
                        console.log(this.dataItem,'item')
                        this.$nextTick(() => {
                            this.dialogProblem = true
                        });
                    }
                    break;
                default:
            }
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
<<<<<<< HEAD
            this.dialogProblemActive = false
        },
        openDialog() {
            if(this.koliCode !== '') {
                this.dialogProblemActive = true
=======
            this.dialogProblem = false
        },
        openDialog() {
            if(this.koliCode !== '') {
                this.dialogProblem = true
>>>>>>> ced2db04429c7e08c441340daac549e7cc492569
            }
        }
    },
    mounted() {
        this.refresh()   
    }
}
</script>
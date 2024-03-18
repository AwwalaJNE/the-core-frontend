<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{ title }}</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3" v-if="navActive != 'k-RUNSHEET'">
                <div style="position:relative;display:flex;justify-content: flex-end;">
                    <div style="width: 100px;padding-right: 5px;">
                        <vs-button flat block :active="true" @click="openDialogNewButton">
                        <i class="bx bx-plus"></i> New
                        </vs-button>
                    </div>
                </div>
            </vs-col>
        </vs-row>
        
        <section class="users">
            <vs-row justify="space-around">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" :w="`${navActive === 'k-PERMISSIONS'?'4':'12'}`">
                    <div class="box view">

                        <vs-row justify="space-between">
                            <vs-col xs="12" sm="9" lg="9">
                                <nav-item :navItem="navItemm" @activeTab="activeTab" />
                            </vs-col>
                            <vs-col xs="12" sm="3" lg="3">
                                <search-input ref="searchInput" @searchValue="searchValue" class="search-input"/>
                            </vs-col>
                        </vs-row>

                        <template v-if="navActive === 'k-REMARK'">
                            <vs-row >
                                <vs-col xs="6" sm="6" lg="6">
                                    <date-time
                                        :name="''"
                                        :rules="''"
                                        :formKey="'TRIGGER_DATE'"
                                        :valueData="dateRange"
                                        typeInput="daterange"
                                        @updateValue="updateValue" 
                                    />
                                </vs-col>
                            </vs-row>
                            <transition name="slide-fade">
                                <remark-list 
                                    :ref="navActive"  
                                    :query="tempSearch" 
                                    :queryInventory="statusinventory" 
                                    :queryBag="status_bag" 
                                />
                            </transition>
                        </template>

                        <template v-if="navActive === 'k-RUNSHEET'">
                            <vs-row justify="space-between">
                                <vs-col xs="6" sm="6" lg="6">
                                    <date-time
                                        :name="''"
                                        :rules="''"
                                        :formKey="'TRIGGER_DATE'"
                                        :valueData="dateRange"
                                        typeInput="daterange"
                                        @updateValue="updateValue" 
                                    />
                                </vs-col>
                                <vs-col xs="6" sm="4" lg="2">
                                    <select-status-runsheet
                                        ref="bag_routing"
                                        :isMultiple="false"
                                        :border="true"
                                        @updateStatusRunsheet="updateStatusRunsheet" 
                                    />
                                </vs-col>
                            </vs-row>
                            <transition name="slide-fade">
                                <runsheet-list
                                    :ref="navActive" 
                                    :bagDestination="bagDestination" 
                                    :statusRunsheet="statusRunsheet" 
                                    :query="tempSearch"
                                />
                            </transition>
                        </template>

                        <template v-if="navActive === 'k-MESSAGE'">
                            <vs-row >
                                <vs-col xs="6" sm="6" lg="6">
                                    <date-time
                                        :name="''"
                                        :rules="''"
                                        :formKey="'TRIGGER_DATE'"
                                        :valueData="dateRange"
                                        typeInput="daterange"
                                        @updateValue="updateValue" 
                                    />
                                </vs-col>
                            </vs-row>
                            <transition name="slide-fade">
                                <message-list 
                                    :ref="navActive"  
                                    :query="tempSearch" 
                                    :queryInventory="statusinventory" 
                                    :queryBag="status_bag" 
                                />
                            </transition>
                        </template>
                        
                    </div>
                </vs-col>
                
            </vs-row>
        </section>

        <dialog-remark
            :active="dialogRemarkActive" 
            :closeDialog="closeDialogRemark"
            @updateValue="updateValueRemark"
        />

        <dialog-messages
            :active="dialogMessageActive" 
            :closeDialog="closeDialogMessage"
            @updateValue="updateValueMessage"
        />

    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"

import Breadcrumb from "@/components/breadcrumb/index"
import DateTime from "@/components/input/dateTime"
import DialogMessages from "@/views/irreguralities/tracing/message/dialogMessages";
import DialogRemark from "@/views/irreguralities/tracing/remark/dialogRemark"
import NavItem from "@/components/navbar/navTab"
import MessageList from "@/views/irreguralities/tracing/message/index"
import RemarkList from "@/views/irreguralities/tracing/remark/index"
import RunsheetList from "@/views/irreguralities/tracing/runsheet/index"
import SearchInput from "@/components/search/searchInput"
import SelectStatusRunsheet from "@/views/irreguralities/tracing/runsheet/selectStatusRunsheet"
import Selector from "@/components/input/select"
import TableMaster from "@/components/table/tableMaster.vue"

export default {
    name:"irregularities-tracing-history",
    mixins: [master],
    components: {
        "table-master" : TableMaster,
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "selector": Selector,
        "date-time": DateTime,

        "remark-list": RemarkList,
        "dialog-remark": DialogRemark,

        "runsheet-list": RunsheetList,
        "select-status-runsheet": SelectStatusRunsheet,

        "message-list": MessageList,
        "dialog-messages": DialogMessages,
    },
    data() {
        return {
            navItemm: [
                {
                    label: "REMARK",
                    key: "k-REMARK",
                    title: "Remark List"
                },
                {
                    label: "RUNSHEET",
                    key: "k-RUNSHEET",
                    title: "Runsheet List"
                },
                {
                    label: "MESSAGE",
                    key: "k-MESSAGE",
                    title: "Message List"
                }
            ],

            navActive: "k-REMARK",
            title: "Remark List",

            permission: [],
            loadingPermission: false,
            permissionDisplay: [],
            keysPermission: {},
            datacolumn: [
                {
                    label: "Menu",
                    key: "user_permission_name",
                    type: "text",
                    width: "sm"
                },
                {
                    label: "Select",
                    key: "selected",
                    type: "boolean",
                    width: "xs"
                },
                {
                    label: "Access Data",
                    key: "permission_access_data",
                    type: "selector",
                    width: "auto"
                }
            ],
            loading: false,
            tempSearch: "",
            pagination: {
                limit: 10,
                page_size: 1,
                page: 1
            },
            refreshInject:"",
            statusinventory:"",
            bagDestination:"",
            statusRunsheet:"",
            destination_tlc: [{
              label: 'All Destination',
              value: ''
            }],

            dialogRemarkActive: false,
            dialogMessageActive: false,

            dateRange: [],
            status_bag:""
        }
    },
    methods: {
        openDialogNewButton() {
            switch(this.navActive) {
                case "k-REMARK":
                    this.dialogRemarkActive = true
                    break;
                case "k-MESSAGE":
                    this.dialogMessageActive = true
                    break;
                default:
                    // code block
            }
        },

        updateValueMessage(key, val) {
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

        updateValueRemark(key, val) {
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

        updateValue(key, val) {
            switch(key) {
                case "TRIGGER_DATE":
                    this.dateRange = val
                    this.refresh()
                    console.log('dateRange',this.dateRange)
                    break;
                default:
                    console.log('meong')
            }
        },

        updateStatusRunsheet(key,val){
            this.statusRunsheet = val
        },

        closeDialogRemark() {
            this.dialogRemarkActive = false
        },
        closeDialogMessage() {
            this.dialogMessageActive = false
        },

        refresh(){
            let el = this.refreshInject
            this.$refs[el].refresh() // trigger function refresh form dari luar component list

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

            
            // TODO: TEST THIS
            this.getTableData(this.pagination.limit,this.pagination.page,this.tempSearch, from, to)
        },

        
        searchValue (val) {
            this.tempSearch = val
            console.log("this.tempSearch = ",this.tempSearch)
        },
        clearSearch() {
            this.$refs.searchInput.clear()
        },
        activeTab(val) {
            this.navActive = val
            this.clearSearch()
            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title


        },
        
        actionLimit(val){
            this.pagination.limit = val
        },
        actionPagination(val) {
            this.pagination.page = val
        },



        filterNow(){
            if(this.permission.length > 0) {
                console.log('this.keysPermission before filter', this.keysPermission)
                this.permission.map(item => {
                    if(this.keysPermission.hasOwnProperty(item.user_permission_id)) {
                        item["selected"] = true
                    } 
                })
                this.permissionDisplay = this.permission
                console.log('this.keysPermission after filter', this.keysPermission)
            }
        },

    },
}
</script>

<style lang="scss">
    .users{
        min-height: 50vh;
        .view{
            min-height: 400px;
        }
        .nav-box{
            position: relative;
            top: 0;
            left: 0;
            width: auto;
            max-width: 350px;
        }
        .search-input{
            @include for-phone-only{
                margin-bottom: 1rem;
            }
        }
    }
</style>
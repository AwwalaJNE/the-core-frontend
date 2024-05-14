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
                        
                        <vs-row>
                            <vs-col xs="12" sm="6" lg="6">
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
                        
                        <template v-if="navActive === 'k-REMARK'">
                            <transition name="slide-fade">
                                <remark-list 
                                    ref="refreshRemark"  
                                    :query="tempSearch"
                                    :dateFilter="dateRange"
                                />
                            </transition>
                        </template>

                        <template v-if="navActive === 'k-RUNSHEET'">
                            <transition name="slide-fade">
                                <runsheet-list
                                    :ref="navActive"
                                    :query="tempSearch"
                                    :dateFilter="dateRange"
                                />
                            </transition>
                        </template>

                        <template v-if="navActive === 'k-MESSAGE'">
                            <transition name="slide-fade">
                                <message-list 
                                    ref="refreshMessage"  
                                    :query="tempSearch"
                                    :dateFilter="dateRange"
                                />
                            </transition>
                        </template>
                        
                    </div>
                </vs-col>
                
            </vs-row>
            <vs-row justify="flex-end">
                <vs-button
                    class="mt-1"
                    style="float: right"
                    square
                    active
                    @click="print"
                >
                    <i class="bx bxs-printer" /> PRINT
                </vs-button>
                <vs-button
                    class="mt-1"
                    style="float: right"
                    square
                    active
                    @click="back"
                >
                    <i class="bx bx-left-arrow" /> BACK
                </vs-button>
            </vs-row>
        </section>

        <dialog-remark
            :active="dialogRemarkActive" 
            :closeDialog="closeDialogRemark"
            :callRefreshRemarkFunction="callRefreshRemarkFunction"
        />

        <dialog-messages
            :active="dialogMessageActive" 
            :closeDialog="closeDialogMessage"
            :callRefreshMessageFunction="callRefreshMessageFunction"
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

        "message-list": MessageList,
        "dialog-messages": DialogMessages,
    },
    data() {
        return {
            koli_number: this.$route.params.id,

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
            tempSearch: "",
            tempFrom: "",
            tempTo: "",
            pagination: {
                limit: 10,
                page_size: 1,
                page: 1
            },
            dialogRemarkActive: false,
            dialogMessageActive: false,

            dateRange: [],
        }
    },
    methods: {
        callRefreshRemarkFunction() {
            this.$refs.refreshRemark.refreshRemark();
        },
        callRefreshMessageFunction() {
            this.$refs.refreshMessage.refreshMessage();
        },
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

        updateValue(key, val) {
            this.dateRange = val || undefined
        },

        closeDialogRemark() {
            this.dialogRemarkActive = false
        },
        closeDialogMessage() {
            this.dialogMessageActive = false
        },
        print() {
            const routeData = this.$router.resolve({
                name: "printGeneral",
                params: {
                    id: this.koli_number,
                    type: "tracing",
                    node_id: this.listenNodeId,
                },
            });
            window.open(routeData.href, "_blank");
        },

        back() {
            this.$router.push("/irreguralities/tracing");
        },
        searchValue (val) {
            this.tempSearch = val
        },
        clearSearch() {
            this.$refs.searchInput.clear();
            this.dateRange = [];
        },
        activeTab(val) {
            this.navActive = val
            this.clearSearch()
            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title
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
<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3">
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
            </vs-col>
        </vs-row>

        <section class="nodes">
            <div class="box view">
                <div class="nav-box">
                    <vs-row justify="space-between">
                        <vs-col xs="6" sm="9" lg="9">
                            <nav-item :navItem="navItemm" @activeTab="activeTab" />
                        </vs-col>
                        <vs-col xs="6" sm="3" lg="3">
                            <search-input ref="searchInput" @searchValue="searchValue"/>
                        </vs-col>
                    </vs-row>
                </div>
                <template v-if="navActive === 'k-ALTERNATE-ADDRESS'">
                    <transition name="slide-fade">
                        <alternate-address :ref="navActive" :query="tempSearch"/>
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-NODES'">
                    <transition name="slide-fade">
                        <nodes :ref="navActive" :query="tempSearch"/>
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-NODES-COMMISION'">
                    <transition name="slide-fade">
                        <nodes-commision :ref="navActive" :query="tempSearch"/>
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-TYPES'">
                    <transition name="slide-fade">
                        <types :ref="navActive" :query="tempSearch"/>
                    </transition>
                </template>

            </div>
        </section>

        <dialog-create-edit-node 
            :active="dialogNode" 
            @refresh="refresh"
            :closeDialog="closeDialogNode"
            title="Create Node"
            />
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"

import AlternateAddress from "@/views/settings/nodes/alternateAddress"
import Nodes from "@/views/settings/nodes/nodes"
import NodesCommision from "@/views/settings/nodes/nodesCommision"
import Types from "@/views/settings/nodes/types"
import DialogCreateEditNode from "@/views/settings/nodes/nodes/dialogCreateEditNode"


export default {
    name:"nodes-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "alternate-address": AlternateAddress,
        "nodes": Nodes,
        "nodes-commision": NodesCommision,
        "types": Types,
        "dialog-create-edit-node": DialogCreateEditNode,
        // "role-list": RoleList,
        // "dialog-create-edit-user": DialogCreateEditUser,
        // "dialog-create-edit-role": DialogCreateEditRole
    },
    data() {
        return {
            navItemm: [
                {
                    label: "NODES",
                    key: "k-NODES",
                    title: "Nodes List"
                },
                {
                    label: "TYPES",
                    key: "k-TYPES",
                    title: "Types List"
                },
                {
                    label: "NODES COMMISION",
                    key: "k-NODES-COMMISION",
                    title: "Nodes Commision List"
                },
                {
                    label: "ALTERNATE ADDRESS",
                    key: "k-ALTERNATE-ADDRESS",
                    title: "Alternate Address List"
                },
            ],
            title:"Nodes",
            navActive: "k-NODES",
            tempSearch: "",
            dialogNode: false,
            dialogALTERNATEADDRESS: false,
            dialogNODESCOMMISION: false,
            dialogNodeType: false
        }
    },
    methods: {
        refresh(){
            let el = this.refreshInject
            this.$refs[el].refresh() // trigger function refresh form dari luar component list
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
            console.log(this.navActive)
            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title
        },
        openDialog(){
            switch(this.navActive) {
                case "k-NODES":
                    this.dialogNode = true
                    break;
                case "k-TYPES":
                    this.dialogNodeType = true
                    break;
                case "k-NODES-COMMISION":
                    this.dialogNODESCOMMISION = true
                    break;
                case "k-ALTERNATE-ADDRESS":
                    this.dialogALTERNATEADDRESS = true
                    break;
                default:
                    console.log('meong')
                    // code block
            }
            this.refreshInject = this.navActive
        },
        closeDialogNode() {
            this.dialogNode = false
        },
    },
}
</script>
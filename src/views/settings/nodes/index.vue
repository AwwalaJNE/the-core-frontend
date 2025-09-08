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
                            :data-testid="`create-button-${navActive}`"
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
                <template v-else-if="navActive === 'k-NODE-LINK'">
                    <transition name="slide-fade">
                        <node-link :ref="navActive" :query="tempSearch"/>
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-NODE-DELIVERY-AREA'">
                    <transition name="slide-fade">
                        <node-delivery-area :ref="navActive" :query="tempSearch"/>
                    </transition>
                </template>

            </div>
        </section>

        <dialog-create-edit-node 
            title="Create Node"
            :active="dialogNode" 
            :closeDialog="closeDialog"
            @refresh="refresh"            
        />
        <dialog-create-edit-node-type
            title="Create Node Type"
            :active="dialogNodeType" 
            :closeDialog="closeDialog"
            @refresh="refresh"
        />
        <dialog-create-edit-node-commision
            title="Create Node Commision"
            :closeDialog="closeDialog"
            :active="dialogNodeCommision" 
            @refresh="refresh"
        />
        <dialog-create-edit-alternate-address
            title="Create Alternate Address"
            :active="dialogAlternateAddress" 
            :closeDialog="closeDialog"
            @refresh="refresh"            
        />
        <dialog-create-edit-node-link
            title="Create Node Link"
            :active="dialogNodeLink"
            :closeDialog="closeDialog"
            @refresh="refresh"
            
        />
        <dialog-create-edit-node-delivery-area
            title="Create Node Delivery Area"
            :active="dialogNodeDeliveryArea"
            :closeDialog="closeDialog"
            @refresh="refresh"
        />
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"

import NodeLink from "@/views/settings/nodes/nodeLink"
import AlternateAddress from "@/views/settings/nodes/alternateAddress"
import Nodes from "@/views/settings/nodes/nodes"
import NodesCommision from "@/views/settings/nodes/nodesCommision"
import Types from "@/views/settings/nodes/types"
import NodeDeliveryArea from "@/views/settings/nodes/nodeDeliveryArea"
import DialogCreateEditNode from "@/views/settings/nodes/nodes/dialogCreateEditNode"
import DialogCreateEditNodeLink from "@/views/settings/nodes/nodeLink/dialogCreateEditNodeLink"
import dialogCreateEditNodeType from "@/views/settings/nodes/types/dialogCreateEditNodeType"
import dialogCreateEditNodeCommission from "@/views/settings/nodes/nodesCommision/dialogCreateEditNodeCommission"
import dialogCreateAltAddress from "@/views/settings/nodes/alternateAddress/dialogCreateAltAddress"
import DialogCreateEditNodeDeliveryArea from "@/views/settings/nodes/nodeDeliveryArea/dialogCreateEditNodeDeliveryArea"


export default {
    name:"nodes-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "alternate-address": AlternateAddress,
        "nodes": Nodes,
        "node-link": NodeLink,
        "nodes-commision": NodesCommision,
        "types": Types,
        "node-delivery-area": NodeDeliveryArea,
        "dialog-create-edit-node": DialogCreateEditNode,
        "dialog-create-edit-node-link": DialogCreateEditNodeLink,
        "dialog-create-edit-node-type": dialogCreateEditNodeType,
        "dialog-create-edit-node-commision":dialogCreateEditNodeCommission,
        "dialog-create-edit-alternate-address": dialogCreateAltAddress,
        "dialog-create-edit-node-delivery-area": DialogCreateEditNodeDeliveryArea
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
                {
                  label: "NODE LINK",
                  key: "k-NODE-LINK",
                  title: "Node Link"
                },
                {
                  label: "NODE DELIVERY AREA",
                  key: "k-NODE-DELIVERY-AREA",
                  title: "Node Delivery Area"
                },
            ],
            title:"Nodes",
            navActive: "k-NODES",
            tempSearch: "",
            dialogNode: false,
            dialogNodeLink: false,
            dialogAlternateAddress: false,
            dialogNodeCommision: false,
            dialogNodeType: false,
            dialogNodeDeliveryArea: false
        }
    },
    methods: {
        refresh(){
            let el = this.refreshInject
            this.$refs[el].refresh() // trigger function refresh form dari luar component list
        },
        searchValue (val) {
            this.tempSearch = val

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
        openDialog(){
            switch(this.navActive) {
                case "k-NODES":
                    this.dialogNode = true
                    break;
                case "k-TYPES":
                    this.dialogNodeType = true
                    break;
                case "k-NODES-COMMISION":
                    this.dialogNodeCommision = true
                    break;
                case "k-ALTERNATE-ADDRESS":
                    this.dialogAlternateAddress = true
                    break;
                case "k-NODE-LINK":
                  this.dialogNodeLink = true
                  break;
                case "k-NODE-DELIVERY-AREA":
                  this.dialogNodeDeliveryArea = true
                  break;
                default:

                    // code block
            }
            this.refreshInject = this.navActive
        },
        closeDialog() {
            switch(this.navActive) {
                case "k-NODES":
                    this.dialogNode = false
                    break;
                case "k-TYPES":
                    this.dialogNodeType = false
                    break;
                case "k-NODES-COMMISION":
                    this.dialogNodeCommision = false
                    break;
                case "k-ALTERNATE-ADDRESS":
                    this.dialogAlternateAddress = false
                    break;
                case "k-NODE-LINK":
                  this.dialogNodeLink = false
                  break;
                case "k-NODE-DELIVERY-AREA":
                  this.dialogNodeDeliveryArea = false
                  break;
                default:
                    // code block
            }
            this.refreshInject = this.navActive
        },
    },
}
</script>
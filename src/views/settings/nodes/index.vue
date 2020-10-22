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
                    <nav-item :navItem="navItemm" @activeTab="activeTab" />
                </div>
                <template v-if="navActive === 'k-ALTERNATE-ADDRESS'">
                    <transition name="slide-fade">
                        <alternate-address />
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-NODES'">
                    <transition name="slide-fade">
                        <nodes />
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-NODES-COMMISION'">
                    <transition name="slide-fade">
                        <nodes-commision />
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-TYPES'">
                    <transition name="slide-fade">
                        <types />
                    </transition>
                </template>

            </div>
        </section>
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"

import AlternateAddress from "@/views/settings/nodes/alternateAddress"
import Nodes from "@/views/settings/nodes/nodes"
import NodesCommision from "@/views/settings/nodes/nodesCommision"
import Types from "@/views/settings/nodes/types"


export default {
    name:"nodes-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "alternate-address": AlternateAddress,
        "nodes": Nodes,
        "nodes-commision": NodesCommision,
        "types": Types,
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
            navActive: "k-NODES"
        }
    },
    methods: {
        activeTab(val) {
            this.navActive = val
            console.log(this.navActive)
            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title
        },
        openDialog(){

        },
    },
}
</script>
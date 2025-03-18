<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="6" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{ title }}</h2>
                </div>
            </vs-col>
        </vs-row>
        <section>
            <vs-row justify="space-around">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center">
                    <div class="box view">
                        <vs-row justify="space-between">
                            <vs-col xs="12" sm="12" lg="6">
                                <nav-item 
                                    :navItem="navItem"
                                    @activeTab="activeTab"
                                />
                            </vs-col>
                        </vs-row>
                        <template v-if="navActive === 'origin'">
                            <receiving-log 
                                :ref="navActive"
                            />
                        </template>
                        <template v-if="navActive === 'destination'">
                            <receiving-log-dest 
                                :ref="navActive"
                            />
                        </template>
                    </div>
                </vs-col>
            </vs-row>
        </section>
    </div>
</template>

<script>
import master from "@/mixins/master"

import Breadcrumb from "@/components/breadcrumb/index";
import FloatingActionButton from "@/components/buttonCustom/floatingActionButton"
import NavItem from "@/components/navbar/navTab";
import SearchInput from "@/components/search/searchInput";
import SelectSearchBy from "@/components/search/selectSearchBy";

import ReceivingLog from "@/views/receivingLog/origin/";
import ReceivingLogDest from "@/views/receivingLog/destination/";

export default {
    name: "Receiving-Log",
    mixins: [master],
    components: {
        "breadcrumb": Breadcrumb,
        "floating-action-button": FloatingActionButton,
        "nav-item": NavItem,
        "search-input": SearchInput,
        "select-search-by": SelectSearchBy,
        "receiving-log": ReceivingLog,
        "receiving-log-dest": ReceivingLogDest
    },
    data() {
        return {
            navItem: [
                {
                    label: "ORIGIN",
                    key: "origin",
                    title: "Origin"
                },
                {
                    label: "DESTINATION",
                    key: "destination",
                    title: "Destination"
                }
            ],
            navActive: "origin",
            title: "Receiving Log"
        }
    },
    methods: {
        activeTab(val) {
            this.navActive = val;
            let item = this.navItem.filter(item => {
                return item.key == val;
            })
            this.title = item[0].title;
        },
    }
}
</script>
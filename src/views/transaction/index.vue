<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>New Transactions</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3">
            </vs-col>
        </vs-row>
        <section class="new-transaction mt-2">
            <vs-row justify="space-between">
                <vs-col xs="12" sm="9" lg="9">
                    <div>
                        <vs-row justify="space-between">
                            <vs-col xs="12" sm="6" lg="6">
                                <origin />
                            </vs-col>
                            <vs-col xs="12" sm="6" lg="6">
                                <destination />
                            </vs-col>
                        </vs-row>
                        <vs-row justify="space-between">
                            <vs-col xs="12" sm="12" lg="12">
                                
                            </vs-col>
                        </vs-row>
                    </div>
                </vs-col>
                <vs-col xs="12" sm="3" lg="3">
                    
                </vs-col>
            </vs-row>
        </section>
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import Breadcrumb from "@/components/breadcrumb/index"
import Origin from "@/views/transaction/origin"
import Destination from "@/views/transaction/destination"
export default {
    name: "new-transaction",
    mixins: [master],
    components: {
        "origin" : Origin,
        "destination" : Destination,
        "breadcrumb": Breadcrumb,
    },
}
</script>
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
                        <form-master ref="formMaster" @onSubmit="onSubmit">
                            <template v-slot:inputValidator>
                                <div>
                                    <vs-row justify="space-between">
                                        <vs-col xs="12" sm="6" lg="6">
                                            <origin />
                                        </vs-col>
                                        <vs-col xs="12" sm="6" lg="6">
                                            <destination />
                                        </vs-col>
                                    </vs-row>
                                    <vs-row justify="space-between" class="mb-2" style="margin-top:10px">
                                        <vs-col xs="12" sm="12" lg="12">
                                            <package />
                                        </vs-col>
                                    </vs-row>
                                </div>
                            </template>
                        </form-master>
                    </div>
                </vs-col>
                <vs-col xs="12" sm="3" lg="3">
                    <calc />
                </vs-col>
            </vs-row>
        </section>
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import FormMaster from "@/components/form/formMaster"
import Breadcrumb from "@/components/breadcrumb/index"
import Origin from "@/views/transaction/origin"
import Destination from "@/views/transaction/destination"
import Package from "@/views/transaction/package"
import Calc from "@/views/transaction/calc"
export default {
    name: "new-transaction",
    mixins: [master],
    components: {
        "form-master": FormMaster,
        "origin" : Origin,
        "destination" : Destination,
        "breadcrumb": Breadcrumb,
        "package": Package,
        "calc": Calc
    },
    methods: {
        onSubmit(refs){
            console.log('onsubmit form controller', refs)
                refs.form.validate().then(success => {
                    if (!success) {
                        console.log('err niih')
                        return;
                    }
                    // this.InputObject = this.$store.getters[this.listenGettersPrefix][this.listenTypeForm]
                    // this.Keys.map(item => {
                    //     // yg diambil key input
                    //     this.form[this.InputObject[item].key] = this.InputObject[item].value
                    // })
                    // this.$emit("formData", this.form)

                    // Wait until the models are updated in the UI
                    this.$nextTick(() => {
                        refs.form.reset();
                    });
                });
        },
    },
}
</script>
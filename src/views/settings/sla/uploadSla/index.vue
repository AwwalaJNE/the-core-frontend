<template>
    <div>
        <vs-row align="center">
            <vs-col xs="12" sm="6" lg="3" style="margin:0.5em 0">
                <vs-radio
                    v-model="radio_option"
                    val="koli">
                    SLA Koli
                </vs-radio>
            </vs-col>
            <vs-col xs="12" sm="6" lg="3" style="margin:0.5em 0">
                <vs-radio
                    v-model="radio_option"
                    val="inter-activity">
                    SLA Inter Activity
                </vs-radio>
            </vs-col>
            <vs-col xs="12" sm="6" lg="3" style="margin:0.5em 0">
                <vs-radio
                    v-model="radio_option"
                    val="node-a">
                    SLA Node to Node A
                </vs-radio>
            </vs-col>
            <vs-col xs="12" sm="6" lg="3" style="margin:0.5em 0">
                <vs-radio
                    v-model="radio_option"
                    val="node-b">
                    SLA Node to Node B
                </vs-radio>
            </vs-col>
        </vs-row>
        <template v-if="radio_option === 'koli'">
            <sla-koli/>
        </template>
        <template v-if="radio_option === 'inter-activity'">
            <sla-inter-activity/>
        </template>
        <template v-if="radio_option === 'node-a'">
            <sla-node-to-node-a/>
        </template>
        <template v-if="radio_option === 'node-b'">
            <sla-node-to-node-b/>
        </template>
    </div>
</template>
<script>
import master from "@/mixins/master"
import SlaKoli from "./slaKoli.vue"
import SlaInterActivity from './slaInterActivity.vue'
import SlaNodetoNodeA from './slaNodetoNodeA.vue'
import SlaNodetoNodeB from './slaNodetoNodeB.vue'
export default {
    name:"upload-transaction",
    mixins: [master],
    components: {
        "sla-koli": SlaKoli,
        "sla-inter-activity": SlaInterActivity,
        "sla-node-to-node-a": SlaNodetoNodeA,
        "sla-node-to-node-b": SlaNodetoNodeB,
    },
    data() {
        return {
            radio_option: "koli",
        }
    },
}
</script>
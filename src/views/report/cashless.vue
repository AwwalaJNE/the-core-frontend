<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>Cashless</h2>
                </div>
            </vs-col>
            <!-- <vs-col xs="6" sm="3" lg="3">
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
            </vs-col> -->
        </vs-row>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="6" lg="6">
                <div class="box">
                    <vs-table>
                        <template #thead>
                        <vs-tr>
                            <vs-th>
                            No
                            </vs-th>
                            <vs-th>
                            Connote
                            </vs-th>
                            <vs-th>
                            Valid
                            </vs-th>
                        </vs-tr>
                        </template>
                        <template #tbody>
                        <!-- <vs-tr
                            :key="i"
                            v-for="(tr, i) in users"
                            :data="tr"
                        >
                            <vs-td>
                            {{ tr.name }}
                            </vs-td>
                            <vs-td>
                            {{ tr.email }}
                            </vs-td>
                            <vs-td>
                            {{ tr.id }}
                            </vs-td>
                        </vs-tr> -->
                        <vs-tr>
                        </vs-tr>

                        </template>
                    </vs-table>
                </div>
            </vs-col>
            <vs-col xs="12" sm="6" lg="6">
                <div class="box">
                    <vs-row justify="flex-end">
                        <vs-col xs="6" sm="3" lg="3">
                            <h2>Information</h2>
                        </vs-col>
                    </vs-row>
                    <div style="text-align:left">
                        <h2>From</h2>
                    </div>
                    <div style="text-align:left">
                        <h2>To</h2>
                    </div>
                </div>
            </vs-col>
        </vs-row>
    </div>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb/index"
export default {
    name: "cashless",
    components: {
        "breadcrumb": Breadcrumb,
    },
    data() {
        return {
            keysData: [],
            ObjData: {},
            inputCode: ''
        }
    },
}
</script>
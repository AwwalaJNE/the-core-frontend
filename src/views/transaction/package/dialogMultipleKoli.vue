<template>
    <dialog-master 
    :actived="listenActive" 
    width="lg"
    :closeDialog="cancel">

        <template v-slot:header>
            Multiple Koli
        </template>

        <template v-slot:content>
            <div>
                <!-- <vs-table>
                    <template #thead>
                    <vs-tr>
                        <vs-th>
                        Name
                        </vs-th>
                        <vs-th>
                        Email
                        </vs-th>
                        <vs-th>
                        Id
                        </vs-th>
                    </vs-tr>
                    </template>
                    <template #tbody>
                    <vs-tr
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
                    </vs-tr>
                    </template>
                </vs-table> -->
            </div>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end" class="mt-2">
                <vs-col w="3">
                    <vs-button
                    transparent
                    block
                    danger
                    flat
                    :active="true"
                    @click="cancel"
                    >
                        Cancel
                    </vs-button>
                </vs-col>
                <vs-col w="3">
                    <vs-button
                    transparent
                    block
                    flat
                    :active="true"
                    type="submit"
                    @click="handleSubmit"
                    >
                        Submit
                    </vs-button>
                </vs-col>
            </vs-row>
                
                
        </template>

    </dialog-master>
</template>
<script>
import DialogMaster from "@/components/dialog/dialogMaster"
export default {
    name: "multiple-koli",
    components: {
        "dialog-master": DialogMaster,
    },
    props: {
        closeDialog: Function,
        active: Boolean,
        jumlah: 1
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenJumlah(){
            return this.jumlah
        }
    },
    data() {
        return {
            
        }
    },
    watch: {
        active: function(val) {
            if(val != undefined) {
                if(val == true) {
                    this.initialize()
                }
            }
        },
    },
    methods: {
        initialize() {

        }
    },
}
</script>
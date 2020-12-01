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
                <vs-table>
                    <template #thead>
                    <vs-tr>
                        <template v-for="(item, key) in tableHeader">
                            <vs-th :key="key">
                                {{item.label}}
                            </vs-th>
                        </template>
                        
                        <vs-th>
                            Action
                        </vs-th>
                    </vs-tr>
                    </template>
                    <template #tbody>
                        <template v-if="listKoli.length > 0">
                            <vs-tr
                                v-for="(item, key) in listKoli"
                                :key="key"
                                :data="item"
                            >
                                <template v-for="(item_h, i) in tableHeader">
                                    <vs-td
                                        :key="i"
                                    >
                                    <input-general 
                                        :name="''" 
                                        :rules="InputObject['package_dimensi_width'].rule" 
                                        :formKey="InputObject['package_dimensi_width'].key"
                                        :valueData="InputObject['package_dimensi_width'].value"
                                        :typeInput="koliinput"
                                        @updateValue="updateValue" />
                                    </vs-td>
                                </template>
                                
                                
                            </vs-tr>
                        </template>
                    </template>
                </vs-table>
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
import InputGeneral from "@/components/input/general"
export default {
    name: "multiple-koli",
    components: {
        "dialog-master": DialogMaster,
        "input-general": InputGeneral,
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
        },
        listenConnoteKoliItem () {
            return this.$store.getters.getTransaction.connote_koli_item
        },
    },
    data() {
        return {
            koliData: this.$store.getters['getTransaction']['template_koli'],
            listKoli: [],
            tableHeader: [
                {
                    label: 'No.',
                    key: 'no'
                },
                {
                    label: 'Weight',
                    key: 'weight'
                },
                {
                    label: 'Length',
                    key: 'length'
                },
                {
                    label: 'Width',
                    key: 'width'
                },
                {
                    label: 'Height',
                    key: 'height'
                },
                {
                    label: 'Volume Weight',
                    key: 'volume_weight'
                },
                {
                    label: 'Surcharge (s)',
                    key: 'surcharge_id'
                },
                {
                    label: 'Description',
                    key: 'description'
                },
            ],

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
        listenJumlah: function (val) {
            if(val != undefined) {
                this.initialize()
            }
        }
    },
    methods: {
        initialize() {
            let jumlah = this.listenJumlah
            this.listKoli = this.listenConnoteKoliItem


            // for(let i=0; i < jumlah; i++) {
                
            // }
            
        },
        cancel() {
            this.closeDialog()
        },
        handleSubmit() {
            
            this.closeDialog()
        }
    },
}
</script>
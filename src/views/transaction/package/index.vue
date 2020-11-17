<template >
    <div class="box">
        <div class="con-form">
            <form-master ref="formMaster" @onSubmit="onSubmit">
                <template v-slot:inputValidator>
                    <vs-row justify="center">
                        <vs-col xs="12" md="6" lg="6">
                            <div>
                                <vs-row v-for="(item, keys) in keysLeft" :key="keys">
                                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
                                        <template v-if="InputObject[item].typeInput.toLowerCase().includes('text')">
                                            <input-general 
                                            :name="InputObject[item].label" 
                                            :rules="InputObject[item].rule" 
                                            :formKey="InputObject[item].key"
                                            :valueData="InputObject[item].value"
                                            :typeInput="InputObject[item].typeInput"
                                            @updateValue="updateValue" />
                                        </template>
                                    </vs-col>
                                </vs-row>
                            </div>
                        </vs-col>
                        <vs-col xs="12" md="6" lg="6">
                            <div>
                                <vs-row v-for="(item, keys) in keysRight" :key="keys">
                                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
                                        <template v-if="InputObject[item].typeInput.toLowerCase().includes('text')">
                                            <input-general 
                                            :name="InputObject[item].label" 
                                            :rules="InputObject[item].rule" 
                                            :formKey="InputObject[item].key"
                                            :valueData="InputObject[item].value"
                                            :typeInput="InputObject[item].typeInput"
                                            @updateValue="updateValue" />
                                        </template>
                                    </vs-col>
                                </vs-row>
                            </div>
                        </vs-col>
                    </vs-row>
                </template>
            </form-master>
        </div>
    </div>
</template>
<script>
import FormMaster from "@/components/form/formMaster"
import InputGeneral from "@/components/input/general"
import Selector from "@/components/input/select"
import Switch from "@/components/input/switch"
export default {
    name: "package-information",
    components: {
        "form-master": FormMaster,
        "input-general": InputGeneral,
        "selector": Selector,
        "switchNih": Switch,
    },
    data() {
        return {
            keysLeft: [],
            keysRight: [],
            InputObject: {},
            form: {}
        }
    },
    computed: {
        listen_package_category_arrData() {
            return this.$store.getters['getTransaction']['package']
        }
    },
    methods: {
        initialize() {
            let obj = this.$store.getters['getTransaction']['package'] || {}
                if (Object.keys(obj).length > 0) {
                    let keys = Object.keys(obj)
                    keys.map(item => {
                        if(obj[item].typeInput.includes('col_left')) {
                            this.keysLeft.push(item)
                        } else if(obj[item].typeInput.includes('col_right')) {
                            this.keysRight.push(item)
                        }
                    })
                    this.InputObject = obj
                    console.log('ini inputObject', this.InputObject, this.keysLeft, this.keysRight)
                } else {
                    this.keysLeft = []
                    this.keysRight = []
                    this.InputObject = {}
                }
        },
    },
    mounted() {
        this.initialize()
    },
}
</script>
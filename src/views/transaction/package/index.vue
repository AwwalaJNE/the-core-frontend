<template >
    <div class="box">
        <div class="con-form form-package">
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
                                        <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('select')">
                                            <p>{{InputObject[item].label}}</p>
                                            <template>
                                                <selector 
                                                :ref="InputObject[item].key"
                                                :name="''" 
                                                :rules="InputObject[item].rule" 
                                                :formKey="InputObject[item].key"
                                                :valueData="InputObject[item].arrData"
                                                :selectedValue="InputObject[item].value"
                                                :isMultiple="false"
                                                @updateValue="updateValue" />
                                            </template>
                                        </template>
                                        <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('radio')">
                                            <p>{{InputObject[item].label}}</p>
                                            <template v-if="InputObject[item].arrData.length > 0">
                                                <radio 
                                                :ref="InputObject[item].key"
                                                :name="''" 
                                                :rules="InputObject[item].rule" 
                                                :formKey="InputObject[item].key"
                                                :valueData="InputObject[item].arrData"
                                                :selectedValue="InputObject[item].value"
                                                @updateValue="updateValue" />
                                            </template>
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
                                        <template v-else-if="InputObject[item].typeInput.toLowerCase().includes('row')">
                                            <vs-row justify="center">
                                                <template v-if="InputObject[item].input.length > 0">
                                                    <vs-col xs="12" :w="InputObject[item]['col']" v-for="(inp, i) in InputObject[item].input" :key="i">
                                                        <input-general 
                                                        :name="inp.label" 
                                                        :rules="inp.rule" 
                                                        :formKey="inp.key"
                                                        :valueData="inp.value"
                                                        :typeInput="inp.typeInput"
                                                        @updateValue="updateValue" />
                                                    </vs-col>
                                                </template>
                                            </vs-row>
                                        </template>
                                    </vs-col>
                                </vs-row>
                            </div>
                        </vs-col>
                    </vs-row>
        </div>
    </div>
</template>
<script>
import FormMaster from "@/components/form/formMaster"
import InputGeneral from "@/components/input/general"
import Selector from "@/components/input/select"
import Switch from "@/components/input/switch"
import Radio from "@/components/input/radio"
export default {
    name: "package-information",
    components: {
        "form-master": FormMaster,
        "input-general": InputGeneral,
        "selector": Selector,
        "switchNih": Switch,
        "radio": Radio,
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
        updateValue() {}
    },
    mounted() {
        this.initialize()
    },
}
</script>
<style lang="scss">
    .form-package{
        text-align: left;
        p{
            margin: .5em;
            font-size: 14px;
        }
    }
</style>
<template>
    <div>
        <template v-for="(item,key) in inputArray">
            <vs-row justify="space-between" :key="key">
                <vs-col xs="12" sm="6" lg="6">
                    <!-- <selector 
                        :ref="item.key"
                        :name="InputObject[item].label" 
                        :rules="InputObject[item].rule" 
                        :formKey="InputObject[item].key"
                        :valueData="InputObject[item].arrData"
                        :selectedValue="InputObject[item].value"
                        :isMultiple="false"
                        @updateValue="updateValue" /> -->
                </vs-col>
                <vs-col xs="12" sm="6" lg="6">
                            
                </vs-col>
            </vs-row>
        </template>
    </div>
</template>
<script>
import InputGeneral from "@/components/input/general"
import Selector from "@/components/input/select"
export default {
    name: "iterate-selector",
    props: {
        inputList: [],
        getters: '',
        typeForm: ''
    },
    components: {
        "input-general": InputGeneral,
        "selector": Selector,
    },
    data() {
        return {
            inputArray: [],
            input: {},
            InputObject: {},
            Keys: [],
        }
    },
    computed: {
        listenGettersPrefix() {
            return this.getters || 'getInputs' // defaultnya akan mengarah ke global input getters
        },
        listenTypeForm() {
            return this.typeForm
        }
    },
    watch: {
        typeForm: function(val) {
            if(val !== undefined) {
                this.initialize()
            }
        }
    },
    methods: {
        initialize(){
            let obj = this.$store.getters[this.listenGettersPrefix][this.listenTypeForm] || {}
                if (Object.keys(obj).length > 0) {
                    let keys = Object.keys(obj)
                    this.InputObject = obj

                    keys.length > 0 && keys.map(item => {
                        
                           if(this.InputObject[item].hasOwnProperty('typeInput') && 
                               this.InputObject[item]['typeInput'].includes('IterateSelector')) {

                                   let inputObj = {}
                                   inputObj['label'] = this.InputObject[item]['label']
                                   inputObj["value"] = item

                                   this.Keys.push(inputObj)
                           }
                        
                    })

                    // inputan pertama
                    this.inputArray.push(this.Keys[0])

                    console.log('iterate-selector ', this.Keys)
                } else {
                    this.InputObject = {}
                }
        },
        addInputArray() {
            this.inputArray = [...this.inputArray, this.input]
        },
        removeInputArray(index) {
            this.inputArray.splice(index, 1)
        }
    },
    mounted() {
        this.initialize()
    },
}
</script>
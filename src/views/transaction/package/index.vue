<template >
    <div class="box">
        <div class="con-form">
            <form-master ref="formMaster" @onSubmit="onSubmit">
                <template v-slot:inputValidator>
                    <vs-row justify="center">
                        <vs-col xs="12" md="6" lg="6">
                            <div>
                                <input-general 
                                :name="InputObject[item].label" 
                                :rules="InputObject[item].rule" 
                                :formKey="InputObject[item].key"
                                :valueData="InputObject[item].value"
                                :typeInput="InputObject[item].typeInput"
                                @updateValue="updateValue" />
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
    methods: {
        initialize() {
            let obj = this.$store.getters['getTransaction'][package] || {}
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
}
</script>
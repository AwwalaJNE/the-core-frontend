<template>
    <inputan :name="name" :rules="rules">
        <template v-slot:inputan="props">
            <vs-select
                class="m-select"
                filter
                :multiple="listenIsMultiple"
                :placeholder="name"
                v-model="value"
                @change="updateValue"
                :state="props.err !== undefined && props.err !== '' ?'danger':'gray'"
            >
                <template v-if="DataArr.length > 0">
                    <vs-option 
                    v-for="(item,key) in DataArr"
                    :key="key"
                    :label="item.label" 
                    :value="item.value">
                        {{item.label}}
                    </vs-option>
                </template>
                
            </vs-select>
        </template>
    </inputan>
    
</template>
<script>
import Inputan from "@/components/input/inputan"
export default {
    name:"select-filter",
    components: {
        "inputan": Inputan
    }, 
    props: {
        name: String,
        rules: String,
        valueData: Array,
        selectedValue: [Array, String, Number],
        formKey: String,
        isMultiple: Boolean
    },
    data() {
        return {
            DataArr: this.valueData,
            value: this.selectedValue ? this.selectedValue :"",
            arrValue: this.selectedValue ? this.selectedValue : [],
            ooo: ""
        }
    },
    computed: {
        listenFormKey(){
            return this.formKey
        },
        listenIsMultiple(){
            return this.isMultiple ? this.isMultiple : false
        }
    },
    watch: {
        valueData: function (val) {
            if (val != undefined) {
                this.DataArr = val
            }
        },
        selectedValue: function (val) {
            if (val != undefined) {
                if(this.isMultiple == false) {
                    this.value = val
                } else {
                    this.arrValue = val
                }
            }
        }
    },
    methods: {
        updateValue(val){
            if(this.isMultiple == false) {
                this.$emit("updateValue", this.listenFormKey, val)
            } else {
                this.$emit("updateValue", this.listenFormKey, val)
            }
        }
    },
}
</script>
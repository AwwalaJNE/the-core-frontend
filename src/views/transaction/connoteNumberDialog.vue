<template>
    <div>
        <dialog-master 
        :actived="listenActive" 
        width="md"
        ref="cust"
        :closeDialog="cancel">

            <template v-slot:header>
                <h3>{{`Add ${listenType !== 'pra' ?'Pra' : ''} Connote Number`}}</h3>
            </template>

            <template v-slot:content>
                <div> 
                    <form v-on:submit.prevent="submit">
                        <input-general 
                        :name="`${listenType !== 'pra' ?'Pra' : ''} Connote Number`" 
                        rules="" 
                        :formKey="listenType"
                        :valueData="value"
                        :focusToInput="listenActive == true"
                        typeInput="text"
                        :tabindex="1"
                        ref="labelInput"
                        @updateValue="updateValue" />
                    </form>
                    <!-- <input type="text" ref="test" :autofocus="true"> -->
                </div>
            </template>
        </dialog-master>
        
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master"
import DialogMaster from "@/components/dialog/dialogMaster"
import InputGeneral from "@/components/input/general"
export default {
    name: "connote-number-dialog",
    mixins: [master],
    components: {
        "dialog-master": DialogMaster,
        "input-general": InputGeneral,
    },
    props: {
        closeDialog: Function,
        active: Boolean,
        title: String,
        type: String
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenType() {
            return this.type
        }
    },
    watch: {
        active: function (val) {
            if (val == true) {
                const cust = this.$refs.cust
                let el = cust.$scopedSlots.content()
                let self = this
                this.$nextTick(() => {
                    // el[0].context.$refs.test.value = 'aaa'
                    // console.log('input', el[0].context.$refs)
                //     // this.$refs.theInput.focus();
                    // console.log('el', el[0].context.$refs.labelInput.$refs.generalInput)
                    // el[0].context.$refs.labelInput.$refs.generalInput.focus()

                    
                    // let inputEl = el[0].context.$refs.labelInput.$refs.generalInput.$el.querySelector('input')
                    // console.log('input', inputEl)
                    // inputEl.focus();
                    
                });
                
                //  el[0].children[1].focus();
            }
        }
    },
    data() {
        return {
            key: '',
            value: ''
        }
    },
    methods: {
        updateValue(key, value, value2) {
            if(value) {
                this.value = value
            }
        },
        cancel() {
            this.closeDialog()
        },
        submit() {
            let action = `SET_${this.listenType == 'pra' ? 'PRA':'SINGLE'}_CONNOTE_NUMBER`
            this.$store.dispatch("action", this.value)
            this.$nextTick(() => {
                this.closeDialog()
            })
        }
    },
}
</script>
<style lang="scss">
    .coba{
        &:focus{
            color: red;
        }
    }
</style>
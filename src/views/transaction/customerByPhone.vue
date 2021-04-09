<template>
    <div>
        <dialog-master 
        :actived="listenActive" 
        width="md"
        ref="cust"
        :closeDialog="cancel">

            <template v-slot:header>
                <h3>{{`Search by ${type !== 'detination' ?'JLC/Corp ID/' : ''}Phone`}}</h3>
            </template>

            <template v-slot:content>
                <div> 
                    <form v-on:submit.prevent="submit">
                        <input-general 
                        :name="`${type !== 'detination' ?'JLC/Corp ID/' : ''}Phone`" 
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
    name: "get-customer-by-phone",
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
                    // setTimeout(function(){ el[0].context.$refs.labelInput.$refs.generalInput.focus() }, 3000);
                    

                    
                    let inputEl = el[0].context.$refs.labelInput.$refs.generalInput.$el.querySelector('input')
                    // inputEl.focus();
                    setTimeout(function(){ inputEl.focus(); }, 100);
                    
                    
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
        ooo(){
            console.log('blur')
        },
        async submit() {

            await axios
                .get(
                    this.URL.search_customer_code + `?n=${this.listenNodeId}&customer_code=${this.value}`,
                    this.Helper.header())
                .then(res => {
                    console.log('res', res)
                    if(res.status == 200) {
                        let data = res.data.data
                        this.$emit("updateValue", this.listenType, data, null,this.value)
                        this.closeDialog()
                    }
                }).catch(err => {
                    this.checkAuth(err.response.status)
                    this.closeDialog()
                    // this.loading = false
                    // this.handleClearForm()
                    // this.closeDialog()
                    // this.$emit("refresh")
                    this.openNotification('danger', 'Message :', err.response ? err.response.data.message : 'something went wrong')
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
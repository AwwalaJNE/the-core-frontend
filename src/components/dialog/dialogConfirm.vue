<template>
    <dialog-master 
    :actived="listenActive" 
    :closeDialog="closeDialog">

        <template v-slot:header>
            {{listenTitle}}
        </template>

        <template v-slot:content>
            <div>
                <p>{{listenMessage}}</p>
            </div>
        </template>

        <template v-slot:footer>
            <vs-row justify="flex-end">
                <vs-col w="3">
                    <vs-button
                    transparent
                    block
                    danger
                    flat
                    :active="true"
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
                    @click="confirm"
                    >
                        Ok
                    </vs-button>
                </vs-col>
            </vs-row>
                
                
        </template>

    </dialog-master>
</template>
<script>
import dialogMaster from "@/components/dialog/dialogMaster"
export default {
    name: "dialog-confirm",
    components: {
        "dialog-master": dialogMaster
    },
    props: {
        closeDialog: Function,
        active: Boolean,
        title: String,
        message: String
    },
    computed: {
        listenActive(){
            return this.active
        },
        listenTitle(){
            return this.title
        },
        listenMessage() {
            return this.message
        }
    },
    methods: {
        confirm() {
            this.$emit("confirm",true)
        }
    },
}
</script>
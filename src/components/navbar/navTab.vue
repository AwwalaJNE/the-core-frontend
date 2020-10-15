<!--
    - @desc component navigation tab yg reusable
    - @param -
    - @emit {
        - activeTab | trigger show component yg active | payload = key tab
    }
    - @props {
        - navItem | type = Array Object | 
            ex: [
                {
                    label: "item label",
                    key: "key" // usahakan uniq jika ada lebih dari 1 navtab dalam 1 page
                },
                ...
            ]
    }
-->

<template>
    <div class="left">
        <vs-navbar left-collapsed v-model="active" @input="activeTab">
            <vs-navbar-item 
            v-for="(item,key) in listenNavItem"
            :key="key"
            :active="active == item.key" 
            :id="item.key"
            >
            {{item.label}}
            </vs-navbar-item>
        </vs-navbar>
    </div>
</template>
<script>
export default {
    name:"navbarTab",
    props: {
        navItem: Array
    },
    computed: {
        listenNavItem() {
            return this.navItem
        }
    },
    data() {
        return {
            active: this.navItem[0].key
        }
    },
    methods: {
        activeTab(val){
            // console.log(val)
            this.$emit("activeTab", val);
        }
    },
}
</script>
<style lang="scss">
    .vs-navbar-content{
        position: relative !important;
        margin-bottom: 1.5em;
    }
</style>
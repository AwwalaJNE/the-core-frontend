<template>
    <div class="searchbox">
        <vs-input icon-after v-model="value" autocomplete="chrome-off" :placeholder="listenPlaceholder" @change="searchValue">
            <template #icon>
                <i class='bx bx-search' @click="clear"></i>
            </template>
        </vs-input>
    </div>
</template>
<script>
export default {
    name:"search-input",
    props: {
        placeholder: String,
    },
    data() {
        return {
            value: ""
        }
    },
    computed: {
        listenPlaceholder() {
            return this.placeholder || "";
        }
    },
    methods: {
        searchValue(){
            this.$emit("searchValue",this.value)
        },
        clear() {
            this.value = ""
            this.$emit("searchValue",this.value)
        }
    },
}
</script>
<style lang="scss">
    .searchbox{
        .vs-input-content{
            position: relative;
            max-width: 200px;
            display: flex;
            align-self: flex-end;
        }
        .clear{
            position: absolute;
            right: 35px;
            width: 35px;
            top: 0;
            height: 100%;
        }
    }
</style>
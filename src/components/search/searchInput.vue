<template>
    <div class="searchbox">
        <vs-input
            icon-after
            v-model="value"
            autocomplete="chrome-off"
            :placeholder="listenPlaceholder"
            :type="isNumeric ? 'number' : 'text'"
            @change="searchValue"
            @focus="onFocus"
            @blur="onBlur"
            @keyup.enter="handleSearch"
        >
        </vs-input>
        <button click="test">
            <i class='bx bx-search search-input-icon' @click="searchValue"></i>
        </button>
    </div>
</template>
<script>
export default {
    name:"search-input",
    props: {
        placeholder: String,
        isNumeric: Boolean,
    },
    data() {
        return {
            value: ""
        }
    },
    computed: {
        listenPlaceholder() {
            return this.placeholder || "Search";
        }
    },
    methods: {
        searchValue(){
            this.$emit("searchValue",this.value)
        },
        clear() {
            this.value = ""
        },
        onFocus() {
            this.value = ""
        },
        onBlur() {
            if (!this.value) {
                setTimeout(() => {
                    this.searchValue()
                }, 1000);
            }
        },
        handleSearch() {
            this.searchValue()
            this.$emit("handleSearch")
        }
    },
}
</script>
<style lang="scss">
    .searchbox{
        position: relative;
        .vs-input-content{
            position: relative;
            max-width: 200px;
            display: flex;
            align-self: flex-end;
            label {
                margin-left: 5px;
            }
        }
        button {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            box-shadow: -12px 0 10px -10px rgba(0,0,0,0.1);
            i {
                margin-top: 5px;
            }
            padding: 0 10px;
            border: none;
            background: rgba(var(--vs-gray-2), 1);
            outline: 2px solid rgba(var(--vs-gray-2), 1);
            border-radius: 10px;
        }
    }
</style>
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
        <vs-navbar
            right-collapsed
            :value="currentActive"
            @input="activeTab"
            style="z-index: 9;"
        >
            <template #left>
                <vs-navbar-item 
                    v-for="(item, key) in listenNavItem"
                    :key="key"
                    :active="currentActive === item.key"
                    :id="item.key"
                    :class="item.key"
                >
                    {{ item.label }}
                </vs-navbar-item>
            </template>
        </vs-navbar>
    </div>
</template>

<script>
export default {
    name: "navbarTab",
    props: {
        navItem: {
            type: Array,
            required: true
        },
        value: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            internalActive: this.navItem?.[0]?.key ?? null
        };
    },
    computed: {
        listenNavItem() {
            return this.navItem;
        },
        currentActive: {
            get() {
                return this.value !== null ? this.value : this.internalActive;
            },
            set(val) {
                if (this.value !== null) {
                    this.$emit("input", val);
                } else {
                    this.internalActive = val;
                }
            }
        }
    },
    methods: {
        activeTab(val) {
            this.currentActive = val;
            this.$emit("activeTab", val);
        }
    }
};
</script>

<style lang="scss">
    .vs-navbar-content {
        position: relative !important;
        margin-bottom: 1.5em;
    }
</style>
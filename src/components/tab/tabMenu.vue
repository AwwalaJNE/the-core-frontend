<template>
    <vs-row style="padding: 1rem 0;">
        <button
            v-if="canScrollLeft"
            class="scroll-btn left"
            @click="scrollTabs(-150)"
        >
            <i class='bx bx-chevrons-left' ></i>
        </button>

        <div class="tab-container" ref="tabContainer" @scroll="updateScrollButtons">
            <router-link
                v-for="(item, key) in listenTab"
                :key="key"
                :to="item.url"
                :class="['tab', { active: isActive === item.url }]"
                @click.native="handleSelect(item.url)"
            >
                <i :class="`${item.icon}`" /> {{ item.label }}
            </router-link>
        </div>
        
        <button
            v-if="canScrollRight"
            class="scroll-btn right"
            @click="scrollTabs(150)"
        >
            <i class='bx bx-chevrons-right'></i>
        </button>
    </vs-row>
</template>

<script>
export default {
    name: "tab-menu",
    props: {
        tab: Array
    },
    computed: {
        listenTab() {
            return this.tab || [];
        }
    },
    data() {
        return {
            isActive: "",
            canScrollLeft: false,
            canScrollRight: false,
        };
    },
    watch: {
        '$route.path'() {
            this.updateActiveTabFromRoute();
        }
    },
    methods: {
        handleSelect(key) {
            this.isActive = key;
        },
        updateScrollButtons() {
            const el = this.$refs.tabContainer;
            this.canScrollLeft = el.scrollLeft > 5;
            this.canScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 5;
        },
        scrollTabs(offset) {
            this.$refs.tabContainer.scrollBy({ left: offset, behavior: "smooth" });
        },
        updateActiveTabFromRoute() {
            const currentPath = this.$route.path;
            const match = this.listenTab.find(tab => tab.url === currentPath);
            this.isActive = match ? match.url : "";
        }
    },
    mounted() {
        this.updateActiveTabFromRoute();
        this.updateScrollButtons();
        window.addEventListener("resize", this.updateScrollButtons);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.updateScrollButtons);
    },
};
</script>

<style lang="scss" scoped>
.tab-container {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-behavior: smooth;
    width: max-content;
    padding: 4px;
    scrollbar-width: none; /* Firefox */
    background-color: white;
    border-radius: 9999px;
}

.tab-container::-webkit-scrollbar {
    display: none; // Chrome/Safari
}

.tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
    padding: 6px 14px;
    font-size: 14px;
    font-weight: 800;
    color: #1a1a1a;
    transition: all 0.2s ease-in-out;
    white-space: nowrap;

    &:hover {
        cursor: pointer;
        border-radius: 9999px;
        background-color: rgba(0, 0, 0, 0.05);
    }

    &.active {
        border-radius: 9999px;
        background-color: #F3F7FF;
        color: #195BFF;
    }
}

.scroll-btn {
    margin: 0 4px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.95);
    border: none;
    font-size: 20px;
    cursor: pointer;
    border-radius: 999px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
    transition: background 0.2s ease;

    &:hover {
        background: white;
    }

    &.left {
        left: 0;
    }
    &.right {
        right: 0;
    }
}
</style>

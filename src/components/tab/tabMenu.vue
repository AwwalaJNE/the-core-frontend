<template>
    <vs-row style="padding: 1rem 0;">
        <button
            v-if="canScrollLeft"
            class="scroll-btn left"
            @click="scrollTabs(-150)"
        >
            ‹
        </button>

        <div class="tab-container" ref="tabContainer" @scroll="updateScrollButtons">
            <div
                v-for="(item, key) in listenTab"
                :key="key"
                :class="['tab', { active: isActive === item.url }]"
                @click="handleSelect(item.url)"
            >
                {{ item.label }}
            </div>
        </div>
        
        <button
            v-if="canScrollRight"
            class="scroll-btn right"
            @click="scrollTabs(150)"
        >
            ›
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
    },
    mounted() {
        if (this.arrData.length) {
            this.isActive = this.arrData[0].url;
        }
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
    flex: 1;
    padding: 4px;
    scrollbar-width: none; // Firefox
}
.tab-container::-webkit-scrollbar {
    display: none; // Chrome/Safari
}

.tab {
    flex-shrink: 0;
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 500;
    background-color: white;
    color: #1a1a1a;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;
    white-space: nowrap;

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
    }

    &.active {
        background-color: #F3F7FF;
        color: #195BFF;
        box-shadow: 0 0 6px rgba(0, 123, 255, 0.5);

        &:hover {
            box-shadow: 0 0 8px rgba(0, 123, 255, 0.6);
        }
    }
}

.scroll-btn {
    position: absolute;
    z-index: 1;
    width: 28px;
    background: rgba(255, 255, 255, 0.95);
    border: none;
    font-size: 20px;
    cursor: pointer;
    border-radius: 999px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
    transition: background 0.2s ease;
    align-self: center;

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

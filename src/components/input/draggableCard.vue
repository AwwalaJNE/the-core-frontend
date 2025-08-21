<template>
    <vs-row style="gap: 20px;">
        <vs-col>
            <template v-if="cardType === 'transit-card'">
                <div
                    v-for="(item, idx) in DataArr.filter(item => item.transit_at)"
                    :key="item.id || idx"
                    class="card-wrapper disabled-item"
                >
                    <transit-card :data="item" :isDisabled="true" />
                </div>

                <draggable
                    v-model="draggableItems"
                    :options="dragOptions"
                    @start="drag = true"
                    @end="onDragEnd"
                >
                <transition-group tag="div" name="flip-list" :css="!drag">
                    <div
                        v-for="(item, idx) in draggableItems"
                        :key="item.id || idx"
                        class="card-wrapper"
                    >

                    <div v-if="listenRemoveButton" class="drag-button">
                        <img src="@/assets/svg/dot-menu.svg" />
                    </div>

                    <div
                        v-if="listenRemoveButton"
                        class="remove-button"
                        @click.stop="remove(item.bag_transit_route_id)"
                    >
                        <i class="bx bx-trash"></i>
                    </div>

                    <transit-card :data="item" :isDisabled="false" />
                    </div>
                </transition-group>
                </draggable>
            </template>

            <template v-else>
                <p>Type Not Found</p>
            </template>
        </vs-col>
    </vs-row>
</template>

<script>
import draggable from "vuedraggable";
import TransitCard from "@/components/card/transitCard";

export default {
    name: "draggable-card",
    components: { draggable, "transit-card": TransitCard },
    props: {
        cardType: String,
        valueData: Array,
        isRemoveButton: Boolean,
    },
    data() {
        return {
            DataArr: this.valueData || [],
            drag: false,
        };
    },
    watch: {
        valueData(newVal) {
            this.DataArr = newVal;
        },
    },
    computed: {
        listenRemoveButton() {
            return this.isRemoveButton || false;
        },
        draggableItems: {
            get() {
                return this.DataArr.filter(item => !item.transit_at);
            },
            set(newOrder) {
                const transitItems = this.DataArr.filter(item => item.transit_at);
                this.DataArr = [...transitItems, ...newOrder];
            },
        },
        dragOptions() {
            return {
                animation: 200,
                ghostClass: "ghost",
                handle: ".drag-button",
                filter: ".disabled-item",
                preventOnFilter: false,
            };
        },
    },
    methods: {
        remove(id) {
            this.$emit("remove", id);
        },
        onDragEnd() {
            this.drag = false;
            this.$emit("update-order", this.DataArr);
        },
    },
};
</script>

<style scoped lang="scss">
.flip-list-move {
    transition: transform 0.5s;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.disabled-item {
    cursor: default;
}

.card-wrapper {
    position: relative;
    margin-bottom: 15px;
}

::v-deep .drag-button {
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translate(-50%, -50%);
    font-size: 30px;
    z-index: 2;
    cursor: grab;
}

::v-deep .remove-button {
    position: absolute;
    top: 50%;
    right: 0%;
    transform: translate(-50%, -50%);
    font-size: 30px;
    z-index: 2;
    cursor: pointer;
    padding: 0 10px;
}

::v-deep .remove-button:hover {
    color: darkgrey;
}
</style>

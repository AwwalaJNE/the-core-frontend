<template>
    <vs-row style="gap: 20px;">
        <vs-col
            v-for="(item, index) in DataArr"
            :key="index"
        >
            <div 
                v-if="cardType === 'transit-card'"
                :style="{ cursor: item.transit_at ? 'default' : 'grab' }"
                :draggable="!item.transit_at"
                @dragstart="!item.transit_at && dragStart(index)"
                @dragover.prevent
                @drop="drop(index)"
            >
                
                <div class="drag-button" :style="{ cursor: item.transit_at ? 'not-allowed' : 'grab' }">
                    <img src="@/assets/svg/dot-menu.svg" />
                </div>
                <div
                    v-if="listenRemoveButton && !item.transit_at"
                    class="remove-button"
                    @click.stop="remove(item.bag_transit_route_id)"
                >
                    <i class="bx bx-trash"></i>
                </div>

                <transit-card :data="item" :isDisabled="!!item.transit_at" />
            </div>
            <div v-else>
                <p>Type Not Found</p>
            </div>
        </vs-col>
    </vs-row>
</template>

<script>
import Inputan from "@/components/input/inputan";
import InputGeneral from "@/components/input/general";
import TransitCard from "@/components/card/transitCard";

export default {
    name: "draggable-card",
    components: {
        inputan: Inputan,
        "input-general": InputGeneral,
        "transit-card": TransitCard
    },
    props: {
        cardType: String,
        valueData: Array,
        isRemoveButton: Boolean
    },
    data() {
        return {
            DataArr: this.valueData || [],
            dragIndex: null
        };
    },
    watch: {
        valueData: {
            handler(newVal) {
                this.DataArr = newVal;
            },
            deep: true
        }
    },
    computed: {
        listenRemoveButton() {
            return this.isRemoveButton || false;
        }
    },
    methods: {
        remove(id) {
            this.$emit("remove", id);
        },
        dragStart(index) {
            this.dragIndex = index;
        },
        drop(dropIndex) {
            const movedItem = this.DataArr[this.dragIndex];
            this.DataArr.splice(this.dragIndex, 1);
            this.DataArr.splice(dropIndex, 0, movedItem);
            this.dragIndex = null;
            
            this.$emit("update-order", this.DataArr);
        }
    }
};
</script>

<style lang="scss" scoped>
::v-deep .drag-button {
    color: #909399;
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translate(-50%, -50%);
    font-size: 30px;
    z-index: 2;
    transition: color 0.2s ease;
}


::v-deep .remove-button {
    color: #909399;
    position: absolute;
    top: 50%;
    right: 0%;
    transform: translate(-50%, -50%);
    font-size: 30px;
    z-index: 2;
    cursor: pointer;
    transition: color 0.2s ease;
    padding: 0 10px;
}

::v-deep .remove-button:hover {
    color: darkgrey;
}

</style>

<template>
    <vs-row style="gap: 20px;">
        <vs-col
            v-for="(item, key) in DataArr"
            :key="key"
        >
            <div>
                <template v-if="cardType === 'transit-card'">
                    
                    <div class="drag-button">
                        <img 
                            src="@/assets/svg/dot-menu.svg"
                        />
                    </div>
                    <div
                        v-if="listenRemoveButton && !item.transit_at"
                        class="remove-button"
                        @click.stop="remove(item.bag_transit_route_id)"
                    >
                        <i class="bx bx-trash"></i>
                    </div>

                    <transit-card :data="item" :isDisabled="item.transit_at ? true : false"/>
                </template>
                <template v-else>
                    <p>Type Not Found</p>
                </template>
                
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
            DataArr: this.valueData || []
        }
    },
    watch: {
        valueData: {
            handler(newVal) {
                this.DataArr = newVal;
            },
            deep: true
        },
    },
    computed: {
        listenRemoveButton() {
            return this.isRemoveButton || false
        }
    },
    methods: {
        remove(id) {
            this.$emit("remove", id);
        },
    },
}
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
  cursor: grab;
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

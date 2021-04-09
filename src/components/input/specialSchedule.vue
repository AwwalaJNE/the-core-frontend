<template>
    <div>
        <div class="pin" style="display: flex;position: relative;max-width: 500px;flex-wrap: wrap;">
            <span 
                v-for="(item, key) in time"
                :data-value="item" 
                class="vs-select__chips__chip"
                style="width: fit-content;"
                :key="key">
                    {{item}}
                    <span class="vs-select__chips__chip__close" @click="removeChip(item)">
                        <i class="vs-icon-close vs-icon-hover-less"></i>
                    </span>
            </span>
        </div>
        <vs-row class="mt-05">
            <vs-col w="3">
                <vs-button
                    shadow
                    :active="false"
                    @click="addTime"
                >
                    <i class='bx bx-time' style="margin-right:5px"></i> Add Time
                </vs-button>
            </vs-col>
            <vs-col w="5">
                <template v-if="isAddTime">
                    <el-time-picker
                        arrow-control
                        v-model="value1"
                        placeholder="Select time"
                        @change="updateValue">
                    </el-time-picker>
                    <span class="vs-select__chips__chip__close" @click="addTime">
                        <i class="vs-icon-close vs-icon-hover-less"></i>
                    </span>
                </template>
            </vs-col>
        </vs-row>
    </div>
</template>
<script>
import moment from "moment"
export default {
    name: 'special_schedule',
    props: {
        arrData: Array,
        date: Number,
        title: String
    },
    data() {
        return {
          time: this.arrData || [],
            value1: '',
            isAddTime: false
        }
    },
    watch: {
        arrData: function (arr) {
            if(arr !== undefined) {
                this.time = arr
            }
        },

    },
    methods: {
        removeChip(val) {
            // let time = moment(val).format("hh:mm")
            let info = {
                type: 'remove',
                title: this.title
            }
            this.$emit("updateValue", this.date, val, info)
        },
        addTime() {
            this.isAddTime = !this.isAddTime
        },
        updateValue(val) {
            let time = moment(val).format("HH:mm")
            let info = {
                type: 'add',
                title: this.title
            }
            if(time.toLowerCase() !== 'invalid date') {
                this.$emit("updateValue", this.date, time, info)
            }
        }
    },
}
</script>
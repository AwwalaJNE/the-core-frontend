<template>
    <div>
        <dialog-master 
            width="lg"
            :actived="listenActive" 
            :closeDialog="cancel"
            :loading="listenLoading"
        >
            <template v-slot:header>
                {{listenTitle}}
            </template>

            <template v-slot:content>
                <vs-row align="center">
                    <vs-col w="10">
                        <auto-complete
                            ref="origin_code"
                            formKey="origin_code"
                            name="Origin Code"
                            typeInput="autocomplete"
                            :querySearch="querySearch"
                            @updateValue="updateValue"
                        />
                    </vs-col>
                    <vs-col w="2">
                        <vs-button
                            block
                            flat
                            transparent
                            type="submit"
                            :active="true"
                            @click="createTransit"
                        >
                            <i class="bx bx-plus"></i> Add
                        </vs-button>
                    </vs-col>
                </vs-row>
                <vs-row justify="center">
                    <template v-if="data.length > 0">
                        <div>
                            <draggable-card
                                :cardType="'transit-card'"
                                :valueData="data"
                                :isRemoveButton="true"
                                @update="updateTransit"
                                @remove="removeTransit"
                            />
                        </div>
                    </template>
                    <template v-else>
                        <div style="padding: 2rem;">
                            <img 
                                src="@/assets/svg/not-found-transit.svg" 
                                alt="No Transit Route Found"
                            />
                        </div>
                    </template>
                </vs-row>
            </template>
        </dialog-master>
    </div>
</template>
<script>
import axios from "axios";
import master from "@/mixins/master";

import AutoComplete from "@/components/input/autoComplete";
import DialogMaster from "@/components/dialog/dialogMaster";
import DragableCard from '@/components/input/draggableCard';

export default {
    name:"transit-dialog",
    mixins: [master],
    components: {
        "auto-complete": AutoComplete,
        "dialog-master": DialogMaster,
        "draggable-card": DragableCard,
    },
    props: {
        active: Boolean,
        bagNumber: String,
        closeDialog: Function,
        title: String
    },
    data() {
        return {
            data: [],
            form: {},
            form_order: {},
            loading: false,
        }
    },
    computed: {
        listenActive(){
            return this.active;
        },
        listenTitle(){
            return this.title;
        },
        listenLoading() {
            return this.loading;
        },
        listenSelectedManifestVehicle() {
            return this.data || ''
        },
    },
    watch: {
        active(newVal, oldVal) {
            if (newVal === true && newVal !== oldVal) {
                this.getDataTransit();
            }
        }
    },
    methods: {
        async getDataTransit() {
            this.loading = true
            
            try {
                const res = await axios.get(`${this.URL.bag}/${this.bagNumber}/route-transit?n=${this.listenNodeId}`, this.Helper.header());
                this.data = res?.data?.data || [];
                this.form_order = this.data.map((item) => ({
                    bag_transit_route_id: item.bag_transit_route_id,
                    order: item.order
                }));
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }

            this.data = [
                {
                    "bag_transit_route_id": "58c767c8-3f2c-479d-9ad7-464fe0157d00",
                    "order": 1,
                    "bag_number": "CGK2392042",
                    "origin_code": "CGX10000",
                    "transit_at": "2025-01-01 07:30:00",
                    "is_planned": 1,
                    "created_at": "2025-01-01 07:30:00"
                },
                {
                    "bag_transit_route_id": "58c767c8-3f2c-479d-9ad7-464fe0157d01",
                    "order": 2,
                    "bag_number": "CGK2392042",
                    "origin_code": "SUX10000",
                    "transit_at": "2025-01-01 08:30:00",
                    "is_planned": 1,
                    "created_at": "2025-01-01 07:30:00"
                },
                {
                    "bag_transit_route_id": "58c767c8-3f2c-479d-9ad7-464fe0157d02",
                    "order": 3,
                    "bag_number": "CGK2392042",
                    "origin_code": "UPX10000",
                    "transit_at": null,
                    "is_planned": 1,
                    "created_at": "2025-01-01 07:30:00"
                },
                {
                    "bag_transit_route_id": "58c767c8-3f2c-479d-9ad7-464fe0157d03",
                    "order": 4,
                    "bag_number": "CGK2392042",
                    "origin_code": "UPG10000",
                    "transit_at": null,
                    "is_planned": 1,
                    "created_at": "2025-01-01 07:30:00"
                }
            ]
        },
        async createTransit() {
            if (Object.keys(this.form).length === 0) {
                this.openNotification('warn', null, "Missing Origin Code", "Please select an origin code to proceed with this action");
                return;
            }

            this.loading = true;
            try {
                const res = await axios.post(`${this.URL.bag}/${this.bagNumber}/route-transit?n=${this.listenNodeId}`, this.form, this.Helper.header());
                this.openNotification('success', null, "Success", res?.data?.message || "Success Add Transit Data");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
                this.handleClear();
                this.getDataTransit();
            }
        },
        async updateTransit() {
            this.loading = true;
            try {
                const res = await axios.patch(`${this.URL.bag}/${this.bagNumber}/route-transit?n=${this.listenNodeId}`, this.form_order, this.Helper.header());
                this.openNotification('success', null, "Success", "Update manifest vehicle success");

                await this.getManifestVehicle();
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async removeTransit(id) {
            this.loading = true;
            try {
                const res = await axios.delete(`${this.URL.bag}/${this.bagNumber}/route-transit/${id}?n=${this.listenNodeId}`, this.Helper.header());
                this.openNotification('success', null, "Success", "Remove transit success");
            } catch (err) {
                this.openNotification("danger", err?.response?.data?.code || '', "Failed", err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async querySearch(queryString, cb){
            try {
                const res = await axios.get(`${this.URL.origin_code}?n=${this.listenNodeId}` + `&s=${queryString}`, this.Helper.header());
                const result = res.data.data || [];
                const suggestions = result.map(item => {
                    const value = item.origin_code || '';
                    return { value, data: item };
                });
                cb(suggestions);
            } catch (error) {
                console.error("error", error);
            }
        },
        updateValue(key, val, info){
            switch(key) {
                case "origin_code":
                    this.form = info?.data;
                    break;
            }
        },
        handleClear() {
            this.$refs.origin_code.clear()
            this.data = [];
            this.form = {};
            this.form_order = {};
        },
        cancel() {
            this.handleClear();
            this.closeDialog();
        },
    },
    mounted() {
        this.handleSubmitShortcut(this.handleSubmit)
    },
}
</script>
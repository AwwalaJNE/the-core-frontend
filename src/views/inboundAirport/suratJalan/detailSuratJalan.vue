<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="12" sm="12" lg="12">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
        </vs-row>
        <vs-row>
            <section>
                <div class="box view">
                    <h3 align="left">SJ Information</h3>
                    <vs-row 
                        v-for="(info, index) in mainInfo" 
                        :key="index" 
                        class="info-row"
                        align="center"
                        justify="space-between"
                    >
                        <vs-col xs="12" sm="8" lg="4" class="info-label">
                            <h4>{{ info.label }}</h4>
                        </vs-col>
                        <vs-col xs="12" sm="4" lg="8" class="info-value">
                            <p>{{ main_info[info.value] || '-' }}</p>
                        </vs-col>
                    </vs-row>
                </div>
                <div class="box view">
                    <template>
                        <div class="card-container">
                            <h3 align="left">SJ Detail</h3>
                            <vs-row v-for="(item, index) in detail_info" :key="index">
                                <vs-col xs="12" sm="6" lg="4">
                                    <div class="card">
                                        <div>
                                            <vs-button
                                                circle
                                                icon
                                                border
                                                disabled
                                                :danger="item.received ? true : false"
                                                :active="false"
                                            >
                                                <i :class="`bx bx-${item.received ? 'x' : 'check'}`"/>
                                            </vs-button>
                                            <p>{{ item.item_type }}</p>
                                        </div>
                                        <div>
                                            <h4>{{ item.item_number }}</h4>
                                            <p>{{ item.total_weight }} kg • {{ item.item_destination }}</p>
                                        </div>
                                    </div>
                                </vs-col>
                            </vs-row>
                        </div>
                    </template>
                </div>
                <vs-button class="mt-2" style="float: right"
                    square
                    active
                    @click="back"
                >
                    <i class="bx bxs-chevron-left"> </i>  BACK
                </vs-button>
            </section>
        </vs-row>
    </div>
</template>
<script>
import axios from 'axios';
import master from "@/mixins/master"

import Breadcrumb from "@/components/breadcrumb/index";

export default {
    name: "airport-receiving-surat-jalan",
    mixins: [master],
    components: {
        breadcrumb: Breadcrumb,
    },
    data() {
        return {
            title: "Detail Surat Jalan",
            main_info: {},
            mainInfo: [
                {
                    label: 'Manifest DO Number', 
                    value: 'manifest_do_number' 
                },
                {
                    label: 'Orion Number', 
                    value: 'orion_number' 
                },
                {
                    label: 'Origin', 
                    value: 'origin' 
                },
                {
                    label: 'Destination', 
                    value: 'destination' 
                },
                {
                    label: 'LOV', 
                    value: 'manifest_lov' 
                },
                {
                    label: 'ETD', 
                    value: 'etd' 
                },
                {
                    label: 'ETA', 
                    value: 'eta' 
                },
                {
                    label: 'Departed Time', 
                    value: 'departed_time' 
                },
                {
                    label: 'Received Time', 
                    value: 'received_time' 
                },
                {
                    label: 'Nama Kendaraan', 
                    value: 'vehicle' 
                },
                {
                    label: 'Tipe Kendaraan', 
                    value: 'vehicle_type' 
                },
                {
                    label: 'Moda Kendaraan', 
                    value: 'vehicle_mode' 
                },
                {
                    label: 'Driver', 
                    value: 'driver' 
                },
                {
                    label: 'Total Weight', 
                    value: 'total_weight' 
                },
                {
                    label: 'Status', 
                    value: 'status' 
                },
            ],
            detail_info: [],
            detailInfo: [
                {
                    label: 'Item Number', 
                    value: 'item_number' 
                },
                {
                    label: 'Weight', 
                    value: 'total_weight' 
                },
                {
                    label: 'Destination', 
                    value: 'destination' 
                },
                {
                    label: 'Type', 
                    value: 'item_type' 
                },
                {
                    label: 'Received', 
                    value: 'received' 
                }
            ],
        };
    },
    methods: {
        async getSuratJalan() {
            this.loading = true;
            try {
                const res = await axios.get(this.URL.manifest_delivery_order + `?n=${this.listenNodeId}&s=${this.$route.params.id}`, this.Helper.header())

                let data = res.data.data[0];
                if (data && res.data.data.length > 0) {
                    this.main_info = {
                        manifest_do_number: data.manifest_do_number,
                        orion_number: data.do,
                        origin: data.origin.node_name,
                        destination: data.destination.node_name,
                        manifest_lov: data.manifest_lov,
                        etd: data.etd,
                        eta: data.eta,
                        departed_time: data.departed_time,
                        received_time: data.received_time,
                        driver: data.pic.employee_name + " (" + data.pic.employee_code + ")",
                        vehicle: data.vehicle.vehicle_name,
                        vehicle_type: data.vehicle_type_name,
                        vehicle_mode: data.vehicle_mode_name,
                        total_weigth: data.total_weigth,
                        status: data.status
                    };

                    let arr = res?.data?.data?.[0]?.detail;
                    arr = arr.map(item => {
                        return {
                            item_number: item.item_number,
                            item_type: item.item_type,
                            total_weight: item.total_weight,
                            item_destination: item.item_destination,
                            received: item.received_at ? 'TRUE' : 'FALSE'
                        };
                    });
                    this.detail_info = arr
                }
            } catch (err) {
                this.openNotification('danger', err.response?.data.code ?? '', 'Failed', err?.response?.data?.message ?? 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        back(){
            this.$router.push('/inbound-airport')
            this.setRoutePageHistory(this.$route.meta, false);
        },
    },
    mounted() {
        this.getSuratJalan();
    }
};
</script>

<style scoped>

.info-row {
    border-bottom: 1px solid #eaeaea;
}

.info-label h4 {
    font-size: 0.8em;
    color: #555;
    text-align: left;
}

.info-value p {
    font-size: 0.8em;
    color: #000;
    text-align: left;
}

.info-row:last-child {
    border-bottom: none;
}

.card {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 10px 0;
}

</style>
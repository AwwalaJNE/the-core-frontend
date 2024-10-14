<template>
    <vs-row>
        <vs-col xs="12" sm="12" lg="12">
            <div class="box" style="text-align: left">
                <vs-row>
                    <vs-col xs="9" sm="9" lg="9">
                        <vs-col xs="12" sm="12" lg="12" class="mb-15">
                            <h2 class="mb-15">Good {{ timeOfDay }}, {{ user_login }} !</h2>
                            <span>{{ role_name }} - {{ node_name }} ( {{ node_code }} )</span>
                        </vs-col>
                        <vs-col xs="12" sm="12" lg="12" class="mb-15">
                            <span>See other apps</span>
                        </vs-col>
                        <vs-row>
                            <vs-col 
                                v-for="(button, index) in buttons" 
                                :key="index" 
                                xs="3" sm="3" lg="3"
                            >
                                <vs-button 
                                    active
                                    block
                                    type="submit" 
                                    @click="handleRedirect(button.url)"
                                >
                                    {{ button.label }}
                                </vs-button>
                            </vs-col>
                        </vs-row>
                    </vs-col>
                    
                    <vs-col xs="3" sm="3" lg="3" class="avatar-column">
                        <img src="@/assets/svg/mascot.svg" alt="Mascot JNE" style="width: 100%; height: 100%;"/>
                    </vs-col>
                </vs-row>
            </div>

            <vs-row>
                <vs-col xs="12" sm="6" lg="3">
                    <div class="box">
                        <h4>Insight Inventory</h4>
                        <bar-chart 
                            ref="insightInventoryChart" 
                            :chart-data="dataInsightInventory" 
                            :options="optionsInsightInventory" 
                        />
                    </div>
                </vs-col>

                <vs-col xs="12" sm="6" lg="3">
                    <div class="box">
                        <h4>Insight Runsheet</h4>
                        <doughnut-chart 
                            ref="insightRunsheetChart" 
                            :chart-data="dataInsightRunsheet" 
                            :options="optionsInsightRunsheet" 
                        />
                    </div>
                </vs-col>

                <vs-col xs="12" sm="6" lg="3">
                    <div class="box">
                        <h4>Insight Receive</h4>
                        <bar-chart 
                            ref="insightReceiveChart" 
                            :chart-data="dataInsightReceive" 
                            :options="optionsInsightReceive" 
                        />
                    </div>
                </vs-col>

                <vs-col xs="12" sm="6" lg="3">
                    <div class="box">
                        <h4>Insight Depart</h4>
                        <bar-chart 
                            ref="insightDepartChart" 
                            :chart-data="dataInsightDepart" 
                            :options="optionsInsightDepart" 
                        />
                    </div>
                </vs-col>
            </vs-row>
        </vs-col>
    </vs-row>
</template>
<script>

import axios from "axios";
import master from "@/mixins/master";

import { Bar, Doughnut } from 'vue-chartjs'

export default {
    name: "main-page",
    mixins: [master],
    components: {
        "bar-chart": Bar,
        "doughnut-chart": Doughnut
    },
    computed: {
        listenUser() {
            return this.listenActiveUser;
        }
    },
    watch: {
        listenUser(val) {
            if (val) {
                getInfo(val);
            }
        },
        dataInsightInventory(newData) {
            this.$refs.insightInventoryChart.renderChart(newData, this.optionsInsightInventory);
        },
        dataInsightRunsheet(newData) {
            this.$refs.insightRunsheetChart.renderChart(newData, this.optionsInsightRunsheet);
        },
        dataInsightReceive(newData) {
            this.$refs.insightReceiveChart.renderChart(newData, this.optionsInsightReceive);
        },
        dataInsightDepart(newData) {
            this.$refs.insightDepartChart.renderChart(newData, this.optionsInsightDepart);
        }
    },
    data() {
        return {
            role_name: "",
            node_name: "",
            node_code: "",
            user_login: "",
            buttons: [
                { 
                    label: "Dashboard Core",
                    url: "https://dashboard-core.jne.co.id/dashboard/home#/login"
                },
                { 
                    label: "Helpdesk Core",
                    url: "https://core.jne.co.id/"
                },
                { 
                    label: "JNE Main Page",
                    url: "https://core.jne.co.id/"
                }
            ],
            timeOfDay: "",
            currentTime: "",
            dataInsightInventory: {},
            optionsInsightInventory: {
                responsive: true,
                maintainAspectRatio: false, 
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#e0e0e0',
                            lineWidth: 1,
                        },
                        ticks: {
                            color: '#333',
                            font: {
                                size: 12,
                                family: 'Arial',
                            },
                        },
                    },
                    x: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            color: '#333',
                            font: {
                                size: 12,
                                family: 'Arial',
                            },
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#1E88E5',
                        borderWidth: 1,
                    },
                },
            },
            dataInsightRunsheet: {},
            optionsInsightRunsheet: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Doughnut Chart Example', // Set your title here
                        font: {
                            size: 16,
                            family: 'Arial',
                            weight: 'bold',
                        },
                        color: '#333',
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                    },
                },
            },
            dataInsightReceive: {},
            optionsInsightReceive: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                    },
                },
            },
            dataInsightDepart: {},
            optionsInsightDepart: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                    },
                },
            },
        };
    },
    methods: {
        getInfo(val) {
            this.role_name = val?.role?.user_role_name || "";
            this.node_name = val?.nodes?.[0]?.node_name || "";
            this.node_code = val?.nodes?.[0]?.node_code || "";
            this.user_login = val?.user_login || "";
        },
        handleRedirect(url) {
            const newWindow = window.open(url, '_blank', 'noopener');
      
            if (newWindow) {
                newWindow.onload = function() {
                    newWindow.print();
                    newWindow.onafterprint = () => newWindow.close();
                };
            }
        },
        updateTime() {
            const now = new Date();
            this.currentTime = now.toLocaleTimeString();
            this.timeOfDay = this.getTimeOfDay(now.getHours());
        },
        getTimeOfDay(hour) {
            if (hour >= 5 && hour < 12) {
                return "Morning";
            } else if (hour >= 12 && hour < 17) {
                return "Afternoon";
            } else {
                return "Evening";
            }
        },
        async getInsightInventory(){
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.insight_inventory}?n=${this.listenNodeId}`, this.Helper.header());

                if (res.data.data) {
                    const keys = Object.keys(res.data.data);
                    const values = Object.values(res.data.data);
                    this.dataInsightInventory = {
                        labels: keys,
                        datasets: [{
                            label: 'Count',
                            backgroundColor: '#42A5F5',
                            borderColor: '#1E88E5',
                            data: values,
                        }]
                    };
                }

                console.log("P1", res.data.data, this.dataInsightInventory)
                
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async getInsightRunsheet(){
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.insight_runsheet}?n=${this.listenNodeId}`, this.Helper.header());

                if (res.data.data) {
                    const keys = Object.keys(res.data.data);
                    const values = Object.values(res.data.data);
                    this.dataInsightRunsheet = {
                        labels: keys,
                        datasets: [{
                            backgroundColor: [
                                '#FF6384',
                                '#36A2EB',
                                '#FFCE56'
                            ],
                            hoverBackgroundColor: [
                                '#FF6384',
                                '#36A2EB',
                                '#FFCE56'
                            ],
                            data: values,
                        }]
                    };
                }

                console.log("P2", res.data.data, this.dataInsightRunsheet)
                
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async getInsightReceive(){
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.insight_receive}?n=${this.listenNodeId}`, this.Helper.header());

                if (res.data.data) {
                    const keys = Object.keys(res.data.data[0]);
                    const values = Object.values(res.data.data[0]);
                    this.dataInsightReceive = {
                        labels: keys,
                        datasets: [{
                            label: 'Counts',
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                            data: values,
                        }]
                    };
                }

                console.log("P3", res.data.data, this.dataInsightReceive)
                
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
        async getInsightDepart(){
            this.loading = true;
            try {
                const res = await axios.get(`${this.URL.insight_depart}?n=${this.listenNodeId}`, this.Helper.header());

                if (res.data.data) {
                    const keys = Object.keys(res.data.data[0]);
                    const values = Object.values(res.data.data[0]);
                    this.dataInsightDepart = {
                        labels: keys,
                        datasets: [{
                            label: 'Counts',
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                            data: values,
                        }]
                    };
                }

                console.log("P4", res.data.data, this.dataInsightDepart)
                
            } catch (err) {
                this.openNotification('danger', err?.response?.data?.code || '', 'Failed', err?.response?.data?.message || 'Something went wrong');
            } finally {
                this.loading = false;
            }
        },
    },
    mounted() {
        this.updateTime();

        if (this.listenUser) {
            this.getInfo(this.listenUser);
        }

        this.getInsightInventory().then(() => {
            this.$refs.insightInventoryChart.renderChart(this.dataInsightInventory, this.optionsInsightInventory);
        });

        this.getInsightRunsheet().then(() => {
            this.$refs.insightRunsheetChart.renderChart(this.dataInsightRunsheet, this.optionsInsightRunsheet);
        });

        this.getInsightReceive().then(() => {
            this.$refs.insightReceiveChart.renderChart(this.dataInsightReceive, this.optionsInsightReceive);
        });

        this.getInsightDepart().then(() => {
            this.$refs.insightDepartChart.renderChart(this.dataInsightDepart, this.optionsInsightDepart);
        });
    },
};
</script>
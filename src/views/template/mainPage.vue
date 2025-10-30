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
                                xs="3"
                                sm="3"
                                lg="3"
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
                        <img
                            src="@/assets/svg/mascot.svg"
                            alt="Mascot JNE"
                            style="width: 100%; height: 100%"
                        />
                    </vs-col>
                </vs-row>
            </div>

            <vs-row>
                <vs-col xs="12" sm="6" lg="3">
                    <div class="box set-height">
                        <h4>Current Inventory</h4>
                        <bar-chart
                            ref="insightInventoryChart"
                            v-if="!is_empty_insight_invetory"
                            :chart-data="dataInsightInventory"
                            :options="optionsInsightInventory"
                        />
                        <div v-else class="no-data-message">No data available</div>
                    </div>
                </vs-col>

                <vs-col xs="12" sm="6" lg="3">
                    <div class="box set-height">
                        <h4>Today Runsheet Summary</h4>
                        <doughnut-chart
                            ref="insightRunsheetChart"
                            v-if="!is_empty_insight_runsheet"
                            :chart-data="dataInsightRunsheet"
                            :options="optionsInsightRunsheet"
                        />
                        <div v-else class="no-data-message">No data available</div>
                    </div>
                </vs-col>

                <vs-col xs="12" sm="6" lg="3">
                    <div class="box set-height">
                        <h4>Today Receive Summary</h4>
                        <bar-chart
                            ref="insightReceiveChart"
                            v-if="!is_empty_insight_receive"
                            :chart-data="dataInsightReceive"
                            :options="optionsInsightReceive"
                        />
                        <div v-else class="no-data-message">No data available</div>
                    </div>
                </vs-col>

                <vs-col xs="12" sm="6" lg="3">
                    <div class="box set-height">
                        <h4>Today Depart Summary</h4>
                        <bar-chart
                            ref="insightDepartChart"
                            v-if="!is_empty_insight_depart"
                            :chart-data="dataInsightDepart"
                            :options="optionsInsightDepart"
                        />
                        <div v-else class="no-data-message">No data available</div>
                    </div>
                </vs-col>
            </vs-row>
        </vs-col>
    </vs-row>
</template>
<script>
import axios from 'axios'
import master from '@/mixins/master'

import { Bar, Doughnut } from 'vue-chartjs'

export default {
    name: 'main-page',
    mixins: [master],
    components: {
        'bar-chart': Bar,
        'doughnut-chart': Doughnut,
    },
    computed: {
        buttons() {
            return [
                {
                    label: 'Dashboard Core',
                    url: this.URL.app_jne_core_dashboard,
                },
                {
                    label: 'Helpdesk Core',
                    url: this.URL.app_jne_core,
                },
                {
                    label: 'JNE Main Page',
                    url: this.URL.app_jne_main,
                },
            ]
        },
    },
    watch: {
        dataInsightInventory(newData) {
            if (newData) {
                this.$refs.insightInventoryChart.renderChart(newData, this.optionsInsightInventory)
            }
        },
        dataInsightRunsheet(newData) {
            if (newData) {
                this.$refs.insightRunsheetChart.renderChart(newData, this.optionsInsightRunsheet)
            }
        },
        dataInsightReceive(newData) {
            if (newData) {
                this.$refs.insightReceiveChart.renderChart(newData, this.optionsInsightReceive)
            }
        },
        dataInsightDepart(newData) {
            if (newData) {
                this.$refs.insightDepartChart.renderChart(newData, this.optionsInsightDepart)
            }
        },
    },
    data() {
        return {
            role_name: '',
            node_name: '',
            node_code: '',
            user_login: '',
            timeOfDay: '',
            currentTime: '',
            is_empty_insight_invetory: false,
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
            is_empty_insight_runsheet: false,
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
            is_empty_insight_receive: false,
            dataInsightReceive: {},
            optionsInsightReceive: {
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
            is_empty_insight_depart: false,
            dataInsightDepart: {},
            optionsInsightDepart: {
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
        }
    },
    methods: {
        getInfo() {
            this.role_name = this.listenActiveUser?.role?.[0]?.app_role_name || ''
            this.node_name = this.listenCurrentNode?.node_name || ''
            this.node_code = this.listenCurrentNode?.node_code || ''
            this.user_login = this.listenActiveUser?.user_login || ''
        },
        handleRedirect(url) {
            const newWindow = window.open(url, '_blank', 'noopener')

            if (newWindow) {
                newWindow.onload = function () {
                    newWindow.print()
                    newWindow.onafterprint = () => newWindow.close()
                }
            }
        },
        updateTime() {
            const now = new Date()
            this.currentTime = now.toLocaleTimeString()
            this.timeOfDay = this.getTimeOfDay(now.getHours())
        },
        getTimeOfDay(hour) {
            if (hour >= 5 && hour < 12) {
                return 'Morning'
            } else if (hour >= 12 && hour < 17) {
                return 'Afternoon'
            } else {
                return 'Evening'
            }
        },
        formattedArr(arr) {
            return arr.map((item) =>
                item
                    .split('_')
                    .map((word) =>
                        word.toLowerCase() === 'sm' || word.toLowerCase() === 'sj'
                            ? word.toUpperCase()
                            : word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(' ')
            )
        },
        async getInsightInventory() {
            this.loading = true
            try {
                const res = await axios.get(
                    `${this.URL.insight_inventory}?n=${this.listenNodeId}`,
                    this.Helper.header()
                )

                if (res.data.data) {
                    const keys = Object.keys(res.data.data)
                    const values = Object.values(res.data.data)
                    this.dataInsightInventory = {
                        labels: this.formattedArr(keys),
                        datasets: [
                            {
                                label: 'Count',
                                backgroundColor: (context) => {
                                    const gradient = context.chart.ctx.createLinearGradient(
                                        0,
                                        0,
                                        0,
                                        400
                                    )

                                    gradient.addColorStop(0, '#1E88E5')
                                    gradient.addColorStop(1, '#90CAF9')
                                    return gradient
                                },
                                hoverBackgroundColor: '#1565C0',
                                borderRadius: 6,
                                barThickness: 20,
                                data: values,
                            },
                        ],
                    }

                    if (values.every((value) => value === 0)) {
                        this.is_empty_insight_invetory = true
                    }
                }
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code || '',
                    'Failed',
                    err?.response?.data?.message || 'Something went wrong'
                )
            } finally {
                this.loading = false
            }
        },
        async getInsightRunsheet() {
            this.loading = true
            try {
                const res = await axios.get(
                    `${this.URL.insight_runsheet}?n=${this.listenNodeId}`,
                    this.Helper.header()
                )

                if (res.data.data) {
                    const keys = Object.keys(res.data.data)
                    const values = Object.values(res.data.data)
                    this.dataInsightRunsheet = {
                        labels: this.formattedArr(keys),
                        datasets: [
                            {
                                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                                data: values,
                            },
                        ],
                    }

                    if (values.every((value) => value === 0)) {
                        this.is_empty_insight_runsheet = true
                    }
                }
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code || '',
                    'Failed',
                    err?.response?.data?.message || 'Something went wrong'
                )
            } finally {
                this.loading = false
            }
        },
        async getInsightReceive() {
            this.loading = true
            try {
                const res = await axios.get(
                    `${this.URL.insight_receive}?n=${this.listenNodeId}`,
                    this.Helper.header()
                )

                if (res.data.data) {
                    const keys = Object.keys(res.data.data)
                    const values = Object.values(res.data.data)
                    this.dataInsightReceive = {
                        labels: this.formattedArr(keys),
                        datasets: [
                            {
                                label: 'Counts',
                                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                                data: values,
                            },
                        ],
                    }

                    if (values.every((value) => value === 0)) {
                        this.is_empty_insight_receive = true
                    }
                }
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code || '',
                    'Failed',
                    err?.response?.data?.message || 'Something went wrong'
                )
            } finally {
                this.loading = false
            }
        },
        async getInsightDepart() {
            this.loading = true
            try {
                const res = await axios.get(
                    `${this.URL.insight_depart}?n=${this.listenNodeId}`,
                    this.Helper.header()
                )

                if (res.data.data) {
                    const keys = Object.keys(res.data.data)
                    const values = Object.values(res.data.data)
                    this.dataInsightDepart = {
                        labels: this.formattedArr(keys),
                        datasets: [
                            {
                                label: 'Counts',
                                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                                data: values,
                            },
                        ],
                    }

                    if (values.every((value) => value === 0)) {
                        this.is_empty_insight_depart = true
                    }
                }
            } catch (err) {
                this.openNotification(
                    'danger',
                    err?.response?.data?.code || '',
                    'Failed',
                    err?.response?.data?.message || 'Something went wrong'
                )
            } finally {
                this.loading = false
            }
        },
    },
    async mounted() {
        this.updateTime()

        this.getInfo()

        await this.getInsightInventory().then(() => {
            this.$refs.insightInventoryChart?.renderChart(
                this.dataInsightInventory,
                this.optionsInsightInventory
            )
        })

        await this.getInsightRunsheet().then(() => {
            this.$refs.insightRunsheetChart?.renderChart(
                this.dataInsightRunsheet,
                this.optionsInsightRunsheet
            )
        })

        await this.getInsightReceive().then(() => {
            this.$refs.insightReceiveChart?.renderChart(
                this.dataInsightReceive,
                this.optionsInsightReceive
            )
        })

        await this.getInsightDepart().then(() => {
            this.$refs.insightDepartChart?.renderChart(
                this.dataInsightDepart,
                this.optionsInsightDepart
            )
        })
    },
}
</script>

<style scoped>
.set-height {
    height: 75vh;
}
.box {
    display: flex;
    flex-direction: column;
    min-width: 200px !important;
}
.no-data-message {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 12px;
}
</style>

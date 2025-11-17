<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage"></div>
            </vs-col>
        </vs-row>
        <section>
            <div class="box view">
                <form @submit.prevent="processFlightNumber" style="display: flex; margin-top: 2em">
                    <vs-col w="3">
                        <vs-input
                            id="traceFlight"
                            border
                            type="text"
                            v-model="flightNumber"
                            label-placeholder="Masukkan Flight Number"
                            :disabled="hasFlightNumber"
                            v-uppercase
                            ref="formFlightNumber"
                            @keyup.enter="processFlightNumber"
                        />
                        <template v-if="hasFlightNumber">
                            <div style="position: absolute; right: 20px; top: 15px">
                                <span class="vs-select__chips__chip__close" @click="clearInput">
                                    <i class="vs-icon-close vs-icon-hover-less"></i>
                                </span>
                            </div>
                        </template>
                    </vs-col>
                    <vs-col lg="1" sm="2" xs="1">
                        <vs-button type="submit">Search</vs-button>
                    </vs-col>
                </form>
            </div>
        </section>

        <section>
            <div class="box view" v-if="hasFlightNumber">
                <vs-col w="12">
                    <nav-item :navItem="navItem" @activeTab="activeTab" />
                </vs-col>
                <vs-row>
                    <template v-if="navActive === 'k-FLIGHT-LIST'">
                        <vs-col xs="12" sm="12" lg="12">
                            <flight-list :flightNumber="flightNumber" />
                        </vs-col>
                    </template>
                </vs-row>
            </div>
        </section>
    </div>
</template>

<script>
import master from '@/mixins/master'

import Breadcrumb from '@/components/breadcrumb/index'
import NavItem from '@/components/navbar/navTab'

import FlightList from '@/views/traceFlight/flightList'

export default {
    name: 'trace-flight',
    mixins: [master],
    components: {
        'nav-item': NavItem,
        breadcrumb: Breadcrumb,
        'flight-list': FlightList,
    },
    data() {
        return {
            flightNumber: '',
            hasFlightNumber: false,
            navItem: [
                {
                    label: 'FLIGHT LIST',
                    key: 'k-FLIGHT-LIST',
                    title: 'Flight List',
                },
            ],
            title: 'Flight List',
            navActive: 'k-FLIGHT-LIST',
        }
    },
    methods: {
        activeTab(val) {
            this.navActive = val
            let item = this.navItem.filter((item) => {
                return item.key == val
            })
            this.title = item[0].title
        },
        async processFlightNumber() {
            if (!this.flightNumber || this.flightNumber.trim() === '') {
                return
            }

            const encoded = encodeURIComponent(this.flightNumber.trim())
            await this.$router.push(`/trace/trace-flight/${encoded}`)
            this.setRoutePageHistory(this.$route.meta, false)
            this.hasFlightNumber = true
        },
        clearInput() {
            this.hasFlightNumber = false
            this.flightNumber = ''
            this.activeTab('k-FLIGHT-LIST')
            this.$router.push('/trace/trace-flight')
            this.setRoutePageHistory(this.$route.meta, false)
        },
    },
    mounted() {
        const id = this.$route.params?.id
        if (id) {
            const decoded = decodeURIComponent(id)
            this.flightNumber = decoded
            this.hasFlightNumber = true
        } else {
            this.clearInput()
        }
        this.setActiveInput('formFlightNumber')
    },
    watch: {
        '$route.params.id'(val) {
            if (val) {
                const decoded = decodeURIComponent(val)
                this.flightNumber = decoded
                this.hasFlightNumber = true
            } else {
                this.clearInput()
                this.setActiveInput('formFlightNumber')
            }
        },
    },
}
</script>

<template>
    <vs-row justify="center">
        <vs-col xs="12" sm="12" lg="12">
            <div class="map_picker">
                <div class="query_map">
                    <!-- Search desired location (currently disabled) -->
                    <!--
                    <el-autocomplete
                        class="inline-input"
                        v-model="locationName"
                        :fetch-suggestions="querySearch"
                        placeholder="Please Input"
                        :trigger-on-focus="false"
                        @select="handleSelect"
                    />
                    -->
                </div>

                <div
                    ref="map_general"
                    id="map_general"
                    style="
                        width: 100%;
                        height: 250px;
                        z-index: 1;
                        position: relative;
                        display: block;
                        overflow: hidden;
                    "
                ></div>
            </div>
        </vs-col>
    </vs-row>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'
import master from '@/mixins/master'

export default {
    name: 'map-component',
    mixins: [master],

    props: {
        title: String,
        lat: Number,
        lon: Number,
        fullAddress: String,
        parameterMap: String,
        dataAddress: String,
        dataLtnLng: String,
        summonMap: Boolean,
    },

    data() {
        return {
            map: {},
            marker: {},
            center: {},
            zoom: 14,
            latitude: this.lat,
            longitude: this.lon,
            locationName: '',
        }
    },

    watch: {
        lat(val) {
            this.latitude = val
            this.getLocation()
        },
        lon(val) {
            this.longitude = val
            this.getLocation()
        },
        fullAddress(val) {
            this.locationName = val
            this.getLocation()
        },
        summonMap(val) {},
    },

    methods: {
        setMarker() {
            let curLocation = [this.latitude, this.longitude]

            if (curLocation[0] === 0 && curLocation[1] === 0) {
                curLocation = [-6.21462, 106.84513]
            }

            this.$refs.map_general.innerHTML =
                "<div id='map' style='width: 100%; height: 100%;'></div>"

            const container = L.DomUtil.get('map')
            if (container) container._leaflet_id = null

            const map = new L.Map('map').setView(curLocation, this.zoom)

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map)

            map.attributionControl.setPrefix(false)

            const marker = new L.marker(curLocation, {
                draggable: 'true',
            })

            marker.on('dragend', () => {
                const position = marker.getLatLng()

                marker.setLatLng(position, { draggable: 'true' }).bindPopup(position).update()

                this.latitude = position.lat
                this.longitude = position.lng

                this.getCoordinates()
                this.emitThem()
            })

            map.addLayer(marker)

            this.marker = marker
            this.map = map
        },

        async querySearch(queryString, cb) {
            if (!queryString) {
                cb([])
                return
            }

            try {
                const res = await axios.get(
                    `${this.URL.geocode}?n=${this.listenNodeId}&s=${queryString}`,
                    this.Helper.header()
                )

                const items = res?.data?.items ?? []

                cb(
                    items.map((item) => ({
                        value: item.address.label,
                        data: item,
                    }))
                )
            } catch (error) {
                console.error('Geocode error:', error)
                cb([])
            }
        },

        getLocation() {
            navigator.geolocation.getCurrentPosition(() => {
                this.center = {
                    lat: parseFloat(this.lat),
                    lng: parseFloat(this.lng),
                }
            })
        },

        async getCoordinates() {
            try {
                const res = await axios.get(
                    `${this.URL.reverse_geocode}?n=${this.listenNodeId}&lat=${this.latitude}&lon=${this.longitude}`,
                    this.Helper.header()
                )

                const feature = res?.data?.features?.[0]
                this.locationName = feature?.properties?.name || ''
            } catch (error) {
                console.error('error', error)
            }
        },

        handleSelect(item) {
            const selected = item.data
            const marker = {
                lat: selected.position.lat,
                lng: selected.position.lng,
            }

            this.latitude = marker.lat
            this.longitude = marker.lng
            this.locationName = selected.address.label
            this.center = marker

            this.marker.setLatLng([marker.lat, marker.lng])
            this.map.panTo([marker.lat, marker.lng], this.zoom)
        },

        emitThem() {
            this.$emit('pickLocation', {
                location: this.locationName,
                latitude: this.latitude,
                longitude: this.longitude,
                lat_lng: `${this.latitude},${this.longitude}`,
                parameterMap: this.parameterMap,
            })
        },
    },

    mounted() {
        setTimeout(() => {
            this.latitude = this.lat
            this.longitude = this.lon

            this.getCoordinates()

            this.$nextTick(() => {
                this.setMarker()
            })
        }, 400)
    },
}
</script>

<style lang="scss">
.query_map {
    position: relative;
    width: 100%;
    text-align: left;
    font-size: 0.75rem;
}

.map_picker {
    position: relative;
    widows: 100%;
    margin: 0 auto 1em;
}
</style>

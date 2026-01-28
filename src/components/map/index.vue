<template>
    <vs-row justify="center">
        <vs-col xs="12" sm="12" lg="12">
            <div class="map_picker">
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

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

import axios from 'axios'
import master from '@/mixins/master'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
})

export default {
    name: 'map-component',
    mixins: [master],

    props: {
        lat: Number,
        lon: Number,
        fullAddress: String,
        parameterMap: String,
    },

    data() {
        return {
            map: null,
            marker: null,
            zoom: 14,
            latitude: this.lat,
            longitude: this.lon,
            locationName: '',
        }
    },

    watch: {
        lat(val) {
            this.latitude = val
            this.setMarker()
        },
        lon(val) {
            this.longitude = val
            this.setMarker()
        },
        fullAddress(val) {
            this.locationName = val
        },
    },

    methods: {
        setMarker() {
            let curLocation = [this.latitude, this.longitude]

            if (!curLocation[0] && !curLocation[1]) {
                curLocation = [-6.21462, 106.84513]
            }

            this.$refs.map_general.innerHTML = "<div id='map' style='width:100%;height:100%'></div>"

            const container = L.DomUtil.get('map')
            if (container) container._leaflet_id = null

            const map = L.map('map').setView(curLocation, this.zoom)

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
            }).addTo(map)

            map.attributionControl.setPrefix(false)

            const marker = L.marker(curLocation, { draggable: true })

            marker.on('dragend', () => {
                const { lat, lng } = marker.getLatLng()

                this.latitude = lat
                this.longitude = lng

                this.getCoordinates()
                this.emitThem()
            })

            marker.addTo(map)

            this.map = map
            this.marker = marker
        },

        async getCoordinates() {
            try {
                const res = await axios.get(
                    `${this.URL.reverse_geocode}?n=${this.listenNodeId}&lat=${this.latitude}&lon=${this.longitude}`,
                    this.Helper.header()
                )

                this.locationName = res?.data?.features?.[0]?.properties?.name || ''
            } catch (error) {
                console.error(error)
            }
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
            this.$nextTick(this.setMarker)
        }, 400)
    },
}
</script>

<style lang="scss">
.map_picker {
    position: relative;
    width: 100%;
    margin: 0 auto 1em;
}
</style>

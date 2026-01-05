<template>
    <vs-row justify="center">
        <vs-col xs="12" sm="12" lg="12">
            <div class="map_picker">
                <div class="query_map">
                    <!-- <div>Search desired location</div>
                    <el-autocomplete
                    class="inline-input"
                    v-model="locationName"
                    :fetch-suggestions="querySearch"
                    placeholder="Please Input"
                    :trigger-on-focus="false"
                    @select="handleSelect"
                    ></el-autocomplete> -->
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
        // dataLtnLng(val) {
        //     try {
        //         if(val){
        //             let temp = val.split(",");
        //             this.latitude = temp[0];
        //             this.longitude = temp[1];
        //         }
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
    },
    methods: {
        setMarker() {
            let curLocation = [this.latitude, this.longitude]

            let self = this
            if (curLocation[0] == 0 && curLocation[1] == 0) {
                curLocation = [-6.21462, 106.84513]
            }

            // document.getElementById("map_general").innerHTML =
            // "<div id='map' style='width: 100%; height: 100%;'></div>";
            this.$refs.map_general.innerHTML =
                "<div id='map' style='width: 100%; height: 100%;'></div>"

            const container = L.DomUtil.get('map')
            if (container != null) {
                container._leaflet_id = null
            }

            var map = new L.Map('map').setView(curLocation, this.zoom)

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map)

            map.attributionControl.setPrefix(false)

            var marker = new L.marker(curLocation, {
                draggable: 'true',
            })

            marker.on('dragend', function (event) {
                var position = marker.getLatLng()
                marker
                    .setLatLng(position, {
                        draggable: 'true',
                    })
                    .bindPopup(position)
                    .update()
                self.latitude = position.lat
                self.longitude = position.lng
                self.getCoordinates()

                self.emitThem()
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

                const suggestions = items.map((item) => ({
                    value: item.address.label,
                    data: item,
                }))

                cb(suggestions)
            } catch (error) {
                console.error('Geocode error:', error)
                cb([])
            }
        },
        // getCurrentLocation() {
        // ISSUE diblock sama browser

        //     navigator.geolocation.getCurrentPosition(
        //         position => {
        //         this.center = {
        //             lat: parseFloat(position.coords.latitude),
        //             lng: parseFloat(position.coords.longitude)
        //         };
        //         this.latitude = position.coords.latitude;
        //         this.longitude = position.coords.longitude;
        //         },
        //         failure => {
        //             console.log(failure, "Failure");
        //             if (failure.message.startsWith("Only secure origins are allowed")) {
        //                 this.openNotification('danger', err.response ? err.response.data.code : '', 'Failed get current location', 'Only secure origins are allowed')
        //             }
        //         }
        //     );
        // },
        getLocation() {
            navigator.geolocation.getCurrentPosition((position) => {
                this.center = {
                    lat: parseFloat(this.lat),
                    lng: parseFloat(this.lng),
                }
            })
        },
        async getCoordinates() {
            try {
                const res = await axios.get(
                    `${this.URL.reverse_geocode}?n=${this.listenNodeId}lat=${this.latitude}&long=${this.longitude}`,
                    this.Helper.header()
                )

                const feature = res?.data?.features?.[0]
                this.locationName = feature?.properties?.name || ''
            } catch (error) {
                console.error('error', error)
            }
        },
        handleSelect(item) {
            let self = this
            let selected = item.data
            let marker = {
                lat: selected.position.lat,
                lng: selected.position.lng,
            }
            self.latitude = marker.lat
            self.longitude = marker.lng
            self.locationName = selected.address.label
            // self.locationName = 'Berlin'
            self.center = marker

            self.marker.setLatLng([marker.lat, marker.lng])
            self.map.panTo([marker.lat, marker.lng], self.zoom)

            // self.emitThem()
        },
        emitThem() {
            let dataMap = {
                location: this.locationName,
                latitude: this.latitude,
                longitude: this.longitude,
                lat_lng: this.latitude + ',' + this.longitude,
                parameterMap: this.parameterMap,
            }
            this.$emit('pickLocation', dataMap)
        },
    },
    mounted() {
        let self = this
        setTimeout(function () {
            self.latitude = self.lat
            self.longitude = self.lon

            self.getCoordinates()
            self.$nextTick((_) => {
                self.setMarker()
                // self.getCurrentLocation()
            })
        }, 400) // 4 mili detik | fix issue prop lat dan lon masih 0
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

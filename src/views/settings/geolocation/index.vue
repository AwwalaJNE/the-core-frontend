<template>
    <div>
        <vs-row justify="space-between">
            <vs-col xs="6" sm="4" lg="4">
                <div class="titlePage">
                    <breadcrumb />
                    <h2>{{title}}</h2>
                </div>
            </vs-col>
            <vs-col xs="6" sm="3" lg="3">
                <div style="position:relative;display:flex;justify-content: flex-end;">
                    <div style="width: 100px;padding-right: 5px;">
                        <vs-button
                        flat
                        block
                        :active="true"
                        @click="openDialog"
                        > 
                            <i class="bx bx-plus"></i> New
                        </vs-button>
                    </div>
                </div>
            </vs-col>
        </vs-row>

        <section class="geolocation">
            <div class="box view">
                <div class="nav-box">
                    <nav-item :navItem="navItemm" @activeTab="activeTab" />
                </div>
                <template v-if="navActive === 'k-GEOLOCATION'">
                    <transition name="slide-fade">
                        <geo-location />
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-CITY'">
                    <transition name="slide-fade">
                        <city />
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-COUNTRY'">
                    <transition name="slide-fade">
                        <country />
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-PROVINCE'">
                    <transition name="slide-fade">
                        <province />
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-DISTRICT'">
                    <transition name="slide-fade">
                        <district />
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-SUBDISTRICT'">
                    <transition name="slide-fade">
                        <subdistrict />
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-TIMEZONE'">
                    <transition name="slide-fade">
                        <timezone />
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-ZIPCODE'">
                    <transition name="slide-fade">
                        <zipcode />
                    </transition>
                </template>

            </div>
        </section>
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"

import Geolocation from "@/views/settings/geolocation/geolocation"
import City from "@/views/settings/geolocation/city"
import Country from "@/views/settings/geolocation/country"
import District from "@/views/settings/geolocation/district"
import Province from "@/views/settings/geolocation/province"
import Subdistrict from "@/views/settings/geolocation/subdistrict"
import Timezone from "@/views/settings/geolocation/timezone"
import Zipcode from "@/views/settings/geolocation/zipcode"

export default {
    name:"geolocation-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "geo-location": Geolocation,
        "city": City,
        "country": Country,
        "district": District,
        "province": Province,
        "subdistrict": Subdistrict,
        "timezone": Timezone,
        "zipcode": Zipcode,
        // "role-list": RoleList,
        // "dialog-create-edit-user": DialogCreateEditUser,
        // "dialog-create-edit-role": DialogCreateEditRole
    },
    data() {
        return {
            navItemm: [
                {
                    label: "GEOLOCATION",
                    key: "k-GEOLOCATION",
                    title: "Geolocation List"
                },
                {
                    label: "COUNTRY",
                    key: "k-COUNTRY",
                    title: "Country List"
                },
                {
                    label: "PROVINCE",
                    key: "k-PROVINCE",
                    title: "Province List"
                },
                {
                    label: "CITY",
                    key: "k-CITY",
                    title: "City List"
                },
                {
                    label: "DISTRICT",
                    key: "k-DISTRICT",
                    title: "District List"
                },
                {
                    label: "SUBDISTRICT",
                    key: "k-SUBDISTRICT",
                    title: "SubDistrict List"
                },
                {
                    label: "ZIP CODE",
                    key: "k-ZIPCODE",
                    title: "ZIP CODE List"
                },
                {
                    label: "TIME ZONE",
                    key: "k-TIMEZONE",
                    title: "Time Zone List"
                },
            ],
            title:"Geolocation List",
            navActive: "k-GEOLOCATION"
        }
    },
    methods: {
        activeTab(val) {
            this.navActive = val
            console.log(this.navActive)
            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title
        },
        openDialog(){

        },
    },
}
</script>
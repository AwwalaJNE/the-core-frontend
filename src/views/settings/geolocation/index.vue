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
                    <template v-if="navActive !== 'k-GEOLOCATION' && navActive !== 'k-TIMEZONE'">
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
                    </template>
                </div>
            </vs-col>
        </vs-row>

        <section class="geolocation">
            <div class="box view">
                <div class="nav-box">
                    <vs-row justify="space-between">
                        <vs-col xs="6" sm="9" lg="9">
                            <nav-item :navItem="navItemm" @activeTab="activeTab" />
                        </vs-col>
                    </vs-row>
                </div>
                <template v-if="navActive === 'k-GEOLOCATION'">
                    <transition name="slide-fade">
                        <geo-location :ref="navActive" :query="tempSearch"/>
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-CITY'">
                    <transition name="slide-fade">
                        <city :ref="navActive" :query="tempSearch"/>
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-COUNTRY'">
                    <transition name="slide-fade">
                        <country :ref="navActive" :query="tempSearch"/>
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-PROVINCE'">
                    <transition name="slide-fade">
                        <province :ref="navActive" :query="tempSearch"/>
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-DISTRICT'">
                    <transition name="slide-fade">
                        <district :ref="navActive" :query="tempSearch"/>
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-SUBDISTRICT'">
                    <transition name="slide-fade">
                        <subdistrict :ref="navActive" :query="tempSearch"/>
                    </transition>
                </template>
                <template v-else-if="navActive === 'k-TIMEZONE'">
                    <transition name="slide-fade">
                        <timezone :ref="navActive" :query="tempSearch"/>
                    </transition>
                </template>

            </div>
        </section>

        <!--Create Country-->
            <dialog-create-edit-country 
            :active="dialogGeolocationCountry" 
            @refresh="refresh"
            :closeDialog="closeDialogCountry"
            title="Create Country"
            />
        <!--Create province-->
            <dialog-create-edit-province 
            :active="dialogGeolocationProvince" 
            @refresh="refresh"
            :closeDialog="closeDialogProvince"
            title="Create Province"
            />
        <!--Create city-->
            <dialog-create-edit-city
            :active="dialogGeolocationCity" 
            @refresh="refresh"
            :closeDialog="closeDialogCity"
            title="Create City"
            />
        <!--Create district-->
            <dialog-create-edit-district
            :active="dialogGeolocationDistrict" 
            @refresh="refresh"
            :closeDialog="closeDialogDistrict"
            title="Create District"
            />
        <!--Create subdistrict-->
            <dialog-create-edit-subdistrict
            :active="dialogGeolocationSubDistrict" 
            @refresh="refresh"
            :closeDialog="closeDialogSubDistrict"
            title="Create Subdistrict"
            />
    </div>
</template>
<script>
import NavItem from "@/components/navbar/navTab"
import Breadcrumb from "@/components/breadcrumb/index"
import SearchInput from "@/components/search/searchInput"

import Geolocation from "@/views/settings/geolocation/geolocation"
import City from "@/views/settings/geolocation/city"
import Country from "@/views/settings/geolocation/country"
import District from "@/views/settings/geolocation/district"
import Province from "@/views/settings/geolocation/province"
import Subdistrict from "@/views/settings/geolocation/subdistrict"
import Timezone from "@/views/settings/geolocation/timezone"

import DialogCreateEditCountry from "@/views/settings/geolocation/country/dialogCreateEditCountry"
import DialogCreateEditProvince from "@/views/settings/geolocation/province/dialogCreateEditProvince.vue"
import DialogCreateEditCity from "@/views/settings/geolocation/city/dialogCreateEditCity.vue"
import DialogCreateEditDistrict from "@/views/settings/geolocation/district/dialogCreateEditDistrict.vue"
import DialogCreateEditSubDistrict from "@/views/settings/geolocation/subdistrict/dialogCreateEditSubDistrict.vue"

export default {
    name:"geolocation-index",
    components: {
        "nav-item": NavItem,
        "breadcrumb": Breadcrumb,
        "search-input": SearchInput,
        "geo-location": Geolocation,
        "city": City,
        "country": Country,
        "district": District,
        "province": Province,
        "subdistrict": Subdistrict,
        "timezone": Timezone,
        "dialog-create-edit-country": DialogCreateEditCountry,
        "dialog-create-edit-province": DialogCreateEditProvince,
        "dialog-create-edit-city": DialogCreateEditCity,
        "dialog-create-edit-district": DialogCreateEditDistrict,
        "dialog-create-edit-subdistrict": DialogCreateEditSubDistrict,
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
                    label: "TIME ZONE",
                    key: "k-TIMEZONE",
                    title: "Time Zone List"
                },
            ],
            title:"Geolocation List",
            navActive: "k-GEOLOCATION",
            tempSearch: "",
            dialogGeolocation: false,
            dialogGeolocationCountry: false,
            dialogGeolocationProvince: false,
            dialogGeolocationCity: false,
            dialogGeolocationDistrict: false,
            dialogGeolocationSubDistrict: false,
            refreshInject:""
        }
    },
    methods: {
        refresh(){
            let el = this.refreshInject
            this.$refs[el].refresh() // trigger function refresh form dari luar component list
        },
        clearSearch() {
            this.$refs.searchInput.clear()
        },
        activeTab(val) {
            this.navActive = val
            this.clearSearch()
            console.log(this.navActive)
            let item = this.navItemm.filter(item => {
                return item.key == val
            })
            this.title = item[0].title
        },
        openDialog(){
            switch(this.navActive) {
                case "k-COUNTRY":
                    this.dialogGeolocationCountry = true
                    break;
                case "k-PROVINCE":
                    this.dialogGeolocationProvince = true
                    break;
                case "k-CITY":
                    this.dialogGeolocationCity = true
                    break;
                case "k-DISTRICT":
                    this.dialogGeolocationDistrict = true
                    break;
                case "k-SUBDISTRICT":
                    this.dialogGeolocationSubDistrict = true
                    break;
                default:
                    console.log('meong')
                    // code block
            }
            this.refreshInject = this.navActive
        },
        closeDialogCountry() {
            this.dialogGeolocationCountry = false
        },
        closeDialogProvince() {
            this.dialogGeolocationProvince = false
        },
        closeDialogCity() {
            this.dialogGeolocationCity = false
        },
        closeDialogDistrict() {
            this.dialogGeolocationDistrict = false
        },
        closeDialogSubDistrict() {
            this.dialogGeolocationSubDistrict = false
        }
    },
}
</script>
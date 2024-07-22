<template>
    <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy" :valueData="searchParams" :selectedValue="searchBy" />
</template>
<script>
import master from "@/mixins/master"
import SelectSearchBy from "@/components/search/selectSearchBy";

export default {
    name: "Select Search By SJ",
    mixins: [master],
    components: {
        "select-search-by": SelectSearchBy,
    },
    data() {
        return {
            searchBy: "manifest_do_number",
            searchPlaceholder: "Search Manifest DO Number",
            searchParams: [
                {
                label: 'Manifest DO Number',
                value: 'manifest_do_number'
                },
                {
                label: 'Vehicle Type',
                value: 'vehicle_type'
                },
                {
                label: 'Driver',
                value: 'pic'
                },
                {
                label: 'Mode',
                value: 'mode'
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
                label: 'Weight',
                value: 'weight'
                },
                {
                label: 'Status',
                value: 'status'
                }
            ],
        }
    },
    methods: {
        updateSearchBy(key, val) {
            this.searchBy = val
            this.searchPlaceholder = key
            this.$emit("updateSearchBy", "SJ", key, val)
        }
    }
}

</script>

<template>
    <select-search-by :isMultiple="false" :border="true" @updateSearchBy="updateSearchBy" :valueData="searchParams" :selectedValue="searchBy" />
</template>
<script>
import master from "@/mixins/master"
import SelectSearchBy from "@/components/search/selectSearchBy";

export default {
    name: "Select Search By Prealert",
    mixins: [master],
    components: {
        "select-search-by": SelectSearchBy,
    },
    data() {
        return {
            searchBy: "inbound_number",
            searchPlaceholder: "Search Inbound Number",
            searchParams: [
              {
                label: "Inbound Number",
                value: "inbound_number",
              },
              {
                label: "Vehicle",
                value: "vehicle_type_name",
              },
              {
                label: "Origin",
                value: "inbound_node_name_origin",

              },
              {
                label: "Bag",
                value: "inbound_total_bag",

              },
              {
                label: "Koli",
                value: "inbound_total_koli",

              },
              {
                label: "Weight",
                value: "inbound_total_weight",

              },
              {
                label: "PIC",
                value: "carrier_employee_name",
              },
              {
                label: "Status",
                value: "status",
              },
              {
                label: "Received At",
                value: "inbound_node_name_receiver",
              }
            ]
        }
    },
    methods: {
        updateSearchBy(key, val) {
            this.searchBy = val
            this.searchPlaceholder = key
            this.$emit("updateSearchBy", "PREALERT", key, val)
        }
    }
}

</script>

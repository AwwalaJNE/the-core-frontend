<template>
    <vs-row class="tab-menu">
        <div
            v-for="(item, key) in arrData"
            :key="key"
            :class="['tab', { active: isActive === item.url }]"
            @click="handleSelect(item.url)"
        >
            {{ item.label }}
        </div>
    </vs-row>
</template>

<script>

export default {
    name: "tab-menu",
    data() {
        return {
            arrData: [
                {
                    label: "Transport Packing Kayu",
                    url: "/transport/packingkayu",
                    icon: "bx bxs-checkbox",
                    permission: "read-packing-kayu",
                    meta: {
                        // resource_type: resourceLookup["TRANSPORT_PACKING_KAYU"].resource_type,
                        // resource_code: resourceLookup["TRANSPORT_PACKING_KAYU"].resource_code,
                        // resource_name: resourceLookup["TRANSPORT_PACKING_KAYU"].resource_name
                    },
                },
                {
                    label: "Inventory Vehicle",
                    url: "/transport/inventory-vehicle",
                    icon: "bx bxs-checkbox",
                    permission: "read-inventory-vehicle",
                    meta: {
                        // resource_type: resourceLookup["TRANSPORT_INVENTORY_VEHICLE"].resource_type,
                        // resource_code: resourceLookup["TRANSPORT_INVENTORY_VEHICLE"].resource_code,
                        // resource_name: resourceLookup["TRANSPORT_INVENTORY_VEHICLE"].resource_name
                    },
                },
                {
                    label: "Manifest Vehicle",
                    url: "/transport/manifest-vehicle",
                    icon: "bx bxs-checkbox",
                    permission: "read-manifest-vehicle",
                    meta: {
                        // resource_type: resourceLookup["TRANSPORT_MANIFEST_VEHICLE"].resource_type,
                        // resource_code: resourceLookup["TRANSPORT_MANIFEST_VEHICLE"].resource_code,
                        // resource_name: resourceLookup["TRANSPORT_MANIFEST_VEHICLE"].resource_name
                    },
                },
                {
                    label: "Surat Muatan",
                    url: "/transport/manifest",
                    icon: "bx bxs-checkbox",
                    permission: "read-manifest",
                    meta: {
                        // resource_type: resourceLookup["TRANSPORT_MANIFEST"].resource_type,
                        // resource_code: resourceLookup["TRANSPORT_MANIFEST"].resource_code,
                        // resource_name: resourceLookup["TRANSPORT_MANIFEST"].resource_name
                    },
                },
                {
                    label: "Surat Jalan",
                    url: "/transport/manifest-jalan",
                    icon: "bx bxs-checkbox",
                    permission: "read-manifest-delivery-order",
                    meta: {
                        // resource_type: resourceLookup["TRANSPORT_SURAT_JALAN"].resource_type,
                        // resource_code: resourceLookup["TRANSPORT_SURAT_JALAN"].resource_code,
                        // resource_name: resourceLookup["TRANSPORT_SURAT_JALAN"].resource_name
                    },
                },
                {
                    label: "HBAG",
                    url: "/transport/hbag",
                    icon: "bx bxs-checkbox",
                    permission: "read-manifest-delivery-order",
                    meta: {
                        // resource_type: resourceLookup["TRANSPORT_SURAT_JALAN"].resource_type,
                        // resource_code: resourceLookup["TRANSPORT_SURAT_JALAN"].resource_code,
                        // resource_name: resourceLookup["TRANSPORT_SURAT_JALAN"].resource_name
                    },
                },
                {
                    label: "MTS",
                    url: "/transport/mts",
                    icon: "bx bxs-checkbox",
                    permission: "read-manifest-delivery-order",
                    meta: {
                        // resource_type: resourceLookup["TRANSPORT_SURAT_JALAN"].resource_type,
                        // resource_code: resourceLookup["TRANSPORT_SURAT_JALAN"].resource_code,
                        // resource_name: resourceLookup["TRANSPORT_SURAT_JALAN"].resource_name
                    },
                },
                {
                    label: "DO",
                    url: "/transport/do",
                    icon: "bx bxs-checkbox",
                    permission: "read-manifest-delivery-order",
                    meta: {
                        // resource_type: resourceLookup["TRANSPORT_SURAT_JALAN"].resource_type,
                        // resource_code: resourceLookup["TRANSPORT_SURAT_JALAN"].resource_code,
                        // resource_name: resourceLookup["TRANSPORT_SURAT_JALAN"].resource_name
                    },
                },
            ],
            isActive: ''
        }
    },
    methods: {
        handleSelect(key) {
            console.log("PP", key)
            this.isActive = key;
        },
    },
    mounted() {
        if (this.arrData.length) {
            this.isActive = this.arrData[0].url;
        }
    },
}
</script>

<style lang="scss" scoped>
.tab-menu {
    gap: 1rem;
    
    .tab {
        display: inline-block;
        padding: 6px 14px;
        border-radius: 9999px;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.4;
        white-space: nowrap;
        transition: all 0.2s ease-in-out;
        
        background-color: white;
        color: #1a1a1a;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);

        &:hover {
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
            cursor: pointer;
        }

        &.active {
            background-color: #F3F7FF;
            color: #195BFF;
            box-shadow: 0 0 6px rgba(0, 123, 255, 0.5);

            &:hover {
                box-shadow: 0 0 8px rgba(0, 123, 255, 0.6);
            }
        }
    }
}
</style>

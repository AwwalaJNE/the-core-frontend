<template>
    <div class="box view">
        <vs-row justify="space-between" align="center" class="row-top">
            <div class="left">
                <span class="vehicle">{{ data.vehicle_id }}</span>
            </div>
            <div class="right">
                <span class="status">Status</span>
            </div>
        </vs-row>

        <div class="divider"></div>

        <vs-row justify="space-between" align="center" class="row-bottom">
            <div class="left">
                <div class="code big">{{ data.origin_vehicle }}</div>
                <div class="date">{{ formatDateTimeId(data.etd_vehicle) }}</div>
            </div>
            <div class="center">
                <template v-if="!data.pic_employee_id">
                    <span class="temp-data">{{ data.flight_number }}</span>
                    <div class="divider small-divider"></div>
                    <span class="date">{{ formatDateTimeId(data.flight_schedule) }}</span>
                </template>
                <template v-else>
                    <div class="divider small-divider"></div>
                    <span class="temp-data">{{ data.pic_employee_id }}</span>
                    <div class="divider small-divider"></div>
                </template>
            </div>
            <div class="right">
                <div class="code big">{{ data.destination_vehicle }}</div>
                <div class="date">{{ formatDateTimeId(data.eta_vehicle) }}</div>
            </div>
        </vs-row>
    </div>
</template>

  
<script>

import master from "@/mixins/master";

export default {
    name: "vehicle-card",
    mixins: [master],
    props: {
        data: Object,
        title: String
    },
};
</script>

<style scoped>
.divider {
    border-top: 1px solid #e5e7eb;
    margin: 0.5rem 0;
}

.small-divider {
    border-top: 1px dashed #cbd5e1;
    margin: 0.5rem auto;
    width: 40%;
}

.row-top,
.row-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.left,
.center,
.right {
    display: flex;
    flex-direction: column;
}

.left {
    text-align: left;
}

.center {
    text-align: center;
    align-items: center;
}

.right {
    text-align: right;
    align-items: flex-end;
}

.code.big {
    font-weight: bold;
    font-size: 1rem;
    max-width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


.date {
    font-size: 0.625rem;
    color: #6b7280;
}

.temp-data {
    font-weight: 600;
    font-size: 0.75rem;
    color: #374151;
}

.vehicle {
    font-weight: 600;
    font-size: 1rem;
}

.status {
    font-size: 0.875rem;
    font-weight: 500;
    color: #9ca3af;
}

</style>

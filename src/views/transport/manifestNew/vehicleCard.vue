<template>
	<div :class="['card', { active: listenIsActive }]">
		<vs-row>
			<vs-col align="left" style="margin-bottom: 10px;">
				<span v-if="listenIsActive" class="badge-3">ACTIVE</span>
			</vs-col>
		</vs-row>
		<vs-row justify="space-between" align="center">
			<vs-col w="6" align="left">
				<h1 class="text-header">{{ listenData.vehicle_id }}</h1>
				<span v-if="!listenData.pic_employee_id" class="text">{{ formatDateTimeId(listenData.flight_schedule) }} {{ listenData.flight_schedule_timezone || "" }}</span>
			</vs-col>
			<vs-col w="6" align="right">
				<span v-if="listenData.status_flight" class="badge">{{ listenData.status_flight }}</span>
			</vs-col>
		</vs-row>

		<div class="divider"></div>

		<vs-row justify="space-between" align="center">
			<vs-col w="4" align="left">
				<h1 class="text-subheader">{{ listenData.origin_vehicle }}</h1>
				<span class="text">{{ formatDateTimeId(listenData.etd_vehicle) }} {{ listenData.etd_vehicle_timezone || "" }}</span>
			</vs-col>

			<vs-col w="4" align="center">
				<template>
					<vs-row>
						<vs-row v-if="!listenData.pic_employee_id">
							<vs-col align="center">
								<img
									:src="require('@/assets/svg/plane.svg')"
									alt="Plane"
									style="width: 10%;"
								/>
							</vs-col>
						</vs-row>

						<vs-row>
							<vs-col w="4">
								<h1 class="text-subheader">{{ listenData.origin_vehicle_tlc }}</h1>
							</vs-col>
							<vs-col w="4">
								<div class="divider small-divider"></div>
							</vs-col>
							<vs-col w="4">
								<h1 class="text-subheader">{{ listenData.destination_vehicle_tlc }}</h1>
							</vs-col>
						</vs-row>

						<vs-row>
							<vs-col align="center">
								<span class="badge-2">{{ listenData.flight_number || listenData.pic_employee_id }}</span>
							</vs-col>
						</vs-row>
					</vs-row>
				</template>
			</vs-col>

			<vs-col w="4" align="right">
				<h1 class="text-subheader">{{ listenData.destination_vehicle }}</h1>
				<span class="text">{{ formatDateTimeId(listenData.eta_vehicle) }} {{ listenData.eta_vehicle_timezone || "" }}</span>
			</vs-col>
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
		isActive: Boolean
	},
	computed: {
		listenData() {
			return this.data || {};
		},
		listenIsActive() {
			return this.isActive || false;
		}
	}
};
</script>

<style lang="scss" scoped>
.card {
	background: #fff;
	border-radius: 20px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	padding: 20px;
	margin-bottom: 20px;
	transition: transform 0.2s ease, box-shadow 0.2s ease;

	.divider {
		border-top: 1px solid #e5e7eb;
		margin: 20px 0;
	}

	.small-divider {
		border-top: 1px dashed rgba(var(--vs-color), 1);
		margin: 0.5rem auto;
	}

	.text-header {
		font-weight: 900;
		font-size: 18px;
		margin-bottom: 0;
	}

	.text-subheader {
		font-weight: 400;
		font-size: 14px;
	}

	.text {
		font-size: 12px;
	}

	.temp-data {
		font-weight: 600;
		font-size: 0.75rem;
		color: #374151;
	}

	.badge,
	.badge-2,
	.badge-3 {
		padding: 4px 10px;
		border-radius: 999px;
		font-weight: bold;
		text-transform: uppercase;
		font-size: 12px;
		min-width: 100px;
		text-align: center;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
	}

	.badge {
		color: #fff;
		background-color: var(--bg-color, #3498db);
	}

	.badge-2 {
		color: #fff;
		background-color: rgba(var(--vs-color), 1);
	}

	.badge-3 {
		color: #fff;
		background-color: #28a745;
		margin: 10px 0;
	}

	&.active {
		border: 1px solid rgba(var(--vs-color), 1);
	}
}
</style>

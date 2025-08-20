<template>
	<div :class="['card', { disabled: listenIsDisabled }]">
		<vs-row justify="flex-start" align="center">
			<vs-col w="1"></vs-col>
			<vs-col w="3" align="left">
				<h1 class="text-header">{{ listenData.origin_code }}</h1>
				<span class="text">REGIONAL CODE</span>
			</vs-col>
			<vs-col w="4" align="center">
				<template v-if="listenData.transit_at">
					<h1 class="text-header">{{ formatTimestamp(listenData.transit_at) }}</h1>
					<span class="text">TRANSIT TIME</span>
				</template>
			</vs-col>
			<vs-col :w="listenData.transit_at ? 4 : 3" align="right">
				<h1 class="text-header">{{ listenData.is_planned === "1" ? 'PLANNED' : 'UNPLANNED' }}</h1>
				<span class="text">STATUS</span>
			</vs-col>
		</vs-row>
	</div>
</template>

<script>
import master from "@/mixins/master";

export default {
	name: "transit-card",
	mixins: [master],
	props: {
		data: Object,
		isDisabled: Boolean
	},
	computed: {
		listenData() {
			return this.data || {};
		},
		listenIsDisabled() {
			return this.isDisabled || false;
		}
	}
};
</script>

<style lang="scss" scoped>
.card {
	background: #fff;
	border-radius: 9px;
	border: 1px solid #E6E9EA;
	padding: 20px;
	transition: transform 0.2s ease, box-shadow 0.2s ease;

	.text-header {
		font-weight: 900;
		font-size: 18px;
		margin-bottom: 0;
	}
	
	.text {
		font-size: 12px;
	}

	&.disabled {
		background-color: #E6E9EA;
	}
}
</style>

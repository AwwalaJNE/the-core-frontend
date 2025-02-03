<template>
	<div class="error-page">
		<div class="error-content">
			<h1 class="error-page-title">System Maintenance</h1>
			<p class="error-page-text">
				Our website is currently undergoing scheduled maintenance. We should be back shortly. Thank you for you patience.
			</p>
		</div>
		<img src="@/assets/svg/systemMaintenance.svg" alt="Core JNE System Maintenance" />
	</div>
</template>

<script>
export default {
	name: "System-Maintenance",
};
</script>

<style lang="scss" scoped>
.error-page {
	display: flex;
	justify-content: space-around;
	align-items: center;
	text-align: left;
	padding: 2rem;

	&-title {
		font-size: 4rem;
		margin-bottom: 10px;
		color: #263238;
	}

	&-code {
		font-size: 10rem;
		font-weight: bold;
		color: #407BFF;
	}

	&-text {
		font-size: 1rem;
		color: #263238;
	}

	img {
		width: 60%;
	}
}
</style>

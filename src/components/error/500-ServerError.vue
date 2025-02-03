<template>
	<div class="error-page">
		<div class="error-page-content">
			<h1 class="error-page-code">500</h1>
			<h1 class="error-page-title">Internal Server Error</h1>
			
		</div>
		<img src="@/assets/svg/500.svg" alt="Core JNE 505" />
		<p class="error-page-text">
			Please try again later or feel free to contact us if the problem persists.
		</p>
	</div>
</template>

<script>
export default {
	name: "Internal-Server-Error",
};
</script>

<style lang="scss" scoped>
.error-page {
	text-align: center;

	&-content {
		display: flex;
		justify-content: center;
		gap: 2rem;
	}

	&-title {
		font-size: 4rem;
		margin-bottom: 10px;
		color: #263238;
	}

	&-code {
		font-size: 4rem;
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

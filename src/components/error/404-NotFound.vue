<template>
	<div class="error-page">
		<img src="@/assets/svg/404.svg" alt="Core JNE 404" />
		<div class="error-content">
			<h1 class="error-page-title">Page Not Found</h1>
			<h1 class="error-page-code">404</h1>
			<p class="error-page-text">
				The page you are trying to access doesn’t exist or has been moved.<br /> Try going back to our homepage.
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "NotFound",
};
</script>

<style lang="scss" scoped>
.error-page {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;

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

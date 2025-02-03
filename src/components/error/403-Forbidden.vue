<template>
	<div class="error-page">
		<img src="@/assets/svg/403.svg" alt="Core JNE 403" />
		<div class="error-content">
			<h1 class="error-page-title">Forbidden</h1>
			<h1 class="error-page-code">403</h1>
			<p class="error-page-text">
				You don’t have permission to access this page.
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "Forbidden",
};
</script>

<style lang="scss" scoped>
.error-page {
	display: flex;
	justify-content: space-around;
	align-items: center;
	text-align: center;
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

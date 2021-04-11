<template>
	<div id="app">
		<div class="parent_container">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
import './assets/fonts/_fonts.scss'
import 'boxicons/css/boxicons.min.css'
export default {
	name: "App",
	mounted() {
		console.log('TOLONG GIMANA CARANYA CEK AUTH DISINI :(');
	}
}
</script>

<style lang="scss">
html{
	font-family: "NunitoSans-Regular";
}
#app {
  font-family: "NunitoSans-Regular";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $fontColor;
  min-height: 100vh;
  h1,h2,h3,h4,h5{
	  font-family: "NunitoSans-Bold";
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	span{
		font-family: "NunitoSans-Bold";
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
  }
  p,span,a,small{
	  font-family: "NunitoSans-Regular";
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
  }
}
</style>

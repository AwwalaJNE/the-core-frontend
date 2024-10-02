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
import master from "@/mixins/master"
export default {
	name: "App",
    mixins: [master],	
	mounted() {
		this.checkAuthRequest()
		this.redirectShortcut()
		// console.log('TOLONG GIMANA CARANYA CEK AUTH DISINI :(');
		// console.log('CEK DI MIXIN KANG, ITU ADA HELPER UNTUK AMBIL TOKEN BUAT HEADER');
	}
}
</script>

<style lang="scss">
html{
	font-family: "OpenSans-Regular";
}
#app {
  font-family: "OpenSans-Regular";
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
	  font-family: "OpenSans-Regular";
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
  }
  button{
	  font-family: "NunitoSans-Regular";
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
  }
  input[type="date"], input[type="text"]{
	  font-family: "OpenSans-Regular";
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
  }
}
</style>

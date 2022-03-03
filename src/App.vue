<template>
  <div id="app">
    <div class="footer"><router-view/></div>
    <FooterView class="footercom"/>
  </div>
</template>


<script>
import FooterView from './components/FooterView.vue'
export default {
    components:{
      FooterView
    }
}
</script>


<style>
  #app{
		display: flex;
		flex-direction: column;
	};
	.footer{
		flex:1;
		overflow: hidden;
	}
	.footercom{
		height: 3.125rem;
		display: flex;
		flex-direction: row;
	}
</style>

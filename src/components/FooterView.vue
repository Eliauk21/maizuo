<template>
    <div v-if="$store.state.showFoot">
		<van-tabbar v-model="active" inactive-color="#000" class="footer">
			<van-tabbar-item  @click="jump('/film')" icon="video-o">电影</van-tabbar-item>
			<van-tabbar-item  @click="jump('/cinema')" icon="shop-o">影院</van-tabbar-item>
			<van-tabbar-item  @click="jump('/news')" icon="comment-o">资讯</van-tabbar-item>
			<van-tabbar-item  @click="jump('/mine')" icon="friends-o">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
    data(){
		return{
			active: 0,
		};
	},
	created(){
		let rou = this.$route.fullPath;
		if(rou.includes('film')){
			this.active = 0;
		}else if(rou.includes('cinema')){
			this.active = 1;
		}else if(rou.includes('news')){
			this.active = 2;
		}else{
			this.active = 3;
		}
	},
	methods:{
		jump(route){
			if(this.$store.state.cityName === ''){
				this.$router.push('/city');
			}else{
				this.$router.push(route);
			}
		}
	}
}
</script>

<style scoped>
.footer{height: 80px;font-size: 40px;}
</style>
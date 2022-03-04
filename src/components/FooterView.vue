<template>
    <div v-if="$store.state.showFoot">
		<van-tabbar v-model="active" inactive-color="#000" class="footer">
			<van-tabbar-item  replace to="/film" icon="video-o">电影</van-tabbar-item>
			<van-tabbar-item  replace to="/cinema" icon="shop-o">影院</van-tabbar-item>
			<van-tabbar-item  replace to="/news" icon="comment-o">资讯</van-tabbar-item>
			<van-tabbar-item  replace to="/mine" icon="friends-o">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
    data(){
		return{
			active: 0,
		};
	}
}
</script>

<style scoped>
.footer{height: 70px;font-size: 40px;}
</style>
<template>
	<div class="cityList">
        <form action="/">
          <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
          />
        </form>
		<div v-if="isShow">
            <div class="hotCityOUT">
		    	<div class="hotcity">热门城市</div>
                <template v-for="item in indexList"><template  v-for="city in item.content"><span v-if="city.isHot"  :key="city.cityId">{{city.name}}</span></template></template>
		    </div>
    
            <van-index-bar>
                <div v-for="item,index in indexList" :key="item.title" >
                    <van-index-anchor :index="item.title"/>
                    <van-cell :title="item.name" v-for="item in indexList[index].content" :key="item.cityId" @click="checkcity(item.cityId,item.name)" active-color="#1989fa"/>
                </div>
            </van-index-bar>
        </div>
        <div v-else @click="jump('/film')" class="sec">
            {{city}}
        </div>
	</div>
</template>

<script>
    import axios from "axios";
	export default {
        data(){
            return {
                value:'',
				indexList: [{title: "A",content: []}, {	title: "B",	content: []}, {	title: "C",	content: []}, {	title: "D",	content: []}, {	title: "E",	content: []}, {	title: "F",	content: []}, {	title: "G",	content: []}, {	title: "H",	content: []}, {	title: "J",	content: []}, {	title: "K",	content: []}, {	title: "L",	content: []}, {	title: "M",	content: []}, {	title: "N",	content: []}, {	title: "P",	content: []}, {	title: "Q",	content: []}, {	title: "R",	content: []}, {	title: "S",	content: []}, {	title: "T",	content: []}, {	title: "W",	content: []}, {	title: "X",	content: []}, {	title: "Y",	content: []}, {	title: "Z",	content: []}],
                isShow:true,
                city:''
            }
		},
        created(){
            /*  */
            axios.get('api/v1/getCitiesInfo').then((res) => {
                for(let i=0;i<this.indexList.length;i++){
                    this.indexList[i].content =  res.data.data.cities.filter((v)=>{
                       return v.pinyin.substr(0,1) === this.indexList[i].title.toLowerCase();
                    })
                }
                /* console.log(res.data.data.cities); */
            })
        },
        methods:{
            checkcity(cityId,name){
                this.$store.state.cityId = cityId;
                this.$store.state.cityName = name;
                this.$router.push('/film');
            },
            onSearch(){
                /* ,eslint:recommended" */
                for(let i=0;i<this.indexList.length;i++){
                    for(let j=0;j<this.indexList[i].content.length;j++){
                        if(this.indexList[i].content[j].name === this.value){
                            this.city = '';
                            this.isShow = false;
                            this.$store.state.cityId = this.indexList[i].content[j].cityId
                            this.$store.state.cityName = this.value;
                            this.city = this.$store.state.cityName;
                            return;
                        }else{
                            this.city = 'NotFound'
                            this.isShow = false;
                        }
                    }
                }
            },
            onCancel(){
                this.isShow = true;
            },
            jump(route){
                this.$router.push(route);
            }
        },
        beforeRouteEnter(to,from,next){
            next(vm => vm.$store.state.showFoot = false);       //未执行next(),得不到this
        },
        beforeRouteLeave(to, from, next) {
            this.$store.state.showFoot = true;
            next();
        }
    }
</script>
<style>
.hotCityOUT{
	margin-left: 0.625rem;
}
.hotcity{
	font-size: 0.75rem;
	color: #A7A9AD;
}
.sec{padding-left: 20px;}
.hotCityOUT span{
	font-size: 0.875rem;
	display: inline-block;
	width: 7rem;
	height: 2rem;
	line-height: 2rem;
	text-align: center;
	background-color: #F4F4F4;
	border-radius: 0.125rem;
	margin: 0.625rem;
}
</style>

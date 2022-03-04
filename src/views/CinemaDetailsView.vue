<template>
  <div>
    <van-nav-bar>
    <template #left>
        <van-icon name="arrow-left" color="lightgray" size="20" @click="jump('/cinema')"/>
    </template>
    </van-nav-bar>
    <div class="cinema-name">
        {{cinema.name}}
    </div>
    <div class="tag van-hairline--bottom">
        <van-tag plain color="#FF8000" class="tags">前台兑换</van-tag>
        <van-tag plain color="#FF8000" class="tags">儿童票</van-tag>
        <van-tag plain color="#FF8000" class="tags">停车</van-tag>
        <van-tag plain color="#FF8000" class="tags">3D眼镜</van-tag>
    </div>
    <div class="box">
       <van-icon name="location-o" color="lightgray" size="25" />
       <div class="address">
           {{cinema.address}}
       </div>
       <van-icon name="phone-o" color="lightgray" size="25" />
    </div>
   
    <!-- Swiper -->
    <div class="swiper-container" :style="{'background-image':'url()'}">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in filmList" :key="item.filmId"><img :src="item.poster"></div>
      </div>
    </div>
  
    <div v-if="filmList.length">
      <div class="film-name van-hairline--bottom">{{ filmList[filmActiveIndex].name}}<span class="orange">7分</span></div>
      <div class="film-detail van-hairline--bottom">{{ filmList[filmActiveIndex].category}}|{{ filmList[filmActiveIndex].runtime}}|{{filmList[filmActiveIndex].director}}</div>
    </div>
  

  </div> 
</template>

<script>
 import Swiper from 'swiper/swiper-bundle.js'
 import "swiper/swiper-bundle.css"
 import axios from 'axios';

export default {
  data(){
    return {
      active: 0,
      cinema:{},
      filmList:[],
      filmActiveIndex:0,
      img:''
    };
  },
  mounted(){
    axios.get(`api/v1/getCinemaList?cityId=${this.$store.state.cityId}`).then((res)=>{
        this.cinema = res.data.data.cinemas.find((v)=>{
            return v.cinemaId == this.$route.query.cinemaId
        })
    })
    axios.get(`/api/v1/getCinemaFilmsArrangement?cinemaId=${this.$route.query.cinemaId}`).then((res)=>{
        console.log(res.data.data.films);
        this.filmList = res.data.data.films;
        this.$nextTick().then(()=>{
            var swiper = new Swiper('.swiper-container',{
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: true,
                loop: true,
                pagination: {
                el: '.swiper-pagination',
                clickable: true,
                },
               on: {
                touchStart: (swiper,event)=>{  
                  
                }
              }
            });
            setInterval(()=>{
              this.filmActiveIndex = swiper.activeIndex-3;
              this.img=this.filmList[this.filmActiveIndex].poster;
            },1000)
        });
    })
  },
  methods:{
      jump(route){
          this.$router.push(route);
      }
  }
}
</script>

<style scoped>
img{width: 100%;height: 100%;}
.list{display: flex;height: 60px;padding: 10px;}
.left{width: 80px;margin-right:10px;}
.center{width: 150px;margin-right:10px;}
.right{width: 120px;line-height: 60px;height: 60px;}
.small{font-size:14px;color:darkgray;line-height: 25px;}
.type{line-height: 25px;}
.time{line-height: 25px;}
.price{margin-right:15px;color:#FF8000;}

  .cinema-name{width: 100%;text-align: center;height: 60px;line-height: 60px;font-size: 18px;}
  .tag{width: 100%;text-align: center;height: 40px;}
  .box{display: flex;justify-content:space-evenly;align-items: center;height: 50px;}
  .address{font-size: 14px;color: #000;line-height: 20px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:210px;}
  .tags{margin-right: 5px;}

  .swiper-container{height: 150px;border: 1px solid #ccc;}
  .swiper-slide{border: 1px solid #ccc;}

    .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    transition: 300ms;
    transform: scale(0.8);
}
.swiper-slide-active,.swiper-slide-duplicate-active{
    transform: scale(1);
}
.film-name{height: 40px;line-height: 40px;text-align: center;}
.orange{color:#FF8000;margin-left: 5px;}
.film-detail{text-align: center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:210px;margin: 0 auto;color:darkgray;font-size: 14px;}


</style>    
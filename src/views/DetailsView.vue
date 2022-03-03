<template>
  <div style="background: rgb(221, 212, 212)" class="van-hairline--surround">
    <!-- 头部板块 -->
    <div
      class="head"
      style="background: white"
      :style="{ height: this.activeh ? '410px' : '480px' }"
    >
      <van-sticky>
        <van-nav-bar :title="filmsInfo.name" left-arrow @click-left="onClickLeft" />
      </van-sticky>
      <van-image
        class="head-img"
        width="100%"
        height="12.5rem"
        fit="cover"
        :src="filmsInfo.poster"
      />

      <div class="moviemain van-multi-ellipsis--l2">
        <h3>
          {{ filmsInfo.name }}
          <div class="pengfeng">{{ filmsInfo.grade }}分</div>
          <!-- <span class="yingsi">{{ filmsInfo.filmType.name }}</span> -->
        </h3>
        <div class="head-text">
          <div>{{ filmsInfo.category }}</div>
          <div>{{ filmsInfo.nation }} | {{ filmsInfo.runtime }}分钟</div>
          <div class="van-multi-ellipsis--l3">
            {{ filmsInfo.synopsis }}
          </div>
        </div>
      </div>
      <p @click="headTextHeight" class="toheight"><van-icon name="minus" /></p>
    </div>
    <!-- 中间板块 -->
    <!-- 演职人员 -->
    <div class="main" style="background: white">
      <h3>演职人员</h3>
      <!-- <van-grid :border="false" >
        <van-grid-item
          v-for="item in filmsInfo.actors"
          :key="item.name"
          icon="photo-o"
          text="文字"
        >
          <van-image :src="item.avatarAddress" />
          <p>
            {{item.name}}<br />
            {{item.role}}
          </p>
        </van-grid-item>
      </van-grid> -->
      <div class="swiper-container">
       <div class="swiper-wrapper">
         <div class="swiper-slide" v-for="item in filmsInfo.actors" :key="item.name"><img :src="item.avatarAddress"></div>
       </div>
      </div>
      <div class="center">{{actor.role && '角色：'}}{{actor.role}}</div>
      <div class="center">{{actor.name && '演员：'}}{{actor.name}}</div>
    </div>
    <br />
    <!-- 底部板块 -->
    <!-- <van-submit-bar :price="3050" button-text="确定购买" /> -->
  </div>
</template>

<script>
import Swiper from 'swiper/swiper-bundle.js'
import "swiper/swiper-bundle.css"
import axios from "axios";
export default {
  data() {
    return {
      filmsInfo: {},
      activeh: true,
      actor:{}
    };
  },
  mounted() {
    axios.get(`/api/v1/getFilmInfo?filmId=${this.$route.query.filmId}`).then((res) => {
      this.filmsInfo = res.data.data.film;
      console.log(res.data.data.film);
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
          this.actor = this.filmsInfo.actors[swiper.activeIndex-3];
          console.log(this.actor);
        },1000)
      });
    });
  },
  methods: {
    onConfirm() {
      this.$refs.item.toggle();
    },
    headTextHeight() {
      // this.$refs.headTextHeight.h
      this.activeh = !this.activeh;
    },
    onClickLeft() {
      this.$router.push('/film');
    }
  },
};
</script>

<style  scoped>
.head {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
}
.main {
  width: 100%;
  height: 20rem;
  margin-top: 5px;
  padding-left: 10px;
  overflow: hidden;
  display: inline-block;
}

.head-button {
  float: left;
}
.head-img {
  clear: both;
}
.xuan-bottom {
  width: 100%;
  position: relative;
  bottom: 0;
}
.head h3 {
  font-weight: normal;
  text-indent: 0.5625rem;
}
.head-text {
  font-size: 1rem;
  color: rgb(118 120 125);
  text-indent: 0.625rem;
  padding: 10px;
}
.toheight {
  /* position: absolute; */
  height: 30px;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 0;
  margin: 0;
}
.moviemain {
  flex: 1;
}
.pengfeng {
  color: Orange;
  float: right;
}
.yingsi {
  background: rgb(190, 190, 190);
  color: white;
  font-size: 0.9375rem;
}
.ditu {
  width: 15%;
  height: 20px;
  overflow: hidden;
  background: rbg(250 250 250 0.8);
}
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

  .swiper-container{height: 150px;border: 1px solid #ccc}
  .swiper-slide{border: 1px solid #ccc}

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
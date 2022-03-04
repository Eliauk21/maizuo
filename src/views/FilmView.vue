<template>
  <div id="film">
    <router-link to="city">
      <van-button type="primary" class="choose-city">{{ $store.state.cityName }}<van-icon name="arrow-down" /></van-button>  
    </router-link>  
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
       <van-swipe-item>
           <img src="https://static.maizuo.com/v5/upload/7f69e0a2f24fea415f83166a2cbecde4.jpg?x-oss-process=image/quality,Q_70" alt="">
       </van-swipe-item>
       <van-swipe-item>
           <img src="https://static.maizuo.com/v5/upload/b4eacc3e37c6559cd1f8b8bf02cc3de7.jpg?x-oss-process=image/quality,Q_70" alt="">
       </van-swipe-item>
       <van-swipe-item>
           <img src="https://static.maizuo.com/v5/upload/db00f522eb0683d27e166f13a25d436e.jpg?x-oss-process=image/quality,Q_70" alt="">
       </van-swipe-item>
    </van-swipe>

     
    <van-tabs>
      <van-tab title="正在热映">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text=""
          @load="onLoad"
        >
          <van-cell v-for="item in nowList" :key="item.videoId" @click="jump(`/filmDetails?filmId=${item.filmId}`)">
              <van-card
                :title="item.name"
                :thumb="item.poster"
              >
                <template #tags>
                  <p class="actortext">
                    <span>观众评分{{item.grade}}</span>
                    <br>
                     主演：<span
                    class="text"
                    v-for="(i, index) in item.actors"
                    :key="index"
                    >{{ i.name }}
                  </span>
                  <br>
                  <span class="text">{{ item.nation }} | {{ item.runtime }}分钟</span>
                  </p>
                  
                  <van-button
                    plain
                    type="primary"
                    hairline
                    size="small"
                    color="red"
                    class="buy"
                    @click.stop="jump('/cinema?filmId=${item.filmId}')"
                    >购票</van-button
                  >
                  <!--  -->
                </template>
              </van-card>
          </van-cell>
        </van-list>
      </van-tab>

      <van-tab title="即将上映">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="item in soonList" :key="item.filmId" @click="jump(`/filmDetails?filmId=${item.filmId}`)">
              <van-card :title="item.name" :thumb="item.poster">
                <template #tags>
                  <p class="actortext">
                    主演：<span
                    class="text"
                    v-for="(i, index) in item.actors"
                    :key="index"
                    >{{ i.name }}
                  </span>
                  </p>
                  <p class="text">上映日期</p>
                </template>
              </van-card>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
    
    <el-backtop  :bottom="100">
      <div class="back">
        <i class="el-icon-upload2"></i>
      </div>
    </el-backtop>
  </div>
  
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex';

export default {
  data() {
    return {
      nowList: [],
      soonList: [],
      loading: false,
      finished: false
    };
  },
  computed:{
    ...mapState(['cityId'])
  },
  methods: {
    onLoad() {
      axios.get(`/api/v1/getNowPlayingFilmList?cityId=${this.cityId}&pageNum=1&pageSize=10`).then((res) => {
        this.nowList = res.data.data.films;
        this.loading = false;
        if (this.nowList.length >= res.data.data.films.length) {
          this.finished = true;
        }
      });
      axios.get(`api/v1/getComingSoonFilmList?cityId=${this.cityId}&pageNum=1&pageSize=10`).then((res) => {
        this.soonList = res.data.data.films;
      });
    },
    jump(route){
      this.$router.push(route)
    }
  }
};
</script>

<style scoped>
.city{position: absolute;}
.my-swipe img{width: 100%;}
.text {
  line-height: 20px;
  color: #646566;
}
#film .van-cell {
  /* font-size: 50px; */
  position: relative;
}
#film .van-card {
  font-size: 15px;
  padding: 15px 0;
  background-color: #fff;
}
#film .van-card p{
  font-size: 13px;
}
#film .buy {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 20px;
  margin: auto;
}
#film .van-card__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#film .actortext{
  width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#film .choose-city{
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
  width: 50px;
  height: 24px;
  font-size: 8px;
  padding: 0;
  border-radius: 12px;
  background: rgba(255,255,255,.3);
  border: 0;
}
.back{
  height: 100%;
  width: 100%;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0,0,0, .12);
  text-align: center;
  line-height: 40px;
  color: #ccc;
}
</style>
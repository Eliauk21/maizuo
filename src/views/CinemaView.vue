<template>
  <div>
    <div>
      <van-nav-bar title="影院">
        <template #left>
          {{$store.state.cityName}}&nbsp;<van-icon name="arrow-down" color="#000" @click="jump('/city')"/>
        </template>
        <template #right>
          <van-icon name="search" size="18" color="#000"/>
        </template>
      </van-nav-bar>
    </div>
    <div class="cinema-list" v-for="item,index in list" :key="index" @click="jump(`/cinemaDetails?cinemaId=${item.cinemaId}`)">
       <div class="shop">{{ item.name }}<span class="price">￥{{item.lowPrice/100}}&nbsp;<span class="orange">起</span></span></div>
       <div class="box">
         <div class="address">{{ item.address }}</div>
         <span class="distance">3.3km</span>
       </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      list: {}
    }
  },
  computed:{
    ...mapState(['cityId'])
  },
  created(){
    axios.get(`api/v1/getCinemaList?cityId=${this.cityId}&pageNum=1&pageSize=10`).then((res)=>{
      this.list = res.data.data.cinemas;
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
  .cinema-list{height: 55px;border-bottom: 1px solid rgba(218, 206, 206, 0.179);padding: 10px;}
  span{float: right;}
  .shop{font-size: 17px;line-height: 30px;}
  .price{font-size: 17px;color: #FF8000;}
  .address{font-size: 14px;color: lightgray;line-height: 20px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:210px;}
  .box{position: relative;}
  .distance{font-size: 14px;color: lightgray;margin-right: 15px;position: absolute;bottom: 5px;right: 0;}
  .orange{color: #FF8000;font-size: 12px;}

 
</style>

<template>
  <div>
    <van-nav-bar title="电影订单">
      <template #left>
        <van-icon name="arrow-left" color="#000" @click="goback" />
      </template>
      <!-- <template #right>
          <van-icon name="search" size="18" color="#000"/>
        </template> -->
    </van-nav-bar>

    <!-- 列表 -->
    <van-swipe-cell>
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        class="goods-card"
        thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" id="dbutton"/>
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  methods: {
    goback() {
      this.$router.back();
    },
  },
};
</script>

<style>
  .goods-card {
    margin: 0;
    /* background-color: @white; */
  }

  #dbutton {
    height: 100%;
  }

</style>
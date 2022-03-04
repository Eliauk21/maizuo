<template>
  <div>
    <div class="head">
      <img
        src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png"
        alt=""
      />
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        center
        clearable
        v-model="yzm"
        name="yzm"
        label="验证码"
        placeholder="请输入短信验证码"
        :rules="rulesYzm"
      >
        <template #button>
          <van-button size="small" @click="yzmSubmit" :disabled="yzmDisabled"
            >{{ yzmText }}
          </van-button>
          <van-notify
            v-model="show"
            type="success"
            background="transparent"
            color="#ff5f16"
          >
            <span>您的验证码是： {{ yzmInto }}</span>
          </van-notify>
        </template>
      </van-field>
      <div style="margin: 16px" class="sub-btn">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          @click="loginBtm"
          >登陆</van-button
        >
      </div>
    </van-form>

    <div class="not-received">收不到验证码</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      yzm: "",
      rulesYzm: [],
      yzmInto: "",
      show: false,
      yzmText: "发送验证码",
      yzmDisabled: false
    };
  },
/* YingYuan */
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      // this.rulesYzm = "required: true, message: '请填写验证码'"
    },
    yzmSubmit() {
      console.log(1);
      if (this.phone === "") {
        this.rulesYzm = "";
      } else {
        this.yzmInto = "";
        // let yzm = "";
        for (let i = 0; i < 4; i++) {
          this.yzmInto += Math.floor(Math.random() * 10);
        }
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, 4000);
        console.log(this.yzmInto);
        let now = 10;
        this.yzmText = `再次发送${now}S`;
        this.yzmDisabled = true;
        let timer = setInterval(() => {
          now--;
          this.yzmText = `再次发送${now}S`;
          
          if (now === 0) {
            clearInterval(timer);
            this.yzmText = "发送验证码";
            this.yzmDisabled = false;
          }
        }, 1000);
      }
    },
    // return yzm;
    loginBtm() {
      console.log(this.phone);
      if ( this.yzm === "" ) {
        this.rulesYzm = [{required: true, message: '请填写验证码'}];
      } else {
        if (this.yzmInto === this.yzm) {
          this.$store.state.phone = this.phone
          this.$router.push('/mine');
        }
      }
    },
  },
};
</script>

<style scoped>
.head {
  text-align: center;
  overflow: hidden;
}
.head img {
  margin-top: 70px;
  width: 60px;
  height: 60px;
  margin-bottom: 40px;
}
.van-button--info {
  background-color: #ff5f16;
  border: #ff5f16;
}
.van-button--info[data-v-26084dc2] {
  margin-top: 60px;
}
.van-button--small {
  background: #ff5f16;
  border: #ff5f16;
  color: #fff;
}
.not-received {
  font-size: 12px;
  color: #999;
  float: right;
  margin-right: 20px;
}
</style>

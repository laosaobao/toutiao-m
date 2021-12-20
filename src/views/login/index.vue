<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar" />
    <van-form @submit="onSubmit()">
      <van-field
        v-model="user.mobile"
        name="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写用户名' }]"
        ><i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
        ><i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>\
        <template #button>
          <van-button class="send-sms-btn" round size="small" type="default"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from "@/api/user";
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      }
    }
  },
  methods: {
    async onSubmit() {
      const user = this.user;
      try {
        const res = await login(user);
        console.log("登录成功", res);
      } catch (err) {
        if(err.response.status===400)
        console.log("手机号或验证码错误", err);
        else
        console.log("登录失败", err)
      }
    }
  }
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 159px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background: #6db4fd;
    }
  }
}
</style>
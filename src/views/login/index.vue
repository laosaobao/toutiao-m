<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar" >
  <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>


    <van-form ref="loginForm" @submit="onSubmit()">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="手机号"
        :rules="userFormRules.mobile"
        type="number"
        ><i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="密码"
        :rules="userFormRules.code"
        ><i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>\
        <template #button>
          <van-count-down :time="1000*5" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow=false"/>
          <van-button v-else native-type="button" class="send-sms-btn" round size="small" type="default"
            @click="onSendSms()">获取验证码
            </van-button>

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
import { login ,sendSms} from "@/api/user";
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      userFormRules:{
        mobile:[
          { required: true, message: '请填写用户名' },
          {pattern:/1[3|5|7|8]\d{9}/,message:'手机号格式错误'},
          ],
        code:[
          { required: true, message: '请填写用户名' },
          {pattern:/\d{6}/,message:'验证码格式错误'},
          ]
      },
      isCountDownShow:false
    }
  },
  methods: {
    async onSubmit() {
      const user = this.user;
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration:0
      })
      try {
        const {data}  = await login(user);
        this.$store.commit('setUser',data.data)
        console.log("登录成功", data);

        this.$toast.success("登录成功")
      } catch (err) {
        if (err.response.status === 400)
        this.$toast.fail("手机号或验证码错误")
        else this.$toast.fail("登录失败")
      }
    },
   async onSendSms(){
      try{
         await this.$refs.loginForm.validate('mobile')
         }
      catch(error){
       return console.log(error)
        }
        //验证成功 开始倒计时
        this.isCountDownShow=true
        //发送验证码
         try {
           await sendSms(this.user.mobile)
         } catch (error) {
           console.log('发送失败',error)
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
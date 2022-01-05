<template>
  <div class="layout-container">

    <router-view />
    <van-tabbar route class="layout-tabbar" >
      <van-tabbar-item icon="home-o" to="/">
        <span class="text"> 首页</span>
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="home-o" to="/qa">
        <span class="text">问答</span>
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="home-o" to="/video">
        <span class="text"> 视频</span>
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="home-o" to="/my">
        <span class="text"> 我的</span>
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  data() {
    return {

    }
  },
  methods: {

  }

}
</script>

<style scoped lang="less">
.layout-container{

 .layout-tabbar{
     i.toutiao{
         font-size: 40px;
     }
     span.text{
         font-size: 20px;
     }
 }
}
</style>

<!--  -->
<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
      liked: value === 1,
    }"
    :loading="loading"
    @click="onLike"
  ></van-button>
</template>

<script>
import{ addLike,deleteLike}from '@/api/article'
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId:{
        type:[Number,String,Object],
        required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },

  components: {},

  computed: {},
  watch: {},

  methods: {
    async onLike() {
      // 两个作用：1、交互提示 2、防止网络慢用户连续不断的点击按钮请求
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        // 如果已经点赞，则取消点赞
        let status=-1
        if (this.value === 1) {
          await deleteLike(this.articleId)
          this.value = -1


          this.$toast.success('取消点赞')

        } else {
          // 否则添加点赞
          await addLike(this.articleId)
          status=1
          this.$toast.success('点赞成功')

        }
        this.$emit('input',status)
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    }
  },

  created() { },

  mounted() { }

}

</script>
<style lang='less' scoped>
.liked {
  .van-icon {
    color: #ffa500;
  }
}
</style>
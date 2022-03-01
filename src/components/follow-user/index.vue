<!--  -->
<template>
  <van-button
    v-if="!is_followed"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow()"
    :loading="loading"
    >关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    round
    size="small"
    @click="onFollow()"
    :loading="loading"
    >已关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  model: {//自定义v-mode传递的参数名称
    prop: 'is_followed',
    event: 'update-is_follow'
  },
  props: {
    is_followed: {
      type: Boolean,
      required: true
    }
    ,
    UserId: {
      type: [String, Number, Object],
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
    async onFollow() {
      this.loading = true
      try {
        // 如果已关注，则取消关注
        // const authorId = this.article.aut_id
        if (this.is_followed) {
          await deleteFollow(this.UserId)
        } else {
          // 否则添加关注
          await addFollow(this.UserId)
        }

        // // 更新视图
        // this.article.is_followed = !this.article.is_followed
        this.$emit('update-is_follow', !this.is_followed)
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  },

  created() { },

  mounted() { }

}

</script>
<style lang='less' scoped>
</style>
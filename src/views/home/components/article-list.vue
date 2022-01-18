<template>
  <div class="article-list">
    <van-pull-refresh v-model="isreFreshLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
export default {

  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      timestamp: null,
      isreFreshLoading: false
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }

      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),//为null则传当前time
          with_top: 1

        })
        console.log(data)

        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        // 判断数据是否还有
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        }
        else {
          this.finished = true
        }

      } catch (error) {
        console.log('请求失败', error)
        this.error = true
        this.loading = false
      }
    },

    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list = results
        this.timestamp = data.data.pre_timestamp
        this.$toast('刷新成功')
        this.isreFreshLoading = false
        this.onLoad()
      } catch (error) {
        this.isreFreshLoading = false
        this.$toast('刷新失败')
      }
    }



  }
}
</script>

<style>
</style>
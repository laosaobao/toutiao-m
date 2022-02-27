<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，点击重试"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    SearchText: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
      error: false
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.SearchText
        })
        this.list.push(...data.data.results)
        this.loading = false
        const total = this.page * this.per_page
        // if(Math.random()>0.1){
        //   JSON.parse('ssss')
        // }
        //未加载完全部，还有下一页
        if (total < data.data.total_count) {
          this.page++
        }//加载完
        else {
          this.finished = true
        }

      } catch (error) {
        this.error = true
        this.loading=false
        this.$toast('数据获取失败')
        console.log(error)
      }
    }
  }

}
</script>

<style scoped lang="less">
</style>
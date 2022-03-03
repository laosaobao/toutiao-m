<!--  -->
<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error="error"
    error-text="加载失败，点击重试"
    :immediate-check="false"
  >
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      :title="item.content"
      :comment="item"
      @reply-click="$emit('reply-click',$event)"
    />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list:{
      type:Array,
      default:()=>[]
    },
    type:{
      type:String,
      default:'a',
      validator(value){
        return ['a','c'].includes(value)
      }
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, //获取下一页的标记
      error: false
    }
  },

  components: {CommentItem},

  computed: {},
  watch: {},

  methods: {
    async onLoad() {
      // console.log(1111111111111)
      try {
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: 10
        })
        console.log(data)
        //添加数据到列表
        const { results } = data.data
        this.list.push(...results)

        this.loading = false

        if (results.length) {
          this.offset = data.data.last_id
        }
        else {
          this.finished = true
        }
        this.$emit('onload-success',data.data)
      } catch (error) {
        console.log(error)
        this.error=true
      }

    }
  },

  created() {
      this.onLoad()
   },

  mounted() { }

}

</script>
<style lang='less' scoped>
</style>
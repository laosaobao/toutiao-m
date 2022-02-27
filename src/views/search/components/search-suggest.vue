<template>
  <div class="search-suggestion">
    <van-cell v-for="(text,index) in suggestion" :key="index"
    @click="$emit('search',text)"
    icon="search">
      <div slot="title" v-html="highlightStr(text)"></div>
    </van-cell>

  </div>
</template>

<script>
import { getSearchSuggest} from '@/api/search'
import{debounce} from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  data() {
    return {
      suggestion:[] //联想建议数据
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    async loadSearchSuggestions(text) {
      try {
        const { data } = await getSearchSuggest(text)
        //console.log(data)
        this.suggestion=data.data.options
      } catch (error) {
        this.$toast('数据获取失败，请稍后重试')
        console.log(error)
      }
    },
    highlightStr(text){
      if(text==null)
      {return }
      const lightStr=`<span class="active">${this.searchText}</span>`
      const reg=new RegExp(this.searchText,'gi') //g 全局匹配 ，i 忽略大小写
      return text.replace(reg,lightStr)
    }
  },
  watch: {
    //当searchtext改变时就会触发handler方法，immediate 侦听开始时就会调用(第一次)
    searchText: {
      //debounce会将回调fun和其他参数比如200，封装返回一个新的函数,作为handler的属性，
      //每次更新执行的是返回的新函数(带有防抖功能)，而不是debounce
      handler:debounce(function(val){this.loadSearchSuggestions(val)},500),

      //  {
      //   //console.log(val)
      //   this.loadSearchSuggestions(val)
      // },
      immediate: true
    }
  }

}
</script>

<style scoped lang="less">
.search-suggestion{
  /deep/ span.active{
    color:#3296fa
  }
}
</style>
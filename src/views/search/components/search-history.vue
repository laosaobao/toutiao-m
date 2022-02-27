<template>
  <div class="search-history">
    <van-cell title="搜索历史">
    <div v-if="isDeleteShow">
      <span @click="$emit('clear-history')">全部删除</span>
      &nbsp;&nbsp;
      <span @click="isDeleteShow=false">完成</span>
    </div>
      <van-icon v-else @click="isDeleteShow=true" name="delete"/>
    </van-cell>
    <van-cell v-for="(item,index) in searchHistories" :key=index  :title="item" @click="onSearchItemClick(item,index)">
        <van-icon v-show="isDeleteShow" name="close"/>
    </van-cell>

  </div>
</template>

<script>

export default {
  name: 'SearchHistory',
  components: {},
  data() {
    return {
      isDeleteShow:false
    }
  },
  props:{
    searchHistories:{
      type:Array,
      required:true
    }
  },
  methods: {
    onSearchItemClick(item,index)
    {  //删除状态，点击选项删除
      if(this.isDeleteShow==true)
      {
        this.searchHistories.splice(index,1)
      }
      //非删除状态 点击跳转
      else{
        this.$emit('search',item)
      }
    }
  }

}
</script>

<style scoped lang="less">
</style>
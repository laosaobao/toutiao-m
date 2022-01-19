<template>
  <div class="article-item">
      {{article.title}}
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components:{},
  props:{
      article:{
          type:Object,
          required:true
      }
  }
}
</script>

<style>
</style>
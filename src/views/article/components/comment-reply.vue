<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="$emit('click-close')" />
    </van-nav-bar>
    <!-- /导航栏 -->
   <div class="scroll-wrap">
    <!-- 当前评论项 -->
    <CommentItem :comment="comment" />
    <!-- /当前评论项 -->

    <van-cell title="所有回复" />

    <!-- 评论的回复列表 -->
    <CommentList :source="comment.com_id" type="c"
    :list="this.commentList"
     />
    <!-- /评论的回复列表 -->
    </div>

    <!-- 底部  发布评论-->
    <div class="post-wrap" @click="isPostShow=true">
      <van-button class="post-btn" size="small" round>写评论</van-button>
    </div>

    <!-- /底部 -->
    <van-popup v-model="isPostShow"
    position="bottom"
    >
    <comment-post
    :target="comment.com_id"
    @post-success="OnPostSuccess"
    />

     </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
        isPostShow:false,
        commentList:[]
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
      OnPostSuccess(data){
          //更新回复数量
          this.comment.reply_count++
          //关闭弹层
          this.isPostShow=false

          //更新回复内容
          this.commentList.unshift(data.new_obj)

      }
  }
}
</script>

<style scoped lang="less">
.scroll-wrap{
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 88px;
    overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>

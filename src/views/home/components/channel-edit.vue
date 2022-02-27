<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        round
        plain
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in MyChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          v-show="isEdit && !fiexChannels.includes(channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <span class="text" slot="text" :class="{ active: index === active }">{{
          channel.name
        }}</span>
        <!--v-bind:class 对象，key为class类名value为表达式，表达式
                                             结果为true or false true则使用该class类名 反之-->
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    MyChannels: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  computed: {
    recommendChannels() {
      // const channels = []
      // this.allChannels.forEach(channel => {
      //   const ret = this.MyChannels.find(myChannel => {
      //     return myChannel.id === channel.id
      //   })
      //   if (!ret) {
      //      channels.push(channel)
      //   }
      // });
      // return channels;
      //优化写法
      return this.allChannels.filter(channel => {
        return !this.MyChannels.find(mychannel => { return channel.id === mychannel.id })
      }
      )
    },
    ...mapState(['user'])
  },
  data() {
    return {
      allChannels: [],//所有频道
      isEdit: false,
      fiexChannels: [0]
    }
  },
  created() {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (error) {
        console.log(error)
        this.$toast('获取数据失败')
      }
    },
    async onAddChannel(channel) {
      this.MyChannels.push(channel)
      //数据持久化
      if (this.user) {
        try {
          //已登录 调用接口
          await addUserChannel({
            id: channel.id, //频道id
            seq: this.MyChannels.length //序号 push完之后的长度
          })
        } catch (error) {
          this.$toast('保存失败，请稍后重试')
        }

      }
      else {
        //未登录，存放本地
        setItem('TOUTIAO_CHANNELS', this.MyChannels)

      }



    },
    onMyChannelClick(channel, index) {
      if (this.isEdit)//编辑状态，
      //如果是固定频道则不删除
      {
        if (this.fiexChannels.includes(index)) {
          console.log(mapState)
          return
        }


        this.MyChannels.splice(index, 1)
        if (index <= this.active)
          {this.$emit('update-active', this.active - 1, true)}
        this.deleteChannel(channel)
      }
      else {//非编辑状态点击跳转
        this.$emit('update-active', index, false)
      }
    },
    //删除频道方法
    async deleteChannel(channel) {
      try {
        if (this.user) {
        //已登录
        deleteUserChannel(channel.id)
      }else{
        //未登录，更新数据到本地
        setItem('TOUTIAO_CHANNELS',this.MyChannels)
      }
      } catch (error) {
        this.$toast('操作失败，请稍后再试')
      }

    }

  }

}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 140px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/.grid-item {
    width: 160px;
    height: 86px;

    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        margin-top: 0;
        font-size: 28px;
        color: #222;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
      }
      .van-icon-plus {
        font-size: 28px;
        margin-right: 6px;
      }
      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
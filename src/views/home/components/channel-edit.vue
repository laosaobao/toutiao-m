<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" round plain size="mini"
        @click="isEdit=!isEdit"
        >{{isEdit ?'完成':'编辑'}}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in MyChannels"
        :key="index"
        @click="onMyChannelClick(channel,index)"
      >
        <van-icon v-show="isEdit && !fiexChannels.includes(channel.id)" slot="icon" name="clear"></van-icon>
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
import { getAllChannels } from '@/api/channel'
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
    }
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
    onAddChannel(channel) {
      this.MyChannels.push(channel)
    },
    onMyChannelClick(channel,index){
      if(this.isEdit)//编辑状态，
        //固定频道不删除
      { if(this.fiexChannels.includes(index))
          {
            return
          }


        this.MyChannels.splice(index,1)
        if(index<=this.active)
        this.$emit('update-active',this.active-1,true)
      }
      else{//非编辑状态点击跳转
          this.$emit('update-active',index,false)
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
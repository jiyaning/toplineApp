<template>
  <div class="container">
    <van-tabs v-model="activeChannelIndex">
      <div slot="nav-right" class="channel-more" @click="showChannel=true">
        <van-icon name="wap-nav" />
      </div>
      <van-tab :title="item.name" v-for="item in channelList" :key="item.id">
        <com-article :channelId="item.id"></com-article>
      </van-tab>
    </van-tabs>
    <com-channel
      v-model="showChannel"
      :channelList="channelList"
      :activeChannelIndex.sync="activeChannelIndex"
    ></com-channel>
  </div>
</template>

<script>
import ComArticle from './components/com-article.vue'
import ComChannel from './components/com-channel.vue'
import { apiChannelList } from '@/api/channel.js'
export default {
  name: 'home',
  components: {
    ComArticle,
    ComChannel
  },
  data () {
    return {
      activeChannelIndex: 0,
      channelList: [],
      showChannel: false
    }
  },
  created () {
    this.getChannelList()
  },
  methods: {
    async getChannelList () {
      const result = await apiChannelList()
      this.channelList = result.channels
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  // 弹性布局
  display: flex;
  // 灵活的项目将垂直显示，正如一个列一样
  flex-direction: column;
  height: 100%;
  /deep/ .van-tabs__content {
    // flex:1;的值是1 1 0%，【父控件有剩余空间占1份放大，父控件空间不足按1缩小，自身的空间大小是0%】
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
  }
  // 给频道下边沿横向设置样式
  /deep/ .van-tabs__line {
    background-color: #1989fa;
  }
  /*给 更多 频道设置样式*/
  .channel-more {
    position: fixed;
    right: 0;
    background-color: white;
    line-height: 88px;
    height: 88px;
    width: 90px;
    text-align: center;
    font-size: 40px;
  }
  /*频道列表*/
  .van-tabs {
    /deep/ .van-tabs__wrap {
      width: 90%; /*设置频道列表最大宽度，可以避免最后一个频道被按钮覆盖住*/
    }
  }
}
</style>

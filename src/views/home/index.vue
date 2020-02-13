<template>
  <div class="container">
    <van-tabs v-model="activeChannelIndex">
      <van-tab :title="item.name" v-for="item in channelList" :key="item.id">
        <com-article :channelId='item.id'></com-article>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ComArticle from './components/com-article.vue'
import { apiChannelList } from '@/api/channel.js'
export default {
  name: 'home',
  components: {
    ComArticle
  },
  data () {
    return {
      activeChannelIndex: 0,
      channelList: []
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
}
</style>

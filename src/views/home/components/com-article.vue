<template>
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text='downSuccessText' success-duration='800'>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in articleList" :key="item.art_id.toString()" :title="item.title">
          <template slot="label">
            <van-grid v-if="item.cover.type>0" :column-num="item.cover.type" :border="false">
              <van-grid-item v-for="(item2,key2) in item.cover.images" :key="key2">
                <van-image width="90" height="90" :src="item2" lazy-load />
              </van-grid-item>
            </van-grid>
            <p>
              <van-icon
                name="close"
                style="float:right"
                size="16"
                @click="displayDialog(item.art_id.toString())"
              />
              <span>作者:{{item.aut_name}}</span>
              <span class="spanspace">评论:{{item.comm_count}}</span>
              <span>时间:{{item.pubdate |formatTime}}</span>
            </p>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <com-moreaction v-model="showDialog" :articleID='nowArticleID' @dislikeSuccess='handelDislikeSuccess()'></com-moreaction>
  </div>
</template>

<script>
import ComMoreaction from './com-moreaction.vue'
import { apiArticleList } from '@/api/article.js'
export default {
  name: 'com-article',
  components: {
    ComMoreaction
  },
  props: {
    channelId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      articleList: [],
      ts: Date.now(),
      showDialog: false,
      nowArticleID: '',
      downSuccessText: ''
    }
  },
  methods: {
    handelDislikeSuccess () {
      const index = this.articleList.findIndex(item =>
        item.art_id.toString() === this.nowArticleID
      )
      this.articleList.splice(index, 1)
    },
    displayDialog (id) {
      this.showDialog = true
      this.nowArticleID = id
    },
    async getArticleList () {
      const result = await apiArticleList({
        channel_id: this.channelId,
        timestamp: this.ts
      })
      return result
    },
    // 下拉更新文章
    async  onRefresh () {
      await this.$sleep(800) // 该延迟器要执行0.8秒
      const articles = await this.getArticleList()
      if (articles.results.length > 0) {
        // 更新时间戳
        this.ts = articles.pre_timestamp
        this.articleList.unshift(...articles.results)
        this.downSuccessText = '文章更新成功'
      } else {
        this.downSuccessText = '文章已经是最新的'
      }
      // 加载状态结束
      this.isLoading = false
    },
    // 上拉加载更多文章
    async onLoad () {
      // 应用延迟器，使得执行速度减慢
      await this.$sleep(800) // 该延迟器要执行0.8秒
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const articles = await this.getArticleList()
      if (articles.results.length > 0) {
        // 更新时间戳
        console.log(articles.results)
        this.ts = articles.pre_timestamp
        this.articleList.push(...articles.results)
      } else {
        this.finished = true
      }
      // 加载状态结束
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
// 给上拉列表设置样式
.scroll-wrapper {
  height: 100%;
  overflow-y: auto;
}
.spanspace {
  margin: 0 20px;
}
</style>

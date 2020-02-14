<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in articleList" :key="item.art_id.toString()" :title="item.title">
          <template slot="label">
            <van-grid v-if="item.cover.type>0" :column-num="item.cover.type" :border="false">
              <van-grid-item v-for="(item2,key2) in item.cover.images" :key="key2">
                <van-image width="90" height="90" :src="item2" lazy-load/>
              </van-grid-item>
            </van-grid>
            <p>
              <span>作者:{{item.aut_name}}</span>
              <span class="spanspace">评论:{{item.comm_count}}</span>
              <span>时间:{{item.pubdate}}</span>
            </p>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { apiArticleList } from '@/api/article.js'
export default {
  name: 'com-article',
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
      ts: Date.now()
    }
  },
  methods: {
    async getArticleList () {
      const result = await apiArticleList({
        channel_id: this.channelId,
        timestamp: this.ts
      })
      return result
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 1000)
    },
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
      this.loading = false
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
.spanspace{
margin:0 16px
}
</style>

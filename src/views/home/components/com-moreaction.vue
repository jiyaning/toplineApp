<template>
  <div>
    <van-dialog
      :value="value"
      :show-confirm-button="false"
      close-on-click-overlay
      @input="$emit('input',$event)"
    >
      <van-cell-group v-if="isOneLevel">
        <van-cell icon="location-o" title="不感兴趣" @click="articleDislike()"/>
        <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="isOneLevel=false" />
        <van-cell icon="location-o" title="拉黑作者" />
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isOneLevel=true" />
        <van-cell :title="item.title" icon="location-o" v-for="item in reportsList" :key="item.value" @click="articleReport(item.value)"/>
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { apiArticleDislike, apiArticleReport } from '@/api/article.js'
export default {
  name: 'moreaction',
  data () {
    return {
      isOneLevel: true,
      reportsList: [
        { title: '其他问题', value: 0 },
        { title: '标题夸张', value: 1 },
        { title: '低俗色情', value: 2 },
        { title: '错别字多', value: 3 },
        { title: '旧闻重复', value: 4 },
        { title: '广告软文', value: 5 },
        { title: '内容不实', value: 6 },
        { title: '涉嫌违法犯罪', value: 7 },
        { title: '侵权', value: 8 }
      ]
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    articleID: {
      type: String,
      required: true
    }
  },
  methods: {
    async  articleReport (type) {
      try {
        const obj = { articleID: this.articleID, type }
        const result = await apiArticleReport(obj)
        console.log(result)
      } catch (err) {
        if (err.response.status === 409) {
          this.isOneLevel = true
          this.$emit('input', false)
          return this.$toast.fail('该文章已经被举报过了')
        } else {
          this.isOneLevel = true
          this.$emit('input', false)
          return this.$toast.fail('文章举报失败')
        }
      }
      this.$toast.success('举报成功!')
      this.$emit('input', false)
      this.isOneLevel = true
    },
    async articleDislike () {
      await apiArticleDislike(this.articleID)
      this.$toast.success('处理成功!')
      this.$emit('dislikeSuccess')
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="less" scoped>
</style>

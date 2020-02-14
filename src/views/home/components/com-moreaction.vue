<template>
  <div>
    <van-dialog
      :value="value"
      :show-confirm-button="false"
      close-on-click-overlay
      @input="$emit('input',$event)"
    >
      <van-cell-group v-if="isOneLevel">
        <van-cell icon="location-o" title="不感兴趣" />
        <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="isOneLevel=false" />
        <van-cell icon="location-o" title="拉黑作者" />
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isOneLevel=true" />
        <van-cell title="其他问题" icon="location-o" />
        <van-cell title="标题夸张" icon="location-o" />
        <van-cell title="低俗色情" icon="location-o" />
        <van-cell title="错别字多" icon="location-o" />
        <van-cell title="旧闻重复" icon="location-o" />
        <van-cell title="广告软文" icon="location-o" />
        <van-cell title="内容不实" icon="location-o" />
        <van-cell title="涉嫌违法犯罪" icon="location-o" />
        <van-cell title="侵权" icon="location-o" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'moreaction',
  data () {
    return {
      isOneLevel: true
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
</style>

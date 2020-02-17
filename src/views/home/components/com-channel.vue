<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    closeable
    round
    position="bottom"
    :style="{ height: '95%' }"
    close-icon-position="top-left"
  >
   <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button type="danger" plain size="mini" round @click="isEdit=!isEdit">{{isEdit?'完成':'编辑'}}</van-button>
        </div>
      </div>
      <!--van-grid 没有设置column-num属性，默认是4列-->
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item v-for="(item,k) in channelList" :key="item.id"  @click="clkChannel(item.id,k)">
          <span class="text"
            :style="{color:k===activeChannelIndex?'red':''}">
            {{item.name}}
          </span>
          <van-icon v-show="isEdit && k>0" class="close-icon" name="close"  @click="userToRest(item.id,k)"/>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item v-for="item in restChannel" :key="item.id" @click="restToUser(item)">
          <div class="info">
            <span class="text">{{item.name}}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
// 获得所有频道的api函数
import { apiChannelAll, apiChannelList, apiChannelAdd, apiChannelDel } from '@/api/channel.js'

export default {
  name: 'com-channel',
  props: {
    // 接收父组件v-model的数据信息
    value: {
      type: Boolean,
      default: false
    },
    // 父传递过来的"我的频道"数据
    channelList: {
      type: Array,
      // 数组的默认值要通过如下箭头函数方式设置
      default: () => []
    },
    // 当前激活频道的下标
    activeChannelIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    restChannel () {
      const userChannelIds = this.channelList.map(item => {
        return item.id
      })
      const rest = this.channelAll.filter(item => {
        // Array.includes判断是否包含该元素
        return !userChannelIds.includes(item.id)
      })
      // 返回过滤好的 剩余的频道
      return rest
    }
  },
  data () {
    return {
      // 全部频道
      channelAll: [],
      isEdit: false
    }
  },
  created () {
    this.getChannelAll()
  },
  methods: {
    // 获得全部频道
    async getChannelAll () {
      // 调用api
      const result = await apiChannelAll()
      // data接收
      this.channelAll = result.channels
    },
    restToUser (channel) {
      this.channelList.push(channel)
      // 2. localStorage持久更新
      apiChannelAdd(channel)
    },
    userToRest (channelID, index) {
      this.channelList.splice(index, 1)
      apiChannelDel(channelID)
      if (this.channelList.length === index) {
        this.$emit('update:activeChannelIndex', index - 1)
      }
    },
    clkChannel (channelID, index) {
      if (this.isEdit && index > 0) {
        this.userToRest(channelID, index)
        return false // 停止后续代码执行
      }

      // 1. 频道弹出层消失
      this.$emit('input', false)
      // 2. home/index.vue页面要"激活"当前单击到的频道并展示
      // 修改 activeChannelIndex的值为 index 即可(就是子组件修改父组件传递的变量)
      this.$emit('update:activeChannelIndex', index)
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  margin-top:70px;
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 16px;
      color:gray;
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>

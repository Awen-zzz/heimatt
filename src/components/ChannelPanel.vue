<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          type="danger"
          size="small"
          round
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channel" :key="item.id">
          <div
            @click="onClick(index)"
            class="inner"
            :style="{ color: active === index ? 'pink' : '' }"
          >
            {{ item.name }}
            <van-icon name="close" v-if="index !== 0" v-show="isCloseShow" />
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in recommend" :key="index">
          <div class="inner van-ellipsis" @click="add(item.id)">
            +{{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'AllArticleList',
  props: {
    channel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getAllArticleList()
  },
  data () {
    return {
      recommend: [],
      isCloseShow: false
    }
  },
  methods: {
    async getAllArticleList () {
      try {
        const res = await getAllArticleList()
        this.recommend = res.data.data.channels.filter(item => this.channel.every(item1 => item1.id !== item.id))
      } catch (error) {
        console.log(error)
      }
    },
    add (id) {
      const index = this.recommend.findIndex(item => item.id)
      this.channel.push(this.recommend[index])
      this.recommend.splice(index, 1)
    },
    onClick (index) {
      if (this.isCloseShow) {
        // 点击x图标删除
        if (index === 0) return// 推荐不能删除
        const obj = this.channel[index]
        this.channel.splice(index, 1)
        this.recommend.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)// 点击删除x小图标的时候，当前选项active变成前面那一项
        }
      } else {
        // 切换高亮
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: { // 监听底部弹出层的添加删除的数据变化
    channel: {
      async handler (newVal) {
        // 登陆过 把持久化放服务器
        if (this.$store.state.user && this.$store.state.user.token) {
          try {
            const arr = []
            newVal.forEach((item, index) => {
              arr.push({ id: item.id, seq: index })
            })
          } catch (error) {
            console.log(error)
          }
          //
        } else { // 没有登录时，数据放在本地存储
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    padding-bottom: 6px;
    h3 {
      font-size: 32px;
      font-weight: 400;
      color: #333;
    }
    .van-button {
      width: 104px;
      height: 48px;
      border-radius: 30px;
    }
  }
}
.inner {
  width: 160px;
  height: 86px;
  background-color: #f4f5f6;
  border-radius: 6px;
  font-size: 28px;
  line-height: 86px;
  color: #222222;
  text-align: center;
  margin-top: 10px;
  margin-left: 14px;
  position: relative;
  .van-icon-close {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }
}
.van-col {
  margin-bottom: 22px;
}
</style>

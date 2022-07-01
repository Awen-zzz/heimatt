<template>
  <div>
    <van-cell-group>
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        ref="pullrefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- <van-cell
            v-for="(item, index) in articleList"
            :key="index"
            :title="item.title"
            value="内容1"
            label="m=描述信息"
          /> -->
          <ArticleItem  v-for="(item, index) in articleList"
            :key="index" :article = "item"></ArticleItem>
        </van-list>
      </van-pull-refresh>
    </van-cell-group>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getArticleList } from '@/api/home'
let ele = null // 全局
let scrollTop = 0
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.ArticleListFn()
  },
  mounted () {
    // 记住浏览滚动位置，组件最终渲染成html dom，$el就是渲染好的根标签
    ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      scrollTop = this.scrollTop
    })
  },
  activated () {
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      refreshing: false,
      loading: false,
      finished: false
    }
  },
  methods: {
    async ArticleListFn () {
      if (this.refreshing) { // 如果触发了下拉事件
        this.articleList = [] // 列表数据清空
        this.refreshing = false
      }
      try {
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        console.log(res)
        this.timestamp = res.data.data.pre_timestamp
        if (this.timestamp === null) {
          this.finished = true
        }
        // this.articleList = res.data.data.results  //这样写新数据覆盖旧数据会一闪一闪的bug
        this.articleList.push(...res.data.data.results) // 这样写就是在旧数据上追加新数据
        this.loading = false // 数据更新完毕后，将loading设置成false
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.ArticleListFn()
    },
    onRefresh () {
      console.log('下拉刷新触发了')
      this.finished = false // 防止用户把加载更多弄结束了，清空数据
      this.loading = true // 将 loading 设置为 true，表示处于加载状态
      this.timestamp = Date.now() // 获取最新的数据
      this.ArticleListFn() // 重新加载数据
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped>
.van-cell-group {
  margin-top: 110px;
}
</style>

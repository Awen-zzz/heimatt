<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ArticleItem from '@/components/ArticleItem'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getSearchResult()
  },
  data () {
    return {
      page: 1,
      per_page: 20,
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        console.log(res)
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        // this.list = res.data.data.results
        this.list.push(...res.data.data.results)
        this.loading = false
        this.refreshing = false // // 下拉刷新后设置下拉结束
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.page++
      this.getSearchResult()
    },
    onRefresh () {
      this.list = [] // 下拉刷新后列表清空
      this.page = 1 // 下拉刷新后列表页数从1开始
      this.getSearchResult() // 下拉刷新后重新从后台获取数据
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
//子容器内容高度要比父容器要高，才会有滚动条
.container {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>

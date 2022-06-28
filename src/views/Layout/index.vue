<template>
  <div>
    <router-view class='main'/>

    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o"
        >首页
        <template #icon>
          <i class="toutiao toutiao-shouye" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/video" icon="search"
        >视频
        <template #icon>
          <i class="toutiao toutiao-shipin" /> </template
      ></van-tabbar-item>
      <van-tabbar-item replace to="/question" icon="search"
        >问答
        <template #icon>
          <i class="toutiao toutiao-wenda" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="search"
        >我的
        <template #icon>
          <i class="toutiao toutiao-wode" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao{
  font-size: 40px;
}
/deep/.van-tabbar-item__text{
  font-size: 20px !important
}
.main{
  margin-bottom: 98px;
  background-color:  #f5f7f9;
}
</style>

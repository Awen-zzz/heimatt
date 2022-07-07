<template>
  <div>
    <van-nav-bar fixed>
      <template #title>
        <van-button type="default" icon="search" class="search-btn" to='/search'
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in apiMyChannels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = 'true'">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChannelPanelShow"
      position="bottom"
      :style="{ height: '97%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
    >
    <!--我的频道面板-->
      <ChannelPanel
        :channel="apiMyChannels"
        :active="active"
        @change-active="
          active = $event;
          isChannelPanelShow = false;
        "
        @del-event="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ChannelPanel from '@/components/ChannelPanel'
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannels } from '@/api/home'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  created () {
    this.MyChannelsfn()
  },
  data () {
    return {
      active: 0,
      apiMyChannels: [],
      isChannelPanelShow: false
    }
  },
  methods: {
    async MyChannelsfn () {
      const channels = getItem(CHANNELS)
      if (!this.$store.state.user && this.$store.state.user.token) {
        this.apiMyChannels = channels
      } else {
        try {
          const res = await getMyChannels()
          this.apiMyChannels = res.data.data.channels
          console.log(res)
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  computed: {},

  filters: {},
  components: {
    ArticleList,
    ChannelPanel
  }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  color: #fff;
  background: rgba(255, 255, 255, 0.3);
  border: 0;
  border-radius: 32px;
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tab {
  padding: 0 70px;
  border-right: 1px solid #edeff3;
}
/deep/ .van-tabs__line {
  width: 31px;
  background-color: #63829a;
}
.menu {
  min-width: 66px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 66px;
  width: 66px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
}
/deep/ .van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 92px;
  z-index: 1;
}
.van-tabs {
  margin-top: 110x;
}
/deep/ .van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>

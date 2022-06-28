<template>
  <div>
    <div class="header header-login" v-if="user && user.token">
      <!--v-if="$store.state.user && $store.state.user.token" 辅助函数可以简化-->
      <div class="avatar">
        <div class="left">
          <van-image
            round
            width="1.76rem"
            height="1.76rem"
            :src="userInfo.photo"
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="btn">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>{{ userInfo.art_count }}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{ userInfo.fans_count }}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{ userInfo.follow_count }}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{ userInfo.like_count }}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <div class="header header-nologin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="历史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <van-button class="btn" block v-if="user && user.token" @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex' // 辅助函数，简化v-if判断
export default {
  name: 'my',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log('res', res)
        this.userInfo = res.data.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({
          message: '亲亲，确认退出登录吗？'
        })
        this.$store.commit('setUser', {})
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapState(['user'])// 辅助函数，简化v-if判断
  },
  watch: {},
  filters: {},
  components: {}
}
</script>
<style scoped lang= 'less'>
.header {
  width: 750px;
  height: 401px;
  /* opacity: 0.7; */
  background: rgb(50, 150, 250, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-nologin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
  }
  p {
    width: 145px;
    height: 28px;
    font-family: MicrosoftYaHei;
    font-size: 28px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #ffffff;
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    padding-left: 32px;
    padding-right: 33px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn {
      width: 116px;
      height: 33px;
      text-align: center;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #666666;
    }
    .left {
      display: flex;
      /* justify-content: center; */
      align-items: center;
      span {
        margin-left: 22px;
        font-size: 30px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #ffffff;
      }
    }
  }
  .list {
    margin-top: 55px;
    display: flex;
    li {
      flex: 1;
      text-align: center;
      p {
        color: #ffffff;
        text-align: center;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
/deep/ .van-grid-item__text {
  font-size: 28px;
}
.van-cell-group {
  margin: 9px 0;
}
.btn {
  color: #d86262;
}
</style>

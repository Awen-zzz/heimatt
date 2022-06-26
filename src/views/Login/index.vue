<template>
  <div>
    <van-nav-bar title="登录">
      <!-- <van-icon name="cross" slot="left"/>vue2可以使用 -->
      <template #left>
        <van-icon name="cross" />
      </template>
      <!-- <template v-solt:left>
        <van-icon name="cross"/>
      </template>  两种写法-->
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '不符合手机格式' },
        ]"
      >
        <i class="toutiao toutiao-shouji" slot="left-icon" />
      </van-field>
      <van-field
        v-model.trim="code"
        type="number"
        name="code"
        placeholder="验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码长度必须6位' },
        ]"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon" />
        <template #button>
          <van-count-down
            :time="time"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            size="small"
            class="yzm"
            native-type="button"
            v-else
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '13911111111', // 手机号
      code: '246810', // 短信验证码
      time: 10 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
      } catch (err) {
        console.log(err)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = true
        try {
          await getSmsCode(this.mobile)
          this.$toast.sucess('发送成功')
        } catch (err) {
          this.$toast.fail('发送失败，请重试')
        }
      } catch (err) {
        console.log(err)
        console.log('校验失败')
        // this.$toast.fail('手机号格式不对')
        this.$notify('校验失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.yzm {
  position: fixed;
  right: 25px;
  width: 152px;
  height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  color: #666;
  .van-button__text {
    zoom: 0.96;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #9ab0c2;
  border-radius: 10px;
  color: #ffffff;
}
.van-count-down {
  position: fixed;
  right: 25px;
}
</style>

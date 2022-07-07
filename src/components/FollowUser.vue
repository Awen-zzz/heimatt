<template>
  <van-button
    :disabled="isAjax"
    :loading="isAjax"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    :icon="value ? '' : 'plus'"
    :plain="value"
    @click="onClick"
    >{{ value ? "已关注" : "关注" }}</van-button
  >
</template>

<script>
import { addUser, delUser } from '@/api/article'
export default {
  name: 'FollowUser',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    target: {
      type: [String, Number],
      required: true

    }
  },
  created () { },
  data () {
    return {
      isAjax: false
    }
  },

  methods: {
    async onClick () {
      this.isAjax = true
      if (this.value) { // 如果当前已关注，那就是点击后删除用户
        try {
          await delUser(this.target) // target 就是article接口数据里的article.aut_id（用户id）
          this.$emit('input', !this.value) // 删除成功以后将数据传到input，子传父
        } catch (error) {
          console.log(error)
        }
      } else { // 否则就是没有关注，那就是点击后关注用户
        try {
          await addUser(this.target)
          this.$emit('input', !this.value) // 添加成功以后将数据传到input，子传父
        } catch (error) {
          console.log(error)
        }
      }
      this.isAjax = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>

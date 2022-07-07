<!--文章详情的评论组件-->
<template>
  <van-cell>
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px"
      :src="item.aut_photo"
    />
    <span style="color: #466b9d" slot="title">hello</span>
    <div slot="label">
      <p style="color: #363636">{{ item.content }}</p>
      <p>
        <span style="margin-right: 10px">{{ item.pubdate | dateformat }}</span>
        <van-button
          size="mini"
          type="default"
          @click="$emit('replay-show', item)"
          >回复</van-button
        >
      </p>
    </div>
    <!--由于会出现点赞过快导致数量不对的bug，这里采用加上loading加载，类似节流-->
    <van-loading v-if="isLoading" />

    <van-icon
      v-else
      slot="right-icon"
      :name="item.is_liking ? 'like' : 'like-o'"
      :color="item.is_liking ? 'red' : ''"
      @click="onClick"
      >{{ item.like_count > 0 ? item.like_count : "" }}</van-icon
    >
  </van-cell>
</template>

<script>
import { addlike, dellike } from '@/api/comment'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onClick () {
      this.isLoading = true
      if (this.item.is_liking) {
        // 如果有喜欢就取消点赞
        try {
          await dellike(this.item.com_id)
          this.item.like_count-- // 实时更新数据，取消点赞让点赞减1
          this.item.is_liking = false // 实时更新数据 让样式更改
        } catch (error) {
          console.log(error)
        }
      } else {
        // 否则就点赞
        try {
          await addlike(this.item.com_id)
          this.item.like_count++ // 实时更新数据，点赞让点赞加1
          this.item.is_liking = true // 实时更新数据 让样式更改
        } catch (error) {
          console.log(error)
        }
      }
      this.isLoading = false
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

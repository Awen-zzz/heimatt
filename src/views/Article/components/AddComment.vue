<!--评论内容组件--弹出层的里面-->
<template>
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    center
    ref="field"
  >
    <template #extra>
      <van-button
        plain
        type="info"
        class="btn"
        :disabled="message.length === 0"
        @click="onClick"
        >发布</van-button
      >
    </template>
  </van-field>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  props: {
    target: {
      type: [String, Number],
      required: true
    },
    art_id: {
      type: [String, Number]
    }
  },
  created () { },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onClick () {
      try {
        const res = await addComment({
          target: this.target,
          content: this.message,
          art_id: this.art_id
        })
        this.$emit('add-comment', res.data.data.new_obj)// 发布评论（文章和评论回复）
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  mounted () {
    // 组件最终会变成dom结构，$el可以获取这个组件的根标签dom，然后操作dom
    this.$refs.field.$el.querySelector('textarea').focus()
  },
  components: {}
}
</script>

<style scoped lang='less'>
.btn {
  border: none;
}
</style>

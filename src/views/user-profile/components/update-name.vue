<!--  -->
<template>
  <div class="update-name">
    <van-nav-bar
      class=""
      title="设置昵称"
      left-text="取消"
      right-text="保存"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <van-field
      v-model.trim="localName"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localName: this.value
    }
  },

  components: {},

  computed: {},
  watch: {},

  methods: {
    async onConfirm() {
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不为空')
          return
        }
        const { data } = await updateUserProfile({
          name: localName
        })
        //更新视图
        this.$emit('input',localName)

        //关闭弹层
        this.$emit('close')

      } catch (error) {
          this,$this.$toast.fail('更新失败')
      }
    }
  },

  created() { },

  mounted() { }

}

</script>
<style lang='less' scoped>
</style>
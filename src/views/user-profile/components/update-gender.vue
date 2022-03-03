<!--  -->
<template >
  <div class="update-gender">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onPickerChange"
      :default-index="value"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: 0
    }
  },

  components: {},

  computed: {},
  watch: {},

  methods: {
    async onConfirm() {
      try {
        const localGender = this.localGender
        const { data } = await updateUserProfile({
          gender: localGender
        })
        //更新视图
        this.$emit('input', localGender)

        //关闭弹层
        this.$emit('close')

      } catch (error) {
        this, $this.$toast.fail('更新失败')
      }
    },
    onPickerChange(picker, value, index) {
      this.localGender = index
    }
  },

  created() { },

  mounted() { }

}

</script>
<style lang='less' scoped>
</style>
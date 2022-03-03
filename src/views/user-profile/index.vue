<!--  -->
<template>
  <div class="user-profile">
    <van-nav-bar
      class=""
      title="个人信息"
      left-arrow
      right-text="保存"
      @click-left="$router.back()"
    />
    <input ref="file" type="file" hidden @change="onFileChange" />
    <van-cell-group>
      <van-cell title="头像" is-link @click="$refs.file.click()">
        <van-image round width="30" height="30" fit="cover" :src="user.photo" />
      </van-cell>
      <van-cell
        title="昵称"
        :value="user.name"
        is-link
        @click="isUpdateNameShow = !isUpdateNameShow"
      />
      <van-cell
        title="性别"
        :value="user.gender === 0 ? '男' : '女'"
        is-link
        @click="isUpdateSexShow = true"
      />
      <van-cell title="生日" :value="user.birthday" is-link />
    </van-cell-group>
    <!-- 编辑昵称弹出层 -->
    <van-popup
      v-model="isUpdateNameShow"
      style="height: 100%"
      position="bottom"
    >
      <UpdateName
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        v-model="user.name"
      />
    </van-popup>
    <!-- /编辑昵称弹出层 -->
    <van-popup
      v-model="isUpdateNameShow"
      style="height: 100%"
      position="bottom"
    >
      <UpdateName
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        v-model="user.name"
      />
    </van-popup>
    <!-- 编辑性别 -->
    <van-popup v-model="isUpdateSexShow" style="height: 50%" position="bottom">
      <UpdateGender
        v-if="isUpdateSexShow"
        @close="isUpdateSexShow = false"
        v-model="user.gender"
      />
    </van-popup>
    <!-- /编辑性别 -->

    <!-- 头像 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      style="height: 100%"
      position="bottom"
    >
      <UpdatePhoto
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
    <!-- 头像 -->
  </div>
</template>

<script>
import UpdateName from './components/update-name.vue'
import { getUserProfile } from '@/api/user'
import UpdateGender from './components/update-gender.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
  name: 'UserProfile',
  props: {},
  data() {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateSexShow: false,
      isUpdatePhotoShow: false,
      img: null
    }
  },

  components: {
    UpdateName,
    UpdateGender,
    UpdatePhoto
  },

  computed: {},
  watch: {},

  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        //   console.log(data)
        this.user = data.data
      } catch (error) {
        this.$toast('数据获取失败')
      }
    },
    onFileChange() {
      //获取文件dom对象
      const file = this.$refs.file.files[0]
      //基于文件对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true

      //file-input 如果选了同一文件 不会触发change
      this.$refs.file.value = ''
    }
  },

  created() {
    this.loadUserProfile()
  },

  mounted() { }

}

</script>
<style lang='less' scoped>
.user-profile {
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
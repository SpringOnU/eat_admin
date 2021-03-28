<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <video style="width: 100%;height: auto" autoplay loop muted src="https://wallpaperm.cmcm.com/scene/preview_video/7565735c0996df0aba266361e1d9da4b_preview.mp4"></video>
    <div class="mask"></div>
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        console.log(res,'resresresresres')
        this.getUserInfo().then(res => {
          this.$router.push({
            name: 'home'
          })
        })
      })
    }
  }
}
</script>

<style>

</style>

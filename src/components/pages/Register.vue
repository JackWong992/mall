<template>
  <div>
    <van-nav-bar
      title="注册页面"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="register-panel">
      <van-field
        v-model="username"
        required
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        @click-icon="username=''"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <!-- register-button area -->
      <div class="register-button">
        <van-button type="primary" size="large">立即注册</van-button>
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
       goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .register-panel {
    width: 96%;
    border-radius: .4rem;
    margin: 20px auto;
    padding-bottom: 5rem;
  }
  .register-button {
    padding-top: 0.625rem;
  }
</style>
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
        :error-message="usernameErrorMsg"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />
      <!-- register-button area -->
      <div class="register-button">
        <van-button type="primary" size="large" @click="registerAction"
        
        :loading="openLoading">立即注册</van-button>
      </div>
    </div>
    
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js' //引入后台数据
  import { Toast } from 'vant'
  export default {
    data() {
      return {
        username: '',
        password: '',
        openLoading: false,  //是否开启用户注册loading状态
        usernameErrorMsg: '', //用户名错误提示信息
        passwordErrorMsg: ''
      }
    },
    methods: {
       goBack(){
        this.$router.go(-1)
      },
      registerAction(){
        // if(this.checkForm()){
        //   this.axiosRegisterUser()
        // }
        this.checkForm() && this.axiosRegisterUser()

      },
      axiosRegisterUser(){
        this.openLoading = true
        axios({
          url: url.registerUser, 
          method: 'post',
          data: {
            userName: this.username,
            password: this.password
          }
        }).then( (response)=>{          
          if(response.data.code==200){
            Toast.success(response.data.message)
            this.$router.push('/')
          }else{
            this.openLoading = false
            Toast.fail('注册失败-1')
           
          }
        }).catch( (error)=>{
          console.log( error )
          this.openLoading = false
          Toast.fail('注册失败-2')
        } )
      },
      //用户注册表单验证方法
      checkForm(){
        let isOk = true
        if(this.username.length<5){
          this.usernameErrorMsg = '用户名不能少于5位'
          isOk = false
        } else{
          this.usernameErrorMsg = ''
        }
        if( this.password.length<6 ){
          this.passwordErrorMsg = '密码不能少于6位'
          isOk = false
        } else {
          this.passwordErrorMsg = ''
        }
        return isOk
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
<template>
  <div>
    <van-nav-bar
      title="登录页面"
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
        <van-button type="primary" size="large" @click="loginAction"
        :loading="openLoading">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js"; //引入后台数据
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading: false, //是否开启用户注册loading状态
      usernameErrorMsg: "", //用户名错误提示信息
      passwordErrorMsg: ""
    };
  },
  created(){
    if( localStorage.userInfo ){
      Toast.success('您已经登录')
      this.$router.push('/')
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    loginAction() {
      // if(this.checkForm()){
      //   this.axiosRegisterUser()
      // }
      this.checkForm() && this.axiosRegisterUser();
    },
    axiosRegisterUser() {
      this.openLoading = true;
      axios({
        url: url.login,
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.username };
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                Toast.success("登录成功");
                this.$router.push("/");
              })
              .catch(err => {
                Toast.fail("登录状态保存失败");
                console.log(error);
              });
          } else {
            Toast.fail("登录失败");
            this.openLoading = false;
          }
        })
        .catch(error => {
          Toast.fail("登录失败");
          this.openLoading = false;
        });
    },
    //用户注册表单验证方法
    checkForm() {
      let isOk = true;
      if (this.username.length < 5) {
        this.usernameErrorMsg = "用户名不能少于5位";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能少于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return isOk;
    }
  }
};
</script>

<style scoped>
.register-panel {
  width: 95%;
  border-radius: 0.4rem;
  margin-top: 0.3rem;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 5rem;
}
.register-button {
  padding-top: 0.625rem;
}
</style>
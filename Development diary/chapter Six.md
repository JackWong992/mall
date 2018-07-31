# 6.0 注册页面开发
## 6.1 编写注册页面
写之前需要自己单独配置路由：`page->touch  Register.vue`&& `router`下`index.js`配置<br>
编写注册页面之前需要在`main.js`下面引入 `Field`和 `NavBar`组件
```javascript
Register：
<template>
  <div>
    <van-nav-bar
      title="立即注册"
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
        <van-button type="primary" size="large">主要按钮</van-button>
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
```

## 6.2 Koa2用户操作路由模块化
首先在`service`目录下安装 `koa-router`插件用于控制后端路由，mkdir appApi -> cd appApi ->touch user.js添加配置：
```javascript
const Router = require ('koa-router')
let router = new Router()
router.get('/',async(ctx)=>{
    ctx.body="这是用户操作首页"
})
router.get('/register',async(ctx)=>{
    ctx.body="用户注册接口"
})
module.exports=router;
```
主页面需要引入配置的路由：
```javascript
  const Router = require('koa-router')
  let user = require('./appApi/user.js')
```
加载子路由：
```javascript
  let router = new Router()
  router.use('/user',user.routers())
```
加载中间件：
```javascript
  app.use(router.routes())
  app.use( router.allowedMethods )
```
启动`node index.js`进行测试，进入`localhos:3000/user`，`localhost:3000/user/register`进行测试；

## 6.3  实现前后端通讯
### 安装中间件`koa-bodyparser`用于接受post数据
```javascript
  npm i  koa-bodyparser --save
```
引入：
```javascript
  const bodyParser = require('koa-bodyparser')
  app.use(bodyParser()) 
```

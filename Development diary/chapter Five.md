# 5.0 Koa后端开发
## 5.1 服务接口API配置文件
src->mkdir seviceAPI.config.js ->touch 
```
  const BASEURL= "我的yapi地址-index"
  const URL = {
    getShopingMallInfo: BASEURL+'index',  //主页商品信息
    getShopingMallInfo: BASEURL+'getGoodsInfo'  //商品详情页信息
  }
  module.exports = URL //暴露接口
```
主页引入：
```
  import url from '@/serviceAPI.config.js'
```
axios地址直接更换
```
  url: url.getShopingMallInfo
```
以后如果更换地址，就可以直接在这里更换了~

## 5.2 项目中引入Koa2到项目中
在项目目录的主文件下新建一个文件夹：`service`,把前端代码和后端代码放到一起主要是为了方便git clone比较方便<br>
初始化项目：
``` 
  npm init -y
```
安装koa2到项目中（注意这一步不要进错目录了，瞎子的我很可能进入到前端的目录里面）
```
  npm install koa --save  //默认是安装koa2
```
 ## 5.3 安装mongodb， robot3

 ## 5.4 使用mongose链接数据库
 ### Mongose是一个开源的封装好的实现，Node和MongoDB数据通讯的数据建模库
 ```
  npm install mongoose --save
 ```
service -> mkdir database ->init.js
```
  const monnoose - require('mongoose')
  const db = "mongdb://localhost/smile-db"
  
  exports.connect = ()=>{
    mongoose.connect(db )  //使用mongoose链接数据库

    /*增加数据哭监听事件*/
    //数据库断开状态
    mongoose.connection.on('disconnected', ()=>{
      console.log('***数据库已经断开***')
      mongoose.connect(db)  //重新链接
    })

    //数据库正常链接状态
    mongoose.connection.once('open', ()=>{
      console.log('***数据库链接正常***')
    })

    //数据库错误状态
    mongoose.connection.on('error', ()=>{
      console.log('***数据库已经断开***')
      mongoose.connect(db)
    })
  }
```
index.js
```
  const {connect} = require( './database/init.js')

  ;(async()=>{
      await connect()
  } )()
```
终端运行`node index.js`显示链接成功~
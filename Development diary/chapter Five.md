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

## 5.5给数据库增加健壮性
添加一个Promise做判断
```
  let maxConnectTimes =3 //设置最大连接数
  return  new Promise( resolve, reject ){
    //数据库断开状态
     mongoose.connection.on('disconnected', ()=>{
      console.log('***数据库已经断开***')
      if(maxConnectionTimes<=3){
        mongoose.connect(db)  //重新链接
        maxConnectionTimes++
      }else{
        reject()
        throw new Error('***数据库出现问题，请人为链接数据库***')
      }
    })

    //数据链接错误
    mongoose.connection.on('error', (error)=>{
      console.log('***数据库出现错误***')
      if( maxConnectionTimes<=3 ){
        mongoose.connect( db ) //重新链接
        maxConnectionTimes++
      }else{
        reject(error)
        throw new Error('***数据库链接错误，请认为链接数据库***')
      }
    })

    //数据库链接正常
    mongoose.connection.once('open',()=>{
      console.log('***数据库链接正常***' )
      resolve()
    })
  }

```
成功，增加数据库链接的健壮性~（当出现问题达到3次以后就不会在进行重连，防止资源的占用）

## 5.6 Mongoose的Schema建模介绍
```javascript
  String: 字符串类型
  Number: 数字类型
  Data: 日期类型
  Boolean: 布尔类型
  Buffer: NodeJS buffer 类型
  ObjectID： 主键，一种特殊而且非常重的类型
  Mixed: 混合类型
  Array: 集合类型
```
DataBase->mkdir schema-> touch User.js
```
  const mongoose = require('mongoose')
  const Schema = mongoose.Schema

  let ObjectId = Schema.Types.ObjectId

  //创建Schema
  const userSchema = new Schema( {
    UserId: {type: ObjectId},
    userName: { unique: true, type: String }, //判断用户名不要重复
    password: { type: String },
    createAt: { type: Date, default: Date.now() }   //创建日期
    lastLoginAt: {  type: Date, default: Date.now()  }  //最后登录
  })

  //发布模型
  mongoose.model( 'User', userSchema ) 
```

## 载入Schema数据的插入和查询
init.js下引入glob
```
  const glob = require('glob')
  const {resolve } = require('path')
```
安装：
```
  npm install glob --save
```
暴露：
```
exports.initSchemas = ()=>{
  glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}
```
index.js插入：
```
  ;(async () =>{
    await connect()
    initSchemas()
    const User = mongoose.model('User')
    let oneUser = new User({userName:'jspang13',password:'123456'})
  
    oneUser.save().then(()=>{
        console.log('插入成功')
        
    })
let  users = await  User.findOne({}).exec()
 
console.log('------------------')
console.log(users)
console.log('------------------')  
})()
 
```

## 5.7 使用bcrypt对数据库进行加盐加密
安装bcrypt
```javascript
  npm i  bcrypt --save 
```
引入：
```javascript
  const bcrypt = require('bcrypt')
  const SALT_WORK_FACTOR = 10 //设置长度
```
`User.js`配置`bcrypt`:
```javascript
//每次存储数据时都要执行
userSchema.pre('save', function(next){
    //let user = this
    console.log(this)
    bcrypt.genSalt( SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt, (err,hash)=>{
            if(err) return next(err)
            this.password = hash
            next()
        })  
    })
})
```

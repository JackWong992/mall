const mongoose = require('mongoose')
  const Schema = mongoose.Schema

  let ObjectId = Schema.Types.ObjectId

  //创建Schema
  const userSchema = new Schema( {
    UserId: {type: ObjectId},
    userName: { unique: true, type: String }, //判断用户名不要重复
    password: { type: String },
    createAt: { type: Date, default: Date.now() },   //创建日期
    lastLoginAt: {  type: Date, default: Date.now()  }  //最后登录
  })

  //发布模型
  mongoose.model( 'User', userSchema ) 
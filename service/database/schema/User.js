const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

  //创建Schema
  const userSchema = new Schema( {
    UserId: {type: ObjectId},
    userName: { unique: true, type: String }, //判断用户名不要重复
    password: { type: String },
    createAt: { type: Date, default: Date.now() },   //创建日期
    lastLoginAt: {  type: Date, default: Date.now()  }  //最后登录
  })

  //每次存储数据时都要执行
  userSchema.pre('save', function(next){
    console.log( this )
    bcrypt.genSalt( SALT_WORK_FACTOR, (err, salt)=>{
      if(err) return next(err)
      bcrypt.hash(this.password, salt, (err,hash)=>{
        if(err) return next(err)
        this.password = hash
        next()
      })
    })
  })

//登录服务逻辑
  userSchema.methods = {
    comparePassword: (_password, password)=>{
      return new Promise( (resolve, reject)=>{
        bcrypt.compare(_password, password, (err,isMatch)=>{
          if(!err) resolve(isMatch)
          else reject(err)
        })
      })
    }
  }
  //发布模型
  mongoose.model( 'User', userSchema ) 
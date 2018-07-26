const mongoose = require('mongoose')
const db = "mongodb://localhost/smile-db"
  
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
   
  })
}
const mongoose = require('mongoose')
const db = "mongodb://localhost/smile-db"
const glob = require('glob')
const { resolve } = require('path')

exports.initSchemas = ()=>{
  glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}
  
exports.connect = ()=>{
  mongoose.connect(db )  //使用mongoose链接数据库
  let maxConnectionTimes=0 //设置最大链接次数

  return new Promise( (resolve,reject)=>{
    /*增加数据哭监听事件*/
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

     //数据库错误状态
     mongoose.connection.on('error', (err)=>{
      console.log('***数据库已经断开***')  
      if( maxConnectionTimes<=3 ){
        mongoose.connect(db)
        maxConnectionTimes++
      }else{
        reject(err)
        throw new Error('***数据库出现问题，请人为链接数据库***')
      }
    })   


    //数据库正常链接状态
    mongoose.connection.once('open', ()=>{
      console.log('***数据库链接正常***')
      resolve()
    })
    
  }) 
}
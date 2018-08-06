//数据提纯
const fs = require('fs')
fs.readFile('./goods.json','utf8', (err,data)=>{
  let newData = JSON.parse(data)
  let pushData = []
  newData.RECORDS.map( (value,index)=>{
    if(value.IMAGE1 !=null){
        pushData.push(value)
    }
  })
  fs.writeFile('./newGoods.json', JSON.stringify(pushData), (error)=>{
    if(error){
      console.log('文件写入失败')
    }else{
      console.log('文件写入成功')
    }
  })
})
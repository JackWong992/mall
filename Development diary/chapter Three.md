## chapter3：mock使用
### 3.1 easymock 和 axios的使用
首先模拟一下假数据，需要将假的数据挂载在mock平台，之前选择的是`easymock`，但是因为这个数据平台经常爆炸，所以我选择了`yapi`,地址为：http://yapi.demo.qunar.com/mock/14714/mall/index；mock数据写好以后需要和`axios`配合使用<br>
* 安装,引入axios
```
  npm i axios --save
  import axios from 'axios'
```
* 使用axios进行测试
```
  created() {
    axios({
      url: 'xxx',
      method: 'get'
    }).then( response=>{
      console.log( response )
    }).catch( error=>{
      console.log( error )
    })
  }
```


## chapter3：mock使用
### 3.1 easymock 和 axios的使用
首先模拟一下假数据，需要将假的数据挂载在mock平台，之前选择的是`easymock`，但是因为这个数据平台经常爆炸，所以我选择了`yapi`,地址为：http://yapi.demo.qunar.com/mock/14714/mall/index；<br>mock数据写好以后需要和`axios`配合使用<br>
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
### 3.2 adbanner 和 typebar 布局
typebar主要使用flex布局
```
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
```
 图片信息主要通过`response.data.data.categoary`传递进来<br>
adbanner主要是一个`div`包裹着`img`图片信息也是通过传递过来的；<br>
finish；
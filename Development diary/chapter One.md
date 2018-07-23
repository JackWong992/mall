## 1. 安装配置环境
* 1.1 项目初始化
```
  vue init webpack 
  // mall /  standalone / vue-router(yes) / eslint(no)/e2e(no)  
```
* 1.2 引入有赞的UI
安装：
```
  npm i want -S  //安装到生产环境
```
全局引入：
```
  import Vant from 'vant'
  import 'vant/lib/van-css/index.css'
  Vue.use(Vant)
```
局部引入：(推荐)
```
  npm i babel-plugin-import -D  //安装babel-plugin
```
修改配置文件".babelrc" 
```
 "plugins": [
    "transform-vue-jsx", 
    "transform-runtime",
    ["import",{"libraryName": "vant", "style": true}]
  ]
```
按需引入使用：
```
  import {Button} from 'vant'
  Vue.use(Button)
```
## 2. 引入CSS相关
解决元素的自带样式
```
  import './assets/styles/reset.css'  
```
解决高清手机1px偏差问题
```
  import './assets/styles/border.css
```
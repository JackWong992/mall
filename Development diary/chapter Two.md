# 2. 首页布局
## 2.1 移动端适配基础

* 移动端屏幕适配基础
```
=> index.html

    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
    let htmlDom = document.getElementsByTagName('html')[0]
    htmlDom.style.fontSize = htmlDom/20 +'px'     //以iphone5为标准适配
```
## 2.2 路由设置
### 创建主页 shoppingMall
引入：
```
  import ShoppingMall from '@/components/pages/ShoppingMall'
```
配置路由:
```
  export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShoppingMall',
      component: ShoppingMall
    }
  ]
})
```
配置好路由，创建简单的元素进行设置<br>
首先引入好Col , Row
```
  import  { Button. Row , Col } from 'vant'
  Vue.use(Row).use(Col).use(Button)
```
测试，完成~<br>
题外话： 安装 `vue snippets`快速搭建vue模板

## 2.3 搜索栏布局
### 2.3.1
左侧logo：
```
  location引入：import '../../assets/styles/iconfont.css'
  修改iconfont.css相对路径 
```
中间使用 `input`<br>
右侧：
```
  van-button>size="mini"{查找} 
```

## 2.4 轮播图制作
### 2.4.1引入Vant-Swipe
```
  Vue {Swipe,SwipeItem} from 'vant'
  Vue.use(Swipe).use(SwipeItem)
```
使用for循环+轮播实现图片无缝轮播
```
<van-swipe :autoplay="3000">
  <van-swipe-item v-for="(item,index) in bannerPicArray" :key="index">
    <img :src="item.imgUrl">
  </van-swipe-item>
</van-swipe>
```
出了一个小bug，刚加载进来会有图片拉长，解决方案：
```
  .swipwer-area
    width: 100%
    height: 0
    padding-bottom: （长度/宽度 ）%
    overflow: hidden
    clear: both
```
还需要注意的是vant的轮播是自带浮动的，所以要注意清除浮动；<br>
实现懒加载，需要到main.js再次引入vant的 `lazy-load`<br>
第二章结束，撒花~~~~~！ <br>
下面开始mock的使用；
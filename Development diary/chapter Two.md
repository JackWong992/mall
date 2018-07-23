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



## 2.4 轮播图制作

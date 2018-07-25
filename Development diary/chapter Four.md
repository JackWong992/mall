# Chapter 4: 首页的交互
## 4.1 使用`vue-awesome-swiper`完成商品推荐
商品推荐使用插件`vue-awesome-swiper`<br>
1. 下载
```
  npm run vue-awesome-swiper --save
```
2. 局部引入
```
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  components: {
    swiper,
    swiperSlide
  }
```
3. 使用：
```
  <swiper>
    <swiper-slide v-for="xxx">
      <div class="recommend-item">
        <img :src="x">             
      </div>
    </swiper-slide>
  </swiper>
```
利用`slidesPerView`属性让每一页展示3个推荐商品

## 4.2 首页楼层效果
使用flex布局进行楼层效果布局，分为左右:左边一张大图，右边两张小图<br>
```
  display: flex
  flex-direction: row
```
左右为`width: 50%;`,右边上下为列布局；下方规则布局
```
  display: flex;
  flex-direction: row
```
子元素：
```
  width: 50%;
```
实现规则布局；

## 4.3 楼层组件封装
创建`component`至`components`，新建文件`flooorComponent`
父组件传数据给子组件通过prop属性传递数据
```
  props: ['floorData']
  watch: {
    floorData: function(){
      this.floorData0 = this.floorData[0]
      this.floorData1 = this.floorData[1]
      this.floorData2 = this.floorData[2]  //使用watch监听 
    }
  }
```
父组件引用：
```
  import floorComponent from '../components/floorComponents.vue'

  component: [floorComponent]
  <floor-component :floorData="floor1"></floor-component>
```

## 4.4 完善楼层组件
floorName数据传递
```
  floorName: {}
  this.floorName = response.data.data.floorName

子组件:
  :floorTitle = "floorName"
接受：
  props:['floorTitile']
```

## 4.5 使用filter实现代码优化
`src`->`mkdir filter `->`touch moneyFilter.js`
``` 
  export function toMoney(money){
    let newMoney = money
    if( newMoney ){
      newMoney = newMoney.toFixed(2)
    }else{
      new Money = 0
      newMoney = newMoney.toFixed(2)      
    }
    return newMoney
  }
```
父组件引入:
```
  import {toMoney} from '@/filter/moneyFilter.js'
```
父组件使用filters属性：
```
  filters: {
    moneyFilter(money){
      return toMoney(money)
    }
  }
```

## 4.6 list组件封装
使用vant的list组件首先要引入list
```
  import {List} from 'vant'
  Vue.use(List)
```
通过aixos引入
```
  component: {
    hotGoods: {}
  }

  this.hotsGoods = response.data.data.hotsGoods
```
布局van-row
```
<!--Hot Area-->
<div class="hot-area">
    <div class="hot-title">热卖商品</div>
    <div class="hot-goods">
        <van-list>
            <van-row gutter="20">
                <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
                    <div>{{item.name}}</div>
                </van-col>
            </van-row>
        </van-list>
    </div>
</div>
```
商品显示组件编写
```
  <template>
    <div class="goods-info">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="90%" />
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
    </div>
</template>

<script>
    import {toMoney} from '@/filter/moneyFilter.js'
    export default {
        props:['goodsImage','goodsName','goodsPrice'],
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }  
        },
    }
</script>

<style scoped>
    .goods-name{
        padding: 0 8px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space:nowrap; 
    }
</style>
```
子组件要写一个父组件传递的数据的属性：注意，千万千万不要在父组件中props属性写到`filters`中，你看我就弱智了一次。<br>
到此为止，子组件的任务已经结束了；<br>
父组件使用子组件：
```
  import goodsInfo from '../component/goodsInfoComponent'
```
模板中使用：
```
  <good-info :goodsImage="item.image"
             :goodsName="item.name"
             :goodsPrice="item.price"
  >
  </goods-info>
```


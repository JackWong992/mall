<template>
  <div>
    <div class="search-bar">
      <van-row >
        <van-col span="3">
          <span class="iconfont icon-loaction"></span> 
        </van-col>
        <van-col span="16">          
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>  
        </van-col>      
      </van-row>
    </div>
    <!-- swiper area -->
    <div class="swiper-area">
      <van-swipe :autoplay="5000">
        <van-swipe-item v-for="item in bannerPicArray" :key="item.goodsId">
          <img v-lazy="item.image" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type bar  -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <div class="img">
          <img v-lazy="cate.image" width="90%">          
        </div>
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!-- adBanner -->
    <div class="advertise"><img v-lazy="adBanner" width="100%"></div>
    <!-- recommend area -->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
        <div class="recommend-body">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item , index) in recommendGoods" :key="index">
              <div class="recommend-item">
                <img :src="item.image" width="80%">
                <div>{{item.goodsName}}</div>
                <div>￥{{item.price|moneyFilter }}(￥{{item.mallPrice|moneyFilter }})</div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
    </div>
    <!-- floor area -->
    <floor-component :floorData="floor1" 
                     :floorTitle="floorName.floor1"
                     :floorNumber="floorName.floortitle1"
                     >
                     </floor-component>
    <floor-component :floorData="floor2"
                    :floorTitle="floorName.floor2"
                    :floorNumber="floorName.floortitle2">
                    </floor-component>
    <floor-component :floorData="floor3"
                    :floorTitle="floorName.floor3"
                    :floorNumber="floorName.floortitle3">
                    </floor-component>
    <!-- hotGoods area -->
    <div class="hot-area">
      <div class="hot-title"><span class='hot'>火</span> 热卖商品</div>
      <div class="hot-goods">
        <!-- list 组件 -->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goods-info :goodsName="item.name"
                          :goodsPrice="item.price"
                          :goodsImage="item.image"
              ></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import 'swiper/dist/css/swiper.css'  
  import {swiper,swiperSlide} from 'vue-awesome-swiper'
  import floorComponent from '../component/floorComponent'
  import {toMoney} from '@/filter/moneyFilter.js'
  import goodsInfo from '../component/goodsInfoComponent'
  export default {
    name: 'ShoppingMall',
    data() {
      return {
        swiperOption: {
          slidesPerView: 3
        },
        msg : 'Shopping Mall',
        bannerPicArray: [],
        category: [],
        adBanner: "",
        recommendGoods: [],
        floor1: [],
        floor2: [],
        floor3: [],
        floorName: {},
        floorNumber: {},
        hotGoods: []
      }
    },
    components: {
      swiper,
      swiperSlide,
      floorComponent,
      goodsInfo
    },
    filters: {
        moneyFilter(money){
          return toMoney(money)
       }
    },
    created () {
      axios({
        url: 'http://yapi.demo.qunar.com/mock/14714/mall/index',
        method: 'get'
      }).then( response=>{
        console.log(response)
        if(response.status ===200){
          this.bannerPicArray = response.data.data.slides
          this.category = response.data.data.category
          this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS
          this.recommendGoods = response.data.data.recommend
          this.floor1 = response.data.data.floor1
          this.floor2 = response.data.data.floor2
          this.floor3 = response.data.data.floor3
          this.floorName = response.data.data.floorName
          this.floorNumber = response.data.data.floorName
          this.hotGoods = response.data.data.hotGoods 
        }
      }).catch( error=>{
        console.log(error)
      })
    }
  }
</script>

<style scoped>
  .search-bar {
    line-height: 2.2rem;
    height: 2.2rem;
    background: #e5017d;
    overflow: hidden;
  }
  .icon-loaction {
    color: #eee;
    font-size: 24px;
    margin-left: .4rem;
  }
  .search-input {
    width: 98%;
    height: 1.6rem;
    line-height: 1.6rem;
    font-size: 16px;
    line-height: 1.6rem;
    border-radius: .12rem;
    text-indent: .5rem;
  }
  .swiper-area {
    clear: both;
    width: 100%;
    height: 0;
    padding-bottom: 44.6%;
    overflow: hidden;
  }
  .type-bar {
    background-color: #fff;
    display: flex;
    margin: .3rem;
    margin-top: 0;
    border-radius: .3rem;
    font-size: 14px;
    flex-wrap: nowrap;
    flex-direction: row;
  }
  .type-bar .img {
    padding-bottom: .35rem;
  }
  .type-bar div {    
    text-align: center;
    font-size: 12px;
    padding: .3rem;    
  }
  .advertise {
    padding-bottom: .3rem;
  }
  .recommend-area {
    background-color: #fff; 
  }
  .recommend-title {
    border-bottom: 1px solid #eee;
    padding-top: .3rem;
    padding-left: .3rem;
    padding-bottom: .3rem;
    font-size: 14px;
    color: #e5017d;
  }
  .recommend-body {
    border-bottom: 1px solid #eee;
  }
  .recommend-item {
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }
  .hot-area {
    text-align: center;
    font-size:14px;
    height:1.8rem;
    line-height: 1.8rem;
  }
  .hot-title .hot {
    color: #fff;
    display: inline-block;
    background: #d93f26;
    margin-right: .5rem;
    border-radius: 50%;
    width: 1.4rem;
    height: 1.4rem;
    line-height: 1.5rem;
  }
</style>
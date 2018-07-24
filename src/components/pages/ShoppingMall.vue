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
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'ShoppingMall',
    data() {
      return {
        msg : 'Shopping Mall',
        bannerPicArray: [],
        category: [],
        adBanner: ""
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
</style>
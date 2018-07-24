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
        <van-swipe-item v-for="item in bannerPicArray" :key="item.id">
          <img v-lazy="item.imageUrl" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'ShoppingMall',
    data() {
      return {
        msg : 'Shopping Mall',
        bannerPicArray: [
          { 
            id: '001',
            imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg'
            },
          { 
            id: '002',
            imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg'
            },
          { 
            id: '003',
            imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg'
            }
        ]
      }
    },
    created () {
      axios({
        url: 'http://yapi.demo.qunar.com/mock/14714/mall/index',
        method: 'get'
      }).then( response=>{
        console.log(response)
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
</style>
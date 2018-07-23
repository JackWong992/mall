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
  </div>
</template>

<script>
  export default {
    name: 'ShoppingMall',
    data() {
      return {
        msg : 'Shopping Mall',
        
      }
    }
  }
</script>

<style scoped>
  .search-bar {
    line-height: 2.2rem;
    height: 2.2rem;
    background: #e5017d;
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
</style>
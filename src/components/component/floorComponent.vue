<template>
  <div>
    <div class="floor">
      <div class="floor-title">
        <span class="number">{{floorNumber}}F</span>{{floorTitle}}</div>
      <div class="floor-anomaly">
        <div class="floor-one">
          <img :src="floorData0.image" width="100%" />
        </div>
        <div>
          <div class="floor-two">
            <img :src="floorData1.image" width="100%" />
          </div>
          <div>
            <img :src="floorData2.image" width="100%" />
          </div>
        </div>
      </div>
      <div class="floor-rule">
        <div v-for="(item, index) in floorData.slice(3)" :key="index">
            <img :src="item.image" width="100%"/>
        </div>
      </div>
    </div>      
  </div>
</template>

<script>
  export default {
      props:['floorData','floorTitle','floorNumber'],
      data() {
          return {
              floorData0:{},
              floorData1:{},
              floorData2:{}
          }
      },
      created(){
          
      },
      watch:{
          floorData:function(val){
              this.floorData0 = this.floorData[0]
              this.floorData1 = this.floorData[1]
              this.floorData2 = this.floorData[2]
          }
      }
  }
</script>

<style scoped>
  .floor-title{
    text-align: center;
    font-size:14px;
    height:1.8rem;
    line-height: 1.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .floor-title .number {
    display: inline;
    width: 1.5rem;
    height: 1.5rem;
    margin-right: .6rem;
    border-radius: 50%;
    background: #DB3E1A;
    font-size: 11px;
    color: #fff;
    text-align: center;
  }
  .floor-anomaly {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border: 1px solid #ddd;
  }
  .floor-one {
    border-right: 1px solid #ddd;
    width: 50%;    
  }
  .floor-anomaly>div:nth-child(2) {
    width: 50%;
  }
  .floor-two {
    border-bottom: 1px solid #ddd;    
  }
  .floor-rule {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;
  }
  .floor-rule div {
    box-sizing: border-box;
    width: 50%;
    border-bottom: 1px solid #ddd;
  }
  .floor-rule div:nth-child(odd) {
    border-right: 1px solid #ddd;
  }
</style>
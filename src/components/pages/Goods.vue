<template>
    <div>
        <div class="navbar-div">
          <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
          />
        </div>
        <div class="topimage-div">
          <img :src="goodsInfo.IMAGE1" width="100%">
        </div>
       <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-id">商品编号: <span>{{goodsInfo.GOODS_SERIAL_NUMBER}}</span></div>
        <div class="goods-price"><span class="price">￥{{goodsInfo.PRESENT_PRICE| moneyFilter}}</span>  
                                市场价:<span class="market-price">￥{{goodsInfo.ORI_PRICE| moneyFilter}}</span></div>
        <div>
        <div class="goods-exp">
          说明: > &nbsp;极速送达 &nbsp;> 正品保障
        </div>
          <van-tabs swipeable>
            <van-tab title="商品详情">
              <div v-html="goodsInfo.DETAIL" class="detail"></div>
            </van-tab>
            <van-tab title="评论">
              评论制作中...
            </van-tab>
          </van-tabs>
        </div>
        <div class="goods-bottom">
          <div>
            <van-button size="large" type="primary">加入购物车</van-button>
          </div>
          <div>
            <van-button size="large" type="danger">直接购买</van-button>
          </div>
        </div> 
    </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import { toMoney } from "@/filter/moneyFilter.js";

export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {} //商品详细信息
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },

  created() {
    this.goodsId = this.$route.query.goodsId;
    console.log(this.goodsId);
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: {
          goodsId: this.goodsId
        }
      })
        .then(response => {
          if (response.data.code === 200 && response.data.message) {
            this.goodsInfo = response.data.message;
            console.log(response)
          } else {
            Toast("服务器获取信息失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.goods-name {
  background-color: #fff;
  font-size: 14px;
  padding: 0.8rem  0 .5rem  0.6rem;
}
.goods-id {
  background: #fff;
  padding-left: .6rem;
  color: #BABABA;
  padding-bottom: 1rem;
}
.goods-id > span{
  color: #d93f26;
}

.goods-price {
  background-color: #fff;
  padding-left: .6rem;
  color: #878787;
  padding-bottom: 1rem;
}
.goods-price .price {
  font-weight: bold;
  color: #D95B29;
  margin-right: .8rem;
}
.goods-price .market-price {
  color: #878787;
  margin-left: .6rem;
  text-decoration: line-through;
}
.goods-exp {
  font-size: 1rem;
  color: #D95B29;
  padding-left: .6rem;
  padding-top: 1.1rem;
  padding-bottom: 1.1rem;
  background: #fff;
  margin-top:  .4rem;
  margin-bottom: .4rem;
}
.detail {
  font-size: 0px;
}
.goods-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.goods-bottom >div{
  flex-grow: 1;
}
</style>
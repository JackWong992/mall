<template>
  <div>
    <div class="navbar">
      <van-nav-bar title="商品列表"/>
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div class="leftNav">
            <ul>
              <li v-for=" (item,index) in category " 
                  :key="index"
                  @click="clickCategory(index, item.ID)"
                  :class="{categoaryActive:categoryIndex==index}"
                  >
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active">
              <van-tab  v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [], //商品类别子类信息
      active: 0 //激活标签的数值
    };
  },
  created() {
    this.getCategory();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementsByClassName("leftNav")[0].style.height =
      winHeight - 50 + "px";
  },
  methods: {
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(response => {
          console.log(response);
          if (response.data.code === 200 && response.data.message) {
            this.category = response.data.message;
            this.getCategoryByCategoryID(this.category[0].ID)
          } else {
            Toast("服务器数据异常");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.getCategoryByCategoryID(categoryId);
    },
    //根据商品列表信息获取子类类别
    getCategoryByCategoryID(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: {
          categoryId: categoryId
        }
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message;
            this.active = 0;
          } else {
            Toast("服务器错误,数据获取失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.leftNav {
  background: aliceblue;
  text-align: center;
}
.leftNav ul li {
  padding: 0.4rem 0;
  font-size: 0.87rem;
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
}
.categoaryActive {
  background: #fff;
}
</style>
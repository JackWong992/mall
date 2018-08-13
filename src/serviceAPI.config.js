const BASEURL = "http://yapi.demo.qunar.com/mock/14714/mall/"
const LOCALURL = "http://localhost:3000/" //引入后台数据
const URL = {
  getShopingMallInfo: BASEURL +'index',
  getGoodsInfo: BASEURL+'getGoodsInfo',
  registerUser: LOCALURL + 'user/register', //用户接口
  login: LOCALURL + 'user/login', //用户登录接口
  getDetailGoodsInfo: LOCALURL+'goods/getDetailGoodsInfo'//获取商品详情
}

module.exports = URL
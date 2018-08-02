const BASEURL = "http://yapi.demo.qunar.com/mock/14714/mall/"
const LOCALURL = "http://localhost:3000/" //引入后台数据
const URL = {
  getShopingMallInfo: BASEURL +'index',
  getGoodsInfo: BASEURL+'getGoodsInfo',
  registerUser: LOCALURL + 'user/register' //用户页面
}

module.exports = URL
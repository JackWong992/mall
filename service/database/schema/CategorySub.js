const mongoose = require('mongoose')  //引入mongoose
const Schema = mongoose.Schema  //声明Schema

const categorySubSchema = new Schema({
  ID:{unique: true, type: String},
  MALL_CATEGORY_ID:{type: String },
  MALL_SUB_NAME:{type: String},
  COMMENTS:{type: Number},
  SORT: {Type: Number}

})
mongoose.model('CategorySub', categorySubSchema)
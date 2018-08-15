const Router = require("koa-router");
let router = new Router();

const mongoose = require("mongoose");
const fs = require("fs");

//1---插入商品数据
router.get("/insertAllGoodsInfo", async ctx => {
  fs.readFile("./data_json/newGoods.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const Goods = mongoose.model("Goods");
    data.map((value, index) => {
      console.log(value);
      let newGoods = new Goods(value);
      newGoods
        .save()
        .then(() => {
          saveCount++;
          console.log("成功" + saveCount);
        })
        .catch(err => {
          console.log(error);
        });
    });
  });
  ctx.body = "开始导入数据";
});

//2---插入category数据
router.get("/insertAllCategory", async ctx => {
  fs.readFile("./data_json/category.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const Category = mongoose.model("Category");
    data.RECORDS.map((value, index) => {
      console.log(value);
      let newCategory = new Category(value);
      newCategory
        .save()
        .then(() => {
          saveCount++;
          console.log("插入成功:" + saveCount);
        })
        .catch(error => {
          console.log("插入失败:" + error);
        });
    });
  });
  ctx.body = "开始导入数据...";
});

//3---插入categorySub数据
router.get("/insertAllCategorySub", async ctx => {
  fs.readFile("./data_json/category_sub.json", "utf8", (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const CategorySub = mongoose.model("CategorySub");
    data.RECORDS.map((value, index) => {
      console.log(value);
      let newCategorySub = new CategorySub(value);
      newCategorySub
        .save()
        .then(() => {
          saveCount++;
          console.log("插入成功:" + saveCount);
        })
        .catch(error => {
          console.log("插入失败:" + error);
        });
    });
  });
  ctx.body = "开始导入数据...";
});

//4---获取商品详情页面
router.post("/getDetailGoodsInfo", async ctx => {
  let goodsId = ctx.request.body.goodsId;
  const Goods = mongoose.model("Goods");
  await Goods.findOne({ ID: goodsId })
    .exec()
    .then(async result => {
      ctx.body = { code: 200, message: result };
    })
    .catch(error => {
      console.log(error);
      ctx.body = { code: 500, message: error };
    });
});

//5---读取类别信息接口
router.get("/getCategoryList", async ctx => {
  try {
    const Category = mongoose.model("Category");
    let result = await Category.find().exec();
    ctx.body = {
      code: 200,
      message: result
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    };
  }
});
//6---读取类别信息子类接口
router.post("/getCategorySubList", async ctx => {
  try {
   let categoryId = ctx.request.body.categoryId
    //let categoryId = 1;
    const CategorySub = mongoose.model("CategorySub");
    let result = await CategorySub.find({
      MALL_CATEGORY_ID: categoryId
    }).exec();
    ctx.body = {
      code: 200,
      message: result
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    };
  }
});

//7--根据类别信息获取商品列表
router.get("/getGoodsListByCategorySubID", async (ctx) => {
  try {
    // let categoryId = ctx.request.body.categoryId
    let categorySubId = '2c9f6c946016ea9b016016f79c8e0000';
    const Goods = mongoose.model("Goods");
    let result = await Goods.find({
      SUB_ID: categorySubId
    }).exec();
    ctx.body = {
      code: 200,
      message: result
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    };
  }
});

module.exports = router;

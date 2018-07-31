const Router = require('koa-router')
let router = new Router()

router.get('/', async(ctx)=>{
  ctx.body = '用户主页'
})
router.get('/register', async(ctx)=>{
  ctx.body = '用户注册页面'
})


module.exports = router
const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const webpack = require('webpack')
const WebpackHotMiddleware = require('koa-webpack-hot-middleware')
const WebpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackConfig = require('./webpack.config')

const app = new Koa()
const router = new Router()
const complier = webpack(webpackConfig)

app.use(WebpackDevMiddleware(complier, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(WebpackHotMiddleware(complier))

app.use(static(__dirname))

app.use(bodyParser())

app.use(router.routes(), router.allowedMethods())

router.get('/simple/get', async ctx => {
  ctx.body = {
    msg: 'success'
  }
})

router.get('/base/get', async ctx => {
  const { query } = ctx
  ctx.body = query
})

const port = process.env.PORT || 8090
app.listen(port, console.log(`server start at port ${port}`))
const express = require('express')
const app = express()
const tree=require('./router/tree')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    // 允许的header类型
    res.header('Access-Control-Allow-Headers','content-type');
    // 跨域允许的请求方式
    res.header('Access-Control-Allow-Methods','DELETE,PUT,POST,GET,OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.send()
    }
    next()
})
app.use('/tree',tree)

app.listen(3000, () => {
    console.log('3000端口服务启动')
})
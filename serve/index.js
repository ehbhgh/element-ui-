const express = require('express')
const app = express()
const tree=require('./router/tree')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    if (req.method === 'OPTIONS') {
        return res.send()
    }
    next()
})
app.use('/tree',tree)
app.listen(3000, () => {
    console.log('3000端口服务启动')
})
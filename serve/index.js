const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const p=path.join(__dirname, '../db/index.json')

const readFile = (callBack) => {
    fs.readFile(p, 'utf8', (err, data) => {
        if (err) {
            return
        }
        callBack && callBack(JSON.parse(data))
    })
}
const writeFile=(json,res,msg)=>{
    fs.writeFile(p, json, (err) => {
        res.json({
            msg
        })
    })
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    if (req.method === 'OPTIONS') {
        return res.send()
    }
    next()
})
app.get('/getTreeList', (req, res) => {
    readFile((data) => {
        res.json(data)
    })
})

app.get('/deleteTreeList/:id', (req, res) => {
    let id = parseInt(req.params.id)
    readFile((data) => {
        let {
            parent,
            children
        } = data
        const newParent = parent.filter(item => item.id !== id)
        const newChildren = children.filter(item => item.id !== id)
        data.parent = newParent;
        data.children = newChildren;
        let json = JSON.stringify(data)
        let msg='删除成功'
        writeFile(json,res,msg)
    })

})
app.listen(3000, () => {
    console.log('3000端口服务启动')
})
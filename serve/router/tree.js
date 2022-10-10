
const express = require('express')
const { readFile,writeFile} =require('../playData/playData')
const router=express.Router()

router.get('/getTreeList', (req, res) => {
    readFile((data) => {
        res.json(data)
    })
})

router.get('/deleteTreeList/:id', (req, res) => {
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

module.exports=router
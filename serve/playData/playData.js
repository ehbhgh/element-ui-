const fs = require('fs')
const path = require('path')
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

module.exports={
    readFile,
    writeFile
}
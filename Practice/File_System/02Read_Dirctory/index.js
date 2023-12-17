const fs = require("fs")

// read directory
// sync -> const data =  fs.readdirSync(path,encoding)
// async -> fs.readdir(path,{encoding},(err,data)=>{   })

fs.readFile("index.js",{encoding:"utf-8"},(err,data)=>{console.log(data)})
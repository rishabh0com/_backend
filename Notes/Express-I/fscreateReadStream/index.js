const fs = require("fs")
const http = require("http")

const server = http.createServer((req,res)=>{
    if(req.url == "/"){
        res.end("Home Page ..")
    }
    else if(req.url == "/data")
    {
        let data = fs.createReadStream("./db.json",{encoding:"utf-8"})
        data.pipe(res)
        console.log(fs.readFileSync("./db.json",{encoding:"utf-8"}))
    }
    else{
        res.end("404")
    }
})

server.listen(8080,()=>{console.log("server is running")})

// let date = new Date().toTimeString()
// console.log(date)
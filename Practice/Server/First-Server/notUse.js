const http = require("http")

const server = http.createServer((req,res)=>{
    if(req.url == "/"){
        res.end("Home Page ")
    }
    else if(req.url == "/comments"){
        res.write("Comment Section")
        res.end() //end of response *mandatory
    }
    else if(req.url == "/data"){
        res.write(" TaTa ")
        res.end("Data Section")
    }else{
        res.end("404 not found ")
    }
})

server.listen(8080,()=>{console.log("server is running")})

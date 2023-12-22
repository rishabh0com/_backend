const express = require("express")
const fs = require("fs")

const app =  express()
const PORT = 4500

// middleware
app.use(express.json()) // this help to get data in post request

app.get("/",(req,res)=>{
    res.send("Home Page ")
})
app.get("/data",(req,res)=>{
    let data = JSON.parse(fs.readFileSync("./database.json",{encoding:"utf-8"}))
    // console.log(data)
    res.send(data)
})
app.post("/teacher",(req,res)=>{
    // console.log(req.body)
    // read the file
    const data = fs.readFileSync("./database.json","utf-8");
    // file json data convert into object
    let parsedData = JSON.parse(data) // object
    // push the data 
    parsedData.teacher.push(req.body)
    // conver the data into json format
    let jsonData = JSON.stringify(parsedData)
    // append the data
    fs.writeFileSync("./database.json",jsonData)
    
    console.log("data file :",parsedData)
    res.end("saved the data")
})



app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
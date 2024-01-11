const fs = require("fs")

// create folder name - > asyncFolder
fs.mkdir("./asyncFolder",(err)=>{
    if (err) console.log(err)
    console.log("folder is created")
}) 

// create file -> bio.txt
let content = "welcome to file bio.txt ::"
fs.writeFile("./asyncFolder/bio.txt",content,(err)=>{
    if(err) console.log(err)
    console.log("bio.txt is created")
})

// append data in bio.txt
let moreContent = " again welcome"
fs.appendFile("./asyncFolder/bio.txt",moreContent,(err)=>{
    console.log("content added")
})

// read file content in bio.txt
fs.readFile("./asyncFolder/bio.txt","utf-8",(err,data)=>{
    console.log("bio.txt data : ",data)
})

// rename file bio.txt -> mybio.txt
fs.rename("./asyncFolder/bio.txt","./asyncFolder/mybio.txt",(err)=>{
    if (err) console.log(err)
    console.log("file renamed")
})

// delete file
fs.unlink("./asyncFolder/mybio.txt",(err)=>{
    if(err) console.log(err)
    console.log("file is deleted")
})

// delete folder
fs.rmdir("./asyncFolder",(err)=>{
    if(err) console.log(err)
    console.log("folder deleted")
})
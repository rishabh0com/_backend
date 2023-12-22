const fs = require("fs")

// create folder
fs.mkdirSync("./folder") //

// create file -> bio.txt 
let content = "welcome to bio.txt :)"//
fs.writeFileSync("./folder/bio.txt",content)//

// append data into bio.txt
let appendContent = "  this is a demo txt file"
fs.appendFileSync("./folder/bio.txt",appendContent)//

// read file
let fileData = fs.readFileSync("./folder/bio.txt",{encoding:"utf-8"}) 
// let fileData = fs.readFileSync("./folder/bio.txt").toString() // another method
console.log(fileData)

// rename the file bio.txt -> mybio.txt
fs.renameSync("./folder/bio.txt","./folder/mybio.txt") //

// delete file
fs.unlinkSync("./folder/bio.txt")
fs.unlinkSync("./folder/mybio.txt")

// delete folder
fs.rmdirSync("./folder")

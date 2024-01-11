const fs = require("fs");

// read directory
// sync -> const data =  fs.readdirSync(path,encoding)
// async -> fs.readdir(path,{encoding},(err,data)=>{   })

// fs.readFile("index.js",{encoding:"utf-8"},(err,data)=>{console.log(data)})

// async
fs.readdir("Read_Directory", { encoding: "utf-8" }, (err, data) => {
  if (err) console.log(err);
  console.log(data);
});

// create new directory
fs.mkdir("folder", (err, data) => {});

// rename the directory
fs.rename("folder", "Folder", (err, data) => {});

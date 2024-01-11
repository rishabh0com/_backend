
// read the file

const fs = require("fs")

// fs.readFile("./letter.txt",{encoding:"utf-8"},(err,data)=>{
//     console.log(data,"data");
// });

let data = fs.readFileSync("./letter.txt",{encoding:"utf-8"});
console.log(data); // synchronous opration

console.log("hii");

// write the file 

// fs.writeFile("./tet.txt","hii file ji",{encoding:"utf-8"},(err)=>{ //async operation
//     if(err){
//         console.log("failed");
//     }else{
//         console.log("succesFull write");
//     }
// })

// fs.writeFileSync("./test.txt","this is a test file");

let content = "this is test 1"
let content2 = "test 2 is overwrite"

fs.writeFileSync("./test.txt",content2); // this creates and overwrite the file

//this function add more content in already exsist file (add content)
fs.appendFileSync("./test.txt","  ..more content");

fs.readFile("./test.txt",{encoding:"utf-8"},(err,data)=>{
    console.log(data);
})
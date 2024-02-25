const crypto = require("crypto");

// this is generate 6 digit number :
const otp = crypto.randomInt(100000, 1000000);

console.log("Otp is : " , otp);

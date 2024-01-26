const crypto = require("crypto");

const otp = (length) => {
  if (!length) {
    console.log("please provide length to generate otp~");
  }
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  const otp = crypto.randomInt(min, max);
  console.log(otp);
};

otp(4) //
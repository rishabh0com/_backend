const os = require("os")

const freeMemory = os.totalmem()
console.log(`free memory : ${freeMemory / 1024 / 1024 / 1024 }`)
const os = require("os")

const freeMemory = os.freemem()
console.log(`free memory : ${freeMemory / 1024 / 1024 / 1024  }`)
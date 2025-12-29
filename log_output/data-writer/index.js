const fs = require("fs");

const generateRndString = (lenght) => {
  return Math.random()
    .toString(36)
    .substring(2, lenght + 2);
};

const randomString = generateRndString(15);

setInterval(() => {
  const timestamp = new Date().toISOString();
  const line = `${timestamp}: ${randomString}\n`;
  fs.appendFile("/files/log_output.log", line, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${timestamp}: ${randomString}`);
    }
  });
}, 5000);

const generateRndString = (lenght) => {
  return Math.random()
    .toString(36)
    .substring(2, lenght + 2);
};

const randomString = generateRndString(15);

setInterval(() => {
  console.log(`${new Date().toISOString()}: ${randomString}`);
}, 5000);

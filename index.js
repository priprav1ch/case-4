function sum(a, b) {
  return a + b;
}

module.exports = { sum };

if (require.main === module) {
  console.log("App is running!");
}

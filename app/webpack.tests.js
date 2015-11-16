// this regex matches any js files in __tests__ directories
var context = require.context('.', true, /__tests__\/.+\.js$/);
console.log(context.keys());
context.keys().forEach(context);

module.exports = context;

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

module.exports = (filePath) => {
  return fs.readFileAsync(filePath, 'utf8')
}

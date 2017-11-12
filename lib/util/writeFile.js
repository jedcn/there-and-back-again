const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

module.exports = (filePath, contents) => {
  return fs.writeFile(filePath, contents)
}

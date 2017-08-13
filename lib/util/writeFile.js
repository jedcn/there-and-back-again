'use es6'

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

function writeFile (filePath, contents) {
  return fs.writeFile(filePath, contents)
}

exports.writeFile = writeFile

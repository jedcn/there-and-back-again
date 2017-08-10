'use es6'

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

function readFile (filePath) {
  return fs.readFileAsync(filePath, 'utf8')
}

exports.readFile = readFile

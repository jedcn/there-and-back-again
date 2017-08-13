'use es6'

function readFiles (dir, files) {
  const readFile = require('./readFile').readFile
  const readFilePromises = []
  for (let i = 0; i < files.length; i++) {
    readFilePromises.push(readFile(`${dir}/${files[i]}`))
  }
  return Promise.all(readFilePromises)
}

exports.readFiles = readFiles

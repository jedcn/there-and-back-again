const readFile = require('./readFile')

const readFiles = (dir, files) => {
  const readFileInDir = (file) => readFile(`${dir}/${file}`)
  return Promise.all(files.map(readFileInDir))
}

module.exports = readFiles

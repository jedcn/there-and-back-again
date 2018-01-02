
const { EOL } = require('os')
const List = require('immutable').List

const readFile = require('./readFile')

const splitLinesIntoListOfLines = (lines) => {
  const result = lines.split(EOL)
  if (result[result.length - 1] === '') {
    result.pop()
  }
  return List(result)
}

const splitFileIntoListOfLines = (filePath) => {
  return readFile(filePath).then(splitLinesIntoListOfLines)
}

module.exports = splitFileIntoListOfLines

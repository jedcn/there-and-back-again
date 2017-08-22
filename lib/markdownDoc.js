'use es6'

const listOfStrings = require('./util/listOfStrings').listOfStrings

function codeBlock (string) {
  const list = listOfStrings(string)

  return {
    getLines: function () {
      return list.getLines()
    }
  }
}

function markdownDoc (string) {
  const list = listOfStrings(string)

  return {
    getLines: function () {
      return list.getLines()
    },

    getCodeBlocks: function () {
      let inCodeBlock = false
      let codeFoundSoFar = null
      const collectCodeBlocksAndFalseValues = function (line) {
        if (line === '```') {
          inCodeBlock = !inCodeBlock
          if (!inCodeBlock) {
            const code = codeBlock(codeFoundSoFar)
            codeFoundSoFar = null
            return code
          }
        } else {
          if (inCodeBlock) {
            if (codeFoundSoFar === null) {
              codeFoundSoFar = line
            } else {
              codeFoundSoFar = `${codeFoundSoFar}\n${line}`
            }
          }
        }
        return false
      }
      const eliminateFalseValues = function (result) {
        return result !== false
      }
      return list.getLines()
        .map(collectCodeBlocksAndFalseValues)
        .filter(eliminateFalseValues)
    },
    getCode: function () {
      const codeBlocks = this.getCodeBlocks()
      return codeBlocks.reduce(function (acc, item) {
        return acc + item.getLines().join('\n') + '\n'
      }, '')
    }
  }
}

exports.markdownDoc = markdownDoc

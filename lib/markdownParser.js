'use es6'

const markdown = require('markdown').markdown

function isParagraph (node) {
  return node[0] === 'para'
}

function isProperCodeBlock (node) {
  return node[0] === 'code_block'
}

function isStartOfCode (node) {
  if (Array.isArray(node[1])) {
    return node[1][0] === 'inlinecode' && node[1][1] === ''
  }
  return false
}

function isEndOfCode (node) {
  if (Array.isArray(node[2])) {
    return node[2][0] === 'inlinecode' && node[2][1] === ''
  }
  return false
}

function isContainedChunkOfCode (node) {
  if (isParagraph(node)) {
    if (Array.isArray(node[1])) {
      return node[1][0] === 'inlinecode' && node[1][1] !== ''
    }
  }
  return false
}

function getCode (node) {
  if (isProperCodeBlock(node)) {
    return `${node[1]}\n`
  }
  if (isStartOfCode(node)) {
    return node[2].replace('`\n', '')
  }
  if (isEndOfCode(node)) {
    return `\n\n${node[1]}`
  }
  if (isContainedChunkOfCode(node)) {
    return node[1][1].replace('\n', '')
  }
  return null
}

function markdownParser (string) {
  const tree = markdown.parse(string)
  return {
    getCode: function () {
      let overallCode = ''
      let collectingCode = false
      let currentCode = null
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (isContainedChunkOfCode(node) || isProperCodeBlock(node)) {
          overallCode += getCode(node)
        }
        if (isStartOfCode(node)) {
          collectingCode = true
          currentCode = getCode(node)
        } else if (isEndOfCode(node)) {
          currentCode += getCode(node)
          collectingCode = false
          overallCode += currentCode
        } else if (collectingCode) {
          currentCode += `\n\n${node[1]}`
        }
      }
      return overallCode
    }
  }
}

exports.markdownParser = markdownParser

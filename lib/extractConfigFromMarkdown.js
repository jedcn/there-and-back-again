'use es6'

const markdown = require('markdown').markdown

function extractConfigFromMarkdown (markdownContent) {
  const parsedTree = markdown.parse(markdownContent)
  const extractedConfig = parsedTree.reduce(function (acc, node) {
    if (node[0] === 'para') {
      if (Array.isArray(node[1])) {
        if (node[1][0] === 'inlinecode') {
          return acc + node[1][1].replace('\n', '')
        }
      }
    }
    return acc
  }, '')
  return extractedConfig
}

exports.extractConfigFromMarkdown = extractConfigFromMarkdown

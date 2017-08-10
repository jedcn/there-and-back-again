'use es6'

const markdownParser = require('./markdownParser').markdownParser

function extractConfigFromMarkdown (markdownContent) {
  return markdownParser(markdownContent).getCode()
}

exports.extractConfigFromMarkdown = extractConfigFromMarkdown

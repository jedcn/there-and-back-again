'use es6'

const markdownDoc = require('./markdownDoc').markdownDoc

function extractConfigFromMarkdown (markdownContent) {
  return markdownDoc(markdownContent).getCode()
}

exports.extractConfigFromMarkdown = extractConfigFromMarkdown

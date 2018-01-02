const { EOL } = require('os')

const List = require('immutable').List

const parseMarkdown = require('./../core/parseMarkdown').parseMarkdown
const parseConfig = require('../core/parseConfig').parseConfig
const Comment = require('../core/parseConfig').Comment

const isType = (line, type) => line && line.toString().startsWith(`${type} `)
const isHeading = (line) => isType(line, 'Heading')
const isCodeBlockBegin = (line) => isType(line, 'CodeBlockBegin')
const isCodeBlockEnd = (line) => isType(line, 'CodeBlockEnd')

const updateMarkdownWithConfig = (parsedMarkdown, parsedConfig) => {
  let currentHeading = null
  let isInCodeBlock = false
  let changedMarkdown = List()
  parsedMarkdown.forEach((line, index) => {
    if (isHeading(line)) {
      currentHeading = line
    }
    if (isCodeBlockBegin(line) || isCodeBlockEnd(line)) {
      isInCodeBlock = !isInCodeBlock
      if (!isInCodeBlock) {
        const linesFromConfig = parsedConfig.get(Comment({ content: currentHeading.content }))
        changedMarkdown = changedMarkdown.concat(linesFromConfig)
      }
      if (isInCodeBlock) {
        changedMarkdown = changedMarkdown.push(line)
      }
    }
    if (!isInCodeBlock) {
      changedMarkdown = changedMarkdown.push(line)
    }
  })
  return changedMarkdown
}

const formatParsedMarkdown = (parsedMarkdown) => {
  return parsedMarkdown.reduce((acc, line) => {
    if (isHeading(line)) {
      let prefix = ''
      for (let i = 0; i < line.level; i++) {
        prefix = prefix + '#'
      }
      return `${acc}${prefix} ${line.content}${EOL}`
    }
    return `${acc}${line.content}${EOL}`
  }, '')
}

const updateMarkdown = (markdownLines, configLines) => {
  const parsedConfig = parseConfig(configLines)
  const parsedMarkdown = parseMarkdown(markdownLines)
  const newParsedMarkdown = updateMarkdownWithConfig(parsedMarkdown, parsedConfig)
  return formatParsedMarkdown(newParsedMarkdown)
}

module.exports = updateMarkdown

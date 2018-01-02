const { EOL } = require('os')

const parseMarkdown = require('../../lib/core/parseMarkdown').parseMarkdown

const buildMarkdownLines = (markdownContent) => markdownContent.split(EOL)

const isType = (line, type) => line && line.toString().startsWith(`${type} `)
const isHeading = (line) => isType(line, 'Heading')
const isLineOfCode = (line) => isType(line, 'LineOfCode')
const spacesAtStartOfLineRegex = /^(\s*)/
const commentSymbol = '//'
const formatLine = (line, followingLine) => {
  if (isHeading(line)) {
    const spacesAtStartOfLineMatch = followingLine.content.match(spacesAtStartOfLineRegex)
    const spacesAtStartOfLine = spacesAtStartOfLineMatch[0]
    return `${spacesAtStartOfLine}${commentSymbol} ${line.content}`
  }
  return line.content
}

const formatConfigLines = (configLines) => {
  const listOfStrings = []
  configLines.forEach((line, index) => {
    listOfStrings.push(formatLine(line, configLines.get(index + 1)))
  })
  return `${listOfStrings.join(EOL)}${EOL}`
}

const buildConfigLines = (parsedMarkdown) => {
  const headingsAndCode = parsedMarkdown.filter((item) => isHeading(item) || isLineOfCode(item))
  const toInclude = headingsAndCode.filter((item, index) => {
    const nextItem = headingsAndCode.get(index + 1)
    const twoHeadingsInARow = isHeading(item) && isHeading(nextItem)
    if (twoHeadingsInARow) {
      return false
    }
    return true
  })
  return formatConfigLines(toInclude)
}

const extractConfig = (markdownContent) => {
  const markdownLines = buildMarkdownLines(markdownContent)
  const parsedMarkdown = parseMarkdown(markdownLines)
  return buildConfigLines(parsedMarkdown)
}

module.exports = extractConfig

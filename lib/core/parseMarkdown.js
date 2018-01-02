const Record = require('immutable').Record
const List = require('immutable').List

const Heading = Record({
  content: null,
  level: null
}, 'Heading')

const LineOfText = Record({
  content: ''
}, 'LineOfText')

const LineOfCode = Record({
  content: ''
}, 'LineOfCode')

const CodeBlockBegin = Record({ content: '' }, 'CodeBlockBegin')

const CodeBlockEnd = Record({ content: '' }, 'CodeBlockEnd')

const markdownHeadingRegex = /^(#+) (.*)/

const codeBlockSeparatorRegex = /```/

const handleHeading = (list, markdownHeadingRegexMatch) => {
  const [ , hashes, content ] = markdownHeadingRegexMatch
  return list.push(Heading({
    content,
    level: hashes.length
  }))
}

const buildRecordBasedOnInCodeBlock = (list, line, inCodeBlock, InBlockRecord, OutOfBlockRecord) => {
  if (inCodeBlock) {
    return list.push(InBlockRecord({ content: line }))
  }
  return list.push(OutOfBlockRecord({ content: line }))
}

const handleSimpleLine = (list, line, inCodeBlock) => buildRecordBasedOnInCodeBlock(list, line, inCodeBlock, LineOfCode, LineOfText)

const handleCodeBlockSeparator = (list, line, inCodeBlock) => buildRecordBasedOnInCodeBlock(list, line, inCodeBlock, CodeBlockBegin, CodeBlockEnd)

const parseMarkdown = (markdownLines) => {
  let inCodeBlock = false

  return markdownLines.reduce((list, line) => {
    const lineIsHeading = line.match(markdownHeadingRegex)
    if (lineIsHeading) {
      return handleHeading(list, lineIsHeading)
    }
    const lineIsCodeBlockSeparator = line.match(codeBlockSeparatorRegex)
    if (lineIsCodeBlockSeparator) {
      inCodeBlock = !inCodeBlock
      return handleCodeBlockSeparator(list, line, inCodeBlock)
    }
    return handleSimpleLine(list, line, inCodeBlock)
  }, List())
}

module.exports.parseMarkdown = parseMarkdown

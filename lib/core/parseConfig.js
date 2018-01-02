const Record = require('immutable').Record

const OrderedMap = require('immutable').OrderedMap

const List = require('immutable').List

const Comment = Record({
  content: null
}, 'Comment')

const LineOfConfig = Record({
  content: ''
}, 'LineOfConfig')

const commentRegex = /^ *\/\/ +(.*)/

const parseConfig = (configLines) => {
  let currentComment = null
  return configLines.reduce((acc, line) => {
    const commentMatch = line.match(commentRegex)
    if (commentMatch) {
      const commentContent = commentMatch[1]
      currentComment = Comment({ content: commentContent })
      return acc.set(currentComment, List())
    }

    const currentLine = LineOfConfig({ content: line })
    const linesForComment = acc.get(currentComment)
    return acc.set(currentComment, linesForComment.push(currentLine))
  }, OrderedMap())
}

module.exports.parseConfig = parseConfig
module.exports.Comment = Comment

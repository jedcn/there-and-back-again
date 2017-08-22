'use es6'

const readFiles = require('../../lib/util/readFiles').readFiles
const markdownDoc = require('../../lib/markdownDoc').markdownDoc

describe('markdownDoc', function () {
  describe('getLines', () => {
    it('iterates through the lines of a file', function (done) {
      readFiles('./test/files/lib/markdownDoc', [
        'simple.md'
      ]).then(function (results) {
        const [ markdownString ] = results
        const lines = markdownDoc(markdownString).getLines()
        expect(lines.size).toEqual(13)
        expect(lines.get(0)).toEqual('# Simple')
        expect(lines.get(9)).toEqual('really code?')
        done()
      })
    })
  })
  describe('getCodeBlocks', () => {
    it('should know how many code blocks are in the file', function (done) {
      readFiles('./test/files/lib/markdownDoc', [
        'simple.md'
      ]).then(function (results) {
        const [ markdownString ] = results
        const codeBlocks = markdownDoc(markdownString).getCodeBlocks()
        expect(codeBlocks.size).toEqual(1)
        done()
      })
    })
    it('can ask a codeblock what it contains', function (done) {
      readFiles('./test/files/lib/markdownDoc', [
        'simple.md'
      ]).then(function (results) {
        const [ markdownString ] = results
        const codeBlocks = markdownDoc(markdownString).getCodeBlocks()
        const codeBlockLines = codeBlocks.get(0).getLines()
        expect(codeBlockLines.get(0)).toEqual('Is')
        expect(codeBlockLines.get(1)).toEqual('this')
        expect(codeBlockLines.get(2)).toEqual('really code?')
        done()
      })
    })
  })
})

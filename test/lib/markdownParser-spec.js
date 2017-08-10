'use es6'

const readFiles = require('../../lib/util/readFiles').readFiles
const markdownParser = require('../../lib/markdownParser').markdownParser

describe('markdownParser', function () {
  describe('getCode', () => {
    describe('when code blocks are indicated with triple-ticks', () => {
      it('should find a single code block', function (done) {
        readFiles('./test/files/lib/markdownParser', [
          'triple-ticks/single-code-block.md'
        ]).then(function (results) {
          const [ markdownString ] = results
          const result = markdownParser(markdownString).getCode()
          expect(result).toEqual('This is a code block\n')
          done()
        })
      })
      fit('should merge multiple code blocks', function (done) {
        readFiles('./test/files/lib/markdownParser', [
          'triple-ticks/multiple-code-blocks.md',
          'multiple-code-blocks'
        ]).then(function (results) {
          const [ markdownString, embeddedCode ] = results
          const result = markdownParser(markdownString).getCode()
          expect(result).toEqual(embeddedCode)
          done()
        })
      })
      it('should merge multiple code blocks surrounded by headings', function (done) {
        readFiles('./test/files/lib/markdownParser', [
          'triple-ticks/multiple-code-blocks-and-headings.md',
          'multiple-code-blocks'
        ]).then(function (results) {
          const [ markdownString, embeddedCode ] = results
          const result = markdownParser(markdownString).getCode()
          expect(result).toEqual(embeddedCode)
          done()
        })
      })
    })
    describe('when code blocks are indicated with four spaces', () => {
      it('should parse out a single code block', function (done) {
        readFiles('./test/files/lib/markdownParser', [
          'four-spaces/single-code-block.md'
        ]).then(function (results) {
          const [ markdownString ] = results
          const result = markdownParser(markdownString).getCode()
          expect(result).toEqual('This is a code block\n')
          done()
        })
      })
      it('should merge multiple code blocks surrounded by stuff', function (done) {
        readFiles('./test/files/lib/markdownParser', [
          'four-spaces/multiple-code-blocks-with-stuff.md',
          'multiple-code-blocks'
        ]).then(function (results) {
          const [ markdownString, embeddedCode ] = results
          const result = markdownParser(markdownString).getCode()
          expect(result).toEqual(embeddedCode)
          done()
        })
      })
      it('should merge multiple code blocks surrounded by headings', function (done) {
        readFiles('./test/files/lib/markdownParser', [
          'four-spaces/multiple-code-blocks-and-headings.md',
          'multiple-code-blocks'
        ]).then(function (results) {
          const [ markdownString, embeddedCode ] = results
          const result = markdownParser(markdownString).getCode()
          expect(result).toEqual(embeddedCode)
          done()
        })
      })
    })
    describe('when code blocks start with whitespace because of indentation', () => {
      it('should respect the indentation', function (done) {
        readFiles('./test/files/lib/markdownParser/indentation', [
          'config.json.md',
          'config.json'
        ]).then(function (results) {
          const [ markdownString, embeddedCode ] = results
          const result = markdownParser(markdownString).getCode()
          expect(result).toEqual(embeddedCode)
          done()
        })
      })
    })
  })
})

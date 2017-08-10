'use es6'

const readFiles = require('../../lib/util/readFiles').readFiles
const extractConfigFromMarkdown = require('../../lib/extractConfigFromMarkdown').extractConfigFromMarkdown

describe('extractConfigFromMarkdown', function () {
  it('can extract a single code block in a markdown file', function (done) {
    readFiles('./test/files/lib/extractConfig', [
      'init-1.vim',
      'init-1.vim.md'
    ]).then(function (results) {
      const [ configFile, markdown ] = results
      const result = extractConfigFromMarkdown(markdown)
      expect(result).toEqual(configFile)
      done()
    })
  })

  it('can extract multiple code blocks in a markdown file', function (done) {
    readFiles('./test/files/lib/extractConfig', [
      'init-2.vim',
      'init-2.vim.md'
    ]).then(function (results) {
      const [ configFile, markdown ] = results
      const result = extractConfigFromMarkdown(markdown)
      expect(result).toEqual(configFile)
      done()
    })
  })

  it('can extract code blocks that have blank lines in them', function (done) {
    readFiles('./test/files/lib/extractConfig', [
      'init-3.vim',
      'init-3.vim.md'
    ]).then(function (results) {
      const [ configFile, markdown ] = results
      const result = extractConfigFromMarkdown(markdown)
      expect(result).toEqual(configFile)
      done()
    })
  })
})

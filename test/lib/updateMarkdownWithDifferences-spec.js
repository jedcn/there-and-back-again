'use es6'

const readFiles = require('../../lib/util/readFiles').readFiles
const updateMarkdownWithDifferences = require('../../lib/updateMarkdownWithDifferences').updateMarkdownWithDifferences
const extractConfigFromMarkdown = require('../../lib/extractConfigFromMarkdown').extractConfigFromMarkdown
const compareConfigs = require('../../lib/compareConfigs').compareConfigs

describe('updateMarkdownWithDifferences', function () {
  it('can detect when a line has been added', function (done) {
    readFiles('./test/files/lib/updateMarkdownWithDifferences', [
      '.zshrc-1.md',
      '.zshrc-1-added-line',
      '.zshrc-1-added-line.md'
    ]).then(function (results) {
      const [ oldMarkdown, newConfig, newMarkdown ] = results
      const oldConfig = extractConfigFromMarkdown(oldMarkdown)
      const patches = compareConfigs(oldConfig, newConfig)
      const result = updateMarkdownWithDifferences(oldMarkdown, patches)
      expect(result).toEqual(newMarkdown)
      done()
    })
  })
  it('can detect when a line has been deleted', function (done) {
    readFiles('./test/files/lib/updateMarkdownWithDifferences', [
      '.zshrc-1.md',
      '.zshrc-1-deleted-line',
      '.zshrc-1-deleted-line.md'
    ]).then(function (results) {
      const [ oldMarkdown, newConfig, newMarkdown ] = results
      const oldConfig = extractConfigFromMarkdown(oldMarkdown)
      const patches = compareConfigs(oldConfig, newConfig)
      const result = updateMarkdownWithDifferences(oldMarkdown, patches)
      expect(result).toEqual(newMarkdown)
      done()
    })
  })
  it('can detect when a line has been changed', function (done) {
    readFiles('./test/files/lib/updateMarkdownWithDifferences', [
      '.zshrc-1.md',
      '.zshrc-1-changed-line',
      '.zshrc-1-changed-line.md'
    ]).then(function (results) {
      const [ oldMarkdown, newConfig, newMarkdown ] = results
      const oldConfig = extractConfigFromMarkdown(oldMarkdown)
      const patches = compareConfigs(oldConfig, newConfig)
      const result = updateMarkdownWithDifferences(oldMarkdown, patches)
      expect(result).toEqual(newMarkdown)
      done()
    })
  })
})

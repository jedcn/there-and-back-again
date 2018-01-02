const readFiles = require('../../../lib/util/readFiles')
const initMarkdown = require('../../../lib/create-markdown-from-config/initMarkdown')

describe('initMarkdown', function () {
  it('creates a markdown file with a single code block', function (done) {
    readFiles('./test/files/lib/initMarkdown', [
      'basic-config.file',
      'basic-config.file.md'
    ]).then(function (results) {
      const [ configFile, markdown ] = results
      const result = initMarkdown('basic-config.file', configFile)
      expect(result).toEqual(markdown)
      done()
    })
  })
})

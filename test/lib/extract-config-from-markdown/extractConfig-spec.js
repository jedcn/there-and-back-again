const readFiles = require('../../../lib/util/readFiles')
const extractConfig = require('../../../lib/extract-config-from-markdown/extractConfig')

describe('extractConfig', function () {
  it('parses through markdown for headings and code block content', (done) => {
    readFiles('./test/files/lib/extract-config-from-markdown/extractConfig',
      ['basicMarkdown.md', 'basicMarkdownConfig.json'])
      .then((readFilesResult) => {
        const [markdownContent, configContent] = readFilesResult
        const result = extractConfig(markdownContent)
        expect(result).toBe(configContent)
        done()
      })
  })
})

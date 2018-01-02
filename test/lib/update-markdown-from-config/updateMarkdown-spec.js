const splitFileIntoListOfLines = require('../../../lib/util/splitFileIntoListOfLines')
const readFile = require('../../../lib/util/readFile')

const updateMarkdown = require('../../../lib/update-markdown-from-config/updateMarkdown')

describe('updateMarkdown', function () {
  it('parses through initial markdown and config, and then produces new markdown', (done) => {
    const base = './test/files/lib/update-markdown-from-config/updateMarkdown'
    Promise.all([
      splitFileIntoListOfLines(`${base}/beforeMarkdown.md`),
      readFile(`${base}/afterMarkdown.md`),
      splitFileIntoListOfLines(`${base}/configWithChangesFromBeforeMarkdown.json`)
    ])
      .then(([beforeMarkdownLines, afterMarkdownString, configWithChanges]) => {
        const result = updateMarkdown(beforeMarkdownLines, configWithChanges)
        expect(result).toBe(afterMarkdownString)
        done()
      })
  })
})

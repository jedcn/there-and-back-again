'use es6'

const initMarkdown = require('../../lib/initMarkdown').initMarkdown

describe('initMarkdown', function () {
  it('creates a markdown file with a single code block', function () {
    const content = 'Hello World!'
    const contentInMarkdown = `# config.file

\`\`\`
Hello World!
\`\`\`
`
    const result = initMarkdown('config.file', content)
    expect(result).toEqual(contentInMarkdown)
  })
})

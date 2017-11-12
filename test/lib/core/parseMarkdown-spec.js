const readFile = require('../../../lib/util/readFile')
const parseMarkdown = require('../../../lib/core/parseMarkdown').parseMarkdown
const { EOL } = require('os')

const filterResultsByRecordType = (result, name) => {
  return result.filter((item) => item.toString().startsWith(`${name} `))
}

describe('parseMarkdown', function () {
  it('converts lines of markdown into immutable Records', (done) => {
    const basicMarkdown = './test/files/lib/core/parseMarkdown/basicMarkdown.md'
    readFile(basicMarkdown)
      .then((markdownContent) => {
        const result = parseMarkdown(markdownContent.split(EOL))
        expect(result.size).toBe(18)
        expect(filterResultsByRecordType(result, 'Heading').size).toBe(3)
        expect(filterResultsByRecordType(result, 'CodeBlockBegin').size).toBe(3)
        expect(filterResultsByRecordType(result, 'CodeBlockEnd').size).toBe(3)
        expect(filterResultsByRecordType(result, 'LineOfCode').size).toBe(3)
        done()
      })
  })

  it('can determine what is in the headings', (done) => {
    const basicMarkdown = './test/files/lib/core/parseMarkdown/basicMarkdown.md'
    readFile(basicMarkdown)
      .then((markdownContent) => {
        const result = parseMarkdown(markdownContent.split(EOL))
        const headings = filterResultsByRecordType(result, 'Heading')
        expect(headings.get(0).content).toBe('First Comment')
        expect(headings.get(1).content).toBe('Second Comment')
        expect(headings.get(2).content).toBe('Third Comment')
        done()
      })
  })

  it('captures the code block separators', (done) => {
    const basicMarkdown = './test/files/lib/core/parseMarkdown/basicMarkdown.md'
    readFile(basicMarkdown)
      .then((markdownContent) => {
        const result = parseMarkdown(markdownContent.split(EOL))
        const codeBlockBegins = filterResultsByRecordType(result, 'CodeBlockBegin')
        expect(codeBlockBegins.get(0).content).toBe('```')
        expect(codeBlockBegins.get(1).content).toBe('```codeType')
        done()
      })
  })

  it('can determine what is in the lines of code', (done) => {
    const basicMarkdown = './test/files/lib/core/parseMarkdown/basicMarkdown.md'
    readFile(basicMarkdown)
      .then((markdownContent) => {
        const result = parseMarkdown(markdownContent.split(EOL))
        const lineOfCodes = filterResultsByRecordType(result, 'LineOfCode')
        expect(lineOfCodes.get(0).content).toBe('{')
        expect(lineOfCodes.get(1).content).toBe('    "some.key": "some.value"')
        expect(lineOfCodes.get(2).content).toBe('}')
        done()
      })
  })
})

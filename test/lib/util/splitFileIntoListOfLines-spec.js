const splitFileIntoListOfLines = require('../../../lib/util/splitFileIntoListOfLines')

describe('splitFileIntoListOfLines', () => {
  it('includes all of the lines in the file', (done) => {
    const fileWithNewline = 'test/files/lib/util/splitFileIntoListOfLines/fileWithNewLine'
    const result = splitFileIntoListOfLines(fileWithNewline)
    result.then((lines) => {
      expect(lines.size).toBe(3)
      done()
    })
  })
  it('if the file ends in a newline it does not include that line', (done) => {
    const fileWithoutNewline = 'test/files/lib/util/splitFileIntoListOfLines/fileWithoutNewLine'
    const result = splitFileIntoListOfLines(fileWithoutNewline)
    result.then((lines) => {
      expect(lines.size).toBe(3)
      done()
    })
  })
})

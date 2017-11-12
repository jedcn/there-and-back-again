const splitFileIntoListOfLines = require('../../../lib/util/splitFileIntoListOfLines')
const parseConfig = require('../../../lib/core/parseConfig').parseConfig
const Comment = require('../../../lib/core/parseConfig').Comment

describe('parseConfig', function () {
  it('converts a JSON config file w/ comments into immutable Records', (done) => {
    const basicConfig = './test/files/lib/core/parseConfig/basicConfig.json'
    splitFileIntoListOfLines(basicConfig)
      .then((configLines) => {
        const result = parseConfig(configLines)
        expect(result.size).toBe(3)

        const secondComment = Comment({ content: 'Second Comment' })
        const secondCommentLines = result.get(secondComment)
        expect(secondCommentLines.size).toBe(1)
        expect(secondCommentLines.get(0).content).toBe('    "some.key": "some.value"')
        done()
      })
  })
})

const processArgs = require('../../../lib/create-markdown-from-config/processArgs')

describe('processArgs', () => {
  it('is ok if --config-file is present', (done) => {
    const processArgv = [ '/path/to/bin',
      '/path/of/node/script',
      '--config-file',
      'config.json' ]
    processArgs(processArgv).then((result) => {
      expect(result.configFile).toBe('config.json')
      done()
    })
  })
  it('it is not ok if --config-file is not present', (done) => {
    const processArgv = [ '/path/to/bin',
      '/path/of/node/script',
      '--markdown-file',
      'config.json.md'
    ]
    processArgs(processArgv).catch((err) => {
      const usageIndex = err.indexOf('create-markdown-from-config --config-file <CONFIG_FILE>')
      expect(usageIndex !== -1).toBe(true)
      done()
    })
  })
})

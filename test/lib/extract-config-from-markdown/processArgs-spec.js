const processArgs = require('../../../lib/extract-config-from-markdown/processArgs')

describe('processArgs', () => {
  it('is ok if --config-file and --markdown-file are present', (done) => {
    const processArgv = [ '/path/to/bin',
      '/path/of/node/script',
      '--markdown-file',
      'config.json.md',
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
      const usageIndex = err.indexOf('extract-config-from-markdown --config-file <CONFIG_FILE> --markdown-file <MARKDOWN_FILE>')
      expect(usageIndex !== -1).toBe(true)
      done()
    })
  })
  it('it is not ok if --markdown-file is not present', (done) => {
    const processArgv = [ '/path/to/bin',
      '/path/of/node/script',
      '--config-file',
      'config.json'
    ]
    processArgs(processArgv).catch((err) => {
      const usageIndex = err.indexOf('extract-config-from-markdown --config-file <CONFIG_FILE> --markdown-file <MARKDOWN_FILE>')
      expect(usageIndex !== -1).toBe(true)
      done()
    })
  })
})

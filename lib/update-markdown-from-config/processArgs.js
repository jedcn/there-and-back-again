const { EOL } = require('os')

module.exports = (processArgv) => {
  const argv = require('minimist')(processArgv.slice(2))
  const configFile = argv['config-file']
  const markdownFile = argv['markdown-file']
  if (configFile && markdownFile) {
    return Promise.resolve({ configFile, markdownFile })
  }
  const params = [
    '--config-file', '<CONFIG_FILE>',
    '--markdown-file', '<MARKDOWN_FILE>'
  ]
  const errorMsg = `
  Usage:

    update-markdown-from-config ${params.join(' ')}${EOL}`
  return Promise.reject(errorMsg)
}

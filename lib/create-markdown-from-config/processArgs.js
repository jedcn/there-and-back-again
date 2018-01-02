const { EOL } = require('os')

module.exports = (processArgv) => {
  const argv = require('minimist')(processArgv.slice(2))
  const configFile = argv['config-file']
  if (configFile) {
    return Promise.resolve({ configFile })
  }
  const params = [
    '--config-file', '<CONFIG_FILE>'
  ]
  const errorMsg = `
  Usage:

    create-markdown-from-config ${params.join(' ')}${EOL}`
  return Promise.reject(errorMsg)
}

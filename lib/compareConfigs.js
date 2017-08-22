'use es6'

const DiffMatchPatch = require('diff-match-patch')

function compareConfigs (oldConfig, newConfig) {
  const dmp = new DiffMatchPatch()
  const differences = dmp.diff_main(oldConfig, newConfig)
  const result = dmp.patch_make(differences)
  return result
}

exports.compareConfigs = compareConfigs

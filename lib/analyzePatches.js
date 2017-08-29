'use es6'

const patch = require('./util/patch').patch

function analyzePatches ({ patches, report }) {
  if (patches.length === 0) {
    report.info('Nothing to do. No differences between markdown and config.')
  } else {
    let message = `There are ${patches.length} patches to apply.`
    if (patches.length === 1) {
      message = 'There is 1 patch to apply.'
    }
    report.info(message)
    for (let i = 0; i < patches.length; i++) {
      const appliedPatch = patch(patches[i])
      report.info(`Patch ${i + 1}:\n${appliedPatch.asText()}`)
    }
  }
}

exports.analyzePatches = analyzePatches

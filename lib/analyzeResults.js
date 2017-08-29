'use es6'

function analyzeResults ({ patches, patchResults, report }) {
  const patchResultIsFalse = function (patchResult) { return !patchResult }
  if (patchResults.some(patchResultIsFalse)) {
    report.problem('Ut oh! Something went wrong')
  } else {
    report.success('Yahoo! All patches applied!')
  }
}

exports.analyzeResults = analyzeResults

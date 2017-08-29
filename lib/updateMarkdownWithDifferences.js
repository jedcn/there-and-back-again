'use es6'

const DiffMatchPatch = require('diff-match-patch')

function updateMarkdownWithDifferences (oldMarkdown, patches) {
  const dmp = new DiffMatchPatch()
  dmp.Match_Threshold = dmp.Patch_DeleteThreshold = 1
  const result = dmp.patch_apply(patches, oldMarkdown)
  const newMarkdown = result[0]
  const patchResults = result[1]
  return {
    newMarkdown,
    patchResults
  }
}

exports.updateMarkdownWithDifferences = updateMarkdownWithDifferences

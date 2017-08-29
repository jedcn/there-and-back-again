'use es6'

const DiffMatchPatch = require('diff-match-patch')

function patch (diffMatchPatchData) {
  const data = diffMatchPatchData

  return {
    getStart1: function () {
      return data.start1
    },

    getStart2: function () {
      return data.start2
    },

    getLength1: function () {
      return data.length1
    },

    getLength2: function () {
      return data.length2
    },

    getDiffs: function () {
      return data.diffs
    },

    asText: function () {
      const dmp = new DiffMatchPatch()
      return decodeURI(dmp.patch_toText([ data ]))
    }
  }
}

exports.patch = patch

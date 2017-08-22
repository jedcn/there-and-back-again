'use es6'

const List = require('immutable').List
const EOL = require('os').EOL

function buildListOfStrings (basis) {
  if (List.isList(basis)) {
    return basis
  }
  return List(basis.split(EOL))
}

function listOfStrings (input) {
  const list = buildListOfStrings(input)
  return {
    getLines: function () {
      return list
    },
    addLine: function (index, value) {
      return listOfStrings(list.insert(index, value))
    },
    updateLine: function (index, newValue) {
      return listOfStrings(list.update(index, function (oldValue) {
        return newValue
      }))
    },
    removeLine: function (index) {
      return listOfStrings(list.remove(index))
    }
  }
}

exports.listOfStrings = listOfStrings

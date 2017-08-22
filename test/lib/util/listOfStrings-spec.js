'use es6'

const listOfStrings = require('../../../lib/util/listOfStrings').listOfStrings
const EOL = require('os').EOL
const List = require('immutable').List

describe('listOfStrings', function () {
  let example
  beforeEach(function () {
    example = listOfStrings(['Line One', 'Line Two'].join(EOL))
  })
  it('can be built from a String with newlines', function () {
    const getLines = example.getLines()
    expect(getLines.get(0)).toEqual('Line One')
    expect(getLines.get(1)).toEqual('Line Two')
  })
  it('can be built from a List of Strings', function () {
    const literalListOfStrings = List(['Line One', 'Line Two'])
    const getLines = listOfStrings(literalListOfStrings).getLines()
    expect(getLines.get(0)).toEqual('Line One')
    expect(getLines.get(1)).toEqual('Line Two')
  })
  describe('#addLine', () => {
    it('produces a new listOfStrings with the added line', function () {
      const newLos = example.addLine(0, 'Line Zero')
      const getLines = newLos.getLines()
      expect(getLines.get(0)).toEqual('Line Zero')
      expect(getLines.get(1)).toEqual('Line One')
      expect(getLines.get(2)).toEqual('Line Two')
    })
    it('does not change the original listOfStrings', function () {
      example.addLine(0, 'Line Zero')
      expect(example.getLines().get(0)).toEqual('Line One')
    })
  })
  describe('#updateLine', () => {
    it('produces a new listOfStrings with the update', function () {
      const newLos = example.updateLine(0, 'New Line One')
      expect(newLos.getLines().get(0)).toEqual('New Line One')
    })
    it('does not change the original listOfStrings', function () {
      example.updateLine(0, 'New Line One')
      expect(example.getLines().get(0)).toEqual('Line One')
    })
  })
  describe('#removeLine', () => {
    it('produces a new listOfStrings with the line removed', function () {
      const newLos = example.removeLine(0)
      expect(newLos.getLines().get(0)).toEqual('Line Two')
      expect(newLos.getLines().size).toEqual(1)
    })
    it('does not change the original listOfStrings', function () {
      example.removeLine(0)
      expect(example.getLines().get(0)).toEqual('Line One')
      expect(example.getLines().size).toEqual(2)
    })
  })
})

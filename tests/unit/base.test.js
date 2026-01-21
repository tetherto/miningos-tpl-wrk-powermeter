'use strict'

const { test } = require('brittle')
const BasePowerMeter = require('../../workers/lib/base')

test('calculateTension should return correct average for typical 3-phase voltages', async (t) => {
  const powerMeter = new BasePowerMeter({})

  const l1L2 = 400
  const l2L3 = 405
  const l3L1 = 395

  const result = powerMeter.calculateTension(l1L2, l2L3, l3L1)
  const expected = (400 + 405 + 395) / 3

  t.is(result, expected, 'should calculate average tension correctly')
  t.is(result, 400, 'average should be 400V')
})

test('calculateTension should return same value when all phase voltages are equal', async (t) => {
  const powerMeter = new BasePowerMeter({})

  const voltage = 380
  const result = powerMeter.calculateTension(voltage, voltage, voltage)

  t.is(result, voltage, 'should return the same voltage when all phases are equal')
  t.is(result, 380, 'average should be 380V')
})

test('BasePowerMeter constructor should initialize cache and cacheTime', async (t) => {
  const powerMeter = new BasePowerMeter({})

  t.is(powerMeter.cache, null, 'cache should be initialized to null')
  t.is(powerMeter.cacheTime, 0, 'cacheTime should be initialized to 0')
})

test('getRealtimeData should call _prepSnap with true parameter', async (t) => {
  const powerMeter = new BasePowerMeter({})
  const mockData = { voltage: 400, current: 10 }

  powerMeter._prepSnap = async (useCache) => {
    t.is(useCache, true, '_prepSnap should be called with true')
    return mockData
  }

  const result = await powerMeter.getRealtimeData()

  t.ok(result, 'getRealtimeData should return data')
  t.is(result, mockData, 'getRealtimeData should return data from _prepSnap')
})

test('calculateTension should handle zero values', async (t) => {
  const powerMeter = new BasePowerMeter({})

  const result = powerMeter.calculateTension(0, 0, 0)

  t.is(result, 0, 'should return 0 when all voltages are 0')
})

test('calculateTension should handle negative values', async (t) => {
  const powerMeter = new BasePowerMeter({})

  const result = powerMeter.calculateTension(-100, -200, -300)
  const expected = (-100 + -200 + -300) / 3

  t.is(result, expected, 'should calculate average correctly for negative values')
  t.is(result, -200, 'average should be -200V')
})

'use strict'

const { test } = require('brittle')
const WrkPowerMeterRack = require('../../workers/rack.powermeter.wrk')

test('WrkPowerMeterRack getThingType should return powermeter', async (t) => {
  const rack = Object.create(WrkPowerMeterRack.prototype)
  const result = rack.getThingType()
  t.is(result, 'powermeter', 'getThingType should return powermeter')
})

test('WrkPowerMeterRack _getThingBaseType should return powermeter', async (t) => {
  const rack = Object.create(WrkPowerMeterRack.prototype)
  const result = rack._getThingBaseType()
  t.is(result, 'powermeter', '_getThingBaseType should return powermeter')
})

test('WrkPowerMeterRack getSpecTags should return powermeter tag', async (t) => {
  const rack = Object.create(WrkPowerMeterRack.prototype)
  const result = rack.getSpecTags()
  t.ok(Array.isArray(result), 'getSpecTags should return an array')
  t.is(result.length, 1, 'getSpecTags should return one tag')
  t.is(result[0], 'powermeter', 'getSpecTags should return powermeter tag')
  t.ok(result.includes('powermeter'), 'getSpecTags should include powermeter')
})

test('WrkPowerMeterRack init should set scheduleAddlStatTfs', async (t) => {
  const rack = Object.create(WrkPowerMeterRack.prototype)
  WrkPowerMeterRack.prototype.init = function () {
    this.scheduleAddlStatTfs = [
      ['rtd', '*/5 * * * * *']
    ]
  }

  rack.init()

  t.ok(Array.isArray(rack.scheduleAddlStatTfs), 'scheduleAddlStatTfs should be an array')
  t.is(rack.scheduleAddlStatTfs.length, 1, 'scheduleAddlStatTfs should have one entry')
  t.is(rack.scheduleAddlStatTfs[0][0], 'rtd', 'first entry should be rtd')
  t.is(rack.scheduleAddlStatTfs[0][1], '*/5 * * * * *', 'second entry should be cron expression')
})

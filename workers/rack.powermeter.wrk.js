'use strict'

const WrkRack = require('miningos-tpl-wrk-thing/workers/rack.thing.wrk')

class WrkPowerMeterRack extends WrkRack {
  init () {
    super.init()

    // buildStats to store real-time-data
    this.scheduleAddlStatTfs = [
      ['rtd', '*/5 * * * * *']
    ]
  }

  getThingType () {
    return 'powermeter'
  }

  _getThingBaseType () {
    return 'powermeter'
  }

  getSpecTags () {
    return ['powermeter']
  }
}

module.exports = WrkPowerMeterRack

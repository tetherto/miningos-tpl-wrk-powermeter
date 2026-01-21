'use strict'

const BaseThing = require('miningos-tpl-wrk-thing/workers/lib/base')

class BasePowerMeter extends BaseThing {
  constructor (opts) {
    super('powermeter', opts)

    this.cache = null
    this.cacheTime = 0
  }

  async getRealtimeData () {
    // snap is read at short intervals, return data from cache
    return await this._prepSnap(true)
  }

  /**
   * Calculate the average tension (voltage) from three phase-to-phase measurements
   * @param {number} l1L2 - Voltage between L1 and L2
   * @param {number} l2L3 - Voltage between L2 and L3
   * @param {number} l3L1 - Voltage between L3 and L1
   * @returns {number} Average tension across all three phases
   */
  calculateTension (l1L2, l2L3, l3L1) {
    return (l1L2 + l2L3 + l3L1) / 3
  }
}

module.exports = BasePowerMeter

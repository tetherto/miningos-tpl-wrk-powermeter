'use strict'

const path = require('path')
const { getSchema } = require(path.join(process.cwd(), 'tests/utils'))
const { getSnapExecutor } = require('../executors')
const defaults = getSchema()

module.exports = () => ({
  getSnap: {
    stages: [
      {
        name: 'getSnap',
        executor: getSnapExecutor,
        validate: {
          type: 'schema',
          schema: {
            success: { type: 'boolean' },
            stats: defaults.stats_validate.schema.stats
          }
        }
      }
    ]
  }
})

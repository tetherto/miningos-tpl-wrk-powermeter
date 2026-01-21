'use strict'

module.exports = () => ({
  stats_validate: {
    type: 'schema',
    schema: {
      success: { type: 'boolean' },
      stats: {
        type: 'object',
        children: {}
      }
    }
  }
})

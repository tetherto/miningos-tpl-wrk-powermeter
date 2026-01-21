'use strict'

async function getSnapExecutor ({ dev }) {
  return await dev.getSnap()
}

module.exports = {
  getSnapExecutor
}

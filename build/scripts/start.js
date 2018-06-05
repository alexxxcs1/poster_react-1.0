const logger = require('../lib/logger')
const ip = require('ip')

logger.info('Starting server...')
require('../../server/main').listen(8089, () => {
  logger.success('Server is running at http://' + ip.address() + ':8089')
})

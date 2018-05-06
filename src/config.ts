export let VERSION = '0.0.0'

try {
  VERSION = require('../package.json').version
} catch (e) {
  VERSION = require('../../package.json').version
}

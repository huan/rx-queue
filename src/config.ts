export let VERSION = '0.0.0'

try {
  VERSION = require('../package.json').version
} catch (e) {
  try {
    VERSION = require('../../package.json').version
  } catch (e) {
    // Issue #25
  }
}

const { RxQueue } = require('rx-queue')

const queue = new RxQueue()
console.log(`RxQueue v${queue.version()}`)

console.log('Smoke Testing PASSED!')

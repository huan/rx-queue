const { RxQueue } = require('rx-queue')

const queue = new RxQueue()
queue.destroy()

console.log('Smoke Testing PASSED!')

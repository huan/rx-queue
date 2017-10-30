const {
  RxQueue,
  DelayQueue,
} = require('rx-queue')

const rq = new RxQueue()
console.log(`RxQueue v${rq.version()}`)

const dq = new DelayQueue()
console.log(`DelayQueue v${dq.version()}`)

console.log('Smoke Testing PASSED!')

const {
  DelayQueue,
  RxQueue,
  ThrottleQueue,
} = require('rx-queue')

const rq = new RxQueue()
console.log(`RxQueue v${rq.version()}`)

const dq = new DelayQueue()
console.log(`DelayQueue v${dq.version()}`)

const tq = new ThrottleQueue()
console.log(`ThrottleQueue v${tq.version()}`)

console.log('Smoke Testing PASSED!')

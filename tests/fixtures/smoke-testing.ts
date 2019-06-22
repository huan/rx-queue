import {
  DelayQueue,
  RxQueue,
  ThrottleQueue,
  VERSION,
}                 from 'rx-queue'

if (VERSION === '0.0.0') {
  throw new Error('version should be set before publishing')
}

const rq = new RxQueue()
console.info(`RxQueue v${rq.version()}`)

const dq = new DelayQueue()
console.info(`DelayQueue v${dq.version()}`)

const tq = new ThrottleQueue()
console.info(`ThrottleQueue v${tq.version()}`)

console.info('Smoke Testing PASSED!')

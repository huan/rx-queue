import {
  RxQueue,
  DelayQueue,
  ThrottleQueue,
  DebounceQueue,
  VERSION,
} from 'rx-queue'

async function main () {
  const q = new RxQueue()
  const dq = new DelayQueue(10)
  const tq = new ThrottleQueue(10)
  const bq = new DebounceQueue(10)

  q.next('test')
  dq.next('test')
  tq.next('test')
  bq.next('test')

  if ((VERSION as string) === '0.0.0') {
    throw new Error('version should be set before publishing')
  }

  console.log(`RxQueue v${VERSION} smoke testing PASSED!`)
  return 0
}

main()
  .then(code => process.exit(code || 0))
  .catch(e => {
    console.error(e)
    process.exit(1)
  })

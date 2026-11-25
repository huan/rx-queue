import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import RxQueue from './rx-queue.ts'

test('RxQueue subscribe & next', (t) => {
  const EXPECTED_ITEM = { test: 'testing123' }
  const spy = t.mock.fn()

  const q = new RxQueue()
  q.subscribe(spy)
  q.next(EXPECTED_ITEM)

  assert.equal(spy.mock.callCount(), 1, 'should receive 1 call')
  assert.deepEqual(spy.mock.calls[0]?.arguments[0], EXPECTED_ITEM, 'should receive EXPECTED_ITEM')
})

test('RxQueue version()', () => {
  const q = new RxQueue()
  assert.ok(/^\d+\.\d+\.\d+$/.test(q.version()), 'get version')
})

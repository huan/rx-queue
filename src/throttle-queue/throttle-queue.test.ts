import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import ThrottleQueue from './throttle-queue.ts'

const EXPECTED_ITEM1 = { test: 'testing123' }
const EXPECTED_ITEM2 = { mol: 42 }
const EXPECTED_ITEM3 = 42
const THROTTLE_PERIOD_TIME = 15

test('ThrottleQueue 1 item', () => {
  const q = new ThrottleQueue(THROTTLE_PERIOD_TIME)
  const results: unknown[] = []
  q.subscribe(item => results.push(item))

  q.next(EXPECTED_ITEM1)
  assert.equal(results.length, 1, 'should call right after first item')
  assert.deepEqual(results[0], EXPECTED_ITEM1)
  q.unsubscribe()
})

test('ThrottleQueue 2 items', async () => {
  const q = new ThrottleQueue(THROTTLE_PERIOD_TIME)
  const results: unknown[] = []
  q.subscribe(item => results.push(item))

  q.next(EXPECTED_ITEM1)
  q.next(EXPECTED_ITEM2)

  assert.equal(results.length, 1, 'should only be called once initially')
  assert.deepEqual(results[0], EXPECTED_ITEM1)

  await new Promise(resolve => setTimeout(resolve, THROTTLE_PERIOD_TIME + 20))
  assert.equal(results.length, 1, 'should drop the second call because of throttle')
  q.unsubscribe()
})

test('ThrottleQueue 3 items', async () => {
  const q = new ThrottleQueue(THROTTLE_PERIOD_TIME)
  const results: unknown[] = []
  q.subscribe(item => results.push(item))

  q.next(EXPECTED_ITEM1)
  q.next(EXPECTED_ITEM2)

  await new Promise(resolve => setTimeout(resolve, THROTTLE_PERIOD_TIME + 20))
  q.next(EXPECTED_ITEM3)

  assert.equal(results.length, 2, 'should receive the third item after throttle window')
  assert.deepEqual(results[1], EXPECTED_ITEM3)
  q.unsubscribe()
})

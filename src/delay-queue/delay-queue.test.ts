import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import DelayQueue from './delay-queue.ts'

const EXPECTED_ITEM1 = { test: 'testing123' }
const EXPECTED_ITEM2 = { mol: 42 }
const EXPECTED_ITEM3 = 42
const DELAY_PERIOD_TIME = 40

test('DelayQueue 1 item', () => {
  const q = new DelayQueue(DELAY_PERIOD_TIME)
  const results: unknown[] = []
  q.subscribe(item => results.push(item))

  q.next(EXPECTED_ITEM1)
  assert.equal(results.length, 1, 'should call right after first item')
  assert.deepEqual(results[0], EXPECTED_ITEM1)
  q.unsubscribe()
})

test('DelayQueue 2 items', async () => {
  const q = new DelayQueue(DELAY_PERIOD_TIME)
  const results: unknown[] = []
  q.subscribe(item => results.push(item))

  q.next(EXPECTED_ITEM1)
  q.next(EXPECTED_ITEM2)

  assert.equal(results.length, 1, 'first item immediate')
  assert.deepEqual(results[0], EXPECTED_ITEM1)

  await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 10))
  assert.equal(results.length, 2, 'second item after delay')
  assert.deepEqual(results[1], EXPECTED_ITEM2)
  q.unsubscribe()
})

test('DelayQueue 3 items', async () => {
  const q = new DelayQueue(DELAY_PERIOD_TIME)
  const results: unknown[] = []
  q.subscribe(item => results.push(item))

  q.next(EXPECTED_ITEM1)
  q.next(EXPECTED_ITEM2)
  q.next(EXPECTED_ITEM3)

  assert.equal(results.length, 1, 'first item immediate')

  await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 10))
  assert.equal(results.length, 2, 'second item after 1x period')
  assert.deepEqual(results[1], EXPECTED_ITEM2)

  await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 10))
  assert.equal(results.length, 3, 'third item after 2x period')
  assert.deepEqual(results[2], EXPECTED_ITEM3)
  q.unsubscribe()
})

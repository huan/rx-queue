import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import DebounceQueue from './debounce-queue.ts'

const EXPECTED_ITEM1 = { test: 'testing123' }
const EXPECTED_ITEM2 = { mol: 42 }
const EXPECTED_ITEM3 = 42
const DELAY_PERIOD_TIME = 10

test('DebounceQueue 1 item', async () => {
  const q = new DebounceQueue(DELAY_PERIOD_TIME)
  const results: unknown[] = []
  q.subscribe(item => results.push(item))

  q.next(EXPECTED_ITEM1)
  assert.equal(results.length, 0, 'should not call right after first item')

  await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 20))
  assert.equal(results.length, 1, 'should be called after DELAY_PERIOD_TIME')
  assert.deepEqual(results[0], EXPECTED_ITEM1)
  q.unsubscribe()
})

test('DebounceQueue 2 items', async () => {
  const q = new DebounceQueue(DELAY_PERIOD_TIME)
  const results: unknown[] = []
  q.subscribe(item => results.push(item))

  q.next(EXPECTED_ITEM1)
  q.next(EXPECTED_ITEM2)

  await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 20))
  assert.equal(results.length, 1, 'should be called once because debounced')
  assert.deepEqual(results[0], EXPECTED_ITEM2)
  q.unsubscribe()
})

test('DebounceQueue 3 items', async () => {
  const q = new DebounceQueue(DELAY_PERIOD_TIME)
  const results: unknown[] = []
  q.subscribe(item => results.push(item))

  q.next(EXPECTED_ITEM1)
  q.next(EXPECTED_ITEM2)

  await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 20))

  q.next(EXPECTED_ITEM3)
  assert.equal(results.length, 1, 'should have 1 item before second debounce period')
  assert.deepEqual(results[0], EXPECTED_ITEM2)

  await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 20))
  assert.equal(results.length, 2, 'should be called twice after second debounce period')
  assert.deepEqual(results[1], EXPECTED_ITEM3)
  q.unsubscribe()
})

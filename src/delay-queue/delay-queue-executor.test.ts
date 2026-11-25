import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import DelayExecutor from './delay-queue-executor.ts'

const DELAY_PERIOD_TIME = 40
const EXPECTED_VAL1 = 1
const EXPECTED_VAL2 = 2
const EXPECTED_VAL3 = 3
const MEANING_OF_LIFE = 42

test('DelayQueueExecutor execute once', (t) => {
  const spy = t.mock.fn()
  const delay = new DelayExecutor(DELAY_PERIOD_TIME)

  delay.execute(() => spy(EXPECTED_VAL1)).catch(() => {})

  assert.equal(spy.mock.callCount(), 1, 'should receive 1 call immediately')
  assert.equal(spy.mock.calls[0]?.arguments[0], EXPECTED_VAL1)
  delay.unsubscribe()
})

test('DelayQueueExecutor execute thrice', async (t) => {
  const spy = t.mock.fn()
  const delay = new DelayExecutor(DELAY_PERIOD_TIME)

  delay.execute(() => spy(EXPECTED_VAL1)).catch(() => {})
  delay.execute(() => spy(EXPECTED_VAL2)).catch(() => {})
  delay.execute(() => spy(EXPECTED_VAL3)).catch(() => {})

  assert.equal(spy.mock.callCount(), 1, 'should call once immediately')
  assert.equal(spy.mock.calls[0]?.arguments[0], EXPECTED_VAL1)

  await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 10))
  assert.equal(spy.mock.callCount(), 2, 'should call twice after DELAY_PERIOD_TIME')
  assert.equal(spy.mock.calls[1]?.arguments[0], EXPECTED_VAL2)

  await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 10))
  assert.equal(spy.mock.callCount(), 3, 'should call thrice after 2 x DELAY_PERIOD_TIME')
  assert.equal(spy.mock.calls[2]?.arguments[0], EXPECTED_VAL3)
  delay.unsubscribe()
})

test('DelayQueueExecutor return Promise', async () => {
  const delay = new DelayExecutor(0)
  const mol = await delay.execute(() => MEANING_OF_LIFE)
  assert.equal(mol, MEANING_OF_LIFE)
  delay.unsubscribe()
})

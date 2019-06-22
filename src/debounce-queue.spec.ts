#!/usr/bin/env ts-node

// tslint:disable:no-shadowed-variable
import test  from 'blue-tape'
import sinon from 'sinon'

import DebounceQueue from './debounce-queue'

const EXPECTED_ITEM1 = { test: 'testing123' }
const EXPECTED_ITEM2 = { mol: 42 }
const EXPECTED_ITEM3 = 42

const DELAY_PERIOD_TIME = 10 // milliseconds

test('DebounceQueue 1 item', async t => {
  const q   = new DebounceQueue(DELAY_PERIOD_TIME)

  const spy = sinon.spy()
  q.subscribe(spy)

  q.next(EXPECTED_ITEM1)
  t.ok(spy.notCalled, 'should not called right after first item')

  await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 3))
  t.ok(spy.calledOnce, 'should be called after the DELAY_PERIOD_TIME')
  t.deepEqual(spy.firstCall.args[0], EXPECTED_ITEM1, 'should get the first item immediately')
})

test('DebounceQueue 2 item', async t => {
  const q = new DebounceQueue(DELAY_PERIOD_TIME)

  const spy = sinon.spy()
  q.subscribe(spy)

  q.next(EXPECTED_ITEM1)
  q.next(EXPECTED_ITEM2)

  await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 3))
  t.ok(spy.calledOnce, 'should be called only once after DELAY_PERIOD_TIME because its debounced')
  t.deepEqual(spy.firstCall.args[0], EXPECTED_ITEM2, 'should get the EXPECTED_ITEM2')
})

test('DebounceQueue 3 items', async t => {
  const q = new DebounceQueue(DELAY_PERIOD_TIME)

  const spy = sinon.spy()
  q.subscribe(spy)

  q.next(EXPECTED_ITEM1)
  q.next(EXPECTED_ITEM2)

  await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 3))

  q.next(EXPECTED_ITEM3)
  t.ok(spy.calledOnce, 'should called once right after next(EXPECTED_ITEM3)')
  t.deepEqual(spy.firstCall.args[0], EXPECTED_ITEM2, 'the first call should receive EXPECTED_ITEM2')

  await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 3))
  t.ok(spy.calledTwice, 'should be called twice after the DELAY_PERIOD_TIME')
  t.deepEqual(spy.secondCall.args[0], EXPECTED_ITEM3, 'should get EXPECTED_ITEM3')
})

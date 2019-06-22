#!/usr/bin/env ts-node

// tslint:disable:no-shadowed-variable
import test  from 'blue-tape'
import sinon from 'sinon'

import DelayQueue from './delay-queue'

const EXPECTED_ITEM1 = { test: 'testing123' }
const EXPECTED_ITEM2 = { mol: 42 }
const EXPECTED_ITEM3 = 42

const DELAY_PERIOD_TIME = 10 // milliseconds

test('DelayQueue 1 item', async t => {
  const q   = new DelayQueue(DELAY_PERIOD_TIME)

  const spy = sinon.spy()
  q.subscribe(spy)

  q.next(EXPECTED_ITEM1)

  t.ok(spy.calledOnce, 'should called right after first item')
  t.deepEqual(spy.firstCall.args[0], EXPECTED_ITEM1, 'should get the first item immediately')
})

test('DelayQueue 2 item', async t => {
  const q = new DelayQueue(DELAY_PERIOD_TIME)

  const spy = sinon.spy()
  q.subscribe(spy)

  q.next(EXPECTED_ITEM1)
  q.next(EXPECTED_ITEM2)

  t.ok(spy.calledOnce, 'should get one item after next two item')
  t.deepEqual(spy.firstCall.args[0], EXPECTED_ITEM1, 'should get the first item only')

  await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 3))
  t.ok(spy.calledTwice, 'should get the second item after period delay')
})

test('DelayQueue 3 items', async t => {
  const q = new DelayQueue(DELAY_PERIOD_TIME)

  const spy = sinon.spy()
  q.subscribe(spy)

  q.next(EXPECTED_ITEM1)
  q.next(EXPECTED_ITEM2)
  q.next(EXPECTED_ITEM3)

  await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 3))
  t.ok(spy.calledTwice, 'get second item after period')

  await new Promise(resolve => setTimeout(resolve, DELAY_PERIOD_TIME + 3))
  t.ok(spy.calledThrice, 'should get the third item after 2 x period')
  t.deepEqual(spy.thirdCall.args[0], EXPECTED_ITEM3, 'should received EXPECTED_ITEM3 after 2 x period')
})

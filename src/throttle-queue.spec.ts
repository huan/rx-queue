#!/usr/bin/env ts-node

// tslint:disable:no-shadowed-variable
import * as test  from 'blue-tape'
import * as sinon from 'sinon'
// const sinonTest   = require('sinon-test')(sinon)

import ThrottleQueue from './throttle-queue'

// import {
//   log,
// }         from './config'
// log.level('silly')

const EXPECT_ITEM1 = { test: 'testing123' }
const EXPECT_ITEM2 = { mol: 42 }
const EXPECT_ITEM3 = 42

const THROTTLE_PERIOD_TIME = 10 // milliseconds

test('1 item', async function (t) {
  const q   = new ThrottleQueue(THROTTLE_PERIOD_TIME)

  const spy = sinon.spy()
  q.subscribe(spy)

  q.next(EXPECT_ITEM1)

  t.ok(spy.calledOnce, 'should called right after first item')
  t.deepEqual(spy.firstCall.args[0], EXPECT_ITEM1, 'should get the first item immediately')
})

test('2 item', async function (t) {
  const q = new ThrottleQueue(THROTTLE_PERIOD_TIME)

  const spy = sinon.spy()
  q.subscribe(spy)

  q.next(EXPECT_ITEM1)
  q.next(EXPECT_ITEM2)

  t.ok(spy.calledOnce, 'should called right after first item')
  t.deepEqual(spy.firstCall.args[0], EXPECT_ITEM1, 'should get the first item immediately')

  await new Promise(r => setTimeout(r, THROTTLE_PERIOD_TIME + 1))
  t.ok(spy.calledOnce, 'should drop the second call after period because of throttle')
})

test('3 items', async function (t) {
  const q = new ThrottleQueue(THROTTLE_PERIOD_TIME)

  const spy = sinon.spy()
  q.subscribe(spy)

  q.next(EXPECT_ITEM1)
  q.next(EXPECT_ITEM2)

  await new Promise(r => setTimeout(r, THROTTLE_PERIOD_TIME + 1))

  q.next(EXPECT_ITEM3)
  t.ok(spy.calledTwice, 'should received the third item after THROTTLE_TIME')
  t.deepEqual(spy.secondCall.args[0], EXPECT_ITEM3, 'should received EXPECTED_ITEM3 (not the ITEM2!)')
})

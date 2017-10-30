#!/usr/bin/env ts-node

// tslint:disable:no-shadowed-variable
import * as test  from 'blue-tape'
import * as sinon from 'sinon'
// const sinonTest   = require('sinon-test')(sinon)

import RxQueue from './rx-queue'

test('subscribe & next', async function (t) {
  const EXPECT_ITEM = { test: 'testing123' }
  const spy = sinon.spy()

  const q = new RxQueue()

  q.subscribe(spy)
  q.next(EXPECT_ITEM)

  t.ok(spy.calledOnce, 'should received 1 call')
  t.deepEqual(spy.firstCall.args[0], EXPECT_ITEM, 'should received EXPECTED_ITEM')
})

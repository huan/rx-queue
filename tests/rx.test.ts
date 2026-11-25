import * as assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  asyncScheduler,
  interval,
  map,
  take,
} from 'rxjs'
import { TestScheduler } from 'rxjs/testing'

test('marble smoke testing', () => {
  function timeRange (
    start: number,
    end: number,
    step = 1000,
    schedulerX = asyncScheduler,
  ) {
    return interval(step, schedulerX).pipe(
      map(n => n + start),
      take(end - start + 1),
    )
  }

  const scheduler = new TestScheduler((actual, expected) => {
    assert.deepEqual(actual, expected)
  })

  const source = timeRange(2, 8, 50, scheduler)
  const values = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8 }

  scheduler.expectObservable(source).toBe('-----2----3----4----5----6----7----(8|)', values)
  scheduler.flush()
})

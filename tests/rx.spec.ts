#!/usr/bin/env ts-node

import * as test  from 'blue-tape'
import * as Rx    from 'rxjs/Rx'

test('marble smoke testing', async t => {

  function timeRange(
    start: number,
    end: number,
    interval = 1000,
    schedulerX = Rx.Scheduler.async,
  ) {
    return Rx.Observable.interval(interval, schedulerX)
      .map(n => n + start)
      .take(end - start + 1)
  }

  const scheduler = new Rx.TestScheduler((actual, expected) => {
    // console.log('Actual:', actual, '\n\n', 'Expected:', expected);
    t.ok(
      JSON.stringify(actual) === JSON.stringify(expected),
      'two observable should be equal to the defination from marble diagram',
    )
  })

  const source = timeRange(2, 8, 50, scheduler)
  const values = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8}

  scheduler.expectObservable(source).toBe('-----2----3----4----5----6----7----(8|)', values),

  scheduler.flush()

})

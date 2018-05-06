import {
  Subject,
  Subscription,
  of,
  empty,
  concat,
}                 from 'rxjs/'
import {
  concatMap,
  delay,
}                 from 'rxjs/operators'

import {
  log,
}               from './config'
import RxQueue  from './rx-queue'

export class DelayQueue<T = any> extends RxQueue<T> {
  private subscription : Subscription
  private subject      : Subject<T>

  constructor(
    period?: number, // milliseconds
  ) {
    super(period)
    log.verbose('DelayQueue', 'constructor()')

    this.subject      = new Subject<T>()
    this.subscription = this.subject.pipe(
      concatMap(args => concat(
        of(args),                           // emit first item right away
        empty().pipe(delay(this.period)),   // delay next item
      )),
    ).subscribe((item: T) => super.next(item))
  }

  public next(item: T) {
    log.verbose('DelayQueue', 'next()')
    this.subject.next(item)
  }

  public unsubscribe() {
    this.subscription.unsubscribe()
    super.unsubscribe()
  }
}

export default DelayQueue

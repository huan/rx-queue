import {
  Subject,
  Subscription,
  interval,
}                 from 'rxjs/'
import {
  throttle,
}                 from 'rxjs/operators'

import {
  log,
}               from './config'
import RxQueue  from './rx-queue'

export class ThrottleQueue<T = any> extends RxQueue<T> {
  private subscription : Subscription
  private subject      : Subject<T>

  constructor(
    period?: number, // milliseconds
  ) {
    super(period)
    log.verbose('ThrottleQueue', 'constructor()')

    this.subject      = new Subject<T>()
    this.subscription = this.subject.pipe(
      throttle(_ => interval(this.period)),
    ).subscribe((item: T) => super.next(item))
  }

  public next(item: T) {
    log.verbose('ThrottleQueue', 'next()')
    this.subject.next(item)
  }

  public unsubscribe() {
    this.subscription.unsubscribe()
    super.unsubscribe()
  }
}

export default ThrottleQueue

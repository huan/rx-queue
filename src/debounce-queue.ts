import {
  Subject,
  Subscription,
  interval,
}                 from 'rxjs/'
import {
  debounce,
}                 from 'rxjs/operators'

import RxQueue  from './rx-queue'

export class DebounceQueue<T = any> extends RxQueue<T> {
  private subscription : Subscription
  private subject      : Subject<T>

  constructor(
    period?: number, // milliseconds
  ) {
    super(period)

    this.subject      = new Subject<T>()
    this.subscription = this.subject.pipe(
      debounce(() => interval(this.period)),
    )
    .subscribe((item: T) => super.next(item))
  }

  public next(item: T) {
    this.subject.next(item)
  }

  public unsubscribe() {
    this.subscription.unsubscribe()
    super.unsubscribe()
  }
}

export default DebounceQueue

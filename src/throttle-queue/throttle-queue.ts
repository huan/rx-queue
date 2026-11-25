import {
  interval,
  Subject,
  type Subscription,
  throttle,
} from 'rxjs'

import RxQueue from '../rx-queue.ts'

export class ThrottleQueue<T = unknown> extends RxQueue<T> {

  private subscription: Subscription
  private subject: Subject<T>

  constructor (
    period?: number,
  ) {
    super(period)

    this.subject = new Subject<T>()
    this.subscription = this.subject.pipe(
      throttle(() => interval(this.period)),
    ).subscribe((item: T) => super.next(item))
  }

  override next (item: T) {
    this.subject.next(item)
  }

  override unsubscribe () {
    this.subscription.unsubscribe()
    super.unsubscribe()
  }

}

export default ThrottleQueue

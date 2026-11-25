import {
  concat,
  concatMap,
  ignoreElements,
  of,
  Subject,
  type Subscription,
  timer,
} from 'rxjs'

import RxQueue from '../rx-queue.ts'

export class DelayQueue<T = unknown> extends RxQueue<T> {

  private subscription: Subscription
  private subject: Subject<T>

  constructor (
    period?: number,
  ) {
    super(period)

    this.subject = new Subject<T>()
    this.subscription = this.subject.pipe(
      concatMap(x => concat(
        of(x),
        timer(this.period).pipe(
          ignoreElements(),
        ),
      )),
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

export default DelayQueue

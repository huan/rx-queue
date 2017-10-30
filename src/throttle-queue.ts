import { Observable }   from 'rxjs/Observable'
import { Subject }      from 'rxjs/Subject'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/observable/interval'
import 'rxjs/add/operator/throttle'

import {
  log,
}               from './config'
import RxQueue  from './rx-queue'

export class ThrottleQueue<T = any> extends RxQueue<T> {
  private subscription : Subscription
  private subject      : Subject<T>

  constructor(
    public period = 1000, // milliseconds
  ) {
    super()
    log.verbose('ThrottleQueue', 'constructor(%d)', period)

    this.subject      = new Subject<T>()
    this.subscription = this.subject
      .throttle(_ => Observable.interval(this.period))
      .subscribe((item: T) => super.next(item))
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

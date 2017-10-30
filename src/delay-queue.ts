import { Observable }   from 'rxjs/Observable'
import { Subject }      from 'rxjs/Subject'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/empty'
import 'rxjs/add/operator/concatMap'
import 'rxjs/add/operator/concat'
import 'rxjs/add/operator/delay'

import {
  log,
}               from './config'
import RxQueue  from './rx-queue'

export class DelayQueue<T = any> extends RxQueue<T> {
  private subscription : Subscription
  private subject      : Subject<T>

  constructor(
    public period = 1000, // milliseconds
  ) {
    super()
    log.verbose('DelayQueue', 'constructor(%d)', period)

    this.subject      = new Subject<T>()
    this.subscription = this.subject
      .concatMap(args => {
        return Observable.of(args) // emit first item right away
              .concat(Observable.empty().delay(this.period)) // delay next item
      })
      .subscribe((item: T) => super.next(item))
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

import {
  Subject,
}                   from 'rxjs/Subject'
import {
  Subscription,
}                   from 'rxjs/Subscription'
import {
  PartialObserver,
}                   from 'rxjs/Observer'

import {
  log,
}         from 'brolog'

// https://codepen.io/maindg/pen/xRwGvL
export class RxQueue<T = any> extends Subject<T> {
  private itemList: T[] = []

  public next(item: T) {
    log.verbose('RxQueue', 'next()')
    if (this.observers.length > 0) {
      super.next(item)
    } else {
      this.itemList.push(item)
      log.verbose('RxQueue', 'next() itemList length: %s', this.itemList.length)
    }
  }

  public subscribe(observer: PartialObserver<T>)                                                  : Subscription
  public subscribe(next: (value: T) => void, error?: (error: any) => void, complete?: () => void) : Subscription

  public subscribe(...args: never[]): never

  public subscribe(
    nextOrObserver: ((value: T) => void) | PartialObserver<T>,
    error?:         (error: any) => void,
    complete?:      () => void,
  ) {
    log.verbose('RxQueue', 'subscribe()')
    let s: Subscription // TypeScript bug
    if (typeof nextOrObserver === 'function') {
      s = super.subscribe(nextOrObserver, error, complete)
    } else {
      s = super.subscribe(nextOrObserver)
    }
    this.itemList.forEach(item => this.next(item))
    this.itemList = []
    return s
  }
}

export default RxQueue
